# Classe: CNPJScraper

> Scraper especializado para busca de CNPJs com suporte a múltiplos providers.

## Descrição

A classe `CNPJScraper` realiza web scraping para encontrar CNPJs de empresas usando diferentes providers com fallback automático, cache inteligente e observabilidade completa.

---

## Classe `CNPJScraper` (`clients/cnpj_scraper.py`)

```python
class CNPJScraper:
```

Scraper especializado para busca de CNPJs com múltiplos providers.

**Responsabilidades:**

- Web scraping de CNPJs em múltiplos sites
- Fallback automático entre providers
- Cache inteligente de resultados
- Rate limiting e comportamento anti-detecção
- Retry com backoff exponencial
- Métricas de sucesso por provider

**Providers suportados:**

- **EMPRESA_DOIS**: empresadois.com.br (HTTP requests)
- **EMPRESA_BIZZ**: cnpj.biz (Selenium/JavaScript)
- **AUTO**: Fallback automático (EMPRESA_DOIS → EMPRESA_BIZZ)

---

## Enum `CNPJProvider`

```python
class CNPJProvider(Enum):
    EMPRESA_DOIS = "empresa_dois"
    EMPRESA_BIZZ = "empresa_bizz"
    AUTO = "auto"
```

Providers disponíveis para consulta de CNPJ.

**Estratégias:**

- `EMPRESA_DOIS`: Rápido via HTTP, sem JavaScript
- `EMPRESA_BIZZ`: Selenium para sites que requerem JavaScript
- `AUTO`: Tenta EMPRESA_DOIS primeiro, fallback para EMPRESA_BIZZ

---

### Inicialização

#### `__init__`

```python
def __init__(
    self,
    timeout: int = 10,
    session: requests.Session = None,
    max_retries: int = 3,
    provider: CNPJProvider = CNPJProvider.AUTO,
):
```

Inicializa o scraper de CNPJ com configuração otimizada.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `timeout` | `int` | Timeout para requisições HTTP |
| `session` | `Optional[Session]` | Sessão HTTP reutilizável |
| `max_retries` | `int` | Máximo de tentativas por provider |
| `provider` | `CNPJProvider` | Provider padrão a usar |

**Configuração automática:**

**Headers anti-detecção:**

```python
{
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif...",
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Cache-Control": "max-age=0"
}
```

**Estratégias inicializadas:**

```python
self.strategies = {
    CNPJProvider.EMPRESA_DOIS: EmpresaDoisStrategy(config.EMPRESA_DOIS_URL),
    CNPJProvider.EMPRESA_BIZZ: EmpresaBizzStrategy(config.EMPRESA_BIZZ_URL),
}
```

**Cache de sessão:**

```python
self.cnpj_cache: Dict[str, CNPJResult] = {}
```

---

### Métodos Principais de Consulta

#### `consultar_cnpj`

```python
def consultar_cnpj(
    self,
    nome_empresa: str,
    use_cache: bool = True,
    provider_override: Optional[CNPJProvider] = None,
    uf_advogado: Optional[str] = None,
) -> Optional[str]:
```

Consulta o CNPJ de uma empresa pelo nome (retorna apenas CNPJ).

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `nome_empresa` | `str` | Nome da empresa a consultar |
| `use_cache` | `bool` | Se deve usar cache de resultados |
| `provider_override` | `Optional[CNPJProvider]` | Provider específico para esta consulta |
| `uf_advogado` | `Optional[str]` | UF para critério de desempate |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Optional[str]` | CNPJ encontrado (formato XX.XXX.XXX/XXXX-XX) ou None |

**Exemplo:**

```python
cnpj = scraper.consultar_cnpj("Silva & Associados Advogados")
print(cnpj)  # "12.345.678/0001-99"
```

---

#### `consultar_cnpj_com_nome`

```python
def consultar_cnpj_com_nome(
    self,
    nome_empresa: str,
    use_cache: bool = True,
    provider_override: Optional[CNPJProvider] = None,
    uf_advogado: Optional[str] = None,
) -> CNPJResult:
```

Consulta CNPJ e retorna também o nome oficial da empresa.

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `CNPJResult` | Objeto com CNPJ e nome oficial (razão social) |

**Vantagens:**

- Retorna nome oficial conforme Receita Federal
- Pode diferir do nome fornecido (acentos, hífens, etc.)
- Útil para padronização de dados

**Exemplo:**

```python
result = scraper.consultar_cnpj_com_nome("Silva Advogados")
if result.cnpj:
    print(f"CNPJ: {result.cnpj}")
    print(f"Razão Social: {result.nome_oficial}")
    # CNPJ: 12.345.678/0001-99
    # Razão Social: Silva & Associados Advocacia Ltda
```

**Cache com UF:**

```python
# Cache diferenciado por UF quando fornecida
cache_key = nome_empresa.lower()
if uf_advogado:
    cache_key = f"{cache_key}_{uf_advogado.upper()}"
```

---

### Sistema de Fallback Automático

#### `_try_provider`

```python
def _try_provider(
    self,
    provider: CNPJProvider,
    nome_empresa: str,
    uf_advogado: Optional[str] = None,
) -> CNPJResult:
```

Tenta consultar CNPJ usando provider específico (método privado).

**Fluxo com retry:**

1. **Delay inicial**: Entre tentativas para simular comportamento humano
2. **Requisição**: HTTP ou Selenium dependendo do provider
3. **Error handling**: Categorizado por tipo de erro
4. **Backoff**: Delay exponencial entre tentativas
5. **Logging**: Detalhado por tentativa e resultado

**Rate limiting inteligente:**

```python
if attempt > 0:
    wait_time = 2 + attempt  # 2s, 3s, 4s...
    logger.debug(f"Aguardando {wait_time}s antes da requisição...")
    time.sleep(wait_time)
```

**Tratamento de erros específicos:**

| Erro HTTP      | Estratégia         | Wait Time           |
| -------------- | ------------------ | ------------------- |
| 403 Forbidden  | Anti-bot detectado | 5 \* (attempt + 1)s |
| 429 Rate Limit | Quota excedida     | 4 \* (attempt + 1)s |
| Timeout        | Rede lenta         | Retry imediato      |
| Connection     | Rede instável      | 2 \* (attempt + 1)s |

---

### Fallback Automático (AUTO mode)

```python
if provider == CNPJProvider.AUTO:
    # Tentar EMPRESA_DOIS primeiro (mais rápido)
    result = self._try_provider(CNPJProvider.EMPRESA_DOIS, nome_empresa, uf_advogado)

    # Fallback para EMPRESA_BIZZ se necessário
    if not result.cnpj:
        logger.info("Tentando provider alternativo (EmpresaBizz/Selenium)")
        result = self._try_provider(CNPJProvider.EMPRESA_BIZZ, nome_empresa, uf_advogado)
```

**Logs informativos:**

```python
logger.info("[EmpresaDois] Consultando CNPJ para: Silva Advogados (tentativa 1/3)")
logger.info("[EmpresaDois] ❌ CNPJ não encontrado")
logger.info("Tentando provider alternativo (EmpresaBizz/Selenium)")
logger.info("[EmpresaBizz] ✅ CNPJ encontrado: 12.345.678/0001-99")
```

---

### Métodos de Cache

#### `limpar_cache`

```python
def limpar_cache(self) -> None:
```

Limpa o cache de CNPJs consultados.

**Uso:**

```python
scraper.limpar_cache()  # Reset para nova sessão
```

---

#### `obter_estatisticas_cache`

```python
def obter_estatisticas_cache(self) -> Dict[str, int]:
```

Retorna estatísticas detalhadas do cache.

**Returns:**

```python
{
    "total_consultas": 150,      # Total de itens no cache
    "sucessos": 128,             # Consultas que encontraram CNPJ
    "falhas": 22,                # Consultas sem resultado
    "taxa_sucesso": 85.33,       # Percentual de sucesso
    "total_requisicoes": 180     # Total de requisições HTTP feitas
}
```

---

#### `obter_cnpj_do_cache`

```python
def obter_cnpj_do_cache(self, nome_empresa: str) -> Optional[str]:
```

Obtém CNPJ do cache sem fazer nova consulta.

**Uso:**

```python
# Verificar se já consultado
cnpj = scraper.obter_cnpj_do_cache("Silva Advogados")
if cnpj:
    print(f"CNPJ em cache: {cnpj}")
else:
    # Fazer nova consulta
    cnpj = scraper.consultar_cnpj("Silva Advogados")
```

---

#### `obter_resultado_do_cache`

```python
def obter_resultado_do_cache(self, nome_empresa: str) -> Optional[CNPJResult]:
```

Obtém resultado completo (CNPJ + nome oficial) do cache.

---

### Limpeza de Recursos

#### `cleanup`

```python
def cleanup(self) -> None:
```

Limpa recursos (fecha drivers Selenium, etc.).

**Funcionalidade:**

- Chama `cleanup()` em todas as estratégias
- Fecha drivers Selenium se iniciados
- Libera recursos de rede
- Log de confirmação

**Uso:**

```python
try:
    result = scraper.consultar_cnpj("Empresa")
finally:
    scraper.cleanup()  # Sempre limpar recursos
```

---

#### `__del__`

```python
def __del__(self):
```

Destrutor que garante cleanup ao finalizar objeto.

**Funcionalidade:**

- Cleanup automático ao sair de escopo
- Silencia erros durante shutdown do interpretador
- Prevenção de vazamentos de recursos

---

## Tratamento de Erros Avançado

### Categorização por Provider

**EMPRESA_DOIS (HTTP):**

- Timeout: Rede lenta, retry imediato
- 403: Site detectou bot, delay maior
- 429: Rate limit, aguardar mais tempo
- Connection: Problemas de rede, delay progressivo

**EMPRESA_BIZZ (Selenium):**

- WebDriverException: Problema com browser
- TimeoutException: JavaScript não carregou
- ElementNotFound: Estrutura da página mudou

### Logs Estruturados

```python
# Por provider e tentativa
logger.info(f"[{strategy.get_name()}] Consultando CNPJ para: {nome_empresa} "
           f"(tentativa {attempt + 1}/{max_retries})")

# Resultados detalhados
if result.cnpj:
    logger.info(f"[{strategy.get_name()}] ✅ CNPJ encontrado: {result.cnpj}")
else:
    logger.warning(f"[{strategy.get_name()}] ❌ CNPJ não encontrado")
```

### Retry Inteligente

```python
# Delay baseado no tipo de erro
if response.status_code == 403:
    wait_time = 5 * (attempt + 1)  # Maior delay para anti-bot
elif response.status_code == 429:
    wait_time = 4 * (attempt + 1)  # Delay para rate limit
else:
    wait_time = 2 * (attempt + 1)  # Delay padrão
```

---

## Exemplos de Uso

### Uso Básico com Fallback

```python
# Inicialização com fallback automático
scraper = CNPJScraper(
    timeout=15,
    max_retries=3,
    provider=CNPJProvider.AUTO
)

# Consulta simples
cnpj = scraper.consultar_cnpj("Silva & Associados Advogados")
if cnpj:
    print(f"✅ CNPJ encontrado: {cnpj}")
else:
    print("❌ CNPJ não encontrado")

# Limpeza
scraper.cleanup()
```

### Consulta com Nome Oficial

```python
# Obter dados completos
result = scraper.consultar_cnpj_com_nome("Silva Advogados")

if result.cnpj:
    print(f"CNPJ: {result.cnpj}")
    print(f"Razão Social: {result.nome_oficial}")

    # Comparar nomes
    if result.nome_oficial != "Silva Advogados":
        print(f"Nome divergente detectado!")
```

### Provider Específico

```python
# Forçar uso de Selenium (para sites complexos)
result = scraper.consultar_cnpj_com_nome(
    nome_empresa="Empresa Complexa Ltd",
    provider_override=CNPJProvider.EMPRESA_BIZZ
)

# Forçar uso de HTTP (para velocidade)
result = scraper.consultar_cnpj_com_nome(
    nome_empresa="Empresa Simples",
    provider_override=CNPJProvider.EMPRESA_DOIS
)
```

### Critério de Desempate por UF

```python
# UF do advogado para melhor precisão
result = scraper.consultar_cnpj_com_nome(
    nome_empresa="Silva Advogados",
    uf_advogado="MG"  # Prioriza resultados de MG
)

# Útil quando há várias empresas com nome similar
```

### Processamento em Lote

```python
empresas = ["Silva Advogados", "Santos & Associados", "Oliveira Ltda"]
resultados = {}

for empresa in empresas:
    try:
        result = scraper.consultar_cnpj_com_nome(empresa)
        resultados[empresa] = result

        if result.cnpj:
            print(f"✅ {empresa}: {result.cnpj}")
        else:
            print(f"❌ {empresa}: Não encontrado")

    except ValidationError as e:
        print(f"⚠️ {empresa}: Dados inválidos - {e}")

# Estatísticas finais
stats = scraper.obter_estatisticas_cache()
print(f"\n📊 Taxa de sucesso: {stats['taxa_sucesso']:.1f}%")
print(f"📊 Total de requisições: {stats['total_requisicoes']}")
```

### Monitoramento e Cache

```python
# Verificar cache antes de consultar
def consultar_com_cache_check(scraper, empresa):
    # Tentar cache primeiro
    cached = scraper.obter_cnpj_do_cache(empresa)
    if cached:
        print(f"📋 Cache: {empresa} -> {cached}")
        return cached

    # Fazer nova consulta
    print(f"🔍 Consultando: {empresa}")
    result = scraper.consultar_cnpj(empresa)
    return result

# Monitorar performance
def relatorio_performance(scraper):
    stats = scraper.obter_estatisticas_cache()

    print(f"📈 Relatório de Performance:")
    print(f"   Total consultas: {stats['total_consultas']}")
    print(f"   Sucessos: {stats['sucessos']}")
    print(f"   Falhas: {stats['falhas']}")
    print(f"   Taxa de sucesso: {stats['taxa_sucesso']:.1f}%")
    print(f"   Requisições HTTP: {stats['total_requisicoes']}")

    # Eficiência do cache
    if stats['total_requisicoes'] > 0:
        cache_efficiency = 1 - (stats['total_requisicoes'] / stats['total_consultas'])
        print(f"   Eficiência cache: {cache_efficiency:.1%}")

# Uso com contexto (cleanup automático)
class CNPJScraperContext:
    def __init__(self, **kwargs):
        self.scraper = CNPJScraper(**kwargs)

    def __enter__(self):
        return self.scraper

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.scraper.cleanup()

# Uso com context manager
with CNPJScraperContext(provider=CNPJProvider.AUTO) as scraper:
    cnpj = scraper.consultar_cnpj("Minha Empresa")
    print(f"CNPJ: {cnpj}")
# Cleanup automático
```

---

## Configuração Avançada

### Sessão Customizada

```python
# Configurar sessão com proxy
session = requests.Session()
session.proxies = {
    'http': 'http://proxy.exemplo.com:8080',
    'https': 'https://proxy.exemplo.com:8080'
}

# Headers customizados
session.headers.update({
    'X-Custom-Header': 'valor-personalizado'
})

# Scraper com sessão customizada
scraper = CNPJScraper(session=session, timeout=30)
```

### Configuração por Provider

```python
# URLs customizadas
config.EMPRESA_DOIS_URL = "https://empresadois-custom.com.br"
config.EMPRESA_BIZZ_URL = "https://cnpj-custom.biz"

# Inicialização com configuração específica
scraper = CNPJScraper(
    timeout=20,
    max_retries=5,
    provider=CNPJProvider.EMPRESA_BIZZ  # Apenas Selenium
)
```

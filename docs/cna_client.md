# Classe: CNAClient

> Cliente especializado para API do CNA (Cadastro Nacional de Advogados) com observabilidade.

## Descrição

A classe `CNAClient` encapsula toda a lógica de comunicação com a API do CNA da OAB, fornecendo métodos para consultar advogados e sociedades com instrumentação completa de métricas, logging estruturado e tratamento robusto de erros.

---

## Classe `CNAClient` (`clients/cna_client.py`)

```python
class CNAClient:
```

Cliente especializado para a API do CNA com observabilidade integrada.

**Responsabilidades:**

- Consulta de advogados no Cadastro Nacional da OAB
- Consulta de sociedades/escritórios
- Instrumentação com métricas de performance
- Logging estruturado com correlation_id
- Tratamento robusto de erros de rede
- Estatísticas de uso e sucesso

---

### Inicialização

#### `__init__`

```python
def __init__(self, timeout: int = None, session: requests.Session = None):
```

Inicializa o cliente CNA com configuração e observabilidade.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `timeout` | `Optional[int]` | Timeout em segundos (usa config.TIMEOUT se None) |
| `session` | `Optional[requests.Session]` | Sessão HTTP reutilizável |

**Configuração automática:**

| Atributo     | Fonte                   | Descrição                       |
| ------------ | ----------------------- | ------------------------------- |
| `timeout`    | `config.TIMEOUT`        | Timeout padrão para requisições |
| `base_url`   | `config.CNA_BASE_URL`   | URL base da API CNA             |
| `search_url` | `config.CNA_SEARCH_URL` | URL específica para buscas      |

**Observabilidade inicializada:**

- Registry de métricas específico para CNA
- Contadores de requisições (total, sucesso, erro)
- Sistema de correlation_id para rastreamento

**Log de inicialização:**

```
[abc123] CNAClient inicializado - Base URL: https://cna.oab.org.br/api
```

---

### Métodos de Consulta

#### `consultar_advogado`

```python
def consultar_advogado(
    self, nome: str = "", oab: str = "", uf: Optional[str] = None
) -> Optional[Dict[str, Any]]:
```

Consulta a API do CNA para obter informações do advogado.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `nome` | `str` | Nome do advogado (opcional) |
| `oab` | `str` | Número da OAB (opcional) |
| `uf` | `Optional[str]` | UF da OAB (opcional) |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Optional[Dict[str, Any]]` | Dados do advogado ou None |

**Validações de entrada:**

- Pelo menos `nome` ou `oab` deve ser fornecido
- `oab` deve ser string se fornecido
- Parâmetros são automaticamente trimmed

**Payload da requisição:**

```python
{
    "NomeAdvo": nome.strip() if nome else "",
    "Insc": oab.strip() if oab else "",
    "UF": uf.strip() if uf else ""
}
```

**Instrumentação automática:**

- Correlation ID único para rastreamento
- Métricas de latência por requisição
- Contadores de sucesso/erro
- Logging estruturado com contexto

**Exemplo de log:**

```
[abc123] 🔍 CNA #45: Nome: João Silva, OAB: MG123456, UF: MG
[abc123] ✓ CNA Response (245.32ms): Nome: João Silva, OAB: MG123456, UF: MG
```

**Exceções:**
| Exceção | Cenário | Tratamento |
|---------|---------|------------|
| `ValidationError` | Parâmetros inválidos | Validação prévia |
| `CNAAPIError` | Erros de rede/HTTP | Log + métricas + reraise |
| `Timeout` | Timeout excedido | Log específico + métricas |
| `ConnectionError` | Falha de conexão | Log específico + métricas |
| `HTTPError` | Erro HTTP (4xx, 5xx) | Log com status code |

---

#### `consultar_sociedade`

```python
def consultar_sociedade(
    self, nome_advogado: str, url: str
) -> Optional[Dict[str, Any]]:
```

Consulta a API do CNA para obter informações da sociedade.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `nome_advogado` | `str` | Nome do advogado (para contexto de logs) |
| `url` | `str` | URL específica para consulta da sociedade |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Optional[Dict[str, Any]]` | Dados da sociedade ou None |

**Validações:**

- `nome_advogado` obrigatório e não vazio
- `url` obrigatória e não vazia
- Ambos devem ser strings válidas

**Funcionalidade:**

- Faz requisição GET para URL específica fornecida
- Incrementa contador de requisições
- Aplica timeout configurado
- Trata erros com contexto do advogado

**Uso típico:**

```python
# URL obtida de consulta anterior
detail_url = "https://cna.oab.org.br/api/sociedade/123"
sociedade = client.consultar_sociedade("João Silva", detail_url)
```

---

### Métodos de Observabilidade

#### `obter_estatisticas`

```python
def obter_estatisticas(self) -> Dict[str, Any]:
```

Retorna estatísticas completas de uso do cliente CNA.

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Dict[str, Any]` | Estatísticas detalhadas de uso |

**Estrutura de retorno:**

```python
{
    "total_requests": 247,           # Total de requisições feitas
    "success_count": 230,            # Requisições bem-sucedidas
    "error_count": 17,               # Requisições com erro
    "success_rate": 0.931,           # Taxa de sucesso (0.0-1.0)
    "average_latency_ms": 245.3      # Latência média em ms
}
```

**Métricas incluídas:**

- **Contadores básicos**: Total, sucessos, erros
- **Taxa de sucesso**: Percentual de requisições bem-sucedidas
- **Performance**: Latência média das operações
- **Dados do registry**: Métricas detalhadas por operação

---

#### `reset_estatisticas`

```python
def reset_estatisticas(self) -> None:
```

Reseta todas as estatísticas de uso.

**Funcionalidade:**

- Zera contadores de requisições
- Limpa métricas acumuladas
- Mantém configuração e sessão ativas
- Log de confirmação do reset

**Uso:**

```python
# Reset para nova sessão de medição
client.reset_estatisticas()
```

---

## Sistema de Observabilidade

### Correlation ID Tracking

**Geração automática:**

```python
correlation = get_correlation_id()  # UUID único por operação
```

**Logs estruturados:**

```python
# Início da operação
logger.info(f"[{correlation}] 🔍 CNA #{request_count}: Nome: João Silva")

# Resultado da operação
logger.debug(f"[{correlation}] ✓ CNA Response (245ms): Nome: João Silva")
```

**Benefícios:**

- Rastreamento end-to-end de operações
- Correlação entre logs distribuídos
- Debug facilitado em ambientes concorrentes

### Métricas de Performance

**Registry dedicado:**

```python
self._metrics = get_metrics_registry().get_or_create("cna_client")
```

**Métricas coletadas automaticamente:**

| Métrica                  | Tipo      | Descrição                    |
| ------------------------ | --------- | ---------------------------- |
| `operation_count`        | Counter   | Número de operações por tipo |
| `operation_duration_ms`  | Histogram | Latência por operação        |
| `operation_success_rate` | Gauge     | Taxa de sucesso              |
| `error_count_by_type`    | Counter   | Erros categorizados          |

**Registro automático:**

```python
self._metrics.record_operation("consultar_advogado", True, duration_ms)
```

### Contadores Específicos

**Contadores internos:**

```python
self.request_count = 0        # Total de requisições
self._success_count = 0       # Requisições bem-sucedidas
self._error_count = 0         # Requisições com erro
```

**Incremento automático:**

- `request_count`: A cada nova requisição
- `_success_count`: Quando requisição retorna dados
- `_error_count`: Quando exceção é capturada

---

## Tratamento de Erros

### Categorização por Tipo

**Timeout:**

```python
except requests.exceptions.Timeout as e:
    error_msg = f"Timeout ao consultar advogado no CNA ({nome}, {oab})"
    logger.error(f"[{correlation}] ⏱️ {error_msg}")
    raise CNAAPIError(f"{error_msg}: {e}")
```

**Erro de conexão:**

```python
except requests.exceptions.ConnectionError as e:
    error_msg = f"Erro de conexão ao consultar advogado no CNA ({nome}, {oab})"
    logger.error(f"[{correlation}] 🔌 {error_msg}")
    raise CNAAPIError(f"{error_msg}: {e}")
```

**Erro HTTP:**

```python
except requests.exceptions.HTTPError as e:
    logger.error(f"[{correlation}] ❌ {error_msg}: Status {e.response.status_code}")
    raise CNAAPIError(f"{error_msg}: {e}", e.response.status_code)
```

### Contexto Preservado

**Informações mantidas:**

- Parâmetros da consulta original
- Correlation ID para rastreamento
- Timestamp e duração da operação
- Status code HTTP quando disponível

**Exceções customizadas:**

- `CNAAPIError`: Erros específicos da API CNA
- `ValidationError`: Parâmetros de entrada inválidos

---

## Exemplos de Uso

### Consulta Básica de Advogado

```python
# Inicialização
client = CNAClient(timeout=30)

# Consulta por nome
resultado = client.consultar_advogado(nome="João Silva Santos")
if resultado:
    print(f"Advogado encontrado: {resultado.get('Nome')}")
    print(f"OAB: {resultado.get('Inscricao')}")

# Consulta por OAB e UF
resultado = client.consultar_advogado(oab="123456", uf="MG")
if resultado:
    print(f"Nome: {resultado.get('Nome')}")
    print(f"Status: {resultado.get('Status')}")
```

### Consulta de Sociedade

```python
# Primeiro, encontrar o advogado
advogado = client.consultar_advogado(nome="João Silva", oab="MG123456")

if advogado and 'UrlDetalhes' in advogado:
    # Consultar sociedade usando URL de detalhes
    sociedade = client.consultar_sociedade(
        nome_advogado="João Silva",
        url=advogado['UrlDetalhes']
    )

    if sociedade:
        print(f"Escritório: {sociedade.get('NomeEscritorio')}")
        print(f"CNPJ: {sociedade.get('CNPJ')}")
        print(f"Sócios: {len(sociedade.get('Socios', []))}")
```

### Monitoramento de Performance

```python
# Múltiplas consultas
advogados = ["João Silva", "Maria Santos", "Pedro Oliveira"]

for nome in advogados:
    try:
        resultado = client.consultar_advogado(nome=nome)
        print(f"✅ {nome}: {'Encontrado' if resultado else 'Não encontrado'}")
    except CNAAPIError as e:
        print(f"❌ {nome}: Erro - {e}")

# Verificar estatísticas
stats = client.obter_estatisticas()
print(f"\n📊 Estatísticas:")
print(f"Total de consultas: {stats['total_requests']}")
print(f"Taxa de sucesso: {stats['success_rate']:.1%}")
print(f"Latência média: {stats['average_latency_ms']:.1f}ms")

# Reset para próxima sessão
client.reset_estatisticas()
```

### Tratamento de Erros Robusto

```python
def consultar_com_fallback(nome, oab=None, uf=None):
    try:
        # Tentar consulta completa primeiro
        resultado = client.consultar_advogado(nome=nome, oab=oab, uf=uf)
        if resultado:
            return resultado

        # Fallback: tentar só com nome
        if oab or uf:
            logger.info(f"Tentando fallback apenas com nome para: {nome}")
            return client.consultar_advogado(nome=nome)

    except ValidationError as e:
        logger.error(f"Parâmetros inválidos: {e}")
        return None

    except CNAAPIError as e:
        if "timeout" in str(e).lower():
            logger.warning(f"Timeout para {nome} - tentar novamente mais tarde")
        else:
            logger.error(f"Erro na API CNA para {nome}: {e}")
        return None
```

### Sessão Customizada

```python
# Sessão com configurações específicas
session = requests.Session()
session.headers.update({
    'User-Agent': 'MeuApp/1.0',
    'Accept': 'application/json'
})

# Cliente com sessão customizada
client = CNAClient(timeout=60, session=session)

# Uso normal
resultado = client.consultar_advogado(nome="João Silva")
```

---

## Configuração e Ambiente

### Variáveis de Configuração

```python
# config.py
CNA_BASE_URL = "https://cna.oab.org.br"
CNA_SEARCH_URL = "https://cna.oab.org.br/api/consulta"
TIMEOUT = 30  # segundos
```

### Logging Configurado

```python
import logging

# Configurar logger para CNA
logger = logging.getLogger('cna_client')
logger.setLevel(logging.INFO)

# Handler com formato estruturado
handler = logging.StreamHandler()
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
handler.setFormatter(formatter)
logger.addHandler(handler)
```

---

## Integração com Métricas

### Registry de Métricas

```python
from src.utils.metrics import get_metrics_registry

# Acesso ao registry
metrics = get_metrics_registry().get_or_create("cna_client")

# Métricas disponíveis
summary = metrics.get_summary()
print(f"Operações: {summary['operations']}")
print(f"Taxa de sucesso: {summary['success_rate']}")
```

### Alertas e Monitoramento

```python
def check_cna_health(client: CNAClient):
    stats = client.obter_estatisticas()

    # Alertas baseados em thresholds
    if stats['success_rate'] < 0.8:
        alert(f"CNA: Alta taxa de falhas ({stats['success_rate']:.1%})")

    if stats['average_latency_ms'] > 5000:
        alert(f"CNA: Latência alta ({stats['average_latency_ms']:.0f}ms)")

    if stats['error_count'] > 50:
        alert(f"CNA: Muitos erros ({stats['error_count']})")
```

# Estratégias de Scraping CNPJ

> Estratégias especializadas para diferentes providers de CNPJ com anti-detecção.

## Descrição

Este módulo implementa o padrão Strategy para scraping de CNPJs, permitindo múltiplos providers com diferentes tecnologias (HTTP requests e Selenium) e técnicas anti-detecção específicas para cada site.

---

## Classe Base: CNPJScraperStrategy

```python
class CNPJScraperStrategy(ABC):
```

Interface abstrata para estratégias de scraping de CNPJ.

**Responsabilidades:**

- Definir contrato comum para providers
- Construção de URLs de busca
- Extração de dados do HTML/JavaScript
- Limpeza de recursos quando necessário

---

### Métodos Abstratos

#### `get_url`

```python
@abstractmethod
def get_url(self, nome_empresa: str) -> str:
```

Constrói a URL de busca para o nome da empresa.

#### `extract_cnpj`

```python
@abstractmethod
def extract_cnpj(
    self, html_content: str, nome_empresa: str, uf_advogado: Optional[str] = None
) -> CNPJResult:
```

Extrai CNPJ e nome oficial do conteúdo HTML.

#### `get_name`

```python
@abstractmethod
def get_name(self) -> str:
```

Retorna o nome do provider para logs.

#### `cleanup` (opcional)

```python
def cleanup(self) -> None:
```

Limpa recursos (drivers Selenium, etc.).

---

## Classe de Resultado: CNPJResult

```python
@dataclass
class CNPJResult:
    cnpj: Optional[str] = None
    nome_oficial: Optional[str] = None

    def __bool__(self) -> bool:
        return self.cnpj is not None
```

Resultado da busca de CNPJ com dados estruturados.

**Campos:**

- `cnpj`: CNPJ no formato XX.XXX.XXX/XXXX-XX
- `nome_oficial`: Razão social conforme Receita Federal

**Uso como boolean:**

```python
result = strategy.extract_cnpj(html, "Empresa")
if result:  # True se cnpj não é None
    print(f"CNPJ: {result.cnpj}")
```

---

## Estratégia: EmpresaDoisStrategy

```python
class EmpresaDoisStrategy(CNPJScraperStrategy):
```

Estratégia para busca via empresadois.com.br usando HTTP requests.

**Características:**

- Rápido (apenas HTTP)
- Não requer JavaScript
- Parsing com BeautifulSoup
- Fuzzy matching para melhor precisão
- Critério de desempate por data de abertura

---

### Métodos Implementados

#### `get_url`

```python
def get_url(self, nome_empresa: str) -> str:
    nome_encoded = quote_plus(nome_empresa)
    return f"{self.base_url}?q={nome_encoded}&sf=widget_search"
```

Constrói URL com encoding seguro para caracteres especiais.

#### `extract_cnpj`

```python
def extract_cnpj(
    self, html_content: str, nome_empresa: str, uf_advogado: Optional[str] = None
) -> CNPJResult:
```

**Algoritmo de extração:**

1. **Parse HTML**: BeautifulSoup para estrutura DOM
2. **Busca resultados**: `div.city_comp` para cada empresa
3. **Extração dados**: Nome, CNPJ, data de abertura
4. **Fuzzy matching**: Score de similaridade entre nomes
5. **Critério desempate**: Data de abertura mais recente
6. **Retorno**: Melhor match encontrado

**Estrutura HTML esperada:**

```html
<div class="city_comp">
    <a>Nome da Empresa</a>
    <p class="city_info">12.345.678/0001-99 | Outras informações</p>
    <p class="city_info">Data de abertura: 15/03/2010</p>
</div>
```

**Regex patterns:**

```python
padrao_cnpj = re.compile(r"\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}")
match_data = re.search(r"(\d{2}/\d{2}/\d{4})", texto)
```

**Scoring algorithm:**

```python
score = fuzz.ratio(nome_empresa_normalizado, nome_resultado_normalizado)

if score > best_match["score"]:
    best_match = {
        "cnpj": cnpj_encontrado,
        "nome": nome_original,
        "score": score,
        "data_abertura": data_abertura
    }
elif score == best_match["score"]:
    # Desempate por data mais recente
    if data_abertura > best_match["data_abertura"]:
        best_match = novo_resultado
```

---

## Estratégia: EmpresaBizzStrategy

```python
class EmpresaBizzStrategy(CNPJScraperStrategy):
```

Estratégia para busca via cnpj.biz usando Selenium (site requer JavaScript).

**Características:**

- Selenium WebDriver (Chrome headless)
- Configurações anti-detecção avançadas
- Critério de desempate por UF quando fornecida
- Parsing dinâmico de JavaScript
- Timeout inteligente e retry

---

### Inicialização Selenium

#### `_init_driver`

```python
def _init_driver(self):
```

Inicializa Chrome WebDriver com configurações anti-detecção.

**Configurações Chrome:**

```python
chrome_options = Options()
chrome_options.add_argument("--headless=new")        # Modo headless
chrome_options.add_argument("--no-sandbox")          # Bypass sandbox
chrome_options.add_argument("--disable-dev-shm-usage") # Uso de memória

# Anti-detecção
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option("useAutomationExtension", False)
chrome_options.add_argument("--disable-blink-features=AutomationControlled")

# User agent realista
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64)...")
```

**Script anti-detecção:**

```javascript
Object.defineProperty(navigator, 'webdriver', {
    get: () => undefined,
});

window.navigator.chrome = {
    runtime: {},
};

Object.defineProperty(navigator, 'plugins', {
    get: () => [1, 2, 3, 4, 5],
});
```

---

### Extração com Selenium

#### `extract_cnpj`

```python
def extract_cnpj(
    self, html_content: str, nome_empresa: str, uf_advogado: Optional[str] = None
) -> CNPJResult:
```

**Fluxo de extração:**

1. **Inicialização**: Driver Selenium com anti-detecção
2. **Navegação**: Acesso à URL de busca
3. **Wait**: Aguarda carregamento do JavaScript
4. **Parse**: Extração de elementos dinâmicos
5. **Análise**: Scoring e desempate com UF
6. **Retorno**: Melhor resultado encontrado

**Seletores CSS:**

```python
# Lista de resultados
'div.shadow ul[role="list"] > li'

# Nome da empresa
"p.text-lg.font-medium.text-blue-600"

# Informações (CNPJ, localização)
'.//p[@class="flex items-center text-sm text-gray-500"]'

# Data de abertura
"time"  # com atributo datetime
```

**Wait conditions:**

```python
WebDriverWait(driver, 15).until(
    EC.presence_of_element_located(
        (By.CSS_SELECTOR, 'div.shadow ul[role="list"]')
    )
)
```

---

### Algoritmo de Desempate Avançado

**Critério por UF (quando fornecida):**

1. **Prioridade máxima**: Resultados com UF correspondente
2. **Fallback**: Melhor score geral se nenhum match de UF
3. **Warning**: Log quando não há correspondência de UF

```python
if uf_advogado:
    # Filtra resultados com UF correspondente
    uf_matches = [r for r in all_results if r["uf_match"]]

    if uf_matches:
        # Melhor entre os que batem UF
        best_match = max(uf_matches, key=lambda x: (x["score"], x["date"]))
        logger.info(f"✓ Match com UF correspondente ({best_match['uf']})")
    else:
        # Nenhum com UF correspondente
        best_match = max(all_results, key=lambda x: (x["score"], x["date"]))
        logger.warning(f"⚠ Nenhum resultado com UF={uf_advogado}")
```

**Penalização por traço:**

```python
# Empresa buscada: "Silva Advogados"
# Resultado: "Silva - Advogados Ltda"
# Aplica pequena penalização se resultado tem traço e busca não tem

has_dash_in_search = "-" in nome_empresa
has_dash_in_result = "-" in company_name_result

if not has_dash_in_search and has_dash_in_result:
    dash_penalty = 2  # Penalização leve
    score = max(0, score - dash_penalty)
```

---

### Limpeza de Recursos

#### `cleanup`

```python
def cleanup(self):
```

Fecha driver Selenium de forma segura.

```python
if self._driver:
    try:
        self._driver.quit()
        logger.info("Driver Selenium fechado")
    except Exception as e:
        logger.error(f"Erro ao fechar driver: {e}")
    finally:
        self._driver = None
        self._driver_initialized = False
```

---

## Comparação entre Estratégias

| Aspecto            | EmpresaDoisStrategy       | EmpresaBizzStrategy    |
| ------------------ | ------------------------- | ---------------------- |
| **Tecnologia**     | HTTP + BeautifulSoup      | Selenium + Chrome      |
| **Velocidade**     | Rápido (~200ms)           | Lento (~3-5s)          |
| **JavaScript**     | Não suporta               | Suporta totalmente     |
| **Anti-detecção**  | Headers HTTP              | Configuração completa  |
| **Recursos**       | Baixo consumo             | Alto consumo (RAM/CPU) |
| **Confiabilidade** | Pode quebrar com mudanças | Mais resiliente        |
| **Desempate UF**   | Não implementado          | Implementado           |
| **Data abertura**  | Sim                       | Sim                    |

---

## Exemplos de Uso

### Uso Direto das Estratégias

```python
# Estratégia HTTP (rápida)
strategy = EmpresaDoisStrategy("https://empresadois.com.br")

result = strategy.extract_cnpj(html_content, "Silva Advogados")
if result:
    print(f"CNPJ: {result.cnpj}")
    print(f"Nome: {result.nome_oficial}")

# Limpeza (não necessária para HTTP)
strategy.cleanup()
```

```python
# Estratégia Selenium (JavaScript)
strategy = EmpresaBizzStrategy("https://cnpj.biz")

# Não precisa passar html_content (Selenium faz própria requisição)
result = strategy.extract_cnpj(None, "Silva Advogados", uf_advogado="MG")

if result:
    print(f"CNPJ: {result.cnpj}")
    print(f"Nome oficial: {result.nome_oficial}")

# Limpeza obrigatória (fechar browser)
strategy.cleanup()
```

### Factory Pattern (Uso Recomendado)

```python
def create_strategy(provider_type: str) -> CNPJScraperStrategy:
    strategies = {
        "empresa_dois": EmpresaDoisStrategy(config.EMPRESA_DOIS_URL),
        "empresa_bizz": EmpresaBizzStrategy(config.EMPRESA_BIZZ_URL)
    }
    return strategies.get(provider_type)

# Uso
strategy = create_strategy("empresa_dois")
result = strategy.extract_cnpj(html, "Empresa")
```

### Context Manager para Selenium

```python
class SeleniumStrategy:
    def __init__(self):
        self.strategy = EmpresaBizzStrategy(config.EMPRESA_BIZZ_URL)

    def __enter__(self):
        return self.strategy

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.strategy.cleanup()

# Uso seguro
with SeleniumStrategy() as strategy:
    result = strategy.extract_cnpj(None, "Empresa", uf_advogado="SP")
    print(f"Resultado: {result.cnpj}")
# Cleanup automático
```

---

## Tratamento de Erros

### EmpresaDoisStrategy

**Erros comuns:**

- HTML structure changed: Seletores CSS não encontram elementos
- Invalid date format: Parse de data falha
- No results: Nenhum `div.city_comp` encontrado

```python
try:
    resultados = soup.find_all("div", class_="city_comp")
    if not resultados:
        logger.warning(f"Nenhum resultado encontrado para: {nome_empresa}")
        return CNPJResult()
except Exception as e:
    logger.error(f"Erro no parsing HTML: {e}")
    return CNPJResult()
```

### EmpresaBizzStrategy

**Erros específicos:**

- `WebDriverException`: Problema com Chrome/Selenium
- `TimeoutException`: Página não carregou JavaScript
- `ElementNotFound`: Seletores não encontram elementos

```python
try:
    driver.get(url)
    WebDriverWait(driver, 15).until(condition)
    # ... extração ...
except TimeoutException:
    logger.error(f"Timeout ao carregar página para: {nome_empresa}")
    return CNPJResult()
except WebDriverException as e:
    logger.error(f"Erro no WebDriver: {e}")
    return CNPJResult()
```

---

## Configuração e Customização

### URLs por Environment

```python
# config.py
EMPRESA_DOIS_URL = os.getenv("EMPRESA_DOIS_URL", "https://empresadois.com.br")
EMPRESA_BIZZ_URL = os.getenv("EMPRESA_BIZZ_URL", "https://cnpj.biz")
```

### Headers Customizados

```python
# EmpresaDoisStrategy usa session do CNPJScraper
# Headers configurados no scraper principal

# EmpresaBizzStrategy usa User-Agent no Chrome
chrome_options.add_argument(f"user-agent={custom_user_agent}")
```

### Timeouts Configuráveis

```python
# Selenium timeouts
driver.implicitly_wait(10)
WebDriverWait(driver, 15).until(condition)

# HTTP timeout configurado no scraper principal
```

---

## Extensibilidade

### Adicionando Nova Estratégia

```python
class NovaEstrategiaStrategy(CNPJScraperStrategy):
    def get_url(self, nome_empresa: str) -> str:
        # Implementar construção de URL
        pass

    def extract_cnpj(self, html_content: str, nome_empresa: str, uf_advogado: Optional[str] = None) -> CNPJResult:
        # Implementar extração específica
        pass

    def get_name(self) -> str:
        return "NovaEstrategia"

    def cleanup(self) -> None:
        # Limpar recursos se necessário
        pass
```

### Registro no CNPJScraper

```python
# Adicionar ao enum
class CNPJProvider(Enum):
    NOVA_ESTRATEGIA = "nova_estrategia"

# Adicionar ao strategies dict
self.strategies[CNPJProvider.NOVA_ESTRATEGIA] = NovaEstrategiaStrategy(url)
```

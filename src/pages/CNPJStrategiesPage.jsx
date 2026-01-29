import CodeBlock from "../components/CodeBlock";

function CNPJStrategiesPage() {
  return (
    <div className="doc-page">
      <h1>Estratégias de Scraping CNPJ</h1>
      <p className="doc-subtitle">
        Estratégias especializadas para diferentes providers de CNPJ com
        anti-detecção.
      </p>

      <section className="doc-section">
        <h2>Descrição</h2>
        <p>
          Este módulo implementa o padrão Strategy para scraping de CNPJs,
          permitindo múltiplos providers com diferentes tecnologias (HTTP
          requests e Selenium) e técnicas anti-detecção específicas para cada
          site.
        </p>
      </section>

      <section className="doc-section">
        <h2>Classe Base: CNPJScraperStrategy</h2>
        <CodeBlock code={`class CNPJScraperStrategy(ABC):`} />
        <p>Interface abstrata para estratégias de scraping de CNPJ.</p>

        <h3>Responsabilidades</h3>
        <ul>
          <li>Definir contrato comum para providers</li>
          <li>Construção de URLs de busca</li>
          <li>Extração de dados do HTML/JavaScript</li>
          <li>Limpeza de recursos quando necessário</li>
        </ul>

        <h3>Métodos Abstratos</h3>

        <div className="method-block">
          <h4>get_url</h4>
          <CodeBlock
            code={`@abstractmethod
def get_url(self, nome_empresa: str) -> str:`}
          />
          <p>Constrói a URL de busca para o nome da empresa.</p>
        </div>

        <div className="method-block">
          <h4>extract_cnpj</h4>
          <CodeBlock
            code={`@abstractmethod
def extract_cnpj(
    self, html_content: str, nome_empresa: str, uf_advogado: Optional[str] = None
) -> CNPJResult:`}
          />
          <p>Extrai CNPJ e nome oficial do conteúdo HTML.</p>
        </div>

        <div className="method-block">
          <h4>get_name</h4>
          <CodeBlock
            code={`@abstractmethod
def get_name(self) -> str:`}
          />
          <p>Retorna o nome do provider para logs.</p>
        </div>

        <div className="method-block">
          <h4>cleanup (opcional)</h4>
          <CodeBlock code={`def cleanup(self) -> None:`} />
          <p>Limpa recursos (drivers Selenium, etc.).</p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Classe de Resultado: CNPJResult</h2>
        <CodeBlock
          code={`@dataclass
class CNPJResult:
    cnpj: Optional[str] = None
    nome_oficial: Optional[str] = None

    def __bool__(self) -> bool:
        return self.cnpj is not None`}
        />
        <p>Resultado da busca de CNPJ com dados estruturados.</p>

        <h3>Campos</h3>
        <ul>
          <li>
            <code className="code-block">cnpj</code>: CNPJ no formato
            XX.XXX.XXX/XXXX-XX
          </li>
          <li>
            <code className="code-block">nome_oficial</code>: Razão social
            conforme Receita Federal
          </li>
        </ul>

        <h3>Uso como boolean</h3>
        <CodeBlock
          code={`result = strategy.extract_cnpj(html, "Empresa")
if result:  # True se cnpj não é None
    print(f"CNPJ: {result.cnpj}")`}
        />
      </section>

      <section className="doc-section">
        <h2 id="EmpresaDoisStrategy">Estratégia: EmpresaDoisStrategy</h2>
        <CodeBlock code={`class EmpresaDoisStrategy(CNPJScraperStrategy):`} />
        <p>
          Estratégia para busca via empresadois.com.br usando HTTP requests.
        </p>

        <h3>Características</h3>
        <ul>
          <li>Rápido (apenas HTTP)</li>
          <li>Não requer JavaScript</li>
          <li>Parsing com BeautifulSoup</li>
          <li>Fuzzy matching para melhor precisão</li>
          <li>Critério de desempate por data de abertura</li>
        </ul>

        <h3>Métodos Implementados</h3>

        <div className="method-block">
          <h4>get_url</h4>
          <CodeBlock
            code={`def get_url(self, nome_empresa: str) -> str:
    nome_encoded = quote_plus(nome_empresa)
    return f"{self.base_url}?q={nome_encoded}&sf=widget_search"`}
          />
          <p>Constrói URL com encoding seguro para caracteres especiais.</p>
        </div>

        <div className="method-block">
          <h4>extract_cnpj</h4>
          <CodeBlock
            code={`def extract_cnpj(
    self, html_content: str, nome_empresa: str, uf_advogado: Optional[str] = None
) -> CNPJResult:`}
          />

          <h5>Algoritmo de extração</h5>
          <ol>
            <li>
              <strong>Parse HTML</strong>: BeautifulSoup para estrutura DOM
            </li>
            <li>
              <strong>Busca resultados</strong>:{" "}
              <code className="code-block">div.city_comp</code> para cada
              empresa
            </li>
            <li>
              <strong>Extração dados</strong>: Nome, CNPJ, data de abertura
            </li>
            <li>
              <strong>Fuzzy matching</strong>: Score de similaridade entre nomes
            </li>
            <li>
              <strong>Critério desempate</strong>: Data de abertura mais recente
            </li>
            <li>
              <strong>Retorno</strong>: Melhor match encontrado
            </li>
          </ol>

          <h5>Estrutura HTML esperada</h5>
          <CodeBlock
            code={`<div class="city_comp">
    <a>Nome da Empresa</a>
    <p class="city_info">12.345.678/0001-99 | Outras informações</p>
    <p class="city_info">Data de abertura: 15/03/2010</p>
</div>`}
          />

          <h5>Regex patterns</h5>
          <CodeBlock
            code={`padrao_cnpj = re.compile(r"\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}")
match_data = re.search(r"(\\d{2}/\\d{2}/\\d{4})", texto)`}
          />

          <h5>Scoring algorithm</h5>
          <CodeBlock
            code={`score = fuzz.ratio(nome_empresa_normalizado, nome_resultado_normalizado)

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
        best_match = novo_resultado`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2 id="EmpresaBizzStrategy">Estratégia: EmpresaBizzStrategy</h2>
        <CodeBlock code={`class EmpresaBizzStrategy(CNPJScraperStrategy):`} />
        <p>
          Estratégia para busca via cnpj.biz usando Selenium (site requer
          JavaScript).
        </p>

        <h3>Características</h3>
        <ul>
          <li>Selenium WebDriver (Chrome headless)</li>
          <li>Configurações anti-detecção avançadas</li>
          <li>Critério de desempate por UF quando fornecida</li>
          <li>Parsing dinâmico de JavaScript</li>
          <li>Timeout inteligente e retry</li>
        </ul>

        <h3>Inicialização Selenium</h3>

        <div className="method-block">
          <h4>_init_driver</h4>
          <CodeBlock code={`def _init_driver(self):`} />
          <p>Inicializa Chrome WebDriver com configurações anti-detecção.</p>

          <h5>Configurações Chrome</h5>
          <CodeBlock
            code={`chrome_options = Options()
chrome_options.add_argument("--headless=new")        # Modo headless
chrome_options.add_argument("--no-sandbox")          # Bypass sandbox
chrome_options.add_argument("--disable-dev-shm-usage") # Uso de memória

# Anti-detecção
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option("useAutomationExtension", False)
chrome_options.add_argument("--disable-blink-features=AutomationControlled")

# User agent realista
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64)...")`}
          />

          <h5>Script anti-detecção</h5>
          <CodeBlock
            code={`Object.defineProperty(navigator, 'webdriver', {
    get: () => undefined,
});

window.navigator.chrome = {
    runtime: {},
};

Object.defineProperty(navigator, 'plugins', {
    get: () => [1, 2, 3, 4, 5],
});`}
          />
        </div>

        <h3>Extração com Selenium</h3>

        <div className="method-block">
          <h4>extract_cnpj</h4>
          <CodeBlock
            code={`def extract_cnpj(
    self, html_content: str, nome_empresa: str, uf_advogado: Optional[str] = None
) -> CNPJResult:`}
          />

          <h5>Fluxo de extração</h5>
          <ol>
            <li>
              <strong>Inicialização</strong>: Driver Selenium com anti-detecção
            </li>
            <li>
              <strong>Navegação</strong>: Acesso à URL de busca
            </li>
            <li>
              <strong>Wait</strong>: Aguarda carregamento do JavaScript
            </li>
            <li>
              <strong>Parse</strong>: Extração de elementos dinâmicos
            </li>
            <li>
              <strong>Análise</strong>: Scoring e desempate com UF
            </li>
            <li>
              <strong>Retorno</strong>: Melhor resultado encontrado
            </li>
          </ol>

          <h5>Seletores CSS</h5>
          <CodeBlock
            code={`# Lista de resultados
'div.shadow ul[role="list"] > li'

# Nome da empresa
"p.text-lg.font-medium.text-blue-600"

# Informações (CNPJ, localização)
'.//p[@class="flex items-center text-sm text-gray-500"]'

# Data de abertura
"time"  # com atributo datetime`}
          />

          <h5>Wait conditions</h5>
          <CodeBlock
            code={`WebDriverWait(driver, 15).until(
    EC.presence_of_element_located(
        (By.CSS_SELECTOR, 'div.shadow ul[role="list"]')
    )
)`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Algoritmo de Desempate Avançado</h2>

        <h3>Critério por UF (quando fornecida)</h3>
        <ol>
          <li>
            <strong>Prioridade máxima</strong>: Resultados com UF correspondente
          </li>
          <li>
            <strong>Fallback</strong>: Melhor score geral se nenhum match de UF
          </li>
          <li>
            <strong>Warning</strong>: Log quando não há correspondência de UF
          </li>
        </ol>

        <CodeBlock
          code={`if uf_advogado:
    # Filtra resultados com UF correspondente
    uf_matches = [r for r in all_results if r["uf_match"]]

    if uf_matches:
        # Melhor entre os que batem UF
        best_match = max(uf_matches, key=lambda x: (x["score"], x["date"]))
        logger.info(f"✓ Match com UF correspondente ({best_match['uf']})")
    else:
        # Nenhum com UF correspondente
        best_match = max(all_results, key=lambda x: (x["score"], x["date"]))
        logger.warning(f"⚠ Nenhum resultado com UF={uf_advogado}")`}
        />

        <h3>Penalização por traço</h3>
        <CodeBlock
          code={`# Empresa buscada: "Silva Advogados"
# Resultado: "Silva - Advogados Ltda"
# Aplica pequena penalização se resultado tem traço e busca não tem

has_dash_in_search = "-" in nome_empresa
has_dash_in_result = "-" in company_name_result

if not has_dash_in_search and has_dash_in_result:
    dash_penalty = 2  # Penalização leve
    score = max(0, score - dash_penalty)`}
        />
      </section>

      <section className="doc-section">
        <h2>Limpeza de Recursos</h2>

        <div className="method-block">
          <h3>cleanup</h3>
          <CodeBlock code={`def cleanup(self):`} />
          <p>Fecha driver Selenium de forma segura.</p>
          <CodeBlock
            code={`if self._driver:
    try:
        self._driver.quit()
        logger.info("Driver Selenium fechado")
    except Exception as e:
        logger.error(f"Erro ao fechar driver: {e}")
    finally:
        self._driver = None
        self._driver_initialized = False`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Comparação entre Estratégias</h2>
        <table className="params-table">
          <thead>
            <tr>
              <th>Aspecto</th>
              <th>EmpresaDoisStrategy</th>
              <th>EmpresaBizzStrategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Tecnologia</strong>
              </td>
              <td>HTTP + BeautifulSoup</td>
              <td>Selenium + Chrome</td>
            </tr>
            <tr>
              <td>
                <strong>Velocidade</strong>
              </td>
              <td>Rápido (~200ms)</td>
              <td>Lento (~3-5s)</td>
            </tr>
            <tr>
              <td>
                <strong>JavaScript</strong>
              </td>
              <td>Não suporta</td>
              <td>Suporta totalmente</td>
            </tr>
            <tr>
              <td>
                <strong>Anti-detecção</strong>
              </td>
              <td>Headers HTTP</td>
              <td>Configuração completa</td>
            </tr>
            <tr>
              <td>
                <strong>Recursos</strong>
              </td>
              <td>Baixo consumo</td>
              <td>Alto consumo (RAM/CPU)</td>
            </tr>
            <tr>
              <td>
                <strong>Confiabilidade</strong>
              </td>
              <td>Pode quebrar com mudanças</td>
              <td>Mais resiliente</td>
            </tr>
            <tr>
              <td>
                <strong>Desempate UF</strong>
              </td>
              <td>Não implementado</td>
              <td>Implementado</td>
            </tr>
            <tr>
              <td>
                <strong>Data abertura</strong>
              </td>
              <td>Sim</td>
              <td>Sim</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="doc-section">
        <h2>Exemplos de Uso</h2>

        <h3>Uso Direto das Estratégias</h3>
        <CodeBlock
          code={`# Estratégia HTTP (rápida)
strategy = EmpresaDoisStrategy("https://empresadois.com.br")

result = strategy.extract_cnpj(html_content, "Silva Advogados")
if result:
    print(f"CNPJ: {result.cnpj}")
    print(f"Nome: {result.nome_oficial}")

# Limpeza (não necessária para HTTP)
strategy.cleanup()`}
        />

        <CodeBlock
          code={`# Estratégia Selenium (JavaScript)
strategy = EmpresaBizzStrategy("https://cnpj.biz")

# Não precisa passar html_content (Selenium faz própria requisição)
result = strategy.extract_cnpj(None, "Silva Advogados", uf_advogado="MG")

if result:
    print(f"CNPJ: {result.cnpj}")
    print(f"Nome oficial: {result.nome_oficial}")

# Limpeza obrigatória (fechar browser)
strategy.cleanup()`}
        />

        <h3>Factory Pattern (Uso Recomendado)</h3>
        <CodeBlock
          code={`def create_strategy(provider_type: str) -> CNPJScraperStrategy:
    strategies = {
        "empresa_dois": EmpresaDoisStrategy(config.EMPRESA_DOIS_URL),
        "empresa_bizz": EmpresaBizzStrategy(config.EMPRESA_BIZZ_URL)
    }
    return strategies.get(provider_type)

# Uso
strategy = create_strategy("empresa_dois")
result = strategy.extract_cnpj(html, "Empresa")`}
        />

        <h3>Context Manager para Selenium</h3>
        <CodeBlock
          code={`class SeleniumStrategy:
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
# Cleanup automático`}
        />
      </section>

      <section className="doc-section">
        <h2>Tratamento de Erros</h2>

        <h3>EmpresaDoisStrategy</h3>
        <p>
          <strong>Erros comuns:</strong>
        </p>
        <ul>
          <li>HTML structure changed: Seletores CSS não encontram elementos</li>
          <li>Invalid date format: Parse de data falha</li>
          <li>
            No results: Nenhum <code className="code-block">div.city_comp</code>{" "}
            encontrado
          </li>
        </ul>

        <CodeBlock
          code={`try:
    resultados = soup.find_all("div", class_="city_comp")
    if not resultados:
        logger.warning(f"Nenhum resultado encontrado para: {nome_empresa}")
        return CNPJResult()
except Exception as e:
    logger.error(f"Erro no parsing HTML: {e}")
    return CNPJResult()`}
        />

        <h3>EmpresaBizzStrategy</h3>
        <p>
          <strong>Erros específicos:</strong>
        </p>
        <ul>
          <li>
            <code className="code-block">WebDriverException</code>: Problema com
            Chrome/Selenium
          </li>
          <li>
            <code className="code-block">TimeoutException</code>: Página não
            carregou JavaScript
          </li>
          <li>
            <code className="code-block">ElementNotFound</code>: Seletores não
            encontram elementos
          </li>
        </ul>

        <CodeBlock
          code={`try:
    driver.get(url)
    WebDriverWait(driver, 15).until(condition)
    # ... extração ...
except TimeoutException:
    logger.error(f"Timeout ao carregar página para: {nome_empresa}")
    return CNPJResult()
except WebDriverException as e:
    logger.error(f"Erro no WebDriver: {e}")
    return CNPJResult()`}
        />
      </section>

      <section className="doc-section">
        <h2>Configuração e Customização</h2>

        <h3>URLs por Environment</h3>
        <CodeBlock
          code={`# config.py
EMPRESA_DOIS_URL = os.getenv("EMPRESA_DOIS_URL", "https://empresadois.com.br")
EMPRESA_BIZZ_URL = os.getenv("EMPRESA_BIZZ_URL", "https://cnpj.biz")`}
        />

        <h3>Headers Customizados</h3>
        <CodeBlock
          code={`# EmpresaDoisStrategy usa session do CNPJScraper
# Headers configurados no scraper principal

# EmpresaBizzStrategy usa User-Agent no Chrome
chrome_options.add_argument(f"user-agent={custom_user_agent}")`}
        />

        <h3>Timeouts Configuráveis</h3>
        <CodeBlock
          code={`# Selenium timeouts
driver.implicitly_wait(10)
WebDriverWait(driver, 15).until(condition)

# HTTP timeout configurado no scraper principal`}
        />
      </section>

      <section className="doc-section">
        <h2>Extensibilidade</h2>

        <h3>Adicionando Nova Estratégia</h3>
        <CodeBlock
          code={`class NovaEstrategiaStrategy(CNPJScraperStrategy):
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
        pass`}
        />

        <h3>Registro no CNPJScraper</h3>
        <CodeBlock
          code={`# Adicionar ao enum
class CNPJProvider(Enum):
    NOVA_ESTRATEGIA = "nova_estrategia"

# Adicionar ao strategies dict
self.strategies[CNPJProvider.NOVA_ESTRATEGIA] = NovaEstrategiaStrategy(url)`}
        />
      </section>
    </div>
  );
}

export default CNPJStrategiesPage;

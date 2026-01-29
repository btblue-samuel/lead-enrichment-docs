import CodeBlock from "../components/CodeBlock";

function CNPJScraperPage() {
  return (
    <div className="doc-page">
      <h1>Classe: CNPJScraper</h1>
      <p className="doc-subtitle">
        Scraper especializado para busca de CNPJs com suporte a múltiplos
        providers.
      </p>

      <section className="doc-section">
        <h2>Descrição</h2>
        <p>
          A classe <code className="code-block">CNPJScraper</code> realiza web
          scraping para encontrar CNPJs de empresas usando diferentes providers
          com fallback automático, cache inteligente e observabilidade completa.
        </p>
      </section>

      <section className="doc-section">
        <h2>Classe CNPJScraper</h2>
        <CodeBlock code={`class CNPJScraper:`} />
        <p>
          Scraper especializado para busca de CNPJs com múltiplos providers.
        </p>

        <h3>Responsabilidades</h3>
        <ul>
          <li>Web scraping de CNPJs em múltiplos sites</li>
          <li>Fallback automático entre providers</li>
          <li>Cache inteligente de resultados</li>
          <li>Rate limiting e comportamento anti-detecção</li>
          <li>Retry com backoff exponencial</li>
          <li>Métricas de sucesso por provider</li>
        </ul>

        <h3>Providers suportados</h3>
        <ul>
          <li>
            <strong>EMPRESA_DOIS</strong>: empresadois.com.br (HTTP requests)
          </li>
          <li>
            <strong>EMPRESA_BIZZ</strong>: cnpj.biz (Selenium/JavaScript)
          </li>
          <li>
            <strong>AUTO</strong>: Fallback automático (EMPRESA_DOIS →
            EMPRESA_BIZZ)
          </li>
        </ul>
      </section>

      <section className="doc-section">
        <h2>Enum CNPJProvider</h2>
        <CodeBlock
          code={`class CNPJProvider(Enum):
    EMPRESA_DOIS = "empresa_dois"
    EMPRESA_BIZZ = "empresa_bizz"
    AUTO = "auto"`}
        />
        <p>Providers disponíveis para consulta de CNPJ.</p>

        <h3>Estratégias</h3>
        <ul>
          <li>
            <code className="code-block">EMPRESA_DOIS</code>: Rápido via HTTP,
            sem JavaScript
          </li>
          <li>
            <code className="code-block">EMPRESA_BIZZ</code>: Selenium para
            sites que requerem JavaScript
          </li>
          <li>
            <code className="code-block">AUTO</code>: Tenta EMPRESA_DOIS
            primeiro, fallback para EMPRESA_BIZZ
          </li>
        </ul>
      </section>

      <section className="doc-section">
        <h2>Inicialização</h2>

        <div className="method-block">
          <h3 id="__init__">__init__</h3>
          <CodeBlock
            code={`def __init__(
    self,
    timeout: int = 10,
    session: requests.Session = None,
    max_retries: int = 3,
    provider: CNPJProvider = CNPJProvider.AUTO,
):`}
          />
          <p>Inicializa o scraper de CNPJ com configuração otimizada.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Parâmetro</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>timeout</td>
                <td>
                  <code className="code-block">int</code>
                </td>
                <td>Timeout para requisições HTTP</td>
              </tr>
              <tr>
                <td>session</td>
                <td>
                  <code className="code-block">Optional[Session]</code>
                </td>
                <td>Sessão HTTP reutilizável</td>
              </tr>
              <tr>
                <td>max_retries</td>
                <td>
                  <code className="code-block">int</code>
                </td>
                <td>Máximo de tentativas por provider</td>
              </tr>
              <tr>
                <td>provider</td>
                <td>
                  <code className="code-block">CNPJProvider</code>
                </td>
                <td>Provider padrão a usar</td>
              </tr>
            </tbody>
          </table>

          <h4>Headers anti-detecção</h4>
          <CodeBlock
            code={`{
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
}`}
          />

          <h4>Estratégias inicializadas</h4>
          <CodeBlock
            code={`self.strategies = {
    CNPJProvider.EMPRESA_DOIS: EmpresaDoisStrategy(config.EMPRESA_DOIS_URL),
    CNPJProvider.EMPRESA_BIZZ: EmpresaBizzStrategy(config.EMPRESA_BIZZ_URL),
}`}
          />

          <h4>Cache de sessão</h4>
          <CodeBlock code={`self.cnpj_cache: Dict[str, CNPJResult] = {}`} />
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos Principais de Consulta</h2>

        <div className="method-block">
          <h3 id="consultar_cnpj">consultar_cnpj</h3>
          <CodeBlock
            code={`def consultar_cnpj(
    self,
    nome_empresa: str,
    use_cache: bool = True,
    provider_override: Optional[CNPJProvider] = None,
    uf_advogado: Optional[str] = None,
) -> Optional[str]:`}
          />
          <p>Consulta o CNPJ de uma empresa pelo nome (retorna apenas CNPJ).</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Parâmetro</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>nome_empresa</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Nome da empresa a consultar</td>
              </tr>
              <tr>
                <td>use_cache</td>
                <td>
                  <code className="code-block">bool</code>
                </td>
                <td>Se deve usar cache de resultados</td>
              </tr>
              <tr>
                <td>provider_override</td>
                <td>
                  <code className="code-block">Optional[CNPJProvider]</code>
                </td>
                <td>Provider específico para esta consulta</td>
              </tr>
              <tr>
                <td>uf_advogado</td>
                <td>
                  <code className="code-block">Optional[str]</code>
                </td>
                <td>UF para critério de desempate</td>
              </tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code className="code-block">Optional[str]</code>
                </td>
                <td>CNPJ encontrado (formato XX.XXX.XXX/XXXX-XX) ou None</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`cnpj = scraper.consultar_cnpj("Silva & Associados Advogados")
print(cnpj)  # "12.345.678/0001-99"`}
          />
        </div>

        <div className="method-block">
          <h3 id="consultar_cnpj_com_nome">consultar_cnpj_com_nome</h3>
          <CodeBlock
            code={`def consultar_cnpj_com_nome(
    self,
    nome_empresa: str,
    use_cache: bool = True,
    provider_override: Optional[CNPJProvider] = None,
    uf_advogado: Optional[str] = None,
) -> CNPJResult:`}
          />
          <p>Consulta CNPJ e retorna também o nome oficial da empresa.</p>

          <h4>Retorno</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code className="code-block">CNPJResult</code>
                </td>
                <td>Objeto com CNPJ e nome oficial (razão social)</td>
              </tr>
            </tbody>
          </table>

          <h4>Vantagens</h4>
          <ul>
            <li>Retorna nome oficial conforme Receita Federal</li>
            <li>Pode diferir do nome fornecido (acentos, hífens, etc.)</li>
            <li>Útil para padronização de dados</li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`result = scraper.consultar_cnpj_com_nome("Silva Advogados")
if result.cnpj:
    print(f"CNPJ: {result.cnpj}")
    print(f"Razão Social: {result.nome_oficial}")
    # CNPJ: 12.345.678/0001-99
    # Razão Social: Silva & Associados Advocacia Ltda`}
          />

          <h4>Cache com UF</h4>
          <CodeBlock
            code={`# Cache diferenciado por UF quando fornecida
cache_key = nome_empresa.lower()
if uf_advogado:
    cache_key = f"{cache_key}_{uf_advogado.upper()}"`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Sistema de Fallback Automático</h2>

        <div className="method-block">
          <h3 id="_try_provider">_try_provider</h3>
          <CodeBlock
            code={`def _try_provider(
    self,
    provider: CNPJProvider,
    nome_empresa: str,
    uf_advogado: Optional[str] = None,
) -> CNPJResult:`}
          />
          <p>
            Tenta consultar CNPJ usando provider específico (método privado).
          </p>

          <h4>Fluxo com retry</h4>
          <ol>
            <li>
              <strong>Delay inicial</strong>: Entre tentativas para simular
              comportamento humano
            </li>
            <li>
              <strong>Requisição</strong>: HTTP ou Selenium dependendo do
              provider
            </li>
            <li>
              <strong>Error handling</strong>: Categorizado por tipo de erro
            </li>
            <li>
              <strong>Backoff</strong>: Delay exponencial entre tentativas
            </li>
            <li>
              <strong>Logging</strong>: Detalhado por tentativa e resultado
            </li>
          </ol>

          <h4>Rate limiting inteligente</h4>
          <CodeBlock
            code={`if attempt > 0:
    wait_time = 2 + attempt  # 2s, 3s, 4s...
    logger.debug(f"Aguardando {wait_time}s antes da requisição...")
    time.sleep(wait_time)`}
          />

          <h4>Tratamento de erros específicos</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Erro HTTP</th>
                <th>Estratégia</th>
                <th>Wait Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>403 Forbidden</td>
                <td>Anti-bot detectado</td>
                <td>5 * (attempt + 1)s</td>
              </tr>
              <tr>
                <td>429 Rate Limit</td>
                <td>Quota excedida</td>
                <td>4 * (attempt + 1)s</td>
              </tr>
              <tr>
                <td>Timeout</td>
                <td>Rede lenta</td>
                <td>Retry imediato</td>
              </tr>
              <tr>
                <td>Connection</td>
                <td>Rede instável</td>
                <td>2 * (attempt + 1)s</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Fallback Automático (AUTO mode)</h3>
        <CodeBlock
          code={`if provider == CNPJProvider.AUTO:
    # Tentar EMPRESA_DOIS primeiro (mais rápido)
    result = self._try_provider(CNPJProvider.EMPRESA_DOIS, nome_empresa, uf_advogado)

    # Fallback para EMPRESA_BIZZ se necessário
    if not result.cnpj:
        logger.info("Tentando provider alternativo (EmpresaBizz/Selenium)")
        result = self._try_provider(CNPJProvider.EMPRESA_BIZZ, nome_empresa, uf_advogado)`}
        />

        <h4>Logs informativos</h4>
        <CodeBlock
          code={`logger.info("[EmpresaDois] Consultando CNPJ para: Silva Advogados (tentativa 1/3)")
logger.info("[EmpresaDois] ❌ CNPJ não encontrado")
logger.info("Tentando provider alternativo (EmpresaBizz/Selenium)")
logger.info("[EmpresaBizz] ✅ CNPJ encontrado: 12.345.678/0001-99")`}
        />
      </section>

      <section className="doc-section">
        <h2>Métodos de Cache</h2>

        <div className="method-block">
          <h3 id="limpar_cache">limpar_cache</h3>
          <CodeBlock code={`def limpar_cache(self) -> None:`} />
          <p>Limpa o cache de CNPJs consultados.</p>
          <CodeBlock
            code={`scraper.limpar_cache()  # Reset para nova sessão`}
          />
        </div>

        <div className="method-block">
          <h3 id="obter_estatisticas_cache">obter_estatisticas_cache</h3>
          <CodeBlock
            code={`def obter_estatisticas_cache(self) -> Dict[str, int]:`}
          />
          <p>Retorna estatísticas detalhadas do cache.</p>
          <CodeBlock
            code={`{
    "total_consultas": 150,      # Total de itens no cache
    "sucessos": 128,             # Consultas que encontraram CNPJ
    "falhas": 22,                # Consultas sem resultado
    "taxa_sucesso": 85.33,       # Percentual de sucesso
    "total_requisicoes": 180     # Total de requisições HTTP feitas
}`}
          />
        </div>

        <div className="method-block">
          <h3>obter_cnpj_do_cache</h3>
          <CodeBlock
            code={`def obter_cnpj_do_cache(self, nome_empresa: str) -> Optional[str]:`}
          />
          <p>Obtém CNPJ do cache sem fazer nova consulta.</p>
          <CodeBlock
            code={`# Verificar se já consultado
cnpj = scraper.obter_cnpj_do_cache("Silva Advogados")
if cnpj:
    print(f"CNPJ em cache: {cnpj}")
else:
    # Fazer nova consulta
    cnpj = scraper.consultar_cnpj("Silva Advogados")`}
          />
        </div>

        <div className="method-block">
          <h3>obter_resultado_do_cache</h3>
          <CodeBlock
            code={`def obter_resultado_do_cache(self, nome_empresa: str) -> Optional[CNPJResult]:`}
          />
          <p>Obtém resultado completo (CNPJ + nome oficial) do cache.</p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Limpeza de Recursos</h2>

        <div className="method-block">
          <h3 id="cleanup">cleanup</h3>
          <CodeBlock code={`def cleanup(self) -> None:`} />
          <p>Limpa recursos (fecha drivers Selenium, etc.).</p>
          <ul>
            <li>
              Chama <code className="code-block">cleanup()</code> em todas as
              estratégias
            </li>
            <li>Fecha drivers Selenium se iniciados</li>
            <li>Libera recursos de rede</li>
            <li>Log de confirmação</li>
          </ul>
          <CodeBlock
            code={`try:
    result = scraper.consultar_cnpj("Empresa")
finally:
    scraper.cleanup()  # Sempre limpar recursos`}
          />
        </div>

        <div className="method-block">
          <h3>__del__</h3>
          <CodeBlock code={`def __del__(self):`} />
          <p>Destrutor que garante cleanup ao finalizar objeto.</p>
          <ul>
            <li>Cleanup automático ao sair de escopo</li>
            <li>Silencia erros durante shutdown do interpretador</li>
            <li>Prevenção de vazamentos de recursos</li>
          </ul>
        </div>
      </section>

      <section className="doc-section">
        <h2>Tratamento de Erros Avançado</h2>

        <h3>Categorização por Provider</h3>

        <h4>EMPRESA_DOIS (HTTP)</h4>
        <ul>
          <li>Timeout: Rede lenta, retry imediato</li>
          <li>403: Site detectou bot, delay maior</li>
          <li>429: Rate limit, aguardar mais tempo</li>
          <li>Connection: Problemas de rede, delay progressivo</li>
        </ul>

        <h4>EMPRESA_BIZZ (Selenium)</h4>
        <ul>
          <li>WebDriverException: Problema com browser</li>
          <li>TimeoutException: JavaScript não carregou</li>
          <li>ElementNotFound: Estrutura da página mudou</li>
        </ul>

        <h3>Logs Estruturados</h3>
        <CodeBlock
          code={`# Por provider e tentativa
logger.info(f"[{strategy.get_name()}] Consultando CNPJ para: {nome_empresa} "
           f"(tentativa {attempt + 1}/{max_retries})")

# Resultados detalhados
if result.cnpj:
    logger.info(f"[{strategy.get_name()}] ✅ CNPJ encontrado: {result.cnpj}")
else:
    logger.warning(f"[{strategy.get_name()}] ❌ CNPJ não encontrado")`}
        />

        <h3>Retry Inteligente</h3>
        <CodeBlock
          code={`# Delay baseado no tipo de erro
if response.status_code == 403:
    wait_time = 5 * (attempt + 1)  # Maior delay para anti-bot
elif response.status_code == 429:
    wait_time = 4 * (attempt + 1)  # Delay para rate limit
else:
    wait_time = 2 * (attempt + 1)  # Delay padrão`}
        />
      </section>

      <section className="doc-section">
        <h2>Exemplos de Uso</h2>

        <h3>Uso Básico com Fallback</h3>
        <CodeBlock
          code={`# Inicialização com fallback automático
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
scraper.cleanup()`}
        />

        <h3>Consulta com Nome Oficial</h3>
        <CodeBlock
          code={`# Obter dados completos
result = scraper.consultar_cnpj_com_nome("Silva Advogados")

if result.cnpj:
    print(f"CNPJ: {result.cnpj}")
    print(f"Razão Social: {result.nome_oficial}")

    # Comparar nomes
    if result.nome_oficial != "Silva Advogados":
        print(f"Nome divergente detectado!")`}
        />

        <h3>Provider Específico</h3>
        <CodeBlock
          code={`# Forçar uso de Selenium (para sites complexos)
result = scraper.consultar_cnpj_com_nome(
    nome_empresa="Empresa Complexa Ltd",
    provider_override=CNPJProvider.EMPRESA_BIZZ
)

# Forçar uso de HTTP (para velocidade)
result = scraper.consultar_cnpj_com_nome(
    nome_empresa="Empresa Simples",
    provider_override=CNPJProvider.EMPRESA_DOIS
)`}
        />

        <h3>Critério de Desempate por UF</h3>
        <CodeBlock
          code={`# UF do advogado para melhor precisão
result = scraper.consultar_cnpj_com_nome(
    nome_empresa="Silva Advogados",
    uf_advogado="MG"  # Prioriza resultados de MG
)

# Útil quando há várias empresas com nome similar`}
        />

        <h3>Processamento em Lote</h3>
        <CodeBlock
          code={`empresas = ["Silva Advogados", "Santos & Associados", "Oliveira Ltda"]
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
print(f"\\n📊 Taxa de sucesso: {stats['taxa_sucesso']:.1f}%")
print(f"📊 Total de requisições: {stats['total_requisicoes']}")`}
        />

        <h3>Monitoramento e Cache</h3>
        <CodeBlock
          code={`# Verificar cache antes de consultar
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
        print(f"   Eficiência cache: {cache_efficiency:.1%}")`}
        />

        <h3>Context Manager</h3>
        <CodeBlock
          code={`# Uso com contexto (cleanup automático)
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
# Cleanup automático`}
        />
      </section>

      <section className="doc-section">
        <h2>Configuração Avançada</h2>

        <h3>Sessão Customizada</h3>
        <CodeBlock
          code={`# Configurar sessão com proxy
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
scraper = CNPJScraper(session=session, timeout=30)`}
        />

        <h3>Configuração por Provider</h3>
        <CodeBlock
          code={`# URLs customizadas
config.EMPRESA_DOIS_URL = "https://empresadois-custom.com.br"
config.EMPRESA_BIZZ_URL = "https://cnpj-custom.biz"

# Inicialização com configuração específica
scraper = CNPJScraper(
    timeout=20,
    max_retries=5,
    provider=CNPJProvider.EMPRESA_BIZZ  # Apenas Selenium
)`}
        />
      </section>
    </div>
  );
}

export default CNPJScraperPage;

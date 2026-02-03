import CodeBlock from "../components/CodeBlock";

function PloomesAPIPage() {
  return (
    <div className="doc-page">
      <h1>Classe: PloomesAPI</h1>
      <p className="doc-subtitle">
        Cliente HTTP especializado para comunicação direta com a API do Ploomes.
      </p>

      <section className="doc-section">
        <h2>Descrição</h2>
        <p>
          A classe <code className="code-block">PloomesAPI</code> é responsável
          exclusivamente pelas chamadas HTTP diretas para os endpoints do
          Ploomes. Implementa observabilidade completa com métricas, logging
          estruturado e tratamento robusto de erros, mantendo-se livre de lógica
          de negócio ou orquestração.
        </p>
      </section>

      <section className="doc-section">
        <h2>Classe PloomesAPI</h2>
        <CodeBlock code={`class PloomesAPI:`} />
        <p>
          Cliente HTTP especializado para interações diretas com a API Ploomes.
        </p>

        <h3>Responsabilidades</h3>
        <ul>
          <li>Chamadas HTTP diretas aos endpoints Ploomes</li>
          <li>Autenticação e configuração de sessão</li>
          <li>Instrumentação com métricas de observabilidade</li>
          <li>Logging estruturado com correlation_id</li>
          <li>Tradução robusta de erros HTTP</li>
          <li>Cache estratégico para consultas frequentes</li>
        </ul>

        <h3>Princípios</h3>
        <ul>
          <li>
            <strong>Single Responsibility</strong>: Apenas interações HTTP
          </li>
          <li>
            <strong>Stateless</strong>: Sem lógica de negócio ou fluxo
          </li>
          <li>
            <strong>Observable</strong>: Todas as operações instrumentadas
          </li>
          <li>
            <strong>Resilient</strong>: Tratamento robusto de erros de rede
          </li>
        </ul>
      </section>

      <section className="doc-section">
        <h2>Inicialização</h2>

        <div className="method-block">
          <h3 id="__init__">__init__</h3>
          <CodeBlock
            code={`def __init__(self, environment: Optional[str], logger: logging.Logger) -> None:`}
          />
          <p>Inicializa cliente API com configuração e observabilidade.</p>

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
                <td>environment</td>
                <td>
                  <code className="code-block">Optional[str]</code>
                </td>
                <td>Ambiente (prod/sandbox)</td>
              </tr>
              <tr>
                <td>logger</td>
                <td>
                  <code className="code-block">logging.Logger</code>
                </td>
                <td>Logger para instrumentação</td>
              </tr>
            </tbody>
          </table>

          <h4>Configuração automática</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Fonte</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>base_url</td>
                <td>
                  <code className="code-block">config.get_base_url()</code>
                </td>
                <td>URL base da API</td>
              </tr>
              <tr>
                <td>user_key</td>
                <td>
                  <code className="code-block">config.PLOOMES_USER_KEY</code>
                </td>
                <td>Chave de autenticação</td>
              </tr>
              <tr>
                <td>timeout</td>
                <td>
                  <code className="code-block">config.TIMEOUT</code>
                </td>
                <td>Timeout para requisições</td>
              </tr>
              <tr>
                <td>rate_limit_delay</td>
                <td>
                  <code className="code-block">config.RATE_LIMIT_DELAY</code>
                </td>
                <td>Delay entre requests</td>
              </tr>
            </tbody>
          </table>

          <h4>Sessão HTTP otimizada</h4>
          <CodeBlock
            code={`# Configuração de pool de conexões
adapter = HTTPAdapter(
    pool_connections=config.HTTP_ADAPTER_POOL_CONNECTIONS,
    pool_maxsize=config.HTTP_ADAPTER_POOL_MAXSIZE,
    max_retries=config.HTTP_ADAPTER_MAX_RETRIES,
)`}
          />

          <h4>Headers padrão</h4>
          <CodeBlock
            code={`{
    "User-Key": "sua_user_key_aqui",
    "Content-Type": "application/json"
}`}
          />

          <h4>Observabilidade inicializada</h4>
          <ul>
            <li>Registry de métricas específico para API</li>
            <li>Contador de requisições</li>
            <li>Cache para escritórios com advogado principal</li>
          </ul>

          <h4>Validação na inicialização</h4>
          <ul>
            <li>
              Testa user-key via endpoint{" "}
              <code className="code-block">/Contacts?$top=1</code>
            </li>
            <li>
              Levanta <code className="code-block">InvalidUserKeyError</code> se
              inválida
            </li>
            <li>Log de confirmação da inicialização</li>
          </ul>
        </div>
      </section>

      <section className="doc-section">
        <h2>Sistema de Observabilidade</h2>

        <div className="method-block">
          <h3 id="_handle_request">_handle_request</h3>
          <CodeBlock
            code={`def _handle_request(self, method: str, url: str, **kwargs) -> requests.Response:`}
          />
          <p>
            Executa requisição HTTP com instrumentação completa de
            observabilidade.
          </p>

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
                <td>method</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Método HTTP (GET, POST, PATCH)</td>
              </tr>
              <tr>
                <td>url</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>URL da requisição</td>
              </tr>
              <tr>
                <td>**kwargs</td>
                <td>
                  <code className="code-block">Any</code>
                </td>
                <td>Argumentos para requests</td>
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
                  <code className="code-block">requests.Response</code>
                </td>
                <td>Resposta HTTP validada</td>
              </tr>
            </tbody>
          </table>

          <h4>Instrumentação automática</h4>

          <h5>1. Correlation tracking</h5>
          <CodeBlock
            code={`correlation = get_correlation_id()  # UUID único para rastreamento`}
          />

          <h5>2. Métricas de performance</h5>
          <CodeBlock
            code={`operation_name = f"{method}_{url.split('/')[-1].split('(')[0]}"
start_time = time.perf_counter()
duration_ms = (time.perf_counter() - start_time) * 1000`}
          />

          <h5>3. Contadores de requisições</h5>
          <CodeBlock code={`self._request_count += 1`} />

          <h5>4. Logging estruturado</h5>
          <CodeBlock
            code={`logger.debug(f"[{correlation}] 🔗 {method} {url} ({duration_ms:.2f}ms)")`}
          />

          <h5>5. Registro de métricas</h5>
          <CodeBlock
            code={`self._metrics.record_operation(operation_name, success, duration_ms)`}
          />

          <h4>Tratamento de erros específicos</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Exceção</th>
                <th>Tratamento</th>
                <th>Nova Exceção</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Timeout</td>
                <td>Log + métricas</td>
                <td>
                  <code className="code-block">PloomesAPIError</code>
                </td>
              </tr>
              <tr>
                <td>ConnectionError</td>
                <td>Log + métricas</td>
                <td>
                  <code className="code-block">PloomesAPIError</code>
                </td>
              </tr>
              <tr>
                <td>HTTPError</td>
                <td>Status code analysis</td>
                <td>
                  <code className="code-block">PloomesAPIError</code>
                </td>
              </tr>
              <tr>
                <td>RequestException</td>
                <td>Log genérico</td>
                <td>
                  <code className="code-block">PloomesAPIError</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="method-block">
          <h3 id="get_metrics_summary">get_metrics_summary</h3>
          <CodeBlock code={`def get_metrics_summary(self) -> Dict:`} />
          <p>Retorna resumo completo das métricas de API.</p>

          <h4>Estrutura de retorno</h4>
          <CodeBlock
            code={`{
    "total_requests": 1247,           # Total de requisições
    "success_rate": 0.982,           # Taxa de sucesso (0.0-1.0)
    "average_duration_ms": 245.3,    # Latência média
    "operations": {                  # Métricas por operação
        "GET_Contacts": {
            "count": 450,
            "success_rate": 0.995,
            "avg_duration_ms": 180.2
        },
        "POST_Contacts": {
            "count": 200,
            "success_rate": 0.970,
            "avg_duration_ms": 320.1
        }
        # ... outras operações
    }
}`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Operações de Contatos</h2>

        <div className="method-block">
          <h3 id="get_contact_by_name_and_type">get_contact_by_name_and_type</h3>
          <CodeBlock
            code={`def get_contact_by_name_and_type(
    self, name: str, type_id: int, expand_tags: bool = False
) -> Optional[Dict]:`}
          />
          <p>Obtém contato pelo nome e tipo com filtros OData.</p>

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
                <td>name</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Nome do contato</td>
              </tr>
              <tr>
                <td>type_id</td>
                <td>
                  <code className="code-block">int</code>
                </td>
                <td>ID do tipo (1=Empresa, 2=Pessoa)</td>
              </tr>
              <tr>
                <td>expand_tags</td>
                <td>
                  <code className="code-block">bool</code>
                </td>
                <td>Se expande tags do contato</td>
              </tr>
            </tbody>
          </table>

          <h4>Construção de filtros</h4>
          <CodeBlock
            code={`# Escaping de caracteres especiais
escaped_name = name.replace("'", "''").replace("&", "%26")

# Filtro OData
params = {"$filter": f"Name eq '{escaped_name}' and TypeId eq {type_id}"}

# Expansão opcional
if expand_tags:
    params["$expand"] = "Tags"`}
          />

          <p>
            <strong>Endpoint:</strong>{" "}
            <code className="code-block">GET /Contacts</code> com filtros
          </p>
        </div>

        <div className="method-block">
          <h3 id="check_contact_field_filled">check_contact_field_filled</h3>
          <CodeBlock
            code={`def check_contact_field_filled(self, contact_id: int, field_key: str) -> bool:`}
          />
          <p>Verifica se campo específico do contato está preenchido.</p>

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
                <td>contact_id</td>
                <td>
                  <code className="code-block">int</code>
                </td>
                <td>ID do contato</td>
              </tr>
              <tr>
                <td>field_key</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Chave do campo personalizado</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo de field_key</h4>
          <CodeBlock
            code={`# Campo OAB
field_key = "contact_C40CB3B4-F8DA-4A92-8F96-93F27DA1516F"`}
          />

          <h4>Lógica de verificação</h4>
          <ol>
            <li>
              Busca contato por ID com{" "}
              <code className="code-block">$select</code> do campo específico
            </li>
            <li>
              Verifica se campo existe em{" "}
              <code className="code-block">OtherProperties</code>
            </li>
            <li>Valida se valor não está vazio/None</li>
            <li>Retorna boolean indicando preenchimento</li>
          </ol>
        </div>

        <div className="method-block">
          <h3>check_contact_register_filled</h3>
          <CodeBlock
            code={`def check_contact_register_filled(self, contact_id: int) -> bool:`}
          />
          <p>Verifica se campo Register (CPF/CNPJ) está preenchido.</p>
          <p>
            <strong>Especialização</strong> do{" "}
            <code className="code-block">check_contact_field_filled</code> para
            campo Register.
          </p>
        </div>

        <div className="method-block">
          <h3 id="create_contact">create_contact</h3>
          <CodeBlock code={`def create_contact(self, body: Dict) -> Dict:`} />
          <p>Cria novo contato via POST.</p>

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
                <td>body</td>
                <td>
                  <code className="code-block">Dict</code>
                </td>
                <td>Dados do contato no formato Ploomes</td>
              </tr>
            </tbody>
          </table>

          <p>
            <strong>Endpoint:</strong>{" "}
            <code className="code-block">POST /Contacts</code>
          </p>

          <h4>Validação automática</h4>
          <ul>
            <li>Status 201 esperado para criação</li>
            <li>Parsing da resposta JSON</li>
            <li>Tratamento de erros específicos</li>
          </ul>
        </div>

        <div className="method-block">
          <h3 id="patch_contact">patch_contact</h3>
          <CodeBlock
            code={`def patch_contact(self, contact_id: int, body: Dict) -> Dict:`}
          />
          <p>Atualiza contato existente via PATCH.</p>
          <p>
            <strong>Endpoint:</strong>{" "}
            <code className="code-block">{`PATCH /Contacts({contact_id})`}</code>
          </p>
        </div>

        <div className="method-block">
          <h3 id="apply_tag">apply_tag</h3>
          <CodeBlock
            code={`def apply_tag(self, contact_id: int, tag_id: int) -> None:`}
          />
          <p>Aplica tag a um contato.</p>
          <p>
            <strong>Endpoint:</strong>{" "}
            <code className="code-block">{`POST /Contacts({contact_id})/Tags`}</code>
          </p>

          <h4>Payload</h4>
          <CodeBlock code={`{"TagId": tag_id}`} />
        </div>

        <div className="method-block">
          <h3 id="contact_has_tag">contact_has_tag</h3>
          <CodeBlock
            code={`def contact_has_tag(self, contact: Dict, tag_id: int) -> bool:`}
          />
          <p>Verifica se contato possui tag específica.</p>
          <p>
            <strong>Pré-requisito:</strong> Contato deve ter sido obtido com{" "}
            <code className="code-block">$expand=Tags</code>
          </p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Operações de Deals/Negócios</h2>

        <div className="method-block">
          <h3 id="get_deal_by_cnj">get_deal_by_cnj</h3>
          <CodeBlock
            code={`def get_deal_by_cnj(self, cnj: str) -> Optional[Dict]:`}
          />
          <p>Busca negócio pelo número CNJ.</p>

          <h4>Filtro OData</h4>
          <CodeBlock code={`$filter = f"OtherProperties/any(p: p/FieldKey eq 'deal_20E8290A-809B-4CF1-9345-6B264AED7830' and p/StringValue eq '{cnj}')"`} />
          <p>
            <strong>Endpoint:</strong>{" "}
            <code className="code-block">GET /Deals</code> com filtro
          </p>
        </div>

        <div className="method-block">
          <h3 id="create_deal">create_deal</h3>
          <CodeBlock code={`def create_deal(self, body: Dict) -> Dict:`} />
          <p>Cria novo negócio/deal.</p>
          <p>
            <strong>Endpoint:</strong>{" "}
            <code className="code-block">POST /Deals</code>
          </p>
        </div>

        <div className="method-block">
          <h3 id="patch_deal">patch_deal</h3>
          <CodeBlock
            code={`def patch_deal(self, deal_id: int, body: Dict) -> None:`}
          />
          <p>Atualiza negócio existente.</p>
          <p>
            <strong>Endpoint:</strong>{" "}
            <code className="code-block">{`PATCH /Deals({deal_id})`}</code>
          </p>
        </div>

        <div className="method-block">
          <h3>get_stage_by_pipeline_and_name</h3>
          <CodeBlock
            code={`def get_stage_by_pipeline_and_name(
    self, pipeline_name: str, stage_name: str
) -> Optional[Dict]:`}
          />
          <p>Busca estágio por pipeline e nome.</p>

          <h4>Filtro complexo</h4>
          <CodeBlock
            code={`$filter = f"Pipeline/Name eq '{pipeline_name}' and Name eq '{stage_name}'"
$expand = "Pipeline"`}
          />
        </div>

        <div className="method-block">
          <h3 id="get_deals_by_contact_id">get_deals_by_contact_id</h3>
          <CodeBlock
            code={`def get_deals_by_contact_id(self, contact_id: int) -> list[Dict]:`}
          />
          <p>Busca todos os negócios de um contato.</p>
          <CodeBlock code={`$filter = f"ContactId eq {contact_id}"`} />
        </div>
      </section>

      <section className="doc-section">
        <h2>Operações Especializadas</h2>

        <div className="method-block">
          <h3>get_escritorio_with_advogado_principal</h3>
          <CodeBlock
            code={`def get_escritorio_with_advogado_principal(
    self, escritorio_name: str
) -> Optional[Dict]:`}
          />
          <p>
            Busca escritório que possui advogado principal com nome específico.
          </p>

          <h4>Funcionalidade</h4>
          <ol>
            <li>
              <strong>Busca escritório</strong> por nome
            </li>
            <li>
              <strong>Busca advogado principal</strong> associado ao escritório
            </li>
            <li>
              <strong>Validação</strong> se nome do advogado corresponde
            </li>
            <li>
              <strong>Cache</strong> de resultados para otimização
            </li>
          </ol>

          <h4>Cache strategy</h4>
          <CodeBlock
            code={`self._escritorio_cache: Dict[str, Optional[Dict]] = {}
cache_key = escritorio_name.lower().strip()`}
          />

          <h4>Fluxo de busca</h4>
          <ol>
            <li>Check cache por nome do escritório</li>
            <li>Se não cached, busca escritório via API</li>
            <li>Se encontrado, busca advogado principal</li>
            <li>Valida correspondência de nomes</li>
            <li>Armazena resultado no cache</li>
            <li>Retorna escritório + advogado principal</li>
          </ol>
        </div>

        <div className="method-block">
          <h3 id="get_office_by_name">get_office_by_name</h3>
          <CodeBlock
            code={`def get_office_by_name(self, escritorio_name: str) -> Optional[Dict]:`}
          />
          <p>Busca escritório apenas pelo nome (sem advogado principal).</p>
          <CodeBlock
            code={`$filter = f"Name eq '{escaped_name}' and TypeId eq 1"  # TypeId=1 para empresas`}
          />
        </div>

        <div className="method-block">
          <h3>_find_principal_lawyer</h3>
          <CodeBlock
            code={`def _find_principal_lawyer(
    self, escritorio: Dict, escritorio_name: str
) -> Optional[Dict]:`}
          />
          <p>Encontra advogado principal de um escritório (método privado).</p>

          <h4>Lógica</h4>
          <ol>
            <li>Busca pessoas (TypeId=2) associadas ao escritório</li>
            <li>Filtra por correspondência de nome fuzzy</li>
            <li>Retorna primeiro match válido</li>
          </ol>
        </div>
      </section>

      <section className="doc-section">
        <h2>Sistema de Cache</h2>

        <h3>Cache de Escritórios</h3>
        <CodeBlock
          code={`self._escritorio_cache: Dict[str, Optional[Dict]] = {}`}
        />

        <h4>Estratégia</h4>
        <ul>
          <li>
            <strong>Chave</strong>: Nome do escritório (lowercase, trimmed)
          </li>
          <li>
            <strong>Valor</strong>: Dados completos do escritório + advogado
            principal
          </li>
          <li>
            <strong>TTL</strong>: Sem expiração (cache de sessão)
          </li>
          <li>
            <strong>Invalidação</strong>: Manual ou reinicialização
          </li>
        </ul>

        <h4>Benefícios</h4>
        <ul>
          <li>Reduz consultas duplicadas durante processamento</li>
          <li>Acelera verificações de escritórios existentes</li>
          <li>Otimiza operações de deduplicação</li>
        </ul>
      </section>

      <section className="doc-section">
        <h2>Tratamento de Erros</h2>

        <h3>Tradução de Exceções HTTP</h3>
        <CodeBlock
          code={`try:
    response = self.session.get(url, **kwargs)
    response.raise_for_status()
    return response
except requests.exceptions.Timeout as e:
    raise PloomesAPIError(f"Timeout na requisição: {e}")
except requests.exceptions.HTTPError as e:
    if e.response.status_code == 401:
        raise InvalidUserKeyError("User-Key inválida ou expirada")
    else:
        raise PloomesAPIError(e.response.status_code, e.response.text)`}
        />

        <h3>Categorização por Status Code</h3>
        <table className="params-table">
          <thead>
            <tr>
              <th>Status Code</th>
              <th>Interpretação</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>401</td>
              <td>Unauthorized</td>
              <td>
                <code className="code-block">InvalidUserKeyError</code>
              </td>
            </tr>
            <tr>
              <td>403</td>
              <td>Forbidden</td>
              <td>
                Log + <code className="code-block">PloomesAPIError</code>
              </td>
            </tr>
            <tr>
              <td>404</td>
              <td>Not Found</td>
              <td>Retorno None (para gets)</td>
            </tr>
            <tr>
              <td>429</td>
              <td>Rate Limit</td>
              <td>
                Log + <code className="code-block">PloomesAPIError</code>
              </td>
            </tr>
            <tr>
              <td>500+</td>
              <td>Server Error</td>
              <td>
                Log + <code className="code-block">PloomesAPIError</code>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="doc-section">
        <h2>Observabilidade Avançada</h2>

        <h3>Métricas por Endpoint</h3>
        <CodeBlock
          code={`# Tracking automático por operação
"GET_Contacts": {"count": 450, "success_rate": 0.995}
"POST_Contacts": {"count": 200, "success_rate": 0.970}
"PATCH_Contacts": {"count": 150, "success_rate": 0.980}
"GET_Deals": {"count": 100, "success_rate": 1.000}`}
        />

        <h3>Correlation ID Tracking</h3>
        <CodeBlock
          code={`# Cada requisição tem correlation_id único
logger.debug(f"[{correlation_id}] 🔗 GET /Contacts (245ms) - Success")`}
        />

        <h3>Performance Monitoring</h3>
        <CodeBlock
          code={`# Latência por tipo de operação
average_latency = {
    "GET": 180ms,    # Consultas rápidas
    "POST": 320ms,   # Criações mais lentas
    "PATCH": 290ms   # Atualizações médias
}`}
        />
      </section>

      <section className="doc-section">
        <h2>Exemplos de Uso</h2>

        <h3>Busca e Criação de Contato</h3>
        <CodeBlock
          code={`api = PloomesAPI(environment="prod", logger=logger)

# Buscar contato existente
contact = api.get_contact_by_name_and_type(
    name="João Silva Advogados",
    type_id=1,
    expand_tags=True
)

if not contact:
    # Criar novo contato
    contact_data = {
        "Name": "João Silva Advogados",
        "TypeId": 1,
        "Register": "12345678000199"
    }
    contact = api.create_contact(contact_data)
    print(f"✅ Contato criado: ID {contact['Id']}")
else:
    print(f"📋 Contato existente: ID {contact['Id']}")`}
        />

        <h3>Verificação de Campos</h3>
        <CodeBlock
          code={`# Verificar se OAB está preenchida
oab_filled = api.check_contact_field_filled(
    contact_id=123,
    field_key="contact_C40CB3B4-F8DA-4A92-8F96-93F27DA1516F"
)

if not oab_filled:
    # Atualizar com OAB
    api.patch_contact(123, {
        "OtherProperties": [{
            "FieldKey": "contact_C40CB3B4-F8DA-4A92-8F96-93F27DA1516F",
            "StringValue": "MG123456"
        }]
    })`}
        />

        <h3>Operações com Deals</h3>
        <CodeBlock
          code={`# Buscar deal por CNJ
deal = api.get_deal_by_cnj("1234567-89.2023.8.13.0001")

if deal:
    # Atualizar estágio
    stage = api.get_stage_by_pipeline_and_name("Processos", "Ganho")
    if stage:
        api.patch_deal(deal['Id'], {"StageId": stage['Id']})`}
        />

        <h3>Monitoramento de Performance</h3>
        <CodeBlock
          code={`# Métricas da sessão
metrics = api.get_metrics_summary()
print(f"📊 Total de requests: {metrics['total_requests']}")
print(f"✅ Taxa de sucesso: {metrics['success_rate']:.1%}")
print(f"⚡ Latência média: {metrics['average_duration_ms']:.0f}ms")

# Análise por operação
for op, stats in metrics['operations'].items():
    if stats['success_rate'] < 0.9:
        print(f"⚠️ {op}: baixa taxa de sucesso ({stats['success_rate']:.1%})")`}
        />
      </section>
    </div>
  );
}

export default PloomesAPIPage;

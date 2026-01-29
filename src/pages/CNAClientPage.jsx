import React from "react";
import CodeBlock from "../components/CodeBlock";

const CNAClientPage = () => {
  return (
    <div className="doc-page">
      <h1>Classe: CNAClient</h1>
      <p className="doc-subtitle">
        Cliente especializado para API do CNA (Cadastro Nacional de Advogados)
        com observabilidade.
      </p>

      <section className="doc-section">
        <h2>Descrição</h2>
        <p>
          A classe <code className="code-block">CNAClient</code> encapsula toda
          a lógica de comunicação com a API do CNA da OAB, fornecendo métodos
          para consultar advogados e sociedades com instrumentação completa de
          métricas, logging estruturado e tratamento robusto de erros.
        </p>
      </section>

      <section className="doc-section">
        <h2>Classe CNAClient</h2>
        <p>
          <code className="code-block">clients/cna_client.py</code>
        </p>
        <CodeBlock code={`class CNAClient:`} />

        <h3>Responsabilidades</h3>
        <ul>
          <li>Consulta de advogados no Cadastro Nacional da OAB</li>
          <li>Consulta de sociedades/escritórios</li>
          <li>Instrumentação com métricas de performance</li>
          <li>Logging estruturado com correlation_id</li>
          <li>Tratamento robusto de erros de rede</li>
          <li>Estatísticas de uso e sucesso</li>
        </ul>
      </section>

      <section className="doc-section">
        <h2>Inicialização</h2>

        <div className="method-block">
          <h4 id="__init__">__init__</h4>
          <CodeBlock
            code={`def __init__(self, timeout: int = None, session: requests.Session = None):`}
          />
          <p>Inicializa o cliente CNA com configuração e observabilidade.</p>

          <h4>Args</h4>
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
                <td>
                  <code>timeout</code>
                </td>
                <td>
                  <code>Optional[int]</code>
                </td>
                <td>Timeout em segundos (usa config.TIMEOUT se None)</td>
              </tr>
              <tr>
                <td>
                  <code>session</code>
                </td>
                <td>
                  <code>Optional[requests.Session]</code>
                </td>
                <td>Sessão HTTP reutilizável</td>
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
                <td>
                  <code>timeout</code>
                </td>
                <td>
                  <code>config.TIMEOUT</code>
                </td>
                <td>Timeout padrão para requisições</td>
              </tr>
              <tr>
                <td>
                  <code>base_url</code>
                </td>
                <td>
                  <code>config.CNA_BASE_URL</code>
                </td>
                <td>URL base da API CNA</td>
              </tr>
              <tr>
                <td>
                  <code>search_url</code>
                </td>
                <td>
                  <code>config.CNA_SEARCH_URL</code>
                </td>
                <td>URL específica para buscas</td>
              </tr>
            </tbody>
          </table>

          <h4>Observabilidade inicializada</h4>
          <ul>
            <li>Registry de métricas específico para CNA</li>
            <li>Contadores de requisições (total, sucesso, erro)</li>
            <li>Sistema de correlation_id para rastreamento</li>
          </ul>

          <h4>Log de inicialização</h4>
          <CodeBlock
            code={`[abc123] CNAClient inicializado - Base URL: https://cna.oab.org.br/api`}
            language="text"
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos de Consulta</h2>

        <div className="method-block">
          <h4 id="consultar_advogado">consultar_advogado</h4>
          <CodeBlock
            code={`def consultar_advogado(
    self, nome: str = "", oab: str = "", uf: Optional[str] = None
) -> Optional[Dict[str, Any]]:`}
          />
          <p>Consulta a API do CNA para obter informações do advogado.</p>

          <h4>Args</h4>
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
                <td>
                  <code>nome</code>
                </td>
                <td>
                  <code>str</code>
                </td>
                <td>Nome do advogado (opcional)</td>
              </tr>
              <tr>
                <td>
                  <code>oab</code>
                </td>
                <td>
                  <code>str</code>
                </td>
                <td>Número da OAB (opcional)</td>
              </tr>
              <tr>
                <td>
                  <code>uf</code>
                </td>
                <td>
                  <code>Optional[str]</code>
                </td>
                <td>UF da OAB (opcional)</td>
              </tr>
            </tbody>
          </table>

          <h4>Returns</h4>
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
                  <code>Optional[Dict[str, Any]]</code>
                </td>
                <td>Dados do advogado ou None</td>
              </tr>
            </tbody>
          </table>

          <h4>Validações de entrada</h4>
          <ul>
            <li>
              Pelo menos <code className="code-block">nome</code> ou{" "}
              <code className="code-block">oab</code> deve ser fornecido
            </li>
            <li>
              <code className="code-block">oab</code> deve ser string se
              fornecido
            </li>
            <li>Parâmetros são automaticamente trimmed</li>
          </ul>

          <h4>Payload da requisição</h4>
          <CodeBlock
            code={`{
    "NomeAdvo": nome.strip() if nome else "",
    "Insc": oab.strip() if oab else "",
    "UF": uf.strip() if uf else ""
}`}
          />

          <h4>Exceções</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Exceção</th>
                <th>Cenário</th>
                <th>Tratamento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>ValidationError</code>
                </td>
                <td>Parâmetros inválidos</td>
                <td>Validação prévia</td>
              </tr>
              <tr>
                <td>
                  <code>CNAAPIError</code>
                </td>
                <td>Erros de rede/HTTP</td>
                <td>Log + métricas + reraise</td>
              </tr>
              <tr>
                <td>
                  <code>Timeout</code>
                </td>
                <td>Timeout excedido</td>
                <td>Log específico + métricas</td>
              </tr>
              <tr>
                <td>
                  <code>ConnectionError</code>
                </td>
                <td>Falha de conexão</td>
                <td>Log específico + métricas</td>
              </tr>
              <tr>
                <td>
                  <code>HTTPError</code>
                </td>
                <td>Erro HTTP (4xx, 5xx)</td>
                <td>Log com status code</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="method-block">
          <h4 id="consultar_sociedade">consultar_sociedade</h4>
          <CodeBlock
            code={`def consultar_sociedade(
    self, nome_advogado: str, url: str
) -> Optional[Dict[str, Any]]:`}
          />
          <p>Consulta a API do CNA para obter informações da sociedade.</p>

          <h4>Args</h4>
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
                <td>
                  <code>nome_advogado</code>
                </td>
                <td>
                  <code>str</code>
                </td>
                <td>Nome do advogado (para contexto de logs)</td>
              </tr>
              <tr>
                <td>
                  <code>url</code>
                </td>
                <td>
                  <code>str</code>
                </td>
                <td>URL específica para consulta da sociedade</td>
              </tr>
            </tbody>
          </table>

          <h4>Returns</h4>
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
                  <code>Optional[Dict[str, Any]]</code>
                </td>
                <td>Dados da sociedade ou None</td>
              </tr>
            </tbody>
          </table>

          <h4>Uso típico</h4>
          <CodeBlock
            code={`# URL obtida de consulta anterior
detail_url = "https://cna.oab.org.br/api/sociedade/123"
sociedade = client.consultar_sociedade("João Silva", detail_url)`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos de Observabilidade</h2>

        <div className="method-block">
          <h4 id="obter_estatisticas">obter_estatisticas</h4>
          <CodeBlock code={`def obter_estatisticas(self) -> Dict[str, Any]:`} />
          <p>Retorna estatísticas completas de uso do cliente CNA.</p>

          <h4>Estrutura de retorno</h4>
          <CodeBlock
            code={`{
    "total_requests": 247,           # Total de requisições feitas
    "success_count": 230,            # Requisições bem-sucedidas
    "error_count": 17,               # Requisições com erro
    "success_rate": 0.931,           # Taxa de sucesso (0.0-1.0)
    "average_latency_ms": 245.3      # Latência média em ms
}`}
          />
        </div>

        <div className="method-block">
          <h4 id="reset_estatisticas">reset_estatisticas</h4>
          <CodeBlock code={`def reset_estatisticas(self) -> None:`} />
          <p>Reseta todas as estatísticas de uso.</p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Sistema de Observabilidade</h2>

        <h3>Correlation ID Tracking</h3>
        <CodeBlock
          code={`correlation = get_correlation_id()  # UUID único por operação

# Logs estruturados
logger.info(f"[{correlation}] 🔍 CNA #{request_count}: Nome: João Silva")
logger.debug(f"[{correlation}] ✓ CNA Response (245ms): Nome: João Silva")`}
        />

        <h3>Métricas de Performance</h3>
        <table className="params-table">
          <thead>
            <tr>
              <th>Métrica</th>
              <th>Tipo</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>operation_count</code>
              </td>
              <td>Counter</td>
              <td>Número de operações por tipo</td>
            </tr>
            <tr>
              <td>
                <code>operation_duration_ms</code>
              </td>
              <td>Histogram</td>
              <td>Latência por operação</td>
            </tr>
            <tr>
              <td>
                <code>operation_success_rate</code>
              </td>
              <td>Gauge</td>
              <td>Taxa de sucesso</td>
            </tr>
            <tr>
              <td>
                <code>error_count_by_type</code>
              </td>
              <td>Counter</td>
              <td>Erros categorizados</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="doc-section">
        <h2>Tratamento de Erros</h2>

        <h3>Categorização por Tipo</h3>
        <CodeBlock
          code={`except requests.exceptions.Timeout as e:
    error_msg = f"Timeout ao consultar advogado no CNA ({nome}, {oab})"
    logger.error(f"[{correlation}] ⏱️ {error_msg}")
    raise CNAAPIError(f"{error_msg}: {e}")

except requests.exceptions.ConnectionError as e:
    error_msg = f"Erro de conexão ao consultar advogado no CNA ({nome}, {oab})"
    logger.error(f"[{correlation}] 🔌 {error_msg}")
    raise CNAAPIError(f"{error_msg}: {e}")

except requests.exceptions.HTTPError as e:
    logger.error(f"[{correlation}] ❌ {error_msg}: Status {e.response.status_code}")
    raise CNAAPIError(f"{error_msg}: {e}", e.response.status_code)`}
        />
      </section>

      <section className="doc-section">
        <h2>Exemplos de Uso</h2>

        <h3>Consulta Básica de Advogado</h3>
        <CodeBlock
          code={`# Inicialização
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
    print(f"Status: {resultado.get('Status')}")`}
        />

        <h3>Consulta de Sociedade</h3>
        <CodeBlock
          code={`# Primeiro, encontrar o advogado
advogado = client.consultar_advogado(nome="João Silva", oab="MG123456")

if advogado and 'DeatilUrl' in advogado:
    sociedade = client.consultar_sociedade(
        nome_advogado="João Silva",
        url=advogado['DeatilUrl']
    )

    if sociedade:
        print(f"Escritório: {sociedade.get('NomeEscritorio')}")
        print(f"CNPJ: {sociedade.get('CNPJ')}")`}
        />

        <h3>Monitoramento de Performance</h3>
        <CodeBlock
          code={`# Múltiplas consultas
advogados = ["João Silva", "Maria Santos", "Pedro Oliveira"]

for nome in advogados:
    try:
        resultado = client.consultar_advogado(nome=nome)
        print(f"✅ {nome}: {'Encontrado' if resultado else 'Não encontrado'}")
    except CNAAPIError as e:
        print(f"❌ {nome}: Erro - {e}")

# Verificar estatísticas
stats = client.obter_estatisticas()
print(f"Total de consultas: {stats['total_requests']}")
print(f"Taxa de sucesso: {stats['success_rate']:.1%}")
print(f"Latência média: {stats['average_latency_ms']:.1f}ms")`}
        />
      </section>

      <section className="doc-section">
        <h2>Configuração e Ambiente</h2>
        <CodeBlock
          code={`# config.py
CNA_BASE_URL = "https://cna.oab.org.br"
CNA_SEARCH_URL = "https://cna.oab.org.br/api/consulta"
TIMEOUT = 30  # segundos`}
        />
      </section>
    </div>
  );
};

export default CNAClientPage;

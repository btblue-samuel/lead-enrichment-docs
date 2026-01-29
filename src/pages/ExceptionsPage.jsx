import CodeBlock from "../components/CodeBlock";

function ExceptionsPage() {
  return (
    <div className="doc-page">
      <h1>Exceções: Sistema de Tratamento de Erros</h1>
      <p className="doc-subtitle">
        Hierarquia completa de exceções personalizadas para tratamento robusto
        de erros.
      </p>

      <section className="doc-section">
        <h2>Descrição</h2>
        <p>
          Este módulo define uma hierarquia abrangente de exceções
          personalizadas para o sistema, permitindo tratamento específico e
          granular de diferentes tipos de erros que podem ocorrer durante o
          processamento.
        </p>
      </section>

      <section className="doc-section">
        <h2>Hierarquia de Exceções</h2>
        <CodeBlock
          code={`PloomesClientError (base)
├── InvalidUserKeyError
├── PloomesAPIError
├── FileProcessingError
│   ├── MissingColumnError
│   └── FileSecurityError
├── CNAAPIError
├── LemitAPIError
├── ValidationError
├── ConfigurationError
├── CacheError
├── ContactCreationError
├── DataExtractionError
└── NetworkError`}
        />
      </section>

      <section className="doc-section">
        <h2>Exceções Base</h2>

        <div className="method-block">
          <h3 id="PloomesClientError">PloomesClientError</h3>
          <CodeBlock code={`class PloomesClientError(Exception):`} />
          <p>
            <strong>Descrição:</strong> Classe base para todas as exceções do
            sistema.
          </p>
          <p>
            <strong>Uso:</strong> Herança para exceções específicas e catch
            genérico.
          </p>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`try:
    # operação do sistema
    pass
except PloomesClientError as e:
    # Captura qualquer erro do sistema
    logger.error(f"Erro no sistema: {e}")`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Exceções de API e Autenticação</h2>

        <div className="method-block">
          <h3 id="InvalidUserKeyError">InvalidUserKeyError</h3>
          <CodeBlock
            code={`class InvalidUserKeyError(PloomesClientError):
    def __init__(self, message="A User-Key fornecida é inválida."):`}
          />
          <p>
            <strong>Descrição:</strong> User-Key do Ploomes inválida ou
            expirada.
          </p>

          <h4>Atributos</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>message</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Mensagem de erro personalizada</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`try:
    api.test_connection()
except InvalidUserKeyError:
    print("🔑 User-Key inválida - verifique configuração")
    # Solicitar nova user-key ou reconfigurar`}
          />
        </div>

        <div className="method-block">
          <h3 id="PloomesAPIError">PloomesAPIError</h3>
          <CodeBlock
            code={`class PloomesAPIError(PloomesClientError):
    def __init__(self, status_code, response_text):`}
          />
          <p>
            <strong>Descrição:</strong> Erros gerais da API do Ploomes.
          </p>

          <h4>Atributos</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>status_code</td>
                <td>
                  <code className="code-block">int</code>
                </td>
                <td>Código HTTP do erro</td>
              </tr>
              <tr>
                <td>response_text</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Texto da resposta de erro</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`try:
    contact = api.create_contact(data)
except PloomesAPIError as e:
    if e.status_code == 429:
        # Rate limit - aguardar e tentar novamente
        time.sleep(60)
    elif e.status_code == 400:
        # Dados inválidos - revisar payload
        logger.error(f"Dados inválidos: {e.response_text}")`}
          />
        </div>

        <div className="method-block">
          <h3>CNAAPIError</h3>
          <CodeBlock
            code={`class CNAAPIError(PloomesClientError):
    def __init__(self, message, status_code=None, response_text=None):`}
          />
          <p>
            <strong>Descrição:</strong> Erros específicos da API do CNA
            (Cadastro Nacional de Advogados).
          </p>

          <h4>Atributos</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>message</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Mensagem de erro</td>
              </tr>
              <tr>
                <td>status_code</td>
                <td>
                  <code className="code-block">Optional[int]</code>
                </td>
                <td>Código HTTP (se aplicável)</td>
              </tr>
              <tr>
                <td>response_text</td>
                <td>
                  <code className="code-block">Optional[str]</code>
                </td>
                <td>Resposta da API</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`try:
    advogado = cna_client.consultar_advogado(nome="João Silva")
except CNAAPIError as e:
    if "timeout" in str(e).lower():
        # Timeout - tentar com parâmetros diferentes
        logger.warning("CNA timeout - tentando busca simplificada")
    else:
        logger.error(f"Erro CNA: {e}")`}
          />
        </div>

        <div className="method-block">
          <h3>LemitAPIError</h3>
          <CodeBlock
            code={`class LemitAPIError(PloomesClientError):
    def __init__(self, message, status_code=None, response_text=None):`}
          />
          <p>
            <strong>Descrição:</strong> Erros específicos da API do LEMIT.
          </p>

          <h4>Atributos</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>message</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Mensagem de erro</td>
              </tr>
              <tr>
                <td>status_code</td>
                <td>
                  <code className="code-block">Optional[int]</code>
                </td>
                <td>Código HTTP (se aplicável)</td>
              </tr>
              <tr>
                <td>response_text</td>
                <td>
                  <code className="code-block">Optional[str]</code>
                </td>
                <td>Resposta da API</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="method-block">
          <h3 id="NetworkError">NetworkError</h3>
          <CodeBlock
            code={`class NetworkError(PloomesClientError):
    def __init__(self, operation, attempts, last_error):`}
          />
          <p>
            <strong>Descrição:</strong> Falhas de rede que esgotaram todas as
            tentativas de retry.
          </p>

          <h4>Atributos</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>operation</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Nome da operação que falhou</td>
              </tr>
              <tr>
                <td>attempts</td>
                <td>
                  <code className="code-block">int</code>
                </td>
                <td>Número de tentativas realizadas</td>
              </tr>
              <tr>
                <td>last_error</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Último erro capturado</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`try:
    result = retry_with_backoff(api_call, max_retries=3)
except NetworkError as e:
    logger.critical(f"Falha de rede após {e.attempts} tentativas: {e.last_error}")
    # Notificar administrador ou usar modo offline`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Exceções de Arquivo e Dados</h2>

        <div className="method-block">
          <h3 id="FileProcessingError">FileProcessingError</h3>
          <CodeBlock code={`class FileProcessingError(PloomesClientError):`} />
          <p>
            <strong>Descrição:</strong> Classe base para erros de processamento
            de arquivos.
          </p>
          <p>
            <strong>Uso:</strong> Herança para erros específicos de arquivo.
          </p>
        </div>

        <div className="method-block">
          <h3 id="MissingColumnError">MissingColumnError</h3>
          <CodeBlock
            code={`class MissingColumnError(FileProcessingError):
    def __init__(self, column_name, available_columns):`}
          />
          <p>
            <strong>Descrição:</strong> Coluna esperada não encontrada no
            arquivo.
          </p>

          <h4>Atributos</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>column_name</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Nome da coluna que faltou</td>
              </tr>
              <tr>
                <td>available_columns</td>
                <td>
                  <code className="code-block">List[str]</code>
                </td>
                <td>Colunas disponíveis no arquivo</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`try:
    df = processar_excel("advogados.xlsx")
    nome_col = encontrar_coluna(df, "Nome")
except MissingColumnError as e:
    print(f"❌ Coluna '{e.column_name}' não encontrada")
    print(f"📋 Colunas disponíveis: {', '.join(e.available_columns)}")
    # Sugerir mapeamento de colunas ou mostrar UI para seleção`}
          />
        </div>

        <div className="method-block">
          <h3>FileSecurityError</h3>
          <CodeBlock
            code={`class FileSecurityError(FileProcessingError):
    def __init__(self, file_path, reason):`}
          />
          <p>
            <strong>Descrição:</strong> Problemas de segurança com arquivos
            (path traversal, extensões perigosas).
          </p>

          <h4>Atributos</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>file_path</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Caminho do arquivo problemático</td>
              </tr>
              <tr>
                <td>reason</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Motivo da rejeição</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`try:
    validar_arquivo("../../../etc/passwd")
except FileSecurityError as e:
    logger.security_alert(f"Tentativa de path traversal: {e.file_path}")
    # Registrar tentativa suspeita e bloquear`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Exceções de Validação e Configuração</h2>

        <div className="method-block">
          <h3 id="ValidationError">ValidationError</h3>
          <CodeBlock
            code={`class ValidationError(PloomesClientError):
    def __init__(self, field_name, value, reason):`}
          />
          <p>
            <strong>Descrição:</strong> Erros de validação de dados de entrada.
          </p>

          <h4>Atributos</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>field_name</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Nome do campo inválido</td>
              </tr>
              <tr>
                <td>value</td>
                <td>
                  <code className="code-block">Any</code>
                </td>
                <td>Valor que falhou na validação</td>
              </tr>
              <tr>
                <td>reason</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Motivo da falha</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`def validar_cpf(cpf):
    if not cpf_valido(cpf):
        raise ValidationError("CPF", cpf, "Dígitos verificadores inválidos")

try:
    validar_cpf("123.456.789-00")
except ValidationError as e:
    print(f"⚠️ {e.field_name}: {e.reason}")
    print(f"Valor fornecido: '{e.value}'")
    # Solicitar correção do usuário`}
          />
        </div>

        <div className="method-block">
          <h3 id="ConfigurationError">ConfigurationError</h3>
          <CodeBlock
            code={`class ConfigurationError(PloomesClientError):
    def __init__(self, message):`}
          />
          <p>
            <strong>Descrição:</strong> Erros de configuração do sistema.
          </p>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`try:
    client = PloomesClient()
except ConfigurationError as e:
    logger.error(f"Configuração inválida: {e}")
    # Guiar usuário para configuração correta
    print("🔧 Execute: python setup.py configure")`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Exceções de Cache e Operações</h2>

        <div className="method-block">
          <h3>CacheError</h3>
          <CodeBlock
            code={`class CacheError(PloomesClientError):
    def __init__(self, operation, key=None, reason=None):`}
          />
          <p>
            <strong>Descrição:</strong> Erros relacionados ao sistema de cache.
          </p>

          <h4>Atributos</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>operation</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Operação que falhou (get, set, delete)</td>
              </tr>
              <tr>
                <td>key</td>
                <td>
                  <code className="code-block">Optional[str]</code>
                </td>
                <td>Chave do cache (se aplicável)</td>
              </tr>
              <tr>
                <td>reason</td>
                <td>
                  <code className="code-block">Optional[str]</code>
                </td>
                <td>Motivo da falha</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`try:
    cache.set("advogado_123", data)
except CacheError as e:
    logger.warning(f"Cache falhou: {e.operation} - continuando sem cache")
    # Operar sem cache, mas registrar para investigação`}
          />
        </div>

        <div className="method-block">
          <h3>ContactCreationError</h3>
          <CodeBlock
            code={`class ContactCreationError(PloomesClientError):
    def __init__(self, contact_type, contact_name, reason):`}
          />
          <p>
            <strong>Descrição:</strong> Erro na criação de contatos no Ploomes.
          </p>

          <h4>Atributos</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>contact_type</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Tipo do contato (escritório, advogado)</td>
              </tr>
              <tr>
                <td>contact_name</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Nome do contato</td>
              </tr>
              <tr>
                <td>reason</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Motivo da falha</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`try:
    escritorio_id = criar_escritorio(dados_escritorio)
except ContactCreationError as e:
    logger.error(f"Falha ao criar {e.contact_type} '{e.contact_name}': {e.reason}")

    if "duplicado" in e.reason.lower():
        # Tentar atualizar em vez de criar
        escritorio_id = atualizar_escritorio(dados_escritorio)`}
          />
        </div>

        <div className="method-block">
          <h3>DataExtractionError</h3>
          <CodeBlock
            code={`class DataExtractionError(PloomesClientError):
    def __init__(self, operation, target, reason):`}
          />
          <p>
            <strong>Descrição:</strong> Erro na extração de dados de
            advogados/sociedades.
          </p>

          <h4>Atributos</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>operation</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Operação de extração</td>
              </tr>
              <tr>
                <td>target</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Alvo da extração</td>
              </tr>
              <tr>
                <td>reason</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Motivo da falha</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`try:
    socios = extrair_socios_sociedade(cnpj)
except DataExtractionError as e:
    logger.warning(f"Não foi possível extrair {e.operation} de {e.target}: {e.reason}")
    # Continuar com dados parciais ou buscar fonte alternativa`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Padrões de Uso</h2>

        <h3>Tratamento Hierárquico</h3>
        <CodeBlock
          code={`def processar_advogado(nome, oab):
    try:
        return executar_processamento(nome, oab)

    except ValidationError as e:
        # Erro de dados - pode ser corrigido
        logger.warning(f"Dados inválidos: {e}")
        return None

    except CNAAPIError as e:
        # Erro de API - pode ser temporário
        logger.error(f"Falha na API CNA: {e}")
        if "timeout" in str(e):
            # Tentar novamente com timeout maior
            return tentar_novamente_com_timeout(nome, oab)
        return None

    except NetworkError as e:
        # Erro crítico de rede
        logger.critical(f"Falha de rede: {e}")
        raise  # Repassar para nível superior

    except PloomesClientError as e:
        # Qualquer outro erro do sistema
        logger.error(f"Erro geral: {e}")
        return None`}
        />

        <h3>Retry com Exceções Específicas</h3>
        <CodeBlock
          code={`def operacao_com_retry():
    for tentativa in range(3):
        try:
            return executar_operacao()

        except (NetworkError, CNAAPIError) as e:
            if tentativa < 2:  # Não é a última tentativa
                delay = 2 ** tentativa  # Backoff exponencial
                logger.info(f"Tentativa {tentativa + 1} falhou, aguardando {delay}s")
                time.sleep(delay)
                continue
            else:
                raise  # Última tentativa - repassar exceção

        except ValidationError:
            # Erro de validação não deve ser retentado
            raise`}
        />

        <h3>Logging Estruturado com Exceções</h3>
        <CodeBlock
          code={`def log_exception(e: PloomesClientError, context: dict = None):
    """Registra exceção com contexto estruturado."""

    log_data = {
        "exception_type": type(e).__name__,
        "exception_message": str(e),
        "context": context or {}
    }

    # Adicionar atributos específicos da exceção
    if hasattr(e, 'status_code'):
        log_data["http_status"] = e.status_code

    if hasattr(e, 'field_name'):
        log_data["field_name"] = e.field_name
        log_data["field_value"] = e.value

    logger.error("Exceção capturada", extra=log_data)`}
        />

        <h3>Conversão de Exceções Externas</h3>
        <CodeBlock
          code={`def consultar_api_externa():
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        return response.json()

    except requests.exceptions.Timeout:
        raise NetworkError("consulta_api", 1, "Timeout de 30s excedido")

    except requests.exceptions.ConnectionError:
        raise NetworkError("consulta_api", 1, "Falha de conexão")

    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 401:
            raise InvalidUserKeyError("Credenciais inválidas na API externa")
        else:
            raise PloomesAPIError(e.response.status_code, e.response.text)`}
        />
      </section>

      <section className="doc-section">
        <h2>Observabilidade e Monitoramento</h2>

        <h3>Métricas por Tipo de Exceção</h3>
        <CodeBlock
          code={`exception_counter = {
    "ValidationError": 0,
    "NetworkError": 0,
    "CNAAPIError": 0,
    # ... outros tipos
}

def track_exception(e: Exception):
    exception_type = type(e).__name__
    exception_counter[exception_type] = exception_counter.get(exception_type, 0) + 1

    # Alertas baseados em thresholds
    if exception_counter["NetworkError"] > 10:
        send_alert("Alta frequência de erros de rede")`}
        />

        <h3>Dashboard de Erros</h3>
        <CodeBlock
          code={`def get_error_summary():
    return {
        "total_exceptions": sum(exception_counter.values()),
        "by_type": dict(exception_counter),
        "error_rate": calculate_error_rate(),
        "top_errors": sorted(exception_counter.items(), key=lambda x: x[1], reverse=True)[:5]
    }`}
        />
      </section>
    </div>
  );
}

export default ExceptionsPage;

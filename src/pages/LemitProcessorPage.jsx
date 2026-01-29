import CodeBlock from "../components/CodeBlock";

function LemitProcessorPage() {
  return (
    <div className="doc-page">
      <h1>Classe: LemitProcessor</h1>
      <p className="doc-subtitle">
        Processador especializado para dados exportados do LEMIT.
      </p>

      <section className="doc-section">
        <h2>Descrição</h2>
        <p>
          A classe <code className="code-block">LemitProcessor</code> é
          responsável por processar e limpar dados CSV exportados do sistema
          LEMIT, normalizando telefones, emails e estruturando os dados em
          formato padronizado.
        </p>
      </section>

      <section className="doc-section">
        <h2>Classe LemitProcessor</h2>
        <CodeBlock code={`class LemitProcessor:`} />
        <p>Processador especializado para dados exportados do LEMIT.</p>

        <h3>Responsabilidades</h3>
        <ul>
          <li>Processar arquivos CSV do LEMIT</li>
          <li>Normalizar telefones (adicionar código do país +55)</li>
          <li>Estruturar emails em colunas separadas</li>
          <li>Limpar e validar dados de entrada</li>
          <li>Gerar saídas em formato padronizado</li>
        </ul>
      </section>

      <section className="doc-section">
        <h2>Constantes</h2>

        <div className="method-block">
          <h3>CSV_DELIMITER</h3>
          <CodeBlock code={`CSV_DELIMITER = ";"`} />
          <p>Delimitador padrão para arquivos CSV do LEMIT.</p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos da Classe</h2>

        <div className="method-block">
          <h3 id="__init__">__init__</h3>
          <CodeBlock
            code={`def __init__(self, logger: logging.Logger = None):`}
          />
          <p>Inicializa o processador LEMIT.</p>

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
                <td>logger</td>
                <td>
                  <code className="code-block">logging.Logger</code>
                </td>
                <td>Logger para mensagens</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="method-block">
          <h3 id="clean_lemit_result">clean_lemit_result</h3>
          <CodeBlock
            code={`def clean_lemit_result(
    self,
    entrada: Optional[str | Dict] = None,
    arquivo_entrada: Optional[str] = None,
    arquivo_saida: Optional[str] = None,
) -> Optional[Dict[str, Any]]:`}
          />
          <p>Limpa e normaliza um CSV exportado do LEMIT.</p>

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
                <td>entrada</td>
                <td>
                  <code className="code-block">str/Dict</code>
                </td>
                <td>Conteúdo do CSV ou caminho do arquivo</td>
              </tr>
              <tr>
                <td>arquivo_entrada</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Caminho (deprecated - use entrada)</td>
              </tr>
              <tr>
                <td>arquivo_saida</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Caminho do arquivo de saída (opcional)</td>
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
                  <code className="code-block">Optional[Dict[str, Any]]</code>
                </td>
                <td>Dados processados se arquivo_saida=None</td>
              </tr>
            </tbody>
          </table>

          <h4>Estrutura de retorno</h4>
          <CodeBlock
            code={`{
    "headers": [
        "nome", "cpf",
        "telefone_1", "telefone_2", "telefone_3", "telefone_4",
        "email_1", "email_2", "email_3"
    ],
    "linhas": [
        {
            "nome": str,
            "cpf": str,
            "telefone_1": str,  # Com prefixo +55
            "telefone_2": str,
            "telefone_3": str,
            "telefone_4": str,
            "email_1": str,
            "email_2": str,
            "email_3": str
        }
    ]
}`}
          />

          <h4>Exceções</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Exceção</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code className="code-block">ValidationError</code>
                </td>
                <td>Dados de entrada inválidos</td>
              </tr>
              <tr>
                <td>
                  <code className="code-block">FileProcessingError</code>
                </td>
                <td>Erro ao processar arquivo</td>
              </tr>
            </tbody>
          </table>

          <h4>Processamento realizado</h4>
          <ol>
            <li>Normalização do conteúdo CSV</li>
            <li>Extração e validação de headers</li>
            <li>Processamento linha por linha</li>
            <li>Normalização de telefones (+55 prefix)</li>
            <li>Estruturação de emails</li>
            <li>Geração de headers dinâmicos baseados no conteúdo</li>
          </ol>
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos Privados</h2>

        <div className="method-block">
          <h3 id="_normalizar_entrada_csv">_normalizar_entrada_csv</h3>
          <CodeBlock
            code={`def _normalizar_entrada_csv(self, entrada: str | Dict[str, Any]) -> str:`}
          />
          <p>Normaliza entrada CSV para string.</p>

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
                <td>entrada</td>
                <td>
                  <code className="code-block">str/Dict</code>
                </td>
                <td>Conteúdo ou dicionário com 'conteudo'</td>
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
                  <code className="code-block">str</code>
                </td>
                <td>Conteúdo CSV como string</td>
              </tr>
            </tbody>
          </table>

          <h4>Formatos aceitos</h4>
          <ul>
            <li>String direta com conteúdo CSV</li>
            <li>
              Dicionário:{" "}
              <code className="code-block">{`{"conteudo": "csv_content_here"}`}</code>
            </li>
          </ul>
        </div>

        <div className="method-block">
          <h3 id="_extrair_dados_linha">_extrair_dados_linha</h3>
          <CodeBlock
            code={`def _extrair_dados_linha(
    self, headers: List[str], valores: List[str]
) -> Dict[str, str]:`}
          />
          <p>Extrai dados de uma linha do CSV LEMIT.</p>

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
                <td>headers</td>
                <td>
                  <code className="code-block">List[str]</code>
                </td>
                <td>Lista de cabeçalhos</td>
              </tr>
              <tr>
                <td>valores</td>
                <td>
                  <code className="code-block">List[str]</code>
                </td>
                <td>Lista de valores da linha</td>
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
                  <code className="code-block">Dict[str, str]</code>
                </td>
                <td>Dados extraídos e normalizados</td>
              </tr>
            </tbody>
          </table>

          <h4>Processamento por campo</h4>
          <ul>
            <li>
              <strong>Nome</strong>: Primeiro valor se separado por vírgula
            </li>
            <li>
              <strong>CPF</strong>: Extraído de colunas "cpf" ou "CPF"
            </li>
            <li>
              <strong>Telefones</strong>: Até 4 telefones com prefixo +55
            </li>
            <li>
              <strong>Emails</strong>: Até 3 emails estruturados
            </li>
          </ul>
        </div>

        <div className="method-block">
          <h3>_first</h3>
          <CodeBlock code={`def _first(self, value: str) -> str:`} />
          <p>Retorna o primeiro valor de uma string separada por vírgula.</p>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`>>> _first("João Silva, Maria Santos")
"João Silva"
>>> _first("Escritório ABC")
"Escritório ABC"`}
          />
        </div>

        <div className="method-block">
          <h3 id="_escrever_csv">_escrever_csv</h3>
          <CodeBlock
            code={`def _escrever_csv(
    self, arquivo_saida: str, headers: List[str], linhas: List[Dict[str, str]]
) -> None:`}
          />
          <p>Escreve CSV de saída com encoding UTF-8.</p>

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
                <td>arquivo_saida</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Caminho do arquivo</td>
              </tr>
              <tr>
                <td>headers</td>
                <td>
                  <code className="code-block">List[str]</code>
                </td>
                <td>Lista de cabeçalhos</td>
              </tr>
              <tr>
                <td>linhas</td>
                <td>
                  <code className="code-block">List[Dict]</code>
                </td>
                <td>Lista de dados</td>
              </tr>
            </tbody>
          </table>

          <h4>Configurações de escrita</h4>
          <ul>
            <li>
              <strong>Encoding</strong>: UTF-8
            </li>
            <li>
              <strong>Delimitador</strong>: ; (ponto e vírgula)
            </li>
            <li>
              <strong>Quoting</strong>: Mínimo necessário
            </li>
            <li>
              <strong>Newline</strong>: Padrão do sistema
            </li>
          </ul>

          <h4>Exceções</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Exceção</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code className="code-block">FileProcessingError</code>
                </td>
                <td>Erro de permissão ou I/O</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="doc-section">
        <h2>Exemplos de Uso</h2>

        <h3>Processamento Básico</h3>
        <CodeBlock
          code={`# Inicializar processador
processor = LemitProcessor(logger=logger)

# Processar CSV em memória
csv_content = """nome;cpf;telefone1;email1
João Silva;12345678901;11987654321;joao@email.com
Maria Santos;98765432100;21876543210;maria@email.com"""

resultado = processor.clean_lemit_result(entrada=csv_content)
print(f"Headers: {resultado['headers']}")
print(f"Linhas processadas: {len(resultado['linhas'])}")`}
        />

        <h3>Processamento com Arquivo</h3>
        <CodeBlock
          code={`# Processar e salvar diretamente
processor.clean_lemit_result(
    entrada="dados_lemit.csv",
    arquivo_saida="dados_processados.csv"
)`}
        />

        <h3>Processamento com Dicionário</h3>
        <CodeBlock
          code={`dados = {
    "conteudo": "nome;cpf;telefone1\\nJoão;123;11999"
}
resultado = processor.clean_lemit_result(entrada=dados)`}
        />
      </section>

      <section className="doc-section">
        <h2>Formato de Dados</h2>

        <h3>Headers Dinâmicos</h3>
        <p>O processador gera headers baseados no conteúdo:</p>
        <ul>
          <li>
            <strong>Fixos</strong>: <code className="code-block">nome</code>,{" "}
            <code className="code-block">cpf</code>
          </li>
          <li>
            <strong>Telefones</strong>:{" "}
            <code className="code-block">telefone_1</code> até{" "}
            <code className="code-block">telefone_4</code> (baseado no máximo
            encontrado)
          </li>
          <li>
            <strong>Emails</strong>: <code className="code-block">email_1</code>{" "}
            até <code className="code-block">email_3</code> (máximo fixo)
          </li>
        </ul>

        <h3>Normalização de Telefones</h3>
        <p>
          Todos os telefones recebem automaticamente o prefixo{" "}
          <code className="code-block">55</code>:
        </p>
        <ul>
          <li>
            Input: <code className="code-block">11987654321</code>
          </li>
          <li>
            Output: <code className="code-block">5511987654321</code>
          </li>
        </ul>

        <h3>Estrutura de Linha Processada</h3>
        <CodeBlock
          code={`{
    "nome": "JOÃO SILVA",
    "cpf": "12345678901",
    "telefone_1": "5511987654321",
    "telefone_2": "5511876543210",
    "telefone_3": "",
    "telefone_4": "",
    "email_1": "joao@email.com",
    "email_2": "joao.silva@empresa.com",
    "email_3": ""
}`}
        />
      </section>

      <section className="doc-section">
        <h2>Tratamento de Erros</h2>

        <h3>Validações de Entrada</h3>
        <table className="params-table">
          <thead>
            <tr>
              <th>Condição</th>
              <th>Exceção</th>
              <th>Mensagem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>entrada é None</td>
              <td>
                <code className="code-block">ValidationError</code>
              </td>
              <td>Parâmetro 'entrada' é obrigatório</td>
            </tr>
            <tr>
              <td>Headers vazios</td>
              <td>
                <code className="code-block">ValidationError</code>
              </td>
              <td>Headers CSV não podem estar vazios</td>
            </tr>
            <tr>
              <td>CSV sem dados válidos</td>
              <td>
                <code className="code-block">ValidationError</code>
              </td>
              <td>CSV não contém dados válidos</td>
            </tr>
          </tbody>
        </table>

        <h3>Tratamento de Linhas</h3>
        <ul>
          <li>Linhas vazias são ignoradas</li>
          <li>
            Erros de parsing em linhas individuais geram warning e continuam
            processamento
          </li>
          <li>Log detalhado de número de linhas processadas vs. ignoradas</li>
        </ul>

        <h3>Tratamento de Arquivo</h3>
        <table className="params-table">
          <thead>
            <tr>
              <th>Erro</th>
              <th>Exceção</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sem permissão</td>
              <td>
                <code className="code-block">FileProcessingError</code>
              </td>
              <td>Erro de escrita no arquivo</td>
            </tr>
            <tr>
              <td>Erro de I/O</td>
              <td>
                <code className="code-block">FileProcessingError</code>
              </td>
              <td>Problemas de sistema de arquivos</td>
            </tr>
            <tr>
              <td>Erro inesperado</td>
              <td>
                <code className="code-block">FileProcessingError</code>
              </td>
              <td>Outros erros durante processamento</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="doc-section">
        <h2>Observabilidade</h2>

        <h3>Logging</h3>
        <ul>
          <li>
            <strong>Info</strong>: Número de linhas e colunas processadas
          </li>
          <li>
            <strong>Warning</strong>: Erros em linhas específicas (com número da
            linha)
          </li>
          <li>
            <strong>Debug</strong>: Detalhes do processamento
          </li>
          <li>
            <strong>Error</strong>: Erros críticos que impedem processamento
          </li>
        </ul>

        <h3>Métricas</h3>
        <ul>
          <li>Total de linhas processadas</li>
          <li>Linhas com erro (ignoradas)</li>
          <li>Número de headers gerados</li>
          <li>Máximo de telefones/emails por linha</li>
        </ul>
      </section>
    </div>
  );
}

export default LemitProcessorPage;

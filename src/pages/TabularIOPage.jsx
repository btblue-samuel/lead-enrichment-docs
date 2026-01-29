import CodeBlock from "../components/CodeBlock";

function TabularIOPage() {
  return (
    <div className="doc-page">
      <h1>Módulo: tabular_io</h1>
      <p className="doc-subtitle">
        Operações de leitura e escrita de arquivos tabulares com validação e
        segurança.
      </p>

      <section className="doc-section">
        <h2>Descrição</h2>
        <p>
          O módulo <code className="code-block">tabular_io</code> fornece
          funções para leitura e escrita segura de arquivos tabulares (Excel,
          CSV), incluindo validação de dados, verificação de segurança e
          tratamento de erros robusto.
        </p>
      </section>

      <section className="doc-section">
        <h2>Funções de Leitura</h2>

        <div className="method-block">
          <h3 id="read_excel">read_excel</h3>
          <CodeBlock
            code={`def read_excel(
    file_path: str,
    sheet_name: Union[str, int] = 0,
    required_columns: Optional[List[str]] = None,
    dtype: Optional[Dict[str, type]] = None,
    **kwargs
) -> pd.DataFrame:`}
          />
          <p>Lê arquivo Excel com validação e tratamento de erros.</p>

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
                <td>file_path</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Caminho do arquivo Excel</td>
              </tr>
              <tr>
                <td>sheet_name</td>
                <td>
                  <code className="code-block">Union[str, int]</code>
                </td>
                <td>Nome ou índice da aba (padrão: 0)</td>
              </tr>
              <tr>
                <td>required_columns</td>
                <td>
                  <code className="code-block">Optional[List[str]]</code>
                </td>
                <td>Colunas obrigatórias</td>
              </tr>
              <tr>
                <td>dtype</td>
                <td>
                  <code className="code-block">Optional[Dict[str, type]]</code>
                </td>
                <td>Tipos de dados por coluna</td>
              </tr>
              <tr>
                <td>**kwargs</td>
                <td>-</td>
                <td>Argumentos adicionais para pd.read_excel</td>
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
                  <code className="code-block">pd.DataFrame</code>
                </td>
                <td>DataFrame com dados do arquivo</td>
              </tr>
            </tbody>
          </table>

          <h4>Exceções</h4>
          <ul>
            <li>
              <code className="code-block">FileNotFoundError</code>: Arquivo não
              existe
            </li>
            <li>
              <code className="code-block">MissingColumnError</code>: Coluna
              obrigatória ausente
            </li>
            <li>
              <code className="code-block">FileProcessingError</code>: Erro na
              leitura do arquivo
            </li>
            <li>
              <code className="code-block">FileSecurityError</code>: Falha na
              validação de segurança
            </li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from tabular_io import read_excel

# Leitura básica
df = read_excel("dados.xlsx")

# Com validação de colunas
df = read_excel(
    "advogados.xlsx",
    required_columns=["Nome", "OAB", "Escritório"],
    dtype={"OAB": str, "CPF": str}
)

# Aba específica
df = read_excel("dados.xlsx", sheet_name="Cadastro")`}
          />
        </div>

        <div className="method-block">
          <h3 id="read_csv">read_csv</h3>
          <CodeBlock
            code={`def read_csv(
    file_path: str,
    required_columns: Optional[List[str]] = None,
    encoding: str = "utf-8",
    separator: str = ";",
    dtype: Optional[Dict[str, type]] = None,
    **kwargs
) -> pd.DataFrame:`}
          />
          <p>Lê arquivo CSV com validação e tratamento de encoding.</p>

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
                <td>file_path</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Caminho do arquivo CSV</td>
              </tr>
              <tr>
                <td>required_columns</td>
                <td>
                  <code className="code-block">Optional[List[str]]</code>
                </td>
                <td>Colunas obrigatórias</td>
              </tr>
              <tr>
                <td>encoding</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Encoding do arquivo (padrão: utf-8)</td>
              </tr>
              <tr>
                <td>separator</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Separador de campos (padrão: ";")</td>
              </tr>
              <tr>
                <td>dtype</td>
                <td>
                  <code className="code-block">Optional[Dict[str, type]]</code>
                </td>
                <td>Tipos de dados por coluna</td>
              </tr>
            </tbody>
          </table>

          <h4>Detecção automática de encoding</h4>
          <p>
            Se a leitura com encoding especificado falhar, tenta
            automaticamente:
          </p>
          <ol>
            <li>utf-8</li>
            <li>utf-8-sig (com BOM)</li>
            <li>latin-1</li>
            <li>cp1252 (Windows)</li>
          </ol>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from tabular_io import read_csv

# Leitura básica
df = read_csv("dados.csv")

# Com separador e encoding específicos
df = read_csv(
    "export.csv",
    separator=",",
    encoding="latin-1"
)

# Com validação
df = read_csv(
    "advogados.csv",
    required_columns=["Nome", "OAB"]
)`}
          />
        </div>

        <div className="method-block">
          <h3 id="read_file">read_file</h3>
          <CodeBlock
            code={`def read_file(
    file_path: str,
    required_columns: Optional[List[str]] = None,
    **kwargs
) -> pd.DataFrame:`}
          />
          <p>Lê arquivo tabular detectando automaticamente o formato.</p>

          <h4>Formatos suportados</h4>
          <ul>
            <li>
              <code className="code-block">.xlsx</code>,{" "}
              <code className="code-block">.xls</code>: Excel
            </li>
            <li>
              <code className="code-block">.csv</code>: CSV
            </li>
            <li>
              <code className="code-block">.tsv</code>: TSV (tab-separated)
            </li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from tabular_io import read_file

# Detecção automática
df = read_file("dados.xlsx")  # Lê como Excel
df = read_file("dados.csv")   # Lê como CSV`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Funções de Escrita</h2>

        <div className="method-block">
          <h3 id="write_excel">write_excel</h3>
          <CodeBlock
            code={`def write_excel(
    df: pd.DataFrame,
    file_path: str,
    sheet_name: str = "Dados",
    index: bool = False,
    **kwargs
) -> str:`}
          />
          <p>Escreve DataFrame para arquivo Excel.</p>

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
                <td>df</td>
                <td>
                  <code className="code-block">pd.DataFrame</code>
                </td>
                <td>DataFrame a ser escrito</td>
              </tr>
              <tr>
                <td>file_path</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Caminho de saída</td>
              </tr>
              <tr>
                <td>sheet_name</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Nome da aba (padrão: "Dados")</td>
              </tr>
              <tr>
                <td>index</td>
                <td>
                  <code className="code-block">bool</code>
                </td>
                <td>Incluir índice (padrão: False)</td>
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
                <td>Caminho absoluto do arquivo criado</td>
              </tr>
            </tbody>
          </table>

          <h4>Comportamento</h4>
          <ul>
            <li>Cria diretórios intermediários se necessário</li>
            <li>Sobrescreve arquivo existente</li>
            <li>Valida permissões de escrita</li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from tabular_io import write_excel

# Escrita básica
output_path = write_excel(df, "output/resultado.xlsx")

# Com aba nomeada
output_path = write_excel(
    df,
    "relatorios/mensal.xlsx",
    sheet_name="Janeiro 2024"
)`}
          />
        </div>

        <div className="method-block">
          <h3 id="write_csv">write_csv</h3>
          <CodeBlock
            code={`def write_csv(
    df: pd.DataFrame,
    file_path: str,
    encoding: str = "utf-8-sig",
    separator: str = ";",
    index: bool = False,
    **kwargs
) -> str:`}
          />
          <p>Escreve DataFrame para arquivo CSV.</p>

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
                <td>df</td>
                <td>
                  <code className="code-block">pd.DataFrame</code>
                </td>
                <td>DataFrame a ser escrito</td>
              </tr>
              <tr>
                <td>file_path</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Caminho de saída</td>
              </tr>
              <tr>
                <td>encoding</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Encoding (padrão: utf-8-sig para Excel)</td>
              </tr>
              <tr>
                <td>separator</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Separador (padrão: ";")</td>
              </tr>
              <tr>
                <td>index</td>
                <td>
                  <code className="code-block">bool</code>
                </td>
                <td>Incluir índice (padrão: False)</td>
              </tr>
            </tbody>
          </table>

          <h4>Nota sobre encoding</h4>
          <p>
            O encoding padrão <code className="code-block">utf-8-sig</code>{" "}
            inclui BOM (Byte Order Mark), garantindo compatibilidade com
            Microsoft Excel que pode interpretar incorretamente UTF-8 puro.
          </p>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from tabular_io import write_csv

# Escrita para compatibilidade com Excel
output_path = write_csv(df, "output/dados.csv")

# CSV puro UTF-8
output_path = write_csv(
    df,
    "output/dados.csv",
    encoding="utf-8",
    separator=","
)`}
          />
        </div>

        <div className="method-block">
          <h3>write_excel_multiple_sheets</h3>
          <CodeBlock
            code={`def write_excel_multiple_sheets(
    dataframes: Dict[str, pd.DataFrame],
    file_path: str,
    **kwargs
) -> str:`}
          />
          <p>
            Escreve múltiplos DataFrames como abas em um único arquivo Excel.
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
                <td>dataframes</td>
                <td>
                  <code className="code-block">Dict[str, pd.DataFrame]</code>
                </td>
                <td>Mapeamento nome_aba → DataFrame</td>
              </tr>
              <tr>
                <td>file_path</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Caminho de saída</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from tabular_io import write_excel_multiple_sheets

dataframes = {
    "Resumo": df_resumo,
    "Sucesso": df_sucesso,
    "Erros": df_erros,
    "Ignorados": df_ignorados
}

output_path = write_excel_multiple_sheets(
    dataframes,
    "output/relatorio_completo.xlsx"
)`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Funções de Validação</h2>

        <div className="method-block">
          <h3 id="validate_columns">validate_columns</h3>
          <CodeBlock
            code={`def validate_columns(
    df: pd.DataFrame,
    required_columns: List[str],
    raise_on_missing: bool = True
) -> List[str]:`}
          />
          <p>Valida presença de colunas obrigatórias no DataFrame.</p>

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
                <td>df</td>
                <td>
                  <code className="code-block">pd.DataFrame</code>
                </td>
                <td>DataFrame a validar</td>
              </tr>
              <tr>
                <td>required_columns</td>
                <td>
                  <code className="code-block">List[str]</code>
                </td>
                <td>Lista de colunas obrigatórias</td>
              </tr>
              <tr>
                <td>raise_on_missing</td>
                <td>
                  <code className="code-block">bool</code>
                </td>
                <td>Lançar exceção se faltar coluna</td>
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
                  <code className="code-block">List[str]</code>
                </td>
                <td>Lista de colunas faltantes (vazia se todas presentes)</td>
              </tr>
            </tbody>
          </table>

          <h4>Exceção</h4>
          <CodeBlock
            code={`MissingColumnError: Colunas obrigatórias ausentes: ['OAB', 'CPF']`}
          />

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from tabular_io import validate_columns
from exceptions import MissingColumnError

# Com exceção automática
try:
    validate_columns(df, ["Nome", "OAB", "CPF"])
except MissingColumnError as e:
    print(f"Colunas faltando: {e.missing_columns}")

# Sem exceção (retorna lista)
missing = validate_columns(df, ["Nome", "OAB"], raise_on_missing=False)
if missing:
    print(f"Colunas não encontradas: {missing}")`}
          />
        </div>

        <div className="method-block">
          <h3>validate_file_path</h3>
          <CodeBlock
            code={`def validate_file_path(
    file_path: str,
    must_exist: bool = True,
    allowed_extensions: Optional[List[str]] = None
) -> str:`}
          />
          <p>
            Valida caminho de arquivo e retorna caminho absoluto normalizado.
          </p>

          <h4>Validações realizadas</h4>
          <ul>
            <li>Existência do arquivo (se must_exist=True)</li>
            <li>Extensão permitida (se allowed_extensions fornecido)</li>
            <li>Caminho não é diretório</li>
            <li>Verificação de segurança contra path traversal</li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from tabular_io import validate_file_path

# Validação básica
path = validate_file_path("dados.xlsx")

# Com extensões permitidas
path = validate_file_path(
    "dados.xlsx",
    allowed_extensions=[".xlsx", ".xls", ".csv"]
)

# Para escrita (arquivo não precisa existir)
path = validate_file_path(
    "output/novo.xlsx",
    must_exist=False
)`}
          />
        </div>

        <div className="method-block">
          <h3>validate_dataframe</h3>
          <CodeBlock
            code={`def validate_dataframe(
    df: pd.DataFrame,
    min_rows: int = 1,
    max_rows: Optional[int] = None,
    required_columns: Optional[List[str]] = None
) -> bool:`}
          />
          <p>Valida estrutura e conteúdo do DataFrame.</p>

          <h4>Validações</h4>
          <ul>
            <li>Número mínimo de linhas</li>
            <li>Número máximo de linhas (opcional)</li>
            <li>Presença de colunas obrigatórias</li>
            <li>DataFrame não é None</li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from tabular_io import validate_dataframe

# Validação com mínimo de linhas
if validate_dataframe(df, min_rows=10):
    print("DataFrame válido para processamento")

# Validação completa
is_valid = validate_dataframe(
    df,
    min_rows=1,
    max_rows=10000,
    required_columns=["Nome", "OAB"]
)`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Segurança</h2>

        <div className="method-block">
          <h3 id="validate_file_security">validate_file_security</h3>
          <CodeBlock
            code={`def validate_file_security(file_path: str) -> bool:`}
          />
          <p>Valida segurança do arquivo antes de processamento.</p>

          <h4>Verificações realizadas</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Verificação</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Path Traversal</td>
                <td>Detecta tentativas de acesso fora do diretório</td>
              </tr>
              <tr>
                <td>Extensão</td>
                <td>Valida se extensão é permitida</td>
              </tr>
              <tr>
                <td>Tamanho máximo</td>
                <td>Verifica se arquivo não excede limite</td>
              </tr>
              <tr>
                <td>Caracteres inválidos</td>
                <td>Detecta caracteres suspeitos no caminho</td>
              </tr>
              <tr>
                <td>Links simbólicos</td>
                <td>Impede seguir symlinks maliciosos</td>
              </tr>
            </tbody>
          </table>

          <h4>Exceção</h4>
          <CodeBlock
            code={`FileSecurityError: Tentativa de path traversal detectada: ../../../etc/passwd`}
          />

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from tabular_io import validate_file_security
from exceptions import FileSecurityError

try:
    validate_file_security(user_provided_path)
    df = read_excel(user_provided_path)
except FileSecurityError as e:
    print(f"⚠️ Arquivo rejeitado por segurança: {e}")`}
          />
        </div>

        <div className="method-block">
          <h3>sanitize_filename</h3>
          <CodeBlock code={`def sanitize_filename(filename: str) -> str:`} />
          <p>Sanitiza nome de arquivo removendo caracteres perigosos.</p>

          <h4>Caracteres removidos/substituídos</h4>
          <ul>
            <li>
              <code className="code-block">..</code> (path traversal)
            </li>
            <li>
              <code className="code-block">/</code> e{" "}
              <code className="code-block">\</code> (separadores)
            </li>
            <li>
              <code className="code-block">:</code> (drive letter/ADS)
            </li>
            <li>
              <code className="code-block">*</code>,{" "}
              <code className="code-block">?</code>,{" "}
              <code className="code-block">"</code>,{" "}
              <code className="code-block">&lt;</code>,{" "}
              <code className="code-block">&gt;</code>,{" "}
              <code className="code-block">|</code> (inválidos Windows)
            </li>
            <li>Caracteres de controle</li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from tabular_io import sanitize_filename

safe_name = sanitize_filename("../../../etc/passwd")
# Resultado: "etc_passwd"

safe_name = sanitize_filename("arquivo<teste>.xlsx")
# Resultado: "arquivo_teste_.xlsx"`}
          />
        </div>

        <div className="method-block">
          <h3>Constantes de segurança</h3>
          <CodeBlock
            code={`# Extensões permitidas para leitura
ALLOWED_READ_EXTENSIONS = [".xlsx", ".xls", ".csv", ".tsv"]

# Extensões permitidas para escrita
ALLOWED_WRITE_EXTENSIONS = [".xlsx", ".csv"]

# Tamanho máximo de arquivo (50MB)
MAX_FILE_SIZE = 50 * 1024 * 1024

# Número máximo de linhas por arquivo
MAX_ROWS = 100000`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Funções Auxiliares</h2>

        <div className="method-block">
          <h3>get_file_info</h3>
          <CodeBlock
            code={`def get_file_info(file_path: str) -> Dict[str, Any]:`}
          />
          <p>Obtém informações sobre um arquivo tabular.</p>

          <h4>Retorno</h4>
          <CodeBlock
            code={`{
    "path": str,              # Caminho absoluto
    "filename": str,          # Nome do arquivo
    "extension": str,         # Extensão (.xlsx, .csv, etc)
    "size_bytes": int,        # Tamanho em bytes
    "size_human": str,        # Tamanho legível ("1.5 MB")
    "modified": datetime,     # Data de modificação
    "created": datetime,      # Data de criação
    "num_sheets": int,        # Número de abas (Excel)
    "sheet_names": List[str]  # Nomes das abas (Excel)
}`}
          />

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from tabular_io import get_file_info

info = get_file_info("dados.xlsx")
print(f"Arquivo: {info['filename']}")
print(f"Tamanho: {info['size_human']}")
print(f"Abas: {info['sheet_names']}")`}
          />
        </div>

        <div className="method-block">
          <h3>preview_file</h3>
          <CodeBlock
            code={`def preview_file(
    file_path: str,
    num_rows: int = 5,
    sheet_name: Union[str, int] = 0
) -> pd.DataFrame:`}
          />
          <p>Lê primeiras linhas de um arquivo para preview.</p>

          <h4>Uso</h4>
          <CodeBlock
            code={`from tabular_io import preview_file

# Preview das primeiras 5 linhas
preview = preview_file("dados.xlsx")
print(preview)

# Preview de 10 linhas de aba específica
preview = preview_file("dados.xlsx", num_rows=10, sheet_name="Cadastro")`}
          />
        </div>

        <div className="method-block">
          <h3>detect_encoding</h3>
          <CodeBlock code={`def detect_encoding(file_path: str) -> str:`} />
          <p>Detecta encoding de arquivo de texto/CSV.</p>

          <h4>Método</h4>
          <p>
            Usa biblioteca <code className="code-block">chardet</code> para
            detecção automática com fallback para encodings comuns em caso de
            baixa confiança.
          </p>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from tabular_io import detect_encoding

encoding = detect_encoding("dados.csv")
# Resultado: "utf-8", "latin-1", "cp1252", etc

df = read_csv("dados.csv", encoding=encoding)`}
          />
        </div>

        <div className="method-block">
          <h3>normalize_column_names</h3>
          <CodeBlock
            code={`def normalize_column_names(df: pd.DataFrame) -> pd.DataFrame:`}
          />
          <p>Normaliza nomes de colunas do DataFrame.</p>

          <h4>Normalizações aplicadas</h4>
          <ul>
            <li>Remove espaços extras</li>
            <li>Converte para lowercase</li>
            <li>Remove acentos</li>
            <li>Substitui espaços por underscore</li>
            <li>Remove caracteres especiais</li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from tabular_io import normalize_column_names

# Antes: ["Nome Completo", "E-mail", "Nº OAB"]
df = normalize_column_names(df)
# Depois: ["nome_completo", "email", "no_oab"]`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Exemplos de Uso</h2>

        <h3>Leitura Segura de Arquivo</h3>
        <CodeBlock
          code={`from tabular_io import read_excel, validate_file_security
from exceptions import FileSecurityError, MissingColumnError, FileProcessingError

def process_user_file(file_path: str) -> pd.DataFrame:
    """Processa arquivo fornecido pelo usuário de forma segura."""
    try:
        # Validação de segurança
        validate_file_security(file_path)
        
        # Leitura com validação de colunas
        df = read_excel(
            file_path,
            required_columns=["Nome", "OAB", "Escritório"],
            dtype={"OAB": str, "CPF": str, "CNPJ": str}
        )
        
        return df
        
    except FileSecurityError as e:
        print(f"⚠️ Arquivo rejeitado: {e}")
        raise
    except MissingColumnError as e:
        print(f"❌ Colunas faltando: {e.missing_columns}")
        raise
    except FileProcessingError as e:
        print(f"❌ Erro ao ler arquivo: {e}")
        raise`}
        />

        <h3>Exportação com Múltiplas Abas</h3>
        <CodeBlock
          code={`from tabular_io import write_excel_multiple_sheets
import pandas as pd

def export_results(results: List[Dict], original_df: pd.DataFrame) -> str:
    """Exporta resultados para Excel com múltiplas abas."""
    
    # Separa por status
    success = [r for r in results if r.get("success")]
    errors = [r for r in results if r.get("error")]
    ignored = [r for r in results if r.get("ignored")]
    
    # Cria métricas
    metrics = pd.DataFrame([{
        "Total": len(results),
        "Sucesso": len(success),
        "Erros": len(errors),
        "Ignorados": len(ignored),
        "Taxa de Sucesso": f"{len(success)/len(results)*100:.1f}%"
    }])
    
    # Exporta
    dataframes = {
        "Métricas": metrics,
        "Sucesso": pd.DataFrame(success),
        "Erros": pd.DataFrame(errors),
        "Ignorados": pd.DataFrame(ignored),
        "Dados Originais": original_df
    }
    
    return write_excel_multiple_sheets(
        dataframes,
        "output/resultado_completo.xlsx"
    )`}
        />

        <h3>Pipeline Completo de Processamento</h3>
        <CodeBlock
          code={`from tabular_io import (
    read_file,
    write_excel,
    validate_dataframe,
    normalize_column_names
)

def pipeline(input_path: str, output_path: str) -> bool:
    """Pipeline completo de leitura, processamento e escrita."""
    
    # 1. Leitura
    df = read_file(input_path)
    print(f"📥 Lidos {len(df)} registros")
    
    # 2. Validação
    if not validate_dataframe(df, min_rows=1, max_rows=10000):
        raise ValueError("DataFrame inválido")
    
    # 3. Normalização
    df = normalize_column_names(df)
    
    # 4. Processamento
    df["processado"] = True
    df["data_processamento"] = pd.Timestamp.now()
    
    # 5. Escrita
    output = write_excel(df, output_path)
    print(f"📤 Salvo em: {output}")
    
    return True`}
        />
      </section>

      <section className="doc-section">
        <h2>Tratamento de Erros</h2>

        <h3>Hierarquia de Exceções</h3>
        <CodeBlock
          code={`# Exceções específicas do módulo
from exceptions import (
    FileProcessingError,    # Erro geral de processamento de arquivo
    MissingColumnError,     # Coluna obrigatória ausente
    FileSecurityError       # Falha na validação de segurança
)

# Uso em try/except
try:
    df = read_excel("dados.xlsx", required_columns=["Nome", "OAB"])
except FileNotFoundError:
    print("Arquivo não encontrado")
except MissingColumnError as e:
    print(f"Colunas faltando: {e.missing_columns}")
except FileSecurityError as e:
    print(f"Problema de segurança: {e}")
except FileProcessingError as e:
    print(f"Erro de processamento: {e}")`}
        />

        <h3>Logging Integrado</h3>
        <CodeBlock
          code={`# O módulo usa logging estruturado
import logging
logger = logging.getLogger("tabular_io")

# Logs gerados automaticamente:
# DEBUG: Iniciando leitura de arquivo: dados.xlsx
# INFO: Arquivo lido com sucesso: 150 linhas, 12 colunas
# WARNING: Encoding detectado com baixa confiança: latin-1
# ERROR: Coluna obrigatória não encontrada: 'OAB'`}
        />
      </section>
    </div>
  );
}

export default TabularIOPage;

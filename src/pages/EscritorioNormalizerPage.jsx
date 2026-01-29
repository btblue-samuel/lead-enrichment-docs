import CodeBlock from "../components/CodeBlock";

function EscritorioNormalizerPage() {
  return (
    <div className="doc-page">
      <h1>Classe: EscritorioNormalizer</h1>
      <p className="doc-subtitle">
        Normalização de nomes de escritórios usando mapeamento JSON e fuzzy
        matching.
      </p>

      <section className="doc-section">
        <h2>Descrição</h2>
        <p>
          A classe <code className="code-block">EscritorioNormalizer</code>{" "}
          fornece funcionalidades avançadas para normalização de nomes de
          escritórios, utilizando mapeamento JSON predefinido e algoritmos de
          fuzzy matching (Levenshtein) para encontrar correspondências
          similares.
        </p>
      </section>

      <section className="doc-section">
        <h2>Classe EscritorioNormalizer</h2>
        <CodeBlock code={`class EscritorioNormalizer:`} />
        <p>
          Normaliza nomes de escritórios usando mapeamento JSON e fuzzy
          matching.
        </p>

        <h3>Responsabilidades</h3>
        <ul>
          <li>Carregar mapeamento de nomes de escritórios de arquivo JSON</li>
          <li>
            Normalizar nomes usando correspondência exata ou fuzzy matching
          </li>
          <li>Fornecer estatísticas de normalização</li>
          <li>Logging detalhado do processo de normalização</li>
        </ul>
      </section>

      <section className="doc-section">
        <h2>Métodos da Classe</h2>

        <div className="method-block">
          <h3 id="__init__">__init__</h3>
          <CodeBlock
            code={`def __init__(
    self,
    logger: logging.Logger = None,
    enable_normalization: bool = False,
    mapping_path: str = None,
):`}
          />
          <p>Inicializa o normalizador de escritórios.</p>

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
              <tr>
                <td>enable_normalization</td>
                <td>
                  <code className="code-block">bool</code>
                </td>
                <td>Se True, ativa a normalização</td>
              </tr>
              <tr>
                <td>mapping_path</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Caminho para arquivo JSON de mapeamento</td>
              </tr>
            </tbody>
          </table>

          <p>
            <strong>Arquivo de mapeamento padrão:</strong>{" "}
            <code className="code-block">
              ../res/parceiros_escritorios.json
            </code>
          </p>
        </div>

        <div className="method-block">
          <h3 id="normalize">normalize</h3>
          <CodeBlock
            code={`def normalize(self, name: str) -> tuple[str, str, float]:`}
          />
          <p>Normaliza nome do escritório usando o mapeamento JSON.</p>

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
                <td>Nome original do escritório</td>
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
                  <code className="code-block">tuple[str, str, float]</code>
                </td>
                <td>(nome_final, status, score)</td>
              </tr>
            </tbody>
          </table>

          <h4>Status possíveis</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Score</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code className="code-block">normalized</code>
                </td>
                <td>1.0</td>
                <td>Nome normalizado com sucesso</td>
              </tr>
              <tr>
                <td>
                  <code className="code-block">not_found</code>
                </td>
                <td>0.0</td>
                <td>Nome não encontrado no JSON</td>
              </tr>
              <tr>
                <td>
                  <code className="code-block">skipped</code>
                </td>
                <td>0.0</td>
                <td>Valor especial que não deve ser normalizado</td>
              </tr>
              <tr>
                <td>
                  <code className="code-block">disabled</code>
                </td>
                <td>0.0</td>
                <td>Normalização está desativada</td>
              </tr>
              <tr>
                <td>
                  <code className="code-block">fuzzy_matched</code>
                </td>
                <td>0.95-1.0</td>
                <td>Nome encontrado via Levenshtein</td>
              </tr>
            </tbody>
          </table>

          <h4>Valores especiais (sempre skipped)</h4>
          <ul>
            <li>
              <code className="code-block">N/A</code>
            </li>
            <li>
              <code className="code-block">ERRO AO PROCESSAR</code>
            </li>
            <li>
              <code className="code-block">Erro ao processar linha</code>
            </li>
          </ul>
        </div>

        <div className="method-block">
          <h3 id="normalize_for_output">normalize_for_output</h3>
          <CodeBlock
            code={`def normalize_for_output(self, name: str) -> str:`}
          />
          <p>Normaliza nome para saída (retorna apenas o nome final).</p>

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
                <td>Nome original do escritório</td>
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
                <td>Nome normalizado ou original</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="doc-section">
        <h2>Propriedades</h2>

        <div className="method-block">
          <h3 id="is_enabled">is_enabled</h3>
          <CodeBlock
            code={`@property
def is_enabled(self) -> bool:`}
          />
          <p>Retorna se a normalização está habilitada.</p>
        </div>

        <div className="method-block">
          <h3>mapping_count</h3>
          <CodeBlock
            code={`@property
def mapping_count(self) -> int:`}
          />
          <p>Retorna o número de mapeamentos carregados do arquivo JSON.</p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos Privados</h2>

        <div className="method-block">
          <h3 id="_load_mapping">_load_mapping</h3>
          <CodeBlock code={`def _load_mapping(self) -> dict[str, str]:`} />
          <p>Carrega mapeamento de nomes de escritórios do JSON.</p>

          <h4>Estrutura esperada do JSON</h4>
          <CodeBlock
            code={`{
    "escritorios": {
        "Nome Original 1": "Nome Normalizado 1",
        "Nome Original 2": "Nome Normalizado 2"
    }
}`}
          />

          <h4>Tratamento de erros</h4>
          <ul>
            <li>
              <code className="code-block">FileNotFoundError</code>: Arquivo não
              encontrado (retorna dict vazio)
            </li>
            <li>
              <code className="code-block">json.JSONDecodeError</code>: Erro de
              parsing JSON (retorna dict vazio)
            </li>
            <li>
              <code className="code-block">Exception</code>: Outros erros
              (retorna dict vazio)
            </li>
          </ul>
        </div>

        <div className="method-block">
          <h3 id="_find_best_match">_find_best_match</h3>
          <CodeBlock
            code={`def _find_best_match(
    self, input_name: str, valid_names: list, threshold: float = 0.95
) -> tuple[Optional[str], float]:`}
          />
          <p>Encontra o melhor match usando distância Levenshtein.</p>

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
                <td>input_name</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Nome a ser procurado</td>
              </tr>
              <tr>
                <td>valid_names</td>
                <td>
                  <code className="code-block">list</code>
                </td>
                <td>Lista de nomes válidos</td>
              </tr>
              <tr>
                <td>threshold</td>
                <td>
                  <code className="code-block">float</code>
                </td>
                <td>Limiar mínimo de similaridade (0-1)</td>
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
                  <code className="code-block">
                    tuple[Optional[str], float]
                  </code>
                </td>
                <td>(nome_válido, score) ou (None, 0.0)</td>
              </tr>
            </tbody>
          </table>

          <h4>Algoritmo</h4>
          <ol>
            <li>Normaliza nomes para lowercase</li>
            <li>Calcula similaridade Levenshtein para cada nome válido</li>
            <li>Retorna o melhor match se score &gt;= threshold</li>
            <li>Caso contrário, retorna None</li>
          </ol>

          <p>
            <strong>Threshold padrão:</strong> 0.95 (95% de similaridade)
          </p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Exemplos de Uso</h2>

        <h3>Uso Básico</h3>
        <CodeBlock
          code={`# Inicializar com normalização ativa
normalizer = EscritorioNormalizer(
    logger=logger,
    enable_normalization=True
)

# Normalizar nome
nome_final, status, score = normalizer.normalize("Escritório XYZ Ltda")
print(f"Original: Escritório XYZ Ltda")
print(f"Normalizado: {nome_final}")
print(f"Status: {status}")
print(f"Score: {score}")`}
        />

        <h3>Uso com Arquivo JSON Customizado</h3>
        <CodeBlock
          code={`normalizer = EscritorioNormalizer(
    logger=logger,
    enable_normalization=True,
    mapping_path="/caminho/para/meu_mapeamento.json"
)

# Verificar se carregou corretamente
if normalizer.is_enabled:
    print(f"Carregados {normalizer.mapping_count} mapeamentos")`}
        />

        <h3>Normalização para Saída</h3>
        <CodeBlock
          code={`# Apenas o nome final (simplificado)
nome_normalizado = normalizer.normalize_for_output("Escritório ABC")`}
        />
      </section>

      <section className="doc-section">
        <h2>Observabilidade</h2>

        <h3>Logging</h3>
        <p>A classe registra informações detalhadas sobre:</p>
        <ul>
          <li>Inicialização e carregamento de mapeamentos</li>
          <li>Resultados de fuzzy matching com scores</li>
          <li>Erros de carregamento do arquivo JSON</li>
          <li>Estatísticas de normalização</li>
        </ul>

        <h3>Métricas</h3>
        <ul>
          <li>Número de mapeamentos carregados</li>
          <li>Status de habilitação da normalização</li>
          <li>Scores de similaridade para fuzzy matching</li>
        </ul>
      </section>

      <section className="doc-section">
        <h2>Tratamento de Erros</h2>
        <table className="params-table">
          <thead>
            <tr>
              <th>Situação</th>
              <th>Comportamento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Arquivo JSON não encontrado</td>
              <td>Warning + retorna dict vazio</td>
            </tr>
            <tr>
              <td>Erro de parsing JSON</td>
              <td>Error + retorna dict vazio</td>
            </tr>
            <tr>
              <td>Nome vazio/None</td>
              <td>Retorna valor original com status apropriado</td>
            </tr>
            <tr>
              <td>Normalização desabilitada</td>
              <td>Retorna nome original com status "disabled"</td>
            </tr>
            <tr>
              <td>Sem match encontrado</td>
              <td>Retorna nome original com status "not_found"</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default EscritorioNormalizerPage;

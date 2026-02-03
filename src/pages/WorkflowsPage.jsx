import CodeBlock from "../components/CodeBlock";

function WorkflowsPage() {
  return (
    <div className="doc-page">
      <h1>Módulo: workflows</h1>
      <p className="doc-subtitle">
        Sistema de automação LEMIT → Ploomes com orquestração de fluxos de
        trabalho.
      </p>

      <section className="doc-section">
        <h2>Visão Geral</h2>
        <p>
          O sistema oferece diferentes pipelines de processamento para atender a
          diferentes necessidades de negócio:
        </p>

        <table className="params-table">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Descrição</th>
              <th>LEMIT</th>
              <th>Ploomes</th>
              <th>Uso Principal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code className="code-block">lemit-cpf</code>
              </td>
              <td>Enriquecimento apenas via CPF</td>
              <td>✅</td>
              <td>❌</td>
              <td>Buscar telefones/emails por CPF</td>
            </tr>
            <tr>
              <td>
                <code className="code-block">lemit-nome</code>
              </td>
              <td>Enriquecimento apenas via Nome</td>
              <td>✅</td>
              <td>❌</td>
              <td>Buscar telefones/emails por nome</td>
            </tr>
            <tr>
              <td>
                <code className="code-block">ploomes-only</code>
              </td>
              <td>Importação apenas para CRM</td>
              <td>❌</td>
              <td>✅</td>
              <td>Criar advogados/escritórios</td>
            </tr>
            <tr>
              <td>
                <code className="code-block">advogados</code>
              </td>
              <td>Alias para ploomes-only</td>
              <td>❌</td>
              <td>✅</td>
              <td>Compatibilidade retroativa</td>
            </tr>
            <tr>
              <td>
                <code className="code-block">escritorio-only</code>
              </td>
              <td>Busca escritório + enriquecimento</td>
              <td>✅</td>
              <td>✅</td>
              <td>Quando só tem nome do escritório</td>
            </tr>
            <tr>
              <td>
                <code className="code-block">cpf</code>
              </td>
              <td>Pipeline completo via CPF</td>
              <td>✅</td>
              <td>✅</td>
              <td>Fluxo completo com CPF</td>
            </tr>
            <tr>
              <td>
                <code className="code-block">nome</code>
              </td>
              <td>Pipeline completo via Nome</td>
              <td>✅</td>
              <td>✅</td>
              <td>Fluxo completo sem CPF</td>
            </tr>
          </tbody>
        </table>

        <h3>Arquitetura de Módulos</h3>
        <CodeBlock
          code={`src/workflows/
├── __init__.py              # Exporta todas as funções de workflow
├── workflow_router.py       # Detecção automática e validação
├── lemit_workflows.py       # Workflows apenas LEMIT
├── ploomes_workflows.py     # Workflows apenas Ploomes
├── combined_workflows.py    # Pipelines completos
└── escritorio_workflow.py   # Workflow de escritório`}
        />
      </section>

      <section className="doc-section">
        <h2>Classe WorkflowRouter</h2>
        <p>
          <strong>Arquivo:</strong>{" "}
          <code className="code-block">src/workflows/workflow_router.py</code>
        </p>

        <CodeBlock
          code={`class WorkflowRouter:
    """
    Decide qual fluxo rodar baseado nos cabeçalhos:
    - OAB/Advogado presente? -> Pipeline com Integração Ploomes.
    - Apenas Reclamante/CPF? -> Apenas Enriquecimento Lemit.
    """`}
        />
        <p>
          Responsável pela detecção automática de workflow baseado nos
          cabeçalhos do arquivo de entrada e validação de colunas obrigatórias.
        </p>

        <h3>Observability Features</h3>
        <ul>
          <li>
            📝 Logging estruturado com{" "}
            <code className="code-block">correlation_id</code>
          </li>
          <li>⏱️ Métricas de detecção de workflow</li>
          <li>📊 Análise detalhada de colunas detectadas</li>
          <li>📈 Tracking de workflows detectados</li>
        </ul>

        <div className="method-block">
          <h3 id="__init__">__init__</h3>
          <CodeBlock code={`def __init__(self, logger: logging.Logger)`} />
          <p>Inicializa o roteador de workflows.</p>

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
                <td>Logger configurado para registrar operações</td>
              </tr>
            </tbody>
          </table>

          <h4>Atributos Inicializados</h4>
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
                <td>self.logger</td>
                <td>
                  <code className="code-block">logging.Logger</code>
                </td>
                <td>Logger para operações</td>
              </tr>
              <tr>
                <td>self._metrics</td>
                <td>
                  <code className="code-block">MetricsRegistry</code>
                </td>
                <td>Registry de métricas</td>
              </tr>
              <tr>
                <td>self._detection_count</td>
                <td>
                  <code className="code-block">int</code>
                </td>
                <td>Contador de detecções</td>
              </tr>
              <tr>
                <td>self._workflow_counts</td>
                <td>
                  <code className="code-block">dict[str, int]</code>
                </td>
                <td>Contagem por tipo de workflow</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="method-block">
          <h3 id="get_stats">get_stats</h3>
          <CodeBlock code={`def get_stats(self) -> dict`} />
          <p>Retorna estatísticas de detecção de workflows.</p>

          <h4>Retorno</h4>
          <CodeBlock
            code={`{
    "total_detections": int,      # Total de detecções realizadas
    "workflow_counts": dict,      # Contagem por tipo de workflow
    "metrics": dict               # Métricas de performance
}`}
          />

          <h4>Exemplo</h4>
          <CodeBlock
            code={`router = WorkflowRouter(logger)
stats = router.get_stats()
# {
#     "total_detections": 15,
#     "workflow_counts": {"cpf": 8, "nome": 5, "ploomes-only": 2},
#     "metrics": {"average_duration_ms": 45.2, ...}
# }`}
          />
        </div>

        <div className="method-block">
          <h3 id="detect_workflow">detect_workflow</h3>
          <CodeBlock
            code={`def detect_workflow(self, input_file: str) -> Optional[str]`}
          />
          <p>
            Detecta automaticamente o workflow baseado nas colunas do arquivo.
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
                <td>input_file</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Caminho para o arquivo de entrada (Excel/CSV)</td>
              </tr>
            </tbody>
          </table>

          <h4>Workflows Possíveis</h4>
          <ul>
            <li>
              <code className="code-block">"cpf"</code> - Pipeline completo com
              CPF
            </li>
            <li>
              <code className="code-block">"nome"</code> - Pipeline completo com
              Nome
            </li>
            <li>
              <code className="code-block">"ploomes-only"</code> - Apenas
              importação Ploomes
            </li>
            <li>
              <code className="code-block">"escritorio-only"</code> - Escritório
              + enriquecimento
            </li>
            <li>
              <code className="code-block">"lemit-cpf"</code> - Apenas LEMIT por
              CPF
            </li>
            <li>
              <code className="code-block">"lemit-nome"</code> - Apenas LEMIT
              por Nome
            </li>
          </ul>

          <h4>Lógica de Detecção</h4>
          <CodeBlock
            code={`┌─────────────────────────────────────────────────────────────┐
│                    DETECÇÃO DE WORKFLOW                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tem OAB/Advogado com valores?                              │
│       │                                                     │
│       ├── SIM ──┬── Tem CPF com valores? ─── → "cpf"        │
│       │         │                                           │
│       │         ├── Tem Nome (sem CPF)? ──── → "nome"       │
│       │         │                                           │
│       │         └── Sem dados reclamante ─── → "ploomes-    │
│       │                                           only"     │
│       │                                                     │
│       └── NÃO ──┬── Tem Escritório + (CPF ou Nome)?         │
│                 │        └───────────────────→ "escritorio- │
│                 │                                  only"    │
│                 │                                           │
│                 ├── Tem CPF com valores? ─── → "lemit-cpf"  │
│                 │                                           │
│                 └── Tem Nome com valores? ── → "lemit-nome" │
│                                                             │
│  ⚠️ Se nenhuma condição: retorna None                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}
          />

          <h4>Exemplo</h4>
          <CodeBlock
            code={`router = WorkflowRouter(logger)
workflow = router.detect_workflow("dados.xlsx")
# "cpf" - se arquivo tem OAB + CPF preenchidos`}
          />
        </div>

        <div className="method-block">
          <h3 id="validate_required_columns">validate_required_columns</h3>
          <CodeBlock
            code={`def validate_required_columns(self, input_file: str, workflow: str = None) -> dict`}
          />
          <p>
            Valida se as colunas obrigatórias estão preenchidas antes do
            processamento.
          </p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Parâmetro</th>
                <th>Tipo</th>
                <th>Padrão</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>input_file</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>-</td>
                <td>Caminho para o arquivo de entrada</td>
              </tr>
              <tr>
                <td>workflow</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>
                  <code className="code-block">None</code>
                </td>
                <td>Nome do workflow (para validação condicional)</td>
              </tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <CodeBlock
            code={`{
    "valid": bool,           # True se validação passou
    "errors": list[str],     # Lista de erros encontrados
    "warnings": list[str],   # Lista de avisos
    "missing_rows": dict     # Linhas com valores faltantes por coluna
}`}
          />

          <h4>Regras de Validação por Workflow</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Workflow</th>
                <th>CNJ</th>
                <th>Reclamante</th>
                <th>CPF</th>
                <th>Escritório</th>
                <th>Advogado</th>
                <th>OAB</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>lemit-cpf</td>
                <td>✅</td>
                <td>✅</td>
                <td>⚠️</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>lemit-nome</td>
                <td>✅</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>ploomes-only</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>advogados</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>escritorio-only</td>
                <td>✅</td>
                <td>✅</td>
                <td>❌</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>cpf</td>
                <td>✅</td>
                <td>✅</td>
                <td>⚠️</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>nome</td>
                <td>✅</td>
                <td>✅</td>
                <td>❌</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
              </tr>
            </tbody>
          </table>
          <p>
            <small>
              ✅ = Obrigatório | ⚠️ = Recomendado (warn) | ❌ = Não necessário |
              = Escritório OU (Advogado + OAB)
            </small>
          </p>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`router = WorkflowRouter(logger)
result = router.validate_required_columns("dados.xlsx", workflow="cpf")

if not result["valid"]:
    for error in result["errors"]:
        print(error)
    # ❌ Coluna obrigatória não encontrada: CNJ
    # ❌ Coluna 'Reclamante' tem 5 linha(s) vazia(s): linhas 2, 5, 8, 12, 15`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Workflows LEMIT</h2>
        <p>
          Workflows que executam apenas enriquecimento de dados via LEMIT, sem
          integração com Ploomes.
        </p>

        <div className="method-block">
          <h3 id="executar_fluxo_lemit_cpf">executar_fluxo_lemit_cpf</h3>
          <p>
            <strong>Arquivo:</strong>{" "}
            <code className="code-block">src/workflows/lemit_workflows.py</code>
          </p>
          <CodeBlock
            code={`def executar_fluxo_lemit_cpf(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: list = None
) -> int`}
          />
          <p>
            Executa apenas o enriquecimento de dados via LEMIT usando CPF como
            identificador.
          </p>

          <h4>Pipeline</h4>
          <CodeBlock
            code={`┌─────────────────────────────────────────────────────────────┐
│                    LEMIT-CPF WORKFLOW                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 📥 Inicializar clientes (ExcelProcessor, LemitClient)   │
│       │                                                     │
│       ▼                                                     │
│  2. 🔍 Processar fluxo com CPF                              │
│       ├── Ler planilha de entrada                           │
│       ├── Para cada linha com CPF:                          │
│       │    └── Buscar no LEMIT                              │
│       └── Enriquecer com telefones/emails                   │
│       │                                                     │
│       ▼                                                     │
│  3. 💾 Gerar arquivo CSV de saída                           │
│       │                                                     │
│       ▼                                                     │
│  4. 📊 Gerar relatório Excel de processamento               │
│       │                                                     │
│       ▼                                                     │
│  5. ✅ Retornar 0 (sucesso) ou 1 (falha)                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}
          />

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Parâmetro</th>
                <th>Tipo</th>
                <th>Padrão</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>input_file</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>-</td>
                <td>Caminho do arquivo Excel de entrada</td>
              </tr>
              <tr>
                <td>output_file</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>-</td>
                <td>Caminho do arquivo CSV de saída</td>
              </tr>
              <tr>
                <td>logger</td>
                <td>
                  <code className="code-block">logging.Logger</code>
                </td>
                <td>-</td>
                <td>Logger configurado</td>
              </tr>
              <tr>
                <td>tags</td>
                <td>
                  <code className="code-block">list</code>
                </td>
                <td>
                  <code className="code-block">None</code>
                </td>
                <td>Lista de tags/marcadores a adicionar</td>
              </tr>
            </tbody>
          </table>

          <h4>Colunas Obrigatórias</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Coluna</th>
                <th>Aliases</th>
                <th>Obrigatório</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CNJ</td>
                <td>
                  <code className="code-block">cnj</code>,{" "}
                  <code className="code-block">processo</code>
                </td>
                <td>✅</td>
              </tr>
              <tr>
                <td>Reclamante</td>
                <td>
                  <code className="code-block">reclamante</code>,{" "}
                  <code className="code-block">nome</code>
                </td>
                <td>✅</td>
              </tr>
              <tr>
                <td>CPF</td>
                <td>
                  <code className="code-block">cpf</code>
                </td>
                <td>⚠️ (recomendado)</td>
              </tr>
            </tbody>
          </table>

          <h4>Arquivos Gerados</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Arquivo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code className="code-block">{"{output_file}"}</code>
                </td>
                <td>Dados enriquecidos (CSV)</td>
              </tr>
              <tr>
                <td>
                  <code className="code-block">
                    {"{output_file}"}_relatorio.xlsx
                  </code>
                </td>
                <td>Relatório de processamento</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="method-block">
          <h3 id="executar_fluxo_lemit_nome">executar_fluxo_lemit_nome</h3>
          <CodeBlock
            code={`def executar_fluxo_lemit_nome(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: list = None
) -> int`}
          />
          <p>
            Executa apenas o enriquecimento de dados via LEMIT usando Nome como
            identificador.
          </p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Parâmetro</th>
                <th>Tipo</th>
                <th>Padrão</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>input_file</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>-</td>
                <td>Caminho do arquivo Excel de entrada</td>
              </tr>
              <tr>
                <td>output_file</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>-</td>
                <td>Caminho do arquivo CSV de saída</td>
              </tr>
              <tr>
                <td>logger</td>
                <td>
                  <code className="code-block">logging.Logger</code>
                </td>
                <td>-</td>
                <td>Logger configurado</td>
              </tr>
              <tr>
                <td>tags</td>
                <td>
                  <code className="code-block">list</code>
                </td>
                <td>
                  <code className="code-block">None</code>
                </td>
                <td>Lista de tags/marcadores a adicionar</td>
              </tr>
            </tbody>
          </table>

          <h4>Colunas Obrigatórias</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Coluna</th>
                <th>Aliases</th>
                <th>Obrigatório</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CNJ</td>
                <td>
                  <code className="code-block">cnj</code>,{" "}
                  <code className="code-block">processo</code>
                </td>
                <td>✅</td>
              </tr>
              <tr>
                <td>Reclamante</td>
                <td>
                  <code className="code-block">reclamante</code>,{" "}
                  <code className="code-block">nome</code>
                </td>
                <td>✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="doc-section">
        <h2>Workflows Ploomes</h2>
        <p>
          Workflows que executam apenas importação para Ploomes CRM, sem
          enriquecimento LEMIT.
        </p>

        <div className="method-block">
          <h3 id="executar_fluxo_ploomes_only">executar_fluxo_ploomes_only</h3>
          <p>
            <strong>Arquivo:</strong>{" "}
            <code className="code-block">
              src/workflows/ploomes_workflows.py
            </code>
          </p>
          <CodeBlock
            code={`def executar_fluxo_ploomes_only(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: list = None,
    fetch_socios: bool = False,
) -> int`}
          />
          <p>
            Executa apenas a importação para Ploomes CRM. Ideal para
            criar/atualizar advogados e escritórios.
          </p>

          <h4>Pipeline</h4>
          <CodeBlock
            code={`┌─────────────────────────────────────────────────────────────┐
│                   PLOOMES-ONLY WORKFLOW                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📋 ETAPA 1/3: Criar modelo de advogados/escritórios        │
│       ├── Ler arquivo Excel de entrada                      │
│       ├── Processar cada linha                              │
│       └── Criar modelo de dados                             │
│       │                                                     │
│       ▼                                                     │
│  📤 ETAPA 2/3: Importar contatos para o Ploomes             │
│       ├── Para cada escritório/advogado:                    │
│       │    ├── Verificar se já existe                       │
│       │    ├── Criar ou atualizar                           │
│       │    └── (Opcional) Buscar sócios                     │
│       └── Registrar resultado                               │
│       │                                                     │
│       ▼                                                     │
│  📊 ETAPA 3/3: Gerar relatório de importação                │
│       └── Excel com detalhes de cada operação               │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}
          />

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Parâmetro</th>
                <th>Tipo</th>
                <th>Padrão</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>input_file</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>-</td>
                <td>Caminho do arquivo Excel de entrada</td>
              </tr>
              <tr>
                <td>output_file</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>-</td>
                <td>Caminho do arquivo CSV de saída</td>
              </tr>
              <tr>
                <td>logger</td>
                <td>
                  <code className="code-block">logging.Logger</code>
                </td>
                <td>-</td>
                <td>Logger configurado</td>
              </tr>
              <tr>
                <td>tags</td>
                <td>
                  <code className="code-block">list</code>
                </td>
                <td>
                  <code className="code-block">None</code>
                </td>
                <td>Lista de tags/marcadores</td>
              </tr>
              <tr>
                <td>fetch_socios</td>
                <td>
                  <code className="code-block">bool</code>
                </td>
                <td>
                  <code className="code-block">False</code>
                </td>
                <td>Buscar advogados sócios via API LEMIT</td>
              </tr>
            </tbody>
          </table>

          <h4>Colunas Obrigatórias</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Coluna</th>
                <th>Aliases</th>
                <th>Obrigatório</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Advogado</td>
                <td>
                  <code className="code-block">advogado</code>
                </td>
                <td>✅</td>
              </tr>
              <tr>
                <td>OAB</td>
                <td>
                  <code className="code-block">oab</code>
                </td>
                <td>✅</td>
              </tr>
            </tbody>
          </table>
          <p>
            <small>Escritório OU (Advogado + OAB) são obrigatórios</small>
          </p>
        </div>

        <div className="method-block">
          <h3 id="executar_fluxo_advogados">executar_fluxo_advogados</h3>
          <CodeBlock
            code={`def executar_fluxo_advogados(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: list = None,
    fetch_socios: bool = False,
) -> int`}
          />
          <p>
            Alias para{" "}
            <code className="code-block">executar_fluxo_ploomes_only</code>.
            Mantido para compatibilidade retroativa.
          </p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Workflow Escritório</h2>

        <div className="method-block">
          <h3 id="executar_fluxo_escritorio_only">
            executar_fluxo_escritorio_only
          </h3>
          <p>
            <strong>Arquivo:</strong>{" "}
            <code className="code-block">
              src/workflows/escritorio_workflow.py
            </code>
          </p>
          <CodeBlock
            code={`def executar_fluxo_escritorio_only(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: List[str] = None
) -> int`}
          />
          <p>
            Workflow para processar planilhas com Escritório e Reclamantes.
            Busca o escritório no Ploomes, obtém o advogado principal, e
            enriquece dados dos reclamantes via LEMIT.
          </p>

          <h4>Pipeline Detalhado</h4>
          <CodeBlock
            code={`┌─────────────────────────────────────────────────────────────┐
│                ESCRITORIO-ONLY WORKFLOW                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 📥 Inicializar clientes                                 │
│       ├── PloomesAPI                                        │
│       ├── ExcelProcessor (enable_normalization=True)        │
│       └── LemitClient                                       │
│       │                                                     │
│       ▼                                                     │
│  2. 📖 Ler planilha de entrada                              │
│       ├── Detectar coluna CPF                               │
│       └── Detectar coluna Escritório                        │
│       │                                                     │
│       ▼                                                     │
│  3. 🏢 Para cada Escritório único:                          │
│       ├── Buscar no Ploomes via API                         │
│       │    └── get_escritorio_with_advogado_principal()     │
│       ├── Obter advogado principal                          │
│       └── Cachear resultado em escritorios_cache{}          │
│       │                                                     │
│       ▼                                                     │
│  4. 📝 Enriquecer DataFrame                                 │
│       ├── Adicionar __temp_escritorio__                     │
│       ├── Adicionar __temp_advogado__                       │
│       └── Salvar arquivo temporário                         │
│       │                                                     │
│       ▼                                                     │
│  5. 🔍 Enriquecer via LEMIT                                 │
│       ├── Tem CPF? → processar_fluxo_com_cpf()              │
│       └── Sem CPF? → processar_fluxo_com_nome()             │
│       │                                                     │
│       ▼                                                     │
│  6. 📊 Preparar dados para relatório                        │
│       │                                                     │
│       ▼                                                     │
│  7. 📋 Gerar relatório Excel                                │
│       │                                                     │
│       ▼                                                     │
│  8. 🧹 Limpar arquivo temporário                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}
          />

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Parâmetro</th>
                <th>Tipo</th>
                <th>Padrão</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>input_file</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>-</td>
                <td>Caminho do arquivo Excel/CSV de entrada</td>
              </tr>
              <tr>
                <td>output_file</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>-</td>
                <td>Caminho do arquivo CSV de saída</td>
              </tr>
              <tr>
                <td>logger</td>
                <td>
                  <code className="code-block">logging.Logger</code>
                </td>
                <td>-</td>
                <td>Logger configurado</td>
              </tr>
              <tr>
                <td>tags</td>
                <td>
                  <code className="code-block">List[str]</code>
                </td>
                <td>
                  <code className="code-block">None</code>
                </td>
                <td>Lista de tags/marcadores a adicionar</td>
              </tr>
            </tbody>
          </table>

          <h4>Colunas Obrigatórias</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Coluna</th>
                <th>Aliases</th>
                <th>Obrigatório</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Escritório</td>
                <td>
                  <code className="code-block">escritorio</code>
                </td>
                <td>✅</td>
              </tr>
              <tr>
                <td>CNJ</td>
                <td>
                  <code className="code-block">cnj</code>,{" "}
                  <code className="code-block">processo</code>
                </td>
                <td>✅</td>
              </tr>
              <tr>
                <td>Reclamante</td>
                <td>
                  <code className="code-block">reclamante</code>,{" "}
                  <code className="code-block">nome</code>
                </td>
                <td>✅</td>
              </tr>
              <tr>
                <td>CPF</td>
                <td>
                  <code className="code-block">cpf</code>
                </td>
                <td>❌ (usa Nome se ausente)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="doc-section">
        <h2>Workflows Combinados (Pipeline Completo)</h2>

        <div className="method-block">
          <h3 id="executar_pipeline_completo">executar_pipeline_completo</h3>
          <p>
            <strong>Arquivo:</strong>{" "}
            <code className="code-block">
              src/workflows/combined_workflows.py
            </code>
          </p>
          <CodeBlock
            code={`def executar_pipeline_completo(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    fluxo_lemit: str = "cpf",  # ou "nome"
    tags: list = None,
    fetch_socios: bool = False,
) -> int`}
          />
          <p>
            Executa o pipeline completo de processamento LEMIT → Ploomes usando
            CPF ou Nome como identificador.
          </p>

          <h4>Pipeline Completo (6 Etapas)</h4>
          <CodeBlock
            code={`┌─────────────────────────────────────────────────────────────┐
│                   PIPELINE COMPLETO                         │
│              (Workflow: cpf ou nome)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📋 ETAPA 1/6: Processar dados do LEMIT                     │
│       ├── fluxo_lemit="cpf" → processar_fluxo_com_cpf()     │
│       └── fluxo_lemit="nome" → processar_fluxo_com_nome()   │
│       │                                                     │
│       ▼                                                     │
│  📋 ETAPA 2/6: Criar modelo de advogados/escritórios        │
│       └── ploomes_client.create_model_from_data()           │
│       │                                                     │
│       ▼                                                     │
│  📤 ETAPA 3/6: Importar contatos para o Ploomes             │
│       └── ploomes_client.import_to_ploomes()                │
│       │                                                     │
│       ▼                                                     │
│  🔄 ETAPA 4/6: Enriquecer com informações do Ploomes        │
│       └── excel_processor.enriquecer_com_resultado_ploomes()│
│       │                                                     │
│       ▼                                                     │
│  💾 ETAPA 5/6: Gerar arquivo CSV final                      │
│       └── excel_processor._escrever_arquivo_saida()         │
│       │                                                     │
│       ▼                                                     │
│  📊 ETAPA 6/6: Gerar relatório de importação                │
│       └── excel_processor.export_results_to_excel()         │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}
          />

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Parâmetro</th>
                <th>Tipo</th>
                <th>Padrão</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>input_file</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>-</td>
                <td>Caminho do arquivo Excel de entrada</td>
              </tr>
              <tr>
                <td>output_file</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>-</td>
                <td>Caminho do arquivo CSV de saída</td>
              </tr>
              <tr>
                <td>logger</td>
                <td>
                  <code className="code-block">logging.Logger</code>
                </td>
                <td>-</td>
                <td>Logger configurado</td>
              </tr>
              <tr>
                <td>fluxo_lemit</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>
                  <code className="code-block">"cpf"</code>
                </td>
                <td>Tipo de busca LEMIT ("cpf" ou "nome")</td>
              </tr>
              <tr>
                <td>tags</td>
                <td>
                  <code className="code-block">list</code>
                </td>
                <td>
                  <code className="code-block">None</code>
                </td>
                <td>Lista de tags/marcadores</td>
              </tr>
              <tr>
                <td>fetch_socios</td>
                <td>
                  <code className="code-block">bool</code>
                </td>
                <td>
                  <code className="code-block">False</code>
                </td>
                <td>Buscar advogados sócios via API LEMIT</td>
              </tr>
            </tbody>
          </table>

          <h4>Colunas Obrigatórias</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Coluna</th>
                <th>Aliases</th>
                <th>cpf</th>
                <th>nome</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CNJ</td>
                <td>
                  <code className="code-block">cnj</code>,{" "}
                  <code className="code-block">processo</code>
                </td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>Reclamante</td>
                <td>
                  <code className="code-block">reclamante</code>,{" "}
                  <code className="code-block">nome</code>
                </td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>CPF</td>
                <td>
                  <code className="code-block">cpf</code>
                </td>
                <td>⚠️</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Escritório</td>
                <td>
                  <code className="code-block">escritorio</code>
                </td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>Advogado</td>
                <td>
                  <code className="code-block">advogado</code>
                </td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>OAB</td>
                <td>
                  <code className="code-block">oab</code>
                </td>
                <td>✅</td>
                <td>✅</td>
              </tr>
            </tbody>
          </table>
          <p>
            <small>scritório OU (Advogado + OAB) são obrigatórios</small>
          </p>

          <h4>Arquivos Gerados</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Arquivo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code className="code-block">
                    saida_preliminar_lemit_{"{cpf|nome}"}.csv
                  </code>
                </td>
                <td>Dados LEMIT intermediários</td>
              </tr>
              <tr>
                <td>
                  <code className="code-block">{"{output_file}"}</code>
                </td>
                <td>Planilha final com dados enriquecidos</td>
              </tr>
              <tr>
                <td>
                  <code className="code-block">
                    output/reports/{"{base_name}"}_relatorio.xlsx
                  </code>
                </td>
                <td>Relatório de importação</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="doc-section">
        <h2>Detecção Automática de Workflow</h2>
        <p>
          O sistema detecta automaticamente o workflow apropriado baseado nas
          colunas preenchidas no arquivo de entrada.
        </p>

        <h3>Matriz de Detecção</h3>
        <table className="params-table">
          <thead>
            <tr>
              <th>Colunas com Valores</th>
              <th>Workflow Detectado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>OAB/Advogado + CPF</td>
              <td>
                <code className="code-block">cpf</code>
              </td>
            </tr>
            <tr>
              <td>OAB/Advogado + Nome (sem CPF)</td>
              <td>
                <code className="code-block">nome</code>
              </td>
            </tr>
            <tr>
              <td>OAB/Advogado (sem dados reclamante)</td>
              <td>
                <code className="code-block">ploomes-only</code>
              </td>
            </tr>
            <tr>
              <td>Escritório + (CPF ou Nome) sem Advogado</td>
              <td>
                <code className="code-block">escritorio-only</code>
              </td>
            </tr>
            <tr>
              <td>CPF (sem Advogado/Escritório)</td>
              <td>
                <code className="code-block">lemit-cpf</code>
              </td>
            </tr>
            <tr>
              <td>Nome (sem Advogado/Escritório/CPF)</td>
              <td>
                <code className="code-block">lemit-nome</code>
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Uso da Detecção Automática</h3>
        <CodeBlock
          code={`# O sistema detecta automaticamente o melhor workflow
python main.py --input-file dados.xlsx

# Equivalente a especificar manualmente:
python main.py --input-file dados.xlsx --fluxo <workflow_detectado>`}
        />

        <h3>Código de Detecção</h3>
        <CodeBlock
          code={`# Em main.py
router = WorkflowRouter(logger)

if not fluxo:
    fluxo = router.detect_workflow(args.input_file)
    if not fluxo:
        logger.error("Não foi possível determinar o workflow automaticamente")
        return 1`}
        />
      </section>

      <section className="doc-section">
        <h2>Validação de Colunas</h2>
        <p>
          Antes de executar qualquer workflow, o sistema valida as colunas
          obrigatórias.
        </p>

        <h3>Tipos de Validação</h3>
        <table className="params-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Símbolo</th>
              <th>Descrição</th>
              <th>Comportamento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Obrigatório</td>
              <td>✅</td>
              <td>Coluna deve existir e ter valores</td>
              <td>Bloqueia execução</td>
            </tr>
            <tr>
              <td>Recomendado</td>
              <td>⚠️</td>
              <td>Coluna pode estar vazia</td>
              <td>Gera warning</td>
            </tr>
            <tr>
              <td>Opcional</td>
              <td>❌</td>
              <td>Coluna não é necessária</td>
              <td>Ignorado</td>
            </tr>
          </tbody>
        </table>

        <h3>Mensagens de Erro</h3>
        <CodeBlock
          code={`❌ Coluna obrigatória não encontrada: CNJ
❌ Coluna 'Reclamante' tem 5 linha(s) vazia(s): linhas 2, 5, 8, 12, 15`}
        />

        <h3>Mensagens de Warning</h3>
        <CodeBlock
          code={`⚠️ Coluna 'CPF' tem 3 linha(s) vazia(s): linhas 4, 7, 9. Busca será por Nome para essas linhas.
⚠️ Escritório e Advogado/OAB detectados. Prioridade: Escritório`}
        />

        <h3>Código de Validação</h3>
        <CodeBlock
          code={`# Em main.py
validation_result = router.validate_required_columns(
    args.input_file,
    workflow=fluxo
)

if not validation_result["valid"]:
    logger.error("❌ VALIDAÇÃO FALHOU")
    for error in validation_result["errors"]:
        logger.error(f"   {error}")
    return 1`}
        />
      </section>

      <section className="doc-section">
        <h2>Observabilidade</h2>
        <p>Todos os workflows incluem recursos completos de observabilidade.</p>

        <h3>Recursos Disponíveis</h3>
        <table className="params-table">
          <thead>
            <tr>
              <th>Recurso</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>📝 Logging estruturado</td>
              <td>
                Com <code className="code-block">correlation_id</code> para
                rastreamento
              </td>
            </tr>
            <tr>
              <td>⏱️ Métricas de tempo</td>
              <td>Por operação e total</td>
            </tr>
            <tr>
              <td>📊 Estatísticas</td>
              <td>Total, sucesso, falha por workflow</td>
            </tr>
            <tr>
              <td>📈 Relatórios Excel</td>
              <td>Detalhamento completo de operações</td>
            </tr>
          </tbody>
        </table>

        <h3>Métricas Coletadas</h3>
        <table className="params-table">
          <thead>
            <tr>
              <th>Métrica</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>total_detections</td>
              <td>Total de workflows detectados</td>
            </tr>
            <tr>
              <td>workflow_counts</td>
              <td>Contagem por tipo de workflow</td>
            </tr>
            <tr>
              <td>detect_workflow</td>
              <td>Tempo de detecção</td>
            </tr>
            <tr>
              <td>validate_columns</td>
              <td>Tempo de validação</td>
            </tr>
            <tr>
              <td>total_records</td>
              <td>Total de registros processados</td>
            </tr>
            <tr>
              <td>processed_records</td>
              <td>Registros processados com sucesso</td>
            </tr>
            <tr>
              <td>failed_records</td>
              <td>Registros com falha</td>
            </tr>
            <tr>
              <td>total_requests</td>
              <td>Requisições à API CNA</td>
            </tr>
          </tbody>
        </table>

        <h3>Exemplo de Métricas no Log</h3>
        <CodeBlock
          code={`📊 RESUMO DE MÉTRICAS [ID: abc123]
⏱️  Duração total: 125.30s
📈 Total de operações: 150
✅ Operações bem-sucedidas: 142
❌ Operações com falha: 8
📊 Taxa de sucesso: 94.7%
⚡ Latência média: 835.20ms`}
        />
      </section>

      <section className="doc-section">
        <h2>Exemplos de Uso</h2>

        <h3>Fluxo Básico com Detecção Automática</h3>
        <CodeBlock code={`python main.py --input-file entrada.xlsx`} />

        <h3>Pipeline Completo com Todas as Opções</h3>
        <CodeBlock
          code={`python main.py \\
  --input-file dados.xlsx \\
  --output-file output/resultado.csv \\
  --fluxo cpf \\
  --tags "Lote 1,Prospect,2024" \\
  --fetch-socios \\
  --log-level DEBUG \\
  --config config/settings.ini`}
        />

        <h3>Apenas Enriquecimento LEMIT</h3>
        <CodeBlock
          code={`# Por CPF
python main.py --input-file reclamantes.xlsx --fluxo lemit-cpf

# Por Nome
python main.py --input-file reclamantes.xlsx --fluxo lemit-nome`}
        />

        <h3>Apenas Importação Ploomes</h3>
        <CodeBlock
          code={`python main.py --input-file advogados.xlsx --fluxo ploomes-only --fetch-socios`}
        />

        <h3>Busca de Escritório com Enriquecimento</h3>
        <CodeBlock
          code={`python main.py --input-file escritorios.xlsx --fluxo escritorio-only --tags "Lote 1"`}
        />

        <h3>Pipeline Completo por Nome</h3>
        <CodeBlock
          code={`python main.py --input-file dados_sem_cpf.xlsx --fluxo nome`}
        />
      </section>

      <section className="doc-section">
        <h2>Referências</h2>
        <table className="params-table">
          <thead>
            <tr>
              <th>Módulo</th>
              <th>Arquivo</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Main</td>
              <td>
                <code className="code-block">src/main.py</code>
              </td>
              <td>Script principal</td>
            </tr>
            <tr>
              <td>Workflow Router</td>
              <td>
                <code className="code-block">
                  src/workflows/workflow_router.py
                </code>
              </td>
              <td>Detecção e validação</td>
            </tr>
            <tr>
              <td>LEMIT Workflows</td>
              <td>
                <code className="code-block">
                  src/workflows/lemit_workflows.py
                </code>
              </td>
              <td>Fluxos apenas LEMIT</td>
            </tr>
            <tr>
              <td>Ploomes Workflows</td>
              <td>
                <code className="code-block">
                  src/workflows/ploomes_workflows.py
                </code>
              </td>
              <td>Fluxos apenas Ploomes</td>
            </tr>
            <tr>
              <td>Combined Workflows</td>
              <td>
                <code className="code-block">
                  src/workflows/combined_workflows.py
                </code>
              </td>
              <td>Pipelines completos</td>
            </tr>
            <tr>
              <td>Escritorio Workflow</td>
              <td>
                <code className="code-block">
                  src/workflows/escritorio_workflow.py
                </code>
              </td>
              <td>Fluxo de escritório</td>
            </tr>
            <tr>
              <td>ExcelProcessor</td>
              <td>
                <code className="code-block">
                  ploomes_integration/clients/excel_processor.py
                </code>
              </td>
              <td>Processador de Excel</td>
            </tr>
            <tr>
              <td>PloomesClient</td>
              <td>
                <code className="code-block">
                  ploomes_integration/client.py
                </code>
              </td>
              <td>Cliente Ploomes</td>
            </tr>
            <tr>
              <td>LemitClient</td>
              <td>
                <code className="code-block">
                  src/lemit_automation/lemit_client.py
                </code>
              </td>
              <td>Cliente LEMIT</td>
            </tr>
            <tr>
              <td>PloomesAPI</td>
              <td>
                <code className="code-block">ploomes_integration/api.py</code>
              </td>
              <td>API Ploomes</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default WorkflowsPage;

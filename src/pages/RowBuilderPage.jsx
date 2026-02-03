import CodeBlock from "../components/CodeBlock";

function RowBuilderPage() {
  return (
    <div className="doc-page">
      <h1>Classe: RowBuilder</h1>
      <p className="doc-subtitle">
        Construção de linhas de saída para planilhas no formato padronizado do
        Ploomes CRM.
      </p>

      <section className="doc-section">
        <h2>Visão Geral</h2>
        <p>
          A classe <code className="code-block">RowBuilder</code> é responsável
          por construir linhas de saída para planilhas no formato padronizado do
          Ploomes CRM. Ela combina dados de múltiplas fontes (LEMIT, Ploomes,
          entrada do usuário) e gera linhas formatadas prontas para exportação.
        </p>

        <h3>Responsabilidades</h3>
        <table className="params-table">
          <thead>
            <tr>
              <th>Responsabilidade</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Formatação</td>
              <td>Padroniza formato de saída para Ploomes</td>
            </tr>
            <tr>
              <td>Headers Dinâmicos</td>
              <td>Gera headers baseado no número de marcadores</td>
            </tr>
            <tr>
              <td>Normalização</td>
              <td>Normaliza nomes de escritórios e CPFs</td>
            </tr>
            <tr>
              <td>Agregação de Tags</td>
              <td>Combina marcadores de múltiplas fontes</td>
            </tr>
            <tr>
              <td>Validação</td>
              <td>Formata CPFs de forma segura</td>
            </tr>
          </tbody>
        </table>

        <h3>Dependências</h3>
        <CodeBlock
          code={`import logging
from typing import Any, Dict, List, Optional

from src.utils.validator import CPFValidator
from .escritorio_normalizer import EscritorioNormalizer`}
        />
      </section>

      <section className="doc-section">
        <h2>Constantes de Classe</h2>

        <div className="method-block">
          <h3>OUTPUT_HEADERS_BASE</h3>
          <CodeBlock
            code={`OUTPUT_HEADERS_BASE = [
    "(Negócio) Estágio",
    "(Negócio) Título",
    "(Negócio) Responsável",
    "(Negócio) Origem",
    "(Negócio) Produto",
    "(Negócio) CNJ",
    "(Negócio) Resumo",
    "(Negócio) Escritório",
    "(Negócio) Usuários Colaboradores",
    "(Cliente) Tipo",
    "(Cliente) Responsável",
]`}
          />
          <p>
            <strong>Descrição:</strong> Headers base relacionados aos dados de{" "}
            <strong>Negócio</strong> e parte inicial dos dados de{" "}
            <strong>Cliente</strong>.
          </p>
          <p>
            <strong>Total de Campos:</strong> 11 campos
          </p>

          <h4>Categorias</h4>
          <ul>
            <li>
              <strong>Negócio (9 campos):</strong> Informações do deal/processo
            </li>
            <li>
              <strong>Cliente (2 campos):</strong> Tipo e responsável
            </li>
          </ul>
        </div>

        <div className="method-block">
          <h3>OUTPUT_HEADERS_FINAL</h3>
          <CodeBlock
            code={`OUTPUT_HEADERS_FINAL = [
    "(Cliente) Nome",
    "(Cliente) CPF",
    "(Cliente) Advogado Principal",
    "(Cliente) Telefones1",
    "(Cliente) Telefones2",
    "(Cliente) Telefones3",
    "(Cliente) Telefones4",
    "(Cliente) E-mail",
    "(Cliente) E-mail2",
    "(Cliente) E-mail3",
]`}
          />
          <p>
            <strong>Descrição:</strong> Headers finais relacionados aos dados do{" "}
            <strong>Cliente</strong> (contatos).
          </p>
          <p>
            <strong>Total de Campos:</strong> 10 campos
          </p>

          <h4>Categorias</h4>
          <ul>
            <li>
              <strong>Identificação (3 campos):</strong> Nome, CPF, Advogado
            </li>
            <li>
              <strong>Telefones (4 campos):</strong> Até 4 telefones
            </li>
            <li>
              <strong>E-mails (3 campos):</strong> Até 3 e-mails
            </li>
          </ul>
        </div>

        <div className="method-block">
          <h3>Estrutura Completa de Headers</h3>
          <CodeBlock
            code={`┌──────────────────────────────────────────────────────────────┐
│               ESTRUTURA DE HEADERS DE SAÍDA                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  OUTPUT_HEADERS_BASE (11 campos)                             │
│       │                                                      │
│       ├─► Negócio: Estágio, Título, Responsável, Origem,    │
│       │           Produto, CNJ, Resumo, Escritório,         │
│       │           Usuários Colaboradores                    │
│       │                                                      │
│       └─► Cliente: Tipo, Responsável                         │
│       │                                                      │
│       ▼                                                      │
│  MARCADORES (N campos dinâmicos)                             │
│       ├─► Marcadores (campo 1)                               │
│       ├─► Marcadores2 (campo 2)                              │
│       ├─► Marcadores3 (campo 3)                              │
│       └─► ... (até N marcadores)                             │
│       │                                                      │
│       ▼                                                      │
│  OUTPUT_HEADERS_FINAL (10 campos)                            │
│       └─► Cliente: Nome, CPF, Advogado Principal,            │
│                   Telefones1-4, E-mail1-3                    │
│                                                              │
│  TOTAL: 21 + N campos                                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos Públicos</h2>

        <div className="method-block">
          <h3 id="__init__">__init__</h3>
          <CodeBlock
            code={`def __init__(
    self,
    logger: logging.Logger = None,
    normalizer: EscritorioNormalizer = None,
):`}
          />
          <p>
            <strong>Descrição:</strong> Inicializa o construtor de linhas.
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
                <td>logger</td>
                <td>
                  <code className="code-block">logging.Logger</code>
                </td>
                <td>None</td>
                <td>Logger para mensagens (usa __name__ se None)</td>
              </tr>
              <tr>
                <td>normalizer</td>
                <td>
                  <code className="code-block">EscritorioNormalizer</code>
                </td>
                <td>None</td>
                <td>Normalizador de nomes de escritórios</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from src.ploomes_integration.clients.processors import RowBuilder, EscritorioNormalizer

# Sem normalizador
builder = RowBuilder(logger=my_logger)

# Com normalizador
normalizer = EscritorioNormalizer()
builder = RowBuilder(logger=my_logger, normalizer=normalizer)`}
          />
        </div>

        <div className="method-block">
          <h3 id="get_output_headers">get_output_headers</h3>
          <CodeBlock
            code={`def get_output_headers(self, num_marcadores: int = 1) -> List[str]:`}
          />
          <p>
            <strong>Descrição:</strong> Gera lista de headers dinâmica baseado
            no número de marcadores.
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
                <td>num_marcadores</td>
                <td>
                  <code className="code-block">int</code>
                </td>
                <td>1</td>
                <td>Número total de campos de marcadores necessários</td>
              </tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p>
            <code className="code-block">List[str]</code> - Lista de headers com
            campos de marcadores expandidos.
          </p>

          <h4>Lógica</h4>
          <ol>
            <li>Se num_marcadores &gt;= 1: adiciona campo "Marcadores"</li>
            <li>
              Para cada marcador adicional (2 até N): adiciona
              "Marcadores&#123;i&#125;"
            </li>
            <li>
              Retorna: OUTPUT_HEADERS_BASE + marcadores_headers +
              OUTPUT_HEADERS_FINAL
            </li>
          </ol>

          <h4>Estrutura de Saída</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>num_marcadores</th>
                <th>Campos de Marcadores</th>
                <th>Total de Campos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>Nenhum</td>
                <td>21</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Marcadores</td>
                <td>22</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Marcadores, Marcadores2</td>
                <td>23</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Marcadores, Marcadores2, Marcadores3</td>
                <td>24</td>
              </tr>
              <tr>
                <td>N</td>
                <td>Marcadores, Marcadores2, ..., Marcadores&#123;N&#125;</td>
                <td>21 + N</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplos</h4>
          <CodeBlock
            code={`builder = RowBuilder()

# 1 marcador (padrão)
headers = builder.get_output_headers(1)
# [...OUTPUT_HEADERS_BASE, "Marcadores", ...OUTPUT_HEADERS_FINAL]
# Total: 22 campos

# 3 marcadores
headers = builder.get_output_headers(3)
# [...OUTPUT_HEADERS_BASE, "Marcadores", "Marcadores2", "Marcadores3", ...OUTPUT_HEADERS_FINAL]
# Total: 24 campos`}
          />
        </div>

        <div className="method-block">
          <h3 id="build_linha">build_linha</h3>
          <CodeBlock
            code={`def build_linha(
    self,
    ctx: Dict[str, Any],
    output_preset: Dict[str, Any],
    cpf: str,
    telefones: List[str],
    emails: List[str],
    tags: List[str] = None,
    headers: List[str] = None,
    row_marcadores: List[str] = None,
) -> Dict[str, Any]:`}
          />
          <p>
            <strong>Descrição:</strong> Cria a linha padrão seguindo
            OUTPUT_HEADERS e preenchendo faltas com strings vazias.
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
                <td>ctx</td>
                <td>
                  <code className="code-block">Dict[str, Any]</code>
                </td>
                <td>-</td>
                <td>Contexto da linha com dados extraídos</td>
              </tr>
              <tr>
                <td>output_preset</td>
                <td>
                  <code className="code-block">Dict[str, Any]</code>
                </td>
                <td>-</td>
                <td>Preset de saída com valores padrão</td>
              </tr>
              <tr>
                <td>cpf</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>-</td>
                <td>CPF formatado</td>
              </tr>
              <tr>
                <td>telefones</td>
                <td>
                  <code className="code-block">List[str]</code>
                </td>
                <td>-</td>
                <td>Lista de telefones (até 4)</td>
              </tr>
              <tr>
                <td>emails</td>
                <td>
                  <code className="code-block">List[str]</code>
                </td>
                <td>-</td>
                <td>Lista de emails (até 3)</td>
              </tr>
              <tr>
                <td>tags</td>
                <td>
                  <code className="code-block">List[str]</code>
                </td>
                <td>None</td>
                <td>Tags da CLI a serem adicionadas</td>
              </tr>
              <tr>
                <td>headers</td>
                <td>
                  <code className="code-block">List[str]</code>
                </td>
                <td>None</td>
                <td>Headers de saída (calcula automaticamente se None)</td>
              </tr>
              <tr>
                <td>row_marcadores</td>
                <td>
                  <code className="code-block">List[str]</code>
                </td>
                <td>None</td>
                <td>Marcadores específicos da linha (da planilha)</td>
              </tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p>
            <code className="code-block">Dict[str, Any]</code> - Dicionário com
            a linha formatada pronta para exportação.
          </p>

          <h4>Estrutura do Parâmetro ctx</h4>
          <CodeBlock
            code={`ctx = {
    "escritorio": str,      # Nome do escritório
    "estágio": str,         # Estágio do negócio
    "negociador": str,      # Responsável/negociador
    "origem": str,          # Origem do lead
    "produto": str,         # Produto/serviço
    "cnj": str,             # Número CNJ
    "nome": str,            # Nome do cliente
    "advogado": str,        # Advogado principal
}`}
          />

          <h4>Fluxo de Execução</h4>
          <CodeBlock
            code={`┌──────────────────────────────────────────────────────────────┐
│                    BUILD_LINHA WORKFLOW                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Agregação de Tags                                        │
│       ├── Adicionar row_marcadores (da planilha)             │
│       ├── Adicionar preset marcadores                        │
│       └── Adicionar tags da CLI                              │
│       │                                                      │
│       ▼                                                      │
│  2. Calcular Headers                                         │
│       └── Se headers=None: get_output_headers(len(all_tags)) │
│       │                                                      │
│       ▼                                                      │
│  3. Criar Linha Base                                         │
│       └── {header: "" for header in headers}                 │
│       │                                                      │
│       ▼                                                      │
│  4. Normalizar Escritório                                    │
│       └── _normalize_escritorio(ctx["escritorio"])           │
│       │                                                      │
│       ▼                                                      │
│  5. Preencher Campos de Negócio                              │
│       ├── Estágio (from preset ou ctx)                       │
│       ├── Título (from preset ou escritorio_normalizado)     │
│       ├── Responsável, Origem, Produto, CNJ                  │
│       └── Escritório (normalizado)                           │
│       │                                                      │
│       ▼                                                      │
│  6. Preencher Campos de Cliente                              │
│       ├── Tipo = "Pessoa"                                    │
│       └── Responsável                                        │
│       │                                                      │
│       ▼                                                      │
│  7. Preencher Marcadores                                     │
│       ├── Marcador 1 → "Marcadores"                          │
│       ├── Marcador 2 → "Marcadores2"                         │
│       └── Marcador N → "Marcadores{N}"                       │
│       │                                                      │
│       ▼                                                      │
│  8. Preencher Dados Finais de Cliente                        │
│       ├── Nome (uppercase)                                   │
│       ├── CPF (formatado)                                    │
│       ├── Advogado Principal (uppercase)                     │
│       ├── Telefones 1-4 (_ls helper)                         │
│       └── E-mails 1-3 (_ls helper)                           │
│       │                                                      │
│       ▼                                                      │
│  9. Retornar Linha Completa                                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘`}
          />

          <h4>Exemplo Completo</h4>
          <CodeBlock
            code={`builder = RowBuilder(logger=logger, normalizer=normalizer)

ctx = {
    "escritorio": "Silva & Associados Advogados",
    "estágio": "Prospecção",
    "negociador": "João Silva",
    "origem": "Website",
    "produto": "Consultoria Jurídica",
    "cnj": "0001234-56.2024.5.01.0001",
    "nome": "Maria Santos",
    "advogado": "Dr. João Silva",
}

output_preset = {
    "estagio": "Lead",
    "titulo": None,
    "marcadores": "Prospect",
}

linha = builder.build_linha(
    ctx=ctx,
    output_preset=output_preset,
    cpf="12345678901",
    telefones=["11987654321", "1133334444"],
    emails=["maria@example.com", "maria.santos@company.com"],
    tags=["Lote 1", "Prioritário"],
    row_marcadores=["Janeiro 2024"],
)

# Resultado com 24 campos (11 base + 4 marcadores + 10 final)`}
          />

          <h4>Prioridade de Marcadores</h4>
          <ol>
            <li>row_marcadores (marcadores da planilha de entrada)</li>
            <li>output_preset["marcadores"] (marcador do preset)</li>
            <li>tags (tags da CLI)</li>
          </ol>
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos Privados</h2>

        <div className="method-block">
          <h3 id="_normalize_escritorio">_normalize_escritorio</h3>
          <CodeBlock
            code={`def _normalize_escritorio(self, name: str) -> str:`}
          />
          <p>
            <strong>Descrição:</strong> Normaliza nome do escritório se
            normalizer estiver configurado.
          </p>

          <h4>Comportamento</h4>
          <ul>
            <li>
              <strong>Se self._normalizer está configurado:</strong> Chama
              normalizer.normalize_for_output(name)
            </li>
            <li>
              <strong>Se self._normalizer é None:</strong> Retorna o nome
              original sem modificações
            </li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`# Com normalizador
builder = RowBuilder(normalizer=EscritorioNormalizer())
normalized = builder._normalize_escritorio("Silva & Associados Advogados")
# "SILVA & ASSOCIADOS"

# Sem normalizador
builder = RowBuilder()
normalized = builder._normalize_escritorio("Silva & Associados Advogados")
# "Silva & Associados Advogados"`}
          />
        </div>

        <div className="method-block">
          <h3 id="_format_cpf_safe">_format_cpf_safe</h3>
          <CodeBlock code={`def _format_cpf_safe(self, cpf: str) -> str:`} />
          <p>
            <strong>Descrição:</strong> Formata CPF de forma segura, tratando
            erros silenciosamente.
          </p>

          <h4>Comportamento</h4>
          <CodeBlock
            code={`┌──────────────────────────────────────────────────────────────┐
│                    _FORMAT_CPF_SAFE LOGIC                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  cpf está vazio/None?                                        │
│       │                                                      │
│       ├─► SIM: retorna ""                                    │
│       │                                                      │
│       └─► NÃO: tenta formatar                                │
│             │                                                │
│             ├─► Sucesso: retorna CPF formatado               │
│             │           (XXX.XXX.XXX-XX)                     │
│             │                                                │
│             └─► Exceção: retorna CPF original                │
│                         (sem formatação)                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘`}
          />

          <h4>Exemplo</h4>
          <CodeBlock
            code={`builder = RowBuilder()

# CPF válido
formatted = builder._format_cpf_safe("12345678901")
# "123.456.789-01"

# CPF inválido (não quebra)
formatted = builder._format_cpf_safe("invalid")
# "invalid"

# CPF vazio
formatted = builder._format_cpf_safe("")
# ""`}
          />
        </div>

        <div className="method-block">
          <h3 id="_ls">_ls</h3>
          <CodeBlock
            code={`def _ls(self, itens: List[Any], idx: int) -> str:`}
          />
          <p>
            <strong>Descrição:</strong> Retorna item da lista por índice ou
            string vazia (list safe accessor).
          </p>

          <h4>Comportamento</h4>
          <ul>
            <li>
              <strong>Se lista é None ou vazia:</strong> Retorna ""
            </li>
            <li>
              <strong>Se índice está fora dos limites:</strong> Retorna ""
            </li>
            <li>
              <strong>Se índice é válido:</strong> Retorna itens[idx]
            </li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`builder = RowBuilder()

telefones = ["11987654321", "1133334444"]

tel1 = builder._ls(telefones, 0)  # "11987654321"
tel2 = builder._ls(telefones, 1)  # "1133334444"
tel3 = builder._ls(telefones, 2)  # ""
tel4 = builder._ls(telefones, 3)  # ""`}
          />

          <h4>Uso no build_linha</h4>
          <CodeBlock
            code={`base["(Cliente) Telefones1"] = self._ls(telefones, 0)
base["(Cliente) Telefones2"] = self._ls(telefones, 1)
base["(Cliente) Telefones3"] = self._ls(telefones, 2)
base["(Cliente) Telefones4"] = self._ls(telefones, 3)
base["(Cliente) E-mail"] = self._ls(emails, 0)
base["(Cliente) E-mail2"] = self._ls(emails, 1)
base["(Cliente) E-mail3"] = self._ls(emails, 2)`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Exemplos de Uso</h2>

        <h3>Uso Básico</h3>
        <CodeBlock
          code={`from src.ploomes_integration.clients.processors import RowBuilder

logger = logging.getLogger(__name__)
builder = RowBuilder(logger=logger)

# Dados mínimos
ctx = {
    "escritorio": "Silva Advogados",
    "nome": "João Silva",
    "cnj": "0001234-56.2024.5.01.0001",
    "negociador": "Ana Costa",
    "advogado": "Dr. Silva",
}

output_preset = {
    "estagio": "Lead",
}

linha = builder.build_linha(
    ctx=ctx,
    output_preset=output_preset,
    cpf="12345678901",
    telefones=["11987654321"],
    emails=["joao@example.com"],
)`}
        />

        <h3>Uso com Normalização</h3>
        <CodeBlock
          code={`from src.ploomes_integration.clients.processors import (
    RowBuilder,
    EscritorioNormalizer,
)

# Configurar normalização
normalizer = EscritorioNormalizer()
builder = RowBuilder(logger=logger, normalizer=normalizer)

ctx = {
    "escritorio": "Silva & Associados Sociedade de Advogados Ltda.",
    # ... outros campos
}

linha = builder.build_linha(ctx, output_preset, cpf, telefones, emails)
# "(Negócio) Escritório" será "SILVA & ASSOCIADOS"`}
        />

        <h3>Uso com Múltiplos Marcadores</h3>
        <CodeBlock
          code={`# Marcadores de diferentes fontes
row_marcadores = ["Janeiro 2024", "Escritório X"]  # da planilha
output_preset = {"marcadores": "Prospect"}          # do preset
tags = ["Lote 1", "Alta Prioridade"]               # da CLI

linha = builder.build_linha(
    ctx=ctx,
    output_preset=output_preset,
    cpf=cpf,
    telefones=telefones,
    emails=emails,
    tags=tags,
    row_marcadores=row_marcadores,
)

# Resultado:
# "Marcadores": "Janeiro 2024"      (row_marcadores[0])
# "Marcadores2": "Escritório X"     (row_marcadores[1])
# "Marcadores3": "Prospect"         (preset)
# "Marcadores4": "Lote 1"           (tags[0])
# "Marcadores5": "Alta Prioridade"  (tags[1])`}
        />
      </section>

      <section className="doc-section">
        <h2>Integração com Outros Componentes</h2>

        <h3>Com ExcelProcessor</h3>
        <CodeBlock
          code={`# No ExcelProcessor
from .processors import RowBuilder

class ExcelProcessor:
    def __init__(self, ...):
        self._row_builder = RowBuilder(
            logger=self.logger,
            normalizer=self._normalizer,
        )

    def _construir_linha_saida(self, ctx, ...):
        return self._row_builder.build_linha(
            ctx=ctx,
            output_preset=self.output_preset,
            cpf=cpf,
            telefones=telefones,
            emails=emails,
            tags=self.tags_cli,
            row_marcadores=row_marcadores,
        )`}
        />
      </section>
    </div>
  );
}

export default RowBuilderPage;

import CodeBlock from "../components/CodeBlock";

function ProcessingPage() {
  return (
    <div className="doc-page">
      <h1>Classe: Processing</h1>
      <p className="doc-subtitle">
        Núcleo de coordenação do sistema de importação Ploomes-Lemit,
        orquestrando múltiplas fontes de dados externas.
      </p>

      <section className="doc-section">
        <h2>Descrição</h2>
        <p>
          A classe <code className="code-block">Processing</code> é o núcleo de
          coordenação do sistema de importação Ploomes-Lemit. Ela orquestra
          múltiplas fontes de dados externas (CNA, CNPJ, LEMIT) para construir
          grupos de contatos estruturados contendo informações de escritórios de
          advocacia e seus advogados.
        </p>
      </section>

      <section className="doc-section">
        <h2>Características Principais</h2>

        <h3>Funcionalidades Core</h3>
        <ul>
          <li>
            <strong>Processamento em Lote</strong>: Processa arquivos Excel com
            listas de advogados
          </li>
          <li>
            <strong>Enriquecimento Automático</strong>: Busca dados de
            escritórios, CNPJs e sócios automaticamente
          </li>
          <li>
            <strong>Cache Inteligente</strong>: Sistema multicamadas de cache
            para otimizar consultas
          </li>
          <li>
            <strong>Detecção de Duplicatas</strong>: Remove advogados duplicados
            automaticamente
          </li>
          <li>
            <strong>Busca de Sócios</strong>: Opcional - busca advogados sócios
            via LEMIT quando habilitado
          </li>
          <li>
            <strong>Fallback Strategies</strong>: Múltiplas estratégias de busca
            quando dados não são encontrados
          </li>
        </ul>

        <h3>Observabilidade</h3>
        <ul>
          <li>Métricas de processamento em tempo real</li>
          <li>Progress tracking com estimativa de tempo (ETA)</li>
          <li>Rastreamento de cache hits/misses</li>
          <li>Logging estruturado com correlation_id</li>
          <li>Estatísticas detalhadas por batch</li>
        </ul>
      </section>

      <section className="doc-section">
        <h2>Arquitetura</h2>

        <h3>Clientes Integrados</h3>
        <CodeBlock
          code={`┌─────────────────────────────────────────────┐
│           Processing Class                  │
├─────────────────────────────────────────────┤
│ • CNAClient      → Consultas OAB/CNA        │
│ • CNPJScraper    → Validação de CNPJs       │
│ • LemitClient    → Enriquecimento de dados  │
│ • ExcelProcessor → Leitura/Escrita Excel    │
└─────────────────────────────────────────────┘`}
        />

        <h3>Fluxo de Processamento</h3>
        <CodeBlock
          code={`1. Leitura do Excel
   ├─ Extração de colunas (Nome, OAB)
   └─ Remoção de duplicatas

2. Processamento por Advogado
   ├─ Consulta CNA (dados do advogado)
   ├─ Consulta Sociedade (escritório)
   ├─ Validação CNPJ
   └─ Busca Sócios (opcional)

3. Construção de Grupos
   ├─ Escritório (com CNPJ)
   ├─ Advogado Principal
   └─ Advogados Sócios (se habilitado)

4. Retorno Estruturado
   └─ ProcessingResult com métricas`}
        />
      </section>

      <section className="doc-section">
        <h2>Inicialização</h2>

        <div className="method-block">
          <h3 id="__init__">__init__</h3>
          <CodeBlock
            code={`def __init__(self, logger: logging.Logger, fetch_socios: bool = True) -> None:`}
          />
          <p>
            Inicializa a classe Processing com configurações de logging e busca
            de sócios.
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
                <td>-</td>
                <td>Logger para mensagens (obrigatório)</td>
              </tr>
              <tr>
                <td>fetch_socios</td>
                <td>
                  <code className="code-block">bool</code>
                </td>
                <td>True</td>
                <td>Habilita busca de sócios via LEMIT</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from src.ploomes_integration.processing import Processing
import logging

logger = logging.getLogger(__name__)

# Com busca de sócios habilitada
processor = Processing(logger=logger, fetch_socios=True)

# Sem busca de sócios (mais rápido)
processor = Processing(logger=logger, fetch_socios=False)`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos Principais</h2>

        <div className="method-block">
          <h3 id="build_contact_groups_from_excel">
            build_contact_groups_from_excel
          </h3>
          <CodeBlock
            code={`def build_contact_groups_from_excel(self, file_path: str) -> ProcessingResult:`}
          />
          <p>
            Processa um arquivo Excel e constrói grupos de contatos
            estruturados.
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
                <td>file_path</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Caminho para o arquivo Excel de entrada</td>
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
                  <code className="code-block">ProcessingResult</code>
                </td>
                <td>Resultado com grupos de contatos e métricas</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`# Processar arquivo Excel
result = processor.build_contact_groups_from_excel(
    file_path="input/advogados.xlsx"
)

# Verificar resultado
if result.success:
    print(f"✅ Processados: {result.processed_records}")
    print(f"❌ Falhas: {result.failed_records}")
    print(f"📊 Taxa de sucesso: {result.success_rate:.1%}")
    print(f"⏱️ Duração: {result.duration_seconds:.2f}s")
else:
    print("❌ Processamento falhou")
    for error in result.errors:
        print(f"  - {error}")`}
          />

          <h4>Acessando Grupos de Contatos</h4>
          <CodeBlock
            code={`# Grupos de contatos gerados
for grupo in result.contact_groups:
    escritorio = grupo["escritorio"]
    advogados = grupo["advogados"]

    print(f"Escritório: {escritorio['Nome']}")
    print(f"CNPJ: {escritorio['CNPJ']}")
    print(f"Advogados: {len(advogados)}")

    for adv in advogados:
        print(f"  - {adv['Nome']} (OAB: {adv['OAB']})")`}
          />
        </div>

        <div className="method-block">
          <h3 id="get_stats">get_stats</h3>
          <CodeBlock code={`def get_stats(self) -> Dict[str, Any]:`} />
          <p>Retorna estatísticas detalhadas do processamento.</p>

          <h4>Retorno</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Campo</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>batch_count</td>
                <td>
                  <code className="code-block">int</code>
                </td>
                <td>Número de batches processados</td>
              </tr>
              <tr>
                <td>cache_hits</td>
                <td>
                  <code className="code-block">int</code>
                </td>
                <td>Consultas atendidas pelo cache</td>
              </tr>
              <tr>
                <td>cache_misses</td>
                <td>
                  <code className="code-block">int</code>
                </td>
                <td>Consultas que precisaram buscar dados</td>
              </tr>
              <tr>
                <td>cache_hit_rate</td>
                <td>
                  <code className="code-block">float</code>
                </td>
                <td>Taxa de cache hit (0.0 a 1.0)</td>
              </tr>
              <tr>
                <td>cnpj_cache_size</td>
                <td>
                  <code className="code-block">int</code>
                </td>
                <td>Tamanho atual do cache de CNPJs</td>
              </tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`# Obter estatísticas detalhadas
stats = processor.get_stats()

print(f"Batches processados: {stats['batch_count']}")
print(f"Cache hits: {stats['cache_hits']}")
print(f"Cache misses: {stats['cache_misses']}")
print(f"Taxa de cache hit: {stats['cache_hit_rate']:.1%}")
print(f"Tamanho cache CNPJ: {stats['cnpj_cache_size']}")`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos Internos (Private Methods)</h2>

        <div className="method-block">
          <h3 id="_process_one_advogado">_process_one_advogado</h3>
          <CodeBlock
            code={`def _process_one_advogado(self, nome: str, oab: str) -> list[ConjuntoContatoDict]:`}
          />
          <p>
            Processa um advogado completo: consulta CNA, obtém escritório e
            retorna conjunto(s) de contatos.
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
                <td>nome</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Nome do advogado</td>
              </tr>
              <tr>
                <td>oab</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>OAB do advogado (formatada, ex: "SP123456")</td>
              </tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p>
            <code className="code-block">list[ConjuntoContatoDict]</code>: Lista
            com 1 conjunto contendo escritório e advogados (principal + sócios).
            <strong> SEMPRE</strong> retorna uma lista (nunca{" "}
            <code className="code-block">None</code>).
          </p>

          <h4>Fluxo de Processamento</h4>
          <CodeBlock
            code={`1. Verifica Cache de Processamento
   └─ Existe? → Retorna resultado cacheado

2. Verifica Cache de Advogados (sócios)
   └─ Já foi processado como sócio?
      → Retorna conjunto com _skip_import=True

3. Consulta CNA com nome + OAB
   │
   ├─ Não encontrado?
   │  └─ Retenta consulta apenas com OAB + UF
   │     ├─ Encontrado → Atualiza nome
   │     └─ Não encontrado → Retorna _skip_import=True
   │
   └─ Encontrado → Continua

4. Chama _get_or_create_escritorio()
   └─ Obtém escritório + lista de sócios

5. Cria Advogado Principal
   └─ AdvogadoData(Empresa=..., Nome=..., OAB=...)

6. Filtra Sócios Duplicados
   └─ Remove sócio se nome == advogado principal

7. Monta Lista de Advogados
   └─ [advogado_principal] + socios_filtrados

8. Retorna Conjunto e adiciona ao Cache`}
          />

          <h4>Exemplo</h4>
          <CodeBlock
            code={`# Caso 1: Advogado com escritório e sócios
conjuntos = self._process_one_advogado("João Silva", "SP123456")
# conjuntos = [
#     {
#         "escritorio": {"Nome": "Silva Advogados", "CNPJ": "12345678000190", ...},
#         "advogados": [
#             {"Nome": "João Silva", "OAB": "SP123456", ...},      # Principal
#             {"Nome": "Maria Santos", "OAB": "SP789012", ...},    # Sócia
#         ]
#     }
# ]

# Caso 2: Advogado pessoa física (sem sócios)
conjuntos = self._process_one_advogado("José Souza", "RJ987654")
# conjuntos = [
#     {
#         "escritorio": {"Nome": "José Souza", "Pessoa_Física": "Sim", ...},
#         "advogados": [{"Nome": "José Souza", "OAB": "RJ987654", ...}]
#     }
# ]`}
          />

          <h4>Edge Cases</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Cenário</th>
                <th>Ação</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Advogado no cache de processamento</td>
                <td>Retorna resultado cacheado</td>
                <td>Cache hit (rápido)</td>
              </tr>
              <tr>
                <td>Advogado no cache de sócios</td>
                <td>Retorna com _skip_import=True</td>
                <td>Evita duplicata</td>
              </tr>
              <tr>
                <td>Nome não encontrado no CNA</td>
                <td>Retenta com apenas OAB+UF</td>
                <td>Fallback ou skip</td>
              </tr>
              <tr>
                <td>Sócio com mesmo nome do principal</td>
                <td>Remove da lista de sócios</td>
                <td>Evita duplicata</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="method-block">
          <h3 id="_get_or_create_escritorio">_get_or_create_escritorio</h3>
          <CodeBlock
            code={`def _get_or_create_escritorio(
    self, nome_adv: str, detail_url: str, uf: Optional[str]
) -> tuple[EscritorioData, list[AdvogadoData]]:`}
          />
          <p>
            Obtém ou cria um escritório baseado na consulta CNA, incluindo
            advogados sócios.
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
                <td>nome_adv</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Nome do advogado (para consultar sociedade)</td>
              </tr>
              <tr>
                <td>detail_url</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>URL de detalhes da consulta CNA</td>
              </tr>
              <tr>
                <td>uf</td>
                <td>
                  <code className="code-block">Optional[str]</code>
                </td>
                <td>Unidade Federativa (para buscar sócios)</td>
              </tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p>
            <code className="code-block">
              tuple[EscritorioData, list[AdvogadoData]]
            </code>
            : Tupla com dados do escritório e lista de advogados sócios.
            <strong> SEMPRE</strong> retorna um tuple. Se houver problemas,
            retorna escritório com{" "}
            <code className="code-block">_skip_import=True</code>.
          </p>

          <h4>Fluxo de Processamento</h4>
          <CodeBlock
            code={`1. Consulta Sociedade no CNA
   │
   ├─ Não encontrada → Pessoa Física
   │  └─ Consulta CPF via LEMIT
   │     └─ Retorna (EscritorioData com Pessoa_Física="Sim", [])
   │
   └─ Encontrada → Escritório
      ├─ Nome sociedade vazio?
      │  └─ Sim → Retorna (_skip_import=True, [])
      │
      ├─ Consulta CNPJ via CNPJScraper
      │  ├─ CNPJ não encontrado → Retorna (_skip_import=True, [])
      │  └─ CNPJ encontrado → Continua
      │
      ├─ Verifica Cache por CNPJ
      │  └─ Existe? (e fetch_socios=True)
      │     └─ Retorna (_skip_import=True, advogados_cached)
      │
      ├─ Cria EscritorioData
      │
      └─ Busca Sócios (se fetch_socios=True)
         ├─ Chama _buscar_advogados_socios()
         └─ Cacheia resultado por CNPJ`}
          />

          <h4>Exemplo</h4>
          <CodeBlock
            code={`# Caso 1: Escritório com CNPJ e sócios
escritorio, socios = self._get_or_create_escritorio(
    nome_adv="João Silva",
    detail_url="https://cna.oab.org.br/...",
    uf="SP"
)
# escritorio = {"Nome": "Silva Advogados", "CNPJ": "12345678000190", ...}
# socios = [{"Nome": "Maria Santos", "OAB": "SP789012", ...}, ...]

# Caso 2: Pessoa Física (sem sociedade)
escritorio, socios = self._get_or_create_escritorio(
    nome_adv="José Souza",
    detail_url="https://cna.oab.org.br/...",
    uf="RJ"
)
# escritorio = {"Nome": "José Souza", "Pessoa_Física": "Sim", "CPF": "12345678901", ...}
# socios = []`}
          />

          <h4>Edge Cases</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Cenário</th>
                <th>Ação</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sociedade não encontrada</td>
                <td>Consulta CPF via LEMIT</td>
                <td>Pessoa Física com CPF</td>
              </tr>
              <tr>
                <td>Nome sociedade vazio</td>
                <td>Marca para skip</td>
                <td>_skip_import=True</td>
              </tr>
              <tr>
                <td>CNPJ não encontrado</td>
                <td>Marca para skip</td>
                <td>_skip_import=True</td>
              </tr>
              <tr>
                <td>Escritório já no cache</td>
                <td>Retorna cache (se fetch_socios=True)</td>
                <td>_skip_import=True</td>
              </tr>
              <tr>
                <td>Busca sócios desabilitada</td>
                <td>Pula busca de sócios</td>
                <td>Lista vazia</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="method-block">
          <h3 id="_buscar_advogados_socios">_buscar_advogados_socios</h3>
          <CodeBlock
            code={`def _buscar_advogados_socios(
    self, cnpj: str, nome_escritorio: str, uf: str
) -> list[AdvogadoData]:`}
          />
          <p>
            Busca advogados sócios de um escritório via API LEMIT usando o CNPJ.
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
                <td>cnpj</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>CNPJ do escritório (apenas números)</td>
              </tr>
              <tr>
                <td>nome_escritorio</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Nome do escritório (usado para logs)</td>
              </tr>
              <tr>
                <td>uf</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Unidade Federativa (usada para buscar OAB dos sócios)</td>
              </tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p>
            <code className="code-block">list[AdvogadoData]</code>: Lista de
            advogados sócios encontrados. Lista vazia se: CNPJ inválido, nenhum
            sócio encontrado, ou erro na consulta.
          </p>

          <h4>Comportamento</h4>
          <ol>
            <li>Valida CNPJ (ignora se vazio ou "Não encontrado")</li>
            <li>Consulta API LEMIT para obter lista de sócios</li>
            <li>
              Para cada sócio:
              <ul>
                <li>Extrai CPF e nome</li>
                <li>
                  Busca OAB via{" "}
                  <code className="code-block">_buscar_oab_socio()</code>
                </li>
                <li>Cria AdvogadoData com empresa, nome, OAB e CPF</li>
              </ul>
            </li>
            <li>Aplica rate limiting entre consultas</li>
            <li>Retorna lista de advogados ou lista vazia em caso de erro</li>
          </ol>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`socios = self._buscar_advogados_socios(
    cnpj="12345678000190",
    nome_escritorio="Silva & Associados",
    uf="SP"
)
# socios = [
#     {"Empresa": "Silva & Associados", "Nome": "João Silva", "OAB": "SP123456", "CPF": "12345678901"},
#     {"Empresa": "Silva & Associados", "Nome": "Maria Santos", "OAB": "SP789012", "CPF": "98765432109"}
# ]`}
          />
        </div>

        <div className="method-block">
          <h3 id="_buscar_oab_socio">_buscar_oab_socio</h3>
          <CodeBlock
            code={`def _buscar_oab_socio(self, nome: str, uf: str) -> str:`}
          />
          <p>Busca o número da OAB de um sócio consultando a API CNA.</p>

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
                <td>nome</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Nome completo do sócio</td>
              </tr>
              <tr>
                <td>uf</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Unidade Federativa para filtrar resultados</td>
              </tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p>
            <code className="code-block">str</code>: OAB completa formatada (ex:
            "SP123456") ou string vazia se não encontrada.
          </p>

          <h4>Comportamento</h4>
          <ol>
            <li>Consulta CNA com nome e UF (sem número OAB)</li>
            <li>
              Filtra resultados para{" "}
              <code className="code-block">TipoInscOab == "ADVOGADO"</code> ou{" "}
              <code className="code-block">"ADVOGADA"</code>
            </li>
            <li>
              Extrai <code className="code-block">Inscricao</code> e{" "}
              <code className="code-block">UF</code> do primeiro resultado
              válido
            </li>
            <li>
              Formata como{" "}
              <code className="code-block">{"{UF}{Inscricao}"}</code> (ex:
              "SP123456")
            </li>
            <li>Aplica rate limiting de 1 segundo</li>
          </ol>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`oab = self._buscar_oab_socio(nome="João Silva", uf="SP")
# oab = "SP123456"

oab = self._buscar_oab_socio(nome="Nome Inexistente", uf="RJ")
# oab = ""`}
          />
        </div>

        <div className="method-block">
          <h3 id="_clean_advogado">_clean_advogado</h3>
          <CodeBlock
            code={`def _clean_advogado(self, nome: str, oab: str) -> tuple[str, str]:`}
          />
          <p>
            Normaliza e limpa os dados de entrada de um advogado para
            processamento consistente.
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
                <td>nome</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Nome do advogado (pode conter espaços extras)</td>
              </tr>
              <tr>
                <td>oab</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>OAB do advogado (pode conter formatação inconsistente)</td>
              </tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p>
            <code className="code-block">tuple[str, str]</code>: Tupla com
            (nome_normalizado, oab_normalizada).
          </p>

          <h4>Transformações Aplicadas</h4>
          <ul>
            <li>Remove espaços em branco no início e fim</li>
            <li>Normaliza múltiplos espaços para espaço único</li>
            <li>Converte para maiúsculas (padronização)</li>
            <li>Remove caracteres especiais da OAB</li>
            <li>Formata OAB no padrão UF+Número (ex: "SP123456")</li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`# Entrada com formatação inconsistente
nome, oab = self._clean_advogado(
    nome="  joão   silva  ",
    oab="sp-123.456"
)
# nome = "JOÃO SILVA"
# oab = "SP123456"`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Tratamento de Edge Cases</h2>

        <div className="method-block">
          <h3 id="edge_case_not_found">Advogado Não Encontrado no CNA</h3>
          <CodeBlock
            code={`# Cenário: Nome/OAB incorretos ou advogado não cadastrado
# Ação: Marca escritório com _skip_import=True
# Resultado: Registro ignorado na importação`}
          />
        </div>

        <div className="method-block">
          <h3 id="edge_case_pessoa_fisica">Pessoa Física (Sem Escritório)</h3>
          <CodeBlock
            code={`# Cenário: Advogado sem sociedade registrada
# Ação: Consulta CPF via LEMIT
# Resultado: Escritório marcado como "Pessoa_Física"`}
          />
        </div>

        <div className="method-block">
          <h3 id="edge_case_cnpj">CNPJ Não Encontrado</h3>
          <CodeBlock
            code={`# Cenário: Nome do escritório não retorna CNPJ válido
# Ação: Marca escritório com _skip_import=True
# Resultado: Registro ignorado (evita dados inválidos)`}
          />
        </div>

        <div className="method-block">
          <h3 id="edge_case_cna_nome">Consulta CNA por Nome Falha</h3>
          <CodeBlock
            code={`# Cenário: Nome do advogado não encontrado
# Ação: Retenta consulta apenas com OAB + UF
# Resultado: Nome atualizado se encontrado`}
          />
        </div>

        <div className="method-block">
          <h3 id="edge_case_socio_duplicado">Sócio Duplicado</h3>
          <CodeBlock
            code={`# Cenário: Sócio já está na lista principal de advogados
# Ação: Cache detecta e pula processamento
# Resultado: Evita duplicatas no resultado final`}
          />
        </div>
      </section>
      <section className="doc-section">
        <h2>Estruturas de Dados</h2>

        <div className="method-block">
          <h3 id="EscritorioData">EscritorioData</h3>
          <CodeBlock
            code={`{
    "Nome": str,              # Nome do escritório
    "Pessoa_Física": str,     # "Sim" ou "Não"
    "Razão_social": str,      # Razão social oficial
    "CNPJ": str,              # CNPJ (apenas números)
    "CPF": str,               # CPF (pessoa física)
    "_skip_import": bool,     # Flag para pular importação
    "_skip_reason": str       # Motivo do skip (se aplicável)
}`}
          />
        </div>

        <div className="method-block">
          <h3 id="AdvogadoData">AdvogadoData</h3>
          <CodeBlock
            code={`{
    "Empresa": str,  # Nome do escritório
    "Nome": str,     # Nome completo do advogado
    "OAB": str,      # OAB formatada (ex: "SP123456")
    "CPF": str       # CPF do advogado (se disponível)
}`}
          />
        </div>

        <div className="method-block">
          <h3 id="ConjuntoContatoDict">ConjuntoContatoDict</h3>
          <CodeBlock
            code={`{
    "escritorio": EscritorioData,
    "advogados": list[AdvogadoData]  # Lista com 1+ advogados
}`}
          />
        </div>

        <div className="method-block">
          <h3 id="ProcessingResult">ProcessingResult</h3>
          <h4>Atributos</h4>
          <CodeBlock
            code={`result.success: bool                           # Sucesso geral
result.total_records: int                      # Total de registros
result.processed_records: int                  # Processados com sucesso
result.failed_records: int                     # Falhas
result.errors: list[str]                       # Lista de erros
result.contact_groups: list[ConjuntoContatoDict]  # Grupos gerados
result.duration_seconds: float                 # Tempo total`}
          />

          <h4>Propriedades Calculadas</h4>
          <CodeBlock
            code={`result.success_rate: float        # Taxa de sucesso (0.0 a 1.0)
result.records_per_second: float  # Velocidade de processamento`}
          />
        </div>
      </section>
      <section className="doc-section">
        <h2>Performance</h2>

        <h3>Otimizações Implementadas</h3>
        <ul>
          <li>
            <strong>Cache Multicamadas</strong>: Reduz consultas duplicadas em
            ~70%
          </li>
          <li>
            <strong>Batch Processing</strong>: Processa em lotes para gerenciar
            memória
          </li>
          <li>
            <strong>Rate Limiting</strong>: Human-like delays evitam bloqueios
          </li>
          <li>
            <strong>Lazy Loading</strong>: Sócios são buscados apenas se{" "}
            <code className="code-block">fetch_socios=True</code>
          </li>
        </ul>
      </section>

      <section className="doc-section">
        <h2>Sistema de Cache</h2>

        <div className="method-block">
          <h3 id="cnpj_cache">Cache por CNPJ (Escritórios)</h3>
          <CodeBlock
            code={`# Evita consultas duplicadas para o mesmo escritório
# Key: CNPJ (string numérica)
# Value: (EscritorioData, list[AdvogadoData])`}
          />
          <p>
            <strong>Benefício:</strong> Quando múltiplos advogados pertencem ao
            mesmo escritório, apenas uma consulta CNPJ é feita.
          </p>
        </div>

        <div className="method-block">
          <h3 id="processing_cache">Cache de Processamento (Advogados)</h3>
          <CodeBlock
            code={`# Evita reprocessar o mesmo advogado
# Key: "{nome_normalizado}|{oab_normalizada}"
# Value: list[ConjuntoContatoDict]`}
          />
          <p>
            <strong>Benefício:</strong> Advogados duplicados na planilha são
            processados uma única vez.
          </p>
        </div>

        <div className="method-block">
          <h3 id="advogado_cache">Cache de Sócios</h3>
          <CodeBlock
            code={`# Evita processar sócios que já apareceram na lista principal
# Key: (nome_normalizado, oab_normalizada)
# Value: True`}
          />
          <p>
            <strong>Benefício:</strong> Sócios que já estão na planilha não são
            duplicados.
          </p>
        </div>

        <div className="method-block">
          <h3 id="clear_cache">Limpeza de Cache</h3>
          <CodeBlock
            code={`# Limpar caches manualmente entre batches
processor.cnpj_cache.clear()
processor.processing_cache.clear()
processor.advogado_cache.clear()`}
          />
          <p>
            Útil para processamentos muito grandes onde o cache pode consumir
            muita memória.
          </p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Troubleshooting</h2>
        <p>
          Ajustar <code className="code-block">SLEEP_TIME</code> em{" "}
          <code className="code-block">config.py</code>:
        </p>
        <CodeBlock code={`SLEEP_TIME = 20.0  # Aumentar para 20 segundos`} />

        <h3>Problema: Muitos registros com _skip_import</h3>
        <p>
          <strong>Causas comuns:</strong>
        </p>
        <ul>
          <li>Nomes/OABs incorretos na planilha</li>
          <li>Advogados não cadastrados no CNA</li>
          <li>CNPJs não encontrados</li>
        </ul>
        <p>
          <strong>Solução:</strong> Verificar logs detalhados para identificar
          padrão:
        </p>
        <CodeBlock
          code={`for error in result.errors:
    if "_skip_reason" in error:
        print(error)`}
        />
      </section>

      <section className="doc-section">
        <h2>Exemplos Avançados</h2>

        <h3>Processar com Filtros</h3>
        <CodeBlock
          code={`# Pré-filtrar Excel antes de processar
df = pd.read_excel("input/advogados.xlsx")
df_filtered = df[df['OAB'].str.startswith('SP')]  # Apenas OAB de SP
df_filtered.to_excel("input/advogados_sp.xlsx", index=False)

result = processor.build_contact_groups_from_excel("input/advogados_sp.xlsx")`}
        />

        <h3>Exportar Estatísticas</h3>
        <CodeBlock
          code={`import json

result = processor.build_contact_groups_from_excel("input/advogados.xlsx")
stats = processor.get_stats()

# Salvar estatísticas
with open("output/stats.json", "w") as f:
    json.dump(stats, f, indent=2)

# Salvar resultado
with open("output/result.json", "w") as f:
    json.dump({
        "success": result.success,
        "processed": result.processed_records,
        "failed": result.failed_records,
        "duration": result.duration_seconds
    }, f, indent=2)`}
        />
      </section>

      <section className="doc-section">
        <h2>Configuração</h2>

        <h3>Variáveis de Ambiente (config.py)</h3>
        <CodeBlock
          code={`CNA_BASE_URL: str       # URL base da API CNA
TIMEOUT: int            # Timeout para requisições HTTP
SLEEP_TIME: float       # Delay entre requisições`}
        />
      </section>
    </div>
  );
}

export default ProcessingPage;

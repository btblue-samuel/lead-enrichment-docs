import CodeBlock from "../components/CodeBlock";

function PloomesClientPage() {
  return (
    <div className="doc-page">
      <h1>Classe: PloomesClient</h1>
      <p className="doc-subtitle">
        Facade principal para integração com Ploomes, compondo camadas
        especializadas.
      </p>

      <section className="doc-section">
        <h2>Descrição</h2>
        <p>
          A classe <code className="code-block">PloomesClient</code> é o ponto
          de entrada principal para integração com o Ploomes. Atua como facade
          que compõe as novas camadas especializadas, mantendo compatibilidade
          com a interface pública existente.
        </p>
      </section>

      <section className="doc-section">
        <h2>Classe PloomesClient</h2>
        <CodeBlock code={`class PloomesClient:`} />
        <p>
          Facade compatível que compõe as camadas especializadas do sistema.
        </p>

        <h3>Responsabilidades</h3>
        <ul>
          <li>Interface pública unificada para o sistema</li>
          <li>
            Composição de serviços especializados (API, Processing, Contacts,
            Deals)
          </li>
          <li>Manutenção de compatibilidade com código legado</li>
          <li>Orquestração de operações complexas</li>
          <li>Delegação para camadas apropriadas</li>
        </ul>

        <h3>Arquitetura em Camadas</h3>
        <ul>
          <li>
            <strong>PloomesAPI</strong>: Chamadas HTTP diretas
          </li>
          <li>
            <strong>Processing</strong>: Lógica complexa e coordenação externa
          </li>
          <li>
            <strong>ContactService</strong>: Operações de contatos
          </li>
          <li>
            <strong>DealService</strong>: Operações de negócios/deals
          </li>
        </ul>
      </section>

      <section className="doc-section">
        <h2>Inicialização</h2>

        <div className="method-block">
          <h3 id="__init__">__init__</h3>
          <CodeBlock
            code={`def __init__(self, environment: Optional[str] = None) -> None:`}
          />
          <p>Inicializa o cliente compondo todas as camadas especializadas.</p>

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
                <td>Ambiente Ploomes (prod/sandbox)</td>
              </tr>
            </tbody>
          </table>

          <h4>Componentes inicializados</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Componente</th>
                <th>Classe</th>
                <th>Responsabilidade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>api</td>
                <td>
                  <code className="code-block">PloomesAPI</code>
                </td>
                <td>Chamadas HTTP diretas</td>
              </tr>
              <tr>
                <td>processing</td>
                <td>
                  <code className="code-block">Processing</code>
                </td>
                <td>Coordenação externa e lógica complexa</td>
              </tr>
              <tr>
                <td>contacts</td>
                <td>
                  <code className="code-block">ContactService</code>
                </td>
                <td>Operações de contatos</td>
              </tr>
              <tr>
                <td>deals</td>
                <td>
                  <code className="code-block">DealService</code>
                </td>
                <td>Operações de negócios</td>
              </tr>
              <tr>
                <td>mapper_factory</td>
                <td>
                  <code className="code-block">ContactMapperFactory</code>
                </td>
                <td>Factory para mapeadores</td>
              </tr>
            </tbody>
          </table>

          <h4>Configurações carregadas</h4>
          <ul>
            <li>Mapeamentos de campos do JSON de configuração</li>
            <li>Cliente LEMIT para integração</li>
            <li>Comportamento humano simulado</li>
            <li>Rate limiting configurado</li>
          </ul>

          <h4>Log de inicialização</h4>
          <CodeBlock
            code={`PloomesClient inicializado - Ambiente: prod, Base URL: https://api2.ploomes.com`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos de Mapeamento</h2>

        <div className="method-block">
          <h3 id="map_escritorio_to_ploomes">map_escritorio_to_ploomes</h3>
          <CodeBlock
            code={`def map_escritorio_to_ploomes(self, data: EscritorioData) -> Tuple[Dict, int]:`}
          />
          <p>Mapeia dados de escritório para formato Ploomes.</p>

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
                <td>data</td>
                <td>
                  <code className="code-block">EscritorioData</code>
                </td>
                <td>Dados do escritório</td>
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
                  <code className="code-block">Tuple[Dict, int]</code>
                </td>
                <td>(dados_mapeados, tag_id)</td>
              </tr>
            </tbody>
          </table>

          <p>
            <strong>Delegação:</strong> Chama{" "}
            <code className="code-block">
              self.contacts.map_escritorio(data)
            </code>
          </p>
        </div>

        <div className="method-block">
          <h3 id="map_advogado_to_ploomes">map_advogado_to_ploomes</h3>
          <CodeBlock
            code={`def map_advogado_to_ploomes(
    self, data: AdvogadoData, company_id: Optional[int] = None
) -> Tuple[Dict, int]:`}
          />
          <p>Mapeia dados de advogado para formato Ploomes.</p>

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
                <td>data</td>
                <td>
                  <code className="code-block">AdvogadoData</code>
                </td>
                <td>Dados do advogado</td>
              </tr>
              <tr>
                <td>company_id</td>
                <td>
                  <code className="code-block">Optional[int]</code>
                </td>
                <td>ID da empresa associada</td>
              </tr>
            </tbody>
          </table>

          <p>
            <strong>Delegação:</strong> Chama{" "}
            <code className="code-block">
              self.contacts.map_advogado(data, company_id)
            </code>
          </p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Operações de Contatos</h2>

        <div className="method-block">
          <h3 id="create_complete_contact_set">create_complete_contact_set</h3>
          <CodeBlock
            code={`def create_complete_contact_set(
    self, escritorio_data: EscritorioData, advogado_data: AdvogadoData
) -> Dict:`}
          />
          <p>
            Cria ou atualiza um conjunto completo de contatos (escritório +
            advogado).
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
                <td>escritorio_data</td>
                <td>
                  <code className="code-block">EscritorioData</code>
                </td>
                <td>Dados do escritório</td>
              </tr>
              <tr>
                <td>advogado_data</td>
                <td>
                  <code className="code-block">AdvogadoData</code>
                </td>
                <td>Dados do advogado</td>
              </tr>
            </tbody>
          </table>

          <h4>Estrutura de retorno</h4>
          <CodeBlock
            code={`{
    "escritorio": Dict | None,     # Resultado da criação do escritório
    "advogado": Dict | None,       # Resultado da criação do advogado
    "success": bool,               # Status geral da operação
    "errors": List[str]            # Lista de erros ocorridos
}`}
          />

          <h4>Fluxo de processamento</h4>
          <ol>
            <li>
              <strong>Processamento escritório</strong>: Chama{" "}
              <code className="code-block">_process_escritorio()</code>
            </li>
            <li>
              <strong>Processamento advogado</strong>: Chama{" "}
              <code className="code-block">_process_advogado()</code> com
              company_id
            </li>
            <li>
              <strong>Agregação resultados</strong>: Combina resultados em
              estrutura unificada
            </li>
            <li>
              <strong>Error handling</strong>: Captura e categoriza exceções
            </li>
          </ol>

          <h4>Exceções tratadas</h4>
          <ul>
            <li>
              <code className="code-block">ValidationError</code>: Dados de
              entrada inválidos
            </li>
            <li>
              <code className="code-block">PloomesAPIError</code>: Erros da API
              Ploomes
            </li>
            <li>
              <code className="code-block">ContactCreationError</code>: Falhas
              na criação de contatos
            </li>
            <li>
              <code className="code-block">Exception</code>: Erros gerais não
              categorizados
            </li>
          </ul>
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos de Processamento Interno</h2>

        <div className="method-block">
          <h3>_process_escritorio</h3>
          <CodeBlock
            code={`def _process_escritorio(self, escritorio_data: EscritorioData) -> Dict[str, Any]:`}
          />
          <p>
            Processa a criação/atualização de um escritório (método privado).
          </p>

          <h4>Fluxo</h4>
          <ol>
            <li>
              <strong>Mapeamento</strong>: Converte dados para formato Ploomes
            </li>
            <li>
              <strong>Criação/atualização</strong>: Via ContactService
            </li>
            <li>
              <strong>Aplicação de tags</strong>: Se especificado no mapeamento
            </li>
            <li>
              <strong>Retorno estruturado</strong>: Dados do escritório criado
            </li>
          </ol>

          <h4>Estrutura de retorno</h4>
          <CodeBlock
            code={`{
    "contact_data": Dict,     # Dados do contato criado
    "operation": str,         # "created" ou "updated"
    "contact_id": int         # ID do contato no Ploomes
}`}
          />
        </div>

        <div className="method-block">
          <h3>_process_advogado</h3>
          <CodeBlock
            code={`def _process_advogado(
    self, advogado_data: AdvogadoData, company_id: Optional[int]
) -> Dict[str, Any]:`}
          />
          <p>Processa a criação/atualização de um advogado (método privado).</p>

          <h4>Funcionalidades</h4>
          <ul>
            <li>Mapeamento com associação à empresa</li>
            <li>Criação/atualização via ContactService</li>
            <li>Aplicação de tags apropriadas</li>
            <li>Retorno estruturado com metadados</li>
          </ul>
        </div>
      </section>

      <section className="doc-section">
        <h2>Importação Principal</h2>

        <div className="method-block">
          <h3 id="import_to_ploomes">import_to_ploomes</h3>
          <CodeBlock
            code={`def import_to_ploomes(self, type_id: int = 1) -> List[Dict[str, Any]]:`}
          />
          <p>
            Executa importação completa para o Ploomes com processamento em
            lotes.
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
                <td>type_id</td>
                <td>
                  <code className="code-block">int</code>
                </td>
                <td>Tipo de contato (1=Empresa, 2=Pessoa)</td>
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
                  <code className="code-block">List[Dict[str, Any]]</code>
                </td>
                <td>Lista de resultados por registro</td>
              </tr>
            </tbody>
          </table>

          <h4>Pré-requisito</h4>
          <CodeBlock
            code={`# Deve ser chamado após processamento
client.create_model_from_data("arquivo.xlsx")
result = client.import_to_ploomes()`}
          />

          <h4>Fluxo completo</h4>
          <ol>
            <li>
              <strong>Validação</strong>: Verifica se contact_groups foi
              populado
            </li>
            <li>
              <strong>Processamento lotes</strong>: Itera sobre grupos únicos
            </li>
            <li>
              <strong>Progress tracking</strong>: Log de progresso a cada grupo
            </li>
            <li>
              <strong>Rate limiting</strong>: Aplica delays entre operações
            </li>
            <li>
              <strong>Error handling</strong>: Captura e registra erros
              detalhados
            </li>
            <li>
              <strong>Deduplicação</strong>: Evita processamento de duplicatas
            </li>
            <li>
              <strong>Expansão resultados</strong>: Mapeia de volta para linhas
              originais
            </li>
          </ol>

          <h4>Métricas coletadas</h4>
          <ul>
            <li>Total de grupos processados</li>
            <li>Sucessos, falhas e ignorados</li>
            <li>Criações vs. atualizações</li>
            <li>Tempo total de processamento</li>
          </ul>

          <h4>Log de resumo</h4>
          <CodeBlock
            code={`Resumo: lidos=150 ignorados=5 tentados=145 sucessos=140 falhas=5`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Expansão de Resultados</h2>

        <div className="method-block">
          <h3>_expand_results_to_original_rows</h3>
          <CodeBlock
            code={`def _expand_results_to_original_rows(
    self, unique_results: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:`}
          />
          <p>
            Expande resultados únicos de volta para linhas originais com
            duplicatas.
          </p>

          <h4>Funcionalidade</h4>
          <ul>
            <li>
              Usa mapeamento{" "}
              <code className="code-block">tuple_to_indices</code> para
              encontrar linhas originais
            </li>
            <li>
              Aplica atualizações de nomes do{" "}
              <code className="code-block">nome_updates</code>
            </li>
            <li>Propaga resultados para todas as duplicatas</li>
            <li>Mantém consistência com formato de entrada</li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`# Entrada original: 3 linhas com mesmo advogado
# Processamento único: 1 resultado
# Expansão: 3 resultados (um para cada linha original)`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos de Processamento de Dados</h2>

        <div className="method-block">
          <h3>create_model_from_data</h3>
          <CodeBlock
            code={`def create_model_from_data(self, file_path: str) -> ProcessingResult:`}
          />
          <p>Cria modelo de dados a partir de planilha Excel.</p>
          <p>
            <strong>Delegação:</strong> Chama{" "}
            <code className="code-block">
              self.processing.build_contact_groups_from_excel(file_path)
            </code>
          </p>
          <p>
            <strong>Efeito:</strong> Popula{" "}
            <code className="code-block">self.contact_groups</code> para
            posterior importação.
          </p>
        </div>

        <div className="method-block">
          <h3>process_advogados_to_csv</h3>
          <CodeBlock
            code={`def process_advogados_to_csv(
    self, file_path: str, output_path: str = "output/advogados_escritorios.csv"
) -> bool:`}
          />
          <p>Processa advogados e exporta para CSV.</p>
          <p>
            <strong>Delegação:</strong> Chama{" "}
            <code className="code-block">
              self.processing.export_advogados_to_csv(file_path, output_path)
            </code>
          </p>
        </div>

        <div className="method-block">
          <h3>processar_cnjs_excel</h3>
          <CodeBlock
            code={`def processar_cnjs_excel(
    self, arquivo_excel_entrada: str, arquivo_csv_saida: str
) -> None:`}
          />
          <p>Processa planilha de CNJs para integração específica.</p>
          <p>
            <strong>Delegação:</strong> Chama{" "}
            <code className="code-block">
              self.processing.process_cnjs_excel(...)
            </code>
          </p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Operações de Deals/Negócios</h2>

        <div className="method-block">
          <h3 id="create_deal">create_deal</h3>
          <CodeBlock
            code={`def create_deal(
    self, model: PloomesImportModel, max_retries: int = 3
) -> Optional[dict]:`}
          />
          <p>Cria negócio no Ploomes.</p>
          <p>
            <strong>Delegação:</strong> Chama{" "}
            <code className="code-block">
              self.deals.create_deal(model, max_retries)
            </code>
          </p>
        </div>

        <div className="method-block">
          <h3>update_deal</h3>
          <CodeBlock
            code={`def update_deal(
    self, deal_cnj: str, ploomes_stage: DealService.PloomesStage
) -> bool:`}
          />
          <p>Atualiza estágio de negócio por CNJ.</p>
          <p>
            <strong>Delegação:</strong> Chama{" "}
            <code className="code-block">
              self.deals.update_deal(deal_cnj, ploomes_stage)
            </code>
          </p>
        </div>

        <div className="method-block">
          <h3 id="get_deal_by_cnj">get_deal_by_cnj</h3>
          <CodeBlock code={`def get_deal_by_cnj(self, deal_cnj: str):`} />
          <p>Obtém negócio pelo CNJ.</p>
          <p>
            <strong>Delegação:</strong> Chama{" "}
            <code className="code-block">
              self.deals.get_deal_by_cnj(deal_cnj)
            </code>
          </p>
        </div>

        <div className="method-block">
          <h3>get_stage_id_by_pipeline_and_name</h3>
          <CodeBlock
            code={`def get_stage_id_by_pipeline_and_name(self, pipeline_name: str, stage_name: str):`}
          />
          <p>Obtém ID do estágio por pipeline e nome.</p>
          <p>
            <strong>Delegação:</strong> Chama{" "}
            <code className="code-block">
              self.api.get_stage_by_pipeline_and_name(...)
            </code>
          </p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos Auxiliares</h2>

        <div className="method-block">
          <h3>_load_field_mappings</h3>
          <CodeBlock code={`def _load_field_mappings(self) -> Dict:`} />
          <p>Carrega mapeamentos de campos do arquivo JSON de configuração.</p>
          <p>
            <strong>Arquivo:</strong>{" "}
            <code className="code-block">resources/fields_completo.json</code>
          </p>
          <p>
            <strong>Validação:</strong> Verifica se dados carregados são um
            dicionário válido.
          </p>
        </div>

        <div className="method-block">
          <h3>_estatisticas_cna</h3>
          <CodeBlock code={`def _estatisticas_cna(self) -> Dict[str, Any]:`} />
          <p>Obtém estatísticas do cliente CNA.</p>
          <p>
            <strong>Delegação:</strong> Chama{" "}
            <code className="code-block">
              self.processing._estatisticas_cna()
            </code>
          </p>
        </div>

        <div className="method-block">
          <h3>_init_lemit</h3>
          <CodeBlock code={`def _init_lemit(self):`} />
          <p>Inicializa cliente LEMIT com tratamento de erros robusto.</p>
          <p>
            <strong>Error handling:</strong> Captura exceções e retorna None em
            caso de falha.
          </p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Padrões de Uso</h2>

        <h3>Uso Básico - Processamento Completo</h3>
        <CodeBlock
          code={`# Inicialização
client = PloomesClient(environment="prod")

# Processamento de dados
result = client.create_model_from_data("advogados.xlsx")
print(f"Processados: {result.processed_records}/{result.total_records}")

# Importação para Ploomes
import_results = client.import_to_ploomes(type_id=1)

# Análise de resultados
success_count = sum(1 for r in import_results if r.get('success'))
print(f"Importados com sucesso: {success_count}/{len(import_results)}")`}
        />

        <h3>Criação Individual de Contatos</h3>
        <CodeBlock
          code={`# Dados do escritório e advogado
escritorio = EscritorioData(nome="Escritório Silva & Associados", cnpj="12345678000199")
advogado = AdvogadoData(nome="João Silva", cpf="12345678901", oab="MG123456")

# Criação do conjunto completo
result = client.create_complete_contact_set(escritorio, advogado)

if result['success']:
    print(f"✅ Escritório criado: ID {result['escritorio']['contact_id']}")
    print(f"✅ Advogado criado: ID {result['advogado']['contact_id']}")
else:
    print(f"❌ Erros: {result['errors']}")`}
        />

        <h3>Exportação para CSV</h3>
        <CodeBlock
          code={`# Processamento e exportação
success = client.process_advogados_to_csv(
    file_path="entrada.xlsx",
    output_path="output/resultado.csv"
)

if success:
    print("📊 Dados exportados com sucesso")`}
        />

        <h3>Operações de Deals</h3>
        <CodeBlock
          code={`# Criar negócio
model = PloomesImportModel(
    titulo="Caso João vs Empresa",
    cnj="1234567-89.2023.8.13.0001",
    # ... outros campos
)

deal = client.create_deal(model)
if deal:
    print(f"🤝 Deal criado: ID {deal['Id']}")

# Atualizar estágio
success = client.update_deal(
    deal_cnj="1234567-89.2023.8.13.0001",
    ploomes_stage=DealService.PloomesStage.WON
)`}
        />
      </section>

      <section className="doc-section">
        <h2>Observabilidade</h2>

        <h3>Logs Estruturados</h3>
        <CodeBlock
          code={`# Logs de inicialização
logger.info("PloomesClient inicializado", extra={
    "environment": environment,
    "base_url": self.api.base_url,
    "components_loaded": ["api", "processing", "contacts", "deals"]
})

# Logs de processamento
logger.info("Importação concluída", extra={
    "total_groups": len(self.contact_groups),
    "success_count": success_count,
    "failed_count": failed_count,
    "processing_time_seconds": processing_time
})`}
        />

        <h3>Métricas Agregadas</h3>
        <CodeBlock
          code={`def get_processing_summary():
    return {
        "processing_stats": client.processing.get_stats(),
        "api_metrics": client.api.get_metrics_summary(),
        "cna_statistics": client._estatisticas_cna()
    }`}
        />

        <h3>Monitoramento de Performance</h3>
        <CodeBlock
          code={`# Rate limiting configurado
client.rate_limit_delay = 2.0  # 2 segundos entre operações

# Comportamento humano simulado
client.human_behavior.random_delay(1, 3)  # Delay aleatório

# Progress tracking automático
# Logs gerados automaticamente durante import_to_ploomes()`}
        />
      </section>

      <section className="doc-section">
        <h2>Compatibilidade e Migração</h2>

        <h3>Interface Legada</h3>
        <p>
          O <code className="code-block">PloomesClient</code> mantém todos os
          métodos públicos da versão anterior:
        </p>
        <CodeBlock
          code={`# Métodos mantidos para compatibilidade
client.create_model_from_data()      # ✅ Compatível
client.import_to_ploomes()           # ✅ Compatível
client.create_deal()                 # ✅ Compatível
client.process_advogados_to_csv()    # ✅ Compatível`}
        />

        <h3>Migração Gradual</h3>
        <CodeBlock
          code={`# Código antigo (ainda funciona)
client = PloomesClient()
result = client.import_to_ploomes()

# Novo código (acesso às camadas)
client = PloomesClient()
api_stats = client.api.get_metrics_summary()
processing_stats = client.processing.get_stats()`}
        />

        <h3>Extensibilidade</h3>
        <CodeBlock
          code={`# Extensão personalizada
class CustomPloomesClient(PloomesClient):
    def custom_import_workflow(self):
        # Usa componentes internos
        result = self.processing.build_contact_groups_from_excel("file.xlsx")
        return self.contacts.bulk_create(result.contact_groups)`}
        />
      </section>
    </div>
  );
}

export default PloomesClientPage;

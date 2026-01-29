import CodeBlock from "../components/CodeBlock";

function DealServicePage() {
  return (
    <div className="doc-page">
      <h1>Classe: DealService</h1>
      <p className="doc-subtitle">
        Gerenciamento de negócios (deals) no Ploomes com suporte a operações CRUD.
      </p>

      <section className="doc-section">
        <h2>Visão Geral</h2>
        <p>
          O módulo <code className="code-block">DealService</code> fornece uma camada de abstração para gerenciar 
          negócios (deals) no Ploomes, incluindo criação, atualização, busca e validação.
        </p>

        <h3>Responsabilidades</h3>
        <table className="params-table">
          <thead>
            <tr><th>Responsabilidade</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>Criação</td><td>Cria novos deals no Ploomes</td></tr>
            <tr><td>Atualização</td><td>Atualiza deals existentes</td></tr>
            <tr><td>Busca</td><td>Busca deals por CNJ ou ID</td></tr>
            <tr><td>Validação</td><td>Valida dados antes de criar/atualizar</td></tr>
            <tr><td>Mapeamento</td><td>Mapeia dados de domínio para API</td></tr>
          </tbody>
        </table>
      </section>

      <section className="doc-section">
        <h2>Métodos Públicos</h2>

        <div className="method-block">
          <h3 id="__init__">__init__</h3>
          <CodeBlock
            code={`def __init__(
    self,
    api: PloomesAPI,
    mapper_factory: ContactMapperFactory,
    logger: logging.Logger
):`}
          />
          <p><strong>Descrição:</strong> Inicializa o serviço de deals.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>api</td><td><code className="code-block">PloomesAPI</code></td><td>Cliente da API Ploomes</td></tr>
              <tr><td>mapper_factory</td><td><code className="code-block">ContactMapperFactory</code></td><td>Factory de mappers</td></tr>
              <tr><td>logger</td><td><code className="code-block">logging.Logger</code></td><td>Logger configurado</td></tr>
            </tbody>
          </table>
        </div>

        <div className="method-block">
          <h3 id="create_deal">create_deal</h3>
          <CodeBlock
            code={`def create_deal(
    self,
    deal_data: PloomesImportModel,
    reclamante_id: Optional[int] = None,
    escritorio_id: Optional[int] = None,
    advogado_id: Optional[int] = None
) -> Dict[str, Any]`}
          />
          <p><strong>Descrição:</strong> Cria um novo deal no Ploomes.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>deal_data</td><td><code className="code-block">PloomesImportModel</code></td><td>Dados do deal</td></tr>
              <tr><td>reclamante_id</td><td><code className="code-block">int</code></td><td>ID do reclamante (opcional)</td></tr>
              <tr><td>escritorio_id</td><td><code className="code-block">int</code></td><td>ID do escritório (opcional)</td></tr>
              <tr><td>advogado_id</td><td><code className="code-block">int</code></td><td>ID do advogado (opcional)</td></tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p><code className="code-block">Dict[str, Any]</code> - Dados do deal criado</p>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`deal_data = {
    "escritorio": "Silva Advogados",
    "negociador": "João Silva",
    "origem": "Site",
    "uf": "SP",
    "produto": "Consultoria",
    "stage_id": 1,
    "tags_id": [10, 20]
}

deal = service.create_deal(
    deal_data,
    reclamante_id=123,
    escritorio_id=456,
    advogado_id=789
)

print(f"Deal criado: ID {deal['Id']}")`}
          />
        </div>

        <div className="method-block">
          <h3 id="update_deal">update_deal</h3>
          <CodeBlock
            code={`def update_deal(
    self,
    deal_id: int,
    update_data: Dict[str, Any]
) -> Dict[str, Any]`}
          />
          <p><strong>Descrição:</strong> Atualiza um deal existente.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>deal_id</td><td><code className="code-block">int</code></td><td>ID do deal</td></tr>
              <tr><td>update_data</td><td><code className="code-block">Dict[str, Any]</code></td><td>Dados a atualizar</td></tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p><code className="code-block">Dict[str, Any]</code> - Dados do deal atualizado</p>
        </div>

        <div className="method-block">
          <h3 id="get_deal_by_cnj">get_deal_by_cnj</h3>
          <CodeBlock
            code={`def get_deal_by_cnj(self, cnj: str) -> Dict[str, Any] | None`}
          />
          <p><strong>Descrição:</strong> Busca um deal pelo número CNJ.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>cnj</td><td><code className="code-block">str</code></td><td>Número CNJ do processo</td></tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p><code className="code-block">Dict[str, Any] | None</code> - Dados do deal ou None se não encontrado</p>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`deal = service.get_deal_by_cnj("0001234-56.2024.8.26.0100")
if deal:
    print(f"Deal encontrado: {deal['Title']}")
else:
    print("Deal não encontrado")`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Exemplos de Uso</h2>

        <h3>Exemplo 1: Criar Deal Completo</h3>
        <CodeBlock
          code={`from src.ploomes_integration.services import DealService
from src.ploomes_integration.api import PloomesAPI

api = PloomesAPI(...)
service = DealService(api, mapper_factory, logger)

# Dados do deal
deal_data = {
    "escritorio": "Silva & Associados",
    "negociador": "Dr. João Silva",
    "origem": "Indicação",
    "uf": "SP",
    "produto": "Trabalhista",
    "stage_id": 1,
    "tags_id": [10, 20, 30]
}

# Criar deal
deal = service.create_deal(
    deal_data,
    reclamante_id=123,
    escritorio_id=456,
    advogado_id=789
)

print(f"✅ Deal criado: {deal['Title']} (ID {deal['Id']})")`}
        />

        <h3>Exemplo 2: Buscar e Atualizar Deal</h3>
        <CodeBlock
          code={`# Buscar deal por CNJ
cnj = "0001234-56.2024.8.26.0100"
deal = service.get_deal_by_cnj(cnj)

if deal:
    # Atualizar stage
    updated = service.update_deal(
        deal['Id'],
        {"StageId": 2}
    )
    print(f"✅ Deal atualizado para stage {updated['StageId']}")
else:
    print("❌ Deal não encontrado")`}
        />

        <h3>Exemplo 3: Verificar Duplicidade</h3>
        <CodeBlock
          code={`# Verificar se deal já existe antes de criar
cnj = "0001234-56.2024.8.26.0100"
existing = service.get_deal_by_cnj(cnj)

if existing:
    print(f"⚠️ Deal já existe: ID {existing['Id']}")
else:
    # Criar novo deal
    deal = service.create_deal(deal_data, ...)
    print(f"✅ Deal criado: ID {deal['Id']}")`}
        />
      </section>
    </div>
  );
}

export default DealServicePage;

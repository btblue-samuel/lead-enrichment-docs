import CodeBlock from "../components/CodeBlock";

function ContactMapperPage() {
  return (
    <div className="doc-page">
      <h1>Contact Mappers</h1>
      <p className="doc-subtitle">
        Transformação de dados de domínio em payloads formatados para a API do Ploomes.
      </p>

      <section className="doc-section">
        <h2>Visão Geral</h2>
        <p>
          O módulo <code className="code-block">contact_mapper</code> é responsável por transformar dados de domínio em 
          payloads formatados para a API do Ploomes. Utiliza o padrão <strong>Factory</strong> para criar mappers especializados.
        </p>

        <h3>Responsabilidades</h3>
        <table className="params-table">
          <thead>
            <tr><th>Responsabilidade</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>Transformação</td><td>Converte DTOs de domínio para formato Ploomes</td></tr>
            <tr><td>Validação</td><td>Valida e formata CPF, CNPJ, telefones</td></tr>
            <tr><td>Mapeamento</td><td>Mapeia campos customizados (OtherProperties)</td></tr>
            <tr><td>Factory</td><td>Cria instâncias de mappers especializados</td></tr>
          </tbody>
        </table>

        <h3>Hierarquia de Classes</h3>
        <CodeBlock
          code={`ContactMapperBase (classe base)
├── EscritorioMapper (escritórios/empresas)
├── AdvogadoMapper (advogados/pessoas)
├── ReclamanteMapper (reclamantes/pessoas)
└── DealMapper (negócios/deals)

ContactMapperFactory (factory)`}
        />
      </section>

      <section className="doc-section">
        <h2>ContactMapperBase</h2>

        <div className="method-block">
          <h3 id="__init__">__init__</h3>
          <CodeBlock
            code={`def __init__(self, field_mappings: Dict[str, Any], logger):`}
          />
          <p><strong>Descrição:</strong> Inicializa a classe base de mapeamento.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>field_mappings</td><td><code className="code-block">Dict[str, Any]</code></td><td>Mapeamentos de campos do JSON</td></tr>
              <tr><td>logger</td><td><code className="code-block">logging.Logger</code></td><td>Logger para operações</td></tr>
            </tbody>
          </table>
        </div>

        <div className="method-block">
          <h3 id="create_base_contact">create_base_contact</h3>
          <CodeBlock
            code={`def create_base_contact(
    self,
    name: str,
    type_id: int,
    register: str = None,
    company_id: Optional[int] = None
) -> Dict[str, Any]`}
          />
          <p><strong>Descrição:</strong> Cria estrutura base de contato do Ploomes.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>name</td><td><code className="code-block">str</code></td><td>Nome do contato</td></tr>
              <tr><td>type_id</td><td><code className="code-block">int</code></td><td>Tipo (1=Empresa, 2=Pessoa)</td></tr>
              <tr><td>register</td><td><code className="code-block">str</code></td><td>CPF/CNPJ (opcional)</td></tr>
              <tr><td>company_id</td><td><code className="code-block">int</code></td><td>ID da empresa associada (opcional)</td></tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <CodeBlock
            code={`{
    "Name": str,
    "TypeId": int,
    "Register": str,
    "CompanyId": int,
    "OriginId": int,
    "Phones": [],
    "OtherProperties": [],
}`}
          />
        </div>

        <div className="method-block">
          <h3 id="add_other_property">add_other_property</h3>
          <CodeBlock
            code={`def add_other_property(
    self,
    other_props: List[Dict],
    field_key: str,
    value: Any,
    value_type: str = "StringValue"
) -> None`}
          />
          <p><strong>Descrição:</strong> Adiciona propriedade personalizada à lista de OtherProperties.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>other_props</td><td><code className="code-block">List[Dict]</code></td><td>Lista a ser modificada (in-place)</td></tr>
              <tr><td>field_key</td><td><code className="code-block">str</code></td><td>Chave do campo personalizado</td></tr>
              <tr><td>value</td><td><code className="code-block">Any</code></td><td>Valor a ser adicionado</td></tr>
              <tr><td>value_type</td><td><code className="code-block">str</code></td><td>Tipo do valor (padrão: "StringValue")</td></tr>
            </tbody>
          </table>

          <h4>Tipos Suportados</h4>
          <ul>
            <li>"StringValue" - Strings</li>
            <li>"BoolValue" - Booleanos</li>
            <li>"IntValue" / "IntegerValue" - Inteiros</li>
            <li>"DecimalValue" - Decimais</li>
            <li>"DateValue" - Datas</li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`other_props = []
self.add_other_property(
    other_props,
    "contact_ABC123",
    "Valor do Campo",
    "StringValue"
)
# other_props agora contém:
# [{"FieldKey": "contact_ABC123", "StringValue": "Valor do Campo"}]`}
          />
        </div>

        <div className="method-block">
          <h3 id="process_conditional_fields">process_conditional_fields</h3>
          <CodeBlock
            code={`def process_conditional_fields(
    self,
    other_props: List[Dict],
    data: Dict[str, Any],
    config: Dict[str, Any],
    field_mappings: List[str]
) -> None`}
          />
          <p><strong>Descrição:</strong> Processa campos condicionais baseados na configuração.</p>
        </div>

        <div className="method-block">
          <h3 id="process_phone_fields">process_phone_fields</h3>
          <CodeBlock
            code={`def process_phone_fields(
    self,
    contact: Dict[str, Any],
    data: Dict[str, Any],
    phone_fields: List[str],
) -> None`}
          />
          <p><strong>Descrição:</strong> Processa campos de telefone e adiciona ao contato.</p>

          <h4>Estrutura de Telefone</h4>
          <CodeBlock
            code={`{
    "PhoneNumber": str,  # Formatado
    "SearchPhoneNumber": int,
    "TypeId": 1,
    "CountryId": 0
}`}
          />
        </div>

        <div className="method-block">
          <h3 id="process_email_fields">process_email_fields</h3>
          <CodeBlock
            code={`def process_email_fields(
    self,
    other_props: List[Dict],
    data: Dict[str, Any],
    config: Dict[str, Any],
    email_fields: List[str],
) -> None`}
          />
          <p><strong>Descrição:</strong> Processa campos de email e adiciona às propriedades.</p>
        </div>
      </section>

      <section className="doc-section">
        <h2>EscritorioMapper</h2>

        <div className="method-block">
          <h3 id="map_to_ploomes_escritorio">map_to_ploomes</h3>
          <CodeBlock
            code={`def map_to_ploomes(self, escritorio_data: Dict[str, Any]) -> Tuple[Dict[str, Any], int]`}
          />
          <p><strong>Descrição:</strong> Mapeia dados do escritório para formato do Ploomes.</p>

          <h4>Campos Obrigatórios</h4>
          <table className="params-table">
            <thead>
              <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>Nome</td><td><code className="code-block">str</code></td><td>Nome do escritório</td></tr>
              <tr><td>Pessoa_Física</td><td><code className="code-block">str</code></td><td>"Sim"/"Não"</td></tr>
              <tr><td>CNPJ</td><td><code className="code-block">str</code></td><td>CNPJ (se PJ)</td></tr>
              <tr><td>CPF</td><td><code className="code-block">str</code></td><td>CPF (se PF)</td></tr>
            </tbody>
          </table>

          <h4>Lógica</h4>
          <ol>
            <li>Detecta se é Pessoa Física
              <ul>
                <li>Se Pessoa_Física in ["sim", "true", "1", "yes"] → PF</li>
                <li>Caso contrário → PJ</li>
              </ul>
            </li>
            <li>Se PF: register = None</li>
            <li>Se PJ: register = CNPJ formatado</li>
            <li>Adiciona flag booleana (É Pessoa Física)</li>
            <li>Adiciona LegalName = Nome</li>
          </ol>

          <h4>Tag Retornada</h4>
          <p><code className="code-block">ContactTags.ESCRITORIO</code></p>
        </div>
      </section>

      <section className="doc-section">
        <h2>AdvogadoMapper</h2>

        <div className="method-block">
          <h3 id="map_to_ploomes_advogado">map_to_ploomes</h3>
          <CodeBlock
            code={`def map_to_ploomes(
    self,
    advogado_data: Dict[str, Any],
    company_id: Optional[int] = None
) -> Tuple[Dict[str, Any], int]`}
          />
          <p><strong>Descrição:</strong> Mapeia dados do advogado para formato do Ploomes.</p>

          <h4>Campos Obrigatórios</h4>
          <table className="params-table">
            <thead>
              <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>Nome</td><td><code className="code-block">str</code></td><td>Nome do advogado</td></tr>
            </tbody>
          </table>

          <h4>Campos Opcionais</h4>
          <table className="params-table">
            <thead>
              <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>CPF</td><td><code className="code-block">str</code></td><td>CPF do advogado</td></tr>
              <tr><td>Empresa</td><td><code className="code-block">str</code></td><td>Nome da empresa</td></tr>
              <tr><td>OAB</td><td><code className="code-block">str</code></td><td>Número OAB</td></tr>
              <tr><td>Cidade</td><td><code className="code-block">str</code></td><td>Cidade</td></tr>
              <tr><td>E-mail 1</td><td><code className="code-block">str</code></td><td>Email principal</td></tr>
              <tr><td>E-mail 2</td><td><code className="code-block">str</code></td><td>Email secundário</td></tr>
              <tr><td>E-mail 3</td><td><code className="code-block">str</code></td><td>Email terciário</td></tr>
            </tbody>
          </table>

          <h4>TypeId</h4>
          <p>2 (Pessoa)</p>

          <h4>Tag Retornada</h4>
          <p><code className="code-block">ContactTags.ADVOGADO</code></p>
        </div>
      </section>

      <section className="doc-section">
        <h2>ReclamanteMapper</h2>

        <div className="method-block">
          <h3 id="map_to_ploomes_reclamante">map_to_ploomes</h3>
          <CodeBlock
            code={`def map_to_ploomes(self, reclamante_data: dict[str, Any]) -> tuple[dict[str, Any], int]`}
          />
          <p><strong>Descrição:</strong> Mapeia dados do reclamante para formato do Ploomes.</p>

          <h4>Campos Obrigatórios</h4>
          <table className="params-table">
            <thead>
              <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>Nome</td><td><code className="code-block">str</code></td><td>Nome do reclamante</td></tr>
            </tbody>
          </table>

          <h4>Campos Opcionais</h4>
          <table className="params-table">
            <thead>
              <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>CPF</td><td><code className="code-block">str</code></td><td>CPF (validação desabilitada)</td></tr>
              <tr><td>Telefones</td><td><code className="code-block">list[str]</code></td><td>Lista de telefones</td></tr>
              <tr><td>UF</td><td><code className="code-block">str</code></td><td>UF do reclamante</td></tr>
            </tbody>
          </table>

          <h4>Validação de CPF</h4>
          <ul>
            <li>validate_first=False → Não valida dígitos verificadores</li>
            <li>Permite CPFs inválidos (dados LEMIT podem ter CPFs inconsistentes)</li>
          </ul>

          <h4>TypeId</h4>
          <p>2 (Pessoa)</p>

          <h4>Tag Retornada</h4>
          <p><code className="code-block">ContactTags.RECLAMANTE</code></p>
        </div>

        <div className="method-block">
          <h3 id="_create_phones_list">_create_phones_list</h3>
          <CodeBlock
            code={`def _create_phones_list(self, telefones: list[str]) -> list[dict[str, Any]]`}
          />
          <p><strong>Descrição:</strong> Cria lista de telefones no formato esperado pelo Ploomes.</p>

          <h4>Estrutura de Telefone</h4>
          <CodeBlock
            code={`{
    "PhoneNumber": str,  # Formatado
    "SearchPhoneNumber": int,
    "TypeId": 1,
    "CountryId": None
}`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>DealMapper</h2>

        <div className="method-block">
          <h3 id="map_to_ploomes_deal">map_to_ploomes</h3>
          <CodeBlock
            code={`def map_to_ploomes(
    self,
    deal_data: PloomesImportModel,
    reclamante_id: Optional[int],
    escritorio_id: Optional[int],
    advogado_id: Optional[int]
) -> Dict[str, Any]`}
          />
          <p><strong>Descrição:</strong> Mapeia dados do negócio para formato do Ploomes.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>deal_data</td><td><code className="code-block">PloomesImportModel</code></td><td>Dados do negócio</td></tr>
              <tr><td>reclamante_id</td><td><code className="code-block">int</code></td><td>ID do reclamante (opcional)</td></tr>
              <tr><td>escritorio_id</td><td><code className="code-block">int</code></td><td>ID do escritório (opcional)</td></tr>
              <tr><td>advogado_id</td><td><code className="code-block">int</code></td><td>ID do advogado (opcional)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="doc-section">
        <h2>ContactMapperFactory</h2>

        <div className="method-block">
          <h3 id="factory_get_escritorio_mapper">get_escritorio_mapper</h3>
          <CodeBlock
            code={`def get_escritorio_mapper(self) -> EscritorioMapper`}
          />
          <p><strong>Descrição:</strong> Retorna instância de EscritorioMapper.</p>
        </div>

        <div className="method-block">
          <h3 id="factory_get_advogado_mapper">get_advogado_mapper</h3>
          <CodeBlock
            code={`def get_advogado_mapper(self) -> AdvogadoMapper`}
          />
          <p><strong>Descrição:</strong> Retorna instância de AdvogadoMapper.</p>
        </div>

        <div className="method-block">
          <h3 id="factory_get_reclamante_mapper">get_reclamante_mapper</h3>
          <CodeBlock
            code={`def get_reclamante_mapper(self) -> ReclamanteMapper`}
          />
          <p><strong>Descrição:</strong> Retorna instância de ReclamanteMapper.</p>
        </div>

        <div className="method-block">
          <h3 id="factory_get_deal_mapper">get_deal_mapper</h3>
          <CodeBlock
            code={`def get_deal_mapper(self) -> DealMapper`}
          />
          <p><strong>Descrição:</strong> Retorna instância de DealMapper.</p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Exemplos de Uso</h2>

        <h3>Exemplo 1: Mapper de Escritório</h3>
        <CodeBlock
          code={`mapper = factory.get_escritorio_mapper()

# Pessoa Jurídica
escritorio_pj = {
    "Nome": "Silva Advogados",
    "CNPJ": "12345678000190",
    "Pessoa_Física": "Não",
    "Origem": "Site"
}
contact, tag_id = mapper.map_to_ploomes(escritorio_pj)

# Pessoa Física
escritorio_pf = {
    "Nome": "Dr. João Silva",
    "Pessoa_Física": "Sim",
    "CPF": "12345678900"
}
contact, tag_id = mapper.map_to_ploomes(escritorio_pf)`}
        />

        <h3>Exemplo 2: Mapper de Advogado</h3>
        <CodeBlock
          code={`mapper = factory.get_advogado_mapper()

advogado_data = {
    "Nome": "Dr. João Silva",
    "CPF": "12345678900",
    "OAB": "SP123456",
    "Cidade": "São Paulo",
    "E-mail 1": "joao@silva.com"
}

contact, tag_id = mapper.map_to_ploomes(
    advogado_data,
    company_id=12345
)`}
        />

        <h3>Exemplo 3: Mapper de Reclamante</h3>
        <CodeBlock
          code={`mapper = factory.get_reclamante_mapper()

reclamante_data = {
    "Nome": "Maria Santos",
    "CPF": "98765432100",
    "Telefones": ["11987654321", "11912345678"],
    "UF": "SP"
}

contact, tag_id = mapper.map_to_ploomes(reclamante_data)`}
        />
      </section>
    </div>
  );
}

export default ContactMapperPage;

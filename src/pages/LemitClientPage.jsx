import CodeBlock from "../components/CodeBlock";

function LemitClientPage() {
  return (
    <div className="doc-page">
      <h1>Classe: LemitClient</h1>
      <p className="doc-subtitle">
        Automação de consultas no sistema LEMIT utilizando API REST e Selenium.
      </p>

      <section className="doc-section">
        <h2>Visão Geral</h2>
        <p>
          O módulo <code className="code-block">LemitClient</code> é responsável por automatizar consultas no sistema 
          LEMIT, utilizando tanto API REST quanto automação via Selenium para operações que requerem interface web.
        </p>

        <h3>Responsabilidades</h3>
        <table className="params-table">
          <thead>
            <tr><th>Responsabilidade</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>Consulta API</td><td>Consulta pessoas e empresas via API REST</td></tr>
            <tr><td>Enriquecimento</td><td>Enriquece dados com telefones e emails</td></tr>
            <tr><td>Automação Web</td><td>Login, upload de CSV e download de resultados</td></tr>
            <tr><td>Processamento Batch</td><td>Upload de lotes de CPFs para processamento</td></tr>
            <tr><td>Validação</td><td>Valida e formata dados (CPF, CNPJ, telefones)</td></tr>
          </tbody>
        </table>
      </section>

      <section className="doc-section">
        <h2>Métodos de API REST</h2>

        <div className="method-block">
          <h3 id="consultar_pessoa_por_cpf">consultar_pessoa_por_cpf</h3>
          <CodeBlock
            code={`def consultar_pessoa_por_cpf(self, cpf: str) -> dict | None`}
          />
          <p><strong>Descrição:</strong> Consulta dados de uma pessoa por CPF via API LEMIT.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>cpf</td><td><code className="code-block">str</code></td><td>CPF (apenas números)</td></tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p><code className="code-block">dict | None</code> - Dados da pessoa ou None em caso de erro</p>

          <h4>Endpoint</h4>
          <p>POST /api/v1/consulta/pessoa/</p>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`dados = client.consultar_pessoa_por_cpf("14821139456")
if dados:
    print(f"Nome: {dados.get('nome')}")`}
          />
        </div>

        <div className="method-block">
          <h3 id="get_advogados_socios">get_advogados_socios</h3>
          <CodeBlock
            code={`def get_advogados_socios(self, cnpj: str) -> list[dict]`}
          />
          <p><strong>Descrição:</strong> Consulta advogados sócios de um escritório via API LEMIT.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>cnpj</td><td><code className="code-block">str</code></td><td>CNPJ (apenas números)</td></tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p><code className="code-block">list[dict]</code> - Lista de sócios (vazia se erro)</p>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`socios = client.get_advogados_socios("07617044000104")
for socio in socios:
    print(f"{socio['nome']} - CPF: {socio['cpf']}")`}
          />
        </div>

        <div className="method-block">
          <h3 id="consultar_pessoa_por_nome">consultar_pessoa_por_nome</h3>
          <CodeBlock
            code={`def consultar_pessoa_por_nome(
    self,
    nome: str,
    uf: str = None,
    enriched: bool = False
) -> dict | None`}
          />
          <p><strong>Descrição:</strong> Consulta dados de uma pessoa por nome via API LEMIT.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Padrão</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>nome</td><td><code className="code-block">str</code></td><td>-</td><td>Nome completo ou parcial</td></tr>
              <tr><td>uf</td><td><code className="code-block">str</code></td><td>None</td><td>UF para filtrar resultados</td></tr>
              <tr><td>enriched</td><td><code className="code-block">bool</code></td><td>False</td><td>(Não utilizado)</td></tr>
            </tbody>
          </table>

          <h4>Endpoint</h4>
          <p>GET /api/v1/consulta/nome/{`{nome}`}</p>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`# Sem filtro de UF
dados = client.consultar_pessoa_por_nome("João da Silva")

# Com filtro de UF
dados = client.consultar_pessoa_por_nome("João da Silva", uf="RS")`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos de Enriquecimento</h2>

        <div className="method-block">
          <h3 id="enriquecer_contato_com_cpf">enriquecer_contato_com_cpf</h3>
          <CodeBlock
            code={`def enriquecer_contato_com_cpf(self, cpf: str) -> dict`}
          />
          <p><strong>Descrição:</strong> Enriquece dados de contato consultando CPF na API LEMIT.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>cpf</td><td><code className="code-block">str</code></td><td>CPF (números ou formatado)</td></tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <CodeBlock
            code={`{
    "telefones": ["11987654321", "11912345678"],  # Máximo 4
    "emails": ["email@example.com"],  # Máximo 3
    "dados_completos": {...},  # Resposta completa da API
}`}
          />

          <h4>Comportamento</h4>
          <ul>
            <li>Se não encontrado: {`{"telefones": ["Não encontrado"], "emails": ["Não encontrado"]}`}</li>
            <li>Telefones ordenados por: WhatsApp primeiro, depois por ranking</li>
            <li>Emails ordenados por: ranking (menor = melhor)</li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`dados = client.enriquecer_contato_com_cpf("12345678900")
print(dados['telefones'])  # ['11987654321', '11912345678']
print(dados['emails'])  # ['email@example.com']`}
          />
        </div>

        <div className="method-block">
          <h3 id="enriquecer_contato_com_nome">enriquecer_contato_com_nome</h3>
          <CodeBlock
            code={`def enriquecer_contato_com_nome(
    self,
    nome: str,
    uf: str = None,
    expand: bool = True
) -> dict`}
          />
          <p><strong>Descrição:</strong> Enriquece dados de contato consultando nome na API LEMIT.</p>

          <h4>Estratégia em 2 etapas</h4>
          <ol>
            <li>Consulta por nome para obter CPF</li>
            <li>Se houver exatamente 1 resultado, consulta por CPF para obter telefones/emails</li>
          </ol>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Padrão</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>nome</td><td><code className="code-block">str</code></td><td>-</td><td>Nome completo</td></tr>
              <tr><td>uf</td><td><code className="code-block">str</code></td><td>None</td><td>UF para filtrar</td></tr>
              <tr><td>expand</td><td><code className="code-block">bool</code></td><td>True</td><td>Se False, retorna apenas CPF</td></tr>
            </tbody>
          </table>

          <h4>Retorno - Sucesso (1 resultado)</h4>
          <CodeBlock
            code={`{
    "telefones": ["11987654321"],
    "emails": ["email@example.com"],
    "cpf": "12345678900",
    "dados_completos": {...},
}`}
          />

          <h4>Retorno - Não encontrado</h4>
          <CodeBlock
            code={`{
    "telefones": ["Não encontrado"],
    "emails": ["Não encontrado"],
    "cpf": "Não encontrado",
}`}
          />

          <h4>Retorno - Múltiplos resultados</h4>
          <CodeBlock
            code={`{
    "telefones": ["Múltiplos resultados"],
    "emails": ["Múltiplos resultados"],
    "cpf": "Múltiplos resultados",
}`}
          />

          <h4>Exemplo</h4>
          <CodeBlock
            code={`# Caso encontre 1 resultado
dados = client.enriquecer_contato_com_nome("João Silva", uf="SP")
print(dados['cpf'])  # '12345678900'
print(dados['telefones'])  # ['11987654321']

# Caso não encontrado
dados = client.enriquecer_contato_com_nome("Nome Inexistente")
print(dados['telefones'])  # ['Não encontrado']

# Caso múltiplos resultados
dados = client.enriquecer_contato_com_nome("João Silva")
print(dados['cpf'])  # 'Múltiplos resultados'`}
          />
        </div>

        <div className="method-block">
          <h3 id="consultar">consultar</h3>
          <CodeBlock
            code={`def consultar(self, chave_consulta: str) -> dict`}
          />
          <p><strong>Descrição:</strong> Interface unificada para consulta (CPF ou nome).</p>

          <h4>Detecção Automática</h4>
          <ul>
            <li>Se apenas dígitos e 11 caracteres → CPF</li>
            <li>Caso contrário → Nome</li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`# Consulta por CPF
dados = client.consultar("12345678900")
print(dados['telefones'])  # ['11987654321']

# Consulta por nome
dados = client.consultar("João Silva")
print(dados['cpf'])  # '12345678900'`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos de Automação Web</h2>

        <div className="method-block">
          <h3 id="setup_driver">setup_driver</h3>
          <CodeBlock
            code={`def setup_driver(self) -> bool`}
          />
          <p><strong>Descrição:</strong> Configura o WebDriver Selenium com ChromeOptions.</p>

          <h4>Retorno</h4>
          <p><code className="code-block">bool</code> - True se sucesso, False se erro</p>
        </div>

        <div className="method-block">
          <h3 id="login">login</h3>
          <CodeBlock
            code={`def login(self) -> bool`}
          />
          <p><strong>Descrição:</strong> Realiza login no sistema LEMIT via Selenium.</p>

          <h4>Workflow</h4>
          <ol>
            <li>Navega para página de login</li>
            <li>Preenche username</li>
            <li>Preenche password</li>
            <li>Clica em "Entrar"</li>
            <li>Aguarda redirecionamento</li>
          </ol>
        </div>

        <div className="method-block">
          <h3 id="navigate_to_cpf_query_page">navigate_to_cpf_query_page</h3>
          <CodeBlock
            code={`def navigate_to_cpf_query_page(self) -> bool`}
          />
          <p><strong>Descrição:</strong> Navega até a página de consulta de CPF.</p>
        </div>

        <div className="method-block">
          <h3 id="upload_cpf_file">upload_cpf_file</h3>
          <CodeBlock
            code={`def upload_cpf_file(self, file_path: str) -> bool`}
          />
          <p><strong>Descrição:</strong> Faz upload de arquivo CSV com CPFs.</p>

          <h4>Validações</h4>
          <ul>
            <li>Arquivo existe</li>
            <li>Extensão .csv</li>
            <li>Formato válido</li>
          </ul>

          <h4>Workflow</h4>
          <ol>
            <li>Localiza input de arquivo</li>
            <li>Envia caminho do arquivo</li>
            <li>Aguarda upload</li>
            <li>Clica em "Processar"</li>
          </ol>
        </div>

        <div className="method-block">
          <h3 id="wait_for_processing_and_download">wait_for_processing_and_download</h3>
          <CodeBlock
            code={`def wait_for_processing_and_download(
    self,
    timeout: int = None,
    check_interval: int = None
) -> str | None`}
          />
          <p><strong>Descrição:</strong> Aguarda processamento e baixa resultados.</p>

          <h4>Workflow</h4>
          <ol>
            <li>Aguarda processamento concluir (polling)</li>
            <li>Clica em "Download"</li>
            <li>Aguarda arquivo ser baixado</li>
            <li>Retorna caminho do arquivo</li>
          </ol>

          <h4>Retorno</h4>
          <p><code className="code-block">str | None</code> - Caminho do arquivo baixado ou None</p>
        </div>

        <div className="method-block">
          <h3 id="close">close</h3>
          <CodeBlock
            code={`def close(self) -> None`}
          />
          <p><strong>Descrição:</strong> Fecha o WebDriver e limpa recursos.</p>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`try:
    client.setup_driver()
    client.login()
    # ... operações
finally:
    client.close()`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Exemplos de Uso</h2>

        <h3>Exemplo 1: Consulta Simples por CPF</h3>
        <CodeBlock
          code={`from src.lemit_automation import LemitClient

client = LemitClient()

# Consulta por CPF
dados = client.consultar_pessoa_por_cpf("14821139456")
if dados:
    print(f"Nome: {dados['pessoa']['nome']}")
    print(f"Telefones: {dados['pessoa']['celulares']}")`}
        />

        <h3>Exemplo 2: Enriquecimento de Contato</h3>
        <CodeBlock
          code={`client = LemitClient()

# Enriquecer com CPF
dados = client.enriquecer_contato_com_cpf("12345678900")
print(f"Telefones: {dados['telefones']}")
print(f"Emails: {dados['emails']}")

# Enriquecer com nome
dados = client.enriquecer_contato_com_nome("João Silva", uf="SP")
print(f"CPF: {dados['cpf']}")`}
        />

        <h3>Exemplo 3: Automação Web Completa</h3>
        <CodeBlock
          code={`from src.lemit_automation import LemitClient

client = LemitClient()

try:
    # Setup e login
    if not client.setup_driver():
        raise Exception("Falha ao configurar driver")
    
    if not client.login():
        raise Exception("Falha no login")
    
    # Navegar e fazer upload
    if client.navigate_to_cpf_query_page():
        if client.upload_cpf_file("cpfs.csv"):
            # Aguardar e baixar
            result_file = client.wait_for_processing_and_download()
            if result_file:
                print(f"✅ Arquivo baixado: {result_file}")
finally:
    client.close()`}
        />

        <h3>Exemplo 4: Consulta de Sócios</h3>
        <CodeBlock
          code={`client = LemitClient()

cnpj = "07617044000104"
socios = client.get_advogados_socios(cnpj)

print(f"Escritório possui {len(socios)} sócios:")
for socio in socios:
    print(f"  - {socio['nome']}")
    print(f"    CPF: {socio['cpf']}")
    print(f"    Qualificação: {socio['qualificacao']}")`}
        />
      </section>
    </div>
  );
}

export default LemitClientPage;

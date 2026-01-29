import CodeBlock from "../components/CodeBlock";

function ContactServicePage() {
  return (
    <div className="doc-page">
      <h1>Classe: ContactService</h1>
      <p className="doc-subtitle">
        Orquestração de alto nível de contatos no Ploomes, incluindo criação, atualização e aplicação de tags.
      </p>

      <section className="doc-section">
        <h2>Visão Geral</h2>
        <p>
          O módulo <code className="code-block">ContactService</code> é responsável pela orquestração de alto nível 
          de contatos no Ploomes, incluindo criação, atualização e aplicação de tags.
        </p>

        <h3>Responsabilidades</h3>
        <table className="params-table">
          <thead>
            <tr><th>Responsabilidade</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>Upsert</td><td>Cria ou atualiza contatos com retry</td></tr>
            <tr><td>Mapeamento</td><td>Transforma DTOs de domínio em payloads Ploomes</td></tr>
            <tr><td>Tagging</td><td>Aplica e gerencia tags de contatos</td></tr>
            <tr><td>Validação</td><td>Verifica campos preenchidos antes de atualizar</td></tr>
            <tr><td>Observabilidade</td><td>Métricas e logging estruturado</td></tr>
            <tr><td>B2B Check</td><td>Verifica existência de deals no pipeline B2B</td></tr>
          </tbody>
        </table>

        <h3>Dependências</h3>
        <CodeBlock
          code={`from __future__ import annotations

import logging
import time
from typing import Any, Dict, Optional, Tuple

from src.utils.human_behavior import HumanBehavior
from src.utils.metrics import get_metrics_registry
from src.utils.logger import get_correlation_id

from ..api import PloomesAPI
from ..exceptions import ContactCreationError, PloomesAPIError
from src.utils.validator import ValidationError
from ..utils.contact_mapper import ContactMapperFactory
from ..models import AdvogadoData, EscritorioData, ReclamanteData`}
        />
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
    logger: logging.Logger,
):`}
          />
          <p><strong>Descrição:</strong> Inicializa o serviço de contatos.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>api</td>
                <td><code className="code-block">PloomesAPI</code></td>
                <td>Cliente da API Ploomes</td>
              </tr>
              <tr>
                <td>mapper_factory</td>
                <td><code className="code-block">ContactMapperFactory</code></td>
                <td>Factory de mappers</td>
              </tr>
              <tr>
                <td>logger</td>
                <td><code className="code-block">logging.Logger</code></td>
                <td>Logger configurado</td>
              </tr>
            </tbody>
          </table>

          <h4>Atributos Inicializados</h4>
          <table className="params-table">
            <thead>
              <tr><th>Atributo</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>self.api</td><td><code className="code-block">PloomesAPI</code></td><td>Cliente API</td></tr>
              <tr><td>self.mapper_factory</td><td><code className="code-block">ContactMapperFactory</code></td><td>Factory de mappers</td></tr>
              <tr><td>self.logger</td><td><code className="code-block">logging.Logger</code></td><td>Logger</td></tr>
              <tr><td>self.human_behavior</td><td><code className="code-block">HumanBehavior</code></td><td>Helper para delays</td></tr>
              <tr><td>self._metrics</td><td><code className="code-block">ServiceMetrics</code></td><td>Registro de métricas</td></tr>
              <tr><td>self._created_count</td><td><code className="code-block">int</code></td><td>Contador de criações</td></tr>
              <tr><td>self._updated_count</td><td><code className="code-block">int</code></td><td>Contador de atualizações</td></tr>
              <tr><td>self._skipped_count</td><td><code className="code-block">int</code></td><td>Contador de skips</td></tr>
            </tbody>
          </table>
        </div>

        <div className="method-block">
          <h3 id="get_stats">get_stats</h3>
          <CodeBlock
            code={`def get_stats(self) -> Dict[str, Any]`}
          />
          <p><strong>Descrição:</strong> Retorna estatísticas do serviço de contatos.</p>

          <h4>Retorno</h4>
          <p><code className="code-block">Dict[str, Any]</code> - Estatísticas de operações</p>

          <h4>Estrutura do Retorno</h4>
          <CodeBlock
            code={`{
    "created_count": int,
    "updated_count": int,
    "skipped_count": int,
    "total_operations": int,
    "success_rate": float,
    "average_latency_ms": float,
}`}
          />

          <h4>Exemplo</h4>
          <CodeBlock
            code={`stats = service.get_stats()
print(f"Criados: {stats['created_count']}")
print(f"Taxa de sucesso: {stats['success_rate']*100:.1f}%")
print(f"Latência média: {stats['average_latency_ms']:.2f}ms")`}
          />
        </div>

        <div className="method-block">
          <h3 id="upsert_contact">upsert_contact</h3>
          <CodeBlock
            code={`def upsert_contact(self, body: Dict, max_retries: int = 3) -> Dict`}
          />
          <p><strong>Descrição:</strong> Cria ou atualiza um contato no Ploomes.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Padrão</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>body</td><td><code className="code-block">Dict</code></td><td>-</td><td>Dados do contato</td></tr>
              <tr><td>max_retries</td><td><code className="code-block">int</code></td><td>3</td><td>Número máximo de tentativas</td></tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p><code className="code-block">Dict</code> - Dados do contato com flags adicionais</p>

          <h4>Flags Adicionais no Retorno</h4>
          <table className="params-table">
            <thead>
              <tr><th>Flag</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>_was_updated</td><td><code className="code-block">bool</code></td><td>True se atualizado</td></tr>
              <tr><td>_was_created</td><td><code className="code-block">bool</code></td><td>True se criado</td></tr>
              <tr><td>_was_skipped</td><td><code className="code-block">bool</code></td><td>True se pulado</td></tr>
              <tr><td>_skip_reason</td><td><code className="code-block">str</code></td><td>Motivo do skip</td></tr>
              <tr><td>_has_b2b_deal</td><td><code className="code-block">bool</code></td><td>True se tem deal B2B (apenas type_id=1)</td></tr>
            </tbody>
          </table>

          <h4>Exceções</h4>
          <ul>
            <li><code className="code-block">ValidationError</code> - Dados inválidos</li>
            <li><code className="code-block">ContactCreationError</code> - Falha na criação após retries</li>
          </ul>

          <h4>Workflow</h4>
          <CodeBlock
            code={`1. Valida body (não None, Name obrigatório)
2. Busca contato existente por (Name, TypeId)
3. Se existir:
   a. Verifica campos preenchidos
   b. Se campos OK: atualiza
   c. Se campos NOK: skip
4. Se não existir:
   a. Cria novo contato
5. Se type_id=1 (Escritório):
   a. Verifica deal B2B
6. Retorna contato com flags`}
          />

          <h4>Validações de Skip</h4>
          <table className="params-table">
            <thead>
              <tr><th>TypeId</th><th>Campo Verificado</th><th>Motivo de Skip</th></tr>
            </thead>
            <tbody>
              <tr><td>1 (Escritório)</td><td>Register (CNPJ/CPF)</td><td>"Register (CNPJ/CPF) já preenchido"</td></tr>
              <tr><td>2 (Advogado)</td><td>contact_C40CB3B4-F8DA-4A92-8F96-93F27DA1516F (OAB)</td><td>"OAB já preenchida"</td></tr>
            </tbody>
          </table>

          <h4>Retry Strategy</h4>
          <ul>
            <li>Retry em status codes: 408, 429, 500, 502, 503, 504</li>
            <li>Backoff exponencial: 2^attempt segundos</li>
            <li>Delay com HumanBehavior.human_like_delay()</li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`body = {
    "Name": "Silva Advogados",
    "TypeId": 1,
    "Register": "12345678000190",
    "OtherProperties": []
}

result = service.upsert_contact(body, max_retries=3)

if result.get("_was_created"):
    print(f"✅ Criado: ID {result['Id']}")
elif result.get("_was_updated"):
    print(f"🔄 Atualizado: ID {result['Id']}")
elif result.get("_was_skipped"):
    print(f"⏭️ Pulado: {result['_skip_reason']}")

if result.get("_has_b2b_deal"):
    print("📋 Já possui deal B2B")`}
          />
        </div>

        <div className="method-block">
          <h3 id="apply_tag">apply_tag</h3>
          <CodeBlock
            code={`def apply_tag(self, contact_id: int, tag_id: int) -> None`}
          />
          <p><strong>Descrição:</strong> Aplica uma tag ao contato.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>contact_id</td><td><code className="code-block">int</code></td><td>ID do contato</td></tr>
              <tr><td>tag_id</td><td><code className="code-block">int</code></td><td>ID da tag</td></tr>
            </tbody>
          </table>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`from ..models import ContactTags

service.apply_tag(
    contact_id=12345,
    tag_id=ContactTags.ESCRITORIO
)`}
          />
        </div>

        <div className="method-block">
          <h3 id="apply_tag_if_missing">apply_tag_if_missing</h3>
          <CodeBlock
            code={`def apply_tag_if_missing(self, contact: Dict, tag_id: int) -> bool`}
          />
          <p><strong>Descrição:</strong> Aplica uma tag ao contato apenas se ele ainda não a possui.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>contact</td><td><code className="code-block">Dict</code></td><td>Dados do contato (deve incluir Tags se expandido)</td></tr>
              <tr><td>tag_id</td><td><code className="code-block">int</code></td><td>ID da tag a aplicar</td></tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p><code className="code-block">bool</code> - True se tag foi aplicada, False se já existia</p>

          <h4>Validações</h4>
          <ul>
            <li>Se tag_id é None: retorna False</li>
            <li>Se contact_id não existe: retorna False</li>
            <li>Se Tags expandido e tag já existe: retorna False</li>
          </ul>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`# Busca contato com Tags expandido
contact = api.get_contact_by_name_and_type(
    "Silva Advogados",
    type_id=1,
    expand_tags=True
)

# Aplica tag apenas se necessário
applied = service.apply_tag_if_missing(
    contact,
    ContactTags.ESCRITORIO
)

if applied:
    print("✅ Tag aplicada")
else:
    print("ℹ️ Tag já existia")`}
          />
        </div>

        <div className="method-block">
          <h3 id="map_escritorio">map_escritorio</h3>
          <CodeBlock
            code={`def map_escritorio(self, data: EscritorioData) -> Tuple[Dict, int]`}
          />
          <p><strong>Descrição:</strong> Mapeia dados do escritório para formato Ploomes.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>data</td><td><code className="code-block">EscritorioData</code></td><td>Dados do escritório</td></tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p><code className="code-block">Tuple[Dict, int]</code> - (payload, tag_id)</p>
        </div>

        <div className="method-block">
          <h3 id="map_advogado">map_advogado</h3>
          <CodeBlock
            code={`def map_advogado(
    self,
    data: AdvogadoData,
    company_id: Optional[int] = None
) -> Tuple[Dict, int]`}
          />
          <p><strong>Descrição:</strong> Mapeia dados do advogado para formato Ploomes.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>data</td><td><code className="code-block">AdvogadoData</code></td><td>Dados do advogado</td></tr>
              <tr><td>company_id</td><td><code className="code-block">int</code></td><td>ID da empresa (opcional)</td></tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p><code className="code-block">Tuple[Dict, int]</code> - (payload, tag_id)</p>
        </div>

        <div className="method-block">
          <h3 id="map_reclamante">map_reclamante</h3>
          <CodeBlock
            code={`def map_reclamante(self, data: ReclamanteData) -> Tuple[Dict, int]`}
          />
          <p><strong>Descrição:</strong> Mapeia dados do reclamante para formato Ploomes.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>data</td><td><code className="code-block">ReclamanteData</code></td><td>Dados do reclamante</td></tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p><code className="code-block">Tuple[Dict, int]</code> - (payload, tag_id)</p>
        </div>

        <div className="method-block">
          <h3 id="_check_b2b_deal">_check_b2b_deal</h3>
          <CodeBlock
            code={`def _check_b2b_deal(self, contact_id: int) -> bool`}
          />
          <p><strong>Descrição:</strong> Verifica se o contato já possui um deal no pipeline 'B2B - Escritórios BT BLUE'.</p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr><td>contact_id</td><td><code className="code-block">int</code></td><td>ID do contato</td></tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <p><code className="code-block">bool</code> - True se possui deal B2B</p>

          <h4>Lógica</h4>
          <ol>
            <li>Busca deals do contato via api.get_deals_by_contact_id()</li>
            <li>Para cada deal:
              <ul>
                <li>Extrai Pipeline.Name</li>
                <li>Compara case-insensitive com "b2b - escritórios bt blue"</li>
              </ul>
            </li>
            <li>Retorna True se encontrar match</li>
          </ol>
        </div>
      </section>

      <section className="doc-section">
        <h2>Observabilidade</h2>

        <h3>Métricas Coletadas</h3>
        <table className="params-table">
          <thead>
            <tr><th>Métrica</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>created_count</td><td>Counter</td><td>Total de contatos criados</td></tr>
            <tr><td>updated_count</td><td>Counter</td><td>Total de contatos atualizados</td></tr>
            <tr><td>skipped_count</td><td>Counter</td><td>Total de contatos pulados</td></tr>
            <tr><td>total_operations</td><td>Counter</td><td>Total de operações</td></tr>
            <tr><td>success_rate</td><td>Gauge</td><td>Taxa de sucesso (0.0-1.0)</td></tr>
            <tr><td>average_latency_ms</td><td>Gauge</td><td>Latência média em ms</td></tr>
          </tbody>
        </table>

        <h3>Logging Estruturado</h3>
        <p><strong>Correlation ID:</strong> Todas as operações incluem correlation_id para rastreamento</p>

        <h4>Exemplos de Logs</h4>
        <CodeBlock
          code={`[abc123] ➕ Criando novo contato: Silva Advogados…
[abc123] ✓ Contato criado: Silva Advogados (ID 12345) (123.45ms)
[abc123] 🔄 Atualizando contato existente: Dr. João Silva (ID 67890)…
[abc123] ✓ Contato atualizado: Dr. João Silva (98.76ms)
[abc123] ⏭️ Pulando atualização de Silva Advogados (ID 12345): Register (CNPJ/CPF) já preenchido
[abc123] ✅ Contato Silva Advogados já possui deal no pipeline B2B
[abc123] 🔄 Retentando em 2s (tentativa 1/3) — HTTP 429: Rate limit exceeded`}
        />
      </section>

      <section className="doc-section">
        <h2>Exemplos de Uso</h2>

        <h3>Exemplo 1: Criar Escritório</h3>
        <CodeBlock
          code={`from src.ploomes_integration.services import ContactService
from src.ploomes_integration.api import PloomesAPI
from src.ploomes_integration.utils.contact_mapper import ContactMapperFactory

api = PloomesAPI(...)
mapper_factory = ContactMapperFactory(field_mappings, logger)
service = ContactService(api, mapper_factory, logger)

# Mapear dados
escritorio_data = {
    "Nome": "Silva & Associados",
    "CNPJ": "12345678000190",
    "Pessoa_Física": "Não",
    "Origem": "Site"
}
payload, tag_id = service.map_escritorio(escritorio_data)

# Criar/atualizar
result = service.upsert_contact(payload)

# Aplicar tag se criado
if result.get("_was_created"):
    service.apply_tag(result["Id"], tag_id)`}
        />

        <h3>Exemplo 2: Criar Advogado com Empresa</h3>
        <CodeBlock
          code={`advogado_data = {
    "Nome": "Dr. João Silva",
    "CPF": "12345678900",
    "OAB": "SP123456",
    "Cidade": "São Paulo",
    "E-mail 1": "joao@silva.com.br"
}

# Buscar ID do escritório
escritorio = api.get_contact_by_name_and_type("Silva Advogados", 1)
company_id = escritorio.get("Id") if escritorio else None

# Mapear e criar
payload, tag_id = service.map_advogado(advogado_data, company_id)
result = service.upsert_contact(payload)

if result.get("_was_created"):
    service.apply_tag(result["Id"], tag_id)`}
        />

        <h3>Exemplo 3: Tratamento de Skips</h3>
        <CodeBlock
          code={`# Escritório com CNPJ já preenchido
escritorio_data = {
    "Nome": "Silva Advogados",  # Já existe
    "CNPJ": "12345678000190",
    "Pessoa_Física": "Não"
}

payload, tag_id = service.map_escritorio(escritorio_data)
result = service.upsert_contact(payload)

if result.get("_was_skipped"):
    print(f"⏭️ Skip: {result['_skip_reason']}")
    # Output: "Register (CNPJ/CPF) já preenchido"

# Verificar se tem deal B2B
if result.get("_has_b2b_deal"):
    print("📋 Já possui deal B2B, não criar novo")`}
        />
      </section>
    </div>
  );
}

export default ContactServicePage;

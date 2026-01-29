# Classe: PloomesAPI

> Cliente HTTP especializado para comunicação direta com a API do Ploomes.

## Descrição

A classe `PloomesAPI` é responsável exclusivamente pelas chamadas HTTP diretas para os endpoints do Ploomes. Implementa observabilidade completa com métricas, logging estruturado e tratamento robusto de erros, mantendo-se livre de lógica de negócio ou orquestração.

---

## Classe `PloomesAPI` (`api.py`)

```python
class PloomesAPI:
```

Cliente HTTP especializado para interações diretas com a API Ploomes.

**Responsabilidades:**

- Chamadas HTTP diretas aos endpoints Ploomes
- Autenticação e configuração de sessão
- Instrumentação com métricas de observabilidade
- Logging estruturado com correlation_id
- Tradução robusta de erros HTTP
- Cache estratégico para consultas frequentes

**Princípios:**

- **Single Responsibility**: Apenas interações HTTP
- **Stateless**: Sem lógica de negócio ou fluxo
- **Observable**: Todas as operações instrumentadas
- **Resilient**: Tratamento robusto de erros de rede

---

### Inicialização

#### `__init__`

```python
def __init__(self, environment: Optional[str], logger: logging.Logger) -> None:
```

Inicializa cliente API com configuração e observabilidade.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `environment` | `Optional[str]` | Ambiente (prod/sandbox) |
| `logger` | `logging.Logger` | Logger para instrumentação |

**Configuração automática:**

| Atributo           | Fonte                     | Descrição                |
| ------------------ | ------------------------- | ------------------------ |
| `base_url`         | `config.get_base_url()`   | URL base da API          |
| `user_key`         | `config.PLOOMES_USER_KEY` | Chave de autenticação    |
| `timeout`          | `config.TIMEOUT`          | Timeout para requisições |
| `rate_limit_delay` | `config.RATE_LIMIT_DELAY` | Delay entre requests     |

**Sessão HTTP otimizada:**

```python
# Configuração de pool de conexões
adapter = HTTPAdapter(
    pool_connections=config.HTTP_ADAPTER_POOL_CONNECTIONS,
    pool_maxsize=config.HTTP_ADAPTER_POOL_MAXSIZE,
    max_retries=config.HTTP_ADAPTER_MAX_RETRIES,
)
```

**Headers padrão:**

```python
{
    "User-Key": "sua_user_key_aqui",
    "Content-Type": "application/json"
}
```

**Observabilidade inicializada:**

- Registry de métricas específico para API
- Contador de requisições
- Cache para escritórios com advogado principal

**Validação na inicialização:**

- Testa user-key via endpoint `/Contacts?$top=1`
- Levanta `InvalidUserKeyError` se inválida
- Log de confirmação da inicialização

---

### Sistema de Observabilidade

#### `_handle_request`

```python
def _handle_request(self, method: str, url: str, **kwargs) -> requests.Response:
```

Executa requisição HTTP com instrumentação completa de observabilidade.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `method` | `str` | Método HTTP (GET, POST, PATCH) |
| `url` | `str` | URL da requisição |
| `**kwargs` | `Any` | Argumentos para requests |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `requests.Response` | Resposta HTTP validada |

**Instrumentação automática:**

**1. Correlation tracking:**

```python
correlation = get_correlation_id()  # UUID único para rastreamento
```

**2. Métricas de performance:**

```python
operation_name = f"{method}_{url.split('/')[-1].split('(')[0]}"
start_time = time.perf_counter()
duration_ms = (time.perf_counter() - start_time) * 1000
```

**3. Contadores de requisições:**

```python
self._request_count += 1
```

**4. Logging estruturado:**

```python
logger.debug(f"[{correlation}] 🔗 {method} {url} ({duration_ms:.2f}ms)")
```

**5. Registro de métricas:**

```python
self._metrics.record_operation(operation_name, success, duration_ms)
```

**Tratamento de erros específicos:**

| Exceção            | Tratamento           | Nova Exceção      |
| ------------------ | -------------------- | ----------------- |
| `Timeout`          | Log + métricas       | `PloomesAPIError` |
| `ConnectionError`  | Log + métricas       | `PloomesAPIError` |
| `HTTPError`        | Status code analysis | `PloomesAPIError` |
| `RequestException` | Log genérico         | `PloomesAPIError` |

---

#### `get_metrics_summary`

```python
def get_metrics_summary(self) -> Dict:
```

Retorna resumo completo das métricas de API.

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Dict` | Estatísticas de uso e performance |

**Estrutura de retorno:**

```python
{
    "total_requests": 1247,           # Total de requisições
    "success_rate": 0.982,           # Taxa de sucesso (0.0-1.0)
    "average_duration_ms": 245.3,    # Latência média
    "operations": {                  # Métricas por operação
        "GET_Contacts": {
            "count": 450,
            "success_rate": 0.995,
            "avg_duration_ms": 180.2
        },
        "POST_Contacts": {
            "count": 200,
            "success_rate": 0.970,
            "avg_duration_ms": 320.1
        }
        # ... outras operações
    }
}
```

---

### Operações de Contatos

#### `get_contact_by_name_and_type`

```python
def get_contact_by_name_and_type(
    self, name: str, type_id: int, expand_tags: bool = False
) -> Optional[Dict]:
```

Obtém contato pelo nome e tipo com filtros OData.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `name` | `str` | Nome do contato |
| `type_id` | `int` | ID do tipo (1=Empresa, 2=Pessoa) |
| `expand_tags` | `bool` | Se expande tags do contato |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Optional[Dict]` | Dados do contato ou None |

**Construção de filtros:**

```python
# Escaping de caracteres especiais
escaped_name = name.replace("'", "''").replace("&", "%26")

# Filtro OData
params = {"$filter": f"Name eq '{escaped_name}' and TypeId eq {type_id}"}

# Expansão opcional
if expand_tags:
    params["$expand"] = "Tags"
```

**Endpoint:** `GET /Contacts` com filtros

---

#### `check_contact_field_filled`

```python
def check_contact_field_filled(self, contact_id: int, field_key: str) -> bool:
```

Verifica se campo específico do contato está preenchido.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `contact_id` | `int` | ID do contato |
| `field_key` | `str` | Chave do campo personalizado |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `bool` | True se campo preenchido |

**Exemplo de field_key:**

```python
# Campo OAB
field_key = "contact_C40CB3B4-F8DA-4A92-8F96-93F27DA1516F"
```

**Lógica de verificação:**

1. Busca contato por ID com `$select` do campo específico
2. Verifica se campo existe em `OtherProperties`
3. Valida se valor não está vazio/None
4. Retorna boolean indicando preenchimento

---

#### `check_contact_register_filled`

```python
def check_contact_register_filled(self, contact_id: int) -> bool:
```

Verifica se campo Register (CPF/CNPJ) está preenchido.

**Especialização** do `check_contact_field_filled` para campo `Register`.

---

#### `create_contact`

```python
def create_contact(self, body: Dict) -> Dict:
```

Cria novo contato via POST.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `body` | `Dict` | Dados do contato no formato Ploomes |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Dict` | Dados do contato criado |

**Endpoint:** `POST /Contacts`

**Validação automática:**

- Status 201 esperado para criação
- Parsing da resposta JSON
- Tratamento de erros específicos

---

#### `patch_contact`

```python
def patch_contact(self, contact_id: int, body: Dict) -> Dict:
```

Atualiza contato existente via PATCH.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `contact_id` | `int` | ID do contato a atualizar |
| `body` | `Dict` | Campos a serem atualizados |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Dict` | Dados do contato atualizado |

**Endpoint:** `PATCH /Contacts({contact_id})`

---

#### `apply_tag`

```python
def apply_tag(self, contact_id: int, tag_id: int) -> None:
```

Aplica tag a um contato.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `contact_id` | `int` | ID do contato |
| `tag_id` | `int` | ID da tag |

**Endpoint:** `POST /Contacts({contact_id})/Tags`

**Payload:**

```python
{"TagId": tag_id}
```

---

#### `contact_has_tag`

```python
def contact_has_tag(self, contact: Dict, tag_id: int) -> bool:
```

Verifica se contato possui tag específica.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `contact` | `Dict` | Dados do contato (deve incluir Tags) |
| `tag_id` | `int` | ID da tag |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `bool` | True se contato possui a tag |

**Pré-requisito:** Contato deve ter sido obtido com `$expand=Tags`

---

### Operações de Deals/Negócios

#### `get_deal_by_cnj`

```python
def get_deal_by_cnj(self, cnj: str) -> Optional[Dict]:
```

Busca negócio pelo número CNJ.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `cnj` | `str` | Número CNJ do processo |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Optional[Dict]` | Dados do negócio ou None |

**Filtro OData:**

```python
$filter = f"Title eq '{cnj}'"
```

**Endpoint:** `GET /Deals` com filtro

---

#### `create_deal`

```python
def create_deal(self, body: Dict) -> Dict:
```

Cria novo negócio/deal.

**Endpoint:** `POST /Deals`

---

#### `patch_deal`

```python
def patch_deal(self, deal_id: int, body: Dict) -> None:
```

Atualiza negócio existente.

**Endpoint:** `PATCH /Deals({deal_id})`

---

#### `get_stage_by_pipeline_and_name`

```python
def get_stage_by_pipeline_and_name(
    self, pipeline_name: str, stage_name: str
) -> Optional[Dict]:
```

Busca estágio por pipeline e nome.

**Filtro complexo:**

```python
$filter = f"Pipeline/Name eq '{pipeline_name}' and Name eq '{stage_name}'"
$expand = "Pipeline"
```

---

#### `get_deals_by_contact_id`

```python
def get_deals_by_contact_id(self, contact_id: int) -> list[Dict]:
```

Busca todos os negócios de um contato.

**Filtro:**

```python
$filter = f"ContactId eq {contact_id}"
```

---

### Operações Especializadas

#### `get_escritorio_with_advogado_principal`

```python
def get_escritorio_with_advogado_principal(
    self, escritorio_name: str
) -> Optional[Dict]:
```

Busca escritório que possui advogado principal com nome específico.

**Funcionalidade:**

1. **Busca escritório** por nome
2. **Busca advogado principal** associado ao escritório
3. **Validação** se nome do advogado corresponde
4. **Cache** de resultados para otimização

**Cache strategy:**

```python
self._escritorio_cache: Dict[str, Optional[Dict]] = {}
cache_key = escritorio_name.lower().strip()
```

**Fluxo de busca:**

1. Check cache por nome do escritório
2. Se não cached, busca escritório via API
3. Se encontrado, busca advogado principal
4. Valida correspondência de nomes
5. Armazena resultado no cache
6. Retorna escritório + advogado principal

---

#### `get_office_by_name`

```python
def get_office_by_name(self, escritorio_name: str) -> Optional[Dict]:
```

Busca escritório apenas pelo nome (sem advogado principal).

**Filtro:**

```python
$filter = f"Name eq '{escaped_name}' and TypeId eq 1"  # TypeId=1 para empresas
```

---

#### `_find_principal_lawyer`

```python
def _find_principal_lawyer(
    self, escritorio: Dict, escritorio_name: str
) -> Optional[Dict]:
```

Encontra advogado principal de um escritório (método privado).

**Lógica:**

1. Busca pessoas (TypeId=2) associadas ao escritório
2. Filtra por correspondência de nome fuzzy
3. Retorna primeiro match válido

---

### Sistema de Cache

#### Cache de Escritórios

```python
self._escritorio_cache: Dict[str, Optional[Dict]] = {}
```

**Estratégia:**

- **Chave**: Nome do escritório (lowercase, trimmed)
- **Valor**: Dados completos do escritório + advogado principal
- **TTL**: Sem expiração (cache de sessão)
- **Invalidação**: Manual ou reinicialização

**Benefícios:**

- Reduz consultas duplicadas durante processamento
- Acelera verificações de escritórios existentes
- Otimiza operações de deduplicação

---

## Tratamento de Erros

### Tradução de Exceções HTTP

```python
try:
    response = self.session.get(url, **kwargs)
    response.raise_for_status()
    return response
except requests.exceptions.Timeout as e:
    raise PloomesAPIError(f"Timeout na requisição: {e}")
except requests.exceptions.HTTPError as e:
    if e.response.status_code == 401:
        raise InvalidUserKeyError("User-Key inválida ou expirada")
    else:
        raise PloomesAPIError(e.response.status_code, e.response.text)
```

### Categorização por Status Code

| Status Code | Interpretação | Ação                     |
| ----------- | ------------- | ------------------------ |
| 401         | Unauthorized  | `InvalidUserKeyError`    |
| 403         | Forbidden     | Log + `PloomesAPIError`  |
| 404         | Not Found     | Retorno None (para gets) |
| 429         | Rate Limit    | Log + `PloomesAPIError`  |
| 500+        | Server Error  | Log + `PloomesAPIError`  |

---

## Observabilidade Avançada

### Métricas por Endpoint

```python
# Tracking automático por operação
"GET_Contacts": {"count": 450, "success_rate": 0.995}
"POST_Contacts": {"count": 200, "success_rate": 0.970}
"PATCH_Contacts": {"count": 150, "success_rate": 0.980}
"GET_Deals": {"count": 100, "success_rate": 1.000}
```

### Correlation ID Tracking

```python
# Cada requisição tem correlation_id único
logger.debug(f"[{correlation_id}] 🔗 GET /Contacts (245ms) - Success")
```

### Performance Monitoring

```python
# Latência por tipo de operação
average_latency = {
    "GET": 180ms,    # Consultas rápidas
    "POST": 320ms,   # Criações mais lentas
    "PATCH": 290ms   # Atualizações médias
}
```

---

## Exemplos de Uso

### Busca e Criação de Contato

```python
api = PloomesAPI(environment="prod", logger=logger)

# Buscar contato existente
contact = api.get_contact_by_name_and_type(
    name="João Silva Advogados",
    type_id=1,
    expand_tags=True
)

if not contact:
    # Criar novo contato
    contact_data = {
        "Name": "João Silva Advogados",
        "TypeId": 1,
        "Register": "12345678000199"
    }
    contact = api.create_contact(contact_data)
    print(f"✅ Contato criado: ID {contact['Id']}")
else:
    print(f"📋 Contato existente: ID {contact['Id']}")
```

### Verificação de Campos

```python
# Verificar se OAB está preenchida
oab_filled = api.check_contact_field_filled(
    contact_id=123,
    field_key="contact_C40CB3B4-F8DA-4A92-8F96-93F27DA1516F"
)

if not oab_filled:
    # Atualizar com OAB
    api.patch_contact(123, {
        "OtherProperties": [{
            "FieldKey": "contact_C40CB3B4-F8DA-4A92-8F96-93F27DA1516F",
            "StringValue": "MG123456"
        }]
    })
```

### Operações com Deals

```python
# Buscar deal por CNJ
deal = api.get_deal_by_cnj("1234567-89.2023.8.13.0001")

if deal:
    # Atualizar estágio
    stage = api.get_stage_by_pipeline_and_name("Processos", "Ganho")
    if stage:
        api.patch_deal(deal['Id'], {"StageId": stage['Id']})
```

### Monitoramento de Performance

```python
# Métricas da sessão
metrics = api.get_metrics_summary()
print(f"📊 Total de requests: {metrics['total_requests']}")
print(f"✅ Taxa de sucesso: {metrics['success_rate']:.1%}")
print(f"⚡ Latência média: {metrics['average_duration_ms']:.0f}ms")

# Análise por operação
for op, stats in metrics['operations'].items():
    if stats['success_rate'] < 0.9:
        print(f"⚠️ {op}: baixa taxa de sucesso ({stats['success_rate']:.1%})")
```

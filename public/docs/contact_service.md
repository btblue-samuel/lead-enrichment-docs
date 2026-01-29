# 👥 Documentação: ContactService

**Arquivo:** `src/ploomes_integration/services/contacts.py`

**Módulo:** `ploomes_integration.services`

---

## 📑 Índice

- [Visão Geral](#visão-geral)
- [Classe ContactService](#classe-contactservice)
    - [Métodos de Gerenciamento](#métodos-de-gerenciamento)
    - [Métodos de Mapeamento](#métodos-de-mapeamento)
    - [Métodos Privados](#métodos-privados)
- [Observabilidade](#observabilidade)
- [Estrutura de Dados](#estrutura-de-dados)
- [Exemplos de Uso](#exemplos-de-uso)
- [Melhores Práticas](#melhores-práticas)

---

## Visão Geral

O módulo `ContactService` é responsável pela orquestração de alto nível de contatos no Ploomes, incluindo criação, atualização e aplicação de tags.

### Responsabilidades

| Responsabilidade    | Descrição                                      |
| ------------------- | ---------------------------------------------- |
| **Upsert**          | Cria ou atualiza contatos com retry            |
| **Mapeamento**      | Transforma DTOs de domínio em payloads Ploomes |
| **Tagging**         | Aplica e gerencia tags de contatos             |
| **Validação**       | Verifica campos preenchidos antes de atualizar |
| **Observabilidade** | Métricas e logging estruturado                 |
| **B2B Check**       | Verifica existência de deals no pipeline B2B   |

### Dependências

```python
from __future__ import annotations

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
from ..models import AdvogadoData, EscritorioData, ReclamanteData
```

---

## Classe ContactService

```python
class ContactService:
    """Higher-level contact orchestration (create/update + tagging).

    Responsibilities:
      - map domain DTOs to Ploomes payloads (via ContactMapperFactory)
      - check existence by (Name, TypeId)
      - create or update with retry-friendly, single-responsibility calls to PloomesAPI

    Observability:
      - Métricas de criação/atualização de contatos
      - Tracking de operações por tipo de contato
      - Logging estruturado com correlation_id
    """
```

### `__init__`

```python
def __init__(
    self,
    api: PloomesAPI,
    mapper_factory: ContactMapperFactory,
    logger: logging.Logger,
):
```

**Descrição:** Inicializa o serviço de contatos.

| Parâmetro        | Tipo                   | Descrição              |
| ---------------- | ---------------------- | ---------------------- |
| `api`            | `PloomesAPI`           | Cliente da API Ploomes |
| `mapper_factory` | `ContactMapperFactory` | Factory de mappers     |
| `logger`         | `logging.Logger`       | Logger configurado     |

**Atributos Inicializados:**

| Atributo              | Tipo                   | Descrição                |
| --------------------- | ---------------------- | ------------------------ |
| `self.api`            | `PloomesAPI`           | Cliente API              |
| `self.mapper_factory` | `ContactMapperFactory` | Factory de mappers       |
| `self.logger`         | `logging.Logger`       | Logger                   |
| `self.human_behavior` | `HumanBehavior`        | Helper para delays       |
| `self._metrics`       | `ServiceMetrics`       | Registro de métricas     |
| `self._created_count` | `int`                  | Contador de criações     |
| `self._updated_count` | `int`                  | Contador de atualizações |
| `self._skipped_count` | `int`                  | Contador de skips        |

---

## Métodos de Gerenciamento

### `get_stats`

```python
def get_stats(self) -> Dict[str, Any]
```

**Descrição:** Retorna estatísticas do serviço de contatos.

**Retorno:** `Dict[str, Any]` - Estatísticas de operações

**Estrutura do Retorno:**

```python
{
    "created_count": int,
    "updated_count": int,
    "skipped_count": int,
    "total_operations": int,
    "success_rate": float,  # 0.0 - 1.0
    "average_latency_ms": float,
}
```

**Exemplo:**

```python
stats = service.get_stats()
print(f"Criados: {stats['created_count']}")
print(f"Taxa de sucesso: {stats['success_rate']*100:.1f}%")
print(f"Latência média: {stats['average_latency_ms']:.2f}ms")
```

---

### `upsert_contact`

```python
def upsert_contact(self, body: Dict, max_retries: int = 3) -> Dict
```

**Descrição:** Cria ou atualiza um contato no Ploomes.

| Parâmetro     | Tipo   | Padrão | Descrição                   |
| ------------- | ------ | ------ | --------------------------- |
| `body`        | `Dict` | -      | Dados do contato            |
| `max_retries` | `int`  | `3`    | Número máximo de tentativas |

**Retorno:** `Dict` - Dados do contato com flags adicionais

**Flags Adicionais no Retorno:**

| Flag            | Tipo   | Descrição                               |
| --------------- | ------ | --------------------------------------- |
| `_was_updated`  | `bool` | True se atualizado                      |
| `_was_created`  | `bool` | True se criado                          |
| `_was_skipped`  | `bool` | True se pulado                          |
| `_skip_reason`  | `str`  | Motivo do skip                          |
| `_has_b2b_deal` | `bool` | True se tem deal B2B (apenas type_id=1) |

**Exceções:**

- `ValidationError` - Dados inválidos
- `ContactCreationError` - Falha na criação após retries

**Workflow:**

```
1. Valida body (não None, Name obrigatório)
2. Busca contato existente por (Name, TypeId)
3. Se existir:
   a. Verifica campos preenchidos
   b. Se campos OK: atualiza
   c. Se campos NOK: skip
4. Se não existir:
   a. Cria novo contato
5. Se type_id=1 (Escritório):
   a. Verifica deal B2B
6. Retorna contato com flags
```

**Validações de Skip:**

| TypeId           | Campo Verificado                                     | Motivo de Skip                      |
| ---------------- | ---------------------------------------------------- | ----------------------------------- |
| `1` (Escritório) | `Register` (CNPJ/CPF)                                | "Register (CNPJ/CPF) já preenchido" |
| `2` (Advogado)   | `contact_C40CB3B4-F8DA-4A92-8F96-93F27DA1516F` (OAB) | "OAB já preenchida"                 |

**Retry Strategy:**

- Retry em status codes: `408, 429, 500, 502, 503, 504`
- Backoff exponencial: `2^attempt` segundos
- Delay com `HumanBehavior.human_like_delay()`

**Exemplo:**

```python
body = {
    "Name": "Silva Advogados",
    "TypeId": 1,
    "Register": "07617044000104",
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
    print("📋 Já possui deal B2B")
```

---

### `apply_tag`

```python
def apply_tag(self, contact_id: int, tag_id: int) -> None
```

**Descrição:** Aplica uma tag ao contato.

| Parâmetro    | Tipo  | Descrição     |
| ------------ | ----- | ------------- |
| `contact_id` | `int` | ID do contato |
| `tag_id`     | `int` | ID da tag     |

**Retorno:** `None`

**Exemplo:**

```python
from ..models import ContactTags

service.apply_tag(
    contact_id=12345,
    tag_id=ContactTags.ESCRITORIO
)
```

---

### `apply_tag_if_missing`

```python
def apply_tag_if_missing(self, contact: Dict, tag_id: int) -> bool
```

**Descrição:** Aplica uma tag ao contato apenas se ele ainda não a possui.

| Parâmetro | Tipo   | Descrição                                         |
| --------- | ------ | ------------------------------------------------- |
| `contact` | `Dict` | Dados do contato (deve incluir Tags se expandido) |
| `tag_id`  | `int`  | ID da tag a aplicar                               |

**Retorno:** `bool` - True se tag foi aplicada, False se já existia

**Validações:**

- Se `tag_id` é None: retorna False
- Se `contact_id` não existe: retorna False
- Se Tags expandido e tag já existe: retorna False

**Exemplo:**

```python
# Busca contato com Tags expandido
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
    print("ℹ️ Tag já existia")
```

---

## Métodos de Mapeamento

### `map_escritorio`

```python
def map_escritorio(self, data: EscritorioData) -> Tuple[Dict, int]
```

**Descrição:** Mapeia dados do escritório para formato Ploomes.

| Parâmetro | Tipo             | Descrição           |
| --------- | ---------------- | ------------------- |
| `data`    | `EscritorioData` | Dados do escritório |

**Retorno:** `Tuple[Dict, int]` - (payload, tag_id)

**Exemplo:**

```python
escritorio_data = {
    "Nome": "Silva Advogados",
    "CNPJ": "07617044000104",
    "Pessoa_Física": "Não"
}

payload, tag_id = service.map_escritorio(escritorio_data)
```

---

### `map_advogado`

```python
def map_advogado(
    self,
    data: AdvogadoData,
    company_id: Optional[int] = None
) -> Tuple[Dict, int]
```

**Descrição:** Mapeia dados do advogado para formato Ploomes.

| Parâmetro    | Tipo           | Descrição                |
| ------------ | -------------- | ------------------------ |
| `data`       | `AdvogadoData` | Dados do advogado        |
| `company_id` | `int`          | ID da empresa (opcional) |

**Retorno:** `Tuple[Dict, int]` - (payload, tag_id)

**Exemplo:**

```python
advogado_data = {
    "Nome": "Dr. João Silva",
    "CPF": "12345678900",
    "OAB": "SP123456"
}

payload, tag_id = service.map_advogado(
    advogado_data,
    company_id=12345
)
```

---

### `map_reclamante`

```python
def map_reclamante(self, data: ReclamanteData) -> Tuple[Dict, int]
```

**Descrição:** Mapeia dados do reclamante para formato Ploomes.

| Parâmetro | Tipo             | Descrição           |
| --------- | ---------------- | ------------------- |
| `data`    | `ReclamanteData` | Dados do reclamante |

**Retorno:** `Tuple[Dict, int]` - (payload, tag_id)

**Exemplo:**

```python
reclamante_data = {
    "Nome": "Maria Santos",
    "CPF": "98765432100",
    "Telefones": ["11987654321"],
    "UF": "SP"
}

payload, tag_id = service.map_reclamante(reclamante_data)
```

---

## Métodos Privados

### `_check_b2b_deal`

```python
def _check_b2b_deal(self, contact_id: int) -> bool
```

**Descrição:** Verifica se o contato já possui um deal no pipeline 'B2B - Escritórios BT BLUE'.

| Parâmetro    | Tipo  | Descrição     |
| ------------ | ----- | ------------- |
| `contact_id` | `int` | ID do contato |

**Retorno:** `bool` - True se possui deal B2B

**Lógica:**

1. Busca deals do contato via `api.get_deals_by_contact_id()`
2. Para cada deal:
    - Extrai `Pipeline.Name`
    - Compara case-insensitive com `"b2b - escritórios bt blue"`
3. Retorna True se encontrar match

**Exemplo:**

```python
# Uso interno em upsert_contact
if type_id == 1:
    has_b2b_deal = self._check_b2b_deal(contact_id)
    updated["_has_b2b_deal"] = has_b2b_deal
```

---

## Observabilidade

### Métricas Coletadas

| Métrica              | Tipo    | Descrição                     |
| -------------------- | ------- | ----------------------------- |
| `created_count`      | Counter | Total de contatos criados     |
| `updated_count`      | Counter | Total de contatos atualizados |
| `skipped_count`      | Counter | Total de contatos pulados     |
| `total_operations`   | Counter | Total de operações            |
| `success_rate`       | Gauge   | Taxa de sucesso (0.0-1.0)     |
| `average_latency_ms` | Gauge   | Latência média em ms          |

### Logging Estruturado

**Correlation ID:** Todas as operações incluem `correlation_id` para rastreamento

**Exemplos de Logs:**

```
[abc123] ➕ Criando novo contato: Silva Advogados…
[abc123] ✓ Contato criado: Silva Advogados (ID 12345) (123.45ms)
[abc123] 🔄 Atualizando contato existente: Dr. João Silva (ID 67890)…
[abc123] ✓ Contato atualizado: Dr. João Silva (98.76ms)
[abc123] ⏭️ Pulando atualização de Silva Advogados (ID 12345): Register (CNPJ/CPF) já preenchido
[abc123] ✅ Contato Silva Advogados já possui deal no pipeline B2B
[abc123] 🔄 Retentando em 2s (tentativa 1/3) — HTTP 429: Rate limit exceeded
```

---

## Estrutura de Dados

### EscritorioData (TypedDict)

```python
{
    "Nome": str,  # Obrigatório
    "CNPJ": str,  # Se PJ
    "CPF": str,  # Se PF
    "Pessoa_Física": str,  # "Sim"/"Não"
    "Origem": str,  # Opcional
    "Marcadores": str,  # Opcional
}
```

### AdvogadoData (TypedDict)

```python
{
    "Nome": str,  # Obrigatório
    "CPF": str,  # Opcional
    "OAB": str,  # Opcional
    "Empresa": str,  # Opcional
    "Cidade": str,  # Opcional
    "Etiqueta": str,  # Opcional
    "E-mail 1": str,  # Opcional
    "E-mail 2": str,  # Opcional
    "E-mail 3": str,  # Opcional
}
```

### ReclamanteData (TypedDict)

```python
{
    "Nome": str,  # Obrigatório
    "CPF": str,  # Opcional
    "Telefones": list[str],  # Opcional
    "UF": str,  # Opcional
}
```

---

## Exemplos de Uso

### Exemplo 1: Criar Escritório

```python
from src.ploomes_integration.services import ContactService
from src.ploomes_integration.api import PloomesAPI
from src.ploomes_integration.utils.contact_mapper import ContactMapperFactory

api = PloomesAPI(...)
mapper_factory = ContactMapperFactory(field_mappings, logger)
service = ContactService(api, mapper_factory, logger)

# Mapear dados
escritorio_data = {
    "Nome": "Silva & Associados",
    "CNPJ": "07617044000104",
    "Pessoa_Física": "Não",
    "Origem": "Site"
}
payload, tag_id = service.map_escritorio(escritorio_data)

# Criar/atualizar
result = service.upsert_contact(payload)

# Aplicar tag se criado
if result.get("_was_created"):
    service.apply_tag(result["Id"], tag_id)
```

### Exemplo 2: Criar Advogado com Empresa

```python
advogado_data = {
    "Nome": "Dr. João Silva",
    "CPF": "12345678900",
    "OAB": "SP123456",
    "Empresa": "Silva Advogados",
    "E-mail 1": "joao@silva.com.br"
}

# Buscar ID do escritório
escritorio = api.get_contact_by_name_and_type("Silva Advogados", 1)
company_id = escritorio.get("Id") if escritorio else None

# Mapear e criar
payload, tag_id = service.map_advogado(advogado_data, company_id)
result = service.upsert_contact(payload)

if result.get("_was_created"):
    service.apply_tag(result["Id"], tag_id)
```

### Exemplo 3: Criar Reclamante com LEMIT

```python
from src.lemit_automation import LemitClient

lemit = LemitClient()

# Enriquecer dados via LEMIT
dados_lemit = lemit.enriquecer_contato_com_cpf("12345678900")

reclamante_data = {
    "Nome": "Maria Santos",
    "CPF": "12345678900",
    "Telefones": dados_lemit.get("telefones", []),
    "UF": "SP"
}

# Mapear e criar
payload, tag_id = service.map_reclamante(reclamante_data)
result = service.upsert_contact(payload)

if result.get("_was_created"):
    service.apply_tag(result["Id"], tag_id)
    print(f"✅ Reclamante criado: {result['Id']}")
```

### Exemplo 4: Tratamento de Skips

```python
# Escritório com CNPJ já preenchido
escritorio_data = {
    "Nome": "Silva Advogados",  # Já existe
    "CNPJ": "07617044000104",  # Já preenchido
    "Pessoa_Física": "Não"
}

payload, tag_id = service.map_escritorio(escritorio_data)
result = service.upsert_contact(payload)

if result.get("_was_skipped"):
    print(f"⏭️ Skip: {result['_skip_reason']}")
    # Output: "Register (CNPJ/CPF) já preenchido"

# Verificar se tem deal B2B
if result.get("_has_b2b_deal"):
    print("📋 Já possui deal B2B, não criar novo")
```

### Exemplo 5: Retry com Backoff

```python
import time

try:
    result = service.upsert_contact(payload, max_retries=5)
except ContactCreationError as e:
    logger.error(f"❌ Falha após retries: {e}")
except ValidationError as e:
    logger.error(f"❌ Dados inválidos: {e}")
```

### Exemplo 6: Estatísticas de Processamento

```python
# Processar lote
for escritorio in escritorios:
    payload, tag_id = service.map_escritorio(escritorio)
    result = service.upsert_contact(payload)
    if result.get("_was_created"):
        service.apply_tag(result["Id"], tag_id)

# Obter estatísticas
stats = service.get_stats()
print(f"""
📊 Estatísticas:
- Criados: {stats['created_count']}
- Atualizados: {stats['updated_count']}
- Pulados: {stats['skipped_count']}
- Taxa de sucesso: {stats['success_rate']*100:.1f}%
- Latência média: {stats['average_latency_ms']:.2f}ms
""")
```

---

## Melhores Práticas

### 1. Sempre Use Métodos de Mapeamento

```python
# ✅ BOM
payload, tag_id = service.map_escritorio(data)
result = service.upsert_contact(payload)

# ❌ EVITE - Payload manual
payload = {
    "Name": data["Nome"],
    "TypeId": 1,
    # ... propenso a erros
}
```

### 2. Aplique Tags Após Criação

```python
# ✅ BOM
result = service.upsert_contact(payload)
if result.get("_was_created"):
    service.apply_tag(result["Id"], tag_id)

# ❌ EVITE - Aplicar tag sempre
result = service.upsert_contact(payload)
service.apply_tag(result["Id"], tag_id)  # Redundante se já criado
```

### 3. Use apply_tag_if_missing para Segurança

```python
# ✅ BOM - Evita tags duplicadas
contact = api.get_contact_by_name_and_type(name, type_id, expand_tags=True)
service.apply_tag_if_missing(contact, tag_id)

# ⚠️ CUIDADO - Pode duplicar tags
service.apply_tag(contact["Id"], tag_id)
```

### 4. Verifique Flags de Retorno

```python
# ✅ BOM
result = service.upsert_contact(payload)

if result.get("_was_created"):
    logger.info(f"✅ Criado: {result['Id']}")
    service.apply_tag(result["Id"], tag_id)
elif result.get("_was_updated"):
    logger.info(f"🔄 Atualizado: {result['Id']}")
elif result.get("_was_skipped"):
    logger.info(f"⏭️ Pulado: {result['_skip_reason']}")

# ❌ EVITE - Ignorar flags
result = service.upsert_contact(payload)
# Sem verificação de resultado
```

### 5. Configure Retries Apropriados

```python
# ✅ BOM - Retries para processamento batch
result = service.upsert_contact(payload, max_retries=5)

# ✅ BOM - Sem retries para testes rápidos
result = service.upsert_contact(payload, max_retries=1)

# ❌ EVITE - Muitos retries sem necessidade
result = service.upsert_contact(payload, max_retries=10)
```

### 6. Use \_has_b2b_deal para Lógica de Negócio

```python
# ✅ BOM
result = service.upsert_contact(escritorio_payload)

if result.get("_has_b2b_deal"):
    logger.info("⏭️ Escritório já tem deal B2B, pulando criação")
    return None

# Criar novo deal B2B
deal_result = deal_service.create_deal(...)
```

### 7. Monitore Estatísticas

```python
# ✅ BOM
stats = service.get_stats()

if stats['success_rate'] < 0.8:
    logger.warning(f"⚠️ Taxa de sucesso baixa: {stats['success_rate']*100:.1f}%")

if stats['average_latency_ms'] > 1000:
    logger.warning(f"⚠️ Latência alta: {stats['average_latency_ms']:.2f}ms")
```

---

## Referências

- [PloomesAPI](../api.md)
- [ContactMapperFactory](contact_mapper.md)
- [HumanBehavior](../utils/human_behavior.md)
- [Métricas](../utils/metrics.md)
- [ValidationError](../exceptions.md)

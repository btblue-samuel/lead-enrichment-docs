# 📋 Documentação: DealService

**Arquivo:** `src/ploomes_integration/services/deal.py`

**Módulo:** `ploomes_integration.services`

---

## 📑 Índice

- [Visão Geral](#visão-geral)
- [Classe DealService](#classe-dealservice)
    - [Classe Interna PloomesStage](#classe-interna-ploomesstage)
    - [Métodos de Gerenciamento](#métodos-de-gerenciamento)
    - [Métodos de Deals](#métodos-de-deals)
    - [Métodos Privados](#métodos-privados)
- [Observabilidade](#observabilidade)
- [Estrutura de Dados](#estrutura-de-dados)
- [Exemplos de Uso](#exemplos-de-uso)
- [Melhores Práticas](#melhores-práticas)

---

## Visão Geral

O módulo `DealService` é responsável pela orquestração completa de negócios (deals) no Ploomes, desde a criação de contatos relacionados até a atualização de estágios.

### Responsabilidades

| Responsabilidade            | Descrição                                        |
| --------------------------- | ------------------------------------------------ |
| **Orquestração Completa**   | Gerencia escritório, advogado, reclamante e deal |
| **Enriquecimento**          | Integra LEMIT e CNPJ Scraper                     |
| **Criação de Deals**        | Cria negócios com todos os relacionamentos       |
| **Atualização de Estágios** | Move deals entre estágios                        |
| **Observabilidade**         | Métricas e logging estruturado                   |
| **Retry Logic**             | Retry automático com backoff                     |

### Dependências

```python
from __future__ import annotations
import logging
import time
from dataclasses import dataclass
from typing import Any, Dict, Optional, Tuple, Union

from src.utils.human_behavior import HumanBehavior
from src.utils.metrics import get_metrics_registry
from src.utils.logger import get_correlation_id

from ..api import PloomesAPI
from ..exceptions import PloomesAPIError
from src.lemit_automation.lemit_client import LemitClient
from ..models import (
    AdvogadoData,
    ConjuntoContatoDict,
    EscritorioData,
    PloomesImportModel,
)
from ..utils.contact_mapper import ContactMapperFactory
from src.utils.validator import CNJValidator, CPFValidator
from ..clients import CNPJScraper
```

---

## Classe DealService

```python
class DealService:
    """Business workflows around Deal creation/update, composed on top of PloomesAPI.

    Observability:
      - Métricas de criação/atualização de deals
      - Tracking de operações por pipeline/estágio
      - Logging estruturado com correlation_id
    """
```

---

## Classe Interna PloomesStage

```python
@dataclass
class PloomesStage:
    pipeline: str
    name: str
    id: int
```

**Descrição:** Representa um estágio de pipeline no Ploomes.

| Atributo   | Tipo  | Descrição        |
| ---------- | ----- | ---------------- |
| `pipeline` | `str` | Nome do pipeline |
| `name`     | `str` | Nome do estágio  |
| `id`       | `int` | ID do estágio    |

---

### `__init__`

```python
def __init__(
    self,
    api: PloomesAPI,
    contact_service,
    mapper_factory: ContactMapperFactory,
    lemit_client: LemitClient,
    logger: logging.Logger,
) -> None:
```

**Descrição:** Inicializa o serviço de deals.

| Parâmetro         | Tipo                   | Descrição              |
| ----------------- | ---------------------- | ---------------------- |
| `api`             | `PloomesAPI`           | Cliente da API Ploomes |
| `contact_service` | `ContactService`       | Serviço de contatos    |
| `mapper_factory`  | `ContactMapperFactory` | Factory de mappers     |
| `lemit_client`    | `LemitClient`          | Cliente LEMIT          |
| `logger`          | `logging.Logger`       | Logger configurado     |

**Atributos Inicializados:**

| Atributo               | Tipo                   | Descrição                |
| ---------------------- | ---------------------- | ------------------------ |
| `self.api`             | `PloomesAPI`           | Cliente API              |
| `self.contact_service` | `ContactService`       | Serviço de contatos      |
| `self.mapper_factory`  | `ContactMapperFactory` | Factory de mappers       |
| `self.lemit_client`    | `LemitClient`          | Cliente LEMIT            |
| `self.logger`          | `logging.Logger`       | Logger                   |
| `self.human_behavior`  | `HumanBehavior`        | Helper para delays       |
| `self._metrics`        | `ServiceMetrics`       | Registro de métricas     |
| `self._created_count`  | `int`                  | Contador de criações     |
| `self._updated_count`  | `int`                  | Contador de atualizações |
| `self._failed_count`   | `int`                  | Contador de falhas       |

---

## Métodos de Gerenciamento

### `get_stats`

```python
def get_stats(self) -> Dict[str, Any]
```

**Descrição:** Retorna estatísticas do serviço de deals.

**Retorno:** `Dict[str, Any]` - Estatísticas de operações

**Estrutura do Retorno:**

```python
{
    "created_count": int,
    "updated_count": int,
    "failed_count": int,
    "total_operations": int,
    "success_rate": float,  # 0.0 - 1.0
    "average_latency_ms": float,
}
```

---

## Métodos de Deals

### `create_deal`

```python
def create_deal(
    self,
    model: PloomesImportModel,
    max_retries: int = 3
) -> Optional[dict]
```

**Descrição:** Cria um novo negócio com todos os contatos relacionados.

| Parâmetro     | Tipo                 | Padrão | Descrição                   |
| ------------- | -------------------- | ------ | --------------------------- |
| `model`       | `PloomesImportModel` | -      | Modelo de dados do negócio  |
| `max_retries` | `int`                | `3`    | Número máximo de tentativas |

**Retorno:** `Optional[dict]` - Dados do deal criado ou None em caso de falha

**Workflow Completo:**

```
═══════════════════════════════════════════════════════════════
FASE 1: PROCESSAMENTO DO ESCRITÓRIO
═══════════════════════════════════════════════════════════════
1. Busca escritório por nome e tipo (TypeId=1)
2. Se não encontrado:
   a. Consulta CNPJ via CNPJScraper
   b. Cria dados de escritório
   c. Chama _get_or_create_mapped_contact()
3. Extrai escritorio_id

═══════════════════════════════════════════════════════════════
FASE 2: PROCESSAMENTO DO RECLAMANTE
═══════════════════════════════════════════════════════════════
1. Busca reclamante por nome e tipo (TypeId=2)
2. Se não encontrado:
   a. Enriquece com LEMIT:
      - Se tem CPF: enriquecer_contato_com_cpf()
      - Se não: enriquecer_contato_com_nome()
   b. Extrai telefones e CPF
   c. Cria dados de reclamante
   d. Chama _get_or_create_mapped_contact()
3. Extrai reclamante_id

═══════════════════════════════════════════════════════════════
FASE 3: PROCESSAMENTO DO ADVOGADO
═══════════════════════════════════════════════════════════════
1. Busca advogado por nome e tipo (TypeId=2)
2. Se não encontrado:
   a. Cria dados de advogado
   b. Chama _get_or_create_mapped_contact() com company_id
3. Extrai advogado_id

═══════════════════════════════════════════════════════════════
FASE 4: CRIAÇÃO DO DEAL
═══════════════════════════════════════════════════════════════
1. Prepara payload via DealMapper
2. Loop de retries (max_retries):
   a. Envia payload via api.create_deal()
   b. Se sucesso: retorna deal
   c. Se PloomesAPIError: retry com backoff
3. Se falhar todas as tentativas: retorna None
```

**Exemplo:**

```python
model = {
    "escritorio": "Silva Advogados",
    "reclamante": "João Silva",
    "cpf": "12345678900",
    "advogado": "Dr. Carlos Mendes",
    "cnj": "0001234-56.2023.5.01.0001",
    "negociador": "Maria Santos",
    "origem": "Site",
    "uf": "SP",
    "produto": "Trabalhista",
    "stage_id": 456,
    "tags_id": [10, 20, 30]
}

deal = service.create_deal(model, max_retries=5)
if deal:
    print(f"✅ Deal criado: ID {deal['Id']}")
else:
    print("❌ Falha na criação do deal")
```

---

### `update_deal_stage_by_cnj`

```python
def update_deal_stage_by_cnj(
    self,
    deal_cnj: str,
    stage: "DealService.PloomesStage"
) -> bool
```

**Descrição:** Atualiza a etapa de um negócio pelo CNJ.

| Parâmetro  | Tipo                       | Descrição      |
| ---------- | -------------------------- | -------------- |
| `deal_cnj` | `str`                      | CNJ do negócio |
| `stage`    | `DealService.PloomesStage` | Novo estágio   |

**Retorno:** `bool` - True se atualização bem-sucedida

**Validações:**

- CNJ é obrigatório
- CNJ deve ser válido (formatação via `CNJValidator`)
- Deal deve existir no Ploomes

**Workflow:**

1. Valida CNJ
2. Formata CNJ via `CNJValidator.format()`
3. Busca deal via `api.get_deal_by_cnj()`
4. Extrai `deal_id`
5. Atualiza via `api.patch_deal()`

**Exemplo:**

```python
# Criar objeto de estágio
stage = service.get_stage_by_pipeline_and_name(
    pipeline="B2B - Escritórios BT BLUE",
    stage_name="Proposta Enviada"
)

# Atualizar deal
success = service.update_deal_stage_by_cnj(
    deal_cnj="0001234-56.2023.5.01.0001",
    stage=stage
)

if success:
    print(f"✅ Deal atualizado para {stage.name}")
else:
    print("❌ Falha na atualização")
```

---

### `get_stage_by_pipeline_and_name`

```python
def get_stage_by_pipeline_and_name(
    self,
    pipeline: str,
    stage_name: str
) -> Optional["DealService.PloomesStage"]
```

**Descrição:** Obtém um estágio pelo nome do pipeline e nome do estágio.

| Parâmetro    | Tipo  | Descrição        |
| ------------ | ----- | ---------------- |
| `pipeline`   | `str` | Nome do pipeline |
| `stage_name` | `str` | Nome do estágio  |

**Retorno:** `Optional[PloomesStage]` - Dados do estágio ou None

**Exemplo:**

```python
stage = service.get_stage_by_pipeline_and_name(
    pipeline="B2B - Escritórios BT BLUE",
    stage_name="Negociação"
)

if stage:
    print(f"Estágio: {stage.name} (ID: {stage.id})")
```

---

## Métodos Privados

### `_get_or_create_mapped_contact`

```python
def _get_or_create_mapped_contact(
    self,
    mapper: Union[EscritorioMapper, AdvogadoMapper, ReclamanteMapper],
    contact_data: Union[EscritorioData, AdvogadoData, Dict[str, Any]],
    company_id: Optional[int] = None,
) -> Optional[Dict[str, Any]]
```

**Descrição:** Obtém ou cria um contato mapeado.

| Parâmetro      | Tipo         | Descrição                                |
| -------------- | ------------ | ---------------------------------------- |
| `mapper`       | `Union[...]` | Mapper especializado                     |
| `contact_data` | `Union[...]` | Dados do contato                         |
| `company_id`   | `int`        | ID da empresa (opcional, para advogados) |

**Retorno:** `Optional[Dict[str, Any]]` - Dados do contato ou None

**Workflow:**

1. Mapeia dados via `mapper.map_to_ploomes()`
2. Cria/atualiza via `contact_service.upsert_contact()`
3. Se criado: aplica tag via `contact_service.apply_tag()`
4. Retorna resultado

**Tratamento de Erros:**

- Captura exceções e loga erro
- Retorna None em caso de falha

---

## Observabilidade

### Métricas Coletadas

| Métrica              | Tipo    | Descrição                  |
| -------------------- | ------- | -------------------------- |
| `created_count`      | Counter | Total de deals criados     |
| `updated_count`      | Counter | Total de deals atualizados |
| `failed_count`       | Counter | Total de falhas            |
| `total_operations`   | Counter | Total de operações         |
| `success_rate`       | Gauge   | Taxa de sucesso (0.0-1.0)  |
| `average_latency_ms` | Gauge   | Latência média em ms       |

### Logging Estruturado

**Correlation ID:** Todas as operações incluem `correlation_id`

**Exemplos de Logs:**

```
[abc123] 🚀 Iniciando criação de deal - CNJ: 0001234-56.2023.5.01.0001
[abc123] 📋 Dados do modelo: Escritório='Silva Advogados', Reclamante='João Silva', Advogado='Dr. Carlos'
[abc123] 🏢 Buscando escritório: 'Silva Advogados' (tipo 1)
[abc123] ✅ Escritório encontrado: 'Silva Advogados' (ID: 12345)
[abc123] 🏢 Escritório 'Silva Advogados' não encontrado, consultando CNPJ para cadastro na PLOOMES
[abc123] 📄 CNPJ encontrado: 07617044000104
[abc123] ✅ Escritório criado: 'Silva Advogados' (ID: 12345)
[abc123] 👤 Buscando reclamante: 'João Silva' (tipo 2)
[abc123] 👤 Reclamante 'João Silva' não encontrado, enriquecendo dados via LEMIT
[abc123] 🔍 Enriquecendo com CPF: 12345678900
[abc123] 📞 Telefones encontrados: 2, CPF: 12345678900
[abc123] ✅ Reclamante criado: 'João Silva' (ID: 67890)
[abc123] ⚖️ Buscando advogado: 'Dr. Carlos Mendes' (tipo 2)
[abc123] ⚖️ Advogado 'Dr. Carlos Mendes' não encontrado, criando novo contato
[abc123] ✅ Advogado criado: 'Dr. Carlos Mendes' (ID: 11111)
[abc123] 📋 Preparando payload do deal...
[abc123] 📦 Payload preparado com IDs - Reclamante: 67890, Escritório: 12345, Advogado: 11111
[abc123] 🔄 Criando deal (máx. 3 tentativas)...
[abc123] 📤 Tentativa 1/3 - Enviando payload para Ploomes
[abc123] ✅ Deal criado com sucesso! ID: 99999 | CNJ: 0001234-56.2023.5.01.0001
```

---

## Estrutura de Dados

### PloomesImportModel (TypedDict)

```python
{
    "escritorio": str,  # Nome do escritório
    "reclamante": str,  # Nome do reclamante
    "cpf": str,  # CPF do reclamante (opcional)
    "advogado": str,  # Nome do advogado
    "cnj": str,  # Número CNJ
    "negociador": str,  # Nome do negociador
    "origem": str,  # Origem do lead
    "uf": str,  # UF do processo
    "produto": str,  # Produto/serviço
    "stage_id": int,  # ID do estágio
    "tags_id": list[int],  # IDs das tags
}
```

---

## Exemplos de Uso

### Exemplo 1: Criar Deal Completo

```python
from src.ploomes_integration.services import DealService, ContactService
from src.ploomes_integration.api import PloomesAPI
from src.ploomes_integration.utils.contact_mapper import ContactMapperFactory
from src.lemit_automation import LemitClient

# Inicializar dependências
api = PloomesAPI(...)
contact_service = ContactService(api, mapper_factory, logger)
lemit_client = LemitClient()
deal_service = DealService(
    api,
    contact_service,
    mapper_factory,
    lemit_client,
    logger
)

# Modelo de dados
model = {
    "escritorio": "Silva & Associados",
    "reclamante": "João Silva",
    "cpf": "12345678900",
    "advogado": "Dr. Carlos Mendes",
    "cnj": "0001234-56.2023.5.01.0001",
    "negociador": "Maria Santos",
    "origem": "Site",
    "uf": "SP",
    "produto": "Trabalhista",
    "stage_id": 456,
    "tags_id": [10, 20, 30]
}

# Criar deal
deal = deal_service.create_deal(model, max_retries=5)
if deal:
    print(f"✅ Deal criado: ID {deal['Id']}")
    print(f"   Título: {deal['Title']}")
else:
    print("❌ Falha na criação")
```

### Exemplo 2: Atualizar Estágio por CNJ

```python
# Buscar estágio
stage = deal_service.get_stage_by_pipeline_and_name(
    pipeline="B2B - Escritórios BT BLUE",
    stage_name="Proposta Enviada"
)

if not stage:
    print("❌ Estágio não encontrado")
    exit(1)

# Atualizar deal
cnj = "0001234-56.2023.5.01.0001"
success = deal_service.update_deal_stage_by_cnj(cnj, stage)

if success:
    print(f"✅ Deal {cnj} movido para '{stage.name}'")
else:
    print(f"❌ Falha ao atualizar deal {cnj}")
```

### Exemplo 3: Processamento em Lote

```python
# Lista de modelos
models = [
    {
        "escritorio": "Escritório A",
        "reclamante": "Pessoa A",
        "advogado": "Advogado A",
        "cnj": "0001234-56.2023.5.01.0001",
        # ... demais campos
    },
    # ... mais modelos
]

# Processar lote
results = []
for model in models:
    deal = deal_service.create_deal(model)
    results.append({
        "cnj": model["cnj"],
        "success": deal is not None,
        "deal_id": deal.get("Id") if deal else None
    })

# Estatísticas
stats = deal_service.get_stats()
print(f"""
📊 Resultado do Processamento:
- Criados: {stats['created_count']}
- Falhas: {stats['failed_count']}
- Taxa de sucesso: {stats['success_rate']*100:.1f}%
- Latência média: {stats['average_latency_ms']:.2f}ms
""")
```

### Exemplo 4: Tratamento de Erros

```python
try:
    deal = deal_service.create_deal(model)

    if deal:
        logger.info(f"✅ Deal criado: {deal['Id']}")
    else:
        logger.error("❌ Falha na criação (retornou None)")

except PloomesAPIError as e:
    logger.error(f"❌ Erro de API: {e.status_code} - {e.message}")
except Exception as e:
    logger.error(f"💥 Erro inesperado: {e}")
```

### Exemplo 5: Workflow Personalizado

```python
# Criar deal em estágio específico
stage = deal_service.get_stage_by_pipeline_and_name(
    pipeline="B2B - Escritórios BT BLUE",
    stage_name="Qualificação"
)

model["stage_id"] = stage.id

# Criar
deal = deal_service.create_deal(model)

if deal:
    # Aguardar algum evento...
    time.sleep(60)

    # Mover para próximo estágio
    next_stage = deal_service.get_stage_by_pipeline_and_name(
        pipeline="B2B - Escritórios BT BLUE",
        stage_name="Negociação"
    )

    success = deal_service.update_deal_stage_by_cnj(
        model["cnj"],
        next_stage
    )
```

---

## Melhores Práticas

### 1. Sempre Forneça Todos os Campos Obrigatórios

```python
# ✅ BOM
model = {
    "escritorio": "Silva Advogados",
    "reclamante": "João Silva",
    "advogado": "Dr. Carlos",
    "cnj": "0001234-56.2023.5.01.0001",
    "negociador": "Maria",
    "origem": "Site",
    "uf": "SP",
    "produto": "Trabalhista",
    "stage_id": 456,
    "tags_id": [10]
}

# ❌ EVITE - Campos faltando
model = {
    "escritorio": "Silva Advogados",
    "cnj": "0001234-56.2023.5.01.0001"
}
```

### 2. Use Retries Apropriados

```python
# ✅ BOM - Retries para ambientes instáveis
deal = deal_service.create_deal(model, max_retries=5)

# ✅ BOM - Sem retries para testes rápidos
deal = deal_service.create_deal(model, max_retries=1)

# ❌ EVITE - Muitos retries desnecessários
deal = deal_service.create_deal(model, max_retries=10)
```

### 3. Valide CNJ Antes de Usar

```python
# ✅ BOM
from src.utils.validator import CNJValidator

cnj_raw = "0001234-56.2023.5.01.0001"
cnj_formatted = CNJValidator.format(cnj_raw)

if CNJValidator.is_valid(cnj_formatted):
    model["cnj"] = cnj_formatted
else:
    logger.error(f"CNJ inválido: {cnj_raw}")

# ❌ EVITE
model["cnj"] = cnj_raw  # Sem validação
```

### 4. Monitore Estatísticas

```python
# ✅ BOM
stats = deal_service.get_stats()

if stats['failed_count'] > 0:
    logger.warning(f"⚠️ {stats['failed_count']} falhas detectadas")

if stats['success_rate'] < 0.9:
    logger.error(f"❌ Taxa de sucesso baixa: {stats['success_rate']*100:.1f}%")
```

### 5. Verifique Retorno de create_deal

```python
# ✅ BOM
deal = deal_service.create_deal(model)

if deal:
    deal_id = deal['Id']
    logger.info(f"✅ Deal criado: {deal_id}")
else:
    logger.error("❌ Falha na criação")
    # Lógica de fallback

# ❌ EVITE - Assume sucesso
deal = deal_service.create_deal(model)
deal_id = deal['Id']  # Pode causar KeyError
```

### 6. Use Estágios Dinamicamente

```python
# ✅ BOM - Busca estágio dinamicamente
stage = deal_service.get_stage_by_pipeline_and_name(
    pipeline="B2B - Escritórios BT BLUE",
    stage_name="Qualificação"
)
model["stage_id"] = stage.id

# ❌ EVITE - ID hardcoded
model["stage_id"] = 456  # Pode mudar entre ambientes
```

### 7. Integre LEMIT Corretamente

```python
# ✅ BOM - Deixa DealService gerenciar integração LEMIT
# Não chame lemit_client diretamente, DealService já faz isso

deal = deal_service.create_deal(model)

# ❌ EVITE - Enriquecimento manual
dados_lemit = lemit_client.enriquecer_contato_com_cpf(...)
# DealService já faz isso internamente
```

---

## Referências

- [ContactService](contact_service.md)
- [PloomesAPI](../api.md)
- [ContactMapperFactory](contact_mapper.md)
- [LemitClient](lemit_client.md)
- [CNPJScraper](../clients.md)
- [Validators](../utils/validator.md)

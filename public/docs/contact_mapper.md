# 🗺️ Documentação: Contact Mappers

**Arquivo:** `src/ploomes_integration/utils/contact_mapper.py`

**Módulo:** `ploomes_integration.utils`

---

## 📑 Índice

- [Visão Geral](#visão-geral)
- [Hierarquia de Classes](#hierarquia-de-classes)
- [ContactMapperBase](#contactmapperbase)
- [EscritorioMapper](#escritoriomapper)
- [AdvogadoMapper](#advogadomapper)
- [ReclamanteMapper](#reclamantemapper)
- [DealMapper](#dealmapper)
- [ContactMapperFactory](#contactmapperfactory)
- [Exemplos de Uso](#exemplos-de-uso)
- [Melhores Práticas](#melhores-práticas)

---

## Visão Geral

O módulo `contact_mapper` é responsável por transformar dados de domínio em payloads formatados para a API do Ploomes. Utiliza o padrão **Factory** para criar mappers especializados.

### Responsabilidades

| Responsabilidade  | Descrição                                     |
| ----------------- | --------------------------------------------- |
| **Transformação** | Converte DTOs de domínio para formato Ploomes |
| **Validação**     | Valida e formata CPF, CNPJ, telefones         |
| **Mapeamento**    | Mapeia campos customizados (OtherProperties)  |
| **Factory**       | Cria instâncias de mappers especializados     |

### Dependências

```python
from typing import Dict, List, Optional, Any, Tuple, Union
from src.utils.validator import (
    CPFValidator,
    CNPJValidator,
    PhoneValidator,
    ContactValidator
)
from ..models import (
    PloomesImportModel,
    Origem,
    UFProcesso,
    Produto,
    Owner
)
```

---

## Hierarquia de Classes

```
ContactMapperBase (classe base)
├── EscritorioMapper (escritórios/empresas)
├── AdvogadoMapper (advogados/pessoas)
├── ReclamanteMapper (reclamantes/pessoas)
└── DealMapper (negócios/deals)

ContactMapperFactory (factory)
```

---

## ContactMapperBase

```python
class ContactMapperBase:
    """Classe base para mapeamento de contatos com funcionalidades comuns."""
```

### `__init__`

```python
def __init__(self, field_mappings: Dict[str, Any], logger):
```

| Parâmetro        | Tipo             | Descrição                     |
| ---------------- | ---------------- | ----------------------------- |
| `field_mappings` | `Dict[str, Any]` | Mapeamentos de campos do JSON |
| `logger`         | `logging.Logger` | Logger para operações         |

---

### `create_base_contact`

```python
def create_base_contact(
    self,
    name: str,
    type_id: int,
    register: Optional[str] = None,
    company_id: Optional[int] = None
) -> Dict[str, Any]
```

**Descrição:** Cria estrutura base de contato do Ploomes.

| Parâmetro    | Tipo  | Descrição                          |
| ------------ | ----- | ---------------------------------- |
| `name`       | `str` | Nome do contato                    |
| `type_id`    | `int` | Tipo (1=Empresa, 2=Pessoa)         |
| `register`   | `str` | CPF/CNPJ (opcional)                |
| `company_id` | `int` | ID da empresa associada (opcional) |

**Retorno:**

```python
{
    "Name": str,
    "Register": str | None,
    "OriginId": 0,
    "CompanyId": int | None,
    "TypeId": int,
    "Phones": [],
    "OtherProperties": [],
}
```

---

### `add_other_property`

```python
def add_other_property(
    self,
    other_props: List[Dict],
    field_key: str,
    value: Any,
    value_type: str = "StringValue"
) -> None
```

**Descrição:** Adiciona propriedade personalizada à lista de OtherProperties.

| Parâmetro     | Tipo         | Descrição                             |
| ------------- | ------------ | ------------------------------------- |
| `other_props` | `List[Dict]` | Lista a ser modificada (in-place)     |
| `field_key`   | `str`        | Chave do campo personalizado          |
| `value`       | `Any`        | Valor a ser adicionado                |
| `value_type`  | `str`        | Tipo do valor (padrão: "StringValue") |

**Tipos Suportados:**

- `"StringValue"` - Strings
- `"BoolValue"` - Booleanos
- `"IntValue"` / `"IntegerValue"` - Inteiros
- `"DecimalValue"` - Decimais
- `"DateValue"` - Datas

**Comportamento:**

- Só adiciona se `value` não for None ou string vazia
- Modifica lista in-place (sem retorno)

**Exemplo:**

```python
other_props = []
self.add_other_property(
    other_props,
    "contact_ABC123",
    "Valor do Campo",
    "StringValue"
)
# other_props agora contém:
# [{"FieldKey": "contact_ABC123", "StringValue": "Valor do Campo"}]
```

---

### `process_conditional_fields`

```python
def process_conditional_fields(
    self,
    other_props: List[Dict],
    data: Dict[str, Any],
    config: Dict[str, Any],
    field_mappings: List[str]
) -> None
```

**Descrição:** Processa campos condicionais baseados na configuração.

| Parâmetro        | Tipo             | Descrição                                   |
| ---------------- | ---------------- | ------------------------------------------- |
| `other_props`    | `List[Dict]`     | Lista de propriedades (modificada in-place) |
| `data`           | `Dict[str, Any]` | Dados do contato                            |
| `config`         | `Dict[str, Any]` | Configuração de mapeamento                  |
| `field_mappings` | `List[str]`      | Lista de campos a processar                 |

**Comportamento:**

- Para cada campo em `field_mappings`:
    - Verifica se existe em `config`
    - Verifica se valor existe em `data`
    - Adiciona via `add_other_property` se ambos verdadeiros

**Exemplo:**

```python
config = {
    "Origem": {"field_key": "contact_ORIGEM_KEY"},
    "Cidade": {"field_key": "contact_CIDADE_KEY"}
}
data = {"Origem": "Site", "Cidade": "São Paulo"}
field_mappings = ["Origem", "Cidade"]

self.process_conditional_fields(other_props, data, config, field_mappings)
# Adiciona Origem e Cidade a other_props
```

---

### `process_phone_fields`

```python
def process_phone_fields(
    self,
    contact: Dict[str, Any],
    data: Dict[str, Any],
    phone_fields: List[str],
) -> None
```

**Descrição:** Processa campos de telefone e adiciona ao contato.

| Parâmetro      | Tipo             | Descrição                                  |
| -------------- | ---------------- | ------------------------------------------ |
| `contact`      | `Dict[str, Any]` | Estrutura do contato (modificada in-place) |
| `data`         | `Dict[str, Any]` | Dados do contato                           |
| `phone_fields` | `List[str]`      | Lista de campos de telefone                |

**Comportamento:**

- Para cada campo em `phone_fields`:
    - Extrai valor de `data`
    - Formata via `PhoneValidator.format()`
    - Adiciona a `contact["Phones"]`
- Se nenhum telefone adicionado: adiciona telefone vazio

**Estrutura de Telefone:**

```python
{
    "PhoneNumber": str,  # Formatado
    "TypeId": 0,
    "CountryId": 0
}
```

---

### `process_email_fields`

```python
def process_email_fields(
    self,
    other_props: List[Dict],
    data: Dict[str, Any],
    config: Dict[str, Any],
    email_fields: List[str],
) -> None
```

**Descrição:** Processa campos de email e adiciona às propriedades.

| Parâmetro      | Tipo             | Descrição                                   |
| -------------- | ---------------- | ------------------------------------------- |
| `other_props`  | `List[Dict]`     | Lista de propriedades (modificada in-place) |
| `data`         | `Dict[str, Any]` | Dados do contato                            |
| `config`       | `Dict[str, Any]` | Configuração de mapeamento                  |
| `email_fields` | `List[str]`      | Lista de campos de email                    |

**Validação Básica:**

- Verifica se string contém `@`
- Adiciona via `add_other_property` se válido

---

## EscritorioMapper

```python
class EscritorioMapper(ContactMapperBase):
    """Mapper especializado para escritórios."""
```

### `map_to_ploomes`

```python
def map_to_ploomes(self, escritorio_data: Dict[str, Any]) -> Tuple[Dict[str, Any], int]
```

**Descrição:** Mapeia dados do escritório para formato do Ploomes.

| Parâmetro         | Tipo             | Descrição           |
| ----------------- | ---------------- | ------------------- |
| `escritorio_data` | `Dict[str, Any]` | Dados do escritório |

**Retorno:** `Tuple[Dict, int]` - (contato_mapeado, tag_id)

**Campos Obrigatórios:**

| Campo           | Tipo  | Descrição          |
| --------------- | ----- | ------------------ |
| `Nome`          | `str` | Nome do escritório |
| `Pessoa_Física` | `str` | "Sim"/"Não"        |
| `CNPJ`          | `str` | CNPJ (se PJ)       |
| `CPF`           | `str` | CPF (se PF)        |

**Campos Opcionais:**

| Campo        | Tipo  | Descrição       |
| ------------ | ----- | --------------- |
| `Origem`     | `str` | Origem do lead  |
| `Marcadores` | `str` | Tags/marcadores |

**Lógica:**

1. Detecta se é Pessoa Física
    - Se `Pessoa_Física` in ["sim", "true", "1", "yes"] → PF
    - Caso contrário → PJ

2. Se PF:
    - `register` = None
    - Adiciona CPF em campo customizado
    - Limpa CNPJ

3. Se PJ:
    - `register` = CNPJ formatado
    - Limpa CPF

4. Adiciona flag booleana `contact_D9967550-1D97-4001-BB14-8AE9B9C27754` (É Pessoa Física)

5. Adiciona `LegalName` = Nome

**Tag Retornada:** `ContactTags.ESCRITORIO`

**Exemplo:**

```python
mapper = factory.get_escritorio_mapper()

# Pessoa Jurídica
escritorio_pj = {
    "Nome": "Silva Advogados",
    "Pessoa_Física": "Não",
    "CNPJ": "07617044000104",
    "Origem": "Site"
}
contact, tag_id = mapper.map_to_ploomes(escritorio_pj)

# Pessoa Física
escritorio_pf = {
    "Nome": "Dr. João Silva",
    "Pessoa_Física": "Sim",
    "CPF": "12345678900"
}
contact, tag_id = mapper.map_to_ploomes(escritorio_pf)
```

---

## AdvogadoMapper

```python
class AdvogadoMapper(ContactMapperBase):
    """Mapper especializado para advogados."""
```

### `map_to_ploomes`

```python
def map_to_ploomes(
    self,
    advogado_data: Dict[str, Any],
    company_id: Optional[int] = None
) -> Tuple[Dict[str, Any], int]
```

**Descrição:** Mapeia dados do advogado para formato do Ploomes.

| Parâmetro       | Tipo             | Descrição                          |
| --------------- | ---------------- | ---------------------------------- |
| `advogado_data` | `Dict[str, Any]` | Dados do advogado                  |
| `company_id`    | `int`            | ID da empresa associada (opcional) |

**Retorno:** `Tuple[Dict, int]` - (contato_mapeado, tag_id)

**Campos Obrigatórios:**

| Campo  | Tipo  | Descrição        |
| ------ | ----- | ---------------- |
| `Nome` | `str` | Nome do advogado |

**Campos Opcionais:**

| Campo      | Tipo  | Descrição        |
| ---------- | ----- | ---------------- |
| `CPF`      | `str` | CPF do advogado  |
| `Empresa`  | `str` | Nome da empresa  |
| `OAB`      | `str` | Número OAB       |
| `Cidade`   | `str` | Cidade           |
| `Etiqueta` | `str` | Tags             |
| `E-mail 1` | `str` | Email principal  |
| `E-mail 2` | `str` | Email secundário |
| `E-mail 3` | `str` | Email terciário  |

**TypeId:** `2` (Pessoa)

**Tag Retornada:** `ContactTags.ADVOGADO`

**Exemplo:**

```python
mapper = factory.get_advogado_mapper()

advogado_data = {
    "Nome": "Dr. João Silva",
    "CPF": "12345678900",
    "OAB": "SP123456",
    "Empresa": "Silva Advogados",
    "E-mail 1": "joao@silva.com"
}

contact, tag_id = mapper.map_to_ploomes(
    advogado_data,
    company_id=12345
)
```

---

## ReclamanteMapper

```python
class ReclamanteMapper(ContactMapperBase):
    """Mapper especializado para reclamantes."""
```

### `map_to_ploomes`

```python
def map_to_ploomes(self, reclamante_data: dict[str, Any]) -> tuple[dict[str, Any], int]
```

**Descrição:** Mapeia dados do reclamante para formato do Ploomes.

| Parâmetro         | Tipo             | Descrição           |
| ----------------- | ---------------- | ------------------- |
| `reclamante_data` | `dict[str, Any]` | Dados do reclamante |

**Retorno:** `tuple[dict, int]` - (contato_mapeado, tag_id)

**Campos Obrigatórios:**

| Campo  | Tipo  | Descrição          |
| ------ | ----- | ------------------ |
| `Nome` | `str` | Nome do reclamante |

**Campos Opcionais:**

| Campo       | Tipo        | Descrição                    |
| ----------- | ----------- | ---------------------------- |
| `CPF`       | `str`       | CPF (validação desabilitada) |
| `Telefones` | `list[str]` | Lista de telefones           |
| `UF`        | `str`       | UF do reclamante             |

**Validação de CPF:**

- `validate_first=False` → Não valida dígitos verificadores
- Permite CPFs inválidos (dados LEMIT podem ter CPFs inconsistentes)

**TypeId:** `2` (Pessoa)

**Tag Retornada:** `ContactTags.RECLAMANTE`

**Exemplo:**

```python
mapper = factory.get_reclamante_mapper()

reclamante_data = {
    "Nome": "Maria Santos",
    "CPF": "98765432100",
    "Telefones": ["11987654321", "11912345678"],
    "UF": "SP"
}

contact, tag_id = mapper.map_to_ploomes(reclamante_data)
```

---

### `_create_phones_list`

```python
def _create_phones_list(self, telefones: list[str]) -> list[dict[str, Any]]
```

**Descrição:** Cria lista de telefones no formato esperado pelo Ploomes.

| Parâmetro   | Tipo        | Descrição        |
| ----------- | ----------- | ---------------- |
| `telefones` | `list[str]` | Lista de números |

**Retorno:** `list[dict]` - Lista de objetos de telefone

**Estrutura de Telefone:**

```python
{
    "PhoneNumber": str,  # Formatado
    "SearchPhoneNumber": int,  # Apenas dígitos
    "TypeId": 1,
    "CountryId": None
}
```

**Comportamento:**

- Formata cada telefone via `PhoneValidator.format()`
- Calcula `SearchPhoneNumber` (apenas dígitos)
- Se lista vazia: adiciona telefone placeholder

**Exemplo:**

```python
telefones = ["(11) 98765-4321", "11912345678"]
phones_list = mapper._create_phones_list(telefones)
# Retorna:
# [
#     {
#         "PhoneNumber": "11987654321",
#         "SearchPhoneNumber": 11987654321,
#         "TypeId": 1,
#         "CountryId": None
#     },
#     {
#         "PhoneNumber": "11912345678",
#         "SearchPhoneNumber": 11912345678,
#         "TypeId": 1,
#         "CountryId": None
#     }
# ]
```

---

## DealMapper

```python
class DealMapper(ContactMapperBase):
    """Mapper especializado para Negócios (Deals)."""
```

### `map_to_ploomes`

```python
def map_to_ploomes(
    self,
    deal_data: PloomesImportModel,
    reclamante_id: Optional[int],
    escritorio_id: Optional[int],
    advogado_id: Optional[int]
) -> Dict[str, Any]
```

**Descrição:** Mapeia dados do negócio para formato do Ploomes.

| Parâmetro       | Tipo                 | Descrição                   |
| --------------- | -------------------- | --------------------------- |
| `deal_data`     | `PloomesImportModel` | Dados do negócio            |
| `reclamante_id` | `int`                | ID do reclamante (opcional) |
| `escritorio_id` | `int`                | ID do escritório (opcional) |
| `advogado_id`   | `int`                | ID do advogado (opcional)   |

**Retorno:** `Dict[str, Any]` - Payload do deal

**Campos do deal_data:**

| Campo        | Tipo        | Descrição                              |
| ------------ | ----------- | -------------------------------------- |
| `escritorio` | `str`       | Nome do escritório (usado como título) |
| `negociador` | `str`       | Nome do negociador                     |
| `origem`     | `str`       | Origem do lead                         |
| `uf`         | `str`       | UF do processo                         |
| `produto`    | `str`       | Produto/serviço                        |
| `stage_id`   | `int`       | ID do estágio                          |
| `tags_id`    | `list[int]` | IDs das tags                           |
| `cnj`        | `str`       | Número CNJ                             |

**Mapeamento de Enums:**

```python
OWNER_ID = Owner.get_id(deal_data.get('negociador'))
ORIGEM_ID = Origem.get_id(deal_data.get('origem'))
UF_ID = UFProcesso.get_id(deal_data.get('uf'))
PRODUTO_ID = Produto.get_id(deal_data.get('produto'))
```

**OtherProperties Mapeadas:**

| FieldKey                                    | Valor         | Tipo         |
| ------------------------------------------- | ------------- | ------------ |
| `deal_8E8988FD-C687-46F2-92A8-33D99EA6FB91` | PRODUTO_ID    | IntegerValue |
| `deal_F0EC6A32-2F8D-46B7-B04A-C3BFE4CE74C7` | UF_ID         | IntegerValue |
| `deal_4595023F-1F0D-40B2-A817-B69875738377` | escritorio_id | IntegerValue |
| `deal_1B949E92-A6E9-4731-8317-CFCE15F1E5A7` | reclamante_id | IntegerValue |
| `deal_20E8290A-809B-4CF1-9345-6B264AED7830` | cnj           | StringValue  |
| `deal_838FFA47-2031-447E-91A6-A659EED80FE4` | advogado_id   | IntegerValue |

**Estrutura do Retorno:**

```python
{
    "Title": str,
    "ContactId": int,
    "StageId": int,
    "Tags": [{"TagId": int}],
    "OtherProperties": [...],
    "OwnerId": int,
    "OriginId": int
}
```

**Exemplo:**

```python
mapper = factory.get_deal_mapper()

deal_data = {
    "escritorio": "Silva Advogados",
    "reclamante": "João Silva",
    "negociador": "Maria Santos",
    "origem": "Site",
    "uf": "SP",
    "produto": "Trabalhista",
    "stage_id": 123,
    "tags_id": [1, 2, 3],
    "cnj": "0001234-56.2023.5.01.0001"
}

payload = mapper.map_to_ploomes(
    deal_data,
    reclamante_id=456,
    escritorio_id=789,
    advogado_id=101
)
```

---

## ContactMapperFactory

```python
class ContactMapperFactory:
    """Factory para criar mappers de contato."""
```

### `__init__`

```python
def __init__(self, field_mappings: Dict[str, Any], logger):
```

| Parâmetro        | Tipo             | Descrição             |
| ---------------- | ---------------- | --------------------- |
| `field_mappings` | `Dict[str, Any]` | Mapeamentos de campos |
| `logger`         | `logging.Logger` | Logger                |

---

### Métodos Factory

#### `get_escritorio_mapper`

```python
def get_escritorio_mapper(self) -> EscritorioMapper
```

**Retorna:** `EscritorioMapper` - Mapper para escritórios

---

#### `get_advogado_mapper`

```python
def get_advogado_mapper(self) -> AdvogadoMapper
```

**Retorna:** `AdvogadoMapper` - Mapper para advogados

---

#### `get_reclamante_mapper`

```python
def get_reclamante_mapper(self) -> ReclamanteMapper
```

**Retorna:** `ReclamanteMapper` - Mapper para reclamantes

---

#### `get_deal_mapper`

```python
def get_deal_mapper(self) -> DealMapper
```

**Retorna:** `DealMapper` - Mapper para negócios

---

## Exemplos de Uso

### Exemplo 1: Uso Básico com Factory

```python
from src.ploomes_integration.utils.contact_mapper import ContactMapperFactory

# Configuração de mapeamentos
field_mappings = {
    "escritorio": {
        "Origem": {"field_key": "contact_ORIGEM"},
        "Marcadores": {"field_key": "contact_TAGS"}
    },
    "advogado": {
        "OAB": {"field_key": "contact_OAB"},
        "Empresa": {"field_key": "contact_EMPRESA"}
    }
}

# Criar factory
factory = ContactMapperFactory(field_mappings, logger)

# Criar mappers
escritorio_mapper = factory.get_escritorio_mapper()
advogado_mapper = factory.get_advogado_mapper()
reclamante_mapper = factory.get_reclamante_mapper()
deal_mapper = factory.get_deal_mapper()
```

### Exemplo 2: Mapear Escritório PJ

```python
escritorio_data = {
    "Nome": "Silva & Associados Advogados",
    "Pessoa_Física": "Não",
    "CNPJ": "07.617.044/0001-04",
    "Origem": "Site",
    "Marcadores": "Premium"
}

contact, tag_id = escritorio_mapper.map_to_ploomes(escritorio_data)
print(contact["Name"])  # "Silva & Associados Advogados"
print(contact["Register"])  # "07617044000104"
print(contact["TypeId"])  # 1
print(tag_id)  # ContactTags.ESCRITORIO
```

### Exemplo 3: Mapear Escritório PF

```python
escritorio_pf_data = {
    "Nome": "Dr. João Silva - Advogado",
    "Pessoa_Física": "Sim",
    "CPF": "123.456.789-00",
    "Origem": "Indicação"
}

contact, tag_id = escritorio_mapper.map_to_ploomes(escritorio_pf_data)
print(contact["Register"])  # None (PF não usa Register)
# CPF estará em OtherProperties
```

### Exemplo 4: Mapear Advogado com Empresa

```python
advogado_data = {
    "Nome": "Dr. Carlos Mendes",
    "CPF": "987.654.321-00",
    "OAB": "SP654321",
    "Empresa": "Silva Advogados",
    "Cidade": "São Paulo",
    "E-mail 1": "carlos@silva.com.br"
}

contact, tag_id = advogado_mapper.map_to_ploomes(
    advogado_data,
    company_id=12345  # ID do escritório
)
print(contact["CompanyId"])  # 12345
print(contact["TypeId"])  # 2 (Pessoa)
```

### Exemplo 5: Mapear Reclamante com Telefones

```python
reclamante_data = {
    "Nome": "Maria Oliveira Santos",
    "CPF": "111.222.333-44",  # Pode ser inválido
    "Telefones": [
        "(11) 98765-4321",
        "11 91234-5678",
        "11987654322"
    ],
    "UF": "SP"
}

contact, tag_id = reclamante_mapper.map_to_ploomes(reclamante_data)
print(len(contact["Phones"]))  # 3
print(contact["Phones"][0]["PhoneNumber"])  # "11987654321"
```

### Exemplo 6: Mapear Deal Completo

```python
deal_data = {
    "escritorio": "Silva Advogados",
    "reclamante": "Maria Santos",
    "advogado": "Dr. João Silva",
    "negociador": "Carlos Vendedor",
    "origem": "Site",
    "uf": "SP",
    "produto": "Trabalhista",
    "stage_id": 456,
    "tags_id": [10, 20, 30],
    "cnj": "0001234-56.2023.5.01.0001"
}

payload = deal_mapper.map_to_ploomes(
    deal_data,
    reclamante_id=789,
    escritorio_id=123,
    advogado_id=456
)

print(payload["Title"])  # "Silva Advogados"
print(payload["ContactId"])  # 789 (reclamante)
print(payload["StageId"])  # 456
print(len(payload["Tags"]))  # 3
```

---

## Melhores Práticas

### 1. Use Factory para Criar Mappers

```python
# ✅ BOM
factory = ContactMapperFactory(field_mappings, logger)
mapper = factory.get_escritorio_mapper()

# ❌ EVITE - Instanciação direta
mapper = EscritorioMapper(field_mappings, logger)
```

### 2. Valide Dados Antes de Mapear

```python
# ✅ BOM
from src.utils.validator import CPFValidator, CNPJValidator

if escritorio_data.get("Pessoa_Física") == "Sim":
    cpf = CPFValidator.clean_input(escritorio_data["CPF"])
    if not CPFValidator.is_valid(cpf):
        logger.warning(f"CPF inválido: {cpf}")
else:
    cnpj = CNPJValidator.clean_input(escritorio_data["CNPJ"])
    if not CNPJValidator.is_valid(cnpj):
        logger.warning(f"CNPJ inválido: {cnpj}")

contact, tag_id = mapper.map_to_ploomes(escritorio_data)
```

### 3. Sempre Passe Logger

```python
# ✅ BOM
import logging
logger = logging.getLogger(__name__)
factory = ContactMapperFactory(field_mappings, logger)

# ❌ EVITE
factory = ContactMapperFactory(field_mappings, None)
```

### 4. Reutilize Factory

```python
# ✅ BOM - Reutiliza factory
factory = ContactMapperFactory(field_mappings, logger)

for escritorio in escritorios:
    mapper = factory.get_escritorio_mapper()
    contact, tag = mapper.map_to_ploomes(escritorio)

# ❌ EVITE - Cria nova factory a cada iteração
for escritorio in escritorios:
    factory = ContactMapperFactory(field_mappings, logger)
    mapper = factory.get_escritorio_mapper()
```

### 5. Trate Campos Opcionais

```python
# ✅ BOM
advogado_data = {
    "Nome": "Dr. João Silva",
    "CPF": escritorio.get("CPF", ""),  # Default vazio
    "OAB": escritorio.get("OAB", ""),
}

# ❌ EVITE - Assume campos existem
advogado_data = {
    "Nome": "Dr. João Silva",
    "CPF": escritorio["CPF"],  # KeyError se não existir
}
```

### 6. Use Enums para IDs

```python
# ✅ BOM
from ..models import Origem, UFProcesso, Produto

origem_id = Origem.get_id("Site")
uf_id = UFProcesso.get_id("SP")
produto_id = Produto.get_id("Trabalhista")

# ❌ EVITE - IDs hardcoded
origem_id = 123
uf_id = 456
produto_id = 789
```

---

## Referências

- [CPFValidator, CNPJValidator](../utils/validator.md)
- [PloomesImportModel](../models.md)
- [ContactTags](../models.md#contacttags)
- [ContactService](../services/contacts.md)

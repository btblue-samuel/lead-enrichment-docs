# 📋 Documentação: RowBuilder

**Arquivo:** `src/ploomes_integration/clients/processors/row_builder.py`

**Módulo:** `ploomes_integration.clients.processors`

---

## 📑 Índice

- [Visão Geral](#visão-geral)
- [Classe RowBuilder](#classe-rowbuilder)
    - [Constantes de Classe](#constantes-de-classe)
    - [Métodos Públicos](#métodos-públicos)
    - [Métodos Privados](#métodos-privados)
- [Estrutura de Dados](#estrutura-de-dados)
- [Exemplos de Uso](#exemplos-de-uso)
- [Integração com Outros Componentes](#integração-com-outros-componentes)

---

## Visão Geral

O módulo `RowBuilder` é responsável por construir linhas de saída para planilhas no formato padronizado do Ploomes CRM. Ele combina dados de múltiplas fontes (LEMIT, Ploomes, entrada do usuário) e gera linhas formatadas prontas para exportação.

### Responsabilidades

| Responsabilidade      | Descrição                                    |
| --------------------- | -------------------------------------------- |
| **Formatação**        | Padroniza formato de saída para Ploomes      |
| **Headers Dinâmicos** | Gera headers baseado no número de marcadores |
| **Normalização**      | Normaliza nomes de escritórios e CPFs        |
| **Agregação de Tags** | Combina marcadores de múltiplas fontes       |
| **Validação**         | Formata CPFs de forma segura                 |

### Dependências

```python
import logging
from typing import Any, Dict, List, Optional

from src.utils.validator import CPFValidator
from .escritorio_normalizer import EscritorioNormalizer
```

---

## Classe RowBuilder

```python
class RowBuilder:
    """Constrói linhas de saída para planilhas com formato padronizado."""
```

### Constantes de Classe

#### `OUTPUT_HEADERS_BASE`

```python
OUTPUT_HEADERS_BASE = [
    "(Negócio) Estágio",
    "(Negócio) Título",
    "(Negócio) Responsável",
    "(Negócio) Origem",
    "(Negócio) Produto",
    "(Negócio) CNJ",
    "(Negócio) Resumo",
    "(Negócio) Escritório",
    "(Negócio) Usuários Colaboradores",
    "(Cliente) Tipo",
    "(Cliente) Responsável",
]
```

**Descrição:** Headers base relacionados aos dados de **Negócio** e parte inicial dos dados de **Cliente**.

**Total de Campos:** 11 campos

**Categorias:**

- **Negócio (9 campos):** Informações do deal/processo
- **Cliente (2 campos):** Tipo e responsável

---

#### `OUTPUT_HEADERS_FINAL`

```python
OUTPUT_HEADERS_FINAL = [
    "(Cliente) Nome",
    "(Cliente) CPF",
    "(Cliente) Advogado Principal",
    "(Cliente) Telefones1",
    "(Cliente) Telefones2",
    "(Cliente) Telefones3",
    "(Cliente) Telefones4",
    "(Cliente) E-mail",
    "(Cliente) E-mail2",
    "(Cliente) E-mail3",
]
```

**Descrição:** Headers finais relacionados aos dados do **Cliente** (contatos).

**Total de Campos:** 10 campos

**Categorias:**

- **Identificação (3 campos):** Nome, CPF, Advogado
- **Telefones (4 campos):** Até 4 telefones
- **E-mails (3 campos):** Até 3 e-mails

---

### Estrutura Completa de Headers

```
┌──────────────────────────────────────────────────────────────┐
│               ESTRUTURA DE HEADERS DE SAÍDA                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  OUTPUT_HEADERS_BASE (11 campos)                             │
│       │                                                      │
│       ├─► Negócio: Estágio, Título, Responsável, Origem,    │
│       │           Produto, CNJ, Resumo, Escritório,         │
│       │           Usuários Colaboradores                    │
│       │                                                      │
│       └─► Cliente: Tipo, Responsável                         │
│       │                                                      │
│       ▼                                                      │
│  MARCADORES (N campos dinâmicos)                             │
│       ├─► Marcadores (campo 1)                               │
│       ├─► Marcadores2 (campo 2)                              │
│       ├─► Marcadores3 (campo 3)                              │
│       └─► ... (até N marcadores)                             │
│       │                                                      │
│       ▼                                                      │
│  OUTPUT_HEADERS_FINAL (10 campos)                            │
│       └─► Cliente: Nome, CPF, Advogado Principal,            │
│                   Telefones1-4, E-mail1-3                    │
│                                                              │
│  TOTAL: 21 + N campos                                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Métodos Públicos

### `__init__`

```python
def __init__(
    self,
    logger: logging.Logger = None,
    normalizer: EscritorioNormalizer = None,
):
```

**Descrição:** Inicializa o construtor de linhas.

#### Parâmetros

| Parâmetro    | Tipo                   | Padrão | Descrição                                      |
| ------------ | ---------------------- | ------ | ---------------------------------------------- |
| `logger`     | `logging.Logger`       | `None` | Logger para mensagens (usa `__name__` se None) |
| `normalizer` | `EscritorioNormalizer` | `None` | Normalizador de nomes de escritórios           |

#### Atributos Inicializados

| Atributo           | Tipo                   | Descrição                    |
| ------------------ | ---------------------- | ---------------------------- |
| `self.logger`      | `logging.Logger`       | Logger configurado ou padrão |
| `self._normalizer` | `EscritorioNormalizer` | Normalizador (pode ser None) |

#### Exemplo

```python
from src.ploomes_integration.clients.processors import RowBuilder, EscritorioNormalizer

# Sem normalizador
builder = RowBuilder(logger=my_logger)

# Com normalizador
normalizer = EscritorioNormalizer()
builder = RowBuilder(logger=my_logger, normalizer=normalizer)
```

---

### `get_output_headers`

```python
def get_output_headers(self, num_marcadores: int = 1) -> List[str]
```

**Descrição:** Gera lista de headers dinâmica baseado no número de marcadores.

#### Parâmetros

| Parâmetro        | Tipo  | Padrão | Descrição                                        |
| ---------------- | ----- | ------ | ------------------------------------------------ |
| `num_marcadores` | `int` | `1`    | Número total de campos de marcadores necessários |

#### Retorno

`List[str]` - Lista de headers com campos de marcadores expandidos.

#### Lógica

1. Se `num_marcadores >= 1`: adiciona campo `"Marcadores"`
2. Para cada marcador adicional (2 até N): adiciona `"Marcadores{i}"`
3. Retorna: `OUTPUT_HEADERS_BASE + marcadores_headers + OUTPUT_HEADERS_FINAL`

#### Exemplos

```python
builder = RowBuilder()

# 1 marcador (padrão)
headers = builder.get_output_headers(1)
# [...OUTPUT_HEADERS_BASE, "Marcadores", ...OUTPUT_HEADERS_FINAL]
# Total: 22 campos

# 3 marcadores
headers = builder.get_output_headers(3)
# [...OUTPUT_HEADERS_BASE, "Marcadores", "Marcadores2", "Marcadores3", ...OUTPUT_HEADERS_FINAL]
# Total: 24 campos

# 0 marcadores
headers = builder.get_output_headers(0)
# [...OUTPUT_HEADERS_BASE, ...OUTPUT_HEADERS_FINAL]
# Total: 21 campos (sem campo de marcadores)
```

#### Estrutura de Saída

| num_marcadores | Campos de Marcadores                              | Total de Campos |
| :------------: | ------------------------------------------------- | :-------------: |
|       0        | Nenhum                                            |       21        |
|       1        | `Marcadores`                                      |       22        |
|       2        | `Marcadores`, `Marcadores2`                       |       23        |
|       3        | `Marcadores`, `Marcadores2`, `Marcadores3`        |       24        |
|       N        | `Marcadores`, `Marcadores2`, ..., `Marcadores{N}` |     21 + N      |

---

### `build_linha`

```python
def build_linha(
    self,
    ctx: Dict[str, Any],
    output_preset: Dict[str, Any],
    cpf: str,
    telefones: List[str],
    emails: List[str],
    tags: List[str] = None,
    headers: List[str] = None,
    row_marcadores: List[str] = None,
) -> Dict[str, Any]
```

**Descrição:** Cria a linha padrão seguindo OUTPUT_HEADERS e preenchendo faltas com strings vazias.

#### Parâmetros

| Parâmetro        | Tipo             | Padrão | Descrição                                          |
| ---------------- | ---------------- | ------ | -------------------------------------------------- |
| `ctx`            | `Dict[str, Any]` | -      | Contexto da linha com dados extraídos              |
| `output_preset`  | `Dict[str, Any]` | -      | Preset de saída com valores padrão                 |
| `cpf`            | `str`            | -      | CPF formatado                                      |
| `telefones`      | `List[str]`      | -      | Lista de telefones (até 4)                         |
| `emails`         | `List[str]`      | -      | Lista de emails (até 3)                            |
| `tags`           | `List[str]`      | `None` | Tags da CLI a serem adicionadas                    |
| `headers`        | `List[str]`      | `None` | Headers de saída (calcula automaticamente se None) |
| `row_marcadores` | `List[str]`      | `None` | Marcadores específicos da linha (da planilha)      |

#### Retorno

`Dict[str, Any]` - Dicionário com a linha formatada pronta para exportação.

#### Estrutura do Parâmetro `ctx`

```python
ctx = {
    "escritorio": str,      # Nome do escritório
    "estágio": str,         # Estágio do negócio
    "negociador": str,      # Responsável/negociador
    "origem": str,          # Origem do lead
    "produto": str,         # Produto/serviço
    "cnj": str,             # Número CNJ
    "nome": str,            # Nome do cliente
    "advogado": str,        # Advogado principal
}
```

#### Estrutura do Parâmetro `output_preset`

```python
output_preset = {
    "estagio": str,         # Estágio padrão
    "titulo": str,          # Título padrão
    "marcadores": str,      # Marcador padrão do preset
}
```

#### Fluxo de Execução

```
┌──────────────────────────────────────────────────────────────┐
│                    BUILD_LINHA WORKFLOW                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Agregação de Tags                                        │
│       ├── Adicionar row_marcadores (da planilha)             │
│       ├── Adicionar preset marcadores                        │
│       └── Adicionar tags da CLI                              │
│       │                                                      │
│       ▼                                                      │
│  2. Calcular Headers                                         │
│       └── Se headers=None: get_output_headers(len(all_tags)) │
│       │                                                      │
│       ▼                                                      │
│  3. Criar Linha Base                                         │
│       └── {header: "" for header in headers}                 │
│       │                                                      │
│       ▼                                                      │
│  4. Normalizar Escritório                                    │
│       └── _normalize_escritorio(ctx["escritorio"])           │
│       │                                                      │
│       ▼                                                      │
│  5. Preencher Campos de Negócio                              │
│       ├── Estágio (from preset ou ctx)                       │
│       ├── Título (from preset ou escritorio_normalizado)     │
│       ├── Responsável, Origem, Produto, CNJ                  │
│       └── Escritório (normalizado)                           │
│       │                                                      │
│       ▼                                                      │
│  6. Preencher Campos de Cliente                              │
│       ├── Tipo = "Pessoa"                                    │
│       └── Responsável                                        │
│       │                                                      │
│       ▼                                                      │
│  7. Preencher Marcadores                                     │
│       ├── Marcador 1 → "Marcadores"                          │
│       ├── Marcador 2 → "Marcadores2"                         │
│       └── Marcador N → "Marcadores{N}"                       │
│       │                                                      │
│       ▼                                                      │
│  8. Preencher Dados Finais de Cliente                        │
│       ├── Nome (uppercase)                                   │
│       ├── CPF (formatado)                                    │
│       ├── Advogado Principal (uppercase)                     │
│       ├── Telefones 1-4 (_ls helper)                         │
│       └── E-mails 1-3 (_ls helper)                           │
│       │                                                      │
│       ▼                                                      │
│  9. Retornar Linha Completa                                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

#### Exemplo de Uso

```python
builder = RowBuilder(logger=logger, normalizer=normalizer)

ctx = {
    "escritorio": "Silva & Associados Advogados",
    "estágio": "Prospecção",
    "negociador": "João Silva",
    "origem": "Website",
    "produto": "Consultoria Jurídica",
    "cnj": "0001234-56.2024.5.01.0001",
    "nome": "Maria Santos",
    "advogado": "Dr. João Silva",
}

output_preset = {
    "estagio": "Lead",
    "titulo": None,
    "marcadores": "Prospect",
}

linha = builder.build_linha(
    ctx=ctx,
    output_preset=output_preset,
    cpf="12345678901",
    telefones=["11987654321", "1133334444"],
    emails=["maria@example.com", "maria.santos@company.com"],
    tags=["Lote 1", "Prioritário"],
    row_marcadores=["Janeiro 2024"],
)

# Resultado:
# {
#     "(Negócio) Estágio": "Lead",
#     "(Negócio) Título": "SILVA & ASSOCIADOS",
#     "(Negócio) Responsável": "João Silva",
#     "(Negócio) Origem": "Website",
#     "(Negócio) Produto": "Consultoria Jurídica",
#     "(Negócio) CNJ": "0001234-56.2024.5.01.0001",
#     "(Negócio) Resumo": "",
#     "(Negócio) Escritório": "SILVA & ASSOCIADOS",
#     "(Negócio) Usuários Colaboradores": "",
#     "(Cliente) Tipo": "Pessoa",
#     "(Cliente) Responsável": "João Silva",
#     "Marcadores": "Janeiro 2024",         # row_marcadores
#     "Marcadores2": "Prospect",            # preset
#     "Marcadores3": "Lote 1",              # tags CLI
#     "Marcadores4": "Prioritário",         # tags CLI
#     "(Cliente) Nome": "MARIA SANTOS",
#     "(Cliente) CPF": "123.456.789-01",
#     "(Cliente) Advogado Principal": "DR. JOÃO SILVA",
#     "(Cliente) Telefones1": "11987654321",
#     "(Cliente) Telefones2": "1133334444",
#     "(Cliente) Telefones3": "",
#     "(Cliente) Telefones4": "",
#     "(Cliente) E-mail": "maria@example.com",
#     "(Cliente) E-mail2": "maria.santos@company.com",
#     "(Cliente) E-mail3": "",
# }
```

#### Prioridade de Marcadores

```
1. row_marcadores (marcadores da planilha de entrada)
   ↓
2. output_preset["marcadores"] (marcador do preset)
   ↓
3. tags (tags da CLI)
```

**Nota:** Tags duplicadas são removidas automaticamente.

#### Campos com Fallback

| Campo               | Fonte Primária             | Fallback                 |
| ------------------- | -------------------------- | ------------------------ |
| `(Negócio) Estágio` | `output_preset["estagio"]` | `ctx["estágio"]`         |
| `(Negócio) Título`  | `output_preset["titulo"]`  | `escritorio_normalizado` |

#### Formatação Especial

| Campo              | Formatação                              |
| ------------------ | --------------------------------------- |
| Nome               | `.upper()` - Sempre maiúsculas          |
| CPF                | Formatado como `XXX.XXX.XXX-XX`         |
| Advogado Principal | `.upper()` - Sempre maiúsculas          |
| Escritório         | Normalizado (se normalizer configurado) |

---

## Métodos Privados

### `_normalize_escritorio`

```python
def _normalize_escritorio(self, name: str) -> str
```

**Descrição:** Normaliza nome do escritório se normalizer estiver configurado.

#### Parâmetros

| Parâmetro | Tipo  | Descrição                   |
| --------- | ----- | --------------------------- |
| `name`    | `str` | Nome original do escritório |

#### Retorno

`str` - Nome normalizado ou original.

#### Comportamento

- **Se `self._normalizer` está configurado:** Chama `normalizer.normalize_for_output(name)`
- **Se `self._normalizer` é None:** Retorna o nome original sem modificações

#### Exemplo

```python
# Com normalizador
builder = RowBuilder(normalizer=EscritorioNormalizer())
normalized = builder._normalize_escritorio("Silva & Associados Advogados")
# "SILVA & ASSOCIADOS"

# Sem normalizador
builder = RowBuilder()
normalized = builder._normalize_escritorio("Silva & Associados Advogados")
# "Silva & Associados Advogados"
```

---

### `_format_cpf_safe`

```python
def _format_cpf_safe(self, cpf: str) -> str
```

**Descrição:** Formata CPF de forma segura, tratando erros silenciosamente.

#### Parâmetros

| Parâmetro | Tipo  | Descrição         |
| --------- | ----- | ----------------- |
| `cpf`     | `str` | CPF para formatar |

#### Retorno

`str` - CPF formatado ou string vazia/original.

#### Comportamento

```
┌──────────────────────────────────────────────────────────────┐
│                    _FORMAT_CPF_SAFE LOGIC                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  cpf está vazio/None?                                        │
│       │                                                      │
│       ├─► SIM: retorna ""                                    │
│       │                                                      │
│       └─► NÃO: tenta formatar                                │
│             │                                                │
│             ├─► Sucesso: retorna CPF formatado               │
│             │           (XXX.XXX.XXX-XX)                     │
│             │                                                │
│             └─► Exceção: retorna CPF original                │
│                         (sem formatação)                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

#### Exemplo

```python
builder = RowBuilder()

# CPF válido
formatted = builder._format_cpf_safe("12345678901")
# "123.456.789-01"

# CPF inválido (não quebra)
formatted = builder._format_cpf_safe("invalid")
# "invalid"

# CPF vazio
formatted = builder._format_cpf_safe("")
# ""

# CPF None
formatted = builder._format_cpf_safe(None)
# ""
```

---

### `_ls`

```python
def _ls(self, itens: List[Any], idx: int) -> str
```

**Descrição:** Retorna item da lista por índice ou string vazia (list safe accessor).

#### Parâmetros

| Parâmetro | Tipo        | Descrição                 |
| --------- | ----------- | ------------------------- |
| `itens`   | `List[Any]` | Lista de itens            |
| `idx`     | `int`       | Índice desejado (0-based) |

#### Retorno

`str` - Item no índice ou string vazia se fora dos limites.

#### Comportamento

- **Se lista é None ou vazia:** Retorna `""`
- **Se índice está fora dos limites:** Retorna `""`
- **Se índice é válido:** Retorna `itens[idx]`

#### Exemplo

```python
builder = RowBuilder()

telefones = ["11987654321", "1133334444"]

tel1 = builder._ls(telefones, 0)  # "11987654321"
tel2 = builder._ls(telefones, 1)  # "1133334444"
tel3 = builder._ls(telefones, 2)  # ""
tel4 = builder._ls(telefones, 3)  # ""

# Lista vazia
tel = builder._ls([], 0)  # ""

# Lista None
tel = builder._ls(None, 0)  # ""
```

#### Uso no build_linha

```python
base["(Cliente) Telefones1"] = self._ls(telefones, 0)
base["(Cliente) Telefones2"] = self._ls(telefones, 1)
base["(Cliente) Telefones3"] = self._ls(telefones, 2)
base["(Cliente) Telefones4"] = self._ls(telefones, 3)
base["(Cliente) E-mail"] = self._ls(emails, 0)
base["(Cliente) E-mail2"] = self._ls(emails, 1)
base["(Cliente) E-mail3"] = self._ls(emails, 2)
```

---

## Estrutura de Dados

### Mapeamento de Campos

#### Campos de Negócio (Deal)

| Campo Planilha | Campo Ploomes                      | Fonte                                                 | Transformação |
| -------------- | ---------------------------------- | ----------------------------------------------------- | ------------- |
| -              | `(Negócio) Estágio`                | `output_preset["estagio"]` ou `ctx["estágio"]`        | Nenhuma       |
| -              | `(Negócio) Título`                 | `output_preset["titulo"]` ou `escritorio_normalizado` | Normalização  |
| Negociador     | `(Negócio) Responsável`            | `ctx["negociador"]`                                   | Nenhuma       |
| Origem         | `(Negócio) Origem`                 | `ctx["origem"]`                                       | Nenhuma       |
| Produto        | `(Negócio) Produto`                | `ctx["produto"]`                                      | Nenhuma       |
| CNJ            | `(Negócio) CNJ`                    | `ctx["cnj"]`                                          | Nenhuma       |
| -              | `(Negócio) Resumo`                 | -                                                     | Sempre vazio  |
| Escritório     | `(Negócio) Escritório`             | `ctx["escritorio"]`                                   | Normalização  |
| -              | `(Negócio) Usuários Colaboradores` | -                                                     | Sempre vazio  |

#### Campos de Cliente (Contact)

| Campo Planilha | Campo Ploomes                  | Fonte               | Transformação             |
| -------------- | ------------------------------ | ------------------- | ------------------------- |
| -              | `(Cliente) Tipo`               | Fixo                | Sempre "Pessoa"           |
| Negociador     | `(Cliente) Responsável`        | `ctx["negociador"]` | Nenhuma                   |
| Reclamante     | `(Cliente) Nome`               | `ctx["nome"]`       | `.upper()`                |
| CPF            | `(Cliente) CPF`                | `cpf` param         | Formatação XXX.XXX.XXX-XX |
| Advogado       | `(Cliente) Advogado Principal` | `ctx["advogado"]`   | `.upper()`                |
| -              | `(Cliente) Telefones1-4`       | `telefones` list    | Até 4 telefones           |
| -              | `(Cliente) E-mail1-3`          | `emails` list       | Até 3 emails              |

#### Campos de Marcadores (Tags)

| Campo Planilha | Campo Ploomes   | Fonte                                      | Prioridade |
| -------------- | --------------- | ------------------------------------------ | ---------- |
| Marcadores     | `Marcadores`    | `row_marcadores[0]`                        | 1ª         |
| -              | `Marcadores2`   | `output_preset["marcadores"]` ou `tags[0]` | 2ª/3ª      |
| -              | `Marcadores3-N` | `tags[1-N]`                                | 3ª         |

---

## Exemplos de Uso

### Uso Básico

```python
from src.ploomes_integration.clients.processors import RowBuilder

logger = logging.getLogger(__name__)
builder = RowBuilder(logger=logger)

# Dados mínimos
ctx = {
    "escritorio": "Silva Advogados",
    "nome": "João Silva",
    "cnj": "0001234-56.2024.5.01.0001",
    "negociador": "Ana Costa",
    "advogado": "Dr. Silva",
}

output_preset = {
    "estagio": "Lead",
}

linha = builder.build_linha(
    ctx=ctx,
    output_preset=output_preset,
    cpf="12345678901",
    telefones=["11987654321"],
    emails=["joao@example.com"],
)
```

### Uso com Normalização

```python
from src.ploomes_integration.clients.processors import (
    RowBuilder,
    EscritorioNormalizer,
)

# Configurar normalização
normalizer = EscritorioNormalizer()
builder = RowBuilder(logger=logger, normalizer=normalizer)

ctx = {
    "escritorio": "Silva & Associados Sociedade de Advogados Ltda.",
    # ... outros campos
}

linha = builder.build_linha(ctx, output_preset, cpf, telefones, emails)
# "(Negócio) Escritório" será "SILVA & ASSOCIADOS"
```

### Uso com Múltiplos Marcadores

```python
# Marcadores de diferentes fontes
row_marcadores = ["Janeiro 2024", "Escritório X"]  # da planilha
output_preset = {"marcadores": "Prospect"}          # do preset
tags = ["Lote 1", "Alta Prioridade"]               # da CLI

linha = builder.build_linha(
    ctx=ctx,
    output_preset=output_preset,
    cpf=cpf,
    telefones=telefones,
    emails=emails,
    tags=tags,
    row_marcadores=row_marcadores,
)

# Resultado:
# "Marcadores": "Janeiro 2024"      (row_marcadores[0])
# "Marcadores2": "Escritório X"     (row_marcadores[1])
# "Marcadores3": "Prospect"         (preset)
# "Marcadores4": "Lote 1"           (tags[0])
# "Marcadores5": "Alta Prioridade"  (tags[1])
```

### Uso com Headers Customizados

```python
# Calcular headers manualmente
num_tags = 5
headers = builder.get_output_headers(num_marcadores=num_tags)

# Usar headers pré-calculados
linha = builder.build_linha(
    ctx=ctx,
    output_preset=output_preset,
    cpf=cpf,
    telefones=telefones,
    emails=emails,
    headers=headers,  # passa headers pré-calculados
)
```

### Uso em Loop (Processamento em Lote)

```python
builder = RowBuilder(logger=logger, normalizer=normalizer)

# Dados de entrada
input_data = [
    {"nome": "Maria Silva", "cpf": "11111111111", ...},
    {"nome": "João Santos", "cpf": "22222222222", ...},
    # ... mais registros
]

# Processar todas as linhas
output_rows = []
for record in input_data:
    ctx = extract_context(record)  # função para extrair contexto
    linha = builder.build_linha(
        ctx=ctx,
        output_preset=default_preset,
        cpf=record["cpf"],
        telefones=record.get("telefones", []),
        emails=record.get("emails", []),
    )
    output_rows.append(linha)

# Criar DataFrame
import pandas as pd
df_output = pd.DataFrame(output_rows)
```

---

## Integração com Outros Componentes

### Com ExcelProcessor

```python
# No ExcelProcessor
from .processors import RowBuilder

class ExcelProcessor:
    def __init__(self, ...):
        self._row_builder = RowBuilder(
            logger=self.logger,
            normalizer=self._normalizer,
        )

    def _construir_linha_saida(self, ctx, ...):
        return self._row_builder.build_linha(
            ctx=ctx,
            output_preset=self.output_preset,
            cpf=cpf,
            telefones=telefones,
            emails=emails,
            tags=self.tags_cli,
            row_marcadores=row_marcadores,
        )
```

### Com EscritorioNormalizer

```python
from .processors import RowBuilder, EscritorioNormalizer

normalizer = EscritorioNormalizer()
builder = RowBuilder(logger=logger, normalizer=normalizer)

# Escritório será normalizado automaticamente em build_linha
ctx = {"escritorio": "Silva & Associados Advogados Ltda."}
linha = builder.build_linha(ctx, ...)
# "(Negócio) Escritório": "SILVA & ASSOCIADOS"
```

### Com CPFValidator

```python
# CPFValidator é usado internamente em _format_cpf_safe
from src.utils.validator import CPFValidator

# Formatação automática
cpf_raw = "12345678901"
linha = builder.build_linha(ctx, output_preset, cpf=cpf_raw, ...)
# "(Cliente) CPF": "123.456.789-01"
```

---

## Melhores Práticas

### 1. Sempre Use Normalizer em Produção

```python
# ✅ BOM
normalizer = EscritorioNormalizer()
builder = RowBuilder(logger=logger, normalizer=normalizer)

# ❌ EVITE (sem normalização)
builder = RowBuilder(logger=logger)
```

### 2. Valide CPFs Antes de Passar

```python
# ✅ BOM
from src.utils.validator import CPFValidator

if CPFValidator.is_valid(cpf):
    linha = builder.build_linha(..., cpf=cpf, ...)
else:
    # Tratar CPF inválido
```

### 3. Pré-calcule Headers para Performance

```python
# ✅ BOM (em loop)
num_tags = max_num_marcadores(all_records)
headers = builder.get_output_headers(num_tags)

for record in records:
    linha = builder.build_linha(..., headers=headers)  # reusa headers

# ❌ EVITE (recalcula a cada iteração)
for record in records:
    linha = builder.build_linha(...)  # headers=None
```

### 4. Agrupe Tags Corretamente

```python
# ✅ BOM (ordem correta)
linha = builder.build_linha(
    row_marcadores=["Tag da Planilha"],  # prioridade 1
    output_preset={"marcadores": "Preset"},  # prioridade 2
    tags=["CLI Tag"],  # prioridade 3
)

# Tags serão ordenadas: ["Tag da Planilha", "Preset", "CLI Tag"]
```

### 5. Trate Campos Vazios Apropriadamente

```python
# ✅ BOM
ctx = {
    "escritorio": record.get("escritorio", ""),
    "nome": record.get("nome", ""),
    # ... garante que campos existem
}

# ❌ EVITE (pode causar KeyError)
ctx = {
    "escritorio": record["escritorio"],  # pode não existir
}
```

---

## Limitações

| Limitação                | Descrição                   | Solução                                        |
| ------------------------ | --------------------------- | ---------------------------------------------- |
| **Máx. 4 Telefones**     | Apenas 4 campos de telefone | Concatenar ou criar lógica personalizada       |
| **Máx. 3 E-mails**       | Apenas 3 campos de e-mail   | Concatenar ou criar lógica personalizada       |
| **Campos Fixos**         | Estrutura de headers é fixa | Estender classe se precisar customizar         |
| **Tipo sempre "Pessoa"** | `(Cliente) Tipo` fixo       | Customizar `build_linha` se precisar "Empresa" |

---

## Referências

| Componente           | Arquivo                                                               | Descrição                     |
| -------------------- | --------------------------------------------------------------------- | ----------------------------- |
| RowBuilder           | `src/ploomes_integration/clients/processors/row_builder.py`           | Este módulo                   |
| EscritorioNormalizer | `src/ploomes_integration/clients/processors/escritorio_normalizer.py` | Normalização de escritórios   |
| CPFValidator         | `src/utils/validator.py`                                              | Validação e formatação de CPF |
| ExcelProcessor       | `src/ploomes_integration/clients/excel_processor.py`                  | Usa RowBuilder                |

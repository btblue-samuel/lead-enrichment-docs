# 📋 Documentação Completa de Workflows

Este documento descreve detalhadamente todos os workflows disponíveis no sistema de automação LEMIT → Ploomes, incluindo suas funções, parâmetros, fluxos e casos de uso.

---

## 📑 Índice

- [Visão Geral](#visão-geral)
- [Tipos de Workflows](#tipos-de-workflows)
- [Workflow Router](#workflow-router)
    - [Classe WorkflowRouter](#classe-workflowrouter)
    - [Métodos do WorkflowRouter](#métodos-do-workflowrouter)
- [Workflows LEMIT](#workflows-lemit)
    - [lemit-cpf](#lemit-cpf)
    - [lemit-nome](#lemit-nome)
- [Workflows Ploomes](#workflows-ploomes)
    - [ploomes-only](#ploomes-only)
    - [advogados](#advogados)
- [Workflow Escritório](#workflow-escritório)
    - [escritorio-only](#escritorio-only)
- [Workflows Combinados (Pipeline Completo)](#workflows-combinados-pipeline-completo)
    - [cpf](#cpf)
    - [nome](#nome)
- [Detecção Automática de Workflow](#detecção-automática-de-workflow)
- [Validação de Colunas](#validação-de-colunas)
- [Observabilidade](#observabilidade)
- [Exemplos de Uso](#exemplos-de-uso)

---

## Visão Geral

O sistema oferece diferentes pipelines de processamento para atender a diferentes necessidades de negócio:

| Workflow          | Descrição                         | LEMIT | Ploomes | Uso Principal                    |
| ----------------- | --------------------------------- | :---: | :-----: | -------------------------------- |
| `lemit-cpf`       | Enriquecimento apenas via CPF     |  ✅   |   ❌    | Buscar telefones/emails por CPF  |
| `lemit-nome`      | Enriquecimento apenas via Nome    |  ✅   |   ❌    | Buscar telefones/emails por nome |
| `ploomes-only`    | Importação apenas para CRM        |  ❌   |   ✅    | Criar advogados/escritórios      |
| `advogados`       | Alias para `ploomes-only`         |  ❌   |   ✅    | Compatibilidade retroativa       |
| `escritorio-only` | Busca escritório + enriquecimento |  ✅   |   ✅    | Quando só tem nome do escritório |
| `cpf`             | Pipeline completo via CPF         |  ✅   |   ✅    | Fluxo completo com CPF           |
| `nome`            | Pipeline completo via Nome        |  ✅   |   ✅    | Fluxo completo sem CPF           |

---

## Tipos de Workflows

### Arquitetura de Módulos

```
src/workflows/
├── __init__.py              # Exporta todas as funções de workflow
├── workflow_router.py       # Detecção automática e validação
├── lemit_workflows.py       # Workflows apenas LEMIT
├── ploomes_workflows.py     # Workflows apenas Ploomes
├── combined_workflows.py    # Pipelines completos
└── escritorio_workflow.py   # Workflow de escritório
```

### Exports do Pacote

```python
from workflows import (
    # LEMIT workflows
    executar_fluxo_lemit_cpf,
    executar_fluxo_lemit_nome,
    # Ploomes workflows
    executar_fluxo_ploomes_only,
    executar_fluxo_advogados,
    # Escritorio workflow
    executar_fluxo_escritorio_only,
    # Combined workflows
    executar_pipeline_completo,
)
```

---

## Workflow Router

### Classe WorkflowRouter

**Arquivo:** `src/workflows/workflow_router.py`

**Descrição:** Responsável pela detecção automática de workflow baseado nos cabeçalhos do arquivo de entrada e validação de colunas obrigatórias.

```python
class WorkflowRouter:
    """
    Decide qual fluxo rodar baseado nos cabeçalhos:
    - OAB/Advogado presente? -> Pipeline com Integração Ploomes.
    - Apenas Reclamante/CPF? -> Apenas Enriquecimento Lemit.
    """
```

#### Observability Features

- 📝 Logging estruturado com `correlation_id`
- ⏱️ Métricas de detecção de workflow
- 📊 Análise detalhada de colunas detectadas
- 📈 Tracking de workflows detectados

---

### Métodos do WorkflowRouter

#### `__init__`

```python
def __init__(self, logger: logging.Logger)
```

**Descrição:** Inicializa o roteador de workflows.

| Parâmetro | Tipo             | Descrição                                   |
| --------- | ---------------- | ------------------------------------------- |
| `logger`  | `logging.Logger` | Logger configurado para registrar operações |

**Atributos Inicializados:**

| Atributo                | Tipo              | Descrição                     |
| ----------------------- | ----------------- | ----------------------------- |
| `self.logger`           | `logging.Logger`  | Logger para operações         |
| `self._metrics`         | `MetricsRegistry` | Registry de métricas          |
| `self._detection_count` | `int`             | Contador de detecções         |
| `self._workflow_counts` | `dict[str, int]`  | Contagem por tipo de workflow |

---

#### `get_stats`

```python
def get_stats(self) -> dict
```

**Descrição:** Retorna estatísticas de detecção de workflows.

**Retorno:**

```python
{
    "total_detections": int,      # Total de detecções realizadas
    "workflow_counts": dict,      # Contagem por tipo de workflow
    "metrics": dict               # Métricas de performance
}
```

**Exemplo:**

```python
router = WorkflowRouter(logger)
stats = router.get_stats()
# {
#     "total_detections": 15,
#     "workflow_counts": {"cpf": 8, "nome": 5, "ploomes-only": 2},
#     "metrics": {"average_duration_ms": 45.2, ...}
# }
```

---

#### `detect_workflow`

```python
def detect_workflow(self, input_file: str) -> Optional[str]
```

**Descrição:** Detecta automaticamente o workflow baseado nas colunas do arquivo.

| Parâmetro    | Tipo  | Descrição                                     |
| ------------ | ----- | --------------------------------------------- |
| `input_file` | `str` | Caminho para o arquivo de entrada (Excel/CSV) |

**Retorno:** `Optional[str]` - Nome do workflow detectado ou `None` se não detectado.

**Workflows Possíveis:**

- `"cpf"` - Pipeline completo com CPF
- `"nome"` - Pipeline completo com Nome
- `"ploomes-only"` - Apenas importação Ploomes
- `"escritorio-only"` - Escritório + enriquecimento
- `"lemit-cpf"` - Apenas LEMIT por CPF
- `"lemit-nome"` - Apenas LEMIT por Nome

**Lógica de Detecção:**

```
┌─────────────────────────────────────────────────────────────┐
│                    DETECÇÃO DE WORKFLOW                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tem OAB/Advogado com valores?                              │
│       │                                                     │
│       ├── SIM ──┬── Tem CPF com valores? ─── → "cpf"        │
│       │         │                                           │
│       │         ├── Tem Nome (sem CPF)? ──── → "nome"       │
│       │         │                                           │
│       │         └── Sem dados reclamante ─── → "ploomes-    │
│       │                                           only"     │
│       │                                                     │
│       └── NÃO ──┬── Tem Escritório + (CPF ou Nome)?         │
│                 │        └───────────────────→ "escritorio- │
│                 │                                  only"    │
│                 │                                           │
│                 ├── Tem CPF com valores? ─── → "lemit-cpf"  │
│                 │                                           │
│                 └── Tem Nome com valores? ── → "lemit-nome" │
│                                                             │
│  ⚠️ Se nenhuma condição: retorna None                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Exemplo:**

```python
router = WorkflowRouter(logger)
workflow = router.detect_workflow("dados.xlsx")
# "cpf" - se arquivo tem OAB + CPF preenchidos
```

---

#### `validate_required_columns`

```python
def validate_required_columns(self, input_file: str, workflow: str = None) -> dict
```

**Descrição:** Valida se as colunas obrigatórias estão preenchidas antes do processamento.

| Parâmetro    | Tipo  | Padrão | Descrição                                     |
| ------------ | ----- | ------ | --------------------------------------------- |
| `input_file` | `str` | -      | Caminho para o arquivo de entrada             |
| `workflow`   | `str` | `None` | Nome do workflow (para validação condicional) |

**Retorno:**

```python
{
    "valid": bool,           # True se validação passou
    "errors": list[str],     # Lista de erros encontrados
    "warnings": list[str],   # Lista de avisos
    "missing_rows": dict     # Linhas com valores faltantes por coluna
}
```

**Regras de Validação por Workflow:**

| Workflow          | CNJ | Reclamante | CPF | Escritório | Advogado | OAB |
| ----------------- | :-: | :--------: | :-: | :--------: | :------: | :-: |
| `lemit-cpf`       | ✅  |     ✅     | ⚠️  |     ❌     |    ❌    | ❌  |
| `lemit-nome`      | ✅  |     ✅     | ❌  |     ❌     |    ❌    | ❌  |
| `ploomes-only`    | ❌  |     ❌     | ❌  |    ✅¹     |   ✅¹    | ✅¹ |
| `advogados`       | ❌  |     ❌     | ❌  |    ✅¹     |   ✅¹    | ✅¹ |
| `escritorio-only` | ✅  |     ✅     | ❌  |     ✅     |    ❌    | ❌  |
| `cpf`             | ✅  |     ✅     | ⚠️  |    ✅¹     |   ✅¹    | ✅¹ |
| `nome`            | ✅  |     ✅     | ❌  |    ✅¹     |   ✅¹    | ✅¹ |

> **Legenda:** ✅ = Obrigatório | ⚠️ = Recomendado (warn) | ❌ = Não necessário | ¹ = Escritório OU (Advogado + OAB)

**Exemplo:**

```python
router = WorkflowRouter(logger)
result = router.validate_required_columns("dados.xlsx", workflow="cpf")

if not result["valid"]:
    for error in result["errors"]:
        print(error)
    # ❌ Coluna obrigatória não encontrada: CNJ
    # ❌ Coluna 'Reclamante' tem 5 linha(s) vazia(s): linhas 2, 5, 8, 12, 15
```

---

#### `_normalize_header`

```python
def _normalize_header(self, header: str) -> str
```

**Descrição:** Normaliza um cabeçalho removendo acentos e convertendo para minúsculas.

| Parâmetro | Tipo  | Descrição                    |
| --------- | ----- | ---------------------------- |
| `header`  | `str` | Cabeçalho original da coluna |

**Retorno:** `str` - Cabeçalho normalizado (ASCII, lowercase, stripped).

**Exemplo:**

```python
router._normalize_header("Número do Processo")
# "numero do processo"

router._normalize_header("ADVOGADO (OAB)")
# "advogado (oab)"
```

---

#### `_find_column`

```python
def _find_column(self, headers: dict, keywords: list[str]) -> str
```

**Descrição:** Encontra uma coluna baseado em palavras-chave.

| Parâmetro  | Tipo        | Descrição                            |
| ---------- | ----------- | ------------------------------------ |
| `headers`  | `dict`      | Dicionário `{normalizado: original}` |
| `keywords` | `list[str]` | Lista de palavras-chave para busca   |

**Retorno:** `str` - Nome original da coluna ou `None`.

**Exemplo:**

```python
headers = {"cnj": "CNJ", "reclamante": "Reclamante", "advogado": "Advogado"}
col = router._find_column(headers, ["cnj", "processo"])
# "CNJ"
```

---

#### `_has_any_value`

```python
def _has_any_value(self, df: pd.DataFrame, column: str) -> bool
```

**Descrição:** Verifica se uma coluna tem algum valor não-vazio.

| Parâmetro | Tipo           | Descrição              |
| --------- | -------------- | ---------------------- |
| `df`      | `pd.DataFrame` | DataFrame com os dados |
| `column`  | `str`          | Nome da coluna         |

**Retorno:** `bool` - `True` se tem valores, `False` caso contrário.

---

#### `_find_missing_rows`

```python
def _find_missing_rows(self, df: pd.DataFrame, column: str) -> list[int]
```

**Descrição:** Encontra linhas com valores vazios/NaN em uma coluna.

| Parâmetro | Tipo           | Descrição              |
| --------- | -------------- | ---------------------- |
| `df`      | `pd.DataFrame` | DataFrame com os dados |
| `column`  | `str`          | Nome da coluna         |

**Retorno:** `list[int]` - Índices (1-based, Excel-style) das linhas com problema.

**Nota:** Os índices são 1-based e consideram o header (+2: +1 para 1-based, +1 para pular header).

---

#### `_check_column`

```python
def _check_column(
    self,
    df: pd.DataFrame,
    headers: dict,
    result: dict,
    correlation: str,
    aliases: list[str],
    required: bool = True,
    warn_only: bool = False,
) -> tuple[bool, bool, str]
```

**Descrição:** Valida uma única coluna e atualiza o dicionário de resultado.

| Parâmetro     | Tipo           | Padrão  | Descrição                                  |
| ------------- | -------------- | ------- | ------------------------------------------ |
| `df`          | `pd.DataFrame` | -       | DataFrame para validar                     |
| `headers`     | `dict`         | -       | Dict de `{normalized: original}`           |
| `result`      | `dict`         | -       | Dict de resultado a atualizar              |
| `correlation` | `str`          | -       | Correlation ID para logging                |
| `aliases`     | `list[str]`    | -       | Lista de aliases da coluna                 |
| `required`    | `bool`         | `True`  | Se coluna faltando/vazia causa erro        |
| `warn_only`   | `bool`         | `False` | Se `True`, adiciona warning em vez de erro |

**Retorno:** `tuple[bool, bool, str]` - `(col_exists, has_valid_data, col_name)`

---

## Workflows LEMIT

### lemit-cpf

**Arquivo:** `src/workflows/lemit_workflows.py`

**Descrição:** Executa apenas o enriquecimento de dados via LEMIT usando CPF como identificador, sem integração com Ploomes.

#### Função: `executar_fluxo_lemit_cpf`

```python
def executar_fluxo_lemit_cpf(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: list = None
) -> int
```

**Pipeline:**

```
┌─────────────────────────────────────────────────────────────┐
│                    LEMIT-CPF WORKFLOW                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 📥 Inicializar clientes (ExcelProcessor, LemitClient)   │
│       │                                                     │
│       ▼                                                     │
│  2. 🔍 Processar fluxo com CPF                              │
│       ├── Ler planilha de entrada                           │
│       ├── Para cada linha com CPF:                          │
│       │    └── Buscar no LEMIT                              │
│       └── Enriquecer com telefones/emails                   │
│       │                                                     │
│       ▼                                                     │
│  3. 💾 Gerar arquivo CSV de saída                           │
│       │                                                     │
│       ▼                                                     │
│  4. 📊 Gerar relatório Excel de processamento               │
│       │                                                     │
│       ▼                                                     │
│  5. ✅ Retornar 0 (sucesso) ou 1 (falha)                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| Parâmetro     | Tipo             | Padrão | Descrição                            |
| ------------- | ---------------- | ------ | ------------------------------------ |
| `input_file`  | `str`            | -      | Caminho do arquivo Excel de entrada  |
| `output_file` | `str`            | -      | Caminho do arquivo CSV de saída      |
| `logger`      | `logging.Logger` | -      | Logger configurado                   |
| `tags`        | `list`           | `None` | Lista de tags/marcadores a adicionar |

**Retorno:** `int` - `0` se sucesso, `1` se falha.

**Colunas Obrigatórias:**

| Coluna     | Aliases              |   Obrigatório    |
| ---------- | -------------------- | :--------------: |
| CNJ        | `cnj`, `processo`    |        ✅        |
| Reclamante | `reclamante`, `nome` |        ✅        |
| CPF        | `cpf`                | ⚠️ (recomendado) |

**Arquivos Gerados:**

| Arquivo                        | Descrição                  |
| ------------------------------ | -------------------------- |
| `{output_file}`                | Dados enriquecidos (CSV)   |
| `{output_file}_relatorio.xlsx` | Relatório de processamento |

**Estatísticas Retornadas:**

```python
{
    "estatisticas": {
        "total": int,     # Total de registros
        "sucesso": int,   # Registros enriquecidos
        "falha": int      # Registros não encontrados
    }
}
```

---

### lemit-nome

**Arquivo:** `src/workflows/lemit_workflows.py`

**Descrição:** Executa apenas o enriquecimento de dados via LEMIT usando Nome como identificador, sem integração com Ploomes.

#### Função: `executar_fluxo_lemit_nome`

```python
def executar_fluxo_lemit_nome(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: list = None
) -> int
```

**Pipeline:**

```
┌─────────────────────────────────────────────────────────────┐
│                    LEMIT-NOME WORKFLOW                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 📥 Inicializar clientes (ExcelProcessor, LemitClient)   │
│       │                                                     │
│       ▼                                                     │
│  2. 🔍 Processar fluxo com Nome                             │
│       ├── Ler planilha de entrada                           │
│       ├── Para cada linha com Nome:                         │
│       │    └── Buscar no LEMIT                              │
│       └── Enriquecer com telefones/emails                   │
│       │                                                     │
│       ▼                                                     │
│  3. 💾 Gerar arquivo CSV de saída                           │
│       │                                                     │
│       ▼                                                     │
│  4. 📊 Gerar relatório Excel de processamento               │
│       │                                                     │
│       ▼                                                     │
│  5. ✅ Retornar 0 (sucesso) ou 1 (falha)                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| Parâmetro     | Tipo             | Padrão | Descrição                            |
| ------------- | ---------------- | ------ | ------------------------------------ |
| `input_file`  | `str`            | -      | Caminho do arquivo Excel de entrada  |
| `output_file` | `str`            | -      | Caminho do arquivo CSV de saída      |
| `logger`      | `logging.Logger` | -      | Logger configurado                   |
| `tags`        | `list`           | `None` | Lista de tags/marcadores a adicionar |

**Retorno:** `int` - `0` se sucesso, `1` se falha.

**Colunas Obrigatórias:**

| Coluna     | Aliases              | Obrigatório |
| ---------- | -------------------- | :---------: |
| CNJ        | `cnj`, `processo`    |     ✅      |
| Reclamante | `reclamante`, `nome` |     ✅      |

**Arquivos Gerados:**

| Arquivo                                     | Descrição                  |
| ------------------------------------------- | -------------------------- |
| `{output_file}`                             | Dados enriquecidos (CSV)   |
| `output/reports/{base_name}_relatorio.xlsx` | Relatório de processamento |

---

## Workflows Ploomes

### ploomes-only

**Arquivo:** `src/workflows/ploomes_workflows.py`

**Descrição:** Executa apenas a importação para Ploomes CRM (sem enriquecimento LEMIT). Ideal para criar/atualizar advogados e escritórios.

#### Função: `executar_fluxo_ploomes_only`

```python
def executar_fluxo_ploomes_only(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: list = None,
    fetch_socios: bool = False,
) -> int
```

**Pipeline:**

```
┌─────────────────────────────────────────────────────────────┐
│                   PLOOMES-ONLY WORKFLOW                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📋 ETAPA 1/3: Criar modelo de advogados/escritórios        │
│       ├── Ler arquivo Excel de entrada                      │
│       ├── Processar cada linha                              │
│       └── Criar modelo de dados                             │
│       │                                                     │
│       ▼                                                     │
│  📤 ETAPA 2/3: Importar contatos para o Ploomes             │
│       ├── Para cada escritório/advogado:                    │
│       │    ├── Verificar se já existe                       │
│       │    ├── Criar ou atualizar                           │
│       │    └── (Opcional) Buscar sócios                     │
│       └── Registrar resultado                               │
│       │                                                     │
│       ▼                                                     │
│  📊 ETAPA 3/3: Gerar relatório de importação                │
│       └── Excel com detalhes de cada operação               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| Parâmetro      | Tipo             | Padrão  | Descrição                             |
| -------------- | ---------------- | ------- | ------------------------------------- |
| `input_file`   | `str`            | -       | Caminho do arquivo Excel de entrada   |
| `output_file`  | `str`            | -       | Caminho do arquivo CSV de saída       |
| `logger`       | `logging.Logger` | -       | Logger configurado                    |
| `tags`         | `list`           | `None`  | Lista de tags/marcadores              |
| `fetch_socios` | `bool`           | `False` | Buscar advogados sócios via API LEMIT |

**Retorno:** `int` - `0` se sucesso, `1` se falha.

**Colunas Obrigatórias:**

| Coluna     | Aliases      | Obrigatório |
| ---------- | ------------ | :---------: |
| Escritório | `escritorio` |     ✅¹     |
| Advogado   | `advogado`   |     ✅¹     |
| OAB        | `oab`        |     ✅¹     |

> ¹ Escritório **OU** (Advogado + OAB) são obrigatórios

**Arquivos Gerados:**

| Arquivo                                     | Descrição               |
| ------------------------------------------- | ----------------------- |
| `output/reports/{base_name}_relatorio.xlsx` | Relatório de importação |

**Estatísticas no Log:**

```
✅ Modelo criado
   📊 Total: X
   ✅ Processados: Y
   ❌ Falhas: Z
   • Requisições totais no CNA: N
```

---

### advogados

**Arquivo:** `src/workflows/ploomes_workflows.py`

**Descrição:** Alias para `ploomes-only`. Mantido para compatibilidade retroativa.

#### Função: `executar_fluxo_advogados`

```python
def executar_fluxo_advogados(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: list = None,
    fetch_socios: bool = False,
) -> int
```

**Nota:** Esta função é um wrapper direto para `executar_fluxo_ploomes_only`:

```python
def executar_fluxo_advogados(...) -> int:
    logger.info("📋 Fluxo: Criação de Advogados/Escritórios (apenas Ploomes)")
    return executar_fluxo_ploomes_only(
        input_file, output_file, logger, tags, fetch_socios
    )
```

| Parâmetro      | Tipo             | Padrão  | Descrição                               |
| -------------- | ---------------- | ------- | --------------------------------------- |
| `input_file`   | `str`            | -       | Caminho do arquivo Excel/CSV de entrada |
| `output_file`  | `str`            | -       | Caminho do arquivo CSV de saída         |
| `logger`       | `logging.Logger` | -       | Logger configurado                      |
| `tags`         | `list`           | `None`  | Lista de tags/marcadores                |
| `fetch_socios` | `bool`           | `False` | Buscar advogados sócios via API LEMIT   |

**Retorno:** `int` - `0` se sucesso, `1` se falha.

---

## Workflow Escritório

### escritorio-only

**Arquivo:** `src/workflows/escritorio_workflow.py`

**Descrição:** Workflow para processar planilhas com Escritório e Reclamantes. Busca o escritório no Ploomes, obtém o advogado principal, e enriquece dados dos reclamantes via LEMIT.

#### Função: `executar_fluxo_escritorio_only`

```python
def executar_fluxo_escritorio_only(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: List[str] = None
) -> int
```

**Pipeline Detalhado:**

```
┌─────────────────────────────────────────────────────────────┐
│                ESCRITORIO-ONLY WORKFLOW                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 📥 Inicializar clientes                                 │
│       ├── PloomesAPI                                        │
│       ├── ExcelProcessor (enable_normalization=True)        │
│       └── LemitClient                                       │
│       │                                                     │
│       ▼                                                     │
│  2. 📖 Ler planilha de entrada                              │
│       ├── Detectar coluna CPF                               │
│       └── Detectar coluna Escritório                        │
│       │                                                     │
│       ▼                                                     │
│  3. 🏢 Para cada Escritório único:                          │
│       ├── Buscar no Ploomes via API                         │
│       │    └── get_escritorio_with_advogado_principal()     │
│       ├── Obter advogado principal                          │
│       └── Cachear resultado em escritorios_cache{}          │
│       │                                                     │
│       ▼                                                     │
│  4. 📝 Enriquecer DataFrame                                 │
│       ├── Adicionar __temp_escritorio__                     │
│       ├── Adicionar __temp_advogado__                       │
│       └── Salvar arquivo temporário                         │
│       │                                                     │
│       ▼                                                     │
│  5. 🔍 Enriquecer via LEMIT                                 │
│       ├── Tem CPF? → processar_fluxo_com_cpf()              │
│       └── Sem CPF? → processar_fluxo_com_nome()             │
│       │                                                     │
│       ▼                                                     │
│  6. 📊 Preparar dados para relatório                        │
│       ├── Para cada escritório no cache:                    │
│       │    ├── Se encontrado: extrair dados                 │
│       │    └── Se não encontrado: marcar como not_found     │
│       └── Compilar results_data[]                           │
│       │                                                     │
│       ▼                                                     │
│  7. 📋 Gerar relatório Excel                                │
│       └── export_results_to_excel(workflow_type=            │
│                                   "escritorio_only")        │
│       │                                                     │
│       ▼                                                     │
│  8. 🧹 Limpar arquivo temporário                            │
│       └── os.remove(temp_file)                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| Parâmetro     | Tipo             | Padrão | Descrição                               |
| ------------- | ---------------- | ------ | --------------------------------------- |
| `input_file`  | `str`            | -      | Caminho do arquivo Excel/CSV de entrada |
| `output_file` | `str`            | -      | Caminho do arquivo CSV de saída         |
| `logger`      | `logging.Logger` | -      | Logger configurado                      |
| `tags`        | `List[str]`      | `None` | Lista de tags/marcadores a adicionar    |

**Retorno:** `int` - `0` se sucesso, `1` se falha.

**Colunas Obrigatórias:**

| Coluna     | Aliases              |       Obrigatório        |
| ---------- | -------------------- | :----------------------: |
| Escritório | `escritorio`         |            ✅            |
| CNJ        | `cnj`, `processo`    |            ✅            |
| Reclamante | `reclamante`, `nome` |            ✅            |
| CPF        | `cpf`                | ❌ (usa Nome se ausente) |

**Arquivos Gerados:**

| Arquivo                                     | Descrição                  |
| ------------------------------------------- | -------------------------- |
| `{output_file}`                             | Dados enriquecidos (CSV)   |
| `output/reports/{base_name}_relatorio.xlsx` | Relatório de processamento |

**Estrutura do Relatório:**

```python
result_entry = {
    "success": True,  # ou False
    "escritorio_original": {
        "Nome": str,           # Nome do escritório
        "CNPJ": str,           # CNPJ do escritório
        "Pessoa_Física": str,  # "Sim" ou "Não"
    },
    "advogado_original": {
        "Nome": str,           # Nome do advogado principal
        "CPF": str,            # CPF do advogado
        "OAB": str,            # Número OAB
        "É_Sócio": bool,       # Se é sócio do escritório
    },
    "operation": str,          # "found" ou "not_found"
    "has_b2b_deal": bool,      # Se tem deal B2B
    "skip_reason": str,        # Motivo de skip (se aplicável)
}
```

**Função Interna: `get_escritorio_advogado`**

```python
def get_escritorio_advogado(nome_escritorio: str) -> tuple:
    """Retorna (nome_escritorio, nome_advogado) do cache."""
```

Usada para mapear o nome do escritório para os dados cacheados.

---

## Workflows Combinados (Pipeline Completo)

### cpf

**Arquivo:** `src/workflows/combined_workflows.py`

**Descrição:** Executa o pipeline completo de processamento LEMIT → Ploomes usando CPF como identificador principal.

### nome

**Arquivo:** `src/workflows/combined_workflows.py`

**Descrição:** Executa o pipeline completo de processamento LEMIT → Ploomes usando Nome como identificador principal.

#### Função: `executar_pipeline_completo`

```python
def executar_pipeline_completo(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    fluxo_lemit: str = "cpf",  # ou "nome"
    tags: list = None,
    fetch_socios: bool = False,
) -> int
```

**Pipeline Completo (6 Etapas):**

```
┌─────────────────────────────────────────────────────────────┐
│                   PIPELINE COMPLETO                         │
│              (Workflow: cpf ou nome)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📋 ETAPA 1/6: Processar dados do LEMIT                     │
│       ├── fluxo_lemit="cpf" → processar_fluxo_com_cpf()     │
│       └── fluxo_lemit="nome" → processar_fluxo_com_nome()   │
│       │                                                     │
│       ▼                                                     │
│  📋 ETAPA 2/6: Criar modelo de advogados/escritórios        │
│       └── ploomes_client.create_model_from_data()           │
│       │                                                     │
│       ▼                                                     │
│  📤 ETAPA 3/6: Importar contatos para o Ploomes             │
│       └── ploomes_client.import_to_ploomes()                │
│       │                                                     │
│       ▼                                                     │
│  🔄 ETAPA 4/6: Enriquecer com informações do Ploomes        │
│       └── excel_processor.enriquecer_com_resultado_ploomes()│
│       │                                                     │
│       ▼                                                     │
│  💾 ETAPA 5/6: Gerar arquivo CSV final                      │
│       └── excel_processor._escrever_arquivo_saida()         │
│       │                                                     │
│       ▼                                                     │
│  📊 ETAPA 6/6: Gerar relatório de importação                │
│       └── excel_processor.export_results_to_excel()         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| Parâmetro      | Tipo             | Padrão  | Descrição                                 |
| -------------- | ---------------- | ------- | ----------------------------------------- |
| `input_file`   | `str`            | -       | Caminho do arquivo Excel de entrada       |
| `output_file`  | `str`            | -       | Caminho do arquivo CSV de saída           |
| `logger`       | `logging.Logger` | -       | Logger configurado                        |
| `fluxo_lemit`  | `str`            | `"cpf"` | Tipo de busca LEMIT (`"cpf"` ou `"nome"`) |
| `tags`         | `list`           | `None`  | Lista de tags/marcadores                  |
| `fetch_socios` | `bool`           | `False` | Buscar advogados sócios via API LEMIT     |

**Retorno:** `int` - `0` se sucesso, `1` se falha.

**Colunas Obrigatórias:**

| Coluna     | Aliases              | cpf | nome |
| ---------- | -------------------- | :-: | :--: |
| CNJ        | `cnj`, `processo`    | ✅  |  ✅  |
| Reclamante | `reclamante`, `nome` | ✅  |  ✅  |
| CPF        | `cpf`                | ⚠️  |  ❌  |
| Escritório | `escritorio`         | ✅¹ | ✅¹  |
| Advogado   | `advogado`           | ✅¹ | ✅¹  |
| OAB        | `oab`                | ✅¹ | ✅¹  |

> ¹ Escritório **OU** (Advogado + OAB) são obrigatórios

**Arquivos Gerados:**

| Arquivo                                     | Descrição                             |
| ------------------------------------------- | ------------------------------------- |
| `saida_preliminar_lemit_{cpf\|nome}.csv`    | Dados LEMIT intermediários            |
| `{output_file}`                             | Planilha final com dados enriquecidos |
| `output/reports/{base_name}_relatorio.xlsx` | Relatório de importação               |

**Resumo Final no Log:**

```
🎉 PIPELINE CONCLUÍDO COM SUCESSO!
📁 Arquivos gerados:
   • Requisições totais no CNA: X
   • Planilha final: output/importacao_ploomes.csv
   • Relatório: output/reports/importacao_relatorio.xlsx
```

---

## Detecção Automática de Workflow

O sistema detecta automaticamente o workflow apropriado baseado nas colunas preenchidas no arquivo de entrada.

### Matriz de Detecção

| Colunas com Valores                     | Workflow Detectado |
| --------------------------------------- | ------------------ |
| OAB/Advogado + CPF                      | `cpf`              |
| OAB/Advogado + Nome (sem CPF)           | `nome`             |
| OAB/Advogado (sem dados reclamante)     | `ploomes-only`     |
| Escritório + (CPF ou Nome) sem Advogado | `escritorio-only`  |
| CPF (sem Advogado/Escritório)           | `lemit-cpf`        |
| Nome (sem Advogado/Escritório/CPF)      | `lemit-nome`       |

### Uso da Detecção Automática

```bash
# O sistema detecta automaticamente o melhor workflow
python main.py --input-file dados.xlsx

# Equivalente a especificar manualmente:
python main.py --input-file dados.xlsx --fluxo <workflow_detectado>
```

### Código de Detecção

```python
# Em main.py
router = WorkflowRouter(logger)

if not fluxo:
    fluxo = router.detect_workflow(args.input_file)
    if not fluxo:
        logger.error("Não foi possível determinar o workflow automaticamente")
        return 1
```

---

## Validação de Colunas

Antes de executar qualquer workflow, o sistema valida as colunas obrigatórias.

### Tipos de Validação

| Tipo        | Símbolo | Descrição                         | Comportamento     |
| ----------- | :-----: | --------------------------------- | ----------------- |
| Obrigatório |   ✅    | Coluna deve existir e ter valores | Bloqueia execução |
| Recomendado |   ⚠️    | Coluna pode estar vazia           | Gera warning      |
| Opcional    |   ❌    | Coluna não é necessária           | Ignorado          |

### Mensagens de Erro

```
❌ Coluna obrigatória não encontrada: CNJ
❌ Coluna 'Reclamante' tem 5 linha(s) vazia(s): linhas 2, 5, 8, 12, 15
```

### Mensagens de Warning

```
⚠️ Coluna 'CPF' tem 3 linha(s) vazia(s): linhas 4, 7, 9. Busca será por Nome para essas linhas.
⚠️ Escritório e Advogado/OAB detectados. Prioridade: Escritório
```

### Código de Validação

```python
# Em main.py
validation_result = router.validate_required_columns(
    args.input_file,
    workflow=fluxo
)

if not validation_result["valid"]:
    logger.error("❌ VALIDAÇÃO FALHOU")
    for error in validation_result["errors"]:
        logger.error(f"   {error}")
    return 1
```

---

## Observabilidade

Todos os workflows incluem recursos completos de observabilidade.

### Recursos Disponíveis

| Recurso                | Descrição                              |
| ---------------------- | -------------------------------------- |
| 📝 Logging estruturado | Com `correlation_id` para rastreamento |
| ⏱️ Métricas de tempo   | Por operação e total                   |
| 📊 Estatísticas        | Total, sucesso, falha por workflow     |
| 📈 Relatórios Excel    | Detalhamento completo de operações     |

### Métricas Coletadas

| Métrica             | Descrição                         |
| ------------------- | --------------------------------- |
| `total_detections`  | Total de workflows detectados     |
| `workflow_counts`   | Contagem por tipo de workflow     |
| `detect_workflow`   | Tempo de detecção                 |
| `validate_columns`  | Tempo de validação                |
| `total_records`     | Total de registros processados    |
| `processed_records` | Registros processados com sucesso |
| `failed_records`    | Registros com falha               |
| `total_requests`    | Requisições à API CNA             |

### Exemplo de Métricas no Log

```
📊 RESUMO DE MÉTRICAS [ID: abc123]
⏱️  Duração total: 125.30s
📈 Total de operações: 150
✅ Operações bem-sucedidas: 142
❌ Operações com falha: 8
📊 Taxa de sucesso: 94.7%
⚡ Latência média: 835.20ms
```

---

## Exemplos de Uso

### Fluxo Básico com Detecção Automática

```bash
python main.py --input-file entrada.xlsx
```

### Pipeline Completo com Todas as Opções

```bash
python main.py \
  --input-file dados.xlsx \
  --output-file output/resultado.csv \
  --fluxo cpf \
  --tags "Lote 1,Prospect,2024" \
  --fetch-socios \
  --log-level DEBUG \
  --config config/settings.ini
```

### Apenas Enriquecimento LEMIT

```bash
# Por CPF
python main.py --input-file reclamantes.xlsx --fluxo lemit-cpf

# Por Nome
python main.py --input-file reclamantes.xlsx --fluxo lemit-nome
```

### Apenas Importação Ploomes

```bash
python main.py --input-file advogados.xlsx --fluxo ploomes-only --fetch-socios
```

### Busca de Escritório com Enriquecimento

```bash
python main.py --input-file escritorios.xlsx --fluxo escritorio-only --tags "Lote 1"
```

### Pipeline Completo por Nome

```bash
python main.py --input-file dados_sem_cpf.xlsx --fluxo nome
```

---

## Referências

| Módulo              | Arquivo                                          | Descrição             |
| ------------------- | ------------------------------------------------ | --------------------- |
| Main                | `src/main.py`                                    | Script principal      |
| Workflow Router     | `src/workflows/workflow_router.py`               | Detecção e validação  |
| LEMIT Workflows     | `src/workflows/lemit_workflows.py`               | Fluxos apenas LEMIT   |
| Ploomes Workflows   | `src/workflows/ploomes_workflows.py`             | Fluxos apenas Ploomes |
| Combined Workflows  | `src/workflows/combined_workflows.py`            | Pipelines completos   |
| Escritorio Workflow | `src/workflows/escritorio_workflow.py`           | Fluxo de escritório   |
| ExcelProcessor      | `ploomes_integration/clients/excel_processor.py` | Processador de Excel  |
| PloomesClient       | `ploomes_integration/client.py`                  | Cliente Ploomes       |
| LemitClient         | `src/lemit_automation/lemit_client.py`           | Cliente LEMIT         |
| PloomesAPI          | `ploomes_integration/api.py`                     | API Ploomes           |

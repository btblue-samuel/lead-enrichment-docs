# Módulo: workflows

> Orquestração de workflows do sistema.

## Descrição

Este módulo contém os roteadores e workflows que orquestram as operações do sistema, integrando LEMIT, Ploomes e outros serviços.

---

## Roteador Principal (`workflow_router.py`)

### Classe `WorkflowRouter`

```python
class WorkflowRouter:
```

Roteador central de workflows do sistema.

**Responsabilidades:**

- Determinar qual workflow executar baseado em parâmetros
- Gerenciar ciclo de vida dos workflows
- Coordenar métricas e logging

---

#### `__init__`

```python
def __init__(
    self,
    config: ConfigManager,
    logger: Optional[logging.Logger] = None,
    metrics_registry: Optional[MetricsRegistry] = None,
):
```

Inicializa o roteador de workflows.

---

#### `route`

```python
def route(
    self,
    workflow_type: str,
    data: Union[pd.DataFrame, Dict[str, Any]],
    **options,
) -> WorkflowResult:
```

Roteia para o workflow apropriado.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `workflow_type` | `str` | Tipo do workflow |
| `data` | `DataFrame/Dict` | Dados de entrada |
| `options` | `Dict` | Opções adicionais |

#### `route`

```python
def route(
    self,
    workflow_type: str,
    data: Union[pd.DataFrame, Dict[str, Any]],
    **options,
) -> WorkflowResult:
```

Roteia para o workflow apropriado.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `workflow_type` | `str` | Tipo do workflow |
| `data` | `DataFrame/Dict` | Dados de entrada |
| `options` | `Dict` | Opções adicionais |

**Tipos de workflow suportados:**
| Tipo | Descrição |
|------|-----------|
| `lemit_enrich` | Enriquecimento via LEMIT |
| `ploomes_import` | Importação para Ploomes |
| `combined` | LEMIT + Ploomes combinado |
| `escritorio` | Workflow de escritório |
| `escritorio_only` | Apenas escritório + LEMIT |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `WorkflowResult` | Resultado da execução |

---

#### `get_available_workflows`

```python
def get_available_workflows(self) -> List[str]:
```

Retorna lista de workflows disponíveis.

---

#### `detect_workflow`

```python
def detect_workflow(self, input_file: str) -> Optional[str]:
```

Detecta automaticamente o workflow baseado nas colunas do arquivo.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `input_file` | `str` | Caminho do arquivo de entrada |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Optional[str]` | Nome do workflow detectado ou `None` |

---

#### `validate_required_columns`

```python
def validate_required_columns(
    self, input_file: str, workflow: str = None
) -> dict:
```

Valida se as colunas obrigatórias estão preenchidas.

**Returns:**

```python
{
    "valid": bool,
    "errors": List[str],
    "warnings": List[str],
    "missing_rows": Dict[str, List[int]]
}
```

---

## Workflows LEMIT (`lemit_workflows.py`)

### `executar_fluxo_lemit_cpf`

```python
def executar_fluxo_lemit_cpf(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: List[str] = None
) -> int:
```

Executa enriquecimento LEMIT por CPF (SEM integração Ploomes).

**Saídas geradas:**

- Planilha final de importação com dados enriquecidos
- Relatório Excel de processamento com estatísticas LEMIT

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `input_file` | `str` | Caminho da planilha de entrada |
| `output_file` | `str` | Caminho do arquivo CSV de saída |
| `logger` | `logging.Logger` | Logger configurado |
| `tags` | `List[str]` | Tags/marcadores opcionais |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `int` | 0 se sucesso, 1 se falha |

---

### `executar_fluxo_lemit_nome`

```python
def executar_fluxo_lemit_nome(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: List[str] = None
) -> int:
```

Executa enriquecimento LEMIT por nome (SEM integração Ploomes).

**Saídas geradas:**

- Planilha final de importação com dados enriquecidos
- Relatório Excel de processamento com estatísticas LEMIT

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `input_file` | `str` | Caminho da planilha de entrada |
| `output_file` | `str` | Caminho do arquivo CSV de saída |
| `logger` | `logging.Logger` | Logger configurado |
| `tags` | `List[str]` | Tags/marcadores opcionais |

**Returns:**
| Tipo | Descrição |
|------|-----------||
| `int` | 0 se sucesso, 1 se falha |

---

## Workflows Ploomes (`ploomes_workflows.py`)

### `executar_fluxo_ploomes_only`

```python
def executar_fluxo_ploomes_only(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: List[str] = None,
    fetch_socios: bool = False,
) -> int:
```

Executa importação para Ploomes (SEM enriquecimento LEMIT).

**Fluxo:**

1. Cria modelo de dados de advogados/escritórios
2. Importa para Ploomes
3. Gera relatório de importação

---

### `executar_fluxo_advogados`

```python
def executar_fluxo_advogados(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: List[str] = None,
    fetch_socios: bool = False,
) -> int:
```

Alias para `executar_fluxo_ploomes_only` (compatibilidade).

---

## Workflows Combinados (`combined_workflows.py`)

### `executar_pipeline_completo`

```python
def executar_pipeline_completo(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    fluxo_lemit: str = "cpf",
    tags: List[str] = None,
    fetch_socios: bool = False,
) -> int:
```

Executa pipeline completo LEMIT + Ploomes.

**Fluxo:**

1. Processar dados do LEMIT (enriquecimento)
2. Criar modelo de dados (advogados/escritórios)
3. Importar para Ploomes
4. Enriquecer dados com informações do Ploomes
5. Gerar CSV final
6. Gerar relatório de importação

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `input_file` | `str` | Caminho da planilha de entrada |
| `output_file` | `str` | Caminho do arquivo CSV de saída |
| `logger` | `logging.Logger` | Logger configurado |
| `fluxo_lemit` | `str` | Tipo de busca LEMIT ("cpf" ou "nome") |
| `tags` | `List[str]` | Tags/marcadores opcionais |
| `fetch_socios` | `bool` | Buscar sócios dos escritórios |

---

### `executar_fluxo_escritorio_only`

```python
def executar_fluxo_escritorio_only(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: List[str] = None
) -> int:
```

Executa fluxo especializado para escritórios e reclamantes.

**Fluxo de processamento:**

1. Lê planilha com colunas Escritório e Reclamante/CPF
2. Busca escritórios no Ploomes e obtém advogado principal
3. Enriquece dados dos reclamantes via LEMIT
4. Gera relatório Excel com múltiplas abas incluindo:
    - Dados de importação
    - Estatísticas do LEMIT
    - Log de normalização de escritórios
    - Dados de reclamantes processados

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `input_file` | `str` | Caminho da planilha de entrada |
| `output_file` | `str` | Caminho do arquivo CSV de saída |
| `logger` | `logging.Logger` | Logger configurado |
| `tags` | `List[str]` | Tags/marcadores opcionais |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `int` | 0 se sucesso, 1 se falha |

**Melhorias incluídas:**

- Cache inteligente de escritórios para evitar consultas duplicadas
- Detecção automática do tipo de fluxo (CPF ou Nome)
- Geração de relatório completo com dados de escritórios/advogados
- Logging detalhado do progresso
- Tratamento robusto de erros

---

## Tipos de Resultado

### `WorkflowResult`

```python
@dataclass
class WorkflowResult:
    success: bool
    data: Optional[pd.DataFrame]
    stats: WorkflowStats
    errors: List[str]
    warnings: List[str]
    metadata: Dict[str, Any]
```

---

### `WorkflowStats`

```python
@dataclass
class WorkflowStats:
    total_records: int
    processed_records: int
    successful_records: int
    failed_records: int
    skipped_records: int
    start_time: datetime
    end_time: Optional[datetime]
    duration_seconds: float
    operations: Dict[str, int]
```

**Propriedades calculadas:**
| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `success_rate` | `float` | Taxa de sucesso (0-1) |
| `records_per_second` | `float` | Velocidade de processamento |

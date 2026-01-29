# Classe: EscritorioNormalizer

> Normalização de nomes de escritórios usando mapeamento JSON e fuzzy matching.

## Descrição

A classe `EscritorioNormalizer` fornece funcionalidades avançadas para normalização de nomes de escritórios, utilizando mapeamento JSON predefinido e algoritmos de fuzzy matching (Levenshtein) para encontrar correspondências similares.

---

## Classe `EscritorioNormalizer` (`escritorio_normalizer.py`)

```python
class EscritorioNormalizer:
```

Normaliza nomes de escritórios usando mapeamento JSON e fuzzy matching.

**Responsabilidades:**

- Carregar mapeamento de nomes de escritórios de arquivo JSON
- Normalizar nomes usando correspondência exata ou fuzzy matching
- Fornecer estatísticas de normalização
- Logging detalhado do processo de normalização

---

### Métodos da Classe

#### `__init__`

```python
def __init__(
    self,
    logger: logging.Logger = None,
    enable_normalization: bool = False,
    mapping_path: str = None,
):
```

Inicializa o normalizador de escritórios.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `logger` | `logging.Logger` | Logger para mensagens |
| `enable_normalization` | `bool` | Se True, ativa a normalização |
| `mapping_path` | `str` | Caminho para arquivo JSON de mapeamento |

**Arquivo de mapeamento padrão:** `../res/parceiros_escritorios.json`

---

#### `normalize`

```python
def normalize(self, name: str) -> tuple[str, str, float]:
```

Normaliza nome do escritório usando o mapeamento JSON.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `name` | `str` | Nome original do escritório |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `tuple[str, str, float]` | (nome_final, status, score) |

**Status possíveis:**
| Status | Score | Descrição |
|--------|-------|-----------|
| `normalized` | 1.0 | Nome normalizado com sucesso |
| `not_found` | 0.0 | Nome não encontrado no JSON |
| `skipped` | 0.0 | Valor especial que não deve ser normalizado |
| `disabled` | 0.0 | Normalização está desativada |
| `fuzzy_matched` | 0.95-1.0 | Nome encontrado via Levenshtein |

**Valores especiais (sempre skipped):**

- `N/A`
- `ERRO AO PROCESSAR`
- `Erro ao processar linha`

---

#### `normalize_for_output`

```python
def normalize_for_output(self, name: str) -> str:
```

Normaliza nome para saída (retorna apenas o nome final).

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `name` | `str` | Nome original do escritório |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `str` | Nome normalizado ou original |

---

### Propriedades

#### `is_enabled`

```python
@property
def is_enabled(self) -> bool:
```

Retorna se a normalização está habilitada.

---

#### `mapping_count`

```python
@property
def mapping_count(self) -> int:
```

Retorna o número de mapeamentos carregados do arquivo JSON.

---

### Métodos Privados

#### `_load_mapping`

```python
def _load_mapping(self) -> dict[str, str]:
```

Carrega mapeamento de nomes de escritórios do JSON.

**Estrutura esperada do JSON:**

```json
{
    "escritorios": {
        "Nome Original 1": "Nome Normalizado 1",
        "Nome Original 2": "Nome Normalizado 2"
    }
}
```

**Tratamento de erros:**

- `FileNotFoundError`: Arquivo não encontrado (retorna dict vazio)
- `json.JSONDecodeError`: Erro de parsing JSON (retorna dict vazio)
- `Exception`: Outros erros (retorna dict vazio)

---

#### `_find_best_match`

```python
def _find_best_match(
    self, input_name: str, valid_names: list, threshold: float = 0.95
) -> tuple[Optional[str], float]:
```

Encontra o melhor match usando distância Levenshtein.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `input_name` | `str` | Nome a ser procurado |
| `valid_names` | `list` | Lista de nomes válidos |
| `threshold` | `float` | Limiar mínimo de similaridade (0-1) |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `tuple[Optional[str], float]` | (nome_válido, score) ou (None, 0.0) |

**Algoritmo:**

1. Normaliza nomes para lowercase
2. Calcula similaridade Levenshtein para cada nome válido
3. Retorna o melhor match se score >= threshold
4. Caso contrário, retorna None

**Threshold padrão:** 0.95 (95% de similaridade)

---

## Exemplos de Uso

### Uso Básico

```python
# Inicializar com normalização ativa
normalizer = EscritorioNormalizer(
    logger=logger,
    enable_normalization=True
)

# Normalizar nome
nome_final, status, score = normalizer.normalize("Escritório XYZ Ltda")
print(f"Original: Escritório XYZ Ltda")
print(f"Normalizado: {nome_final}")
print(f"Status: {status}")
print(f"Score: {score}")
```

### Uso com Arquivo JSON Customizado

```python
normalizer = EscritorioNormalizer(
    logger=logger,
    enable_normalization=True,
    mapping_path="/caminho/para/meu_mapeamento.json"
)

# Verificar se carregou corretamente
if normalizer.is_enabled:
    print(f"Carregados {normalizer.mapping_count} mapeamentos")
```

### Normalização para Saída

```python
# Apenas o nome final (simplificado)
nome_normalizado = normalizer.normalize_for_output("Escritório ABC")
```

---

## Observabilidade

### Logging

A classe registra informações detalhadas sobre:

- Inicialização e carregamento de mapeamentos
- Resultados de fuzzy matching com scores
- Erros de carregamento do arquivo JSON
- Estatísticas de normalização

### Métricas

- Número de mapeamentos carregados
- Status de habilitação da normalização
- Scores de similaridade para fuzzy matching

---

## Tratamento de Erros

| Situação                    | Comportamento                                |
| --------------------------- | -------------------------------------------- |
| Arquivo JSON não encontrado | Warning + retorna dict vazio                 |
| Erro de parsing JSON        | Error + retorna dict vazio                   |
| Nome vazio/None             | Retorna valor original com status apropriado |
| Normalização desabilitada   | Retorna nome original com status "disabled"  |
| Sem match encontrado        | Retorna nome original com status "not_found" |

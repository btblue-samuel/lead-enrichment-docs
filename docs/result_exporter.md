# 📋 Documentação: ResultExporter

**Arquivo:** `src/ploomes_integration/clients/processors/result_exporter.py`

**Módulo:** `ploomes_integration.clients.processors`

---

## 📑 Índice

- [Visão Geral](#visão-geral)
- [Classe ResultExporter](#classe-resultexporter)
    - [Constantes de Classe](#constantes-de-classe)
    - [Métodos Públicos](#métodos-públicos)
    - [Métodos Privados](#métodos-privados)
- [Estrutura de Dados](#estrutura-de-dados)
- [Estrutura do Excel Gerado](#estrutura-do-excel-gerado)
- [Exemplos de Uso](#exemplos-de-uso)
- [Integração com Outros Componentes](#integração-com-outros-componentes)
- [Melhores Práticas](#melhores-práticas)

---

## Visão Geral

O módulo `ResultExporter` é responsável por exportar resultados de processamento para arquivos Excel com múltiplas abas e métricas detalhadas. Ele consolida informações de escritórios, advogados, reclamantes e LEMIT em um relatório completo.

### Responsabilidades

| Responsabilidade       | Descrição                                   |
| ---------------------- | ------------------------------------------- |
| **Exportação Excel**   | Gera arquivos `.xlsx` com múltiplas abas    |
| **Métricas Agregadas** | Calcula estatísticas de processamento       |
| **Normalização**       | Integra log de normalização de escritórios  |
| **Validação**          | Valida dados de entrada antes da exportação |
| **Logging**            | Registra resumo de operações                |

### Dependências

```python
import logging
import os
from datetime import datetime
from typing import Any, Dict, List

import pandas as pd

from ...exceptions import FileProcessingError, ValidationError
from .escritorio_normalizer import EscritorioNormalizer
from .tabular_io import TabularIO
```

---

## Classe ResultExporter

```python
class ResultExporter:
    """Exporta resultados de processamento para Excel com múltiplas abas e métricas."""
```

### Constantes de Classe

#### `OPERATION_MAP_PT`

```python
OPERATION_MAP_PT = {
    "created": "Criado",
    "updated": "Atualizado",
    "mixed": "Misto (Criado/Atualizado)",
    "failed": "Falha",
    "skipped": "Pulado",
    "unknown": "Desconhecido",
}
```

**Descrição:** Mapeamento de operações em inglês para português para o relatório.

---

#### `RESULT_HEADERS`

```python
RESULT_HEADERS = [
    "Escritório",
    "Pessoa Física",
    "CNPJ",
    "CPF",
    "Advogado",
    "OAB",
    "É Sócio",
    "Sócios",
    "Operação",
    "Status",
    "Possui Deal B2B",
    "Motivo do Skip",
]
```

**Descrição:** Headers da aba "Escritório e Advogado".

**Total:** 12 campos

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

**Descrição:** Inicializa o exportador de resultados.

| Parâmetro    | Tipo                   | Descrição                              |
| ------------ | ---------------------- | -------------------------------------- |
| `logger`     | `logging.Logger`       | Logger (usa `__name__` se None)        |
| `normalizer` | `EscritorioNormalizer` | Normalizador de escritórios (opcional) |

**Atributos Inicializados:**

| Atributo           | Tipo                   | Descrição                    |
| ------------------ | ---------------------- | ---------------------------- |
| `self.logger`      | `logging.Logger`       | Logger configurado           |
| `self._normalizer` | `EscritorioNormalizer` | Normalizador (pode ser None) |
| `self._tabular_io` | `TabularIO`            | Helper para I/O de arquivos  |

---

### `export_results_to_excel`

```python
def export_results_to_excel(
    self,
    results: List[Dict[str, Any]],
    output_path: str = None,
    workflow_type: str = "advogado_escritorio",
    lemit_stats: Dict[str, Any] = None,
) -> str
```

**Descrição:** Exporta resultados para arquivo Excel com múltiplas abas.

| Parâmetro       | Tipo         | Padrão                  | Descrição                                  |
| --------------- | ------------ | ----------------------- | ------------------------------------------ |
| `results`       | `List[Dict]` | -                       | Lista de resultados do processamento       |
| `output_path`   | `str`        | `None`                  | Caminho de saída (gera automático se None) |
| `workflow_type` | `str`        | `"advogado_escritorio"` | Tipo de workflow                           |
| `lemit_stats`   | `Dict`       | `None`                  | Estatísticas LEMIT                         |

**Retorno:** `str` - Caminho do arquivo Excel gerado

**Exceções:**

- `ValidationError` - Se resultados inválidos
- `FileProcessingError` - Se erro na exportação
- `PermissionError` - Se sem permissão para escrever

**Workflow:**

```
1. _validate_results() → Valida entrada
2. _prepare_output_path() → Prepara caminho
3. _process_results() → Processa dados
4. Calcular métricas (total, sucessos, falhas)
5. _build_reclamantes_data() → Dados da aba 2
6. _write_excel() → Escreve arquivo
7. _log_summary() → Loga resumo
```

---

## Métodos Privados

### `_validate_results`

```python
def _validate_results(
    self,
    results: List[Dict[str, Any]],
    lemit_stats: Dict[str, Any]
) -> None
```

**Descrição:** Valida os resultados de entrada.

**Validações:**

- `results` deve ser lista
- Se `results` vazio, `lemit_stats` deve existir

**Exceções:** `ValidationError` se validação falhar

---

### `_prepare_output_path`

```python
def _prepare_output_path(self, output_path: str) -> str
```

**Descrição:** Prepara e valida o caminho de saída.

**Operações:**

1. Se `output_path` é None: gera nome com timestamp
2. Cria diretórios se não existirem
3. Garante extensão `.xlsx`
4. Adiciona timestamp ao nome

**Retorno:** `str` - Caminho completo com timestamp

**Exemplo:**

```python
# Input: None
# Output: "output/reports/processamento_ploomes_20260128_143522.xlsx"

# Input: "relatorio.csv"
# Output: "relatorio_20260128_143522.xlsx"
```

---

### `_process_results`

```python
def _process_results(
    self,
    results: List[Dict[str, Any]]
) -> tuple[List[Dict[str, Any]], List[Dict[str, Any]]]
```

**Descrição:** Processa resultados e retorna dados e log de normalização.

**Retorno:** `tuple[List[Dict], List[Dict]]`

- `rows_data` - Dados formatados para Excel
- `normalization_log` - Log de normalizações

**Comportamento:**

- Para cada resultado: chama `_process_single_result()`
- Se erro: adiciona linha de erro via `_create_error_row()`

---

### `_process_single_result`

```python
def _process_single_result(
    self,
    result: Dict[str, Any]
) -> tuple[Dict[str, Any], Dict[str, Any] | None]
```

**Descrição:** Processa um único resultado.

**Retorno:** `tuple[Dict, Dict | None]`

- `row` - Dicionário com 12 campos (RESULT_HEADERS)
- `norm_entry` - Entrada de log de normalização (ou None)

**Processamento:**

1. Extrair `escritorio_original` e `advogado_original`
2. Normalizar nome do escritório via `_normalize_name()`
3. Criar entrada de log se normalização aplicada
4. Coletar motivos de skip via `_collect_skip_reasons()`
5. Formatar lista de sócios (separado por ";")
6. Construir dicionário `row` com todos os campos
7. Traduzir operação via `OPERATION_MAP_PT`

**Campos Gerados:**

| Campo           | Fonte                 | Transformação     |
| --------------- | --------------------- | ----------------- |
| Escritório      | `esc.Nome`            | Normalizado       |
| Pessoa Física   | `esc.Pessoa_Física`   | Direto            |
| CNPJ            | `esc.CNPJ`            | Se PJ             |
| CPF             | `esc.CPF`             | Se PF             |
| Advogado        | `adv.Nome`            | Direto            |
| OAB             | `adv.OAB`             | Direto            |
| É Sócio         | `result.is_socio`     | "Sim"/"Não"       |
| Sócios          | `result.socios`       | Join com ";"      |
| Operação        | `result.operation`    | Traduzido PT      |
| Status          | `result.success`      | "Sucesso"/"Falha" |
| Possui Deal B2B | `result.has_b2b_deal` | "Sim"/"Não"       |
| Motivo do Skip  | Múltiplas fontes      | Concatenado       |

---

### `_normalize_name`

```python
def _normalize_name(self, name: str) -> tuple[str, str, float]
```

**Descrição:** Normaliza nome usando o normalizer se disponível.

**Retorno:** `tuple[str, str, float]`

- `normalized_name` - Nome normalizado
- `status` - Status da normalização
- `score` - Score de similaridade (0.0-1.0)

**Status Possíveis:**

- `"normalized"` - Match exato
- `"fuzzy_matched"` - Match por similaridade
- `"not_found"` - Não encontrado
- `"disabled"` - Normalizer desabilitado

---

### `_collect_skip_reasons`

```python
def _collect_skip_reasons(self, result: Dict[str, Any]) -> str
```

**Descrição:** Coleta motivos de skip de um resultado.

**Retorno:** `str` - Motivos concatenados por `" | "` ou string vazia

**Fontes:**

1. `result.errors` se `operation == "skipped"`
2. `escritorio._skip_reason` se `_was_skipped`
3. `advogado._skip_reason` se `_was_skipped`

**Exemplo:**

```
"Escritório: Já possui Deal B2B | Advogado: Não encontrado no CNA"
```

---

### `_create_error_row`

```python
def _create_error_row(self) -> Dict[str, Any]
```

**Descrição:** Cria linha de erro padrão.

**Retorno:** Dicionário com todos os campos preenchidos com valores de erro:

- Textos: `"ERRO AO PROCESSAR"`, `"N/A"`
- Status: `"Erro"`
- Motivo: `"Erro ao processar linha"`

---

### `_count_operations`

```python
def _count_operations(self, results: List[Dict[str, Any]]) -> Dict[str, int]
```

**Descrição:** Conta operações por tipo.

**Retorno:** `Dict[str, int]` - Contagem de cada operação

**Exemplo:**

```python
{
    "created": 10,
    "updated": 5,
    "skipped": 3,
    "failed": 2,
}
```

---

### `_build_metrics_data`

```python
def _build_metrics_data(
    self,
    workflow_type: str,
    total: int,
    success_count: int,
    failed_count: int,
    operations_count: Dict[str, int],
    lemit_stats: Dict[str, Any],
) -> List[Dict[str, Any]]
```

**Descrição:** Constrói dados da aba de métricas (legacy, não mais utilizada).

**Retorno:** Lista de dicionários `{"Métrica": str, "Valor": Any}`

**Seções:**

1. Header (Timestamp, Workflow Type)
2. Totais Gerais
3. Breakdown por Operação
4. Estatísticas LEMIT (se disponível)

---

### `_build_lemit_metrics`

```python
def _build_lemit_metrics(self, lemit_stats: Dict[str, Any]) -> List[Dict[str, Any]]
```

**Descrição:** Constrói métricas LEMIT.

**Retorno:** Lista de dicionários com estatísticas LEMIT

**Campos:**

- Total Processado
- Sucessos
- Falhas
- Taxa de Sucesso (%)

---

### `_build_reclamantes_data`

```python
def _build_reclamantes_data(
    self,
    workflow_type: str,
    total: int,
    success_count: int,
    failed_count: int,
    operations_count: Dict[str, int],
    lemit_stats: Dict[str, Any],
) -> List[Dict[str, Any]]
```

**Descrição:** Constrói dados da aba "Reclamantes".

**Retorno:** Lista de dicionários `{"Métrica": str, "Valor": Any}`

**Seções:**

1. **Header:** Timestamp e tipo de workflow
2. **Reclamantes:** Estatísticas LEMIT (se disponível)
3. **Ploomes:** Estatísticas escritório/advogado (se `total > 0`)
4. **Breakdown:** Operações por tipo

**Estrutura:**

```
Timestamp: 2026-01-28 14:35:22
Tipo de Workflow: combined

--- PROCESSAMENTO DE RECLAMANTES ---
Total de Reclamantes: 150
Sucessos: 142
Falhas: 8
Taxa de Sucesso (%): 94.7

--- IMPORTAÇÃO PLOOMES (ESCRITÓRIO/ADVOGADO) ---
Total de Registros: 20
Sucessos: 18
Falhas: 2
Taxa de Sucesso (%): 90.0

--- BREAKDOWN POR OPERAÇÃO ---
  Criado: 10
  Atualizado: 8
  Falha: 2
```

---

### `_write_excel`

```python
def _write_excel(
    self,
    output_path: str,
    df_importacao: pd.DataFrame,
    df_reclamantes: pd.DataFrame,
    normalization_log: List[Dict[str, Any]],
    total: int,
) -> None
```

**Descrição:** Escreve o arquivo Excel com múltiplas abas.

**Abas Criadas:**

| #   | Nome                    | Condição                            | Conteúdo                        |
| --- | ----------------------- | ----------------------------------- | ------------------------------- |
| 1   | "Escritório e Advogado" | Sempre                              | Dados de importação ou mensagem |
| 2   | "Reclamantes"           | Sempre                              | Estatísticas LEMIT e Ploomes    |
| 3   | "Log de Normalização"   | Se normalizer ativo e log não vazio | Log de normalizações            |

**Comportamento Especial:**

- Se `total == 0`: Aba 1 mostra mensagem "Este workflow não processa escritórios/advogados"
- Se normalização ativa mas log vazio: loga informação

---

### `_log_normalization_stats`

```python
def _log_normalization_stats(self, normalization_log: List[Dict[str, Any]]) -> None
```

**Descrição:** Loga estatísticas de normalização.

**Contagem:**

- `normalized_count` - Normalizados exatos
- `fuzzy_count` - Fuzzy matches
- `not_found_count` - Não encontrados

**Log Gerado:**

```
🔄 Normalização: 15 exatos, 3 fuzzy, 2 não encontrados
```

---

### `_log_summary`

```python
def _log_summary(
    self,
    output_path: str,
    total: int,
    success_count: int,
    lemit_stats: Dict[str, Any],
) -> None
```

**Descrição:** Loga resumo da exportação.

**Log Gerado:**

```
✅ Arquivo Excel gerado: output/reports/importacao_relatorio_20260128_143522.xlsx
📊 Escritório e Advogado: 18/20 sucessos
📊 Reclamantes: 142/150 sucessos
```

---

## Estrutura de Dados

### Estrutura de `results` (Input)

```python
results = [
    {
        "success": bool,
        "operation": str,  # "created", "updated", "skipped", "failed"
        "has_b2b_deal": bool,
        "is_socio": bool,
        "socios": List[str],
        "errors": List[str],
        "escritorio_original": {
            "Nome": str,
            "CNPJ": str,
            "CPF": str,
            "Pessoa_Física": str,  # "Sim", "Não", "N/A"
        },
        "advogado_original": {
            "Nome": str,
            "OAB": str,
        },
        "escritorio": {
            "_was_skipped": bool,
            "_skip_reason": str,
        },
        "advogado": {
            "_was_skipped": bool,
            "_skip_reason": str,
        },
    },
]
```

### Estrutura de `lemit_stats` (Input)

```python
lemit_stats = {
    "total": int,
    "sucesso": int,
    "falha": int,
}
```

---

## Estrutura do Excel Gerado

### Aba 1: "Escritório e Advogado"

| Coluna          | Tipo | Exemplo                             |
| --------------- | ---- | ----------------------------------- |
| Escritório      | str  | "SILVA & ASSOCIADOS"                |
| Pessoa Física   | str  | "Não"                               |
| CNPJ            | str  | "12.345.678/0001-90"                |
| CPF             | str  | ""                                  |
| Advogado        | str  | "Dr. João Silva"                    |
| OAB             | str  | "SP123456"                          |
| É Sócio         | str  | "Sim"                               |
| Sócios          | str  | "Dr. João Silva; Dra. Maria Santos" |
| Operação        | str  | "Criado"                            |
| Status          | str  | "Sucesso"                           |
| Possui Deal B2B | str  | "Sim"                               |
| Motivo do Skip  | str  | ""                                  |

### Aba 2: "Reclamantes"

| Coluna  | Tipo    | Descrição        |
| ------- | ------- | ---------------- |
| Métrica | str     | Nome da métrica  |
| Valor   | str/int | Valor da métrica |

### Aba 3: "Log de Normalização"

| Coluna             | Tipo | Exemplo                              |
| ------------------ | ---- | ------------------------------------ |
| Nome Original      | str  | "Silva e Associados Advogados Ltda." |
| Nome Normalizado   | str  | "SILVA & ASSOCIADOS"                 |
| Score Similaridade | str  | "95.50%"                             |
| Status             | str  | "Fuzzy Match (Levenshtein)"          |
| Advogado           | str  | "Dr. João Silva"                     |

---

## Exemplos de Uso

### Básico (Apenas Ploomes)

```python
from src.ploomes_integration.clients.processors import ResultExporter

exporter = ResultExporter(logger=logger)

results = [
    {
        "success": True,
        "operation": "created",
        "has_b2b_deal": False,
        "is_socio": False,
        "socios": [],
        "escritorio_original": {
            "Nome": "Silva Advogados",
            "CNPJ": "12.345.678/0001-90",
            "Pessoa_Física": "Não",
        },
        "advogado_original": {
            "Nome": "Dr. João Silva",
            "OAB": "SP123456",
        },
    },
]

output = exporter.export_results_to_excel(
    results=results,
    workflow_type="ploomes-only",
)
```

### Com LEMIT Stats

```python
lemit_stats = {
    "total": 150,
    "sucesso": 142,
    "falha": 8,
}

output = exporter.export_results_to_excel(
    results=results,
    workflow_type="combined",
    lemit_stats=lemit_stats,
)
```

### Com Normalização

```python
from src.ploomes_integration.clients.processors import (
    ResultExporter,
    EscritorioNormalizer,
)

normalizer = EscritorioNormalizer()
normalizer.load_normalization_map("config/escritorios.json")

exporter = ResultExporter(logger=logger, normalizer=normalizer)

output = exporter.export_results_to_excel(
    results=results,
    output_path="output/reports/custom_report.xlsx",
)
```

### Tratamento de Erros

```python
from ...exceptions import ValidationError, FileProcessingError

exporter = ResultExporter(logger=logger)

try:
    output = exporter.export_results_to_excel(
        results=results,
        workflow_type="combined",
        lemit_stats=lemit_stats,
    )
    print(f"✅ Relatório: {output}")
except ValidationError as e:
    logger.error(f"❌ Dados inválidos: {e}")
except FileProcessingError as e:
    logger.error(f"❌ Erro ao gerar Excel: {e}")
except PermissionError:
    logger.error("❌ Sem permissão para escrever arquivo")
```

---

## Integração com Outros Componentes

### Com ExcelProcessor

```python
# No ExcelProcessor
from .processors import ResultExporter

class ExcelProcessor:
    def __init__(self, ...):
        self._result_exporter = ResultExporter(
            logger=self.logger,
            normalizer=self._normalizer,
        )

    def export_results_to_excel(self, results, output_path, workflow_type, lemit_stats):
        return self._result_exporter.export_results_to_excel(
            results=results,
            output_path=output_path,
            workflow_type=workflow_type,
            lemit_stats=lemit_stats,
        )
```

### Com EscritorioNormalizer

```python
normalizer = EscritorioNormalizer()
normalizer.load_normalization_map("config/escritorios.json")

exporter = ResultExporter(logger=logger, normalizer=normalizer)
# Normalização aplicada automaticamente + log na 3ª aba
```

### Com TabularIO

```python
# TabularIO usado internamente para:
# - Adicionar timestamp aos nomes de arquivo
# - Criar diretórios automaticamente
# - Garantir extensões corretas
```

---

## Melhores Práticas

### 1. Sempre Passe `lemit_stats` em Workflows Combinados

```python
# ✅ BOM
output = exporter.export_results_to_excel(
    results=results,
    lemit_stats=lemit_stats,
    workflow_type="combined",
)

# ❌ EVITE
output = exporter.export_results_to_excel(
    results=results,
    workflow_type="combined",
)
```

### 2. Use Normalizer para Consistência

```python
# ✅ BOM
normalizer = EscritorioNormalizer()
exporter = ResultExporter(logger=logger, normalizer=normalizer)

# ❌ EVITE (nomes inconsistentes)
exporter = ResultExporter(logger=logger)
```

### 3. Especifique `workflow_type` Corretamente

```python
workflow_types = [
    "lemit-cpf",
    "lemit-nome",
    "ploomes-only",
    "advogados",
    "escritorio-only",
    "cpf",
    "nome",
    "combined",
    "advogado_escritorio",  # legacy
]
```

### 4. Valide Dados Antes de Exportar

```python
# ✅ BOM
if not results and not lemit_stats:
    logger.warning("Nenhum dado para exportar")
    return None

output = exporter.export_results_to_excel(...)
```

---

## Referências

- [EscritorioNormalizer](escritorio_normalizer.md)
- [TabularIO](tabular_io.md)
- [ExcelProcessor](../ploomes_integration.md)
- [ValidationError, FileProcessingError](../exceptions.md)

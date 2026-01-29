# Classe: PloomesClient

> Facade principal para integração com Ploomes, compondo camadas especializadas.

## Descrição

A classe `PloomesClient` é o ponto de entrada principal para integração com o Ploomes. Atua como facade que compõe as novas camadas especializadas, mantendo compatibilidade com a interface pública existente.

---

## Classe `PloomesClient` (`client.py`)

```python
class PloomesClient:
```

Facade compatível que compõe as camadas especializadas do sistema.

**Responsabilidades:**

- Interface pública unificada para o sistema
- Composição de serviços especializados (API, Processing, Contacts, Deals)
- Manutenção de compatibilidade com código legado
- Orquestração de operações complexas
- Delegação para camadas apropriadas

**Arquitetura em Camadas:**

- **PloomesAPI**: Chamadas HTTP diretas
- **Processing**: Lógica complexa e coordenação externa
- **ContactService**: Operações de contatos
- **DealService**: Operações de negócios/deals

---

### Inicialização

#### `__init__`

```python
def __init__(self, environment: Optional[str] = None) -> None:
```

Inicializa o cliente compondo todas as camadas especializadas.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `environment` | `Optional[str]` | Ambiente Ploomes (prod/sandbox) |

**Componentes inicializados:**

| Componente       | Classe                 | Responsabilidade                      |
| ---------------- | ---------------------- | ------------------------------------- |
| `api`            | `PloomesAPI`           | Chamadas HTTP diretas                 |
| `processing`     | `Processing`           | Coordenação externa e lógica complexa |
| `contacts`       | `ContactService`       | Operações de contatos                 |
| `deals`          | `DealService`          | Operações de negócios                 |
| `mapper_factory` | `ContactMapperFactory` | Factory para mapeadores               |

**Configurações carregadas:**

- Mapeamentos de campos do JSON de configuração
- Cliente LEMIT para integração
- Comportamento humano simulado
- Rate limiting configurado

**Log de inicialização:**

```
PloomesClient inicializado - Ambiente: prod, Base URL: https://api2.ploomes.com
```

---

### Métodos de Mapeamento

#### `map_escritorio_to_ploomes`

```python
def map_escritorio_to_ploomes(self, data: EscritorioData) -> Tuple[Dict, int]:
```

Mapeia dados de escritório para formato Ploomes.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `data` | `EscritorioData` | Dados do escritório |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Tuple[Dict, int]` | (dados_mapeados, tag_id) |

**Delegação:** Chama `self.contacts.map_escritorio(data)`

---

#### `map_advogado_to_ploomes`

```python
def map_advogado_to_ploomes(
    self, data: AdvogadoData, company_id: Optional[int] = None
) -> Tuple[Dict, int]:
```

Mapeia dados de advogado para formato Ploomes.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `data` | `AdvogadoData` | Dados do advogado |
| `company_id` | `Optional[int]` | ID da empresa associada |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Tuple[Dict, int]` | (dados_mapeados, tag_id) |

**Delegação:** Chama `self.contacts.map_advogado(data, company_id)`

---

### Operações de Contatos

#### `create_complete_contact_set`

```python
def create_complete_contact_set(
    self, escritorio_data: EscritorioData, advogado_data: AdvogadoData
) -> Dict:
```

Cria ou atualiza um conjunto completo de contatos (escritório + advogado).

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `escritorio_data` | `EscritorioData` | Dados do escritório |
| `advogado_data` | `AdvogadoData` | Dados do advogado |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Dict` | Resultado da operação completa |

**Estrutura de retorno:**

```python
{
    "escritorio": Dict | None,     # Resultado da criação do escritório
    "advogado": Dict | None,       # Resultado da criação do advogado
    "success": bool,               # Status geral da operação
    "errors": List[str]            # Lista de erros ocorridos
}
```

**Fluxo de processamento:**

1. **Processamento escritório**: Chama `_process_escritorio()`
2. **Processamento advogado**: Chama `_process_advogado()` com company_id
3. **Agregação resultados**: Combina resultados em estrutura unificada
4. **Error handling**: Captura e categoriza exceções

**Exceções tratadas:**

- `ValidationError`: Dados de entrada inválidos
- `PloomesAPIError`: Erros da API Ploomes
- `ContactCreationError`: Falhas na criação de contatos
- `Exception`: Erros gerais não categorizados

---

### Métodos de Processamento Interno

#### `_process_escritorio`

```python
def _process_escritorio(self, escritorio_data: EscritorioData) -> Dict[str, Any]:
```

Processa a criação/atualização de um escritório (método privado).

**Fluxo:**

1. **Mapeamento**: Converte dados para formato Ploomes
2. **Criação/atualização**: Via ContactService
3. **Aplicação de tags**: Se especificado no mapeamento
4. **Retorno estruturado**: Dados do escritório criado

**Estrutura de retorno:**

```python
{
    "contact_data": Dict,     # Dados do contato criado
    "operation": str,         # "created" ou "updated"
    "contact_id": int         # ID do contato no Ploomes
}
```

---

#### `_process_advogado`

```python
def _process_advogado(
    self, advogado_data: AdvogadoData, company_id: Optional[int]
) -> Dict[str, Any]:
```

Processa a criação/atualização de um advogado (método privado).

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `advogado_data` | `AdvogadoData` | Dados do advogado |
| `company_id` | `Optional[int]` | ID da empresa para associação |

**Funcionalidades:**

- Mapeamento com associação à empresa
- Criação/atualização via ContactService
- Aplicação de tags apropriadas
- Retorno estruturado com metadados

---

### Importação Principal

#### `import_to_ploomes`

```python
def import_to_ploomes(self, type_id: int = 1) -> List[Dict[str, Any]]:
```

Executa importação completa para o Ploomes com processamento em lotes.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `type_id` | `int` | Tipo de contato (1=Empresa, 2=Pessoa) |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `List[Dict[str, Any]]` | Lista de resultados por registro |

**Pré-requisito:**

```python
# Deve ser chamado após processamento
client.create_model_from_data("arquivo.xlsx")
result = client.import_to_ploomes()
```

**Fluxo completo:**

1. **Validação**: Verifica se contact_groups foi populado
2. **Processamento lotes**: Itera sobre grupos únicos
3. **Progress tracking**: Log de progresso a cada grupo
4. **Rate limiting**: Aplica delays entre operações
5. **Error handling**: Captura e registra erros detalhados
6. **Deduplicação**: Evita processamento de duplicatas
7. **Expansão resultados**: Mapeia de volta para linhas originais

**Métricas coletadas:**

- Total de grupos processados
- Sucessos, falhas e ignorados
- Criações vs. atualizações
- Tempo total de processamento

**Log de resumo:**

```
Resumo: lidos=150 ignorados=5 tentados=145 sucessos=140 falhas=5
```

---

### Expansão de Resultados

#### `_expand_results_to_original_rows`

```python
def _expand_results_to_original_rows(
    self, unique_results: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:
```

Expande resultados únicos de volta para linhas originais com duplicatas.

**Funcionalidade:**

- Usa mapeamento `tuple_to_indices` para encontrar linhas originais
- Aplica atualizações de nomes do `nome_updates`
- Propaga resultados para todas as duplicatas
- Mantém consistência com formato de entrada

**Exemplo:**

```python
# Entrada original: 3 linhas com mesmo advogado
# Processamento único: 1 resultado
# Expansão: 3 resultados (um para cada linha original)
```

---

### Métodos de Processamento de Dados

#### `create_model_from_data`

```python
def create_model_from_data(self, file_path: str) -> ProcessingResult:
```

Cria modelo de dados a partir de planilha Excel.

**Delegação:** Chama `self.processing.build_contact_groups_from_excel(file_path)`

**Efeito:** Popula `self.contact_groups` para posterior importação.

---

#### `process_advogados_to_csv`

```python
def process_advogados_to_csv(
    self, file_path: str, output_path: str = "output/advogados_escritorios.csv"
) -> bool:
```

Processa advogados e exporta para CSV.

**Delegação:** Chama `self.processing.export_advogados_to_csv(file_path, output_path)`

---

#### `processar_cnjs_excel`

```python
def processar_cnjs_excel(
    self, arquivo_excel_entrada: str, arquivo_csv_saida: str
) -> None:
```

Processa planilha de CNJs para integração específica.

**Delegação:** Chama `self.processing.process_cnjs_excel(...)`

---

### Operações de Deals/Negócios

#### `create_deal`

```python
def create_deal(
    self, model: PloomesImportModel, max_retries: int = 3
) -> Optional[dict]:
```

Cria negócio no Ploomes.

**Delegação:** Chama `self.deals.create_deal(model, max_retries)`

---

#### `update_deal`

```python
def update_deal(
    self, deal_cnj: str, ploomes_stage: DealService.PloomesStage
) -> bool:
```

Atualiza estágio de negócio por CNJ.

**Delegação:** Chama `self.deals.update_deal(deal_cnj, ploomes_stage)`

---

#### `get_deal_by_cnj`

```python
def get_deal_by_cnj(self, deal_cnj: str):
```

Obtém negócio pelo CNJ.

**Delegação:** Chama `self.deals.get_deal_by_cnj(deal_cnj)`

---

#### `get_stage_id_by_pipeline_and_name`

```python
def get_stage_id_by_pipeline_and_name(self, pipeline_name: str, stage_name: str):
```

Obtém ID do estágio por pipeline e nome.

**Delegação:** Chama `self.api.get_stage_by_pipeline_and_name(...)`

---

### Métodos Auxiliares

#### `_load_field_mappings`

```python
def _load_field_mappings(self) -> Dict:
```

Carrega mapeamentos de campos do arquivo JSON de configuração.

**Arquivo:** `resources/fields_completo.json`

**Validação:** Verifica se dados carregados são um dicionário válido.

---

#### `_estatisticas_cna`

```python
def _estatisticas_cna(self) -> Dict[str, Any]:
```

Obtém estatísticas do cliente CNA.

**Delegação:** Chama `self.processing._estatisticas_cna()`

---

#### `_init_lemit`

```python
def _init_lemit(self):
```

Inicializa cliente LEMIT com tratamento de erros robusto.

**Error handling:** Captura exceções e retorna None em caso de falha.

---

## Padrões de Uso

### Uso Básico - Processamento Completo

```python
# Inicialização
client = PloomesClient(environment="prod")

# Processamento de dados
result = client.create_model_from_data("advogados.xlsx")
print(f"Processados: {result.processed_records}/{result.total_records}")

# Importação para Ploomes
import_results = client.import_to_ploomes(type_id=1)

# Análise de resultados
success_count = sum(1 for r in import_results if r.get('success'))
print(f"Importados com sucesso: {success_count}/{len(import_results)}")
```

### Criação Individual de Contatos

```python
# Dados do escritório e advogado
escritorio = EscritorioData(nome="Escritório Silva & Associados", cnpj="12345678000199")
advogado = AdvogadoData(nome="João Silva", cpf="12345678901", oab="MG123456")

# Criação do conjunto completo
result = client.create_complete_contact_set(escritorio, advogado)

if result['success']:
    print(f"✅ Escritório criado: ID {result['escritorio']['contact_id']}")
    print(f"✅ Advogado criado: ID {result['advogado']['contact_id']}")
else:
    print(f"❌ Erros: {result['errors']}")
```

### Exportação para CSV

```python
# Processamento e exportação
success = client.process_advogados_to_csv(
    file_path="entrada.xlsx",
    output_path="output/resultado.csv"
)

if success:
    print("📊 Dados exportados com sucesso")
```

### Operações de Deals

```python
# Criar negócio
model = PloomesImportModel(
    titulo="Caso João vs Empresa",
    cnj="1234567-89.2023.8.13.0001",
    # ... outros campos
)

deal = client.create_deal(model)
if deal:
    print(f"🤝 Deal criado: ID {deal['Id']}")

# Atualizar estágio
success = client.update_deal(
    deal_cnj="1234567-89.2023.8.13.0001",
    ploomes_stage=DealService.PloomesStage.WON
)
```

---

## Observabilidade

### Logs Estruturados

```python
# Logs de inicialização
logger.info("PloomesClient inicializado", extra={
    "environment": environment,
    "base_url": self.api.base_url,
    "components_loaded": ["api", "processing", "contacts", "deals"]
})

# Logs de processamento
logger.info("Importação concluída", extra={
    "total_groups": len(self.contact_groups),
    "success_count": success_count,
    "failed_count": failed_count,
    "processing_time_seconds": processing_time
})
```

### Métricas Agregadas

```python
def get_processing_summary():
    return {
        "processing_stats": client.processing.get_stats(),
        "api_metrics": client.api.get_metrics_summary(),
        "cna_statistics": client._estatisticas_cna()
    }
```

### Monitoramento de Performance

```python
# Rate limiting configurado
client.rate_limit_delay = 2.0  # 2 segundos entre operações

# Comportamento humano simulado
client.human_behavior.random_delay(1, 3)  # Delay aleatório

# Progress tracking automático
# Logs gerados automaticamente durante import_to_ploomes()
```

---

## Compatibilidade e Migração

### Interface Legada

O `PloomesClient` mantém todos os métodos públicos da versão anterior:

```python
# Métodos mantidos para compatibilidade
client.create_model_from_data()      # ✅ Compatível
client.import_to_ploomes()           # ✅ Compatível
client.create_deal()                 # ✅ Compatível
client.process_advogados_to_csv()    # ✅ Compatível
```

### Migração Gradual

```python
# Código antigo (ainda funciona)
client = PloomesClient()
result = client.import_to_ploomes()

# Novo código (acesso às camadas)
client = PloomesClient()
api_stats = client.api.get_metrics_summary()
processing_stats = client.processing.get_stats()
```

### Extensibilidade

```python
# Extensão personalizada
class CustomPloomesClient(PloomesClient):
    def custom_import_workflow(self):
        # Usa componentes internos
        result = self.processing.build_contact_groups_from_excel("file.xlsx")
        return self.contacts.bulk_create(result.contact_groups)
```

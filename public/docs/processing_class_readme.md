# Processing Class - Documentação

## Visão Geral

A classe `Processing` é o núcleo de coordenação do sistema de importação Ploomes-Lemit. Ela orquestra múltiplas fontes de dados externas (CNA, CNPJ, LEMIT) para construir grupos de contatos estruturados contendo informações de escritórios de advocacia e seus advogados.

## Características Principais

### 🎯 Funcionalidades Core

- **Processamento em Lote**: Processa arquivos Excel com listas de advogados
- **Enriquecimento Automático**: Busca dados de escritórios, CNPJs e sócios automaticamente
- **Cache Inteligente**: Sistema multicamadas de cache para otimizar consultas
- **Detecção de Duplicatas**: Remove advogados duplicados automaticamente
- **Busca de Sócios**: Opcional - busca advogados sócios via LEMIT quando habilitado
- **Fallback Strategies**: Múltiplas estratégias de busca quando dados não são encontrados

### 📊 Observabilidade

- Métricas de processamento em tempo real
- Progress tracking com estimativa de tempo (ETA)
- Rastreamento de cache hits/misses
- Logging estruturado com correlation_id
- Estatísticas detalhadas por batch

## Arquitetura

### Clientes Integrados

```python
┌─────────────────────────────────────────────┐
│           Processing Class                  │
├─────────────────────────────────────────────┤
│ • CNAClient      → Consultas OAB/CNA        │
│ • CNPJScraper    → Validação de CNPJs       │
│ • LemitClient    → Enriquecimento de dados  │
│ • ExcelProcessor → Leitura/Escrita Excel    │
└─────────────────────────────────────────────┘
```

### Fluxo de Processamento

```
1. Leitura do Excel
   ├─ Extração de colunas (Nome, OAB)
   └─ Remoção de duplicatas

2. Processamento por Advogado
   ├─ Consulta CNA (dados do advogado)
   ├─ Consulta Sociedade (escritório)
   ├─ Validação CNPJ
   └─ Busca Sócios (opcional)

3. Construção de Grupos
   ├─ Escritório (com CNPJ)
   ├─ Advogado Principal
   └─ Advogados Sócios (se habilitado)

4. Retorno Estruturado
   └─ ProcessingResult com métricas
```

## Uso

### Inicialização

```python
from src.ploomes_integration.processing import Processing
import logging

logger = logging.getLogger(__name__)

# Com busca de sócios habilitada
processor = Processing(logger=logger, fetch_socios=True)

# Sem busca de sócios (mais rápido)
processor = Processing(logger=logger, fetch_socios=False)
```

### Processamento de Excel

```python
# Processar arquivo Excel
result = processor.build_contact_groups_from_excel(
    file_path="input/advogados.xlsx"
)

# Verificar resultado
if result.success:
    print(f"✅ Processados: {result.processed_records}")
    print(f"❌ Falhas: {result.failed_records}")
    print(f"📊 Taxa de sucesso: {result.success_rate:.1%}")
    print(f"⏱️ Duração: {result.duration_seconds:.2f}s")
else:
    print("❌ Processamento falhou")
    for error in result.errors:
        print(f"  - {error}")
```

### Acessando Resultados

```python
# Grupos de contatos gerados
for grupo in result.contact_groups:
    escritorio = grupo["escritorio"]
    advogados = grupo["advogados"]

    print(f"Escritório: {escritorio['Nome']}")
    print(f"CNPJ: {escritorio['CNPJ']}")
    print(f"Advogados: {len(advogados)}")

    for adv in advogados:
        print(f"  - {adv['Nome']} (OAB: {adv['OAB']})")
```

### Estatísticas e Métricas

```python
# Obter estatísticas detalhadas
stats = processor.get_stats()

print(f"Batches processados: {stats['batch_count']}")
print(f"Cache hits: {stats['cache_hits']}")
print(f"Cache misses: {stats['cache_misses']}")
print(f"Taxa de cache hit: {stats['cache_hit_rate']:.1%}")
print(f"Tamanho cache CNPJ: {stats['cnpj_cache_size']}")
```

## Sistema de Cache

### Cache por CNPJ (Escritórios)

```python
# Evita consultas duplicadas para o mesmo escritório
# Key: CNPJ (string numérica)
# Value: (EscritorioData, list[AdvogadoData])
```

**Benefício**: Quando múltiplos advogados pertencem ao mesmo escritório, apenas uma consulta CNPJ é feita.

### Cache de Processamento (Advogados)

```python
# Evita reprocessar o mesmo advogado
# Key: "{nome_normalizado}|{oab_normalizada}"
# Value: list[ConjuntoContatoDict]
```

**Benefício**: Advogados duplicados na planilha são processados uma única vez.

### Cache de Sócios

```python
# Evita processar sócios que já apareceram na lista principal
# Key: (nome_normalizado, oab_normalizada)
# Value: True
```

**Benefício**: Sócios que já estão na planilha não são duplicados.

## Tratamento de Edge Cases

### 1. Advogado Não Encontrado no CNA

```python
# Cenário: Nome/OAB incorretos ou advogado não cadastrado
# Ação: Marca escritório com _skip_import=True
# Resultado: Registro ignorado na importação
```

### 2. Pessoa Física (Sem Escritório)

```python
# Cenário: Advogado sem sociedade registrada
# Ação: Consulta CPF via LEMIT
# Resultado: Escritório marcado como "Pessoa_Física"
```

### 3. CNPJ Não Encontrado

```python
# Cenário: Nome do escritório não retorna CNPJ válido
# Ação: Marca escritório com _skip_import=True
# Resultado: Registro ignorado (evita dados inválidos)
```

### 4. Consulta CNA por Nome Falha

```python
# Cenário: Nome do advogado não encontrado
# Ação: Retenta consulta apenas com OAB + UF
# Resultado: Nome atualizado se encontrado
```

### 5. Sócio Duplicado

```python
# Cenário: Sócio já está na lista principal de advogados
# Ação: Cache detecta e pula processamento
# Resultado: Evita duplicatas no resultado final
```

## Estrutura de Dados

### EscritorioData

```python
{
    "Nome": str,              # Nome do escritório
    "Pessoa_Física": str,     # "Sim" ou "Não"
    "Razão_social": str,      # Razão social oficial
    "CNPJ": str,              # CNPJ (apenas números)
    "CPF": str,               # CPF (pessoa física)
    "_skip_import": bool,     # Flag para pular importação
    "_skip_reason": str       # Motivo do skip (se aplicável)
}
```

### AdvogadoData

```python
{
    "Empresa": str,  # Nome do escritório
    "Nome": str,     # Nome completo do advogado
    "OAB": str,      # OAB formatada (ex: "SP123456")
    "CPF": str       # CPF do advogado (se disponível)
}
```

### ConjuntoContatoDict

```python
{
    "escritorio": EscritorioData,
    "advogados": list[AdvogadoData]  # Lista com 1+ advogados
}
```

## ProcessingResult

### Atributos

```python
result.success: bool                           # Sucesso geral
result.total_records: int                      # Total de registros
result.processed_records: int                  # Processados com sucesso
result.failed_records: int                     # Falhas
result.errors: list[str]                       # Lista de erros
result.contact_groups: list[ConjuntoContatoDict]  # Grupos gerados
result.duration_seconds: float                 # Tempo total
```

### Propriedades Calculadas

```python
result.success_rate: float        # Taxa de sucesso (0.0 a 1.0)
result.records_per_second: float  # Velocidade de processamento
```

## Configuração

### Parâmetros da Classe

| Parâmetro      | Tipo             | Padrão | Descrição                           |
| -------------- | ---------------- | ------ | ----------------------------------- |
| `logger`       | `logging.Logger` | -      | Logger para mensagens (obrigatório) |
| `fetch_socios` | `bool`           | `True` | Habilita busca de sócios via LEMIT  |

### Variáveis de Ambiente (config.py)

```python
CNA_BASE_URL: str       # URL base da API CNA
TIMEOUT: int            # Timeout para requisições HTTP
SLEEP_TIME: float       # Delay entre requisições
```

## Performance

### Otimizações Implementadas

1. **Cache Multicamadas**: Reduz consultas duplicadas em ~70%
2. **Batch Processing**: Processa em lotes para gerenciar memória
3. **Rate Limiting**: Human-like delays evitam bloqueios
4. **Lazy Loading**: Sócios são buscados apenas se `fetch_socios=True`

### Métricas Típicas

- **Advogado único**: ~3-5 segundos (com busca de sócios)
- **Advogado único**: ~2-3 segundos (sem busca de sócios)
- **Escritório em cache**: ~0.1 segundos
- **Taxa de cache hit**: 30-50% (depende das duplicatas)

## Logging e Observabilidade

### Níveis de Log

```python
INFO   # Progresso geral, sucessos
DEBUG  # Detalhes de cache, consultas
WARNING  # Dados não encontrados, fallbacks
ERROR  # Falhas em consultas, exceções
```

### Exemplo de Logs

```
INFO - 🚀 Iniciando processamento de 50 advogados únicos
INFO - Processando advogado único (1 / 50): JOÃO SILVA, OAB: SP123456
DEBUG - Aguardando antes de consultar sociedade para: JOÃO SILVA
INFO - 🔍 Buscando sócios do escritório ABC Advogados (CNPJ: 12345678000190)
INFO - ✅ Encontrados 3 advogados sócios para ABC Advogados
INFO - [abc123] 📈 Processando: 10/50 (20.0%) | ETA: 120.5s
```

## Troubleshooting

### Problema: Cache crescendo muito

**Solução**: O cache é mantido em memória durante a execução. Para processamentos muito grandes:

```python
# Limpar caches manualmente entre batches
processor.cnpj_cache.clear()
processor.processing_cache.clear()
processor.advogado_cache.clear()
```

### Problema: Rate limiting / bloqueios

**Solução**: Ajustar `SLEEP_TIME` em `config.py`:

```python
SLEEP_TIME = 3.0  # Aumentar para 3 segundos
```

### Problema: Muitos registros com \_skip_import

**Causas comuns**:

1. Nomes/OABs incorretos na planilha
2. Advogados não cadastrados no CNA
3. CNPJs não encontrados

**Solução**: Verificar logs detalhados para identificar padrão:

```python
for error in result.errors:
    if "_skip_reason" in error:
        print(error)
```

## Exemplos Avançados

### Processar com Callback de Progresso

```python
def on_progress(current, total, eta):
    print(f"Progresso: {current}/{total} - ETA: {eta}s")

# O logging já fornece progress via log_progress()
# Pode ser estendido com callbacks customizados
```

### Processar com Filtros

```python
# Pré-filtrar Excel antes de processar
df = pd.read_excel("input/advogados.xlsx")
df_filtered = df[df['OAB'].str.startswith('SP')]  # Apenas OAB de SP
df_filtered.to_excel("input/advogados_sp.xlsx", index=False)

result = processor.build_contact_groups_from_excel("input/advogados_sp.xlsx")
```

### Exportar Estatísticas

```python
import json

result = processor.build_contact_groups_from_excel("input/advogados.xlsx")
stats = processor.get_stats()

# Salvar estatísticas
with open("output/stats.json", "w") as f:
    json.dump(stats, f, indent=2)

# Salvar resultado
with open("output/result.json", "w") as f:
    json.dump({
        "success": result.success,
        "processed": result.processed_records,
        "failed": result.failed_records,
        "duration": result.duration_seconds
    }, f, indent=2)
```

## Referências

- **CNA API**: Conselho Nacional de Advogados
- **LEMIT API**: Enriquecimento de dados de contatos
- **CNPJ Scraping**: Múltiplos provedores (ReceitaWS, Brasil API, etc.)

## Métodos Internos (Private Methods)

### `_buscar_advogados_socios(cnpj: str, nome_escritorio: str, uf: str) -> list[AdvogadoData]`

Busca advogados sócios de um escritório via API LEMIT usando o CNPJ.

**Parâmetros:**

- `cnpj`: CNPJ do escritório (apenas números)
- `nome_escritorio`: Nome do escritório (usado para logs)
- `uf`: Unidade Federativa (usada para buscar OAB dos sócios)

**Retorno:**

- `list[AdvogadoData]`: Lista de advogados sócios encontrados
- Lista vazia se: CNPJ inválido, nenhum sócio encontrado, ou erro na consulta

**Comportamento:**

1. Valida CNPJ (ignora se vazio ou "Não encontrado")
2. Consulta API LEMIT para obter lista de sócios
3. Para cada sócio:
    - Extrai CPF e nome
    - Busca OAB via `_buscar_oab_socio()`
    - Cria `AdvogadoData` com empresa, nome, OAB e CPF
4. Aplica rate limiting entre consultas
5. Retorna lista de advogados ou lista vazia em caso de erro

**Exemplo de Uso:**

```python
socios = self._buscar_advogados_socios(
    cnpj="12345678000190",
    nome_escritorio="Silva & Associados",
    uf="SP"
)
# socios = [
#     {"Empresa": "Silva & Associados", "Nome": "João Silva", "OAB": "SP123456", "CPF": "12345678901"},
#     {"Empresa": "Silva & Associados", "Nome": "Maria Santos", "OAB": "SP789012", "CPF": "98765432109"}
# ]
```

**Edge Cases:**

- CNPJ inválido → retorna `[]` (lista vazia)
- Sócio sem nome → ignora e continua
- Erro na API LEMIT → retorna `[]` e loga erro
- Nenhum sócio encontrado → retorna `[]` com log informativo

---

### `_buscar_oab_socio(nome: str, uf: str) -> str`

Busca o número da OAB de um sócio consultando a API CNA.

**Parâmetros:**

- `nome`: Nome completo do sócio
- `uf`: Unidade Federativa para filtrar resultados

**Retorno:**

- `str`: OAB completa formatada (ex: "SP123456") ou string vazia se não encontrada

**Comportamento:**

1. Consulta CNA com nome e UF (sem número OAB)
2. Filtra resultados para `TipoInscOab == "ADVOGADO"` ou `"ADVOGADA"`
3. Extrai `Inscricao` e `UF` do primeiro resultado válido
4. Formata como `{UF}{Inscricao}` (ex: "SP123456")
5. Aplica rate limiting de 1 segundo

**Exemplo de Uso:**

```python
oab = self._buscar_oab_socio(nome="João Silva", uf="SP")
# oab = "SP123456"

oab = self._buscar_oab_socio(nome="Nome Inexistente", uf="RJ")
# oab = ""
```

**Edge Cases:**

- Nome não encontrado no CNA → retorna `""`
- Múltiplos resultados → retorna primeiro que seja ADVOGADO/ADVOGADA
- Erro na API → retorna `""` e loga warning

**⚠️ Atenção:**
Há um bug na condição do `if`:

```python
if result.get("TipoInscOab") == "ADVOGADO" or "ADVOGADA":  # ❌ SEMPRE True
```

Deveria ser:

```python
if result.get("TipoInscOab") in ("ADVOGADO", "ADVOGADA"):  # ✅ Correto
```

---

### `_get_or_create_escritorio(nome_adv: str, detail_url: str, uf: Optional[str]) -> tuple[EscritorioData, list[AdvogadoData]]`

Obtém ou cria um escritório baseado na consulta CNA, incluindo advogados sócios.

**Parâmetros:**

- `nome_adv`: Nome do advogado (usado para consultar sociedade)
- `detail_url`: URL de detalhes da consulta CNA
- `uf`: Unidade Federativa (usada para buscar sócios)

**Retorno:**

- `tuple[EscritorioData, list[AdvogadoData]]`:
    - Primeiro elemento: dados do escritório
    - Segundo elemento: lista de advogados sócios (vazia se não habilitado ou não encontrado)

**SEMPRE** retorna um tuple. Se houver problemas, retorna escritório com `_skip_import=True`.

**Fluxo de Processamento:**

```
1. Consulta Sociedade no CNA
   │
   ├─ Não encontrada → Pessoa Física
   │  └─ Consulta CPF via LEMIT
   │     └─ Retorna (EscritorioData com Pessoa_Física="Sim", [])
   │
   └─ Encontrada → Escritório
      ├─ Nome sociedade vazio?
      │  └─ Sim → Retorna (_skip_import=True, [])
      │
      ├─ Consulta CNPJ via CNPJScraper
      │  ├─ CNPJ não encontrado → Retorna (_skip_import=True, [])
      │  ├─ Erro na consulta → Retorna (_skip_import=True, [])
      │  └─ CNPJ encontrado → Continua
      │
      ├─ Verifica Cache por CNPJ
      │  └─ Existe? (e fetch_socios=True)
      │     └─ Retorna (_skip_import=True, advogados_cached)
      │
      ├─ Cria EscritorioData
      │
      └─ Busca Sócios (se fetch_socios=True)
         ├─ Chama _buscar_advogados_socios()
         ├─ Adiciona sócios ao advogado_cache
         └─ Cacheia resultado por CNPJ
```

**Exemplo de Uso:**

```python
# Caso 1: Escritório com CNPJ e sócios
escritorio, socios = self._get_or_create_escritorio(
    nome_adv="João Silva",
    detail_url="https://cna.oab.org.br/...",
    uf="SP"
)
# escritorio = {"Nome": "Silva Advogados", "CNPJ": "12345678000190", ...}
# socios = [{"Nome": "Maria Santos", "OAB": "SP789012", ...}, ...]

# Caso 2: Pessoa Física (sem sociedade)
escritorio, socios = self._get_or_create_escritorio(
    nome_adv="José Souza",
    detail_url="https://cna.oab.org.br/...",
    uf="RJ"
)
# escritorio = {"Nome": "José Souza", "Pessoa_Física": "Sim", "CPF": "12345678901", ...}
# socios = []

# Caso 3: CNPJ não encontrado
escritorio, socios = self._get_or_create_escritorio(
    nome_adv="Escritório Fantasma",
    detail_url="https://cna.oab.org.br/...",
    uf="MG"
)
# escritorio = {"_skip_import": True, "_skip_reason": "CNPJ não encontrado", ...}
# socios = []
```

**Estratégia de Cache:**

- **Cache por CNPJ**: Evita processar o mesmo escritório múltiplas vezes
- **Key**: CNPJ (string numérica)
- **Value**: `(EscritorioData, list[AdvogadoData])`
- **Comportamento**:
    - Se `fetch_socios=True` e escritório está no cache → retorna com `_skip_import=True`
    - Se `fetch_socios=False` → ignora cache e processa normalmente

**Edge Cases:**

| Cenário                   | Ação                                   | Resultado             |
| ------------------------- | -------------------------------------- | --------------------- |
| Sociedade não encontrada  | Consulta CPF via LEMIT                 | Pessoa Física com CPF |
| Nome sociedade vazio      | Marca para skip                        | `_skip_import=True`   |
| CNPJ não encontrado       | Marca para skip                        | `_skip_import=True`   |
| Erro ao consultar CNPJ    | Marca para skip (não cacheia)          | `_skip_import=True`   |
| Escritório já no cache    | Retorna cache (se `fetch_socios=True`) | `_skip_import=True`   |
| Busca sócios desabilitada | Pula busca de sócios                   | Lista vazia           |

**Observações:**

- Não cacheia em caso de erro (pode ser temporário)
- Adiciona sócios encontrados ao `advogado_cache`
- Aplica rate limiting entre consultas

---

### `_process_one_advogado(nome: str, oab: str) -> list[ConjuntoContatoDict]`

Processa um advogado completo: consulta CNA, obtém escritório e retorna conjunto(s) de contatos.

**Parâmetros:**

- `nome`: Nome do advogado
- `oab`: OAB do advogado (formatada, ex: "SP123456")

**Retorno:**

- `list[ConjuntoContatoDict]`: Lista com 1 conjunto contendo:
    - `escritorio`: `EscritorioData`
    - `advogados`: `list[AdvogadoData]` (advogado principal + sócios)

**SEMPRE** retorna uma lista (nunca `None`).

**Fluxo de Processamento:**

```
1. Verifica Cache de Processamento
   └─ Existe? → Retorna resultado cacheado

2. Verifica Cache de Advogados (sócios)
   └─ Já foi processado como sócio?
      → Retorna conjunto com _skip_import=True

3. Consulta CNA com nome + OAB
   │
   ├─ Não encontrado?
   │  └─ Retenta consulta apenas com OAB + UF
   │     ├─ Encontrado → Atualiza nome
   │     └─ Não encontrado → Retorna _skip_import=True
   │
   └─ Encontrado → Continua

4. Chama _get_or_create_escritorio()
   └─ Obtém escritório + lista de sócios

5. Cria Advogado Principal
   └─ AdvogadoData(Empresa=..., Nome=..., OAB=...)

6. Filtra Sócios Duplicados
   └─ Remove sócio se nome == advogado principal

7. Monta Lista de Advogados
   └─ [advogado_principal] + socios_filtrados

8. Retorna Conjunto Único
   └─ {"escritorio": ..., "advogados": [...]}

9. Adiciona ao Cache
   ├─ processing_cache[key] = resultado
   └─ advogado_cache[key] = True
```

**Exemplo de Uso:**

```python
# Caso 1: Advogado com escritório e sócios
conjuntos = self._process_one_advogado("João Silva", "SP123456")
# conjuntos = [
#     {
#         "escritorio": {"Nome": "Silva Advogados", "CNPJ": "12345678000190", ...},
#         "advogados": [
#             {"Nome": "João Silva", "OAB": "SP123456", ...},      # Principal
#             {"Nome": "Maria Santos", "OAB": "SP789012", ...},    # Sócia
#             {"Nome": "Carlos Oliveira", "OAB": "SP345678", ...}  # Sócio
#         ]
#     }
# ]

# Caso 2: Advogado pessoa física (sem sócios)
conjuntos = self._process_one_advogado("José Souza", "RJ987654")
# conjuntos = [
#     {
#         "escritorio": {"Nome": "José Souza", "Pessoa_Física": "Sim", ...},
#         "advogados": [{"Nome": "José Souza", "OAB": "RJ987654", ...}]
#     }
# ]

# Caso 3: Advogado não encontrado
conjuntos = self._process_one_advogado("Nome Inválido", "XX000000")
# conjuntos = [
#     {
#         "escritorio": {"_skip_import": True, "_skip_reason": "Advogado não encontrado no CNA", ...},
#         "advogados": [{"Nome": "Nome Inválido", "OAB": "XX000000", ...}]
#     }
# ]
```

**Cache de Processamento:**

- **Key**: `"{nome_normalizado}|{oab_normalizada}"` (minúsculas, sem espaços extras)
- **Value**: `list[ConjuntoContatoDict]`
- **Evita**: Reprocessar o mesmo advogado quando aparece duplicado na planilha

**Cache de Advogados (Sócios):**

- **Key**: Mesmo formato do cache de processamento
- **Value**: `True` (flag booleana)
- **Evita**: Processar como principal um advogado que já foi incluído como sócio

**Fallback Strategy - Consulta por OAB:**
Quando a consulta por nome falha:

1. Extrai UF da OAB (ex: "SP123456" → "SP")
2. Consulta CNA apenas com `oab` + `uf` (nome vazio)
3. Filtra resultados por UF e tipo "ADVOGADO"
4. Atualiza `nome_correto` com o nome encontrado
5. Loga a atualização do nome

**Prevenção de Duplicatas:**

```python
# Remove sócio que tem o mesmo nome do advogado principal
nome_principal_normalizado = " ".join(nome_correto.lower().strip().split())

for socio in socios:
    nome_socio_normalizado = " ".join(socio.get("Nome", "").lower().strip().split())
    if nome_socio_normalizado == nome_principal_normalizado:
        continue  # Pula duplicata
    socios_filtrados.append(socio)
```

**Edge Cases:**

| Cenário                            | Ação                            | Resultado                     |
| ---------------------------------- | ------------------------------- | ----------------------------- |
| Advogado no cache de processamento | Retorna resultado cacheado      | Cache hit (rápido)            |
| Advogado no cache de sócios        | Retorna com `_skip_import=True` | Evita duplicata               |
| Nome não encontrado no CNA         | Retenta com apenas OAB+UF       | Fallback bem-sucedido ou skip |
| OAB inválida (sem UF)              | Falha no fallback               | Retorna `_skip_import=True`   |
| Sócio com mesmo nome do principal  | Remove da lista de sócios       | Evita duplicata no conjunto   |
| Erro em qualquer etapa             | Captura exceção                 | Retorna `_skip_import=True`   |

**Observações:**

- Sempre adiciona advogado principal ao `advogado_cache`
- Aplica rate limiting (2 segundos antes de consultar sociedade)
- Um conjunto pode conter 1 advogado (pessoa física) ou N advogados (escritório com sócios)

---

## Suporte

Para dúvidas ou problemas:

1. Verificar logs detalhados
2. Consultar este README
3. Revisar código de exemplo
4. Contatar equipe de desenvolvimento

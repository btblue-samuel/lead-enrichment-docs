# Classe: TabularIO

> Leitura e escrita universal de arquivos tabulares (CSV e Excel).

## Descrição

A classe `TabularIO` fornece uma interface unificada para leitura e escrita de arquivos tabulares, incluindo CSV e Excel, com funcionalidades de segurança, validação e formatação automática.

---

## Classe `TabularIO` (`tabular_io.py`)

```python
class TabularIO:
```

Classe para leitura e escrita de arquivos tabulares (CSV e Excel).

**Responsabilidades:**

- Leitura universal de arquivos CSV e Excel
- Escrita com formatação apropriada
- Validação de segurança (path traversal, extensões)
- Timestamp automático em arquivos
- Formatação especial para telefones e CPF
- Múltiplos encodings para CSV

---

### Constantes

#### `ALLOWED_EXTENSIONS`

```python
ALLOWED_EXTENSIONS = [".xlsx", ".xls"]
```

Extensões de arquivo permitidas para segurança.

#### `CSV_DELIMITER`

```python
CSV_DELIMITER = ";"
```

Delimitador padrão para arquivos CSV.

#### `CSV_ENCODINGS`

```python
CSV_ENCODINGS = ["utf-8", "utf-8-sig", "latin-1", "cp1252", "iso-8859-1"]
```

Lista de encodings tentados para leitura de CSV (em ordem de prioridade).

---

### Métodos da Classe

#### `__init__`

```python
def __init__(self, logger: logging.Logger = None):
```

Inicializa o TabularIO.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `logger` | `logging.Logger` | Logger para mensagens |

---

### Métodos Estáticos

#### `ensure_dir`

```python
@staticmethod
def ensure_dir(path: str) -> None:
```

Garante que o diretório do caminho existe, criando-o se necessário.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `path` | `str` | Caminho completo do arquivo |

**Funcionalidade:**

- Extrai diretório do caminho do arquivo
- Cria diretório recursivamente se não existir
- Usa `os.makedirs(exist_ok=True)` para segurança

---

#### `add_timestamp_to_filename`

```python
@staticmethod
def add_timestamp_to_filename(filepath: str) -> str:
```

Adiciona timestamp ao nome do arquivo se ainda não tiver.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `filepath` | `str` | Caminho do arquivo |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `str` | Caminho com timestamp adicionado |

**Formato do timestamp:** `YYYYMMDD_HHMM`

**Exemplo:**

```python
# Input: "relatorio.xlsx"
# Output: "relatorio_20260127_1430.xlsx"

# Input: "dados_20260127_1430.csv" (já tem timestamp)
# Output: "dados_20260127_1430.csv" (inalterado)
```

**Detecção de timestamp existente:**

- Verifica padrão regex: `\d{8}_\d{4}` (8 dígitos + underscore + 4 dígitos)
- Se encontrado, não adiciona novo timestamp

---

### Métodos de Validação

#### `validate_file_path`

```python
def validate_file_path(self, file_path: str) -> str:
```

Valida e normaliza o caminho do arquivo com verificações de segurança.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `file_path` | `str` | Caminho do arquivo a ser validado |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `str` | Caminho normalizado e validado |

**Validações realizadas:**

| Validação              | Exceção               | Descrição                       |
| ---------------------- | --------------------- | ------------------------------- |
| Caminho vazio/None     | `ValidationError`     | Caminho obrigatório             |
| Path traversal (`..`)  | `FileSecurityError`   | Detecta tentativas de navegação |
| Arquivo inexistente    | `FileProcessingError` | Verifica existência             |
| Extensão não permitida | `FileSecurityError`   | Apenas .xlsx/.xls               |

**Raises:**
| Exceção | Descrição |
|---------|-----------|
| `ValidationError` | Caminho inválido ou vazio |
| `FileSecurityError` | Problemas de segurança |
| `FileProcessingError` | Arquivo não encontrado |

---

### Métodos de Leitura

#### `read_tabular`

```python
def read_tabular(self, entrada: str, delimiter: str = ";") -> Dict[str, Any]:
```

Lê arquivo tabular (CSV ou Excel) de forma universal.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `entrada` | `str` | Caminho do arquivo |
| `delimiter` | `str` | Delimitador para CSV (padrão: ";") |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Dict[str, Any]` | Estrutura com dados lidos |

**Estrutura de retorno:**

```python
{
    "headers": List[str],              # Lista de cabeçalhos/colunas
    "linhas": List[Dict[str, Any]]     # Lista de registros como dicionários
}
```

**Detecção automática de formato:**

- Arquivos `.xlsx`: Usa `_read_excel()`
- Outros: Usa `_read_csv()` com múltiplos encodings

**Raises:**
| Exceção | Descrição |
|---------|-----------|
| `FileProcessingError` | Erro na leitura do arquivo |

---

#### `_read_excel`

```python
def _read_excel(self, entrada: str) -> Dict[str, Any]:
```

Lê arquivo Excel (método privado).

**Funcionalidades:**

- Usa pandas para leitura eficiente
- Lê apenas a primeira planilha (sheet_name=0)
- Preenche valores NaN com strings vazias
- Converte todos os dados para string

---

#### `_read_csv`

```python
def _read_csv(self, entrada: str, delimiter: str) -> Dict[str, Any]:
```

Lê arquivo CSV tentando múltiplos encodings (método privado).

**Processo de leitura:**

1. Tenta cada encoding da lista `CSV_ENCODINGS`
2. Para no primeiro que funcionar
3. Se todos falharem, levanta `FileProcessingError`

**Encodings tentados (em ordem):**

1. `utf-8`: Padrão moderno
2. `utf-8-sig`: Com BOM (Byte Order Mark)
3. `latin-1`: Europeu ocidental
4. `cp1252`: Windows-1252
5. `iso-8859-1`: ISO Latin-1

---

### Métodos de Escrita

#### `write_tabular`

```python
def write_tabular(
    self,
    arquivo_saida: str,
    headers: List[str],
    linhas: List[Dict[str, Any]],
    delimiter: str = ";",
    add_timestamp: bool = True,
) -> str:
```

Escreve arquivo tabular (CSV ou Excel) com formatação apropriada.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `arquivo_saida` | `str` | Caminho do arquivo de saída |
| `headers` | `List[str]` | Lista de cabeçalhos |
| `linhas` | `List[Dict]` | Lista de dados |
| `delimiter` | `str` | Delimitador para CSV |
| `add_timestamp` | `bool` | Se adiciona timestamp ao nome |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `str` | Caminho do arquivo salvo (com timestamp) |

**Detecção automática de formato:**

- Arquivos `.xlsx`: Usa `_write_excel()`
- Outros: Usa `_write_csv()`

**Raises:**
| Exceção | Descrição |
|---------|-----------|
| `FileProcessingError` | Erro de permissão ou I/O |

---

#### `_write_excel`

```python
def _write_excel(
    self, arquivo_saida: str, headers: List[str], linhas: List[Dict[str, Any]]
) -> None:
```

Escreve arquivo Excel com formatação especial (método privado).

**Funcionalidades especiais:**

- Identifica colunas de telefone e CPF automaticamente
- Remove valores "nan" e strings vazias
- Aplica formato de texto para colunas sensíveis
- Usa engine openpyxl para melhor compatibilidade

**Formatação aplicada:**

- Colunas com "Telefone"/"telefone": Formato texto
- Colunas com "CPF"/"cpf": Formato texto
- Previne formatação automática de números

---

#### `_write_csv`

```python
def _write_csv(
    self,
    arquivo_saida: str,
    headers: List[str],
    linhas: List[Dict[str, Any]],
    delimiter: str,
) -> None:
```

Escreve arquivo CSV com encoding UTF-8-SIG (método privado).

**Configurações de escrita:**

- **Encoding**: `utf-8-sig` (com BOM para Excel)
- **Newline**: Padrão do sistema
- **Quoting**: Mínimo necessário
- **Fieldnames**: Baseado nos headers fornecidos

---

#### `write_arquivo_saida`

```python
def write_arquivo_saida(
    self, arquivo_saida: str, dados: Dict[str, Any], delimiter: str = ";"
) -> str:
```

Escreve dados processados forçando formato XLSX.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `arquivo_saida` | `str` | Caminho (extensão será forçada para .xlsx) |
| `dados` | `Dict` | Estrutura com 'headers' e 'linhas' |
| `delimiter` | `str` | Ignorado (mantido para compatibilidade) |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `str` | Caminho do arquivo salvo (sempre .xlsx) |

**Funcionalidade:**

- Força extensão `.xlsx` independente do input
- Chama `write_tabular()` internamente
- Compatibilidade com código legado

---

### Métodos Privados de Formatação

#### `_apply_text_format`

```python
def _apply_text_format(self, arquivo_saida: str) -> None:
```

Aplica formato de texto para colunas de telefone e CPF (método privado).

**Processo:**

1. Carrega arquivo Excel gerado
2. Identifica colunas sensíveis no header
3. Aplica formato `FORMAT_TEXT` a essas colunas
4. Converte valores para string
5. Salva arquivo modificado

**Colunas afetadas:**

- Contém "Telefone" ou "telefone"
- Contém "CPF" ou "cpf"

**Objetivo:** Prevenir formatação automática que pode corromper números longos.

---

## Funcionalidades de Segurança

### Validação de Path Traversal

```python
# Detecta tentativas maliciosas
"/caminho/../../../etc/passwd"  # ❌ FileSecurityError
"dados/../backup.xlsx"           # ❌ FileSecurityError
"relatorio.xlsx"                 # ✅ Válido
```

### Controle de Extensões

```python
# Apenas extensões seguras
"dados.xlsx"    # ✅ Permitido
"dados.xls"     # ✅ Permitido
"dados.csv"     # ❌ FileSecurityError (na validação)
"script.py"     # ❌ FileSecurityError
```

### Criação Segura de Diretórios

```python
# Cria diretórios necessários automaticamente
TabularIO.ensure_dir("/novo/caminho/arquivo.xlsx")
# Cria "/novo/caminho/" se não existir
```

---

## Exemplos de Uso

### Leitura Universal

```python
io = TabularIO(logger=logger)

# Lê qualquer formato suportado
dados = io.read_tabular("entrada.xlsx")
print(f"Colunas: {dados['headers']}")
print(f"Registros: {len(dados['linhas'])}")

# Para CSV com delimitador específico
dados_csv = io.read_tabular("dados.csv", delimiter=",")
```

### Escrita com Timestamp

```python
# Timestamp automático
headers = ["Nome", "CPF", "Telefone"]
linhas = [{"Nome": "João", "CPF": "12345678901", "Telefone": "5511999999999"}]

arquivo_salvo = io.write_tabular(
    arquivo_saida="relatorio.xlsx",
    headers=headers,
    linhas=linhas
)
print(arquivo_salvo)  # "relatorio_20260127_1430.xlsx"
```

### Validação de Arquivos

```python
try:
    caminho_seguro = io.validate_file_path("dados.xlsx")
    dados = io.read_tabular(caminho_seguro)
except FileSecurityError as e:
    print(f"Arquivo inseguro: {e}")
except FileProcessingError as e:
    print(f"Erro de processamento: {e}")
```

### Formatação Especial

```python
# Dados com telefones e CPF
linhas = [
    {
        "Nome": "João Silva",
        "CPF": "12345678901",         # Será formatado como texto
        "Telefones1": "5511999999999", # Será formatado como texto
        "Email": "joao@email.com"
    }
]

# Excel com formatação apropriada
io.write_tabular("contatos.xlsx", headers, linhas)
# CPF e telefone mantêm formato original
```

---

## Tratamento de Erros

### Leitura Resiliente

```python
# Tenta múltiplos encodings automaticamente
for encoding in CSV_ENCODINGS:
    try:
        # Tenta ler com encoding atual
        return dados
    except UnicodeDecodeError:
        continue  # Próximo encoding

# Se todos falharem
raise FileProcessingError("Não foi possível ler arquivo")
```

### Escrita Segura

```python
# Cria diretórios automaticamente
TabularIO.ensure_dir(arquivo_saida)

try:
    # Tenta escrever arquivo
    write_operation()
except PermissionError:
    raise FileProcessingError(f"Sem permissão: {arquivo_saida}")
except OSError as e:
    raise FileProcessingError(f"Erro I/O: {e}")
```

---

## Observabilidade

### Logging

**Níveis registrados:**

- **Debug**: Detalhes de colunas e linhas lidas
- **Info**: Arquivos salvos com estatísticas
- **Warning**: Encodings que falharam
- **Error**: Erros críticos de processamento

**Informações logadas:**

- Número de linhas e colunas processadas
- Caminho final dos arquivos salvos
- Encodings utilizados com sucesso
- Detalhes de formatação aplicada

### Métricas Implícitas

- Contagem de registros processados
- Tempo de processamento (via logs)
- Taxa de sucesso na leitura de encodings
- Estatísticas de formatação aplicada

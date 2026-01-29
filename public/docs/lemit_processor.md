# Classe: LemitProcessor

> Processador especializado para dados exportados do LEMIT.

## Descrição

A classe `LemitProcessor` é responsável por processar e limpar dados CSV exportados do sistema LEMIT, normalizando telefones, emails e estruturando os dados em formato padronizado.

---

## Classe `LemitProcessor` (`lemit_processor.py`)

```python
class LemitProcessor:
```

Processador especializado para dados exportados do LEMIT.

**Responsabilidades:**

- Processar arquivos CSV do LEMIT
- Normalizar telefones (adicionar código do país +55)
- Estruturar emails em colunas separadas
- Limpar e validar dados de entrada
- Gerar saídas em formato padronizado

---

### Constantes

#### `CSV_DELIMITER`

```python
CSV_DELIMITER = ";"
```

Delimitador padrão para arquivos CSV do LEMIT.

---

### Métodos da Classe

#### `__init__`

```python
def __init__(self, logger: logging.Logger = None):
```

Inicializa o processador LEMIT.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `logger` | `logging.Logger` | Logger para mensagens |

---

#### `clean_lemit_result`

```python
def clean_lemit_result(
    self,
    entrada: Optional[str | Dict] = None,
    arquivo_entrada: Optional[str] = None,
    arquivo_saida: Optional[str] = None,
) -> Optional[Dict[str, Any]]:
```

Limpa e normaliza um CSV exportado do LEMIT.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `entrada` | `str/Dict` | Conteúdo do CSV ou caminho do arquivo |
| `arquivo_entrada` | `str` | Caminho (deprecated - use `entrada`) |
| `arquivo_saida` | `str` | Caminho do arquivo de saída (opcional) |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Optional[Dict[str, Any]]` | Dados processados se `arquivo_saida=None` |

**Estrutura de retorno:**

```python
{
    "headers": [
        "nome", "cpf",
        "telefone_1", "telefone_2", "telefone_3", "telefone_4",
        "email_1", "email_2", "email_3"
    ],
    "linhas": [
        {
            "nome": str,
            "cpf": str,
            "telefone_1": str,  # Com prefixo +55
            "telefone_2": str,
            "telefone_3": str,
            "telefone_4": str,
            "email_1": str,
            "email_2": str,
            "email_3": str
        }
    ]
}
```

**Raises:**
| Exceção | Descrição |
|---------|-----------|
| `ValidationError` | Dados de entrada inválidos |
| `FileProcessingError` | Erro ao processar arquivo |

**Processamento realizado:**

1. Normalização do conteúdo CSV
2. Extração e validação de headers
3. Processamento linha por linha
4. Normalização de telefones (+55 prefix)
5. Estruturação de emails
6. Geração de headers dinâmicos baseados no conteúdo

---

### Métodos Privados

#### `_normalizar_entrada_csv`

```python
def _normalizar_entrada_csv(self, entrada: str | Dict[str, Any]) -> str:
```

Normaliza entrada CSV para string.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `entrada` | `str/Dict` | Conteúdo ou dicionário com 'conteudo' |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `str` | Conteúdo CSV como string |

**Formatos aceitos:**

- String direta com conteúdo CSV
- Dicionário: `{"conteudo": "csv_content_here"}`

---

#### `_extrair_dados_linha`

```python
def _extrair_dados_linha(
    self, headers: List[str], valores: List[str]
) -> Dict[str, str]:
```

Extrai dados de uma linha do CSV LEMIT.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `headers` | `List[str]` | Lista de cabeçalhos |
| `valores` | `List[str]` | Lista de valores da linha |

**Returns:**
| Tipo | Descrição |
|------|-----------|
| `Dict[str, str]` | Dados extraídos e normalizados |

**Processamento por campo:**

- **Nome**: Primeiro valor se separado por vírgula
- **CPF**: Extraído de colunas "cpf" ou "CPF"
- **Telefones**: Até 4 telefones com prefixo +55
- **Emails**: Até 3 emails estruturados

---

#### `_first`

```python
def _first(self, value: str) -> str:
```

Retorna o primeiro valor de uma string separada por vírgula.

**Exemplo:**

```python
>>> _first("João Silva, Maria Santos")
"João Silva"
>>> _first("Escritório ABC")
"Escritório ABC"
```

---

#### `_escrever_csv`

```python
def _escrever_csv(
    self, arquivo_saida: str, headers: List[str], linhas: List[Dict[str, str]]
) -> None:
```

Escreve CSV de saída com encoding UTF-8.

**Args:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `arquivo_saida` | `str` | Caminho do arquivo |
| `headers` | `List[str]` | Lista de cabeçalhos |
| `linhas` | `List[Dict]` | Lista de dados |

**Configurações de escrita:**

- **Encoding**: UTF-8
- **Delimitador**: `;` (ponto e vírgula)
- **Quoting**: Mínimo necessário
- **Newline**: Padrão do sistema

**Raises:**
| Exceção | Descrição |
|---------|-----------|
| `FileProcessingError` | Erro de permissão ou I/O |

---

## Exemplos de Uso

### Processamento Básico

```python
# Inicializar processador
processor = LemitProcessor(logger=logger)

# Processar CSV em memória
csv_content = """nome;cpf;telefone1;email1
João Silva;12345678901;11987654321;joao@email.com
Maria Santos;98765432100;21876543210;maria@email.com"""

resultado = processor.clean_lemit_result(entrada=csv_content)
print(f"Headers: {resultado['headers']}")
print(f"Linhas processadas: {len(resultado['linhas'])}")
```

### Processamento com Arquivo

```python
# Processar e salvar diretamente
processor.clean_lemit_result(
    entrada="dados_lemit.csv",
    arquivo_saida="dados_processados.csv"
)
```

### Processamento com Dicionário

```python
dados = {
    "conteudo": "nome;cpf;telefone1\nJoão;123;11999"
}
resultado = processor.clean_lemit_result(entrada=dados)
```

---

## Formato de Dados

### Headers Dinâmicos

O processador gera headers baseados no conteúdo:

- **Fixos**: `nome`, `cpf`
- **Telefones**: `telefone_1` até `telefone_4` (baseado no máximo encontrado)
- **Emails**: `email_1` até `email_3` (máximo fixo)

### Normalização de Telefones

Todos os telefones recebem automaticamente o prefixo `55`:

- Input: `11987654321`
- Output: `5511987654321`

### Estrutura de Linha Processada

```python
{
    "nome": "JOÃO SILVA",
    "cpf": "12345678901",
    "telefone_1": "5511987654321",
    "telefone_2": "5511876543210",
    "telefone_3": "",
    "telefone_4": "",
    "email_1": "joao@email.com",
    "email_2": "joao.silva@empresa.com",
    "email_3": ""
}
```

---

## Tratamento de Erros

### Validações de Entrada

| Condição              | Exceção           | Mensagem                           |
| --------------------- | ----------------- | ---------------------------------- |
| `entrada` é None      | `ValidationError` | Parâmetro 'entrada' é obrigatório  |
| Headers vazios        | `ValidationError` | Headers CSV não podem estar vazios |
| CSV sem dados válidos | `ValidationError` | CSV não contém dados válidos       |

### Tratamento de Linhas

- Linhas vazias são ignoradas
- Erros de parsing em linhas individuais geram warning e continuam processamento
- Log detalhado de número de linhas processadas vs. ignoradas

### Tratamento de Arquivo

| Erro            | Exceção               | Descrição                          |
| --------------- | --------------------- | ---------------------------------- |
| Sem permissão   | `FileProcessingError` | Erro de escrita no arquivo         |
| Erro de I/O     | `FileProcessingError` | Problemas de sistema de arquivos   |
| Erro inesperado | `FileProcessingError` | Outros erros durante processamento |

---

## Observabilidade

### Logging

- Info: Número de linhas e colunas processadas
- Warning: Erros em linhas específicas (com número da linha)
- Debug: Detalhes do processamento
- Error: Erros críticos que impedem processamento

### Métricas

- Total de linhas processadas
- Linhas com erro (ignoradas)
- Número de headers gerados
- Máximo de telefones/emails por linha

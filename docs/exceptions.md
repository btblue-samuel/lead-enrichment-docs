# Exceções: Sistema de Tratamento de Erros

> Hierarquia completa de exceções personalizadas para tratamento robusto de erros.

## Descrição

Este módulo define uma hierarquia abrangente de exceções personalizadas para o sistema, permitindo tratamento específico e granular de diferentes tipos de erros que podem ocorrer durante o processamento.

---

## Hierarquia de Exceções

```
PloomesClientError (base)
├── InvalidUserKeyError
├── PloomesAPIError
├── FileProcessingError
│   ├── MissingColumnError
│   └── FileSecurityError
├── CNAAPIError
├── LemitAPIError
├── ValidationError
├── ConfigurationError
├── CacheError
├── ContactCreationError
├── DataExtractionError
└── NetworkError
```

---

## Exceções Base

### `PloomesClientError`

```python
class PloomesClientError(Exception):
```

**Descrição:** Classe base para todas as exceções do sistema.

**Uso:** Herança para exceções específicas e catch genérico.

**Exemplo:**

```python
try:
    # operação do sistema
    pass
except PloomesClientError as e:
    # Captura qualquer erro do sistema
    logger.error(f"Erro no sistema: {e}")
```

---

## Exceções de API e Autenticação

### `InvalidUserKeyError`

```python
class InvalidUserKeyError(PloomesClientError):
    def __init__(self, message="A User-Key fornecida é inválida."):
```

**Descrição:** User-Key do Ploomes inválida ou expirada.

**Atributos:**
| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `message` | `str` | Mensagem de erro personalizada |

**Exemplo:**

```python
try:
    api.test_connection()
except InvalidUserKeyError:
    print("🔑 User-Key inválida - verifique configuração")
    # Solicitar nova user-key ou reconfigurar
```

---

### `PloomesAPIError`

```python
class PloomesAPIError(PloomesClientError):
    def __init__(self, status_code, response_text):
```

**Descrição:** Erros gerais da API do Ploomes.

**Atributos:**
| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `status_code` | `int` | Código HTTP do erro |
| `response_text` | `str` | Texto da resposta de erro |

**Exemplo:**

```python
try:
    contact = api.create_contact(data)
except PloomesAPIError as e:
    if e.status_code == 429:
        # Rate limit - aguardar e tentar novamente
        time.sleep(60)
    elif e.status_code == 400:
        # Dados inválidos - revisar payload
        logger.error(f"Dados inválidos: {e.response_text}")
```

---

### `CNAAPIError`

```python
class CNAAPIError(PloomesClientError):
    def __init__(self, message, status_code=None, response_text=None):
```

**Descrição:** Erros específicos da API do CNA (Cadastro Nacional de Advogados).

**Atributos:**
| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `message` | `str` | Mensagem de erro |
| `status_code` | `Optional[int]` | Código HTTP (se aplicável) |
| `response_text` | `Optional[str]` | Resposta da API |

**Exemplo:**

```python
try:
    advogado = cna_client.consultar_advogado(nome="João Silva")
except CNAAPIError as e:
    if "timeout" in str(e).lower():
        # Timeout - tentar com parâmetros diferentes
        logger.warning("CNA timeout - tentando busca simplificada")
    else:
        logger.error(f"Erro CNA: {e}")
```

---

### `LemitAPIError`

```python
class LemitAPIError(PloomesClientError):
    def __init__(self, message, status_code=None, response_text=None):
```

**Descrição:** Erros específicos da API do LEMIT.

**Atributos:**
| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `message` | `str` | Mensagem de erro |
| `status_code` | `Optional[int]` | Código HTTP (se aplicável) |
| `response_text` | `Optional[str]` | Resposta da API |

---

### `NetworkError`

```python
class NetworkError(PloomesClientError):
    def __init__(self, operation, attempts, last_error):
```

**Descrição:** Falhas de rede que esgotaram todas as tentativas de retry.

**Atributos:**
| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `operation` | `str` | Nome da operação que falhou |
| `attempts` | `int` | Número de tentativas realizadas |
| `last_error` | `str` | Último erro capturado |

**Exemplo:**

```python
try:
    result = retry_with_backoff(api_call, max_retries=3)
except NetworkError as e:
    logger.critical(f"Falha de rede após {e.attempts} tentativas: {e.last_error}")
    # Notificar administrador ou usar modo offline
```

---

## Exceções de Arquivo e Dados

### `FileProcessingError`

```python
class FileProcessingError(PloomesClientError):
```

**Descrição:** Classe base para erros de processamento de arquivos.

**Uso:** Herança para erros específicos de arquivo.

---

### `MissingColumnError`

```python
class MissingColumnError(FileProcessingError):
    def __init__(self, column_name, available_columns):
```

**Descrição:** Coluna esperada não encontrada no arquivo.

**Atributos:**
| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `column_name` | `str` | Nome da coluna que faltou |
| `available_columns` | `List[str]` | Colunas disponíveis no arquivo |

**Exemplo:**

```python
try:
    df = processar_excel("advogados.xlsx")
    nome_col = encontrar_coluna(df, "Nome")
except MissingColumnError as e:
    print(f"❌ Coluna '{e.column_name}' não encontrada")
    print(f"📋 Colunas disponíveis: {', '.join(e.available_columns)}")
    # Sugerir mapeamento de colunas ou mostrar UI para seleção
```

---

### `FileSecurityError`

```python
class FileSecurityError(FileProcessingError):
    def __init__(self, file_path, reason):
```

**Descrição:** Problemas de segurança com arquivos (path traversal, extensões perigosas).

**Atributos:**
| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `file_path` | `str` | Caminho do arquivo problemático |
| `reason` | `str` | Motivo da rejeição |

**Exemplo:**

```python
try:
    validar_arquivo("../../../etc/passwd")
except FileSecurityError as e:
    logger.security_alert(f"Tentativa de path traversal: {e.file_path}")
    # Registrar tentativa suspeita e bloquear
```

---

## Exceções de Validação e Configuração

### `ValidationError`

```python
class ValidationError(PloomesClientError):
    def __init__(self, field_name, value, reason):
```

**Descrição:** Erros de validação de dados de entrada.

**Atributos:**
| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `field_name` | `str` | Nome do campo inválido |
| `value` | `Any` | Valor que falhou na validação |
| `reason` | `str` | Motivo da falha |

**Exemplo:**

```python
def validar_cpf(cpf):
    if not cpf_valido(cpf):
        raise ValidationError("CPF", cpf, "Dígitos verificadores inválidos")

try:
    validar_cpf("123.456.789-00")
except ValidationError as e:
    print(f"⚠️ {e.field_name}: {e.reason}")
    print(f"Valor fornecido: '{e.value}'")
    # Solicitar correção do usuário
```

---

### `ConfigurationError`

```python
class ConfigurationError(PloomesClientError):
    def __init__(self, message):
```

**Descrição:** Erros de configuração do sistema.

**Exemplo:**

```python
try:
    client = PloomesClient()
except ConfigurationError as e:
    logger.error(f"Configuração inválida: {e}")
    # Guiar usuário para configuração correta
    print("🔧 Execute: python setup.py configure")
```

---

## Exceções de Cache e Operações

### `CacheError`

```python
class CacheError(PloomesClientError):
    def __init__(self, operation, key=None, reason=None):
```

**Descrição:** Erros relacionados ao sistema de cache.

**Atributos:**
| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `operation` | `str` | Operação que falhou (get, set, delete) |
| `key` | `Optional[str]` | Chave do cache (se aplicável) |
| `reason` | `Optional[str]` | Motivo da falha |

**Exemplo:**

```python
try:
    cache.set("advogado_123", data)
except CacheError as e:
    logger.warning(f"Cache falhou: {e.operation} - continuando sem cache")
    # Operar sem cache, mas registrar para investigação
```

---

### `ContactCreationError`

```python
class ContactCreationError(PloomesClientError):
    def __init__(self, contact_type, contact_name, reason):
```

**Descrição:** Erro na criação de contatos no Ploomes.

**Atributos:**
| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `contact_type` | `str` | Tipo do contato (escritório, advogado) |
| `contact_name` | `str` | Nome do contato |
| `reason` | `str` | Motivo da falha |

**Exemplo:**

```python
try:
    escritorio_id = criar_escritorio(dados_escritorio)
except ContactCreationError as e:
    logger.error(f"Falha ao criar {e.contact_type} '{e.contact_name}': {e.reason}")

    if "duplicado" in e.reason.lower():
        # Tentar atualizar em vez de criar
        escritorio_id = atualizar_escritorio(dados_escritorio)
```

---

### `DataExtractionError`

```python
class DataExtractionError(PloomesClientError):
    def __init__(self, operation, target, reason):
```

**Descrição:** Erro na extração de dados de advogados/sociedades.

**Atributos:**
| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `operation` | `str` | Operação de extração |
| `target` | `str` | Alvo da extração |
| `reason` | `str` | Motivo da falha |

**Exemplo:**

```python
try:
    socios = extrair_socios_sociedade(cnpj)
except DataExtractionError as e:
    logger.warning(f"Não foi possível extrair {e.operation} de {e.target}: {e.reason}")
    # Continuar com dados parciais ou buscar fonte alternativa
```

---

## Padrões de Uso

### Tratamento Hierárquico

```python
def processar_advogado(nome, oab):
    try:
        return executar_processamento(nome, oab)

    except ValidationError as e:
        # Erro de dados - pode ser corrigido
        logger.warning(f"Dados inválidos: {e}")
        return None

    except CNAAPIError as e:
        # Erro de API - pode ser temporário
        logger.error(f"Falha na API CNA: {e}")
        if "timeout" in str(e):
            # Tentar novamente com timeout maior
            return tentar_novamente_com_timeout(nome, oab)
        return None

    except NetworkError as e:
        # Erro crítico de rede
        logger.critical(f"Falha de rede: {e}")
        raise  # Repassar para nível superior

    except PloomesClientError as e:
        # Qualquer outro erro do sistema
        logger.error(f"Erro geral: {e}")
        return None
```

### Retry com Exceções Específicas

```python
def operacao_com_retry():
    for tentativa in range(3):
        try:
            return executar_operacao()

        except (NetworkError, CNAAPIError) as e:
            if tentativa < 2:  # Não é a última tentativa
                delay = 2 ** tentativa  # Backoff exponencial
                logger.info(f"Tentativa {tentativa + 1} falhou, aguardando {delay}s")
                time.sleep(delay)
                continue
            else:
                raise  # Última tentativa - repassar exceção

        except ValidationError:
            # Erro de validação não deve ser retentado
            raise
```

### Logging Estruturado com Exceções

```python
def log_exception(e: PloomesClientError, context: dict = None):
    """Registra exceção com contexto estruturado."""

    log_data = {
        "exception_type": type(e).__name__,
        "exception_message": str(e),
        "context": context or {}
    }

    # Adicionar atributos específicos da exceção
    if hasattr(e, 'status_code'):
        log_data["http_status"] = e.status_code

    if hasattr(e, 'field_name'):
        log_data["field_name"] = e.field_name
        log_data["field_value"] = e.value

    logger.error("Exceção capturada", extra=log_data)
```

### Conversão de Exceções Externas

```python
def consultar_api_externa():
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        return response.json()

    except requests.exceptions.Timeout:
        raise NetworkError("consulta_api", 1, "Timeout de 30s excedido")

    except requests.exceptions.ConnectionError:
        raise NetworkError("consulta_api", 1, "Falha de conexão")

    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 401:
            raise InvalidUserKeyError("Credenciais inválidas na API externa")
        else:
            raise PloomesAPIError(e.response.status_code, e.response.text)
```

---

## Observabilidade e Monitoramento

### Métricas por Tipo de Exceção

```python
exception_counter = {
    "ValidationError": 0,
    "NetworkError": 0,
    "CNAAPIError": 0,
    # ... outros tipos
}

def track_exception(e: Exception):
    exception_type = type(e).__name__
    exception_counter[exception_type] = exception_counter.get(exception_type, 0) + 1

    # Alertas baseados em thresholds
    if exception_counter["NetworkError"] > 10:
        send_alert("Alta frequência de erros de rede")
```

### Dashboard de Erros

```python
def get_error_summary():
    return {
        "total_exceptions": sum(exception_counter.values()),
        "by_type": dict(exception_counter),
        "error_rate": calculate_error_rate(),
        "top_errors": sorted(exception_counter.items(), key=lambda x: x[1], reverse=True)[:5]
    }
```

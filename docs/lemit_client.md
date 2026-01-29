# 🔍 Documentação: LemitClient

**Arquivo:** `src/lemit_automation/lemit_client.py`

**Módulo:** `lemit_automation`

---

## 📑 Índice

- [Visão Geral](#visão-geral)
- [Classe LemitClient](#classe-lemitclient)
    - [Métodos de Inicialização](#métodos-de-inicialização)
    - [Métodos de API REST](#métodos-de-api-rest)
    - [Métodos de Enriquecimento](#métodos-de-enriquecimento)
    - [Métodos de Automação Web](#métodos-de-automação-web)
    - [Métodos Privados](#métodos-privados)
- [Estrutura de Dados](#estrutura-de-dados)
- [Exemplos de Uso](#exemplos-de-uso)
- [Melhores Práticas](#melhores-práticas)

---

## Visão Geral

O módulo `LemitClient` é responsável por automatizar consultas no sistema LEMIT, utilizando tanto API REST quanto automação via Selenium para operações que requerem interface web.

### Responsabilidades

| Responsabilidade        | Descrição                                     |
| ----------------------- | --------------------------------------------- |
| **Consulta API**        | Consulta pessoas e empresas via API REST      |
| **Enriquecimento**      | Enriquece dados com telefones e emails        |
| **Automação Web**       | Login, upload de CSV e download de resultados |
| **Processamento Batch** | Upload de lotes de CPFs para processamento    |
| **Validação**           | Valida e formata dados (CPF, CNPJ, telefones) |

### Dependências

```python
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

from src.utils.human_behavior import HumanBehavior
from src.utils.webdriver_factory import WebDriverFactory
from src.lemit_automation.config import (
    get_lemit_auth_header,
    LEMIT_API_ENDPOINTS,
    LEMIT_WEB_BASE_URL,
    LEMIT_USERNAME,
    LEMIT_PASSWORD,
    LEMIT_SELECTORS,
)
```

---

## Classe LemitClient

```python
class LemitClient:
    """Cliente para automação de consultas no sistema LEMIT utilizando Selenium e API REST."""
```

---

## Métodos de Inicialização

### `__init__`

```python
def __init__(self, credentials: dict = None, download_path: str = None):
```

**Descrição:** Inicializa o cliente LEMIT com credenciais e caminho de download.

| Parâmetro       | Tipo   | Padrão | Descrição                                   |
| --------------- | ------ | ------ | ------------------------------------------- |
| `credentials`   | `dict` | `None` | Credenciais (`username`, `password`, `url`) |
| `download_path` | `str`  | `None` | Caminho para salvar downloads               |

**Comportamento:**

- Se `credentials` fornecido: usa credenciais customizadas
- Se `None`: usa variáveis de ambiente do config
- Se `download_path` fornecido: usa caminho customizado
- Se `None`: usa `./downloads`

**Atributos Inicializados:**

| Atributo              | Tipo               | Descrição                      |
| --------------------- | ------------------ | ------------------------------ |
| `self.username`       | `str`              | Username LEMIT                 |
| `self.password`       | `str`              | Password LEMIT                 |
| `self.base_url`       | `str`              | URL base LEMIT                 |
| `self.download_path`  | `str`              | Caminho absoluto de download   |
| `self.driver`         | `webdriver.Chrome` | Driver Selenium (None inicial) |
| `self.logger`         | `logging.Logger`   | Logger configurado             |
| `self.driver_factory` | `WebDriverFactory` | Factory do WebDriver           |
| `self.human_behavior` | `HumanBehavior`    | Helper para delays humanos     |

---

## Métodos de API REST

### `consultar_pessoa_por_cpf`

```python
def consultar_pessoa_por_cpf(self, cpf: str) -> dict | None
```

**Descrição:** Consulta dados de uma pessoa por CPF via API LEMIT.

| Parâmetro | Tipo  | Descrição            |
| --------- | ----- | -------------------- |
| `cpf`     | `str` | CPF (apenas números) |

**Retorno:** `dict | None` - Dados da pessoa ou None em caso de erro

**Exceções:**

- `requests.HTTPError` - Erro HTTP (4xx, 5xx)
- `requests.RequestException` - Erro de conexão/timeout

**Endpoint:** `POST /api/v1/consulta/pessoa/`

**Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`

**Exemplo:**

```python
dados = client.consultar_pessoa_por_cpf("14821139456")
if dados:
    print(f"Nome: {dados.get('nome')}")
```

---

### `get_advogados_socios`

```python
def get_advogados_socios(self, cnpj: str) -> list[dict]
```

**Descrição:** Consulta advogados sócios de um escritório via API LEMIT.

| Parâmetro | Tipo  | Descrição             |
| --------- | ----- | --------------------- |
| `cnpj`    | `str` | CNPJ (apenas números) |

**Retorno:** `list[dict]` - Lista de sócios (vazia se erro)

**Estrutura do Retorno:**

```python
[
    {
        "cpf": "12345678900",
        "nome": "João Silva",
        "participacao": 50.0,
        "capital_social": 100000.0,
    }
]
```

**Endpoint:** `POST /api/v1/consulta/empresa/`

**Exemplo:**

```python
socios = client.get_advogados_socios("07617044000104")
for socio in socios:
    print(f"{socio['nome']} - CPF: {socio['cpf']}")
```

---

### `consultar_pessoa_por_nome`

```python
def consultar_pessoa_por_nome(
    self,
    nome: str,
    uf: str = None,
    enriched: bool = False
) -> dict | None
```

**Descrição:** Consulta dados de uma pessoa por nome via API LEMIT.

| Parâmetro  | Tipo   | Padrão  | Descrição                  |
| ---------- | ------ | ------- | -------------------------- |
| `nome`     | `str`  | -       | Nome completo ou parcial   |
| `uf`       | `str`  | `None`  | UF para filtrar resultados |
| `enriched` | `bool` | `False` | (Não utilizado)            |

**Retorno:** `dict | None` - Dados da pessoa ou None

**Endpoint:** `GET /api/v1/consulta/nome/{nome}`

**Query Params:** `?uf=RS` (se fornecido)

**Exemplo:**

```python
# Sem filtro de UF
dados = client.consultar_pessoa_por_nome("João da Silva")

# Com filtro de UF
dados = client.consultar_pessoa_por_nome("João da Silva", uf="RS")
if dados:
    for pessoa in dados.get('resultados', []):
        print(f"CPF: {pessoa['cpf']}, UF: {pessoa['uf']}")
```

---

## Métodos de Enriquecimento

### `enriquecer_contato_com_cpf`

```python
def enriquecer_contato_com_cpf(self, cpf: str) -> dict
```

**Descrição:** Enriquece dados de contato consultando CPF na API LEMIT.

| Parâmetro | Tipo  | Descrição                  |
| --------- | ----- | -------------------------- |
| `cpf`     | `str` | CPF (números ou formatado) |

**Retorno:** `dict` - Dados enriquecidos

**Estrutura do Retorno:**

```python
{
    "telefones": ["11987654321", "11912345678"],  # Máximo 4
    "emails": ["email@example.com"],  # Máximo 3
    "dados_completos": {...},  # Resposta completa da API
}
```

**Comportamento:**

- Se não encontrado: `{"telefones": ["Não encontrado"], "emails": ["Não encontrado"]}`
- Telefones ordenados por: WhatsApp primeiro, depois por ranking
- Emails ordenados por: ranking (menor = melhor)

**Exemplo:**

```python
dados = client.enriquecer_contato_com_cpf("12345678900")
print(dados['telefones'])  # ['11987654321', '11912345678']
print(dados['emails'])  # ['email@example.com']
```

---

### `enriquecer_contato_com_nome`

```python
def enriquecer_contato_com_nome(
    self,
    nome: str,
    uf: str = None,
    expand: bool = True
) -> dict
```

**Descrição:** Enriquece dados de contato consultando nome na API LEMIT.

**Estratégia em 2 etapas:**

1. Consulta por nome para obter CPF
2. Se houver exatamente 1 resultado, consulta por CPF para obter telefones/emails

| Parâmetro | Tipo   | Padrão | Descrição                    |
| --------- | ------ | ------ | ---------------------------- |
| `nome`    | `str`  | -      | Nome completo                |
| `uf`      | `str`  | `None` | UF para filtrar              |
| `expand`  | `bool` | `True` | Se False, retorna apenas CPF |

**Retorno:** `dict` - Dados enriquecidos

**Estrutura do Retorno:**

```python
# Sucesso (1 resultado)
{
    "telefones": ["11987654321"],
    "emails": ["email@example.com"],
    "cpf": "12345678900",
    "dados_completos": {...},
}

# Não encontrado
{
    "telefones": ["Não encontrado"],
    "emails": ["Não encontrado"],
    "cpf": "Não encontrado",
}

# Múltiplos resultados (ambiguidade)
{
    "telefones": ["Múltiplos resultados"],
    "emails": ["Múltiplos resultados"],
    "cpf": "Múltiplos resultados",
}
```

**Exemplo:**

```python
# Caso encontre 1 resultado
dados = client.enriquecer_contato_com_nome("João Silva", uf="SP")
print(dados['cpf'])  # '12345678900'
print(dados['telefones'])  # ['11987654321']

# Caso não encontrado
dados = client.enriquecer_contato_com_nome("Nome Inexistente")
print(dados['telefones'])  # ['Não encontrado']

# Caso múltiplos resultados
dados = client.enriquecer_contato_com_nome("João Silva")
print(dados['cpf'])  # 'Múltiplos resultados'
```

---

### `consultar`

```python
def consultar(self, chave_consulta: str) -> dict
```

**Descrição:** Interface unificada para consulta (CPF ou nome).

**Detecção Automática:**

- Se apenas dígitos e 11 caracteres → CPF
- Caso contrário → Nome

| Parâmetro        | Tipo  | Descrição   |
| ---------------- | ----- | ----------- |
| `chave_consulta` | `str` | CPF ou nome |

**Retorno:** `dict` - Dados enriquecidos

**Exemplo:**

```python
# Consulta por CPF
dados = client.consultar("12345678900")
print(dados['telefones'])  # ['11987654321']

# Consulta por nome
dados = client.consultar("João Silva")
print(dados['cpf'])  # '12345678900'
```

---

## Métodos de Automação Web

### `setup_driver`

```python
def setup_driver(self) -> bool
```

**Descrição:** Configura o WebDriver Selenium com ChromeOptions.

**Retorno:** `bool` - True se sucesso, False se erro

**Configurações:**

- Download path configurado
- Window size padrão
- Implicit wait
- Page load timeout

**Exemplo:**

```python
if client.setup_driver():
    print("✅ Driver configurado")
```

---

### `login`

```python
def login(self) -> bool
```

**Descrição:** Realiza login no sistema LEMIT via Selenium.

**Retorno:** `bool` - True se sucesso, False se erro

**Workflow:**

1. Navega para página de login
2. Preenche username
3. Preenche password
4. Clica em "Entrar"
5. Aguarda redirecionamento

**Seletores:** Configurados em `LEMIT_SELECTORS` do config

**Exemplo:**

```python
if client.login():
    print("✅ Login realizado")
```

---

### `navigate_to_cpf_query_page`

```python
def navigate_to_cpf_query_page(self) -> bool
```

**Descrição:** Navega até a página de consulta de CPF.

**Retorno:** `bool` - True se sucesso, False se erro

**Workflow:**

1. Clica em menu "Consultar"
2. Clica em submenu "Consultar CPF"
3. Aguarda carregamento da página

---

### `upload_cpf_file`

```python
def upload_cpf_file(self, file_path: str) -> bool
```

**Descrição:** Faz upload de arquivo CSV com CPFs.

| Parâmetro   | Tipo  | Descrição              |
| ----------- | ----- | ---------------------- |
| `file_path` | `str` | Caminho do arquivo CSV |

**Retorno:** `bool` - True se sucesso, False se erro

**Validações:**

- Arquivo existe
- Extensão `.csv`
- Formato válido

**Workflow:**

1. Localiza input de arquivo
2. Envia caminho do arquivo
3. Aguarda upload
4. Clica em "Processar"

---

### `wait_for_aproval_page`

```python
def wait_for_aproval_page(
    self,
    timeout: int = None,
    check_interval: int = None
) -> bool
```

**Descrição:** Aguarda página de aprovação de requisições.

| Parâmetro        | Tipo  | Padrão                      | Descrição             |
| ---------------- | ----- | --------------------------- | --------------------- |
| `timeout`        | `int` | `APPROVAL_TIMEOUT`          | Timeout em segundos   |
| `check_interval` | `int` | `PROCESSING_CHECK_INTERVAL` | Intervalo de checagem |

**Retorno:** `bool` - True se página carregou

**Comportamento:**

- Polling a cada `check_interval` segundos
- Timeout após `timeout` segundos
- Verifica presença de elementos de aprovação

---

### `approve_requests_and_confirm`

```python
def approve_requests_and_confirm(self, timeout: int = 30) -> bool
```

**Descrição:** Aprova requisições e confirma processamento.

| Parâmetro | Tipo  | Padrão | Descrição           |
| --------- | ----- | ------ | ------------------- |
| `timeout` | `int` | `30`   | Timeout em segundos |

**Retorno:** `bool` - True se aprovado

**Workflow:**

1. Clica em "Aprovar Todas"
2. Clica em "Confirmar"
3. Aguarda processamento iniciar

---

### `wait_for_processing_and_download`

```python
def wait_for_processing_and_download(
    self,
    timeout: int = None,
    check_interval: int = None
) -> str | None
```

**Descrição:** Aguarda processamento e baixa resultados.

| Parâmetro        | Tipo  | Padrão                      | Descrição             |
| ---------------- | ----- | --------------------------- | --------------------- |
| `timeout`        | `int` | `PROCESSING_TIMEOUT`        | Timeout em segundos   |
| `check_interval` | `int` | `PROCESSING_CHECK_INTERVAL` | Intervalo de checagem |

**Retorno:** `str | None` - Caminho do arquivo baixado ou None

**Workflow:**

1. Aguarda processamento concluir (polling)
2. Clica em "Download"
3. Aguarda arquivo ser baixado
4. Retorna caminho do arquivo

**Timeout:** Configurável, padrão em `config.py`

---

### `close`

```python
def close(self) -> None
```

**Descrição:** Fecha o WebDriver e limpa recursos.

**Exemplo:**

```python
try:
    client.setup_driver()
    client.login()
    # ... operações
finally:
    client.close()
```

---

## Métodos Privados

### `_extrair_telefones`

```python
def _extrair_telefones(self, dados_api: dict) -> list[str]
```

**Descrição:** Extrai lista de telefones dos dados da API LEMIT.

**Estrutura Esperada:**

```python
{
    'pessoa': {
        'celulares': [
            {'ddd': 11, 'numero': '970959340', 'whatsapp': True, 'ranking': 1}
        ],
        'fixos': [...]
    }
}
```

**Retorno:** `list[str]` - Lista de telefones (máximo 4)

**Ordenação:**

1. WhatsApp primeiro
2. Ranking menor (melhor)

**Formato:** `11970959340` (DDD + número)

---

### `_extrair_emails`

```python
def _extrair_emails(self, dados_api: dict) -> list[str]
```

**Descrição:** Extrai lista de emails dos dados da API LEMIT.

**Estrutura Esperada:**

```python
{
    'pessoa': {
        'emails': [
            {'email': 'test@example.com', 'ranking': 1}
        ]
    }
}
```

**Retorno:** `list[str]` - Lista de emails (máximo 3)

**Ordenação:** Ranking menor (melhor)

---

## Estrutura de Dados

### Resposta de `consultar_pessoa_por_cpf`

```python
{
    "pessoa": {
        "nome": "João Silva",
        "cpf": "12345678900",
        "celulares": [
            {
                "ddd": 11,
                "numero": "987654321",
                "whatsapp": True,
                "ranking": 1
            }
        ],
        "fixos": [...],
        "emails": [
            {
                "email": "joao@example.com",
                "ranking": 1
            }
        ]
    }
}
```

### Resposta de `get_advogados_socios`

```python
[
    {
        "cpf": "12345678900",
        "nome": "João Silva",
        "participacao": 50.0,
        "capital_social": 100000.0
    }
]
```

---

## Exemplos de Uso

### Exemplo 1: Consulta Simples por CPF

```python
from src.lemit_automation import LemitClient

client = LemitClient()

# Consulta por CPF
dados = client.consultar_pessoa_por_cpf("14821139456")
if dados:
    print(f"Nome: {dados['pessoa']['nome']}")
    print(f"Telefones: {dados['pessoa']['celulares']}")
```

### Exemplo 2: Enriquecimento de Contato

```python
client = LemitClient()

# Enriquecer com CPF
dados = client.enriquecer_contato_com_cpf("12345678900")
print(f"Telefones: {dados['telefones']}")
print(f"Emails: {dados['emails']}")

# Enriquecer com nome
dados = client.enriquecer_contato_com_nome("João Silva", uf="SP")
print(f"CPF: {dados['cpf']}")
print(f"Telefones: {dados['telefones']}")
```

### Exemplo 3: Interface Unificada

```python
client = LemitClient()

# Detecta automaticamente CPF ou nome
dados_cpf = client.consultar("12345678900")
dados_nome = client.consultar("João Silva")
```

### Exemplo 4: Consulta de Sócios

```python
client = LemitClient()

socios = client.get_advogados_socios("07617044000104")
for socio in socios:
    print(f"{socio['nome']} - Participação: {socio['participacao']}%")
```

### Exemplo 5: Automação Web Completa

```python
client = LemitClient(download_path="./downloads")

try:
    # Setup e login
    if not client.setup_driver():
        raise Exception("Erro ao configurar driver")

    if not client.login():
        raise Exception("Erro no login")

    # Navegar e upload
    if not client.navigate_to_cpf_query_page():
        raise Exception("Erro ao navegar")

    if not client.upload_cpf_file("cpfs.csv"):
        raise Exception("Erro no upload")

    # Aprovação e processamento
    if not client.wait_for_aproval_page():
        raise Exception("Timeout na aprovação")

    if not client.approve_requests_and_confirm():
        raise Exception("Erro na aprovação")

    # Download
    result_file = client.wait_for_processing_and_download()
    if result_file:
        print(f"✅ Arquivo baixado: {result_file}")
    else:
        print("❌ Erro no download")

finally:
    client.close()
```

### Exemplo 6: Com Credenciais Customizadas

```python
credentials = {
    "username": "meu_usuario",
    "password": "minha_senha",
    "url": "https://lemit.example.com"
}

client = LemitClient(
    credentials=credentials,
    download_path="./custom_downloads"
)
```

---

## Melhores Práticas

### 1. Sempre Feche o Driver

```python
# ✅ BOM
try:
    client.setup_driver()
    # ... operações
finally:
    client.close()

# ❌ EVITE
client.setup_driver()
# ... operações
# Driver não fechado → vazamento de recursos
```

### 2. Valide Dados de Entrada

```python
# ✅ BOM
from src.utils.validator import CPFValidator

cpf = CPFValidator.clean_input("123.456.789-00")
if CPFValidator.is_valid(cpf):
    dados = client.consultar_pessoa_por_cpf(cpf)

# ❌ EVITE
dados = client.consultar_pessoa_por_cpf("123.456.789-00")
```

### 3. Trate Erros de API

```python
# ✅ BOM
import requests

try:
    dados = client.consultar_pessoa_por_cpf(cpf)
except requests.HTTPError as e:
    logger.error(f"Erro HTTP: {e.response.status_code}")
except requests.RequestException as e:
    logger.error(f"Erro de conexão: {e}")

# ❌ EVITE
dados = client.consultar_pessoa_por_cpf(cpf)  # Sem tratamento
```

### 4. Use Enriquecimento Apropriado

```python
# ✅ BOM - Nome específico com UF
dados = client.enriquecer_contato_com_nome("João Silva", uf="SP")

# ⚠️ CUIDADO - Nome genérico pode retornar múltiplos
dados = client.enriquecer_contato_com_nome("João Silva")
if dados['cpf'] == "Múltiplos resultados":
    logger.warning("Ambiguidade na busca")

# ✅ BOM - CPF é único
dados = client.enriquecer_contato_com_cpf("12345678900")
```

### 5. Configure Timeouts Apropriados

```python
# ✅ BOM - Timeouts customizados para processamento longo
result = client.wait_for_processing_and_download(
    timeout=600,  # 10 minutos
    check_interval=10  # Checa a cada 10s
)

# ❌ EVITE - Timeout muito curto
result = client.wait_for_processing_and_download(timeout=30)
```

### 6. Use Delays Humanos

```python
# ✅ BOM - HumanBehavior já integrado
client.human_behavior.human_like_delay()  # Delay aleatório

# ❌ EVITE - Delays fixos
import time
time.sleep(1)  # Pode ser detectado como bot
```

### 7. Monitore Arquivos Baixados

```python
# ✅ BOM
import os

result_file = client.wait_for_processing_and_download()
if result_file and os.path.exists(result_file):
    file_size = os.path.getsize(result_file)
    logger.info(f"Arquivo baixado: {file_size} bytes")
else:
    logger.error("Arquivo não encontrado")
```

---

## Referências

- [HumanBehavior](../utils/human_behavior.md)
- [WebDriverFactory](../utils/webdriver_factory.md)
- [CPFValidator](../utils/validator.md)
- [Config LEMIT](config.md)

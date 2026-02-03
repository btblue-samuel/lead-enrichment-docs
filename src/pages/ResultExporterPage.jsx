import CodeBlock from "../components/CodeBlock";

function ResultExporterPage() {
  return (
    <div className="doc-page">
      <h1>Classe: ResultExporter</h1>
      <p className="doc-subtitle">
        Exporta resultados de processamento para arquivos Excel com múltiplas
        abas e métricas detalhadas.
      </p>

      <section className="doc-section">
        <h2>Visão Geral</h2>
        <p>
          O módulo <code className="code-block">ResultExporter</code> é
          responsável por exportar resultados de processamento para arquivos
          Excel com múltiplas abas e métricas detalhadas. Ele consolida
          informações de escritórios, advogados, reclamantes e LEMIT em um
          relatório completo.
        </p>

        <h3>Responsabilidades</h3>
        <table className="params-table">
          <thead>
            <tr>
              <th>Responsabilidade</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Exportação Excel</td>
              <td>Gera arquivos .xlsx com múltiplas abas</td>
            </tr>
            <tr>
              <td>Métricas Agregadas</td>
              <td>Calcula estatísticas de processamento</td>
            </tr>
            <tr>
              <td>Normalização</td>
              <td>Integra log de normalização de escritórios</td>
            </tr>
            <tr>
              <td>Validação</td>
              <td>Valida dados de entrada antes da exportação</td>
            </tr>
            <tr>
              <td>Logging</td>
              <td>Registra resumo de operações</td>
            </tr>
          </tbody>
        </table>

        <h3>Dependências</h3>
        <CodeBlock
          code={`import logging
import os
from datetime import datetime
from typing import Any, Dict, List

import pandas as pd

from ...exceptions import FileProcessingError, ValidationError
from .escritorio_normalizer import EscritorioNormalizer
from .tabular_io import TabularIO`}
        />
      </section>

      <section className="doc-section">
        <h2>Constantes de Classe</h2>

        <div className="method-block">
          <h3>OPERATION_MAP_PT</h3>
          <CodeBlock
            code={`OPERATION_MAP_PT = {
    "created": "Criado",
    "updated": "Atualizado",
    "mixed": "Misto (Criado/Atualizado)",
    "failed": "Falha",
    "skipped": "Pulado",
    "unknown": "Desconhecido",
}`}
          />
          <p>
            <strong>Descrição:</strong> Mapeamento de operações em inglês para
            português para o relatório.
          </p>
        </div>

        <div className="method-block">
          <h3>RESULT_HEADERS</h3>
          <CodeBlock
            code={`RESULT_HEADERS = [
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
]`}
          />
          <p>
            <strong>Descrição:</strong> Headers da aba "Escritório e Advogado".
          </p>
          <p>
            <strong>Total:</strong> 12 campos
          </p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos Públicos</h2>

        <div className="method-block">
          <h3 id="__init__">__init__</h3>
          <CodeBlock
            code={`def __init__(
    self,
    logger: logging.Logger = None,
    normalizer: EscritorioNormalizer = None,
):`}
          />
          <p>
            <strong>Descrição:</strong> Inicializa o exportador de resultados.
          </p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Parâmetro</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>logger</td>
                <td>
                  <code className="code-block">logging.Logger</code>
                </td>
                <td>Logger (usa __name__ se None)</td>
              </tr>
              <tr>
                <td>normalizer</td>
                <td>
                  <code className="code-block">EscritorioNormalizer</code>
                </td>
                <td>Normalizador de escritórios (opcional)</td>
              </tr>
            </tbody>
          </table>

          <h4>Atributos Inicializados</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>self.logger</td>
                <td>
                  <code className="code-block">logging.Logger</code>
                </td>
                <td>Logger configurado</td>
              </tr>
              <tr>
                <td>self._normalizer</td>
                <td>
                  <code className="code-block">EscritorioNormalizer</code>
                </td>
                <td>Normalizador (pode ser None)</td>
              </tr>
              <tr>
                <td>self._tabular_io</td>
                <td>
                  <code className="code-block">TabularIO</code>
                </td>
                <td>Helper para I/O de arquivos</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="method-block">
          <h3 id="export_results_to_excel">export_results_to_excel</h3>
          <CodeBlock
            code={`def export_results_to_excel(
    self,
    results: List[Dict[str, Any]],
    output_path: str = None,
    workflow_type: str = "advogado_escritorio",
    lemit_stats: Dict[str, Any] = None,
) -> str`}
          />
          <p>
            <strong>Descrição:</strong> Exporta resultados para arquivo Excel
            com múltiplas abas.
          </p>

          <h4>Parâmetros</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Parâmetro</th>
                <th>Tipo</th>
                <th>Padrão</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>results</td>
                <td>
                  <code className="code-block">List[Dict]</code>
                </td>
                <td>-</td>
                <td>Lista de resultados do processamento</td>
              </tr>
              <tr>
                <td>output_path</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>None</td>
                <td>Caminho de saída (gera automático se None)</td>
              </tr>
              <tr>
                <td>workflow_type</td>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>"advogado_escritorio"</td>
                <td>Tipo de workflow</td>
              </tr>
              <tr>
                <td>lemit_stats</td>
                <td>
                  <code className="code-block">Dict</code>
                </td>
                <td>None</td>
                <td>Estatísticas LEMIT</td>
              </tr>
            </tbody>
          </table>

          <h4>Retorno</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code className="code-block">str</code>
                </td>
                <td>Caminho do arquivo Excel gerado</td>
              </tr>
            </tbody>
          </table>

          <h4>Exceções</h4>
          <ul>
            <li>
              <code className="code-block">ValidationError</code> - Se
              resultados inválidos
            </li>
            <li>
              <code className="code-block">FileProcessingError</code> - Se erro
              na exportação
            </li>
            <li>
              <code className="code-block">PermissionError</code> - Se sem
              permissão para escrever
            </li>
          </ul>

          <h4>Workflow</h4>
          <CodeBlock
            code={`1. _validate_results() → Valida entrada
2. _prepare_output_path() → Prepara caminho
3. _process_results() → Processa dados
4. Calcular métricas (total, sucessos, falhas)
5. _build_reclamantes_data() → Dados da aba 2
6. _write_excel() → Escreve arquivo
7. _log_summary() → Loga resumo`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Métodos Privados</h2>

        <div className="method-block">
          <h3 id="_validate_results">_validate_results</h3>
          <CodeBlock
            code={`def _validate_results(
    self,
    results: List[Dict[str, Any]],
    lemit_stats: Dict[str, Any]
) -> None`}
          />
          <p>
            <strong>Descrição:</strong> Valida os resultados de entrada.
          </p>

          <h4>Validações</h4>
          <ul>
            <li>
              <code className="code-block">results</code> deve ser lista
            </li>
            <li>
              Se <code className="code-block">results</code> vazio,{" "}
              <code className="code-block">lemit_stats</code> deve existir
            </li>
          </ul>

          <h4>Exceções</h4>
          <p>
            <code className="code-block">ValidationError</code> se validação
            falhar
          </p>
        </div>

        <div className="method-block">
          <h3 id="_prepare_output_path">_prepare_output_path</h3>
          <CodeBlock
            code={`def _prepare_output_path(self, output_path: str) -> str`}
          />
          <p>
            <strong>Descrição:</strong> Prepara e valida o caminho de saída.
          </p>

          <h4>Operações</h4>
          <ol>
            <li>Se output_path é None: gera nome com timestamp</li>
            <li>Cria diretórios se não existirem</li>
            <li>Garante extensão .xlsx</li>
            <li>Adiciona timestamp ao nome</li>
          </ol>

          <h4>Retorno</h4>
          <p>
            <code className="code-block">str</code> - Caminho completo com
            timestamp
          </p>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`# Input: None
# Output: "output/reports/processamento_ploomes_20260128_143522.xlsx"

# Input: "relatorio.csv"
# Output: "relatorio_20260128_143522.xlsx"`}
          />
        </div>

        <div className="method-block">
          <h3 id="_process_results">_process_results</h3>
          <CodeBlock
            code={`def _process_results(
    self,
    results: List[Dict[str, Any]]
) -> tuple[List[Dict[str, Any]], List[Dict[str, Any]]]`}
          />
          <p>
            <strong>Descrição:</strong> Processa resultados e retorna dados e
            log de normalização.
          </p>

          <h4>Retorno</h4>
          <p>
            <code className="code-block">tuple[List[Dict], List[Dict]]</code>
          </p>
          <ul>
            <li>
              <code className="code-block">rows_data</code> - Dados formatados
              para Excel
            </li>
            <li>
              <code className="code-block">normalization_log</code> - Log de
              normalizações
            </li>
          </ul>

          <h4>Comportamento</h4>
          <ul>
            <li>Para cada resultado: chama _process_single_result()</li>
            <li>Se erro: adiciona linha de erro via _create_error_row()</li>
          </ul>
        </div>

        <div className="method-block">
          <h3 id="_process_single_result">_process_single_result</h3>
          <CodeBlock
            code={`def _process_single_result(
    self,
    result: Dict[str, Any]
) -> tuple[Dict[str, Any], Dict[str, Any] | None]`}
          />
          <p>
            <strong>Descrição:</strong> Processa um único resultado.
          </p>

          <h4>Retorno</h4>
          <p>
            <code className="code-block">tuple[Dict, Dict | None]</code>
          </p>
          <ul>
            <li>
              <code className="code-block">row</code> - Dicionário com 12 campos
              (RESULT_HEADERS)
            </li>
            <li>
              <code className="code-block">norm_entry</code> - Entrada de log de
              normalização (ou None)
            </li>
          </ul>

          <h4>Processamento</h4>
          <ol>
            <li>Extrair escritorio_original e advogado_original</li>
            <li>Normalizar nome do escritório via _normalize_name()</li>
            <li>Criar entrada de log se normalização aplicada</li>
            <li>Coletar motivos de skip via _collect_skip_reasons()</li>
            <li>Formatar lista de sócios (separado por ";")</li>
            <li>Construir dicionário row com todos os campos</li>
            <li>Traduzir operação via OPERATION_MAP_PT</li>
          </ol>

          <h4>Campos Gerados</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>Campo</th>
                <th>Fonte</th>
                <th>Transformação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Escritório</td>
                <td>esc.Nome</td>
                <td>Normalizado</td>
              </tr>
              <tr>
                <td>Pessoa Física</td>
                <td>esc.Pessoa_Física</td>
                <td>Direto</td>
              </tr>
              <tr>
                <td>CNPJ</td>
                <td>esc.CNPJ</td>
                <td>Se PJ</td>
              </tr>
              <tr>
                <td>CPF</td>
                <td>esc.CPF</td>
                <td>Se PF</td>
              </tr>
              <tr>
                <td>Advogado</td>
                <td>adv.Nome</td>
                <td>Direto</td>
              </tr>
              <tr>
                <td>OAB</td>
                <td>adv.OAB</td>
                <td>Direto</td>
              </tr>
              <tr>
                <td>É Sócio</td>
                <td>result.is_socio</td>
                <td>"Sim"/"Não"</td>
              </tr>
              <tr>
                <td>Sócios</td>
                <td>result.socios</td>
                <td>Join com ";"</td>
              </tr>
              <tr>
                <td>Operação</td>
                <td>result.operation</td>
                <td>Traduzido PT</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>result.success</td>
                <td>"Sucesso"/"Falha"</td>
              </tr>
              <tr>
                <td>Possui Deal B2B</td>
                <td>result.has_b2b_deal</td>
                <td>"Sim"/"Não"</td>
              </tr>
              <tr>
                <td>Motivo do Skip</td>
                <td>Múltiplas fontes</td>
                <td>Concatenado</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="method-block">
          <h3 id="_normalize_name">_normalize_name</h3>
          <CodeBlock
            code={`def _normalize_name(self, name: str) -> tuple[str, str, float]`}
          />
          <p>
            <strong>Descrição:</strong> Normaliza nome usando o normalizer se
            disponível.
          </p>

          <h4>Retorno</h4>
          <p>
            <code className="code-block">tuple[str, str, float]</code>
          </p>
          <ul>
            <li>
              <code className="code-block">normalized_name</code> - Nome
              normalizado
            </li>
            <li>
              <code className="code-block">status</code> - Status da
              normalização
            </li>
            <li>
              <code className="code-block">score</code> - Score de similaridade
              (0.0-1.0)
            </li>
          </ul>

          <h4>Status Possíveis</h4>
          <ul>
            <li>"normalized" - Match exato</li>
            <li>"fuzzy_matched" - Match por similaridade</li>
            <li>"not_found" - Não encontrado</li>
            <li>"disabled" - Normalizer desabilitado</li>
          </ul>
        </div>

        <div className="method-block">
          <h3 id="_collect_skip_reasons">_collect_skip_reasons</h3>
          <CodeBlock
            code={`def _collect_skip_reasons(self, result: Dict[str, Any]) -> str`}
          />
          <p>
            <strong>Descrição:</strong> Coleta motivos de skip de um resultado.
          </p>

          <h4>Retorno</h4>
          <p>
            <code className="code-block">str</code> - Motivos concatenados por "
            | " ou string vazia
          </p>

          <h4>Fontes</h4>
          <ol>
            <li>result.errors se operation == "skipped"</li>
            <li>escritorio._skip_reason se _was_skipped</li>
            <li>advogado._skip_reason se _was_skipped</li>
          </ol>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`"Escritório: Já possui Deal B2B | Advogado: Não encontrado no CNA"`}
          />
        </div>

        <div className="method-block">
          <h3 id="_create_error_row">_create_error_row</h3>
          <CodeBlock code={`def _create_error_row(self) -> Dict[str, Any]`} />
          <p>
            <strong>Descrição:</strong> Cria linha de erro padrão.
          </p>

          <h4>Retorno</h4>
          <p>Dicionário com todos os campos preenchidos com valores de erro:</p>
          <ul>
            <li>Textos: "ERRO AO PROCESSAR", "N/A"</li>
            <li>Status: "Erro"</li>
            <li>Motivo: "Erro ao processar linha"</li>
          </ul>
        </div>

        <div className="method-block">
          <h3 id="_count_operations">_count_operations</h3>
          <CodeBlock
            code={`def _count_operations(self, results: List[Dict[str, Any]]) -> Dict[str, int]`}
          />
          <p>
            <strong>Descrição:</strong> Conta operações por tipo.
          </p>

          <h4>Retorno</h4>
          <p>
            <code className="code-block">Dict[str, int]</code> - Contagem de
            cada operação
          </p>

          <h4>Exemplo</h4>
          <CodeBlock
            code={`{
    "created": 10,
    "updated": 5,
    "skipped": 3,
    "failed": 2,
}`}
          />
        </div>

        <div className="method-block">
          <h3 id="_build_reclamantes_data">_build_reclamantes_data</h3>
          <CodeBlock
            code={`def _build_reclamantes_data(
    self,
    workflow_type: str,
    total: int,
    success_count: int,
    failed_count: int,
    operations_count: Dict[str, int],
    lemit_stats: Dict[str, Any],
) -> List[Dict[str, Any]]`}
          />
          <p>
            <strong>Descrição:</strong> Constrói dados da aba "Reclamantes".
          </p>

          <h4>Retorno</h4>
          <p>
            <code className="code-block">List[Dict[str, Any]]</code> - Lista de
            dicionários {`{"Métrica": str, "Valor": Any}`}
          </p>

          <h4>Seções</h4>
          <ol>
            <li>
              <strong>Header:</strong> Timestamp e tipo de workflow
            </li>
            <li>
              <strong>Reclamantes:</strong> Estatísticas LEMIT (se disponível)
            </li>
            <li>
              <strong>Ploomes:</strong> Estatísticas escritório/advogado (se
              total &gt; 0)
            </li>
            <li>
              <strong>Breakdown:</strong> Operações por tipo
            </li>
          </ol>

          <h4>Estrutura</h4>
          <CodeBlock
            code={`Timestamp: 2026-01-28 14:35:22
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
  Falha: 2`}
          />
        </div>

        <div className="method-block">
          <h3 id="_write_excel">_write_excel</h3>
          <CodeBlock
            code={`def _write_excel(
    self,
    output_path: str,
    df_importacao: pd.DataFrame,
    df_reclamantes: pd.DataFrame,
    normalization_log: List[Dict[str, Any]],
    total: int,
) -> None`}
          />
          <p>
            <strong>Descrição:</strong> Escreve o arquivo Excel com múltiplas
            abas.
          </p>

          <h4>Abas Criadas</h4>
          <table className="params-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Condição</th>
                <th>Conteúdo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>"Escritório e Advogado"</td>
                <td>Sempre</td>
                <td>Dados de importação ou mensagem</td>
              </tr>
              <tr>
                <td>2</td>
                <td>"Reclamantes"</td>
                <td>Sempre</td>
                <td>Estatísticas LEMIT e Ploomes</td>
              </tr>
              <tr>
                <td>3</td>
                <td>"Log de Normalização"</td>
                <td>Se normalizer ativo e log não vazio</td>
                <td>Log de normalizações</td>
              </tr>
            </tbody>
          </table>

          <h4>Comportamento Especial</h4>
          <ul>
            <li>
              Se total == 0: Aba 1 mostra mensagem "Este workflow não processa
              escritórios/advogados"
            </li>
            <li>Se normalização ativa mas log vazio: loga informação</li>
          </ul>
        </div>

        <div className="method-block">
          <h3 id="_log_summary">_log_summary</h3>
          <CodeBlock
            code={`def _log_summary(
    self,
    output_path: str,
    total: int,
    success_count: int,
    lemit_stats: Dict[str, Any],
) -> None`}
          />
          <p>
            <strong>Descrição:</strong> Loga resumo da exportação.
          </p>

          <h4>Log Gerado</h4>
          <CodeBlock
            code={`✅ Arquivo Excel gerado: output/reports/importacao_relatorio_20260128_143522.xlsx
📊 Escritório e Advogado: 18/20 sucessos
📊 Reclamantes: 142/150 sucessos`}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2>Estrutura de Dados</h2>

        <h3>Estrutura de results (Input)</h3>
        <CodeBlock
          code={`results = [
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
]`}
        />

        <h3>Estrutura de lemit_stats (Input)</h3>
        <CodeBlock
          code={`lemit_stats = {
    "total": int,
    "sucesso": int,
    "falha": int,
}`}
        />
      </section>

      <section className="doc-section">
        <h2>Estrutura do Excel Gerado</h2>

        <h3>Aba 1: "Escritório e Advogado"</h3>
        <table className="params-table">
          <thead>
            <tr>
              <th>Coluna</th>
              <th>Tipo</th>
              <th>Exemplo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Escritório</td>
              <td>str</td>
              <td>"SILVA & ASSOCIADOS"</td>
            </tr>
            <tr>
              <td>Pessoa Física</td>
              <td>str</td>
              <td>"Não"</td>
            </tr>
            <tr>
              <td>CNPJ</td>
              <td>str</td>
              <td>"12.345.678/0001-90"</td>
            </tr>
            <tr>
              <td>CPF</td>
              <td>str</td>
              <td>""</td>
            </tr>
            <tr>
              <td>Advogado</td>
              <td>str</td>
              <td>"Dr. João Silva"</td>
            </tr>
            <tr>
              <td>OAB</td>
              <td>str</td>
              <td>"SP123456"</td>
            </tr>
            <tr>
              <td>É Sócio</td>
              <td>str</td>
              <td>"Sim"</td>
            </tr>
            <tr>
              <td>Sócios</td>
              <td>str</td>
              <td>"Dr. João Silva; Dra. Maria Santos"</td>
            </tr>
            <tr>
              <td>Operação</td>
              <td>str</td>
              <td>"Criado"</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>str</td>
              <td>"Sucesso"</td>
            </tr>
            <tr>
              <td>Possui Deal B2B</td>
              <td>str</td>
              <td>"Sim"</td>
            </tr>
            <tr>
              <td>Motivo do Skip</td>
              <td>str</td>
              <td>""</td>
            </tr>
          </tbody>
        </table>

        <h3>Aba 2: "Reclamantes"</h3>
        <table className="params-table">
          <thead>
            <tr>
              <th>Coluna</th>
              <th>Tipo</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Métrica</td>
              <td>str</td>
              <td>Nome da métrica</td>
            </tr>
            <tr>
              <td>Valor</td>
              <td>str/int</td>
              <td>Valor da métrica</td>
            </tr>
          </tbody>
        </table>

        <h3>Aba 3: "Log de Normalização"</h3>
        <table className="params-table">
          <thead>
            <tr>
              <th>Coluna</th>
              <th>Tipo</th>
              <th>Exemplo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nome Original</td>
              <td>str</td>
              <td>"Silva e Associados Advogados Ltda."</td>
            </tr>
            <tr>
              <td>Nome Normalizado</td>
              <td>str</td>
              <td>"SILVA & ASSOCIADOS"</td>
            </tr>
            <tr>
              <td>Score Similaridade</td>
              <td>str</td>
              <td>"95.50%"</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>str</td>
              <td>"Fuzzy Match (Levenshtein)"</td>
            </tr>
            <tr>
              <td>Advogado</td>
              <td>str</td>
              <td>"Dr. João Silva"</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="doc-section">
        <h2>Exemplos de Uso</h2>

        <h3>Básico (Apenas Ploomes)</h3>
        <CodeBlock
          code={`from src.ploomes_integration.clients.processors import ResultExporter

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
)`}
        />

        <h3>Com LEMIT Stats</h3>
        <CodeBlock
          code={`lemit_stats = {
    "total": 150,
    "sucesso": 142,
    "falha": 8,
}

output = exporter.export_results_to_excel(
    results=results,
    workflow_type="combined",
    lemit_stats=lemit_stats,
)`}
        />

        <h3>Com Normalização</h3>
        <CodeBlock
          code={`from src.ploomes_integration.clients.processors import (
    ResultExporter,
    EscritorioNormalizer,
)

normalizer = EscritorioNormalizer()
normalizer.load_normalization_map("config/escritorios.json")

exporter = ResultExporter(logger=logger, normalizer=normalizer)

output = exporter.export_results_to_excel(
    results=results,
    output_path="output/reports/custom_report.xlsx",
)`}
        />

        <h3>Tratamento de Erros</h3>
        <CodeBlock
          code={`from ...exceptions import ValidationError, FileProcessingError

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
    logger.error("❌ Sem permissão para escrever arquivo")`}
        />
      </section>

      <section className="doc-section">
        <h2>Integração com Outros Componentes</h2>

        <h3>Com ExcelProcessor</h3>
        <CodeBlock
          code={`# No ExcelProcessor
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
        )`}
        />

        <h3>Com EscritorioNormalizer</h3>
        <CodeBlock
          code={`normalizer = EscritorioNormalizer()
normalizer.load_normalization_map("config/escritorios.json")

exporter = ResultExporter(logger=logger, normalizer=normalizer)
# Normalização aplicada automaticamente + log na 3ª aba`}
        />

        <h3>Com TabularIO</h3>
        <CodeBlock
          code={`# TabularIO usado internamente para:
# - Adicionar timestamp aos nomes de arquivo
# - Criar diretórios automaticamente
# - Garantir extensões corretas`}
        />
      </section>

      <section className="doc-section">
        <h2>Melhores Práticas</h2>

        <h3>1. Sempre Passe lemit_stats em Workflows Combinados</h3>
        <CodeBlock
          code={`# ✅ BOM
output = exporter.export_results_to_excel(
    results=results,
    lemit_stats=lemit_stats,
    workflow_type="combined",
)

# ❌ EVITE
output = exporter.export_results_to_excel(
    results=results,
    workflow_type="combined",
)`}
        />

        <h3>2. Use Normalizer para Consistência</h3>
        <CodeBlock
          code={`# ✅ BOM
normalizer = EscritorioNormalizer()
exporter = ResultExporter(logger=logger, normalizer=normalizer)

# ❌ EVITE (nomes inconsistentes)
exporter = ResultExporter(logger=logger)`}
        />

        <h3>3. Especifique workflow_type Corretamente</h3>
        <CodeBlock
          code={`workflow_types = [
    "lemit-cpf",
    "lemit-nome",
    "ploomes-only",
    "advogados",
    "escritorio-only",
    "cpf",
    "nome",
    "combined",
    "advogado_escritorio",  # legacy
]`}
        />
      </section>
    </div>
  );
}

export default ResultExporterPage;

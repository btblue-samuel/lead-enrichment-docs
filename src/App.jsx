import { useState, useEffect, useMemo, useRef } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  CNAClientPage,
  CNPJScraperPage,
  CNPJStrategiesPage,
  ContactMapperPage,
  ContactServicePage,
  DealServicePage,
  EscritorioNormalizerPage,
  ExceptionsPage,
  LemitClientPage,
  LemitProcessorPage,
  PloomesAPIPage,
  PloomesClientPage,
  ResultExporterPage,
  RowBuilderPage,
  TabularIOPage,
  WorkflowsPage,
} from "./pages";
import "./App.css";

const docCategories = [
  {
    title: "API Clients",
    pages: [
      {
        path: "cna-client",
        name: "CNAClient",
        component: CNAClientPage,
        functions: ["__init__", "consultar_advogado", "consultar_sociedade", "obter_estatisticas", "reset_estatisticas"],
      },
      {
        path: "ploomes-api",
        name: "PloomesAPI",
        component: PloomesAPIPage,
        functions: [
          "__init__",
          "_handle_request",
          "get_metrics_summary",
          "get_contact_by_name_and_type",
          "check_contact_field_filled",
          "create_contact",
          "patch_contact",
          "apply_tag",
          "contact_has_tag",
          "get_deal_by_cnj",
          "create_deal",
          "patch_deal",
          "get_deals_by_contact_id",
          "get_office_by_name",
        ],
      },
      {
        path: "ploomes-client",
        name: "PloomesClient",
        component: PloomesClientPage,
        functions: [
          "__init__",
          "map_escritorio_to_ploomes",
          "map_advogado_to_ploomes",
          "create_complete_contact_set",
          "import_to_ploomes",
          "create_deal",
          "get_deal_by_cnj",
        ],
      },
      {
        path: "lemit-client",
        name: "LemitClient",
        component: LemitClientPage,
        functions: [
          "consultar_pessoa_por_cpf",
          "get_advogados_socios",
          "consultar_pessoa_por_nome",
          "enriquecer_contato_com_cpf",
          "enriquecer_contato_com_nome",
          "consultar",
          "setup_driver",
          "login",
          "navigate_to_cpf_query_page",
          "upload_cpf_file",
          "wait_for_processing_and_download",
          "close",
        ],
      },
    ],
  },
  {
    title: "Services",
    pages: [
      {
        path: "contact-service",
        name: "ContactService",
        component: ContactServicePage,
        functions: [
          "__init__",
          "get_stats",
          "upsert_contact",
          "apply_tag",
          "apply_tag_if_missing",
          "map_escritorio",
          "map_advogado",
          "map_reclamante",
          "_check_b2b_deal",
        ],
      },
      {
        path: "deal-service",
        name: "DealService",
        component: DealServicePage,
        functions: [
          "__init__",
          "create_deal",
          "update_deal",
          "get_deal_by_cnj",
        ],
      },
    ],
  },
  {
    title: "Mappers",
    pages: [
      {
        path: "contact-mapper",
        name: "Contact Mappers",
        component: ContactMapperPage,
        functions: [
          "__init__",
          "create_base_contact",
          "add_other_property",
          "process_conditional_fields",
          "process_phone_fields",
          "process_email_fields",
          "map_to_ploomes_escritorio",
          "map_to_ploomes_advogado",
          "map_to_ploomes_reclamante",
          "map_to_ploomes_deal",
          "_create_phones_list",
          "factory_get_escritorio_mapper",
          "factory_get_advogado_mapper",
          "factory_get_reclamante_mapper",
          "factory_get_deal_mapper",
        ],
      },
    ],
  },
  {
    title: "Data Processing",
    pages: [
      {
        path: "cnpj-scraper",
        name: "CNPJScraper",
        component: CNPJScraperPage,
        functions: [
          "__init__",
          "consultar_cnpj",
          "consultar_cnpj_com_nome",
          "_try_provider",
          "limpar_cache",
          "obter_estatisticas_cache",
          "cleanup",
        ],
      },
      {
        path: "cnpj-strategies",
        name: "CNPJ Strategies",
        component: CNPJStrategiesPage,
        functions: [
          "CNPJStrategy",
          "EmpresaDoisStrategy",
          "EmpresaBizzStrategy",
        ],
      },
      {
        path: "lemit-processor",
        name: "LemitProcessor",
        component: LemitProcessorPage,
        functions: [
          "__init__",
          "clean_lemit_result",
          "_normalizar_entrada_csv",
          "_extrair_dados_linha",
          "_escrever_csv",
        ],
      },
      {
        path: "escritorio-normalizer",
        name: "EscritorioNormalizer",
        component: EscritorioNormalizerPage,
        functions: [
          "__init__",
          "normalize",
          "normalize_for_output",
          "is_enabled",
          "_load_mapping",
          "_find_best_match",
        ],
      },
    ],
  },
  {
    title: "I/O & Export",
    pages: [
      {
        path: "tabular-io",
        name: "TabularIO",
        component: TabularIOPage,
        functions: [
          "read_excel",
          "read_csv",
          "read_file",
          "write_excel",
          "write_csv",
          "validate_columns",
          "validate_file_security",
        ],
      },
      {
        path: "result-exporter",
        name: "ResultExporter",
        component: ResultExporterPage,
        functions: [
          "__init__",
          "export_results_to_excel",
          "_validate_results",
          "_prepare_output_path",
          "_process_results",
          "_process_single_result",
          "_normalize_name",
          "_collect_skip_reasons",
          "_create_error_row",
          "_count_operations",
          "_build_reclamantes_data",
          "_write_excel",
          "_log_summary",
        ],
      },
      {
        path: "row-builder",
        name: "RowBuilder",
        component: RowBuilderPage,
        functions: [
          "__init__",
          "get_output_headers",
          "build_linha",
          "_normalize_escritorio",
          "_format_cpf_safe",
          "_ls",
        ],
      },
    ],
  },
  {
    title: "Core",
    pages: [
      {
        path: "workflows",
        name: "Workflows",
        component: WorkflowsPage,
        functions: [
          "__init__",
          "get_stats",
          "detect_workflow",
          "validate_required_columns",
          "executar_fluxo_lemit_cpf",
          "executar_fluxo_lemit_nome",
          "executar_fluxo_ploomes_only",
          "executar_fluxo_advogados",
          "executar_fluxo_escritorio_only",
          "executar_pipeline_completo",
        ],
      },
      {
        path: "exceptions",
        name: "Exceptions",
        component: ExceptionsPage,
        functions: [
          "PloomesClientError",
          "InvalidUserKeyError",
          "PloomesAPIError",
          "FileProcessingError",
          "MissingColumnError",
          "ValidationError",
          "ConfigurationError",
          "NetworkError",
        ],
      },
    ],
  },
];

// Flatten all pages for routes
const allPages = docCategories.flatMap((cat) => cat.pages);

// Build search index
const searchIndex = allPages.flatMap((page) => {
  const items = [{ page: page.name, path: page.path, function: null }];
  if (page.functions) {
    page.functions.forEach((fn) => {
      items.push({ page: page.name, path: page.path, function: fn });
    });
  }
  return items;
});

function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return searchIndex
      .filter(
        (item) =>
          item.page.toLowerCase().includes(lowerQuery) ||
          (item.function && item.function.toLowerCase().includes(lowerQuery))
      )
      .slice(0, 8);
  }, [query]);

  const handleSelect = (item) => {
    const path = item.function
      ? `/docs/${item.path}#${item.function}`
      : `/docs/${item.path}`;
    navigate(path);
    setQuery("");
    setIsFocused(false);
    
    if (item.function) {
      setTimeout(() => {
        const element = document.getElementById(item.function);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <div className="sidebar-search">
      <div className="search-input-wrapper">
        <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search docs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        />
      </div>
      {isFocused && query && (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((item, i) => (
              <div
                key={`${item.path}-${item.function || 'page'}-${i}`}
                className="search-result-item"
                onMouseDown={() => handleSelect(item)}
              >
                <span className="result-page">{item.page}</span>
                {item.function && (
                  <span className="result-function">→ {item.function}</span>
                )}
              </div>
            ))
          ) : (
            <div className="search-no-results">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}

function NavItem({ page }) {
  const location = useLocation();
  const isActive = location.pathname === `/docs/${page.path}`;
  const [isOpen, setIsOpen] = useState(isActive);

  // Auto-open when page becomes active
  useEffect(() => {
    if (isActive) {
      setIsOpen(true);
    }
  }, [isActive]);

  const handleFunctionClick = (fn) => {
    // Scroll to element after navigation
    setTimeout(() => {
      const element = document.getElementById(fn);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <li className={`nav-item ${isActive ? "active" : ""}`}>
      <NavLink
        to={`/docs/${page.path}`}
        className={`nav-item-link ${isActive ? "active" : ""}`}
        onClick={(e) => {
          if (isActive && page.functions && page.functions.length > 0) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className="nav-item-name">{page.name}</span>
        {page.functions && page.functions.length > 0 && (
          <button
            className={`nav-toggle ${isOpen ? "open" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            aria-label="Toggle functions"
          >
            <svg width="14" height="14" viewBox="0 0 10 10">
              <path
                d="M2.5 4L5 6.5L7.5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </NavLink>
      {page.functions && page.functions.length > 0 && (
        <ul className={`nav-functions ${isOpen ? "open" : ""}`}>
          {page.functions.map((fn) => (
            <li key={fn}>
              <NavLink
                to={`/docs/${page.path}#${fn}`}
                className="nav-function-link"
                onClick={() => handleFunctionClick(fn)}
              >
                {fn}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function AppContent() {
  const location = useLocation();
  const mainRef = useRef(null);

  useEffect(() => {
    if (!location.hash && mainRef.current) {
      setTimeout(() => {
        if (mainRef.current) {
          mainRef.current.scrollTop = 0;
        }
      }, 0);
    }
  }, [location.pathname]);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <NavLink to="/" className="sidebar-header-link">
            <span className="sidebar-logo">◆</span>
            <span className="sidebar-title">Documentation</span>
          </NavLink>
          </div>
          <SearchBar />
          <nav className="sidebar-nav">
            {docCategories.map((category) => (
              <div key={category.title} className="nav-category">
                <div className="nav-category-title">{category.title}</div>
                <ul>
                  {category.pages.map((page) => (
                    <NavItem key={page.path} page={page} />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <span>v1.0.0</span>
          </div>
        </aside>
        <main className="main-content" ref={mainRef}>
          <Routes>
            {allPages.map((page) => (
              <Route
                key={page.path}
                path={`/docs/${page.path}`}
                element={<page.component />}
              />
            ))}
            <Route
              path="/"
              element={
                <div className="doc-page">
                  <h1>Documentação - Algoritmo de Enriquecimento de Leads</h1>
                  <p className="doc-subtitle">
                    Selecione um módulo para começar.
                  </p>
                  <section className="doc-section">
                    <h2>Navegação Rápida</h2>
                    <div className="home-grid">
                      {docCategories.map((category) => (
                        <div key={category.title} className="home-card">
                          <h3>{category.title}</h3>
                          <ul>
                            {category.pages.map((page) => (
                              <li key={page.path}>
                                <NavLink to={`/docs/${page.path}`}>
                                  {page.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

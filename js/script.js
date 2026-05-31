// Translations Dictionary
const translations = {
    en: {
        nav: {
            about: "About",
            experience: "Experience",
            data: "AI / Data",
            projects: "Projects",
            contact: "Contact"
        },
        hero: {
            badge: "Welcome to my portfolio",
            subtitle: "Data Enthusiast • Team Leader • Problem Solver",
            roles: ["Data Enthusiast", "Team Leader", "Problem Solver"],
            description: "Supervisor of Technical Service at <strong>Johnson & Johnson Vision</strong> (Iberia team). Leading with excellence in technical support for advanced ophthalmology systems.",
            cta_linkedin: "Connect on LinkedIn",
            cta_resume: "Download Resume"
        },
        about: {
            title: "About Me",
            p1: "I am a seasoned service coordination professional with a deep passion for improving efficiency and optimizing technical operations. My career has been defined by a commitment to teamwork, leadership, and the relentless pursuit of operational excellence.",
            p2: "Currently, I serve as a Supervisor of Technical Service for the Iberia team at Johnson & Johnson Vision. Beyond my core role, I leverage advanced data analytics to drive decision-making and enhance team performance.",
            skill1: "Team Leadership",
            skill2: "Technical Service",
            skill3: "Ophthalmology Systems",
            skill4: "Process Optimization",
            skill5: "Data Science"
        },
        experience: {
            title: "Experience",
            job1: {
                date: "2024 - Present",
                role: "Supervisor of Technical Service",
                desc: "Leading the Iberia team, ensuring high-quality technical support and operational milestones."
            },
            job2: {
                date: "2021 - 2024",
                role: "Technical Service Coordinator",
                desc: "Coordinated technical operations and managed service delivery workflows."
            },
            job3: {
                date: "2017 - 2021",
                role: "Service Engineer",
                desc: "Hands-on technical support and maintenance of advanced medical equipment."
            },
            job4: {
                role: "Previous Engineering Roles",
                desc: "Various technical and engineering positions building a strong foundation in systems and service."
            }
        },
        data: {
            title: "AI & Data Analytics",
            subtitle: "Transforming raw data into actionable insights through AI, automation and dashboarding.",
            dash1: "Cost Per System Analysis",
            dash2: "ASP Maintenance Contract",
            dash3: "Revenue & Installation Base",
            dash4: "Install Base — Single Source of Truth"
        },
        projects: {
            dash4: {
                title: "Install Base — Single Source of Truth",
                desc: `
                    <h4>EMEA Medical Equipment Intelligence Platform</h4>
                    <p>Enterprise data engineering pipeline that builds a unified "golden record" for the entire EMEA installed base of J&J Vision medical equipment. Consolidates three independent enterprise systems — SAP (ZRSM007), Salesforce/MDSR, and SAP ERP legacy — into a single, audit-ready source of truth covering 50+ countries.</p>

                    <h4>The Problem</h4>
                    <p>Equipment ownership data lived fragmented across SAP and Salesforce with timing gaps during asset transfers, causing mismatched contracts, incorrect billing, and unreliable service planning. Prior solution: manual Excel macros.</p>

                    <h4>Technical Architecture</h4>
                    <ul>
                        <li><strong>Amazon Redshift:</strong> Primary query layer for Salesforce/MDSR operational data and ZRSM007 hardware master.</li>
                        <li><strong>Spark SQL / Databricks:</strong> Legacy SAP ERP contract and pricing data via cross-cloud federation.</li>
                        <li><strong>Alteryx ETL:</strong> Golden record matching logic, account reconciliation, and manual exception handling (3 documented split-billing edge cases).</li>
                        <li><strong>Tableau:</strong> Contract expiration tracking, geographic heatmaps, capture rate KPIs by platform and region.</li>
                        <li><strong>Python:</strong> Automated Excel validation workbooks distributed to 7 regional supervisor teams.</li>
                    </ul>

                    <h4>Key Engineering Challenges Solved</h4>
                    <ul>
                        <li><strong>Row deduplication:</strong> Fixed production bug where multi-technician assignments caused Cartesian products — resolved with <code>ROW_NUMBER() OVER(PARTITION BY asset, skill_level)</code>.</li>
                        <li><strong>Heterogeneous date parsing:</strong> 4 different date formats across source systems handled with regex-driven conditional <code>TO_DATE()</code> logic.</li>
                        <li><strong>Active contract selection:</strong> 5-level CTE chain with priority fallback — active → most recent → T&M — ensuring exactly one contract per asset.</li>
                        <li><strong>Account ownership conflicts:</strong> Hierarchical match when SAP and MDSR disagree (post-transfer timing gaps).</li>
                    </ul>

                    <h4>Results & Impact</h4>
                    <ul>
                        <li>100% automated monthly reporting — replaces manual Excel workflows entirely.</li>
                        <li>Scales across 1,000+ assets and 50+ EMEA countries.</li>
                        <li>Formal audit protocol with discrepancy investigation runbooks.</li>
                        <li>Enables accurate contract renewal forecasting and FSE resource planning.</li>
                    </ul>
                `
            },
            dash1: {
                title: "Cost Optimization via Data",
                desc: `
                    <h4>Service Cost Optimization Through Data</h4>
                    <p>This Business Intelligence (BI) project transforms complex operational data into clear, actionable visualizations for technical service management. The goal is to enable leadership to identify inefficiencies, optimize resource allocation, and make strategic financial decisions based on evidence.</p>
                    
                    <h4>Key Results</h4>
                    <ul>
                        <li><strong>Complete Visibility:</strong> Real-time monitoring of cost per system, service type, and year.</li>
                        <li><strong>Proactive Decisions:</strong> Essential tool for identifying trends and taking rapid corrective actions.</li>
                        <li><strong>Operational Efficiency:</strong> Optimization of budget control and continuous process improvement.</li>
                    </ul>

                    <h4>Technologies Used</h4>
                    <ul>
                        <li><strong>SQL:</strong> Efficient management and querying of the underlying database storing cost and system info.</li>
                        <li><strong>Python:</strong> Extraction, transformation, and loading (ETL) of data, ensuring integration and readiness for analysis.</li>
                        <li><strong>Tableau:</strong> Creation of an interactive and visually intuitive dashboard presenting Key Performance Indicators (KPIs).</li>
                    </ul>
                `
            },
            dash2: {
                title: "ASP Maintenance Contract",
                desc: `
                    <h4>Maintenance Contract Revenue Control & Analysis</h4>
                    <p>This project focuses on the proactive revenue management of service contracts. It uses performance data to ensure profitability, manage warranties (WARR), and optimize service models like "Pay Per Procedure" (PPF) or Rental.</p>

                    <h4>Technologies Used</h4>
                    <ul>
                        <li><strong>SQL:</strong> Used for structured querying and management of contract, cost, and revenue data stored in enterprise databases.</li>
                        <li><strong>Python:</strong> Automation of data processing, cleaning (ETL), and complex financial calculations, integrating diverse information sources.</li>
                        <li><strong>Tableau:</strong> The visualization tool is used to present Key Performance Indicators (KPIs) clearly and interactively for management.</li>
                    </ul>

                    <h4>Key Results</h4>
                    <ul>
                        <li><strong>Profitability Management:</strong> Tracks profit percentage vs. ASP (Average Selling Price) for each service type and equipment (Femtolaser, Aberrometer, etc.), identifying the most profitable areas.</li>
                        <li><strong>Business Model Optimization:</strong> Offers visibility into the financial performance of different models (FOC, PPF, RENTAL), enabling strategic adjustments to pricing and contract terms.</li>
                        <li><strong>Cost Control:</strong> Facilitates monitoring of total and average system costs, crucial for operational efficiency and budget control.</li>
                    </ul>
                `
            },
            dash3: {
                title: "Revenue & Reclassifications Analysis",
                desc: `
                    <h4>J&J MedTech Revenue and Reclassifications Analysis</h4>
                    <p>This project uses a revenue dashboard to visualize and analyze key financial data for the Johnson & Johnson MedTech division, focusing on total revenue, contracts, and reclassifications at a regional and product platform level.</p>

                    <h4>Technologies Used</h4>
                    <p>Typically leverage advanced business intelligence technologies, including:</p>
                    <ul>
                        <li><strong>AI & ML:</strong> For analyzing large data volumes and pattern identification.</li>
                        <li><strong>Modern Data Platforms:</strong> Use of solutions like data lakes to consolidate fragmented data.</li>
                        <li><strong>Data Visualization:</strong> Tools to present financial and operational information in clear and accessible formats.</li>
                    </ul>

                    <h4>Key Results</h4>
                    <ul>
                        <li><strong>Complete Financial Visibility:</strong> Real-time monitoring of revenue and costs by system, platform, and region.</li>
                        <li><strong>Contract Management:</strong> Detailed tracking of total contract value and associated reclassifications.</li>
                        <li><strong>Global Budget Control:</strong> Facilitates exhaustive tracking of operational expenses and financial discipline across all regions, ensuring resource optimization.</li>
                    </ul>
                `
            },
            title: "Personal Projects",
            subtitle: "Side projects exploring AI agents, automation and full-stack development.",
            cta: "View Details →",
            tag_ai: "AI Agent",
            tag_tool: "Business Tool",
            proj1: {
                title: "Claude Invoice Agent",
                short: "AI agent that processes PDF invoices with OCR, extracts structured data and auto-generates Excel reports.",
                desc: `
                    <h4>Intelligent Invoice Processing Agent</h4>
                    <p>An AI-powered agent built to automate the extraction and processing of PDF invoices for Sisemed (J&J field-service partner). Replaces a fully manual workflow — reading PDFs, copying data, building Excel files — with a fully automated pipeline.</p>

                    <h4>How It Works</h4>
                    <ul>
                        <li><strong>OCR Layer:</strong> Mistral's OCR API extracts raw text and structure from PDF invoices.</li>
                        <li><strong>Intelligence Layer:</strong> Claude API interprets ambiguous fields, handles formatting inconsistencies and validates extracted data.</li>
                        <li><strong>Output Layer:</strong> Pandas + openpyxl generate a structured Excel report with summary rows, totals and formatting.</li>
                    </ul>

                    <h4>Key Results</h4>
                    <ul>
                        <li>Processing time reduced from ~30 min/invoice to under 10 seconds.</li>
                        <li>Pydantic schemas enforce strict data validation before output generation.</li>
                        <li>Composable skill architecture — each stage is an independent, testable module.</li>
                    </ul>
                `
            },
            proj2: {
                title: "Business Plan Tool",
                short: "Desktop app for J&J MedTech: manages service contracts, calculates revenue, tracks risks and generates printable reports.",
                desc: `
                    <h4>MedTech Business Planning Desktop App</h4>
                    <p>A full-stack desktop application designed for J&J MedTech business planning. Loads contract data from CSV/Excel, models revenue streams (base contracts, churn, T&M), tracks risks and opportunities, and generates executive-ready reports.</p>

                    <h4>Features</h4>
                    <ul>
                        <li><strong>Revenue Engine:</strong> Models base, churn and Time & Material revenue scenarios dynamically.</li>
                        <li><strong>Risk Tracker:</strong> Log, score and monitor risks and opportunities with visual indicators.</li>
                        <li><strong>Report Generation:</strong> Printable HTML reports with Chart.js visualizations — exportable to PDF or email.</li>
                        <li><strong>Offline-first:</strong> Packaged as a Windows .exe via PyInstaller — no installation required for end users.</li>
                    </ul>

                    <h4>Technologies</h4>
                    <ul>
                        <li><strong>Backend:</strong> Python Flask + SQLite (session persistence, data modeling)</li>
                        <li><strong>Frontend:</strong> Vanilla JS + HTML/CSS, Chart.js, PapaParse</li>
                        <li><strong>Distribution:</strong> PyInstaller for standalone Windows executable</li>
                    </ul>
                `
            },
            proj3: {
                title: "Entrenador Maratón",
                short: "Full-stack AI training platform with Gemini coach, biometric dashboard, macrocycle planning and Strava integration.",
                desc: `
                    <h4>AI-Powered Marathon Training Platform</h4>
                    <p>A complete training management SaaS for the Valencia Marathon. Features an AI coach named Aurelio (powered by Gemini 2.5 with function calling), biometric data dashboard, macrocycle planner, and autonomous workout logging through Strava integration.</p>

                    <h4>Key Features</h4>
                    <ul>
                        <li><strong>AI Coach (Aurelio):</strong> Gemini-powered agent with real-time access to your training data — adjusts plans, answers questions, logs workouts autonomously.</li>
                        <li><strong>Biometric Dashboard:</strong> Tracks HRV, resting heart rate, sleep, fatigue and form (TSB) in real time.</li>
                        <li><strong>Strava Integration:</strong> Syncs workout history automatically; AI uses it as context for coaching.</li>
                        <li><strong>Macrocycle Planner:</strong> Structured periodization planning with compliance tracking per week/block.</li>
                    </ul>

                    <h4>Technologies</h4>
                    <ul>
                        <li><strong>Frontend:</strong> React 19 + Vite + TypeScript + Tailwind CSS</li>
                        <li><strong>Backend:</strong> Supabase (PostgreSQL + Row Level Security + Auth)</li>
                        <li><strong>AI:</strong> Google Gemini API with function calling for agentic behavior</li>
                        <li><strong>Integrations:</strong> Strava OAuth API</li>
                    </ul>
                `
            }
        },
        stats: {
            years: "Years in MedTech",
            projects: "Analytics Projects",
            languages: "Languages",
            team: "Team Members Led"
        },
        tools: {
            advanced: "Advanced",
            intermediate: "Intermediate",
            expert: "Expert"
        },
        contact: {
            title: "Get In Touch",
            text: "Open to discussing technical leadership, data optimization strategies, or just connecting with fellow professionals.",
            form: {
                name_ph: "Your Name",
                email_ph: "Your Email",
                msg_ph: "Your Message",
                submit: "Send Message"
            },
            success: "Message sent! I'll get back to you soon.",
            error: "Failed to send. Please try again later.",
            errors: {
                name_required: "Please enter your name.",
                email_required: "Please enter your email.",
                email_invalid: "Please enter a valid email address.",
                msg_required: "Please write a message."
            }
        },
        footer: {
            rights: "All rights reserved."
        }
    },
    es: {
        nav: {
            about: "Sobre Mí",
            experience: "Experiencia",
            data: "IA / Datos",
            projects: "Proyectos",
            contact: "Contacto"
        },
        hero: {
            badge: "Bienvenido a mi portafolio",
            subtitle: "Entusiasta de Datos • Líder de Equipo • Solucionador",
            roles: ["Entusiasta de Datos", "Líder de Equipo", "Solucionador"],
            description: "Supervisor de Servicio Técnico en <strong>Johnson & Johnson Vision</strong> (equipo Iberia). Liderando con excelencia el soporte técnico para sistemas oftalmológicos avanzados.",
            cta_linkedin: "Conectar en LinkedIn",
            cta_resume: "Descargar CV"
        },
        about: {
            title: "Sobre Mí",
            p1: "Soy un profesional experimentado en coordinación de servicios con una gran pasión por mejorar la eficiencia y optimizar las operaciones técnicas. Mi carrera se ha definido por el compromiso con el trabajo en equipo, el liderazgo y la búsqueda implacable de la excelencia operativa.",
            p2: "Actualmente, me desempeño como Supervisor de Servicio Técnico para el equipo Iberia en Johnson & Johnson Vision. Más allá de mi rol principal, aprovecho el análisis de datos avanzado para impulsar la toma de decisiones y mejorar el rendimiento del equipo.",
            skill1: "Liderazgo de Equipos",
            skill2: "Servicio Técnico",
            skill3: "Sistemas Oftalmológicos",
            skill4: "Optimización de Procesos",
            skill5: "Ciencia de Datos"
        },
        experience: {
            title: "Experiencia",
            job1: {
                date: "2024 - Presente",
                role: "Supervisor de Servicio Técnico",
                desc: "Liderando el equipo Iberia, asegurando soporte técnico de alta calidad e hitos operativos."
            },
            job2: {
                date: "2021 - 2024",
                role: "Coordinador de Servicio Técnico",
                desc: "Coordinación de operaciones técnicas y gestión de flujos de trabajo de entrega de servicios."
            },
            job3: {
                date: "2017 - 2021",
                role: "Ingeniero de Servicio",
                desc: "Soporte técnico práctico y mantenimiento de equipos médicos avanzados."
            },
            job4: {
                role: "Roles de Ingeniería Anteriores",
                desc: "Varias posiciones técnicas y de ingeniería construyendo una base sólida en sistemas y servicio."
            }
        },
        data: {
            title: "IA & Analítica de Datos",
            subtitle: "Transformando datos brutos en insights accionables a través de IA, automatización y dashboards.",
            dash1: "Análisis de Costo por Sistema",
            dash2: "ASP Maintenance Contract",
            dash3: "Ingresos y Base Instalada",
            dash4: "Base Instalada — Fuente Única de Verdad"
        },
        projects: {
            dash4: {
                title: "Base Instalada — Fuente Única de Verdad",
                desc: `
                    <h4>Plataforma de Inteligencia para Equipamiento Médico EMEA</h4>
                    <p>Pipeline de ingeniería de datos que construye un "golden record" unificado para toda la base instalada de equipamiento médico de J&J Vision en EMEA. Consolida tres sistemas empresariales independientes — SAP (ZRSM007), Salesforce/MDSR y SAP ERP legacy — en una única fuente de verdad auditada que abarca más de 50 países.</p>

                    <h4>El Problema</h4>
                    <p>Los datos de propiedad del equipamiento estaban fragmentados en SAP y Salesforce con desfases temporales durante las transferencias, causando contratos erróneos, facturación incorrecta y planificación de servicio poco fiable. La solución previa: macros manuales de Excel.</p>

                    <h4>Arquitectura Técnica</h4>
                    <ul>
                        <li><strong>Amazon Redshift:</strong> Capa de consulta principal para datos operativos Salesforce/MDSR y master hardware ZRSM007.</li>
                        <li><strong>Spark SQL / Databricks:</strong> Datos de contratos y precios SAP ERP legacy mediante federación multi-cloud.</li>
                        <li><strong>Alteryx ETL:</strong> Lógica de golden record, reconciliación de cuentas y gestión de excepciones (3 casos documentados de split-billing).</li>
                        <li><strong>Tableau:</strong> Seguimiento de vencimiento de contratos, mapas de calor geográficos, KPIs de capture rate por plataforma.</li>
                        <li><strong>Python:</strong> Workbooks Excel de validación automatizados distribuidos a 7 equipos de supervisores regionales.</li>
                    </ul>

                    <h4>Retos Técnicos Resueltos</h4>
                    <ul>
                        <li><strong>Deduplicación de filas:</strong> Bug de producción solucionado con <code>ROW_NUMBER() OVER(PARTITION BY asset, skill_level)</code> para asignaciones multi-técnico.</li>
                        <li><strong>Parsing heterogéneo de fechas:</strong> 4 formatos diferentes gestionados con lógica <code>TO_DATE()</code> condicional basada en regex.</li>
                        <li><strong>Selección de contrato activo:</strong> Cadena de 5 CTEs con fallback jerárquico — activo → más reciente → T&M.</li>
                        <li><strong>Conflictos de propiedad:</strong> Lógica de match jerárquica cuando SAP y MDSR difieren (desfase post-transferencia).</li>
                    </ul>

                    <h4>Resultados</h4>
                    <ul>
                        <li>Reporting mensual 100% automatizado — reemplaza flujos manuales de Excel por completo.</li>
                        <li>Escala a 1.000+ activos y 50+ países EMEA.</li>
                        <li>Protocolo formal de auditoría con runbooks de investigación de discrepancias.</li>
                        <li>Permite previsión precisa de renovación de contratos y planificación de recursos FSE.</li>
                    </ul>
                `
            },
            dash1: {
                title: "Optimización de Costos de Servicio",
                desc: `
                    <h4>Optimización de Costos de Servicio a Través de Datos</h4>
                    <p>Este proyecto de Business Intelligence (BI) transforma datos operativos complejos en visualizaciones claras y accionables para la gestión de servicios técnicos. El objetivo es permitir a la dirección identificar ineficiencias, optimizar la asignación de recursos y tomar decisiones financieras estratégicas basadas en evidencia.</p>
                    
                    <h4>Resultados Clave</h4>
                    <ul>
                        <li><strong>Visibilidad Completa:</strong> Monitorización en tiempo real del costo por sistema, tipo de servicio y año.</li>
                        <li><strong>Decisiones Proactivas:</strong> Herramienta esencial para identificar tendencias y tomar medidas correctivas rápidas.</li>
                        <li><strong>Eficiencia Operativa:</strong> Optimización del control presupuestario y mejora continua de los procesos.</li>
                    </ul>

                    <h4>Tecnologías Utilizadas</h4>
                    <ul>
                        <li><strong>SQL:</strong> Gestión y consulta eficiente de la base de datos subyacente que almacena la información de costos y sistemas.</li>
                        <li><strong>Python:</strong> Extracción, transformación y carga (ETL) de datos, asegurando la integración y preparación de los mismos para el análisis.</li>
                        <li><strong>Tableau:</strong> Creación de un dashboard interactivo y visualmente intuitivo que presenta los Indicadores Clave de Rendimiento (KPIs) de manera comprensible.</li>
                    </ul>
                `
            },
            dash2: {
                title: "ASP Maintenance Contract",
                desc: `
                    <h4>Control y Análisis de Ingresos de Contratos de Mantenimiento</h4>
                    <p>Este proyecto se centra en la gestión proactiva de los ingresos (revenue management) derivados de los contratos de servicio. Utiliza datos de rendimiento para asegurar la rentabilidad, gestionar las garantías (WARR) y optimizar los modelos de servicio como "Pay Per Procedure" (PPF) o alquiler (Rental).</p>

                    <h4>Tecnologías Utilizadas</h4>
                    <ul>
                        <li><strong>SQL:</strong> Se usó para la consulta y gestión estructurada de los datos de contratos, costos y revenue, almacenados en bases de datos empresariales.</li>
                        <li><strong>Python:</strong> Automatización del procesamiento de datos, limpieza (ETL) y cálculos financieros complejos, integrando diversas fuentes de información.</li>
                        <li><strong>Tableau:</strong> La herramienta de visualización (como se muestra en el dashboard) se utiliza para presentar los Indicadores Clave de Rendimiento (KPIs) de manera clara e interactiva para la dirección.</li>
                    </ul>

                    <h4>Resultados Clave</h4>
                    <ul>
                        <li><strong>Gestión de Rentabilidad:</strong> Permite el seguimiento del porcentaje de beneficio frente al ASP (Average Selling Price) por cada tipo de servicio y equipo (Femtolaser, Aberrometer, etc.), identificando las áreas más rentables.</li>
                        <li><strong>Optimización de Modelos de Negocio:</strong> Ofrece visibilidad sobre el rendimiento financiero de diferentes modelos (FOC, PPF, RENTAL), permitiendo el ajuste estratégico de precios y términos contractuales.</li>
                        <li><strong>Control de Costos:</strong> Facilita la monitorización del costo total y promedio del sistema, lo cual es crucial para la eficiencia operativa y el control presupuestario.</li>
                    </ul>
                `
            },
            dash3: {
                title: "Análisis de Ingresos",
                desc: `
                    <h4>Análisis de Ingresos y Reclasificaciones de J&J MedTech</h4>
                    <p>Este proyecto utiliza un dashboard de ingresos para visualizar y analizar datos financieros clave de la división de Tecnología Médica de Johnson & Johnson, centrándose en los ingresos totales, contratos y reclasificaciones a nivel regional y de plataforma de productos.</p>

                    <h4>Tecnologías Utilizadas</h4>
                    <p>Si bien no se encontraron detalles específicos de las tecnologías utilizadas en este panel en particular, los proyectos de datos y análisis de Johnson & Johnson suelen aprovechar tecnologías avanzadas para la inteligencia empresarial, incluyendo:</p>
                    <ul>
                        <li><strong>Inteligencia Artificial (IA) y Machine Learning (ML):</strong> Para el análisis de grandes volúmenes de datos y la identificación de patrones.</li>
                        <li><strong>Plataformas de Datos Modernas:</strong> Uso de soluciones como data lakes para consolidar datos fragmentados.</li>
                        <li><strong>Visualización de Datos:</strong> Herramientas para presentar información financiera y operativa en formatos claros y accesibles.</li>
                    </ul>

                    <h4>Resultados Clave</h4>
                    <ul>
                        <li><strong>Visibilidad Financiera Completa:</strong> Monitorización en tiempo real de ingresos y costos por sistema, plataforma y región.</li>
                        <li><strong>Gestión de Contratos:</strong> Seguimiento detallado del valor total de los contratos y las reclasificaciones asociadas.</li>
                        <li><strong>Control Presupuestario Global:</strong> Facilita un seguimiento exhaustivo de los gastos operativos y la disciplina financiera en todas las regiones, asegurando la optimización de recursos.</li>
                    </ul>
                `
            },
            title: "Proyectos Personales",
            subtitle: "Proyectos paralelos explorando agentes IA, automatización y desarrollo full-stack.",
            cta: "Ver Detalles →",
            tag_ai: "Agente IA",
            tag_tool: "Herramienta",
            proj1: {
                title: "Agente de Facturas Claude",
                short: "Agente IA que procesa facturas PDF con OCR, extrae datos estructurados y genera reportes Excel automáticamente.",
                desc: `
                    <h4>Agente Inteligente de Procesamiento de Facturas</h4>
                    <p>Agente impulsado por IA para automatizar la extracción y procesamiento de facturas PDF para Sisemed (partner de servicio de campo de J&J). Sustituye un flujo de trabajo completamente manual por una pipeline automatizada.</p>

                    <h4>Cómo Funciona</h4>
                    <ul>
                        <li><strong>Capa OCR:</strong> La API OCR de Mistral extrae texto y estructura de facturas PDF.</li>
                        <li><strong>Capa de Inteligencia:</strong> Claude API interpreta campos ambiguos y valida los datos extraídos.</li>
                        <li><strong>Capa de Salida:</strong> Pandas + openpyxl generan un Excel estructurado con filas de resumen y totales.</li>
                    </ul>

                    <h4>Resultados Clave</h4>
                    <ul>
                        <li>Tiempo de procesamiento reducido de ~30 min/factura a menos de 10 segundos.</li>
                        <li>Esquemas Pydantic garantizan validación estricta antes de generar el output.</li>
                        <li>Arquitectura modular — cada etapa es un módulo independiente y testeable.</li>
                    </ul>
                `
            },
            proj2: {
                title: "Business Plan Tool",
                short: "App desktop para J&J MedTech: gestiona contratos de servicio, calcula revenue, rastrea riesgos y genera reportes.",
                desc: `
                    <h4>Aplicación Desktop de Planificación para MedTech</h4>
                    <p>Aplicación full-stack de escritorio para la planificación de negocio de J&J MedTech. Carga datos de contratos desde CSV/Excel, modela ingresos (base, churn, T&M), rastrea riesgos y genera reportes ejecutivos.</p>

                    <h4>Funcionalidades</h4>
                    <ul>
                        <li><strong>Motor de Revenue:</strong> Modela escenarios de ingresos base, churn y Tiempo & Material dinámicamente.</li>
                        <li><strong>Gestor de Riesgos:</strong> Registro, puntuación y monitorización de riesgos y oportunidades.</li>
                        <li><strong>Generación de Reportes:</strong> Reportes HTML imprimibles con visualizaciones Chart.js.</li>
                        <li><strong>Offline-first:</strong> Distribuido como .exe de Windows con PyInstaller.</li>
                    </ul>

                    <h4>Tecnologías</h4>
                    <ul>
                        <li><strong>Backend:</strong> Python Flask + SQLite</li>
                        <li><strong>Frontend:</strong> JS vanilla + HTML/CSS, Chart.js, PapaParse</li>
                        <li><strong>Distribución:</strong> PyInstaller para ejecutable Windows</li>
                    </ul>
                `
            },
            proj3: {
                title: "Entrenador Maratón",
                short: "Plataforma full-stack con coach IA (Gemini), dashboard biométrico, planificación de macrociclos e integración con Strava.",
                desc: `
                    <h4>Plataforma de Entrenamiento con IA para Maratón</h4>
                    <p>SaaS completo para gestión del entrenamiento del Maratón de Valencia. Incluye un coach IA llamado Aurelio (Gemini 2.5 con function calling), dashboard biométrico, planificador de macrociclos y registro autónomo de entrenamientos vía Strava.</p>

                    <h4>Características Principales</h4>
                    <ul>
                        <li><strong>Coach IA (Aurelio):</strong> Agente Gemini con acceso en tiempo real a tus datos de entrenamiento — ajusta planes y registra entrenamientos autónomamente.</li>
                        <li><strong>Dashboard Biométrico:</strong> Seguimiento de HRV, frecuencia cardíaca, sueño, fatiga y forma (TSB) en tiempo real.</li>
                        <li><strong>Integración Strava:</strong> Sincroniza historial de entrenamientos automáticamente.</li>
                        <li><strong>Planificador de Macrociclos:</strong> Periodización estructurada con seguimiento de cumplimiento por semana/bloque.</li>
                    </ul>

                    <h4>Tecnologías</h4>
                    <ul>
                        <li><strong>Frontend:</strong> React 19 + Vite + TypeScript + Tailwind CSS</li>
                        <li><strong>Backend:</strong> Supabase (PostgreSQL + Row Level Security + Auth)</li>
                        <li><strong>IA:</strong> Google Gemini API con function calling</li>
                        <li><strong>Integraciones:</strong> Strava OAuth API</li>
                    </ul>
                `
            }
        },
        stats: {
            years: "Años en MedTech",
            projects: "Proyectos Analíticos",
            languages: "Idiomas",
            team: "Miembros de Equipo"
        },
        tools: {
            advanced: "Avanzado",
            intermediate: "Intermedio",
            expert: "Experto"
        },
        contact: {
            title: "Contacto",
            text: "Abierto a discutir liderazgo técnico, estrategias de optimización de datos o simplemente conectar con otros profesionales.",
            form: {
                name_ph: "Tu Nombre",
                email_ph: "Tu Email",
                msg_ph: "Tu Mensaje",
                submit: "Enviar Mensaje"
            },
            success: "¡Mensaje enviado! Me pondré en contacto pronto.",
            error: "Error al enviar. Por favor, inténtalo de nuevo.",
            errors: {
                name_required: "Por favor, introduce tu nombre.",
                email_required: "Por favor, introduce tu email.",
                email_invalid: "Por favor, introduce un email válido.",
                msg_required: "Por favor, escribe un mensaje."
            }
        },
        footer: {
            rights: "Todos los derechos reservados."
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // -------------------
    // Modern Effects Logic
    // -------------------

    // 1. Initial Loader
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
        // Fallback in case load event fired before script
        setTimeout(() => {
            if (loader.style.opacity !== '0') {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }
        }, 1000);
    }

    // 2. Scroll Reveal (Fade-in)
    const revealSections = document.querySelectorAll('.reveal-section');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15 });

    revealSections.forEach(section => {
        revealObserver.observe(section);
    });

    // 3. Button Ripple Effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            let ripples = document.createElement('span');
            ripples.className = 'ripple';
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';

            this.appendChild(ripples);
            setTimeout(() => {
                ripples.remove();
            }, 600);
        });
    });

    // 4. Subtle Parallax (Mouse Move)
    const shapes = document.querySelectorAll('.parallax-shape');
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 90;
        const y = (window.innerHeight - e.pageY * 2) / 90;

        shapes.forEach(shape => {
            const speed = shape.getAttribute('data-speed') || 0.2;
            shape.style.transform = `translateX(${x * speed * 100}px) translateY(${y * speed * 100}px)`;
        });
    });

    // -------------------
    // Mobile Nav Logic
    // -------------------
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // -------------------
    // Language Logic
    // -------------------
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('site-lang') || 'en';

    // Initialize Language
    updateLanguage(currentLang);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            // Toggle 'en' <-> 'es'
            currentLang = currentLang === 'en' ? 'es' : 'en';
            updateLanguage(currentLang);
            localStorage.setItem('site-lang', currentLang);
        });
    }

    function updateLanguage(lang) {
        // Update regular text content
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = getNestedTranslation(translations[lang], key);
            if (translation) {
                // Determine if we should use innerHTML (for keys with <strong> tags mostly)
                if (key === 'hero.description') {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        // Update placeholders
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const translation = getNestedTranslation(translations[lang], key);
            if (translation) {
                el.placeholder = translation;
            }
        });

        // Update toggle button text if needed, or visual state
        // (Optional: You could highlight the active lang part "EN | ES")
    }

    // Helper to traverse object by "key1.key2" string
    function getNestedTranslation(obj, keyPath) {
        return keyPath.split('.').reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : null, obj);
    }

    // -------------------
    // Project Modal Logic
    // -------------------
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTools = document.getElementById('modal-tools');
    const closeBtn = document.querySelector('.modal-close');

    const allClickableItems = document.querySelectorAll('.dashboard-item, .project-card[data-project]');

    function openProjectModal(item) {
        const projectId = item.getAttribute('data-project');
        const toolsAttr = item.getAttribute('data-tools');
        const tools = toolsAttr ? toolsAttr.split(',') : [];

        const lang = localStorage.getItem('site-lang') || 'en';
        const projectData = translations[lang] && translations[lang].projects ? translations[lang].projects[projectId] : null;

        if (!projectData || !modal) return;

        modalTitle.textContent = projectData.title;
        modalDesc.innerHTML = projectData.desc;

        const modalImage = document.getElementById('modal-image');
        if (modalImage) {
            const img = item.querySelector('img');
            if (img) {
                modalImage.src = img.src;
                modalImage.style.display = 'block';
            } else {
                modalImage.style.display = 'none';
            }
        }

        modalTools.innerHTML = '';
        tools.forEach(tool => {
            const tag = document.createElement('span');
            tag.className = 'modal-tag';
            tag.textContent = tool.trim();
            modalTools.appendChild(tag);
        });

        modal.classList.add('active');
        setTimeout(() => {
            const cb = modal.querySelector('.modal-close');
            if (cb) cb.focus();
        }, 50);
    }

    if (modal && allClickableItems.length > 0) {
        allClickableItems.forEach(item => {
            item.addEventListener('click', () => openProjectModal(item));
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProjectModal(item);
                }
            });
        });

        // Close Modal via Button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // -------------------
    // Contact Form Logic (POST + validation + toast)
    // -------------------
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const lang = localStorage.getItem('site-lang') || 'en';
            const t = translations[lang].contact;

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const msgInput = document.getElementById('message');

            let valid = true;

            function setError(input, errorId, msg) {
                const el = document.getElementById(errorId);
                if (msg) {
                    el.textContent = msg;
                    input.classList.add('is-invalid');
                    valid = false;
                } else {
                    el.textContent = '';
                    input.classList.remove('is-invalid');
                }
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setError(nameInput,  'name-error',    nameInput.value.trim()  ? '' : t.errors.name_required);
            setError(emailInput, 'email-error',   !emailInput.value.trim() ? t.errors.email_required :
                                                  !emailRegex.test(emailInput.value.trim()) ? t.errors.email_invalid : '');
            setError(msgInput,   'message-error', msgInput.value.trim()   ? '' : t.errors.msg_required);

            if (!valid) return;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = '⏳ Sending…';
            submitBtn.disabled = true;

            fetch('https://n8n.i-automate.es/webhook/9903d916-f574-47a3-8a29-1c35acd8fdb2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    message: msgInput.value.trim()
                })
            })
                .then(response => {
                    if (response.ok) {
                        showToast(t.success, 'success');
                        contactForm.reset();
                    } else {
                        showToast(t.error, 'error');
                    }
                })
                .catch(() => showToast(t.error, 'error'))
                .finally(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // -------------------
    // Toast Helper
    // -------------------
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('fade-out');
            toast.addEventListener('animationend', () => toast.remove());
        }, 4000);
    }

    // -------------------
    // Dark Mode Toggle
    // -------------------
    const themeToggle = document.querySelector('.theme-toggle');
    const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme');
            if (themeToggle) themeToggle.innerHTML = moonSVG;
        } else {
            document.documentElement.classList.remove('light-theme');
            if (themeToggle) themeToggle.innerHTML = sunSVG;
        }
    }

    const savedTheme = localStorage.getItem('site-theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = !document.documentElement.classList.contains('light-theme');
            const next = isDark ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem('site-theme', next);
        });
    }

    // -------------------
    // Typewriter Effect
    // -------------------
    const typewriterEl = document.getElementById('typewriter-text');
    if (typewriterEl) {
        let twLang = localStorage.getItem('site-lang') || 'en';
        let roles = translations[twLang].hero.roles || [];
        let roleIdx = 0, charIdx = 0, isDeleting = false;

        function typeLoop() {
            twLang = localStorage.getItem('site-lang') || 'en';
            roles = translations[twLang].hero.roles || [];
            const current = roles[roleIdx] || '';

            if (!isDeleting) {
                typewriterEl.textContent = current.slice(0, ++charIdx);
                if (charIdx === current.length) {
                    isDeleting = true;
                    setTimeout(typeLoop, 2000);
                    return;
                }
            } else {
                typewriterEl.textContent = current.slice(0, --charIdx);
                if (charIdx === 0) {
                    isDeleting = false;
                    roleIdx = (roleIdx + 1) % roles.length;
                }
            }
            setTimeout(typeLoop, isDeleting ? 55 : 90);
        }
        setTimeout(typeLoop, 800);
    }

    // -------------------
    // Stats Counter Animation
    // -------------------
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                const duration = 1500;
                const start = performance.now();
                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(ease * target);
                    if (progress < 1) requestAnimationFrame(update);
                    else el.textContent = target;
                }
                requestAnimationFrame(update);
                obs.unobserve(el);
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(n => statsObserver.observe(n));
    }

    // -------------------
    // Skill Bar Animation
    // -------------------
    const skillFills = document.querySelectorAll('.skill-bar__fill');
    if (skillFills.length > 0) {
        const skillObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const fill = entry.target;
                fill.style.width = fill.getAttribute('data-width') + '%';
                obs.unobserve(fill);
            });
        }, { threshold: 0.3 });

        skillFills.forEach(f => skillObserver.observe(f));
    }

    // -------------------
    // Custom Cursor
    // -------------------
    const cursorDot  = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
        document.body.classList.add('has-custom-cursor');
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left  = e.clientX + 'px';
            cursorDot.style.top   = e.clientY + 'px';
            cursorRing.style.left = e.clientX + 'px';
            cursorRing.style.top  = e.clientY + 'px';
        });

        const hoverTargets = 'a, button, [role="button"], .tool-card, .dashboard-item, .timeline__content';
        document.querySelectorAll(hoverTargets).forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hovered');
                cursorRing.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hovered');
                cursorRing.classList.remove('hovered');
            });
        });
    }

    // -------------------
    // Modal: Focus Trap
    // -------------------
    const modalEl = document.getElementById('project-modal');
    if (modalEl) {
        modalEl.addEventListener('keydown', (e) => {
            if (!modalEl.classList.contains('active')) return;
            const focusable = modalEl.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
            const first = focusable[0];
            const last  = focusable[focusable.length - 1];
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
            if (e.key === 'Escape') modalEl.classList.remove('active');
        });

    }

});

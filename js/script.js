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
            tag_web: "Web App",
            live: "Live",
            visit: "Visit the site",
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
                        <li>Structured invoice data exported to an Excel report.</li>
                        <li>Pydantic schemas enforce strict data validation before output generation.</li>
                        <li>Composable skill architecture — each stage is an independent, testable module.</li>
                    </ul>
                `
            },
            proj2: {
                title: "Contract Revenue Planner",
                short: "Service-contract planning on a synthetic portfolio: committed base, churn, risk-weighted exposure and pipeline, resolved into one defensible figure.",
                desc: `
                    <h4>Planning a service-contract portfolio</h4>
                    <p>A planning tool for a portfolio of service contracts. It takes a contract export, applies the levers a planner actually pulls — negotiated overrides, contracts marked as lost — weighs risks and opportunities by probability, and resolves everything into a single planned-revenue figure with every step visible.</p>
                    <h4>The revenue bridge</h4>
                    <p>In a business review the question is never "what is the number", it is "what moved it". So the centrepiece is a waterfall: committed base, then overrides and churn, then weighted risk, then weighted pipeline, arriving at the planned figure. Each bar starts where the last one ended.</p>
                    <h4>Built on data that fights back</h4>
                    <p>The dataset is generated with a fixed seed and carries deliberate imperfections: rows with no cluster, two accounts spelled two different ways, contracts billed per intervention that carry no committed revenue at all, and expiry dates bunched at quarter ends. A planning tool that only works on clean data is not a planning tool.</p>
                    <p>The data-quality panel is the part that matters most and looks least impressive. Problem rows are grouped and flagged rather than dropped, because dropping them understates the base and nobody notices.</p>
                    <h4>Notes</h4>
                    <ul>
                        <li><strong>Every figure is invented.</strong> 186 contracts across 58 accounts, generated by a Python script. No customer, contract or employer data is involved.</li>
                        <li>No build step, no framework, no CDN: one 25&nbsp;KB HTML file and charts drawn as inline SVG.</li>
                        <li>Python standard library only for the generator — nothing to install.</li>
                        <li>Opens from the filesystem with a double click, as well as from a server.</li>
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
            },
            proj4: {
                title: "Clavaría S.A.B.",
                short: "Management platform for a cultural association: public portal plus an internal RBAC back office for members, treasury, events and inventory.",
                desc: `
                    <h4>Full Management Web App for a Festive Association</h4>
                    <p>An integral platform for the Clavaría de San Antonio de Benagéber. It combines a <strong>public portal</strong> (festival programme, news, gallery, lottery) with an <strong>internal back office</strong> where the board manages the member roll, treasury, inventory and minutes — all behind role-based access control.</p>

                    <h4>Key Features</h4>
                    <ul>
                        <li><strong>RBAC with 8 roles:</strong> president, treasurer, secretary, lottery lead, logistics, pyrotechnics, board member and member — each writing only in its own area.</li>
                        <li><strong>Configurable permissions:</strong> a role × section table drives the Postgres RLS policies themselves, so access is edited from the web, not from SQL.</li>
                        <li><strong>Treasury:</strong> income/expenses by festival and category, with per-event budget breakdown and CSS-only charts.</li>
                        <li><strong>Event management:</strong> preparation checklist, suppliers, materials, documents and event duplication for the following year.</li>
                        <li><strong>Member onboarding:</strong> public sign-up request → board approval → Edge Function creates the Auth user and sends the invitation by email.</li>
                        <li><strong>File storage:</strong> avatars, gallery and a private bucket for minutes served through 5-minute signed URLs.</li>
                    </ul>

                    <h4>Technologies</h4>
                    <ul>
                        <li><strong>Frontend:</strong> Next.js 16 (App Router, static export) + React 19 + Tailwind CSS v4</li>
                        <li><strong>Design system:</strong> hand-built Material 3 with light/dark tokens</li>
                        <li><strong>Backend:</strong> Supabase — PostgreSQL, Auth, Row Level Security and Deno Edge Functions</li>
                        <li><strong>Deployment:</strong> Netlify (static export, no server runtime — RLS is the only real access guard)</li>
                    </ul>
                `
            },
            proj5: {
                title: "Falla Turia",
                short: "Official web app for a Valencian falla: news, agenda, gallery, lottery and a role-based admin dashboard, in Spanish and Valencian.",
                desc: `
                    <h4>Official Web App for Falla Turia — Plaça de l'Ajuntament</h4>
                    <p>Web platform for the falla commission's members: news, event calendar, photo gallery, official representatives and the Christmas lottery draw, backed by a complete administrative dashboard with differentiated roles.</p>

                    <h4>Key Features</h4>
                    <ul>
                        <li><strong>Member area:</strong> news with multi-photo carousel, dynamic agenda with archive, gallery, representatives and a suggestion box.</li>
                        <li><strong>Bilingual:</strong> full Spanish / Valencian interface driven by a language context.</li>
                        <li><strong>Admin dashboard:</strong> content and user management with four roles (Admin, Editor, Author, Subscriber) enforced by RLS.</li>
                        <li><strong>Full authentication:</strong> Supabase Auth with registration, password recovery by email and protected routes.</li>
                        <li><strong>n8n integration:</strong> a webhook syncs every new registration automatically.</li>
                        <li><strong>Themed design:</strong> animated fire background matching the falla's identity.</li>
                    </ul>

                    <h4>Technologies</h4>
                    <ul>
                        <li><strong>Frontend:</strong> React 18 + TypeScript + Vite + React Router + Tailwind CSS</li>
                        <li><strong>Backend:</strong> Supabase — PostgreSQL, Auth, Storage, Row Level Security and Edge Functions</li>
                        <li><strong>Automation:</strong> n8n webhook for new-member sync</li>
                        <li><strong>Deployment:</strong> Netlify with serverless functions and SPA routing</li>
                    </ul>
                `
            },
            proj6: {
                title: "TuriaDJ",
                short: "Democratic jukebox for live events: guests vote the queue and a real-time audio engine streams it with gapless 3-second crossfades.",
                desc: `
                    <h4>Democratic Jukebox with a Real-Time Audio Engine</h4>
                    <p>A web jukebox for live falla events. Guests search the music library, add tracks to the queue and vote on them; the DJ keeps control from an admin panel, and every phone in the room can listen to the same live stream.</p>

                    <h4>Key Features</h4>
                    <ul>
                        <li><strong>Voted queue:</strong> everyone adds and upvotes tracks (rate-limited to 2 every 4 minutes) with Socket.IO broadcasting the queue to all clients instantly.</li>
                        <li><strong>Broadcast engine:</strong> a custom server streams MP3 at playback rate to every listener, frame-aligned so a splice never breaks a frame.</li>
                        <li><strong>Automatic crossfade:</strong> the server analyses how each track ends (dry, trailing silence or fade-out) with ffmpeg RMS windows and computes where the next one should come in — always a 3-second overlap.</li>
                        <li><strong>AutoDJ:</strong> keeps the music going when the queue empties, pre-picking and preloading the next track ~90s ahead.</li>
                        <li><strong>Session resilience:</strong> heartbeat, watchdog and full resync so an all-night event survives phones going to background and dropped sockets.</li>
                        <li><strong>Auth:</strong> JWT with admin/user roles, plus optional Google Sign-In verified server-side by ID token.</li>
                    </ul>

                    <h4>Engineering Highlights</h4>
                    <ul>
                        <li>ID3v2 tags were eating <strong>2.8s of airtime per track</strong> — skipping them removed every silent gap between songs (9 → 0 starvation windows, measured A/B).</li>
                        <li>Dual <code>&lt;audio&gt;</code> elements fanned into a single Web Audio AnalyserNode for the client-side crossfader.</li>
                        <li>Native <code>bcrypt</code> replaced the pure-JS one after 60 concurrent logins blocked the broadcast thread for 4.75s — max delay dropped to 2ms.</li>
                    </ul>

                    <h4>Technologies</h4>
                    <ul>
                        <li><strong>Backend:</strong> Node.js 22 + Express + Socket.IO + better-sqlite3</li>
                        <li><strong>Frontend:</strong> React 18 + Vite + Tailwind CSS + Web Audio API</li>
                        <li><strong>Audio:</strong> ffmpeg for mix-point analysis and server-side crossfade; Navidrome (Subsonic API) as the music catalogue</li>
                        <li><strong>Deployment:</strong> Linux server with a systemd service</li>
                    </ul>
                `
            },
            proj7: {
                title: "Comunio Mundial 2026",
                short: "Prediction league for the FIFA World Cup 2026: live leaderboard, automatic scoring and results synced from a sports API every 5 minutes.",
                desc: `
                    <h4>Prediction League for the FIFA World Cup 2026</h4>
                    <p>A full prediction pool where a group of friends forecasts every match of the tournament. Results arrive automatically, points are recalculated on the spot and the leaderboard updates live on everyone's screen without a refresh.</p>

                    <h4>Key Features</h4>
                    <ul>
                        <li><strong>Match predictions:</strong> scoreline forecast per match, locked automatically 15 minutes before kick-off by a database trigger.</li>
                        <li><strong>Tournament bet:</strong> champion, runner-up and third place, worth 30 / 20 / 15 points.</li>
                        <li><strong>Scoring:</strong> +3 for the right result, +1 per exact goal tally — a maximum of 5 per match.</li>
                        <li><strong>Four-level tie-break:</strong> total points → perfect scores → correct 1-X-2 → individual goals hit, all derived from the stored points without extra columns.</li>
                        <li><strong>Automatic sync:</strong> a Netlify Scheduled Function polls TheSportsDB every 5 minutes, maps team names to FIFA codes and recalculates everyone's totals.</li>
                        <li><strong>Live updates:</strong> Supabase Realtime pushes results and standings to every open client, debounced so a sync burst doesn't thrash the table.</li>
                        <li><strong>Admin panel:</strong> manual results by stage and group, plus sync status and unmapped-team diagnostics.</li>
                    </ul>

                    <h4>Technologies</h4>
                    <ul>
                        <li><strong>Frontend:</strong> Next.js 16 (App Router, Server Components) + React 19 + TypeScript strict + Tailwind CSS v4</li>
                        <li><strong>Backend:</strong> Supabase — PostgreSQL, Auth (magic link), Row Level Security, triggers and Realtime</li>
                        <li><strong>Automation:</strong> Netlify Scheduled Function against TheSportsDB API</li>
                        <li><strong>Deployment:</strong> Netlify with session-refreshing middleware</li>
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
            success: "Message accepted by the email service. Thank you for contacting me.",
            rate_limit: "Too many attempts. Please try again in an hour.",
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
            tag_web: "Web App",
            live: "En línea",
            visit: "Ver la web",
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
                        <li>Datos de facturas estructurados y exportados a un informe Excel.</li>
                        <li>Esquemas Pydantic garantizan validación estricta antes de generar el output.</li>
                        <li>Arquitectura modular — cada etapa es un módulo independiente y testeable.</li>
                    </ul>
                `
            },
            proj2: {
                title: "Contract Revenue Planner",
                short: "Planificación de una cartera de contratos de servicio con datos sintéticos: base comprometida, churn, riesgo ponderado y pipeline, resueltos en una sola cifra defendible.",
                desc: `
                    <h4>Planificar una cartera de contratos de servicio</h4>
                    <p>Una herramienta de planificación para una cartera de contratos de servicio. Parte de un export de contratos, aplica las palancas que un planificador usa de verdad — overrides negociados, contratos dados por perdidos —, pondera riesgos y oportunidades por probabilidad, y lo resuelve todo en una única cifra de ingreso planificado con cada paso a la vista.</p>
                    <h4>El puente de ingresos</h4>
                    <p>En una revisión de negocio la pregunta nunca es "cuál es el número", sino "qué lo movió". Por eso la pieza central es una cascada: base comprometida, overrides y churn, riesgo ponderado, pipeline ponderado, y la cifra planificada. Cada barra empieza donde acabó la anterior.</p>
                    <h4>Construido sobre datos que se resisten</h4>
                    <p>El conjunto de datos se genera con semilla fija y lleva defectos a propósito: filas sin clúster, dos cuentas escritas de forma distinta, contratos facturados por intervención que no aportan ingreso comprometido, y vencimientos agrupados a fin de trimestre. Una herramienta de planificación que solo funciona con datos limpios no es una herramienta de planificación.</p>
                    <p>El panel de calidad de datos es lo que más importa y menos luce. Las filas con problemas se agrupan y se señalan en vez de descartarse, porque descartarlas infravalora la base sin que nadie se entere.</p>
                    <h4>Notas</h4>
                    <ul>
                        <li><strong>Todas las cifras son inventadas.</strong> 186 contratos en 58 cuentas, generados por un script de Python. No interviene ningún dato de cliente, contrato ni empleador.</li>
                        <li>Sin build, sin framework, sin CDN: un fichero HTML de 25&nbsp;KB y gráficos dibujados como SVG en línea.</li>
                        <li>Solo librería estándar de Python para el generador — nada que instalar.</li>
                        <li>Se abre con doble clic desde el disco, además de desde un servidor.</li>
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
            },
            proj4: {
                title: "Clavaría S.A.B.",
                short: "Plataforma de gestión integral para una asociación cultural: portal público más un panel interno con RBAC para padrón, tesorería, actos e inventario.",
                desc: `
                    <h4>Web App de Gestión Integral para una Asociación Festera</h4>
                    <p>Plataforma completa para la Clavaría de San Antonio de Benagéber. Combina un <strong>portal público</strong> (programa de fiestas, noticias, galería, lotería) con un <strong>panel interno</strong> donde la Junta gestiona el padrón de socios, la tesorería, el inventario y las actas, todo bajo control de acceso por roles.</p>

                    <h4>Características Principales</h4>
                    <ul>
                        <li><strong>RBAC con 8 roles:</strong> clavario mayor, tesorero, secretario, lotero, logística, pirotecnia, vocal y clavario — cada uno escribe solo en su área.</li>
                        <li><strong>Permisos configurables:</strong> una tabla rol × sección alimenta las propias políticas RLS de Postgres, de modo que los accesos se editan desde la web, no desde SQL.</li>
                        <li><strong>Tesorería:</strong> ingresos y gastos por fiesta y categoría, con desglose de presupuesto por acto y gráficas hechas solo con CSS.</li>
                        <li><strong>Gestión de actos:</strong> checklist de preparación, proveedores, material, documentos y duplicado del acto para el año siguiente.</li>
                        <li><strong>Alta de socios:</strong> solicitud pública → aprobación de la Junta → una Edge Function crea el usuario en Auth y envía la invitación por email.</li>
                        <li><strong>Almacenamiento:</strong> avatares, galería y un bucket privado para las actas, servidas con URLs firmadas de 5 minutos.</li>
                    </ul>

                    <h4>Tecnologías</h4>
                    <ul>
                        <li><strong>Frontend:</strong> Next.js 16 (App Router, export estático) + React 19 + Tailwind CSS v4</li>
                        <li><strong>Sistema de diseño:</strong> Material 3 construido a mano con tokens día/noche</li>
                        <li><strong>Backend:</strong> Supabase — PostgreSQL, Auth, Row Level Security y Edge Functions en Deno</li>
                        <li><strong>Despliegue:</strong> Netlify (export estático, sin runtime de servidor — RLS es la única guarda real)</li>
                    </ul>
                `
            },
            proj5: {
                title: "Falla Turia",
                short: "Web app oficial de una falla de Valencia: noticias, agenda, galería, lotería y panel de administración por roles, en castellano y valenciano.",
                desc: `
                    <h4>Web App Oficial de la Falla Turia — Plaça de l'Ajuntament</h4>
                    <p>Plataforma web para los miembros de la comisión fallera: noticias, calendario de actos, galería de fotos, representantes oficiales y el sorteo de lotería de Navidad, con un panel de administración completo y roles diferenciados.</p>

                    <h4>Características Principales</h4>
                    <ul>
                        <li><strong>Área de miembros:</strong> noticias con carrusel multi-foto, agenda dinámica con histórico, galería, representantes y buzón de sugerencias.</li>
                        <li><strong>Bilingüe:</strong> interfaz completa en castellano y valenciano mediante un contexto de idioma.</li>
                        <li><strong>Panel de administración:</strong> gestión de contenido y usuarios con cuatro roles (Admin, Editor, Author, Subscriber) aplicados por RLS.</li>
                        <li><strong>Autenticación completa:</strong> Supabase Auth con registro, recuperación de contraseña por email y rutas protegidas.</li>
                        <li><strong>Integración n8n:</strong> un webhook sincroniza automáticamente cada nuevo registro.</li>
                        <li><strong>Diseño temático:</strong> fondo animado de fuego acorde con la identidad de la falla.</li>
                    </ul>

                    <h4>Tecnologías</h4>
                    <ul>
                        <li><strong>Frontend:</strong> React 18 + TypeScript + Vite + React Router + Tailwind CSS</li>
                        <li><strong>Backend:</strong> Supabase — PostgreSQL, Auth, Storage, Row Level Security y Edge Functions</li>
                        <li><strong>Automatización:</strong> webhook de n8n para sincronizar altas</li>
                        <li><strong>Despliegue:</strong> Netlify con funciones serverless y routing SPA</li>
                    </ul>
                `
            },
            proj6: {
                title: "TuriaDJ",
                short: "Jukebox democrático para eventos en directo: el público vota la cola y un motor de audio en tiempo real la emite con mezclas de 3 segundos sin silencios.",
                desc: `
                    <h4>Jukebox Democrático con Motor de Audio en Tiempo Real</h4>
                    <p>Jukebox web para los eventos de la Falla Turia. El público busca canciones en la biblioteca, las añade a la cola y las vota; el DJ mantiene el control desde un panel de administración, y cualquier móvil de la sala puede escuchar la misma emisión en directo.</p>

                    <h4>Características Principales</h4>
                    <ul>
                        <li><strong>Cola votada:</strong> todos añaden y votan canciones (límite de 2 cada 4 minutos), con Socket.IO difundiendo la cola a todos los clientes al instante.</li>
                        <li><strong>Motor de emisión:</strong> un servidor propio emite MP3 a ritmo de reproducción para todos los oyentes, alineado a frame para que ningún empalme parta una trama.</li>
                        <li><strong>Crossfade automático:</strong> el servidor analiza cómo termina cada canción (seca, con silencio de cola o con fundido) mediante ventanas RMS de ffmpeg y calcula dónde debe entrar la siguiente — siempre 3 segundos de solape.</li>
                        <li><strong>AutoDJ:</strong> mantiene la música cuando la cola se vacía, pre-eligiendo y precargando la siguiente canción unos 90 s antes.</li>
                        <li><strong>Robustez de sesión:</strong> heartbeat, watchdog y resincronización completa para que un evento de toda la noche sobreviva a móviles en segundo plano y sockets caídos.</li>
                        <li><strong>Autenticación:</strong> JWT con roles admin/usuario, más acceso opcional con Google verificado en servidor por ID token.</li>
                    </ul>

                    <h4>Retos Técnicos Resueltos</h4>
                    <ul>
                        <li>Los tags ID3v2 consumían <strong>2,8 s de emisión por canción</strong> — saltarlos eliminó todos los silencios entre temas (9 → 0 ventanas de hambre, medido A/B).</li>
                        <li>Dos elementos <code>&lt;audio&gt;</code> alternos conectados a un único AnalyserNode de Web Audio para el crossfader del cliente.</li>
                        <li><code>bcrypt</code> nativo sustituyó al de JS puro tras comprobar que 60 logins simultáneos bloqueaban el hilo de emisión 4,75 s — el retraso máximo bajó a 2 ms.</li>
                    </ul>

                    <h4>Tecnologías</h4>
                    <ul>
                        <li><strong>Backend:</strong> Node.js 22 + Express + Socket.IO + better-sqlite3</li>
                        <li><strong>Frontend:</strong> React 18 + Vite + Tailwind CSS + Web Audio API</li>
                        <li><strong>Audio:</strong> ffmpeg para el análisis del punto de mezcla y el crossfade de servidor; Navidrome (API Subsonic) como catálogo musical</li>
                        <li><strong>Despliegue:</strong> servidor Linux con servicio systemd</li>
                    </ul>
                `
            },
            proj7: {
                title: "Comunio Mundial 2026",
                short: "Porra de predicciones para el Mundial 2026: clasificación en vivo, puntuación automática y resultados sincronizados desde una API deportiva cada 5 minutos.",
                desc: `
                    <h4>Porra de Predicciones para el Mundial FIFA 2026</h4>
                    <p>Porra completa donde un grupo de amigos pronostica todos los partidos del torneo. Los resultados llegan solos, los puntos se recalculan al instante y la clasificación se actualiza en vivo en la pantalla de todos sin recargar.</p>

                    <h4>Características Principales</h4>
                    <ul>
                        <li><strong>Predicción por partido:</strong> pronóstico del marcador, bloqueado automáticamente 15 minutos antes del saque inicial mediante un trigger de base de datos.</li>
                        <li><strong>Apuesta de torneo:</strong> campeón, subcampeón y tercer clasificado, que valen 30 / 20 / 15 puntos.</li>
                        <li><strong>Puntuación:</strong> +3 por acertar el signo, +1 por cada marcador exacto — máximo 5 por partido.</li>
                        <li><strong>Desempate a cuatro niveles:</strong> puntos totales → plenos → aciertos 1-X-2 → goles individuales acertados, todo derivado de los puntos ya guardados sin columnas extra.</li>
                        <li><strong>Sincronización automática:</strong> una Scheduled Function de Netlify consulta TheSportsDB cada 5 minutos, mapea nombres de equipo a códigos FIFA y recalcula los totales de todos.</li>
                        <li><strong>Actualización en vivo:</strong> Supabase Realtime empuja resultados y clasificación a todos los clientes abiertos, con debounce para que una ráfaga de sync no machaque la tabla.</li>
                        <li><strong>Panel de administración:</strong> resultados manuales por fase y grupo, más estado del sync y diagnóstico de equipos sin mapear.</li>
                    </ul>

                    <h4>Tecnologías</h4>
                    <ul>
                        <li><strong>Frontend:</strong> Next.js 16 (App Router, Server Components) + React 19 + TypeScript strict + Tailwind CSS v4</li>
                        <li><strong>Backend:</strong> Supabase — PostgreSQL, Auth (magic link), Row Level Security, triggers y Realtime</li>
                        <li><strong>Automatización:</strong> Scheduled Function de Netlify contra la API de TheSportsDB</li>
                        <li><strong>Despliegue:</strong> Netlify con middleware que refresca la sesión</li>
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
            success: "Mensaje aceptado por el servicio de correo. Gracias por contactar.",
            rate_limit: "Demasiados intentos. Vuelve a intentarlo dentro de una hora.",
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


Object.assign(translations.en.hero, {
    badge: "Technical service · Iberia",
    subtitle: "Technical leadership, data and applied AI",
    description: "I supervise technical service at <strong>Johnson & Johnson Vision</strong> in Iberia and develop analytics and automation solutions to support operations management.",
    cta_resume: "View CV"
});
Object.assign(translations.es.hero, {
    badge: "Servicio técnico · Iberia",
    subtitle: "Liderazgo técnico, datos e IA aplicada",
    description: "Superviso el servicio técnico de <strong>Johnson & Johnson Vision</strong> en Iberia y desarrollo soluciones de análisis y automatización para mejorar la gestión de operaciones.",
    cta_resume: "Ver CV"
});
Object.assign(translations.en.about, {
    p1: "I coordinate technical service teams in Spain and Portugal, covering installations, maintenance, updates and service escalations for ophthalmic equipment.",
    p2: "Alongside my service role, I build dashboards and automation tools. I use AI assistance to develop code and continue learning SQL, Python and Microsoft Fabric.",
    skill1: "Team coordination in Spain and Portugal", skill2: "Installation and maintenance planning", skill3: "Support for ophthalmic systems", skill4: "Service workflows and automation", skill5: "Dashboards and data integration"
});
Object.assign(translations.es.about, {
    p1: "Coordino equipos de servicio técnico en España y Portugal: instalaciones, mantenimiento, actualizaciones y escalaciones de equipos oftalmológicos.",
    p2: "Además de mi función de servicio, desarrollo dashboards y herramientas de automatización. Utilizo apoyo de IA para programar y sigo aprendiendo SQL, Python y Microsoft Fabric.",
    skill1: "Coordinación de equipos en España y Portugal", skill2: "Planificación de instalaciones y mantenimiento", skill3: "Soporte de sistemas oftalmológicos", skill4: "Procesos de servicio y automatización", skill5: "Dashboards e integración de datos"
});
Object.assign(translations.en.data, {preview: "Concept diagram · No client data"});
Object.assign(translations.es.data, {preview: "Diagrama conceptual · Sin datos de clientes"});
Object.assign(translations.en.projects, {title: "Selected Projects", subtitle: "Tools for service management, document automation and personal projects.", professional: "Professional tools", personal: "Personal projects", more: "More projects"});
Object.assign(translations.es.projects, {title: "Proyectos destacados", subtitle: "Herramientas para gestión de servicio, automatización documental y proyectos personales.", professional: "Herramientas profesionales", personal: "Proyectos personales", more: "Más proyectos"});

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
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.focus();
        }
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(nav.classList.contains('active')));
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
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
        document.documentElement.lang = lang;
        if (translations[lang].meta) {
            document.title = translations[lang].meta.title;
            document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]').forEach(el => el.content = translations[lang].meta.description);
            document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach(el => el.content = translations[lang].meta.title);
        }
        document.querySelectorAll('.project-card[data-project]').forEach(card => {
            card.setAttribute('aria-label', translations[lang].projects[card.dataset.project].title);
        });
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

    // Distintivo "en línea" en las tarjetas que tienen web pública (data-url)
    document.querySelectorAll('.project-card[data-url] .project-card__tags').forEach(tagRow => {
        const badge = document.createElement('span');
        badge.className = 'project-tag project-tag--live';
        badge.setAttribute('data-i18n', 'projects.live');
        badge.textContent = getNestedTranslation(translations[currentLang], 'projects.live') || 'Live';
        tagRow.appendChild(badge);
    });

    let modalTrigger = null;
    function closeProjectModal() {
        modal.classList.remove('active');
        document.querySelector('main').inert = false;
        document.querySelector('header').inert = false;
        document.querySelector('footer').inert = false;
        document.body.style.overflow = '';
        if (modalTrigger) modalTrigger.focus();
    }
    function openProjectModal(item) {
        modalTrigger = item;
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
                modalImage.src = item.dataset.diagram || img.src;
                modalImage.alt = item.dataset.diagram
                    ? `${projectData.title} — ${lang === 'es' ? 'diagrama conceptual' : 'concept diagram'}`
                    : img.classList.contains('project-cover')
                    ? `${projectData.title} — ${lang === 'es' ? 'ilustración conceptual generada con IA' : 'AI-generated concept illustration'}`
                    : (img.alt || 'Project Thumbnail');
                // Los logos se muestran enteros; las capturas de dashboard, recortadas y con blur
                modalImage.classList.toggle('modal-image--logo', img.classList.contains('project-card__thumb'));
                modalImage.style.display = 'block';
            } else {
                modalImage.style.display = 'none';
            }
        }

        // Enlace a la web en producción — solo para los proyectos que tienen data-url
        const modalLink = document.getElementById('modal-link');
        if (modalLink) {
            const url = item.getAttribute('data-url');
            if (url) {
                modalLink.href = url;
                modalLink.hidden = false;
            } else {
                modalLink.removeAttribute('href');
                modalLink.hidden = true;
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
        document.querySelector('main').inert = true;
        document.querySelector('header').inert = true;
        document.querySelector('footer').inert = true;
        document.body.style.overflow = 'hidden';
        const cb = modal.querySelector('.modal-close');
        if (cb) cb.focus();
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
                closeProjectModal();
            });
        }

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProjectModal();
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
            submitBtn.textContent = lang === 'es' ? 'Enviando…' : 'Sending…';
            submitBtn.disabled = true;

            fetch(contactForm.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    message: msgInput.value.trim(),
                    website: document.getElementById('website').value
                })
            })
                .then(async response => {
                    const result = await response.json();
                    if (response.ok && result.ok === true && result.code === 'sent') {
                        showToast(t.success, 'success');
                        contactForm.reset();
                    } else {
                        showToast(response.status === 429 ? t.rate_limit : t.error, 'error');
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

    const savedTheme = localStorage.getItem('site-theme') || 'light';
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
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    el.textContent = target;
                    obs.unobserve(el);
                    return;
                }
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
        document.addEventListener('keydown', (e) => {
            if (!modalEl.classList.contains('active')) return;
            const focusable = Array.from(modalEl.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')).filter(el => el.getClientRects().length > 0);
            const first = focusable[0];
            const last  = focusable[focusable.length - 1];
            if (e.key === 'Tab') {
                if (!modalEl.contains(document.activeElement)) {
                    e.preventDefault();
                    (e.shiftKey ? last : first).focus();
                } else if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
            if (e.key === 'Escape') closeProjectModal();
        });

    }

});

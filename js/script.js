// Translations Dictionary
const translations = {
    en: {
        nav: {
            about: "About",
            experience: "Experience",
            data: "Data Passion",
            contact: "Contact"
        },
        hero: {
            badge: "Welcome to my portfolio",
            subtitle: "Data Enthusiast • Team Leader • Problem Solver",
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
            title: "Data & Analytics Passion",
            subtitle: "Transforming raw data into actionable insights through automation and dashboarding.",
            dash1: "Cost Per System Analysis",
            dash2: "ASP Maintenance Contract",
            dash3: "Revenue & Installation Base"
        },
        projects: {
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
            }
        },
        contact: {
            title: "Get In Touch",
            text: "Open to discussing technical leadership, data optimization strategies, or just connecting with fellow professionals.",
            form: {
                name_ph: "Your Name",
                email_ph: "Your Email",
                msg_ph: "Your Message",
                submit: "Send Message"
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
            data: "Pasión por Datos",
            contact: "Contacto"
        },
        hero: {
            badge: "Bienvenido a mi portafolio",
            subtitle: "Entusiasta de Datos • Líder de Equipo • Solucionador",
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
            title: "Pasión por Datos y Analítica",
            subtitle: "Transformando datos brutos en insights accionables a través de automatización y dashboards.",
            dash1: "Análisis de Costo por Sistema",
            dash2: "ASP Maintenance Contract",
            dash3: "Ingresos y Base Instalada"
        },
        projects: {
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
            }
        },
        contact: {
            title: "Contacto",
            text: "Abierto a discutir liderazgo técnico, estrategias de optimización de datos o simplemente conectar con otros profesionales.",
            form: {
                name_ph: "Tu Nombre",
                email_ph: "Tu Email",
                msg_ph: "Tu Mensaje",
                submit: "Enviar Mensaje"
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
    const dashboardItems = document.querySelectorAll('.dashboard-item');

    if (modal && dashboardItems.length > 0) {
        const modalImage = document.getElementById('modal-image');

        dashboardItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Read data attributes
                const projectId = item.getAttribute('data-project');
                const toolsAttr = item.getAttribute('data-tools');
                const tools = toolsAttr ? toolsAttr.split(',') : [];
                // Get image source from the clicked item's image
                const imgSource = item.querySelector('img').src;

                // Get current language and data
                // Ensure translations object exists and has the language key
                const lang = localStorage.getItem('site-lang') || 'en';
                const projectData = translations[lang] && translations[lang].projects ? translations[lang].projects[projectId] : null;

                if (projectData) {
                    // Populate Modal
                    modalTitle.textContent = projectData.title;
                    modalDesc.innerHTML = projectData.desc; // Use innerHTML for formatting
                    if (modalImage) modalImage.src = imgSource; // Set thumbnail

                    // Clear and populate tools
                    modalTools.innerHTML = '';
                    tools.forEach(tool => {
                        const tag = document.createElement('span');
                        tag.className = 'modal-tag';
                        tag.textContent = tool.trim();
                        modalTools.appendChild(tag);
                    });

                    // Show Modal
                    modal.classList.add('active');
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
    // Contact Form Logic (Mailto)
    // -------------------
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const subject = `Portfolio Contact from ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

            // Construct mailto link
            window.location.href = `mailto:miguelcp777@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Optional: reset form after a delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }

});

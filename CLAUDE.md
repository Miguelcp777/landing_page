# CLAUDE.md — Landing Page Miguel Castillo

## Proyecto
Portfolio personal estático (HTML/CSS/JS) servido desde un NAS Synology.
- **URL pública:** `https://www.miguelcastillo.es`
- **Web root en NAS:** `/volume1/web/`
- **Repositorio GitHub:** `https://github.com/Miguelcp777/landing_page`

## Stack
- HTML5 / CSS3 / JavaScript vanilla (sin frameworks)
- Nginx (NAS Synology) como servidor web
- n8n para automatización (formulario de contacto, futura sección de noticias)
- PHP-FPM disponible en el NAS para scripts PHP si se necesitan

## Estructura de archivos
```
index.html          — Página principal
cv.html             — CV / Currículum
css/styles.css      — Todos los estilos (26 secciones numeradas)
js/script.js        — Toda la lógica JS (i18n, animaciones, formulario, modales)
assets/images/      — Imágenes (profile-1.jpg, dashboards, vcard-qr.png)
formulario_landing_page.json — Definición del workflow n8n (backup)
```

## CSS — Secciones numeradas
El fichero `css/styles.css` usa comentarios numerados. La próxima sección disponible es **27**.
Secciones existentes: 1-Variables, 2-Reset, 3-Utilities, 4-Header, 5-Hero, 6-About,
7-Experience, 8-Data Passion, 9-Contact/Footer, 10-Responsive, 11-Modal, 12-Effects,
13-Light Theme, 14-Skip Link, 15-Toast, 16-Form Errors, 17-Skill Bars, 18-Stats,
19-Flip Cards, 20-Typewriter, 21-Custom Cursor, 22-Hero Entry, 23-Responsive+,
24-Reduced Motion, 25-Pipeline, 26-Projects.

## JavaScript — Patrones clave
- **i18n:** objeto `translations` con claves `en` y `es`. Atributos `data-i18n` en HTML.
  Añadir siempre traducciones EN y ES al agregar texto nuevo.
- **Reveal animations:** clase `reveal-section` + IntersectionObserver (ya configurado).
- **Modales:** datos en `translations[lang].projects.*` con `data-project` en el HTML.
- **Formulario:** fetch POST a n8n webhook, toast de éxito/error.

## Secciones HTML (IDs)
`#hero` → `#about` → `#experience` → `#stats` → `#data-passion` → `#projects` → `#contact`

## n8n — Formulario de contacto
- **Webhook URL:** `https://n8n.i-automate.es/webhook/9903d916-f574-47a3-8a29-1c35acd8fdb2`
- **Método:** POST con JSON body `{ name, email, message }`
- **Mapeo en n8n:** `$json.body.name`, `$json.body.email`, `$json.body.message`
- **Flujo:** Webhook → Gmail (paralelo) + Google Sheets
- **Credenciales Google Sheets:** OAuth2 — pueden caducar, reconectar en n8n si falla
- **n8n accesible en:** `https://n8n.i-automate.es` (corre en el NAS, puerto 5678, container Docker `N8N`)

## NAS Synology — Conexión SSH
- **Host:** `192.168.1.35` · **Puerto:** 22 · **Usuario:** admin
- **Docker binary:** `/var/packages/Docker/target/usr/bin/docker`
- **Nota Docker:** versión 20.10.3 — incompatible con imágenes modernas (error `invalid tar header`).
  Actualizar el paquete Docker desde DSM antes de hacer `docker pull` de imágenes nuevas.

## Deployment
```bash
# Desde Windows (rama master):
git add <files>
git commit -m "descripción"
git push origin master
# El NAS sirve los ficheros directamente desde /volume1/web/ (git repo sincronizado)
```

## Próximas features planificadas
- **Sección de noticias (#news):** n8n cron diario → RSS feeds (TechCrunch AI, Healthcare IT News,
  MobiHealthNews) → `/volume1/web/news.json` → frontend fetch y render de cards.
  Pendiente de: actualizar Docker en NAS para poder hacer pull de n8n actualizado.

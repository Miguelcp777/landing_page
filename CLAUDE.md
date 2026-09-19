# CLAUDE.md — Landing Page Miguel Castillo

## Proyecto
Portfolio personal estático (HTML/CSS/JS) servido desde un NAS Synology.
- **URL pública:** `https://www.miguelcastillo.es`
- **Web root en NAS:** `/volume1/web/`
- **Repositorio GitHub:** `https://github.com/Miguelcp777/landing_page`
- **Objetivo de la página:** posicionar a Miguel para roles de **Data Analyst** (luego BI
  Analyst, luego Data Engineer). Cada cambio debería reforzar ese encuadre, no diluirlo.

## Stack
- HTML5 / CSS3 / JavaScript vanilla (sin frameworks, sin build)
- Nginx (NAS Synology) como servidor web
- **Sin código de servidor.** El formulario de contacto y `contact.php` se eliminaron;
  el contacto es por email, teléfono, LinkedIn y CV
- n8n sigue en el NAS, reservado para la futura sección de noticias

## Estructura de archivos
```
index.html          — Página principal
cv.html             — CV / Currículum
css/styles.css      — Base heredada (secciones numeradas 1-26)
css/editorial.css   — Capa editorial, la que manda (secciones 27-29). Carga después
js/script.js        — Base: i18n, reveal, contadores, skill bars, modales
js/portfolio.js     — Traducciones editoriales y el campo de datos animado. Carga después
assets/images/      — profile-400/800.webp (retrato), dashboard-1/2/4.svg (diagramas),
                      project-art/*.webp (portadas de proyecto)
formulario_landing_page.json — Workflow n8n del antiguo formulario. Legacy, ya no se usa
```

## Orden de carga y cascada
`styles.css` → `editorial.css`, y `script.js` → `portfolio.js`. Los segundos **sobrescriben**
a los primeros. Dos trampas reales que ya han mordido:
- **Especificidad:** existen reglas `html.light-theme .foo` (0,2,1) en `styles.css` que ganan
  a `.editorial .foo` (0,2,0). Si un estilo no se aplica, comprueba esto antes de nada.
- **`--primary-gradient` es verde oscuro** y desaparece sobre superficie oscura. Para texto
  y rellenos usa `var(--primary-color)` plano, que sí está tematizado.
- `portfolio.js` hace `translations[lang].projects[id] = {...}` con **asignación dura** para
  los casos: lo que haya en `script.js` para esas claves se pierde.

## CSS — Secciones numeradas
`styles.css` usa comentarios numerados del 1 al 26. `editorial.css` continúa:
27-Hero Entry/Stats/Reveal, 28-Timeline, 29-Project UI capture.
**La próxima sección disponible es la 30, en `editorial.css`.**

## JavaScript — Patrones clave
- **i18n:** objeto `translations` con claves `en` y `es`. Atributos `data-i18n` en HTML.
  Añadir siempre EN y ES. El HTML lleva el texto EN por defecto: actualízalo también,
  o los crawlers que no ejecutan JS verán la versión antigua.
- **Reveal:** clase `reveal-section` + IntersectionObserver. `reveal-stagger` hace que
  cascadeen las tarjetas hijas en vez de desvanecerse la sección entera.
- **Contadores y skill bars:** `.stat-number[data-target]` y `.skill-bar__fill[data-width]`,
  animados por IntersectionObserver.
- **Modales:** datos en `translations[lang].projects.*` con `data-project` en el HTML.
  `data-diagram` permite mostrar una imagen distinta a la de la tarjeta.

## Secciones HTML (IDs, en orden real)
`#hero` → `#stats` → `#data-passion` → `#toolbox` → `#about` → `#projects` → `#experience` → `#contact`

La evidencia va antes que la biografía: `#projects` está deliberadamente por encima
de `#experience`.

## Confidencialidad — regla dura
Los dashboards y diagramas llevan **cifras sintéticas y difuminadas**. Nada procede de datos
de clientes, contratos o del empleador. Al añadir un visual nuevo:
- Genera los números, no reutilices un informe real.
- Nada de nombres de cliente, números de serie, códigos de contrato, identificadores internos
  de sistema (p. ej. transacciones SAP) ni marca del empleador.
- Deja el pie que declara que los datos son sintéticos.

## NAS Synology — Conexión SSH
- **Host:** `192.168.1.35` · **Puerto:** 22 · **Usuario:** admin
- **Sin autenticación por clave:** pide contraseña, así que Claude no puede desplegar.
  Para habilitarlo: `ssh-copy-id -p 22 admin@192.168.1.35` (lo lanza Miguel).
- **Docker binary:** `/var/packages/Docker/target/usr/bin/docker`
- **Nota Docker:** versión 20.10.3 — incompatible con imágenes modernas (error `invalid tar header`).
  Actualizar el paquete Docker desde DSM antes de hacer `docker pull` de imágenes nuevas.

## Deployment
El web root del NAS es un clon de este repo y **no se sincroniza solo**. Hacer push no basta.
```bash
git push origin master
# y después, en el NAS:
ssh admin@192.168.1.35
cd /volume1/web && git pull origin master
```
Subir el `?v=` de los enlaces a CSS/JS en `index.html` en cada despliegue que los toque,
y también al reemplazar un asset en el sitio (los diagramas, por ejemplo).

El repo **es** la raíz web: todo lo commiteado queda accesible públicamente. `.gitignore`
ya excluye los artefactos de desarrollo — no lo deshagas.

### Reglas del web root
- **Solo git.** No copiar ficheros por SMB ni File Station. Se hizo en el pasado y dejó el
  árbol del NAS divergido, con CRLF de Windows: cada pull abortaba con "local changes".
- **Ficheros sin trackear que hay que conservar:** `googlebcc3d894ce85ddc8.html` (verificación
  de Google Search Console), `@eaDir/` (metadata de Synology). **Nunca `git clean -fd`** ahí:
  se los llevaría por delante.
- Git ya no controla lo que subiste a mano. Si borras algo del repo, sigue en el NAS hasta que
  lo borres allí (le pasó a `contact.php`).

### Trampas de despliegue ya resueltas (no volver a tropezar)
```bash
git config --global --add safe.directory /volume1/web   # dueño distinto del repo
git config core.autocrlf false                          # en Linux sobra y rompe los pull
git reset --hard origin/master                          # si checkout -- . no limpia el índice
```
Antes de un `reset --hard`, respaldar y comprobar que no se pierde nada propio del NAS:
```bash
tar czf ~/web-backup-$(date +%F).tgz -C /volume1/web .   # al home, NUNCA al web root
git diff --ignore-cr-at-eol --stat origin/master -- <ficheros>
```

## Próximas features planificadas
- **Evidencia verificable:** es la carencia mayor de la página. Cero enlaces a GitHub, repos
  o dashboards públicos. Lo que más movería la aguja es reconstruir los dashboards de Tableau
  con datos sintéticos en Tableau Public y enlazarlos.
- **Dominio sin `www` — APLAZADO a propósito.** `miguelcastillo.es` a secas sirve una página
  de aparcamiento de Hostinger por HTTP y falla el handshake TLS por HTTPS; solo funciona `www`.
  Miguel decidió resolverlo **cuando la landing esté terminada**. Diagnóstico en la sección
  siguiente — no re-diagnosticar desde cero.
- **Sección de noticias (#news):** n8n cron diario → RSS feeds (TechCrunch AI, Healthcare IT News,
  MobiHealthNews) → `/volume1/web/news.json` → frontend fetch y render de cards.
  Pendiente de: actualizar Docker en NAS para poder hacer pull de n8n actualizado.

## Dominio sin `www` — diagnóstico hecho, arreglo aplazado
Medido el 2026-09-20. **Son dos fallos, no uno.**
```
http://miguelcastillo.es       200  "Parked Domain name on Hostinger"  (2.57.91.91)
https://miguelcastillo.es      fallo de handshake TLS
http://www.miguelcastillo.es   200, sin redirigir a HTTPS
https://www.miguelcastillo.es  200, la web  (88.17.119.190 vía nasmiguel.ddns.net)
```
1. **DNS:** el apex apunta a Hostinger, no al NAS. DNS gestionado en Hostinger (`ns1/ns2.dns-parking.com`).
2. **Certificado:** el del NAS tiene SAN solo `www.miguelcastillo.es`; el por defecto es
   `nasmiguel.ddns.net`. Ninguno cubre el apex.

**Orden obligatorio: DNS primero, certificado después.** Let's Encrypt valida por el puerto 80
y no puede emitir para el apex hasta que este resuelva al NAS.

**Obstáculo:** la IP de casa es dinámica (de ahí el DDNS) y el apex no admite CNAME por estándar.
Opción recomendada: mover el DNS a Cloudflare (gratis) por su *CNAME flattening*, que hace que el
apex siga al DDNS solo, y de paso oculta la IP doméstica, hoy pública. El dominio sigue registrado
en Hostinger. Alternativa pobre: registro A fijo, que se rompe al cambiar la IP.

Para el mismo momento: añadir el 301 de HTTP a HTTPS (hoy no existe) y meter
`<link rel="canonical">` y `og:url` en el `<head>`, que nunca se pusieron.

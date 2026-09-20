# CLAUDE.md — Landing Page Miguel Castillo

## Proyecto
Portfolio personal estático (HTML/CSS/JS) servido desde un NAS Synology.
- **URL pública:** `https://www.miguelcastillo.es`
- **Repositorio GitHub:** `https://github.com/Miguelcp777/landing_page`
- **Objetivo de la página:** posicionar a Miguel para roles de **Data Analyst** (luego BI
  Analyst, luego Data Engineer). Cada cambio debería reforzar ese encuadre, no diluirlo.

## Protocolo de cambios — Spec Anchor
Este proyecto ha adoptado SDD Spec Anchor. **Para cambios materiales, aplica el
protocolo de `.specanchor/README.md`**: tarea *light* o *full* segun el impacto,
verifica los criterios de aceptacion afectados y documenta las dos revisiones
direccionales. Reporta la cobertura documental **por separado** de la alineacion
semantica: el guard solo comprueba la primera.

- Contratos globales: `.specanchor/global/` — arquitectura, producto, operacion,
  calidad y seguridad.
- Contratos por modulo: `.specanchor/modules/` — siete modulos, mapeados en
  `.specanchor/module-map.json`.
- Guard: `python .specanchor/scripts/check-spec-sync.py --baseline`
- Estado inicial y lo que quedo sin verificar: `.specanchor/bootstrap-report.md`

Las trampas que este fichero ya documentaba (cascada CSS, `--primary-gradient`,
asignacion dura de `portfolio.js`) viven ahora tambien en el spec del modulo
correspondiente, que es donde las buscara quien toque ese codigo.

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
js/chat.js          — Panel de chat. Apagado salvo que <body> lleve data-chat="on"
chatbot/            — Worker de Cloudflare que atiende /api/chat. Ver chatbot/README.md
assets/images/      — profile-400/800.webp (retrato), dashboard-1/2/4.svg (diagramas),
                      project-art/*.webp (portadas de proyecto)
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
`styles.css` usa comentarios numerados del 1 al 26. `editorial.css` continúa a
partir de la 27. La última es la **38 — partitura tonal y elevación**, que da a cada
sección su banda redefiniendo los *tokens*, no los colores (ver `INV-STYLE-004`).
La **39 — portadas** apaga las ilustraciones de IA en reposo y les devuelve el color
al pasar por encima.
La **40 — velo de código** revela SQL y Python alrededor del cursor.
**La próxima sección disponible es la 41, en `editorial.css`.**

**Nada decorativo por encima del texto** (`INV-STYLE-005`): el velo va en `z-index:1`
con `pointer-events:none` y el contenido de cada sección sube a `z-index:2`. Se
demuestra con el orden de apilado, no bajando la opacidad hasta que parezca aceptable.
Los fragmentos de código son inventados — la regla de confidencialidad también aplica a
la decoración.

**Una sola tipografía: Inter.** La jerarquía sale del tamaño, el peso y el espacio.
Se probó una segunda familia y se revirtió — `ADR-0002` dice por qué y qué tendría
que cumplir otra propuesta.

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

## NAS Synology
> Host, usuario SSH, DDNS e IPs **no se escriben aquí**: este fichero se sirve en
> `/CLAUDE.md`. Están en la memoria local de Claude (`reference_nas_connection`), que no
> se commitea.
- **Sin autenticación por clave:** el SSH pide contraseña, así que Claude no puede desplegar.
  Para habilitarlo, Miguel lanza `ssh-copy-id` contra el NAS.
- **Nota Docker:** versión 20.10.3 — incompatible con imágenes modernas (error `invalid tar header`).
  Actualizar el paquete Docker desde DSM antes de hacer `docker pull` de imágenes nuevas.

## Chatbot
Panel de chat en la landing. **Se apaga y se enciende con un atributo:** `data-chat="on"`
en `<body>` de `index.html`. Hoy está en `off` a propósito, porque sin el Worker desplegado
cada mensaje fallaría y un widget visiblemente roto es peor que no tenerlo.

- **Frontend:** `js/chat.js` + sección 34 de `editorial.css`. Vanilla, sin build, como todo
  lo demás. Idioma EN/ES siguiendo el atributo `lang` del `<html>`.
- **Backend:** `chatbot/`, un Worker de Cloudflare montado en una **ruta del propio dominio**
  (`/api/chat`), no en `workers.dev`. Así el navegador llama al mismo origen del que cargó
  la página: sin CORS, sin segundo hostname y con el sitio estático intacto en el NAS.
- **Depende del dominio en Cloudflare.** Hasta que la zona exista no hay dónde enganchar
  la ruta. Ver la sección del apex.

`chatbot/` **se sirve públicamente**, como todo el repo. Es deliberado: no hay nada secreto
(la clave vive en Workers Secrets) y el código propio legible suma en una página cuya mayor
carencia es justo esa. `node_modules/`, `.wrangler/` y `.dev.vars` sí están en `.gitignore`.

El conocimiento del bot está entero en `chatbot/src/profile.ts`: sin RAG, sin base de datos.
Lleva también los límites — nada de cifras inventadas, nada de datos del empleador, nada de
preguntas discriminatorias en selección, y la lista de cosas que Miguel aún no ha decidido
(salario, preaviso, movilidad, idiomas, formación), que deriva por email en vez de adivinar.

**Antes de encenderlo:** poner un límite de gasto mensual en la consola de Anthropic. Los
topes del código acotan el daño; el límite de cuenta lo cierra. Detalle en `chatbot/README.md`.

## Qué NO escribir en este fichero
El repo **es** la raíz web: `CLAUDE.md`, `README.md` y `.gitignore` se sirven en internet
(compruébalo con `curl https://www.miguelcastillo.es/CLAUDE.md`). No pongas aquí IPs,
hostnames DDNS, usuarios SSH ni rutas absolutas del NAS. Esos datos viven en la memoria
local de Claude. Lo ideal es además bloquearlos en Nginx — ver la sección de despliegue.

## Deployment
El web root del NAS es un clon de este repo y **no se sincroniza solo**. Hacer push no basta.
```bash
git push origin master
# y después, por SSH en el NAS:
~/deploy-landing.sh
```
**El `.git` ya no está en la raíz web.** Se sirvió públicamente durante meses (cualquiera
podía reconstruir el historial con `git-dumper`), así que se movió al home y el árbol de
trabajo se maneja con un git dir separado. De ahí el script, que envuelve:
```bash
git --git-dir=$HOME/landing-git.git --work-tree=<web-root> pull origin master
```
Un `cd <web-root> && git pull` **ya no funciona** ahí: no hay repo. Y no vuelvas a poner un
`.git` en la raíz web, ni siquiera el fichero `gitdir:` — Nginx lo serviría como texto plano.
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
git config --global --add safe.directory <web-root>   # dueño distinto del repo
git config core.autocrlf false                          # en Linux sobra y rompe los pull
git reset --hard origin/master                          # si checkout -- . no limpia el índice
```
Antes de un `reset --hard`, respaldar y comprobar que no se pierde nada propio del NAS:
```bash
tar czf ~/web-backup-$(date +%F).tgz -C <web-root> .   # al home, NUNCA al web root
git diff --ignore-cr-at-eol --stat origin/master -- <ficheros>
```

## Próximas features planificadas
- **Evidencia verificable:** es la carencia mayor de la página. Cero enlaces a GitHub, repos
  o dashboards públicos. Lo que más movería la aguja es reconstruir los dashboards de Tableau
  con datos sintéticos en Tableau Public y enlazarlos.
- **Dominio sin `www` — EN CURSO.** Plan elegido: mover el DNS a Cloudflare. Procedimiento
  completo en la sección siguiente; el diagnóstico ya está hecho y verificado dos veces.
- **Chatbot, fases 2 y 3:** voz. La entrada por voz sale gratis con la Web Speech API del
  navegador. La salida con voz clonada **no cabe en un Worker** (sin GPU y con límite de CPU):
  o un servicio GPU de pago por uso, o pregenerar los audios de las preguntas más probables y
  servirlos estáticos. Si habla con su voz, **etiquetarlo como IA de forma visible**.
- **Sección de noticias (#news):** n8n cron diario → RSS feeds (TechCrunch AI, Healthcare IT News,
  MobiHealthNews) → `<web-root>/news.json` → frontend fetch y render de cards.
  Pendiente de: actualizar Docker en NAS para poder hacer pull de n8n actualizado.

## Dominio sin `www` — plan: Cloudflare
Medido el 2026-09-19 y **reverificado el 2026-09-19**; idéntico las dos veces.
```
http://miguelcastillo.es       200, aparcamiento del registrador
https://miguelcastillo.es      fallo TLS (alert 80, sin certificado)
http://www.miguelcastillo.es   200, sin redirigir a HTTPS
https://www.miguelcastillo.es  200, la web (vía DDNS del NAS)
```
**Son dos fallos, no uno:**
1. **DNS:** el apex apunta al registrador, no al NAS.
2. **Certificado:** el del NAS tiene SAN **solo** `www.miguelcastillo.es`. Ninguno cubre el apex.

La zona es mínima: A del apex al aparcamiento, CNAME `www` al DDNS y un TXT de verificación
del registrador. **Sin registros MX** — no hay correo en el dominio, así que mover los
nameservers no puede romper ningún buzón. Comprobado, no asumido.

### Por qué Cloudflare y no un registro A
La IP de casa es dinámica (de ahí el DDNS) y el apex **no admite CNAME** por estándar. Un
registro A fijo al apex se rompe el día que el router coja otra IP. El *CNAME flattening* de
Cloudflare resuelve el CNAME del apex en el borde y devuelve un A, así que el apex sigue al
DDNS solo. Gratis. El dominio sigue registrado donde está: solo cambian los nameservers.

De paso resuelve otras dos cosas: el proxy **oculta la IP doméstica**, hoy pública en el DNS,
y *Always Use HTTPS* da el **301 de HTTP a HTTPS** que hoy no existe.

### Procedimiento (el orden importa)
1. Alta en Cloudflare, añadir el dominio, plan Free. Importa la zona sola.
2. Dejar exactamente: apex → `CNAME` al DDNS del NAS **proxied**; `www` → `CNAME` al DDNS
   **proxied**; el TXT de verificación. **Borrar la A del aparcamiento.**
3. Cambiar los nameservers en el registrador a los dos que dé Cloudflare.
4. SSL/TLS → **Full**. Nunca *Flexible* (deja el tramo Cloudflare↔NAS en claro).
   *Full (strict)* solo después del paso 6.
5. **Web Station del DSM: añadir `miguelcastillo.es` como host del portal**, junto a `www`.
   Cloudflare reenvía el `Host:` original; si el vhost no lo reconoce, el apex cae en el
   sitio por defecto del NAS. Es el paso que más fácil se olvida.
6. Opcional pero recomendable: instalar un *Origin Certificate* de Cloudflare en el DSM
   (gratis, 15 años, cubre apex y `www`) y subir a *Full (strict)*. Con el proxy activo el
   certificado del NAS ya no lo ve ningún visitante, solo Cloudflare.

**Con proxy no hace falta reemitir el Let's Encrypt del NAS para el apex.** Cloudflare
termina el TLS del visitante con su propio certificado, que cubre apex y `www`.

### Verificación
```bash
curl -sI https://miguelcastillo.es | head -1          # 200, no fallo TLS
curl -sI http://miguelcastillo.es | head -2           # 301 a https
dig +short miguelcastillo.es                          # IPs de Cloudflare, no la de casa
```

Ya hecho en el repo, para que el apex no duplique la indexación: `<link rel="canonical">`
en `index.html` y `cv.html`, y `og:url` / `og:site_name` en el `<head>` de la landing.
Ambos apuntan a `https://www.miguelcastillo.es` — **`www` es la forma canónica**, el apex
solo tiene que llegar. Si algún día se invierte, hay que cambiar las dos etiquetas.

# Portfolio Landing Page

Personal portfolio for Miguel Castillo, positioned for data analyst and BI roles.
HTML, CSS and vanilla JavaScript with an English/Spanish toggle. Fully static:
no build step, no server-side code.

Live at [www.miguelcastillo.es](https://www.miguelcastillo.es).

## Sections
- **Hero** — staggered entry animation, responsive WebP portrait.
- **Stats** — animated counters.
- **Analytical cases** — three service-analytics case studies, each with an
  animated SVG diagram and a modal describing the data work behind it.
- **Capabilities** — data preparation, analysis and visualisation.
- **About** — biography and capability bars.
- **Projects** — seven applications, each with a detail modal.
- **Experience** — timeline carrying the analytical work done in each role.
- **Contact** — email, phone, LinkedIn and CV links.

## Confidentiality

Every figure in the dashboards and case diagrams is synthetic and deliberately
blurred. Nothing shown is derived from customer, contract or employer data, and
de-blurring recovers invented values only. Keep it that way: if you add a new
visual, generate the numbers rather than reusing a real report, and say so in
the caption.

## Local development

```bash
python -m http.server 4390
```

Then open <http://localhost:4390>. The site is static, so this serves the real
thing — there is nothing that only works in production.

## Deployment

The NAS web root is a clone of this repository and **does not sync by itself**;
pushing to GitHub is not enough.

```bash
git push origin master
```

```bash
ssh admin@192.168.1.35
```

```bash
cd /volume1/web && git pull origin master
```

Bump the `?v=` query string on the CSS and JS links in `index.html` whenever you
change those files, or returning visitors keep the cached copies. The same
applies to any asset you replace in place, such as the case diagrams.

Keep the repository limited to files the site actually serves: it *is* the web
root, so anything committed is publicly reachable. `.gitignore` already excludes
the development artefacts.

# Portfolio Landing Page

This is a personal portfolio landing page built with HTML, CSS, and localized JavaScript (English/Spanish).

## Features
- **Hero Section**: Dynamic introduction.
- **Experience Timeline**: Professional history.
- **Data Projects**: Highlighted dashboards and BI projects.
- **Contact Form**: Integrated with n8n webhook for submissions.
- **Localization**: EN/ES language toggle.

## n8n Integration
The contact form submits data to an n8n webhook:
- **Webhook URL**: `your n8n webhook url `
- **Method**: GET
- **Payload**: `name`, `email`, `message`

The workflow definition is included in the project as `formulario_landing_page.json`.

## Local Development
1. Clone the repository.
2. Open `index.html` in your browser or run a local server (e.g., `python -m http.server`).

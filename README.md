# Portfolio Landing Page

This is a personal portfolio landing page built with HTML, CSS, and localized JavaScript (English/Spanish).

## Features
- **Hero Section**: Dynamic introduction.
- **Experience Timeline**: Professional history.
- **Data Projects**: Highlighted dashboards and BI projects.
- **Contact Form**: PHP receiver with authenticated Gmail SMTP delivery.
- **Localization**: EN/ES language toggle.

## Formulario con Gmail — configuración pendiente en el NAS

El navegador envía JSON a `contact.php`. PHP valida la petición y envía un correo
desde y hacia la cuenta Gmail configurada; al responder, el destinatario será el
visitante. El workflow n8n se conserva únicamente como backup histórico.

1. En Web Station, configurar este sitio con PHP 8.2 o superior, OpenSSL y salida
   de red a Gmail por el puerto 465. Desactivar `display_errors` en producción.
2. Crear `/volume1/landing-private/`, fuera de `/volume1/web/`. Copiar allí
   `deploy/composer.json` y ejecutar `composer install --no-dev --prefer-dist
   --no-interaction --no-plugins --no-scripts`. Conservar el archivo lock generado
   y comprobar `composer audit` antes de activar el endpoint.
3. Copiar `deploy/contact-config.example.php` a
   `/volume1/landing-private/contact-config.php`. Configurar la contraseña de
   aplicación de Gmail (no la contraseña normal) y un secreto aleatorio de al
   menos 32 bytes para `rate_secret`. No compartirlos en el chat ni subirlos a Git.
   Google requiere verificación en dos pasos y que la cuenta admita contraseñas
   de aplicación: https://support.google.com/accounts/answer/185833?hl=es
4. Crear `/volume1/landing-private/state/`. Permitir al proceso PHP leer la
   configuración y dependencias, y escribir únicamente en `state/`. Impedir acceso
   a otros usuarios del NAS. La configuración también puede localizarse mediante
   la variable de entorno `LANDING_CONTACT_CONFIG`.
5. Publicar `contact.php`, HTML, CSS y JavaScript. No publicar configuración real,
   dependencias, archivos de estado ni la carpeta `deploy/`.
6. Ejecutar `php -l contact.php`. Probar campos vacíos y email inválido; después,
   con autorización para el envío, enviar un mensaje de prueba desde el dominio
   público, verificar recepción en Gmail y que «Responder» apunta al remitente.
   Comprobar también un fallo de credenciales: debe aparecer un error y conservar
   los campos. La aceptación SMTP no garantiza llegada a la bandeja de entrada.

Protecciones: JSON y origen permitido, tamaños máximos, campo trampa, destinatario
fijo, texto plano y límite de 5 intentos por IP y 30 globales por hora. Los intentos
fallidos de SMTP también consumen el límite. No se confía en `X-Forwarded-For`:
si un proxy oculta la IP del cliente, varios visitantes compartirán el límite.
El archivo de estado solo contiene contadores, caducidades e IPs seudonimizadas;
se depura durante las peticiones. No se guardan copias locales de mensajes.

Estado de validación: integración y sintaxis JavaScript revisadas localmente.
PHP, dependencias y entrega SMTP requieren validación en el NAS; no hay PHP ni
Composer instalados en el entorno local. El acceso SSH disponible fue rechazado.

## Local Development
1. Clone the repository.
2. For visual preview, run `python -m http.server`. This does not execute PHP:
   the contact form requires the PHP environment described above.

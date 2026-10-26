# DECISIONS.md — KuKo Nights

Registro de decisiones tomadas donde el brief dejaba margen o había restricciones del entorno.

## Fase 0
- **Concepto elegido:** «Una noche entera» (dial de la noche 21:00→07:30 + escenas horizontales), con la escena *ANTES* usando la intimidad del "chat" para la previa/selector/lista. Elegido por el usuario.
- **Stack:** *Static lean* (HTML + CSS + JS vanilla, datos en archivos, i18n con diccionario), NO Next.js/R3F.
  - **Motivo:** el 80-90% del tráfico llega por el navegador interno de Instagram/TikTok, donde el presupuesto de rendimiento (LCP < 2,5s, JS < 250KB, Lighthouse ≥85) es crítico. Un stack con Three.js/R3F lo pone en riesgo. Lean cumple los KPIs y se previsualiza/despliega igual en Vercel. El 3D queda como mejora opcional futura bajo detección de GPU / `prefers-reduced-motion`.

## Arquitectura
- **Datos en `/data/*.js`** (no `.json`) para que la web funcione también abriendo `index.html` en local (`file://`), donde `fetch()` de JSON está bloqueado por CORS. Son objetos planos, igual de fáciles de editar que JSON. En Vercel (http) ambos funcionarían; mantener `.js` evita depender de un servidor.
- **Assets en `/assets`** (no `/public/assets`): al ir static, no hay carpeta `/public` de Next.
- **i18n**: diccionario ES/EN en `js/i18n.js` + atributos `data-i18n`. ES por defecto; recuerda la elección en `localStorage`.
- **Navegación por hash** (`#antes`, `#semana`…) para enlaces compartibles y botón atrás, sin romper el motor de escenas.
- **Degradación elegante**: sin JS o con `prefers-reduced-motion`, las escenas se apilan en una página vertical normal (todo el contenido es HTML real → también bueno para SEO).

## Contenido / negocio
- **Lista sin backend**: el formulario arma un mensaje de **WhatsApp** (+34 697 63 03 78). Es lo más simple y sin servidor. Alternativa de captura por email (Formspree/Google Sheets) documentada en el README.
- **Entradas**: `ticketUrl` vacío → botón "Entradas · [pronto]". Cuando haya Fourvenues/Xceed, se rellena en `data/events.js`.
- **Analítica**: stub con consentimiento (banner de cookies). GA4/Meta Pixel como placeholders en `.env.example`; solo se activarían tras "Aceptar".
- **Tono**: aplicado el banco de microcopy del brief; NUNCA "chicas gratis" como titular; condiciones de acceso como detalle.

## Confirmado (22/10/2026)
- **Dress code:** "Casual, arreglado" (EN: Smart casual) — aplicado a todos los locales.
- **Edad:** +21 — aplicado en footer y legal.
- **Evento 3-oct (Terminal Zero):** ya pasó. "Próximos eventos" ahora muestra **solo futuros**; los pasados no aparecen ahí. (El seed del 26-sep y el del 3-oct quedan en `events.js` como histórico, pero no se listan por ser pasados → ambos eventos seed están ya en el pasado, así que la sección muestra el estado "pronto más fechas" hasta que añadas una fecha futura.)

## Pendiente de confirmar
- Dirección de Nix: **Diputació 92 vs 94**.
- "Gratis hasta la 1:30": ¿aplica **solo a ellas**?
- **Próxima fecha real** (para que "Próximos eventos" no esté vacío).
- Imagen **OG 1200×630** y **dominio** real (para canonical/OG).

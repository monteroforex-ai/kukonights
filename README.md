# KuKo Nights — web inmersiva (Fase 1: home)

Experiencia «Una noche entera»: la home es una noche que se recorre con un **dial (21:00→07:30)**, swipe, flechas o teclado. Construida *static lean* (sin build), mobile-first, ES + EN.

## Cómo probarla
- **Local:** abre `index.html` en el navegador (doble clic). Funciona sin servidor.
- **Deploy:** sube la carpeta a **Vercel** (framework preset: *Other*). Es estático.

### Checklist de pruebas (del brief)
- [ ] Móvil real (iOS Safari / Chrome Android)
- [ ] Navegador interno de Instagram (abre el enlace desde una story/bio)
- [ ] Modo ahorro de batería / `prefers-reduced-motion` → debe verse como página vertical calmada
- [ ] Teclado (←/→, Home/End, Esc) y foco visible

## Estructura
```
kukonights/
├─ index.html            ← escenas (contenido real HTML para SEO)
├─ css/styles.css        ← sistema visual propio (morado/ciruela/rosa/cromo)
├─ js/
│  ├─ i18n.js            ← diccionario ES/EN + motor
│  └─ app.js             ← dial, escenas, eventos, galería, formulario, consentimiento
├─ data/
│  ├─ events.js          ← PRÓXIMOS EVENTOS (edita aquí)
│  ├─ venues.js          ← DISCOTECAS
│  ├─ formats.js         ← "Nuestras noches" (Ladies Night, Tardeo…)
│  └─ gallery.js         ← fotos/vídeos de eventos pasados
├─ assets/               ← logo, flyers, fotos, vídeos (ver assets/LEEME.txt)
├─ legal.html  ·  .env.example  ·  DECISIONS.md
```

## Añadir un evento nuevo (2 minutos)
Abre `data/events.js`, copia un bloque y edita:
```js
{
  id: "mi-evento-2026-11-07",
  slug: "mi-evento",
  title: { es: "Nombre", en: "Name" },
  format: "ladies",                 // id de data/formats.js
  venueId: "nix",                   // id de data/venues.js
  startsAt: "2026-11-07T00:00:00+01:00",   // hora de Madrid (+02:00 verano / +01:00 invierno)
  endsAt:   "2026-11-07T07:00:00+01:00",
  accessNote: { es: "…", en: "…" },
  flyerImage: "assets/events/mi-flyer.png",
  ticketUrl: "",                    // enlace Fourvenues/Xceed (vacío => WhatsApp)
  coOrganizers: [], audiences: ["barcelona"]
}
```
La web lo ordena por fecha y lo marca "próximo" o "pasado" solo (zona horaria Europe/Madrid). Para discotecas edita `data/venues.js`; para la galería, `data/gallery.js`.

## Idiomas
Textos de interfaz en `js/i18n.js` (claves `data-i18n`). Contenido de datos lleva `{ es, en }`. Botón **EN/ES** arriba a la derecha.

## Capturar leads por email (opcional, en vez de WhatsApp)
Hoy el formulario abre WhatsApp (sin backend). Para recibir altas por email:
1. Crea un form en **Formspree** y copia tu endpoint.
2. En `js/app.js`, dentro del `submit`, sustituye el `window.open(wa(...))` por un `fetch(FORMSPREE_URL, { method:"POST", body: new FormData(form) })`.
3. Pon el endpoint en `.env.example` → `FORMSPREE_URL`.

## Analítica
Stub con consentimiento (banner de cookies). Rellena IDs en `.env.example` (GA4 / Meta Pixel) y descomenta la init en `track()` de `app.js`. Eventos emitidos: `rsvp_click`, `whatsapp_click`, `tickets_click`, `audience_selected`, `gallery_open`, `list_signup`. Los enlaces salientes conservan los UTM.

## Rendimiento
Sin librerías, fuentes con `display=swap`, imágenes `loading=lazy`, vídeos `muted playsinline`. Para cumplir LCP < 2,5s: comprime flyers/fotos a WebP y vídeos a < 3-4 MB.

## Pendiente (Hito 2+)
EN final afinado, OG por evento (1200×630), landings `/barcelona` `/visitors` `/el-prat`, mejoras WebGL opcionales, y resolver los `[CONFIRMAR]` (ver DECISIONS.md).

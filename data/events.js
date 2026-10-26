/* ============================================================
   KuKo Nights · EVENTOS  (data/events.js)
   Para añadir un evento, copia un bloque y edítalo (2 min).
   - startsAt / endsAt: ISO con zona horaria de Madrid (+02:00 en verano / +01:00 en invierno)
   - La web marca solo "próximo" o "pasado" según la fecha.
   - ticketUrl: enlace de entradas (Fourvenues/Xceed). Vacío => se usa WhatsApp.
   - audiences: ["barcelona","visitors","elprat"]  (para futuras landings)
   ============================================================ */
window.KUKO_EVENTS = [
  {
    id: "ladies-nix-2026-09-26",
    slug: "ladies-night-nix",
    title: { es: "Ladies Night", en: "Ladies Night" },
    format: "ladies",
    venueId: "nix",
    startsAt: "2026-09-26T00:00:00+02:00",
    endsAt: "2026-09-26T07:30:00+02:00",
    accessNote: {
      es: "Entrada gratis hasta la 1:30  [CONFIRMAR si aplica solo a ellas]. Ellos: entrada con consumición.",
      en: "Free entry until 1:30  [CONFIRM if women-only]. Men: entry with a drink."
    },
    flyerImage: "assets/events/nix-26.png",
    ticketUrl: "",
    coOrganizers: ["@exclus1vbcn"],
    audiences: ["barcelona", "visitors"]
  },
  {
    id: "terminal-zero-2026-10-03",
    slug: "noche-kuko-terminal-zero",
    title: { es: "Noche KuKo · Terminal Zero  [CONFIRMAR nombre]", en: "KuKo Night · Terminal Zero  [CONFIRM name]" },
    format: "[CONFIRMAR]",
    venueId: "terminal-zero",
    startsAt: "2026-10-03T00:00:00+02:00",
    endsAt: "2026-10-03T07:00:00+02:00",
    accessNote: {
      es: "Taxi organizado por KuKo para llegar cómoda. Formato y detalles por confirmar.",
      en: "Taxi organised by KuKo so you arrive easy. Format & details TBC."
    },
    flyerImage: "assets/events/tz-03.png",
    ticketUrl: "",
    coOrganizers: [],
    audiences: ["elprat", "barcelona"]
  }
];

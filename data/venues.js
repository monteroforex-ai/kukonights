/* ============================================================
   KuKo Nights · DISCOTECAS  (data/venues.js)
   Contenido editable. Para añadir un local, copia un bloque.
   zone: "barcelona" | "elprat"
   vibeTags: etiquetas de vibra (sirven para los filtros)
   Campos bilingües: { es:"…", en:"…" }
   ============================================================ */
window.KUKO_VENUES = [
  {
    id: "nix",
    name: "Nix Barcelona",
    zone: "barcelona",
    kukoSpot: true,
    address: "Carrer de la Diputació, 92  [CONFIRMAR 92/94] · Eixample, Barcelona",
    near: { es: "Cerca del metro Rocafort (L1)", en: "Near Rocafort metro (L1)" },
    vibeTags: ["latino", "club", "céntrico", "fotogénico"],
    night: { es: "Sábados · noche latina (en recuperación con KuKo)", en: "Saturdays · latin night (relaunching with KuKo)" },
    dress: { es: "Casual, arreglado", en: "Smart casual" },
    howToGet: { es: "Metro L1 Rocafort a 3 min. En taxi/VTC, parada en la puerta.", en: "Metro L1 Rocafort, 3 min walk. Taxi/VTC drops at the door." },
    transportNote: { es: "", en: "" },
    desc: { es: "Local céntrico y reformado, estilo club de Miami. Foto en cada esquina.", en: "Central, renovated venue — Miami-club style. A photo in every corner." },
    media: ["assets/venues/nix/1.jpg", "assets/venues/nix/2.jpg"],
    instagram: "https://instagram.com/kukonights",
    coOrganizer: "@exclus1vbcn"
  },
  {
    id: "terminal-zero",
    name: "Terminal Zero",
    zone: "elprat",
    kukoSpot: true,
    address: "Ctra. El Prat a Sant Boi, Km 3.1 · El Prat de Llobregat, Barcelona",
    near: { es: "El Prat de Llobregat", en: "El Prat de Llobregat" },
    vibeTags: ["latino", "reggaeton", "club"],
    night: { es: "Fines de semana · sesiones latinas y tardeos", en: "Weekends · latin sessions & day parties" },
    dress: { es: "Casual, arreglado", en: "Smart casual" },
    howToGet: { es: "En los eventos KuKo organizamos taxi para llegar con total comodidad.", en: "For KuKo events we organise a taxi so you arrive with zero hassle." },
    transportNote: { es: "Taxi organizado por KuKo", en: "Taxi organised by KuKo" },
    desc: { es: "La casa del tardeo y las noches latinas en El Prat. Tu música, en tu zona.", en: "Home of the day-party and latin nights in El Prat. Your music, in your area." },
    media: ["assets/venues/terminal-zero/1.jpg"],
    instagram: "https://instagram.com/kukonights",
    coOrganizer: ""
  }
];

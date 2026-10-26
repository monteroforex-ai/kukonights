// ============================================================
//  GET /api/events  —  proxy seguro a la API de Fourvenues
//  La clave (ik_live_...) se lee de la VARIABLE DE ENTORNO
//  FOURVENUES_API_KEY (en Vercel: Settings → Environment Variables).
//  NUNCA se escribe la clave en el código ni se expone al navegador.
//  Devuelve { upcoming:[...], past:[...] } ya normalizado.
//  Docs: https://docs.fourvenues.com/integrations/api-reference/events/get-events
// ============================================================
module.exports = async (req, res) => {
  const KEY = process.env.FOURVENUES_API_KEY;
  if (!KEY) {
    return res.status(500).json({ error: "Falta FOURVENUES_API_KEY en las variables de entorno." });
  }

  try {
    const DAY = 86400000;
    const now = Date.now();
    const iso = (ms) => new Date(ms).toISOString().slice(0, 10);
    // Rango amplio: 180 días atrás (pasados) a 120 días adelante (próximos)
    const url = "https://api.fourvenues.com/integrations/events/"
      + "?start=" + iso(now - 180 * DAY)
      + "&end="   + iso(now + 120 * DAY);

    const r = await fetch(url, { headers: { "x-api-key": KEY, "Accept": "application/json" } });
    if (!r.ok) {
      return res.status(502).json({ error: "Fourvenues respondió " + r.status });
    }
    const json = await r.json();
    const list = (json && json.data) || [];
    const nowS = Math.floor(now / 1000); // la API usa timestamps en segundos

    const norm = (e) => ({
      id: e._id,
      name: e.name || "",
      start: e.start || e.date || 0,
      end: e.end || e.start || e.date || 0,
      flyer: e.flyer || "",
      url: e.url || "",
      town: e.location_town || "",
      artists: Array.isArray(e.artists) ? e.artists : []
    });

    const upcoming = list.filter((e) => (e.end || e.start || e.date || 0) >= nowS).map(norm).sort((a, b) => a.start - b.start);
    const past     = list.filter((e) => (e.end || e.start || e.date || 0) <  nowS).map(norm).sort((a, b) => b.start - a.start);

    // Cache en el edge de Vercel: 5 min (reduce llamadas a Fourvenues)
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json({ upcoming, past });
  } catch (err) {
    return res.status(500).json({ error: "No se pudieron cargar los eventos." });
  }
};

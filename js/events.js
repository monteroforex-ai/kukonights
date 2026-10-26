/* KuKo Nights · events.js — pinta próximos/pasados desde /api/events
   (que a su vez consulta Fourvenues en el servidor, con la clave segura).
   Si la función no está disponible (preview local, sin desplegar), muestra
   un fallback con el enlace a la agenda. */
(function () {
  "use strict";
  var up = document.getElementById("fv-upcoming");
  var pa = document.getElementById("fv-past");
  var ve = document.getElementById("fv-venue"); // ficha de local: filtra por data-town
  if (!up && !pa && !ve) return;

  var LANG = document.documentElement.lang === "en" ? "en" : "es";
  var FV = "https://site.fourvenues.com/es/elwaachi";
  var T = {
    es: { loading: "Cargando eventos…", tickets: "Entradas", none: "Pronto más fechas.", agenda: "Ver toda la agenda", past: "Eventos pasados" },
    en: { loading: "Loading events…", tickets: "Tickets", none: "More dates soon.", agenda: "See the full agenda", past: "Past events" }
  }[LANG];

  function fmtDate(s) {
    try {
      return new Date(s * 1000).toLocaleDateString(LANG === "en" ? "en-GB" : "es-ES",
        { weekday: "long", day: "numeric", month: "long", timeZone: "Europe/Madrid" });
    } catch (e) { return ""; }
  }

  function card(e, past) {
    var pic = e.flyer
      ? '<img src="' + e.flyer + '" alt="' + e.name + '" loading="lazy" onerror="this.remove()">'
      : '';
    var artists = (e.artists && e.artists.length) ? '<p class="evc-a">' + e.artists.join(" · ") + "</p>" : "";
    var cta = past ? "" : '<a class="btn pink" href="' + (e.url || FV) + '" target="_blank" rel="noopener">' + T.tickets + "</a>";
    return '<article class="evc' + (past ? " past" : "") + '">' +
      '<div class="evc-pic">' + pic + '<span class="ph">' + (e.name || "KuKo") + "</span></div>" +
      '<div class="evc-b"><h3>' + e.name + "</h3>" +
      '<p class="evc-m">' + fmtDate(e.start) + (e.town ? " · " + e.town : "") + "</p>" +
      artists + cta + "</div></article>";
  }

  function fallback() {
    return '<p class="note">' + T.none + ' <a href="' + FV + '" target="_blank" rel="noopener">' + T.agenda + " →</a></p>";
  }
  function hidePast() { var s = document.getElementById("fv-past-sec"); if (s) s.style.display = "none"; }

  if (up) up.innerHTML = '<p class="note">' + T.loading + "</p>";
  if (ve) ve.innerHTML = '<p class="note">' + T.loading + "</p>";

  fetch("/api/events")
    .then(function (r) { if (!r.ok) throw new Error("bad"); return r.json(); })
    .then(function (d) {
      if (up) up.innerHTML = (d.upcoming && d.upcoming.length) ? d.upcoming.map(function (e) { return card(e, false); }).join("") : fallback();
      if (pa) {
        if (d.past && d.past.length) pa.innerHTML = d.past.map(function (e) { return card(e, true); }).join("");
        else hidePast();
      }
      if (ve) {
        var town = (ve.getAttribute("data-town") || "").toLowerCase();
        var list = (d.upcoming || []).filter(function (e) {
          return !town || (e.town || "").toLowerCase().indexOf(town) !== -1;
        });
        ve.innerHTML = list.length ? list.map(function (e) { return card(e, false); }).join("") : fallback();
      }
    })
    .catch(function () {
      // Sin backend (preview local) o error → fallback a la agenda
      if (up) up.innerHTML = fallback();
      if (ve) ve.innerHTML = fallback();
      hidePast();
    });
})();

/* KuKo Nights · home.js — galería inmersiva (autoplay) + lightbox. Compartido por index.html y en.html */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(pointer:fine)").matches;
  var LANG = (document.documentElement.lang === "en") ? "en" : "es";
  function lbl(l) { return (l && (l[LANG] || l.es || l)) || ""; }

  /* Spotlight */
  if (fine && !reduce) {
    addEventListener("pointermove", function (e) {
      document.documentElement.style.setProperty("--mx", e.clientX + "px");
      document.documentElement.style.setProperty("--my", e.clientY + "px");
    });
  }

  /* ---- GALERÍA ---- */
  var GAL = window.KUKO_GALLERY || [];
  var track = document.getElementById("track");
  var strip = document.getElementById("strip");
  if (!track) return;

  function tileHTML(g) {
    var lab = lbl(g.label);
    var media = g.type === "video"
      ? '<video data-src="' + g.src + '" poster="' + (g.poster || "") + '" muted loop playsinline preload="none" onerror="this.remove()"></video><span class="live"><i></i> LIVE</span>'
      : '<img src="' + g.src + '" alt="' + lab + '" loading="lazy" onerror="this.remove()">';
    return '<figure class="tile" data-g="' + GAL.indexOf(g) + '" tabindex="0" role="button" aria-label="' + lab + '">' +
      '<span class="ph">KuKo</span>' + media + '</figure>';
  }
  track.innerHTML = GAL.map(tileHTML).join("") + GAL.map(tileHTML).join("");

  // Carga diferida + reproducir solo cuando están (casi) visibles.
  // El vídeo no se descarga hasta que se acerca a pantalla; así la carga
  // inicial es casi 0 MB y solo bajas lo que realmente ves.
  if ("IntersectionObserver" in window) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (!v.src && v.dataset.src) { v.src = v.dataset.src; } // descarga al entrar
          v.play && v.play().catch(function () {});
        } else {
          v.pause && v.pause();
        }
      });
    }, { threshold: .25, rootMargin: "300px" });
    track.querySelectorAll("video").forEach(function (v) { vio.observe(v); });
  } else {
    // Navegadores sin IntersectionObserver: carga directa
    track.querySelectorAll("video").forEach(function (v) { if (v.dataset.src) { v.src = v.dataset.src; v.play && v.play().catch(function () {}); } });
  }

  // Auto-desplazamiento continuo + pausa al interactuar + arrastre
  var half = 0;
  function measure() { half = track.scrollWidth / 2; }
  addEventListener("load", measure); setTimeout(measure, 300); addEventListener("resize", measure);
  var paused = false, pos = 0;
  (function loop() {
    if (!paused && !reduce && half) { pos += 0.4; if (pos >= half) pos -= half; strip.scrollLeft = pos; }
    else { pos = strip.scrollLeft % (half || 1); }
    requestAnimationFrame(loop);
  })();

  var down = false, sx = 0, sl = 0, moved = false;
  track.addEventListener("pointerdown", function (e) { down = true; paused = true; moved = false; sx = e.clientX; sl = strip.scrollLeft; track.classList.add("drag"); });
  track.addEventListener("pointermove", function (e) { if (down) { var dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; strip.scrollLeft = sl - dx; pos = strip.scrollLeft; } });
  function up() { down = false; track.classList.remove("drag"); setTimeout(function () { paused = false; }, 1200); }
  track.addEventListener("pointerup", up); track.addEventListener("pointercancel", up);
  strip.addEventListener("pointerenter", function () { paused = true; });
  strip.addEventListener("pointerleave", function () { if (!down) paused = false; });

  // Lightbox
  var lb = document.getElementById("lb"), lbInner = document.getElementById("lbInner");
  function openLB(i) {
    var g = GAL[i]; if (!g) return;
    lbInner.innerHTML = g.type === "video" ? '<video src="' + g.src + '" controls autoplay loop playsinline></video>' : '<img src="' + g.src + '" alt="">';
    lb.classList.add("on");
  }
  function closeLB() { lb.classList.remove("on"); lbInner.innerHTML = ""; }
  track.addEventListener("click", function (e) { if (moved) return; var t = e.target.closest(".tile"); if (t) openLB(parseInt(t.getAttribute("data-g"), 10)); });
  document.getElementById("lbX").addEventListener("click", closeLB);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLB(); });
  addEventListener("keydown", function (e) { if (e.key === "Escape") closeLB(); });

  // Menú de navegación (hamburguesa en móvil)
  var navToggle = document.getElementById("navToggle"), nav = document.getElementById("nav");
  if (navToggle && nav) {
    var setNav = function (open) {
      nav.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? (LANG === "en" ? "Close menu" : "Cerrar menú") : (LANG === "en" ? "Open menu" : "Abrir menú"));
    };
    navToggle.addEventListener("click", function () { setNav(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });
    document.addEventListener("click", function (e) { if (!nav.contains(e.target) && !navToggle.contains(e.target)) setNav(false); });
    addEventListener("keydown", function (e) { if (e.key === "Escape") setNav(false); });
  }
})();

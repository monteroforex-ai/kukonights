/* ============================================================
   KuKo Nights · Consentimiento de cookies (RGPD)  js/consent.js
   - Autosuficiente: inyecta su propio CSS + HTML.
   - Bilingüe: detecta el idioma de <html lang>.
   - No carga NADA de terceros por sí mismo. Cuando tengas los
     píxeles, define window.kukoOnConsent = function(){ ...cargar
     Meta/TikTok Pixel... } y se ejecutará SOLO si el usuario acepta.
   - Guarda la elección en localStorage ("kuko_consent").
   - Para reabrir el panel: window.kukoOpenConsent()
   ============================================================ */
(function () {
  "use strict";
  var KEY = "kuko_consent";
  var lang = (document.documentElement.lang || "es").toLowerCase().indexOf("en") === 0 ? "en" : "es";

  var T = {
    es: {
      text: "Usamos cookies propias y de terceros para medir el tráfico y mejorar la web. Puedes aceptarlas todas o seguir solo con las esenciales.",
      accept: "Aceptar",
      reject: "Solo esenciales",
      more: "Más información",
      moreHref: "legal.html"
    },
    en: {
      text: "We use our own and third-party cookies to measure traffic and improve the site. You can accept all of them or continue with essential cookies only.",
      accept: "Accept",
      reject: "Essential only",
      more: "Learn more",
      moreHref: "legal.html"
    }
  }[lang];

  function store(val) {
    try { localStorage.setItem(KEY, val); } catch (e) {}
  }
  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function grant() {
    window.KUKO_CONSENT = "granted";
    store("granted");
    document.dispatchEvent(new CustomEvent("kuko-consent", { detail: "granted" }));
    if (typeof window.kukoOnConsent === "function") {
      try { window.kukoOnConsent(); } catch (e) {}
    }
  }
  function deny() {
    window.KUKO_CONSENT = "denied";
    store("denied");
    document.dispatchEvent(new CustomEvent("kuko-consent", { detail: "denied" }));
  }

  function injectStyles() {
    if (document.getElementById("kuko-consent-css")) return;
    var css = document.createElement("style");
    css.id = "kuko-consent-css";
    css.textContent =
      "#kuko-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:460px;" +
      "background:#fff;color:#131316;border:1px solid rgba(19,19,22,.12);border-radius:18px;" +
      "box-shadow:0 24px 60px -24px rgba(0,0,0,.35);padding:20px 22px;" +
      "font-family:'Poppins',system-ui,sans-serif;line-height:1.55;" +
      "transform:translateY(12px);opacity:0;transition:transform .28s ease,opacity .28s ease}" +
      "#kuko-consent.on{transform:none;opacity:1}" +
      "#kuko-consent p{margin:0 0 14px;font-size:13.5px;font-weight:300;color:#4a4a52}" +
      "#kuko-consent a.more{color:#131316;font-weight:600;text-decoration:underline;text-underline-offset:2px}" +
      "#kuko-consent .kc-row{display:flex;gap:9px;flex-wrap:wrap}" +
      "#kuko-consent button{cursor:pointer;font-family:inherit;font-weight:600;font-size:13.5px;border-radius:999px;padding:11px 20px;transition:.2s;border:1px solid rgba(19,19,22,.18)}" +
      "#kuko-consent .kc-accept{background:#131316;color:#fff;border-color:#131316}" +
      "#kuko-consent .kc-accept:hover{background:#000}" +
      "#kuko-consent .kc-reject{background:#fff;color:#131316}" +
      "#kuko-consent .kc-reject:hover{background:#f6f5f3}" +
      "@media(prefers-reduced-motion:reduce){#kuko-consent{transition:none}}";
    document.head.appendChild(css);
  }

  function buildBanner() {
    injectStyles();
    var box = document.createElement("div");
    box.id = "kuko-consent";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-live", "polite");
    box.setAttribute("aria-label", lang === "en" ? "Cookie consent" : "Consentimiento de cookies");
    box.innerHTML =
      '<p>' + T.text + ' <a class="more" href="' + T.moreHref + '">' + T.more + '</a></p>' +
      '<div class="kc-row">' +
        '<button type="button" class="kc-accept">' + T.accept + '</button>' +
        '<button type="button" class="kc-reject">' + T.reject + '</button>' +
      '</div>';
    document.body.appendChild(box);
    requestAnimationFrame(function () { box.classList.add("on"); });

    box.querySelector(".kc-accept").addEventListener("click", function () { grant(); close(box); });
    box.querySelector(".kc-reject").addEventListener("click", function () { deny(); close(box); });
  }

  function close(box) {
    box.classList.remove("on");
    setTimeout(function () { if (box && box.parentNode) box.parentNode.removeChild(box); }, 300);
  }

  // Reabrir el panel manualmente (p. ej. desde un enlace "Cookies" en el footer)
  window.kukoOpenConsent = function () {
    if (!document.getElementById("kuko-consent")) buildBanner();
  };

  function init() {
    var saved = read();
    if (saved === "granted") { window.KUKO_CONSENT = "granted"; if (typeof window.kukoOnConsent === "function") { try { window.kukoOnConsent(); } catch (e) {} } return; }
    if (saved === "denied") { window.KUKO_CONSENT = "denied"; return; }
    window.KUKO_CONSENT = null;
    buildBanner();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

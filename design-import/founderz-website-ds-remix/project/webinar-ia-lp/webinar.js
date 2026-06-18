/* ============================================================
   Webinar IA — comportamiento específico
   (se carga después de lp.js, que ya gestiona countdown,
   acordeones, carrusel, sticky CTA y formularios de lead)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Countdown apuntando a la fecha del webinar ---------- */
  // Jue 26 jun, 18:00h. Si ya pasó, lp.js lo reinicia a +unos días.
  if (typeof window.__maiiRetarget === "function") {
    window.__maiiRetarget("2026-06-26T18:00:00");
  }

  /* ---------- Barra de plazas (urgencia social) ---------- */
  // Anima la barra al 79% (≈105 plazas libres de 500) al entrar en viewport.
  var TOTAL = 500;
  var TAKEN = 395; // plazas ocupadas → 105 libres
  var left = TOTAL - TAKEN;

  function fillSeat(bar) {
    var fill = bar.querySelector("[data-seat-fill]");
    var lbl = bar.querySelector("[data-seat-left]");
    if (lbl) lbl.textContent = left;
    if (fill) requestAnimationFrame(function () {
      fill.style.width = Math.round((TAKEN / TOTAL) * 100) + "%";
    });
  }

  var bars = document.querySelectorAll("[data-seatbar]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { fillSeat(en.target); obs.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    bars.forEach(function (b) { io.observe(b); });
  } else {
    bars.forEach(fillSeat);
  }

  /* ---------- Enfocar el formulario tras pulsar un CTA ---------- */
  document.querySelectorAll("[data-goform]").forEach(function (a) {
    a.addEventListener("click", function () {
      setTimeout(function () {
        var t = document.querySelector("#reservar .lead-form:not([hidden]) .lf-input");
        if (t) try { t.focus({ preventScroll: true }); } catch (e) { t.focus(); }
      }, 540);
    });
  });

  /* ---------- Añadir al calendario (.ics) tras registrarse ---------- */
  function icsHref() {
    var dt = "20260626T160000Z"; // 18:00 CET = 16:00 UTC
    var end = "20260626T170000Z";
    var lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Founderz//Webinar//ES",
      "BEGIN:VEVENT", "UID:webinar-ia-oficina@founderz.com",
      "DTSTAMP:" + dt, "DTSTART:" + dt, "DTEND:" + end,
      "SUMMARY:Webinar gratis · IA en la oficina (Founderz)",
      "DESCRIPTION:Te enviaremos el enlace de acceso por email.",
      "END:VEVENT", "END:VCALENDAR"
    ];
    return "data:text/calendar;charset=utf-8," + encodeURIComponent(lines.join("\r\n"));
  }
  document.querySelectorAll(".wb-cal").forEach(function (a) {
    a.setAttribute("href", icsHref());
    a.setAttribute("download", "webinar-ia-founderz.ics");
  });
})();

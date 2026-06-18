/* ============================================================
   MAII LP — comportamiento (vanilla)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Countdown ---------- */
  // Objetivo: fin de la cohorte. Si ya pasó, reinicia a +7 días para que
  // el contador siempre muestre urgencia activa en la demo.
  function getTarget() {
    var stored = window.__MAII_DEADLINE;
    var t = stored ? new Date(stored).getTime() : new Date("2026-06-30T23:59:59").getTime();
    var now = Date.now();
    if (t <= now) t = now + 6 * 864e5 + 8 * 36e5 + 28 * 6e4; // ~6d 8h 28m
    return t;
  }
  var TARGET = getTarget();

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    var diff = Math.max(0, TARGET - Date.now());
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600); s -= h * 3600;
    var m = Math.floor(s / 60); s -= m * 60;
    var parts = { d: d, h: h, m: m, s: s };

    // Cajas de dígitos
    document.querySelectorAll("[data-cd]").forEach(function (el) {
      var k = el.getAttribute("data-cd");
      if (parts[k] != null) el.textContent = pad(parts[k]);
    });
    // Texto compacto dd:hh:mm:ss
    document.querySelectorAll("[data-cd-compact]").forEach(function (el) {
      el.textContent = pad(d) + ":" + pad(h) + ":" + pad(m) + ":" + pad(s);
    });
  }
  tick();
  setInterval(tick, 1000);
  window.__maiiRetarget = function (iso) { window.__MAII_DEADLINE = iso; TARGET = getTarget(); tick(); };

  /* ---------- Acordeones (FAQ + temario) ---------- */
  document.addEventListener("click", function (e) {
    var q = e.target.closest(".acc__q");
    if (!q) return;
    var item = q.closest(".acc__item");
    var group = item.closest(".acc");
    var isOpen = item.getAttribute("data-open") === "true";
    if (group && group.hasAttribute("data-single")) {
      group.querySelectorAll(".acc__item").forEach(function (it) { it.setAttribute("data-open", "false"); });
    }
    item.setAttribute("data-open", isOpen ? "false" : "true");
  });

  /* ---------- Carrusel faculty ---------- */
  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var track = root.querySelector(".carousel__track");
    var step = 282;
    root.querySelectorAll("[data-car-prev]").forEach(function (b) {
      b.addEventListener("click", function () { track.scrollBy({ left: -step * 2, behavior: "smooth" }); });
    });
    root.querySelectorAll("[data-car-next]").forEach(function (b) {
      b.addEventListener("click", function () { track.scrollBy({ left: step * 2, behavior: "smooth" }); });
    });
  });

  /* ---------- CTA sticky inferior ---------- */
  var sticky = document.querySelector(".sticky-cta");
  var hero = document.querySelector(".hero");
  if (sticky && hero) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        sticky.classList.toggle("is-visible", !en.isIntersecting);
      });
    }, { rootMargin: "0px 0px -85% 0px" });
    io.observe(hero);
  }

  /* ---------- Formulario de captación (objetivo) ---------- */
  document.querySelectorAll("[data-lead-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var valid = field.value && field.value.trim() !== "" &&
          (field.type !== "email" || /.+@.+\..+/.test(field.value));
        field.classList.toggle("is-invalid", !valid);
        if (!valid && ok) { field.focus(); ok = false; }
      });
      if (!ok) return;

      var card = form.closest(".form-card") || form.parentNode;
      var done = card.querySelector(".lead-done");
      var emailVal = (form.querySelector('[name="email"]') || {}).value || "";
      var emailOut = card.querySelector("[data-done-email]");
      if (emailOut && emailVal) emailOut.textContent = emailVal;
      card.classList.add("is-sent");
      if (done) done.removeAttribute("hidden");

      // Marca conversión para todas las copias del formulario (demo)
      window.__maiiLead = { ok: true, email: emailVal };
    });

    // Limpia el estado de error al escribir
    form.addEventListener("input", function (e) {
      if (e.target.classList) e.target.classList.remove("is-invalid");
    });
  });

  /* ---------- CTAs que llevan al formulario ---------- */
  document.querySelectorAll("[data-goform]").forEach(function (a) {
    a.addEventListener("click", function () {
      // Enfoca el primer campo visible del formulario tras el scroll
      setTimeout(function () {
        var target = document.querySelector("#form .lead-form:not([hidden]) .lf-input");
        if (target) try { target.focus({ preventScroll: true }); } catch (err) { target.focus(); }
      }, 520);
    });
  });
})();

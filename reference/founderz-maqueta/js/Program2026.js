import { S, N as q, P as _, M as b } from "./chunks/vendor-slider-BmQAf6mZ.js";
/* empty css                    */ import "./chunks/main-5wy0vhhV.js";
import "./chunks/DataLayer-z1ZvYliq.js";
import { g } from "./chunks/index-C8pce-KX.js";
import { S as L } from "./chunks/ScrollTrigger-D1XJUMov.js";
import { S as k } from "./chunks/SliderHero-Ckxa18Kf.js";
import { E as j } from "./chunks/ErrorBanner-SuZF91ZT.js";
import { H as P } from "./chunks/HubspotAutoFiller-2HmnN0OB.js";
import { C as A, E as M } from "./chunks/Countdown-4HCdFTn3.js";
import { E as O } from "./chunks/EnrollStarted-DUtaWlx6.js";
import { H as T } from "./chunks/HubSpotLazyLoader-_ut0iGLz.js";
import { i as x } from "./chunks/CardDAccordion-DPgvNn38.js";
g.registerPlugin(L);
class D {
  constructor() {
    ((this.gsapMatchMedia = g.matchMedia()),
      (this.breakpointMobile = window.matchMedia("(max-width:650px)")),
      this.init());
  }
  init() {
    (new j(),
      new P(),
      new O(),
      new A(),
      new T(),
      (window.ecommerceTracking = new M()),
      window.ecommerceTracking.init(),
      new k(),
      this.initBenefitsSlider(),
      this.initFellowsSlider(),
      this.initProfessorsSlider(),
      this.initTestimonialsSlider(),
      this.initSyllabus(),
      this.initFaqs(),
      this.initLearningSkills(),
      this.initWsParam(),
      this.initHubspotEvents(),
      this.initStickyBar(),
      this.initPlatformVideos(),
      window.addEventListener("load", () => {
        this.initStickyVideo();
      }));
  }
  initBenefitsSlider() {
    const e = document.querySelector(".js--section__benefits-items");
    e &&
      new S(e, {
        modules: [q, _, b],
        slidesPerView: 1.2,
        spaceBetween: 32,
        mousewheel: { forceToAxis: !0, releaseOnEdges: !0 },
        breakpoints: { 581: { slidesPerView: 2.2 }, 991: { slidesPerView: 4 } },
        navigation: {
          nextEl: document.querySelector(".js--section__benefits-next"),
          prevEl: document.querySelector(".js--section__benefits-prev"),
        },
        pagination: {
          el: document.querySelector(".js--section__benefits-pagination"),
          clickable: !0,
        },
      });
  }
  _fellowsLazyLoad(e) {
    if (!e || e.dataset.lazyLoaded === "true") return;
    e.dataset.lazyLoaded = "true";
    const t = e.dataset.src;
    if (t) {
      if (e.tagName === "VIDEO")
        ((e.src = t), e.removeAttribute("data-src"), e.load());
      else if (e.tagName === "IFRAME") {
        const o = t.includes("?") ? "&" : "?";
        ((e.src = `${t}${o}autoplay=1&muted=1&background=1&loop=1`),
          e.removeAttribute("data-src"));
      }
    }
  }
  _fellowsVimeoPost(e, t) {
    if (!(!e || !e.contentWindow))
      try {
        e.contentWindow.postMessage(JSON.stringify({ method: t }), "*");
      } catch {}
  }
  _fellowsPlayMedia(e) {
    if (!e) return;
    const t = e.querySelector(".js--fellows-video");
    t &&
      (this._fellowsLazyLoad(t),
      t.tagName === "VIDEO"
        ? ((t.currentTime = 0), t.play().catch(() => {}))
        : t.tagName === "IFRAME" && this._fellowsVimeoPost(t, "play"));
  }
  _fellowsPauseAllMedia(e) {
    document.querySelectorAll(".fellows .js--fellows-video").forEach((t) => {
      t !== e &&
        (t.tagName === "VIDEO"
          ? t.pause()
          : t.tagName === "IFRAME" && this._fellowsVimeoPost(t, "pause"));
    });
  }
  initFellowsSlider() {
    this.gsapMatchMedia.add(
      {
        isDesktop: "(min-width: 811px)",
        isTablet: "(max-width: 810px)",
        isMobile: "(max-width: 580px)",
        hasHover: "(hover: hover)",
      },
      (e) => {
        const { isDesktop: t } = e.conditions,
          o = document.querySelector(".fellows"),
          a = document.querySelectorAll(".js--fellows__item");
        if (!o || !a.length) return () => {};
        const s = document.querySelector(".js--fellows__image"),
          l = s == null ? void 0 : s.querySelector(".fellows__image__default"),
          n = s == null ? void 0 : s.querySelectorAll(".fellows__image__item");
        let m = !1;
        const p = (d) => d.querySelector(":scope > .js--fellows__item__text"),
          i = () => {
            const d = document.querySelector(".js--fellows__item.active"),
              r = d == null ? void 0 : d.querySelector(".js--fellows-video");
            r &&
              (this._fellowsLazyLoad(r),
              r.tagName === "VIDEO"
                ? ((r.currentTime = 0), r.play().catch(() => {}))
                : r.tagName === "IFRAME" && this._fellowsVimeoPost(r, "play"));
          },
          f = new IntersectionObserver(
            (d) => {
              d.forEach((r) => {
                if (((m = r.isIntersecting), m))
                  if (t) {
                    const u =
                      s == null
                        ? void 0
                        : s.querySelector(".fellows__image__item.active");
                    (u == null ? void 0 : u.dataset.mediaType) === "video" &&
                      this._fellowsPlayMedia(u);
                  } else i();
                else this._fellowsPauseAllMedia(null);
              });
            },
            { threshold: [0.15] },
          );
        f.observe(o);
        const c = (d) => {
            const r = d.dataset.image;
            if ((this._fellowsPauseAllMedia(null), t && s && r !== void 0)) {
              (l &&
                g.to(l, { opacity: 0, duration: 0.4, ease: "power2.inOut" }),
                n == null || n.forEach((v) => v.classList.remove("active")));
              const u = s.querySelector(`[data-item-image="${r}"]`);
              u &&
                (u.classList.add("active"),
                u.dataset.mediaType === "video" &&
                  m &&
                  this._fellowsPlayMedia(u));
            }
            if (!t) {
              const u = d.querySelector(".js--fellows-video");
              u &&
                m &&
                (this._fellowsLazyLoad(u),
                u.tagName === "VIDEO"
                  ? ((u.currentTime = 0), u.play().catch(() => {}))
                  : u.tagName === "IFRAME" &&
                    this._fellowsVimeoPost(u, "play"));
            }
          },
          h = (d) => {
            d.preventDefault();
            const r = d.currentTarget,
              u = p(r);
            u &&
              (r.classList.contains("active") ||
                (a.forEach((v) => {
                  if (v !== r) {
                    const w = p(v);
                    (v.classList.remove("active"),
                      w &&
                        g.to(w, {
                          height: "0px",
                          duration: 0.7,
                          ease: "power2.inOut",
                        }));
                    const y = v.querySelector(".js--fellows-video");
                    (y == null ? void 0 : y.tagName) === "VIDEO"
                      ? y.pause()
                      : (y == null ? void 0 : y.tagName) === "IFRAME" &&
                        this._fellowsVimeoPost(y, "pause");
                  }
                }),
                r.classList.add("active"),
                g.to(u, {
                  height: "auto",
                  duration: 0.7,
                  ease: "power2.inOut",
                }),
                c(r)));
          };
        if (
          (a.forEach((d) => {
            d.addEventListener("click", h);
          }),
          t)
        ) {
          const d =
            s == null
              ? void 0
              : s.querySelector(".fellows__image__item.active");
          if ((d == null ? void 0 : d.dataset.mediaType) === "video") {
            const r = d.querySelector(".js--fellows-video");
            r && this._fellowsLazyLoad(r);
          }
        } else {
          const d = document.querySelector(".js--fellows__item.active"),
            r = d == null ? void 0 : d.querySelector(".js--fellows-video");
          r && this._fellowsLazyLoad(r);
        }
        return () => {
          (f.disconnect(),
            a.forEach((d) => {
              d.removeEventListener("click", h);
            }));
        };
      },
    );
  }
  _syncDesktopNav(e, t, o) {
    if (!t || !o) return;
    const a = () => {
      (t.classList.toggle("is-disabled", e.isBeginning),
        o.classList.toggle("is-disabled", e.isEnd));
    };
    (a(),
      e.on("slideChange", a),
      e.on("reachBeginning", a),
      e.on("reachEnd", a),
      e.on("fromEdge", a),
      t.addEventListener("click", () => e.slidePrev()),
      o.addEventListener("click", () => e.slideNext()));
  }
  initProfessorsSlider() {
    const e = document.querySelector(".js--professors-items");
    if (e) {
      const t = new S(e, {
        modules: [q, _, b],
        slidesPerView: 1.3,
        spaceBetween: 24,
        mousewheel: { forceToAxis: !0, releaseOnEdges: !0 },
        breakpoints: {
          811: { slidesPerView: 4.4 },
          1321: { slidesPerView: 5.1 },
        },
        navigation: {
          nextEl: document.querySelector(".js--professors-next"),
          prevEl: document.querySelector(".js--professors-prev"),
        },
        pagination: !1,
      });
      this._syncDesktopNav(
        t,
        document.querySelector(".js--professors-prev-desktop"),
        document.querySelector(".js--professors-next-desktop"),
      );
    }
  }
  initTestimonialsSlider() {
    const e = document.querySelector(".js--testimonials-items");
    if (!e) return;
    const t = e.closest(".testimonials");
    if (!t) return;
    const o = t.querySelector(".js--testimonials-prev"),
      a = t.querySelector(".js--testimonials-next"),
      s = t.querySelector(".js--testimonials-prev-desktop"),
      l = t.querySelector(".js--testimonials-next-desktop"),
      n = new S(e, {
        modules: [b],
        slidesPerView: "auto",
        spaceBetween: 24,
        watchOverflow: !0,
        observer: !0,
        observeParents: !0,
        mousewheel: { forceToAxis: !0, releaseOnEdges: !0 },
      }),
      m = () => {
        const i = n.isBeginning,
          f = n.isEnd;
        (o == null || o.classList.toggle("swiper-button-disabled", i),
          a == null || a.classList.toggle("swiper-button-disabled", f),
          s == null || s.classList.toggle("is-disabled", i),
          l == null || l.classList.toggle("is-disabled", f));
      },
      p = (i, f) => {
        i &&
          i.addEventListener("click", (c) => {
            (c.preventDefault(),
              !(f < 0 && n.isBeginning) &&
                ((f > 0 && n.isEnd) ||
                  (f > 0 ? n.slideNext() : n.slidePrev())));
          });
      };
    (p(o, -1),
      p(a, 1),
      p(s, -1),
      p(l, 1),
      n.on("slideChange", m),
      n.on("reachBeginning", m),
      n.on("reachEnd", m),
      n.on("fromEdge", m),
      requestAnimationFrame(() => {
        (n.update(), m());
      }));
  }
  initSyllabus() {
    this.gsapMatchMedia.add(
      {
        isDesktop: "(min-width: 811px)",
        isTablet: "(max-width: 810px)",
        isMobile: "(max-width: 580px)",
      },
      (e) => {
        let { isDesktop: t, isTablet: o, isMobile: a } = e.conditions;
        const s = document.querySelector(".js--syllabus-right"),
          l = document.querySelector(".js--syllabus-text_1"),
          n = document.querySelector(".js--syllabus-col-right");
        (o && s && l && l.parentNode.insertBefore(s, l.nextSibling),
          t && n && s && n.appendChild(s));
        let m = document.querySelectorAll(".js--syllabus-item");
        if (m.length) {
          const p = m[0];
          (p &&
            (p.classList.add("active"),
            g.set(p.querySelector(".js--syllabus-item-content"), {
              height: "auto",
            })),
            m.forEach((i) => {
              i.addEventListener("click", (f) => {
                if (!x(f.target, i))
                  if ((f.preventDefault(), !a))
                    m.forEach((c) => {
                      const h = c.querySelector(".js--syllabus-item-content");
                      c === i
                        ? (c.classList.toggle("active"),
                          g.to(h, {
                            height: c.classList.contains("active")
                              ? "auto"
                              : "0px",
                            duration: 0.32,
                            ease: "power2.inOut",
                          }))
                        : (c.classList.remove("active"),
                          g.to(h, {
                            height: "0px",
                            duration: 0.32,
                            ease: "power2.inOut",
                          }));
                    });
                  else {
                    const c = i.querySelector(".js--syllabus-item-content");
                    (i.classList.toggle("active"),
                      g.to(c, {
                        height: i.classList.contains("active") ? "auto" : "0px",
                        duration: 0.32,
                        ease: "power2.inOut",
                      }));
                  }
              });
            }));
        }
        return () => {};
      },
    );
  }
  initFaqs() {
    this.gsapMatchMedia.add(
      {
        isDesktop: "(min-width: 811px)",
        isTablet: "(max-width: 810px)",
        isMobile: "(max-width: 580px)",
      },
      (e) => {
        let { isDesktop: t, isTablet: o, isMobile: a } = e.conditions,
          s = document.querySelectorAll(".js--faqs-item");
        if (s) {
          let l = document.querySelectorAll(".js--faqs-button");
          l &&
            l.forEach((i, f) => {
              (f === 0 && i.classList.add("current"),
                i.addEventListener("click", () => {
                  (s.forEach((c, h) => {
                    c.classList.remove("active");
                  }),
                    document
                      .querySelector(i.dataset.id)
                      .classList.add("active"),
                    l.forEach((c, h) => {
                      c.classList.remove("current");
                    }),
                    i.classList.add("current"));
                }));
            });
          let n = document.querySelectorAll(".js--faqs-select");
          n &&
            n.forEach((i) => {
              const f = i.querySelector(".js--faqs_select-trigger");
              i.querySelector(".js--faqs_select-dropdown");
              const c = i.querySelector(".js--faqs_select-text"),
                h = i.querySelectorAll(".js--faqs_select-option");
              (f.addEventListener("click", (r) => {
                (r.stopPropagation(),
                  n.forEach((u) => {
                    u !== i && u.classList.remove("open");
                  }),
                  i.classList.toggle("open"));
              }),
                h.forEach((r) => {
                  r.addEventListener("click", (u) => {
                    u.stopPropagation();
                    const v = r.dataset.value,
                      w = r.textContent;
                    (h.forEach((E) => E.classList.remove("selected")),
                      r.classList.add("selected"),
                      (c.textContent = w),
                      i.classList.remove("open"),
                      s.forEach((E) => {
                        E.classList.remove("active");
                      }));
                    const y = document.querySelector(v);
                    y && y.classList.add("active");
                  });
                }),
                document.addEventListener("click", () => {
                  i.classList.remove("open");
                }),
                f.addEventListener("keydown", (r) => {
                  r.key === "Enter" || r.key === " "
                    ? (r.preventDefault(), i.classList.toggle("open"))
                    : r.key === "Escape" && i.classList.remove("open");
                }),
                f.setAttribute("tabindex", "0"),
                f.setAttribute("role", "button"),
                f.setAttribute("aria-haspopup", "listbox"),
                f.setAttribute("aria-expanded", "false"),
                new MutationObserver((r) => {
                  r.forEach((u) => {
                    if (
                      u.type === "attributes" &&
                      u.attributeName === "class"
                    ) {
                      const v = i.classList.contains("open");
                      f.setAttribute("aria-expanded", v.toString());
                    }
                  });
                }).observe(i, { attributes: !0, attributeFilter: ["class"] }));
            });
          let m = document.querySelectorAll(".js--faqs-select-native");
          m &&
            m.forEach((i, f) => {
              i.addEventListener("change", () => {
                s.forEach((h, d) => {
                  h.classList.remove("active");
                });
                const c = document.querySelector(i.value);
                c && c.classList.add("active");
              });
            });
          let p = document.querySelectorAll(".js--faqs-item-details");
          p.length &&
            p.forEach((i) => {
              i.addEventListener("click", (f) => {
                if (!x(f.target, i))
                  if ((f.preventDefault(), !a))
                    p.forEach((c) => {
                      const h = c.querySelector(".js--faqs-item-content");
                      c === i
                        ? (c.classList.toggle("active"),
                          g.to(h, {
                            height: c.classList.contains("active")
                              ? "auto"
                              : "0px",
                            duration: 0.32,
                            ease: "power2.inOut",
                          }))
                        : (c.classList.remove("active"),
                          g.to(h, {
                            height: "0px",
                            duration: 0.32,
                            ease: "power2.inOut",
                          }));
                    });
                  else {
                    const c = i.querySelector(".js--faqs-item-content");
                    (i.classList.toggle("active"),
                      g.to(c, {
                        height: i.classList.contains("active") ? "auto" : "0px",
                        duration: 0.32,
                        ease: "power2.inOut",
                      }));
                  }
              });
            });
        }
        return () => {};
      },
    );
  }
  initLearningSkills() {
    const e = document.querySelector(".js--learning-skills-more"),
      t = document.querySelector(".js--learning-skills-items");
    !e ||
      !t ||
      e.addEventListener("click", (o) => {
        o.preventDefault();
        const a = t.querySelectorAll(".js--learning-skills-item-hidden"),
          s = e.classList.contains("active"),
          l = e.querySelector("span");
        s
          ? (a.forEach((n) => {
              g.to(n, {
                opacity: 0,
                y: 10,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                  n.style.display = "";
                },
              });
            }),
            l && (l.textContent = e.dataset.textMore),
            e.classList.remove("active"))
          : (a.forEach((n) => {
              ((n.style.display = "flex"),
                g.fromTo(
                  n,
                  { opacity: 0, y: 10 },
                  { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                ));
            }),
            l && (l.textContent = e.dataset.textLess),
            e.classList.add("active"));
      });
  }
  initStickyBar() {
    const e = document.querySelector(".js--sticky-a");
    if (!e) return;
    const t = 200;
    let o = !1,
      a = !1;
    const s = () => {
      const l = window.scrollY > t;
      (l !== a && ((a = l), e.classList.toggle("active", a)), (o = !1));
    };
    (window.addEventListener(
      "scroll",
      () => {
        o || (requestAnimationFrame(s), (o = !0));
      },
      { passive: !0 },
    ),
      s());
  }
  initWsParam() {
    var o;
    const e =
      (o = document.querySelector("main")) == null ? void 0 : o.dataset.ws;
    if (!e) return;
    document.querySelectorAll("a").forEach((a) => {
      try {
        const s = new URL(a.href);
        (s.searchParams.set("ws", e), (a.href = s.toString()));
      } catch {}
    });
  }
  initHubspotEvents() {
    const e = document.querySelector("#hs-meta");
    if (!e) return;
    const t = e.dataset.hsProgramId,
      o = e.dataset.hsProgramEdition,
      a = e.dataset.hsProgramLang,
      s = e.dataset.hsProgramCurrency,
      l = e.dataset.hsProgramPrice;
    let n = !1;
    document.addEventListener("submit", (m) => {
      m.target.closest(".hbspt-form form") &&
        (n ||
          ((n = !0),
          typeof _hsq < "u" &&
            _hsq.push([
              "trackCustomBehavioralEvent",
              {
                name: "pe25912905_info_requested",
                properties: {
                  program_id: t,
                  program_edition: o,
                  program_lang: a,
                  program_currency: s,
                  program_price: l,
                },
              },
            ])));
    });
  }
  initPlatformVideos() {
    const e = document.querySelectorAll(
      ".platform__items__wrapper__video video",
    );
    if (!e.length) return;
    const t = new IntersectionObserver(
      (o) => {
        o.forEach((a) => {
          const s = a.target;
          if (a.isIntersecting && a.intersectionRatio >= 0.25) {
            if (s.dataset.lazyLoaded !== "true") {
              s.dataset.lazyLoaded = "true";
              const l = s.querySelectorAll("source[data-src]");
              if (l.length) {
                let n = null;
                for (const m of l) {
                  const p = m.getAttribute("media");
                  if (!p || window.matchMedia(p).matches) {
                    n = m.dataset.src;
                    break;
                  }
                }
                (n || (n = l[l.length - 1].dataset.src),
                  n && ((s.src = n), l.forEach((m) => m.remove())));
              } else
                s.dataset.src &&
                  ((s.src = s.dataset.src), s.removeAttribute("data-src"));
              s.load();
            }
            s.play().catch(() => {});
          } else s.pause();
        });
      },
      { threshold: [0.25] },
    );
    e.forEach((o) => {
      (o.pause(),
        (o.autoplay = !1),
        o.removeAttribute("autoplay"),
        (o.muted = !0),
        o.setAttribute("preload", "none"),
        t.observe(o));
    });
  }
  initStickyVideo() {
    const e = document.querySelector(".js--sticky-video"),
      t = document.querySelector(".js--info-video");
    if (!e || !t) return;
    const o = document.querySelector(".header");
    (o && o.offsetHeight,
      this.gsapMatchMedia.add("(min-width: 581px)", () => {
        const s = g.to(t, {
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: e,
            start: () => "top +=" + ((o ? o.offsetHeight : 0) + 20) + "px",
            end: () => "+=" + e.offsetHeight + "px",
            scrub: 1,
            pin: !0,
            anticipatePin: 1,
            invalidateOnRefresh: !0,
          },
        });
        return () => {
          var l;
          ((l = s.scrollTrigger) == null || l.kill(!0),
            s.kill(),
            g.set(t, { clearProps: "scale" }));
        };
      }));
    const a = t.tagName === "IFRAME";
    t.dataset.src &&
      (a
        ? L.create({
            trigger: e,
            start: "top 80%",
            once: !0,
            onEnter: () => {
              t.src = t.dataset.src;
            },
          })
        : ((t.src = t.dataset.src),
          t.load(),
          L.create({
            trigger: t,
            start: "top 60%",
            onEnter: () => {
              t.play().catch(() => {});
            },
          })));
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new D();
});

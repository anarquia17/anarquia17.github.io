/* ============================================================
   MAIN JS — i18n toggle, typed role, reveal, counters, projects
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Config ---------- */
  const CONFIG = {
    email: "Jorge.a.davila.lara@icloud.com",
    github: "anarquia17",
    githubUrl: "https://github.com/anarquia17",
    // Rol animado en el hero (por idioma)
    roles: {
      es: [
        "Senior Data Engineer",
        "Technical Leader",
        "Big Data & Cloud Specialist",
        "Azure Data Engineer Certified"
      ],
      en: [
        "Senior Data Engineer",
        "Technical Leader",
        "Big Data & Cloud Specialist",
        "Azure Data Engineer Certified"
      ]
    }
  };

  let currentLang = localStorage.getItem("lang") || "es";
  const langToggle = document.getElementById("langToggle");
  const langLabel = document.getElementById("langLabel");

  /* ---------- i18n ---------- */
  function applyI18n(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (I18N[lang] && I18N[lang][key]) {
        el.textContent = I18N[lang][key];
      }
    });
    document.documentElement.lang = lang;
    langLabel.textContent = lang === "es" ? "EN" : "ES";
    renderProjects();
  }

  function toggleLang() {
    currentLang = currentLang === "es" ? "en" : "es";
    localStorage.setItem("lang", currentLang);
    applyI18n(currentLang);
    // Reinicia el rol animado con el idioma nuevo
    typedIndex = 0;
    currentRole = "";
    typeLoop();
  }

  if (langToggle) {
    langToggle.addEventListener("click", toggleLang);
  }

  /* ---------- Typed role ---------- */
  const roleEl = document.getElementById("typedRole");
  let typedIndex = 0;
  let currentRole = "";
  let deleting = false;

  function typeLoop() {
    if (!roleEl) return;
    const roles = CONFIG.roles[currentLang] || CONFIG.roles.es;
    const target = roles[typedIndex % roles.length];

    if (!deleting) {
      currentRole = target.slice(0, currentRole.length + 1);
      roleEl.textContent = currentRole;
      if (currentRole.length === target.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
      setTimeout(typeLoop, 70);
    } else {
      currentRole = target.slice(0, currentRole.length - 1);
      roleEl.textContent = currentRole;
      if (currentRole.length === 0) {
        deleting = false;
        typedIndex++;
        setTimeout(typeLoop, 300);
        return;
      }
      setTimeout(typeLoop, 35);
    }
  }

  /* ---------- Navbar scroll ---------- */
  const navbar = document.getElementById("navbar");
  function onScroll() {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 20);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuToggle.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        counterObserver.unobserve(el);
        const target = parseInt(el.dataset.count, 10) || 0;
        const dur = 1200;
        const start = performance.now();

        function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

  /* ---------- Projects (fetch local JSON) ---------- */
  const projectsGrid = document.getElementById("projectsGrid");

  async function loadProjects() {
    try {
      const res = await fetch("data/projects.json", { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      window.__PROJECTS__ = data.projects || [];
    } catch (e) {
      console.warn("No se pudo cargar projects.json:", e.message);
      window.__PROJECTS__ = [];
    }
    renderProjects();
  }

  function renderProjects() {
    if (!projectsGrid) return;
    const projects = window.__PROJECTS__ || [];

    if (!projects.length) {
      const emptyMsg = I18N[currentLang]["projects.empty"] || "";
      projectsGrid.innerHTML =
        '<p class="projects-empty">' + emptyMsg + "</p>";
      return;
    }

    projectsGrid.innerHTML = projects
      .map((p) => {
        const desc = p.description[currentLang] || p.description.es || "";
        const tags = (p.tags || [])
          .map((t) => "<span>" + t + "</span>")
          .join("");
        const links =
          (p.url
            ? '<a href="' + p.url + '" target="_blank" rel="noopener" title="Link">🔗</a>'
            : "") +
          (p.github
            ? '<a href="' + p.github + '" target="_blank" rel="noopener" title="GitHub">🐙</a>'
            : "");
        return (
          '<article class="project-card reveal visible">' +
          '<div class="project-top">' +
          '<span class="project-icon">' + (p.icon || "📁") + "</span>" +
          '<div class="project-links">' + links + "</div>" +
          "</div>" +
          "<h3>" + p.name + "</h3>" +
          "<p>" + desc + "</p>" +
          '<div class="project-tags">' + tags + "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  /* ---------- Contact data ---------- */
  function setContact() {
    const emailEl = document.getElementById("contactEmail");
    const emailText = document.getElementById("contactEmailText");
    const ghEl = document.getElementById("contactGithub");
    const ghText = document.getElementById("contactGithubText");

    if (emailEl && CONFIG.email && !CONFIG.email.startsWith("TU-")) {
      emailEl.href = "mailto:" + CONFIG.email;
      emailText.textContent = CONFIG.email;
    }
    if (ghEl && CONFIG.github && !CONFIG.github.startsWith("TU-")) {
      ghEl.href = CONFIG.githubUrl;
      ghText.textContent = "github.com/" + CONFIG.github;
    }
  }

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Init ---------- */
  applyI18n(currentLang);
  setContact();
  typeLoop();
  loadProjects();
})();

# Jorge Davila Lara — Portfolio

Landing page personal de **Jorge Davila Lara** — Senior Data Engineer & Technical Leader.

> **⚙️ Configuración ya aplicada:** email y usuario de GitHub reales incluidos (ver [Personalización](#-personalización) para ajustes futuros).

## 🚀 Stack

- HTML5 + CSS3 + JavaScript vanilla (sin dependencias, sin build)
- Bilingüe ES/EN con toggle (persistencia en `localStorage`)
- Dark mode técnico con acento cian
- Publicación gratuita con **GitHub Pages**

## 📁 Estructura

```
├── index.html              # Estructura principal (7 secciones)
├── assets/
│   ├── css/style.css       # Estilos (dark theme, responsive)
│   └── js/
│       ├── i18n.js         # Diccionarios ES/EN
│       └── main.js         # Lógica: i18n, typed, reveal, proyectos
├── data/
│   └── projects.json       # Proyectos (editable sin tocar HTML)
└── .github/workflows/
    └── deploy.yml          # CI/CD → GitHub Pages
```

## ✨ Secciones

1. **Hero** — nombre, rol animado (typewriter), badges de certificaciones, stats con contadores
2. **Sobre mí** — perfil profesional + datos rápidos
3. **Skills** — Data Engineering, Cloud, IA, Liderazgo
4. **Experiencia** — timeline completo desde 2008
5. **Proyectos** — renderizados desde `data/projects.json`
6. **Certificaciones & Educación**
7. **Contacto** — email, LinkedIn, GitHub

## 🔧 Personalización

Edita `assets/js/main.js` → bloque `CONFIG`:

```js
const CONFIG = {
  email: "tu@email.com",
  github: "tu-usuario",
  githubUrl: "https://github.com/tu-usuario",
  roles: { es: [...], en: [...] }
};
```

Para agregar proyectos, edita `data/projects.json` (soporta descripciones ES/EN, tags, links).

## 📦 Publicar en GitHub Pages

### Opción A — Repo de usuario (`tuusuario.github.io`)

```bash
git init
git add .
git commit -m "feat: portfolio landing page"
git branch -M main
git remote add origin https://github.com/anarquia17/anarquia17.github.io.git
git push -u origin main
```

> ⚠️ **Importante:** ya existe un repo `anarquia17.github.io` con contenido previo. Antes de pushear, decide si lo **reemplazas** (respaldando lo anterior) o creas un repo nuevo con otro nombre (ej. `portfolio`) y activas Pages desde ese repo.

El workflow incluido (`deploy.yml`) publica automáticamente en **Settings → Pages → Source: GitHub Actions** (rama `gh-pages`).

### Opción B — Repo normal con Pages

Mismo procedimiento, pero apunta el dominio custom o el path `/nombre-repo/` (en ese caso ajusta las URLs absolutas de la sección Contacto).

## 🛠️ Mantenimiento

- **Sin build**: edita, commitea, pushea. GitHub Actions despliega solo.
- Para cambiar textos bilingües: `assets/js/i18n.js`
- Para cambiar estilos: `assets/css/style.css`

## 📄 Licencia

Uso personal — Jorge Davila Lara.

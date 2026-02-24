<div align="center">

```
███████╗██╗███╗   ███╗ ██████╗ ███╗   ██╗   ███████╗██╗  ██╗███████╗
██╔════╝██║████╗ ████║██╔═══██╗████╗  ██║   ██╔════╝╚██╗██╔╝██╔════╝
███████╗██║██╔████╔██║██║   ██║██╔██╗ ██║   █████╗   ╚███╔╝ █████╗  
╚════██║██║██║╚██╔╝██║██║   ██║██║╚██╗██║   ██╔══╝   ██╔██╗ ██╔══╝  
███████║██║██║ ╚═╝ ██║╚██████╔╝██║ ╚████║██╗███████╗██╔╝ ██╗███████╗
╚══════╝╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
```

**Portfolio personnel — NeoBrutalist Design**

[![Deployed on Vercel](https://img.shields.io/badge/▲_Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://simonlaurent.vercel.app)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)

</div>

---

## `>_ ABOUT`

Portfolio personnel de **Simon Laurent**, développeur Full Stack basé à Nantes.

Construit avec une esthétique **NeoBrutalist** — bordures épaisses, typographies bold, couleurs saturées, ombres dures. Pas de framework JS, pas de build complexe. Juste du HTML, du CSS et du JavaScript vanilla qui tape fort.

<div align="center">

| | |
|---|---|
| 🎨 **Design** | NeoBrutalism — brut, bold, sans compromis |
| ⚡ **Performance** | HTML statique, 0 dépendance runtime |
| 📱 **Responsive** | Mobile-first, adapté tous écrans |
| 🔒 **Sécurité** | Pas de cookies, pas de trackers |
| 🌐 **Déployé** | Vercel Edge Network |

</div>

---

## `>_ STACK`

```
FRONTEND ──────────────────────────────
  HTML5 / TailwindCSS (CDN) / Vanilla JS
  Google Fonts (Space Grotesk + JetBrains Mono)
  Remix Icons

ARCHITECTURE ──────────────────────────
  Components system (js/components.js)
  → Navbar, Footer, Cursor, Progress Bar
  → Shared across all pages via data-component

INTEGRATIONS ──────────────────────────
  Web3Forms ─── Contact form emails
  GitHub API ── Live coding stats
  Vercel ────── Analytics + Deployment

BUILD ─────────────────────────────────
  build.js ──── Injects env vars at deploy
  vercel.json ─ Vercel config
```

---

## `>_ STRUCTURE`

```
portfolio/
├── index.html              # Page principale (Hero, About, Skills, XP, Edu, Projects, Contact)
├── favicon.svg             # Favicon NeoBrutalist
├── vercel.json             # Config Vercel
├── build.js                # Génère config.js depuis les env vars
│
├── css/
│   └── style.css           # Styles partagés (cursor, animations, grid)
│
├── js/
│   ├── components.js       # Composants UI réutilisables (navbar, footer, etc.)
│   ├── main.js             # Logique principale (cursor, reveal, GitHub API, form)
│   ├── config.js           # Clés API (gitignored, généré au build)
│   └── config.example.js   # Template config pour les contributeurs
│
└── projects/
    ├── sacsabonheurs.html  # E-commerce — Next.js / Express / Stripe
    ├── birdwatcher.html    # Computer Vision — Python / AI
    ├── ia-doublage.html    # Doublage IA — Python / Audio
    └── running-app.html    # App mobile — Dart / Flutter
```

---

## `>_ FEATURES`

- **🖱️ Custom Cursor** — Curseur néon personnalisé qui suit la souris
- **📊 Live GitHub Stats** — Repos, followers, commits via l'API GitHub
- **📧 Contact Form** — Emails en direct via Web3Forms
- **🎭 Component System** — DRY architecture, un seul fichier pour tous les éléments partagés
- **⏱️ Progress Bar** — Barre de progression au scroll
- **✨ Reveal Animations** — Apparitions au défilement
- **🎯 Multi-pages** — Pages projet individuelles avec thèmes colorés uniques

---

## `>_ SETUP`

```bash
# Cloner le repo
git clone https://github.com/babaygo/portfolio.git
cd portfolio

# Configurer les clés API
cp js/config.example.js js/config.js
# → Éditer js/config.js avec ta clé Web3Forms

# Lancer en local
# Ouvrir index.html dans le navigateur, ou :
npx serve .
```

### Variables d'environnement (Vercel)

| Variable | Description |
|----------|-------------|
| `WEB3FORMS_KEY` | Clé API Web3Forms pour le formulaire de contact |

---

## `>_ DEPLOY`

Le site se déploie automatiquement sur **Vercel** à chaque push sur `master`.

```bash
# Le build.js génère config.js depuis les env vars Vercel
node build.js → js/config.js
```

---

## `>_ PALETTE`

```
 ██  #FBFF48  neo-yellow     ██  #FF70A6  neo-pink
 ██  #3B82F6  neo-blue       ██  #33FF57  neo-green
 ██  #A855F7  neo-purple     ██  #FF9F1C  neo-orange
 ██  #FF2A2A  neo-red        ██  #121212  neo-black
```

---

<div align="center">

**Built with raw HTML, bold borders, and zero compromises.**

```
© 2025 SIMON.exe // SYSTEM_END
```

</div>

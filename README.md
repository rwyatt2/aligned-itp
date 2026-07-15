# Aligned Technology Partners — Brand Guidelines

[![Live Site](https://img.shields.io/badge/Live-GitHub%20Pages-0A0C12?style=flat&logo=github)](https://rwyatt2.github.io/atp-brand-guidelines/)
[![Deploy](https://github.com/rwyatt2/atp-brand-guidelines/actions/workflows/deploy.yml/badge.svg)](https://github.com/rwyatt2/atp-brand-guidelines/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Official interactive brand guidelines for **Aligned Technology Partners** — an immersive single-page experience that documents the logo system, color palette, typography, visual language, mockups, and voice & tone, with production-ready asset downloads.

**Live site:** [https://rwyatt2.github.io/atp-brand-guidelines/](https://rwyatt2.github.io/atp-brand-guidelines/)

> *Protect. Optimize. Advance.* — Connecting people, process, and technology into one working system.

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Brand system](#brand-system)
- [Asset downloads](#asset-downloads)
- [Theming](#theming)
- [Deployment](#deployment)
- [Development notes](#development-notes)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repository powers the Aligned Technology Partners brand site: a React + Vite application that doubles as both a design reference and an asset distribution hub. Designers, marketers, and partners can explore approved usage, then export logos, fonts, color swatches, and gradients in formats ready for digital and print workflows.

The site is deployed automatically to GitHub Pages on every push to `main`.

---

## Features

### Guidelines experience

- **Hero** with WebGL/shader atmosphere and animated logo reveal
- **Logo system** — logomark, wordmark, and lockup configurations with clear / clear-space rules and do / don’t guidance
- **Color palette** — named brand colors with HEX, RGB, and CMYK values, plus gradient swatches
- **Typography** — Geist Sans and Geist Mono hierarchy and usage
- **Visual language** — brand motifs, textures, and supporting graphics
- **Mockups** — gallery with lightbox for real-world applications
- **Voice & tone** — messaging principles and writing guidance
- **Smooth scrolling** via Lenis and motion-driven section transitions (Framer Motion)
- **Light / dark theme** with logo version callouts that match the selected mode

### Asset export

- Per-asset downloads: **SVG**, **PNG**, **JPG**, and true-vector **EPS** (outlined text)
- **Master brand ZIP** from the navbar — logos, fonts, Adobe ASE swatches, gradients, and an embedded usage README
- Light / dark / both logo version packaging for the master download
- Gradient exports at **1920×1080** for hero and presentation use
- Adobe **`.ase`** color swatch generation for design tools
- Password-gated downloads to protect brand assets

---

## Tech stack

| Layer | Choice |
| --- | --- |
| UI | React 19, TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Motion | Framer Motion, Lenis |
| 3D / shaders | Three.js, React Three Fiber, Drei |
| Assets | JSZip, html-to-image, opentype.js |
| Fonts | Geist Variable / Geist Mono (`@fontsource-variable/*`, plus files under `public/fonts`) |
| CI / hosting | GitHub Actions → GitHub Pages |

---

## Quick start

### Prerequisites

- **Node.js** 20 or newer (CI uses Node 20; local development is tested on current LTS)
- **npm** 10+

### Install

```bash
git clone https://github.com/rwyatt2/atp-brand-guidelines.git
cd atp-brand-guidelines
npm install
```

### Develop

```bash
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173/atp-brand-guidelines/`).

> **Note:** The Vite `base` path is `/atp-brand-guidelines/` so local and production URLs match GitHub Pages. Always open the app under that base path.

### Production build

```bash
npm run build
npm run preview
```

`preview` serves the contents of `dist/` locally so you can verify the production bundle before deploy.

---

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Typecheck (`tsc -b`) and build optimized assets to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Project structure

```text
atp-brand-guidelines/
├── .github/workflows/     # GitHub Pages deploy workflow
├── public/                # Static assets copied as-is
│   ├── fonts/             # Geist Sans & Mono (OTF / TTF / WOFF2)
│   ├── images/            # Mockups, partners, textures
│   └── *.svg, *.pdf       # Icons, badges, manifesto PDF
├── src/
│   ├── components/
│   │   ├── hero/          # Hero, logo animation, shaders
│   │   ├── logo-system/   # Lockups, rules, per-logo downloads
│   │   ├── color-palette/ # Swatches & gradients
│   │   ├── typography/
│   │   ├── visual-language/
│   │   ├── mockups/
│   │   ├── voice-tone/
│   │   ├── master-download/
│   │   └── layout/        # Navbar, footer, section chrome
│   ├── context/           # Theme + download guard providers
│   ├── hooks/
│   ├── lib/               # Colors, SVG/EPS builders, ZIP, ASE
│   ├── App.tsx            # Section composition
│   ├── main.tsx
│   └── index.css          # Design tokens & global styles
├── vite.config.ts         # Base path, Tailwind, chunk splitting
└── package.json
```

### Key modules in `src/lib/`

| File | Responsibility |
| --- | --- |
| `colors.ts` | Canonical brand colors and gradients |
| `logoSvgBuilder.ts` | Logomark / wordmark / lockup SVG construction |
| `epsGenerator.ts` | True-vector EPS (and outlined SVG) export |
| `aseGenerator.ts` | Adobe Swatch Exchange (`.ase`) files |
| `generateBrandZip.ts` | Master ZIP orchestration and package README |
| `lockupSpec.ts` / `lockupLayout.ts` | Lockup geometry and spacing rules |

---

## Brand system

### Core palette (excerpt)

| Name | HEX | Role |
| --- | --- | --- |
| Midnight Navy | `#1A2730` | Foundational dark / primary text in light mode |
| Graphite | `#424048` | UI panels and tertiary surfaces |
| Steel Blue | `#45586C` | Borders and secondary structure |
| Ice Blue | `#B0CEE2` | Subtle highlights and cool tints |
| Rust Orange | `#A63E1B` | Hover / secondary accent |
| Kinetic Orange | `#E95D2C` | Primary CTA and energetic accent |
| Abyss Black | `#090A0F` | Highest-contrast shadow |

Full HEX / RGB / CMYK values, ratios, and usage copy live in [`src/lib/colors.ts`](src/lib/colors.ts) and are surfaced in the Color Palette section of the site.

### Typography

- **Geist Sans** — primary UI and brand type
- **Geist Mono** — technical / supporting mono contexts

Font files shipped with the master ZIP are served from `public/fonts/`.

### Logo versions

Logos are available for **light** and **dark** backgrounds. The UI theme selector and master-download version picker keep on-page previews and exported packages aligned with the intended background.

---

## Asset downloads

Downloads are protected by a client-side password gate (`DownloadGuardContext`). Authenticated sessions can download individual assets or the full brand package.

### Master ZIP contents

```text
Aligned-Technology-Partners-Brand-Assets/
├── 01_Logos/          # Logomark, wordmark, lockups (SVG, PNG, EPS)
├── 02_Fonts/          # Geist Sans & Mono (OTF, TTF, WOFF2)
├── 03_Colors/         # .ase swatches + reference text
├── 04_Gradients/      # High-resolution gradient textures
└── README.txt         # Usage terms and package notes
```

### Formats

| Format | Use |
| --- | --- |
| SVG | Digital, scalable UI and web |
| PNG / JPG | Raster presentations, mockups, social |
| EPS | Print / vector workflows (outlined paths) |
| ASE | Import brand colors into Adobe apps |

---

## Theming

- Default experience is dark-first (see `index.html` / theme context).
- Theme toggle switches UI chrome and communicates which logo version is appropriate.
- Master download supports **Light**, **Dark**, or **Both** packaging so partners can grab the correct set without guessing.

---

## Deployment

Production hosting is **GitHub Pages**, configured for this repository’s project site:

| Item | Value |
| --- | --- |
| Site URL | https://rwyatt2.github.io/atp-brand-guidelines/ |
| Vite `base` | `/atp-brand-guidelines/` |
| Workflow | [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) |
| Trigger | Push to `main`, or manual `workflow_dispatch` |

### Deploy pipeline

1. Checkout repository
2. Setup Node 20 + npm cache
3. `npm ci`
4. `npm run build`
5. Upload `dist/` and deploy with `actions/deploy-pages`

No manual publish step is required for routine updates: merge or push to `main` and Actions handles the rest.

### If you rename the repository

Update `base` in [`vite.config.ts`](vite.config.ts) to match the new GitHub Pages path (e.g. `/new-repo-name/`), then redeploy.

---

## Development notes

### Path alias / base URL

Static assets and generated download URLs use `import.meta.env.BASE_URL`. Prefer that over hard-coded `/` paths so GitHub Pages routing stays correct.

### Bundle splitting

`vite.config.ts` splits vendor chunks (`react`, `three` / R3F, `framer-motion`, and remaining deps) to keep initial loads lean on the heavy 3D/motion stack.

### Optional image utilities

Root-level Python helpers (`remove_white_bg.py`, `fix_artifacts.py`) were used for one-off partner image cleanup with Pillow. They are **not** part of the app runtime or CI. Update their folder paths before running locally if you need them again.

### Password for downloads

The download password is defined in `src/context/DownloadGuardContext.tsx`. Rotate it there when credentials need to change. Treat it as a lightweight soft gate, not a substitute for private hosting of highly sensitive assets.

---

## Contributing

This is a brand-owned project. For internal contributors:

1. Create a branch from `main`
2. Keep changes scoped (one concern per PR)
3. Run `npm run lint` and `npm run build` before opening a PR
4. Prefer updating canonical tokens in `src/lib/` (especially `colors.ts` and lockup specs) over duplicating values in components
5. Visually verify light and dark modes, logo downloads, and the master ZIP after brand-system changes

---

## License

© Aligned Technology Partners. All rights reserved.

Brand marks, imagery, typography files, and guideline copy are proprietary. Do not redistribute assets outside authorized partners and internal teams without permission.

---

## Acknowledgments

- [Geist](https://vercel.com/font) typeface family
- [Vite](https://vite.dev/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/), [Three.js](https://threejs.org/)

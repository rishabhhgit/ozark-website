# Ozark — Landing Page (Plain React, no backend)

A static, client-only landing page for **Ozark**. Built with **React + Vite** —
no Next.js, no server, no API routes. It's just a website with one job: get someone
to click Download.

## Why Vite instead of Next.js

Next.js needs a native `swc` binary at dev/build time, and on some Windows machines
(antivirus interference, a partial install, OneDrive-synced folders, etc.) that binary
fails to load — which is the error you hit. Vite uses `esbuild` instead and doesn't
have that failure mode nearly as often, and this project has no use for anything
Next.js-specific (no server rendering, no API routes), so there's nothing lost by
dropping it.

## Setup

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

Build a static, deployable version:

```bash
npm run build
```

This outputs plain HTML/CSS/JS into `dist/`. Upload that folder to **any** static host —
Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3, or your own server. There is no
backend to run.

Preview the production build locally:

```bash
npm run preview
```

## Setting your real download link

Open **`src/lib/config.js`**:

```js
export const DOWNLOAD_URL = "https://example.com/Ozark-Setup.exe";
```

Replace that URL with your actual direct-download link (a GitHub Releases asset URL,
a CDN link, etc.). Every "Download" button on the page (`Header`, `Hero`,
`ClosingCTA`, `Footer`) reads from this one constant, so you only edit it once.

## Project structure

```
ozark-react/
├─ index.html            # HTML shell, loads Inter font
├─ vite.config.js        # Vite + React plugin, "@/" → src alias
├─ tailwind.config.js    # design tokens: bg, card, ink, sub, border, accent, hover, shadows
├─ postcss.config.js
├─ src/
│  ├─ main.jsx           # React root
│  ├─ App.jsx            # composes all sections
│  ├─ index.css          # Tailwind entry + hand-written motion/utility classes
│  ├─ lib/
│  │  ├─ config.js       # ← your real download URL goes here
│  │  └─ data.js         # nav links, footer links, providers, feature copy
│  └─ components/
│     ├─ Header.jsx      # sticky, blurred nav bar
│     ├─ Hero.jsx        # headline + primary CTA + app window
│     ├─ AppWindow.jsx   # reusable Mac-style app mockup (compact + detailed)
│     ├─ AppShowcase.jsx # full-detail app section
│     ├─ FeatureSection.jsx  # one alternating image/text row
│     ├─ FeatureVisual.jsx   # per-feature mini mockup
│     ├─ Features.jsx        # maps FEATURES data into rows
│     ├─ ClosingCTA.jsx      # bottom download banner
│     ├─ Footer.jsx          # minimal footer
│     ├─ Reveal.jsx          # scroll-reveal wrapper (IntersectionObserver)
│     └─ ui/
│        ├─ TrafficLights.jsx
│        ├─ Pill.jsx
│        └─ TypingDots.jsx
```

## Design tokens

| Token      | Value                        |
|------------|-------------------------------|
| Background | `#F7F7F5`                    |
| Card       | `#FCFCFB`                    |
| Ink (text) | `#111111`                    |
| Sub (text) | `#666666`                    |
| Border     | `rgba(0,0,0,.06)`             |
| Accent     | `#5E6AD2`                    |
| Hover      | `#EEF1FF`                    |
| Shadow     | `0 6px 20px rgba(0,0,0,.04)`  |
| Easing     | `cubic-bezier(.22,1,.36,1)`   |
| Radius     | 12–16px                      |

All defined once in `tailwind.config.js` — edit there to re-theme the whole site.

## Notes

- No forms, no accounts, no API calls, no environment variables — it's a static page.
- `AppWindow` is a hand-built mockup, not a screenshot, so there's no image asset to
  keep in sync with the real app.
- Motion respects `prefers-reduced-motion`.
- This was verified with a clean `npm install && npm run build` before packaging.

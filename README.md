# Portfolio v2 — Redesign Draft

A premium, dark-themed redesign draft of
[mohsinhaidersultan.github.io/Portfolio](https://mohsinhaidersultan.github.io/Portfolio/).
Review it first — nothing here is live until you decide to replace the current site.

## Files

| File | Purpose |
|---|---|
| `index.html` | Semantic single-page markup: nav, hero, about, projects, skills, journey, references, contact, footer |
| `styles.css` | Dark premium theme (Space Grotesk + Inter), responsive mobile-first, scroll-reveal animations |
| `script.js` | Mobile nav, IntersectionObserver reveals, mailto contact form, footer year |
| `README.md` | This file |

No build step, no dependencies — just static files. No external images are used
anywhere; all visuals are CSS/SVG.

## Placeholders to fill before going live

Search the code for `TODO` — each one is marked with an HTML/JS comment:

1. **CV download** (`index.html`, hero button) — `href="#"` → point to the real CV PDF, e.g. `href="cv.pdf"`.
2. **Email address** (`index.html` social links + `script.js` `RECIPIENT`) — replace with the real address.
3. **LinkedIn URL** (`index.html` social links) — replace with the real profile URL.
4. **Project screenshots** — styled placeholder blocks are used for AI LogGuard and the
   5 project cards. Swap each `.visual-placeholder` div for a real `<img>` when available.
5. **Project metrics** (`index.html`, featured project) — add real numbers, e.g. detection
   accuracy or events/second for AI LogGuard.
6. **Open Graph image** (`index.html` `<head>`) — uncomment and point to a real preview image.

## Preview locally

```bash
cd ~/workspace/portfolio-v2
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish to GitHub Pages (after review)

The current site is served from the `Portfolio` repository's main branch.
To replace it:

1. Commit these files to a **new repository first** (e.g. `portfolio-v2`) for review —
   do not overwrite `Portfolio` until approved.
2. Once approved, copy the files into the `Portfolio` repo's main branch
   (replacing the old site) and push.
3. GitHub Pages serves `index.html` automatically at
   `https://mohsinhaidersultan.github.io/Portfolio/`.

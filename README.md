# Sultan's Organics — Web App

A premium single-page storefront for **Sultan's Organics** — dry fruits & shilajit from Gilgit-Baltistan, Pakistan. Built on the brand site's editorial theme (warm cream `#f5f0e6`, paper `#fffaf0`, pine `#153f2c`, gold `#c38a35`, apricot `#d46f37`; Libre Caslon Display + DM Sans), with real product photography in `assets/`.

## What's inside

- **Brand sections** — hero, story, two collections, Gilgit place card, brand principles, FAQ
- **Real shop** — category filters (Dry Fruits / Shilajit / Combos), pack-size pills with live price updates, "Best Seller" ribbons
- **Cart drawer** — quantity controls, remove, subtotal, saved in `localStorage`
- **WhatsApp checkout** — builds the full order message (items, subtotal, name/phone/address) and opens `wa.me`
- **Extras** — sticky mobile order bar, back-to-top, toasts, scroll reveals, dark-mode support, fully responsive

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure |
| `styles.css` | All styles (theme + components) |
| `products.js` | **Catalog data + WhatsApp number — edit this** |
| `script.js` | Storefront logic |
| `assets/` | `hero.jpg`, `dry-fruits.jpg`, `shilajit.webp`, `gilgit.jpg` |

## ⚠ Before showing customers — 2 TODOs

1. **WhatsApp number** — in `products.js`, set `CONFIG.whatsappNumber` to the real WhatsApp Business number (country code + number, no `+`/spaces, e.g. `"923001234567"`). The sample `"923000000000"` is a dummy.
2. **Real products** — `PRODUCTS` in `products.js` is **sample data**. Replace names, descriptions, pack sizes and prices with the shop's real ones; delete/add items as needed. Keep the same object structure.

Also replace the `#` Instagram/Facebook links in the footer with the real page URLs.

## Publish (GitHub Pages)

1. Push these files to the repo's `main` branch (keep the `assets/` folder).
2. Repo → **Settings → Pages** → Deploy from branch → `main` → Save.
3. The site goes live at `https://<username>.github.io/<repo>/` within a minute or two.

Preview locally with any static server, e.g. `python3 -m http.server` in this folder.

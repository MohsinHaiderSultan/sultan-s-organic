# Sultan's Organics — Web App

A premium single-page storefront for **Sultan's Organics**, an online shop selling
handpicked dry fruits and pure shilajit from Gilgit-Baltistan, Pakistan.

There is no backend and no online payment — this follows the standard model for
small Pakistani food businesses: customers browse the catalog, build a cart, and
**check out over WhatsApp** (the cart composes an order message and opens a
`wa.me` link). Payment is **Cash on Delivery**.

## Files

| File          | Purpose                                                        |
|---------------|----------------------------------------------------------------|
| `index.html`  | Page structure: nav, hero, trust strip, shop, why-us, shilajit guide, footer, cart drawer |
| `styles.css`  | Warm premium theme (ivory / forest green / gold), mobile-first responsive |
| `products.js` | **CONFIG + product catalog** — the file you will edit most      |
| `script.js`   | Catalog rendering, filters, pack-size pricing, cart drawer, WhatsApp checkout |
| `README.md`   | This file                                                      |

No external images are used anywhere — all visuals are inline SVG / CSS.

## Before showing this to customers — 2 TODOs

### 1. Real WhatsApp number (`products.js`)
```js
const CONFIG = {
  whatsappNumber: "923000000000", // ← replace with the real WhatsApp Business number
  ...
};
```
Digits only, with country code, no `+` or spaces. Example: `"923001234567"`.
Every "WhatsApp Us" button, the footer order button, and the cart checkout all
use this number automatically.

### 2. Real products (`products.js`)
The catalog currently contains **⚠ SAMPLE DATA** (placeholder names, pack sizes
and prices) so the shop can be reviewed and tested. Replace each product's
`name`, `description`, `packs` (labels + prices) and `badge` with the shop's
real ones. Categories are `"dry-fruit"`, `"shilajit"` or `"combo"`.

Other small TODOs are marked in the code:
- `index.html`: Instagram / Facebook URLs (footer) and the `og:url` meta tag.

## How ordering works (for the shop owner)

1. Customer picks pack sizes, taps **Add to Cart** (cart is saved in the
   browser, so it survives a refresh).
2. In the cart drawer they enter name, phone and address, then tap
   **Order on WhatsApp**.
3. WhatsApp opens with a pre-written order summary, e.g.:

   > Assalam-o-Alaikum! I would like to order from Sultan's Organics:
   > • Kaghazi Badam (500g) x2 — Rs 3,700
   > Subtotal: Rs 3,700 · Delivery charges: as confirmed on WhatsApp
   > Name / Phone / Address …

4. You confirm the order and delivery charges in chat, pack fresh, and ship.

## Preview & publish (GitHub Pages)

- **Preview locally:** open `index.html` in a browser, or run
  `python3 -m http.server` in this folder and visit `http://localhost:8000`.
- **Publish:** push these files to a GitHub repo, then
  **Settings → Pages → Deploy from a branch → `main`** → Save.
  The site goes live at `https://<username>.github.io/<repo>/` within a minute.

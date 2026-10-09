/* ============================================================
   Sultan's Organics — storefront logic
   Renders the catalog from products.js, manages the cart drawer,
   and builds the WhatsApp checkout message.
   (products.js and CONFIG come from the <script> tag before this one)
   ============================================================ */
"use strict";

/* ---------- Line-icon library (stroke SVGs, no emoji, no images) ---------- */
const ICONS = {
  almond:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M24 5 C34 15 35 31 24 43 C13 31 14 15 24 5 Z"/><path d="M24 14 L24 34"/></svg>',
  walnut:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="24" cy="24" r="16"/><path d="M24 8 C20 16 28 20 24 28 C21 34 25 38 24 40"/></svg>',
  apricot:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="24" cy="25" r="15"/><path d="M24 10 Q30 25 24 40"/></svg>',
  pistachio:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6 C33 13 35 27 24 42 C13 27 15 13 24 6 Z"/><path d="M24 14 C28 20 28 30 24 36"/></svg>',
  cashew:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M32 6 C20 8 12 18 14 30 C15 38 22 43 28 42 C22 36 22 26 28 18 C30 15 31 10 32 6 Z"/><path d="M32 6 C36 14 36 26 30 34"/></svg>',
  raisin:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5"><ellipse cx="18" cy="18" rx="8" ry="10"/><ellipse cx="31" cy="20" rx="8" ry="10"/><ellipse cx="24" cy="33" rx="8" ry="10"/></svg>',
  fig:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M24 8 C31 18 33 28 24 41 C15 28 17 18 24 8 Z"/><path d="M24 8 L24 4 M20 6 L28 6"/></svg>',
  pinenut:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><ellipse cx="24" cy="24" rx="10" ry="17" transform="rotate(18 24 24)"/><path d="M20 12 L28 36" transform="rotate(18 24 24)"/></svg>',
  shilajit:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="16" width="24" height="24" rx="6"/><path d="M16 16 v-4 h16 v4"/><path d="M24 24 c-6 8 -6 12 0 16 c6 -4 6 -8 0 -16 Z"/></svg>',
  gift:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="18" width="32" height="22" rx="3"/><path d="M8 26 h32 M24 18 v22"/><path d="M24 18 C18 18 14 14 16 10 C18 7 23 10 24 18 Z M24 18 C30 18 34 14 32 10 C30 7 25 10 24 18 Z"/></svg>',
};

/* ---------- Helpers ---------- */
const $ = (sel) => document.querySelector(sel);
const money = (n) => CONFIG.currency + n.toLocaleString("en-US");
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- State ---------- */
let activeFilter = "all";
const selectedPack = {}; // productId -> pack index (default 0)
let cart = {}; // key "id|packLabel" -> { id, pack, qty }

try {
  cart = JSON.parse(localStorage.getItem("sultans_cart_v1") || "{}");
} catch (e) {
  cart = {};
}
const saveCart = () => {
  try {
    localStorage.setItem("sultans_cart_v1", JSON.stringify(cart));
  } catch (e) { /* storage unavailable — cart still works in memory */ }
};

/* ---------- Product grid ---------- */
function packIndex(id) {
  return selectedPack[id] || 0;
}

function renderProducts() {
  const grid = $("#productGrid");
  const list = PRODUCTS.filter((p) => activeFilter === "all" || p.category === activeFilter);

  grid.innerHTML = list
    .map((p) => {
      const pi = packIndex(p.id);
      const pack = p.packs[pi];
      return `
      <article class="card" data-id="${esc(p.id)}">
        <div class="card-visual">
          ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}
          <span class="ring" aria-hidden="true"></span>
          ${ICONS[p.motif] || ICONS.almond}
        </div>
        <div class="card-body">
          <h3>${esc(p.name)}</h3>
          <p class="card-sub">${esc(p.sub)}</p>
          <p class="card-desc">${esc(p.description)}</p>
          <div class="pack-row" role="group" aria-label="Pack size for ${esc(p.name)}">
            ${p.packs
              .map(
                (pk, i) =>
                  `<button class="pack${i === pi ? " active" : ""}" data-pack="${i}">${esc(pk.label)}</button>`
              )
              .join("")}
          </div>
          <div class="card-foot">
            <span class="price" data-price>${money(pack.price)}</span>
            <button class="btn btn-gold btn-sm" data-add>Add to Cart</button>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

/* Grid interactions: pack selection + add to cart (event delegation) */
$("#productGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const id = card.dataset.id;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;

  const packBtn = e.target.closest("[data-pack]");
  if (packBtn) {
    selectedPack[id] = Number(packBtn.dataset.pack);
    card.querySelectorAll(".pack").forEach((b, i) =>
      b.classList.toggle("active", i === selectedPack[id])
    );
    card.querySelector("[data-price]").textContent = money(product.packs[selectedPack[id]].price);
    return;
  }

  if (e.target.closest("[data-add]")) {
    addToCart(id);
  }
});

/* ---------- Category filters ---------- */
document.querySelectorAll(".pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach((p) => {
      p.classList.remove("active");
      p.setAttribute("aria-selected", "false");
    });
    pill.classList.add("active");
    pill.setAttribute("aria-selected", "true");
    activeFilter = pill.dataset.filter;
    renderProducts();
  });
});

/* ---------- Cart ---------- */
function cartCount() {
  return Object.values(cart).reduce((sum, line) => sum + line.qty, 0);
}
function cartSubtotal() {
  return Object.values(cart).reduce((sum, line) => {
    const p = PRODUCTS.find((x) => x.id === line.id);
    const pack = p.packs.find((pk) => pk.label === line.pack);
    return sum + pack.price * line.qty;
  }, 0);
}

function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  const pack = product.packs[packIndex(id)];
  const key = `${id}|${pack.label}`;
  if (cart[key]) cart[key].qty += 1;
  else cart[key] = { id, pack: pack.label, qty: 1 };
  saveCart();
  renderCart();
  toast(`${product.name} (${pack.label}) added to cart`);
}

function renderCart() {
  const itemsEl = $("#cartItems");
  const lines = Object.entries(cart);

  $("#cartEmpty").style.display = lines.length ? "none" : "block";
  $("#cartFoot").hidden = !lines.length;

  const n = cartCount();
  const badge = $("#cartCount");
  badge.hidden = n === 0;
  badge.textContent = n;
  $("#drawerCount").textContent = n ? `(${n})` : "";

  itemsEl.innerHTML = lines
    .map(([key, line]) => {
      const p = PRODUCTS.find((x) => x.id === line.id);
      const pack = p.packs.find((pk) => pk.label === line.pack);
      return `
      <div class="cart-line" data-key="${esc(key)}">
        <div>
          <div class="nm">${esc(p.name)}</div>
          <div class="pk">${esc(line.pack)} &middot; ${money(pack.price)} each</div>
        </div>
        <div class="ln-total">${money(pack.price * line.qty)}</div>
        <div class="qty-row">
          <button class="qty-btn" data-dec aria-label="Decrease quantity">&minus;</button>
          <span class="qty">${line.qty}</span>
          <button class="qty-btn" data-inc aria-label="Increase quantity">+</button>
          <button class="remove" data-remove>Remove</button>
        </div>
      </div>`;
    })
    .join("");

  $("#cartSubtotal").textContent = money(cartSubtotal());
}

/* Drawer line interactions (event delegation) */
$("#cartItems").addEventListener("click", (e) => {
  const lineEl = e.target.closest(".cart-line");
  if (!lineEl) return;
  const key = lineEl.dataset.key;
  if (!cart[key]) return;

  if (e.target.closest("[data-inc]")) cart[key].qty += 1;
  else if (e.target.closest("[data-dec]")) {
    cart[key].qty -= 1;
    if (cart[key].qty <= 0) delete cart[key];
  } else if (e.target.closest("[data-remove]")) {
    delete cart[key];
  } else return;

  saveCart();
  renderCart();
});

/* ---------- Drawer open/close ---------- */
const drawer = $("#cartDrawer");
const overlay = $("#overlay");
function openCart() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add("show"));
  document.body.style.overflow = "hidden";
}
function closeCart() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  overlay.classList.remove("show");
  document.body.style.overflow = "";
  setTimeout(() => { overlay.hidden = true; }, 260);
}
$("#cartOpenBtn").addEventListener("click", openCart);
$("#cartCloseBtn").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && drawer.classList.contains("open")) closeCart();
});

/* ---------- WhatsApp checkout ---------- */
function buildOrderMessage() {
  const lines = Object.values(cart).map((line) => {
    const p = PRODUCTS.find((x) => x.id === line.id);
    const pack = p.packs.find((pk) => pk.label === line.pack);
    return `\u2022 ${p.name} (${line.pack}) x${line.qty} \u2014 ${money(pack.price * line.qty)}`;
  });

  const name = $("#custName").value.trim();
  const phone = $("#custPhone").value.trim();
  const addr = $("#custAddr").value.trim();

  return [
    "Assalam-o-Alaikum! I would like to order from Sultan's Organics:",
    "",
    ...lines,
    "",
    `Subtotal: ${money(cartSubtotal())}`,
    "Delivery charges: as confirmed on WhatsApp",
    "",
    `Name: ${name || "-"}`,
    `Phone: ${phone || "-"}`,
    `Address: ${addr || "-"}`,
  ].join("\n");
}

$("#checkoutBtn").addEventListener("click", () => {
  if (!Object.keys(cart).length) return;
  const msg = encodeURIComponent(buildOrderMessage());
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`;
  window.open(url, "_blank", "noopener");
});

/* Generic WhatsApp links (hero CTA, footer) built from CONFIG */
document.querySelectorAll("[data-whatsapp]").forEach((a) => {
  const msg = encodeURIComponent(a.dataset.waMsg || "Assalam-o-Alaikum!");
  a.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`;
  a.target = "_blank";
  a.rel = "noopener";
});

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

/* ---------- Mobile nav ---------- */
const navToggle = $("#navToggle");
const navLinks = $("#navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

/* ---------- Scroll reveal ---------- */
const revealObs = new IntersectionObserver(
  (entries) =>
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("visible");
        revealObs.unobserve(en.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

/* ---------- Init ---------- */
$("#year").textContent = new Date().getFullYear();
renderProducts();
renderCart();

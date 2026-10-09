/* ============================================================================
   ⚠  SAMPLE DATA — IMPORTANT  ⚠
   ----------------------------------------------------------------------------
   The product names, pack sizes and prices below are PLACEHOLDERS so the
   storefront can be reviewed and tested. They are NOT the shop's real data.

   Before showing this website to customers you MUST:
     1. Replace every product's name, description, packs and prices with the
        shop's REAL ones.
     2. Replace CONFIG.whatsappNumber below with the real WhatsApp Business
        number (country code + number, digits only, no "+" or spaces).
        Example for Pakistan: "923001234567"
   ============================================================================ */

const CONFIG = {
  brandName: "Sultan's Organics",

  // TODO: ←←← REPLACE WITH REAL WHATSAPP BUSINESS NUMBER (digits only, e.g. "923001234567")
  whatsappNumber: "923000000000",

  currency: "Rs ",
  location: "Gilgit-Baltistan, Pakistan",
};

/* Product categories: "dry-fruit" | "shilajit" | "combo"
   motif: name of the line-icon drawn for the product card (see ICONS in script.js) */
const PRODUCTS = [
  {
    id: "badam",
    name: "Kaghazi Badam",
    sub: "Premium Almonds",
    category: "dry-fruit",
    description:
      "Thin-shell almonds from Hunza valley orchards — sweet, crunchy and full of natural oil. Hand-sorted, never polished.",
    packs: [
      { label: "250g", price: 950 },
      { label: "500g", price: 1850 },
      { label: "1kg", price: 3600 },
    ],
    badge: "Best Seller",
    motif: "almond",
  },
  {
    id: "akhrot",
    name: "Desi Akhrot",
    sub: "Mountain Walnuts",
    category: "dry-fruit",
    description:
      "Whole walnuts with rich, buttery kernels, sun-dried the traditional way in Gilgit. Crack one open — the taste tells the story.",
    packs: [
      { label: "500g", price: 1100 },
      { label: "1kg", price: 2100 },
    ],
    motif: "walnut",
  },
  {
    id: "khubani",
    name: "Khubani",
    sub: "Dried Apricots",
    category: "dry-fruit",
    description:
      "Naturally sun-dried Hunza apricots — soft, sweet and chewy with no added sugar or sulphur. Our most loved everyday snack.",
    packs: [
      { label: "250g", price: 650 },
      { label: "500g", price: 1250 },
      { label: "1kg", price: 2400 },
    ],
    badge: "Best Seller",
    motif: "apricot",
  },
  {
    id: "pista",
    name: "Namkeen Pista",
    sub: "Roasted Pistachios",
    category: "dry-fruit",
    description:
      "Lightly salted, perfectly roasted pistachios with big green kernels. The mehmaan-nawazi essential for every dastarkhwan.",
    packs: [
      { label: "250g", price: 1400 },
      { label: "500g", price: 2700 },
    ],
    motif: "pistachio",
  },
  {
    id: "kaju",
    name: "Kaju W240",
    sub: "Whole Cashews",
    category: "dry-fruit",
    description:
      "Large whole cashews, creamy and fresh — graded W240 for size. Great for snacking, desserts and festive cooking.",
    packs: [
      { label: "250g", price: 1500 },
      { label: "500g", price: 2900 },
    ],
    motif: "cashew",
  },
  {
    id: "kishmish",
    name: "Kishmish",
    sub: "Golden Raisins",
    category: "dry-fruit",
    description:
      "Plump golden raisins, naturally sweet with no added sugar. A handful a day — kids love them, elders swear by them.",
    packs: [
      { label: "250g", price: 550 },
      { label: "500g", price: 1050 },
      { label: "1kg", price: 2000 },
    ],
    motif: "raisin",
  },
  {
    id: "anjeer",
    name: "Anjeer",
    sub: "Dried Figs",
    category: "dry-fruit",
    description:
      "Soft, honey-sweet dried figs packed with natural fibre. A traditional winter favourite from the northern valleys.",
    packs: [
      { label: "250g", price: 1600 },
      { label: "500g", price: 3100 },
    ],
    motif: "fig",
  },
  {
    id: "chilgoza",
    name: "Chilgoza",
    sub: "Pine Nuts",
    category: "dry-fruit",
    description:
      "The king of dry fruits — wild-harvested pine nuts from high-altitude forests. Rich, buttery and worth every rupee.",
    packs: [
      { label: "100g", price: 2200 },
      { label: "250g", price: 5200 },
    ],
    badge: "Best Seller",
    motif: "pinenut",
  },
  {
    id: "shilajit",
    name: "Khalis Shilajit",
    sub: "Pure Himalayan Resin",
    category: "shilajit",
    description:
      "Sun-purified shilajit resin collected from high Karakoram rocks and lab-tested for purity. Our hero product — khalis aur qudrati.",
    packs: [
      { label: "10g", price: 2500 },
      { label: "20g", price: 4500 },
      { label: "30g", price: 6000 },
    ],
    badge: "Best Seller",
    motif: "shilajit",
  },
  {
    id: "winter-combo",
    name: "Winter Gift Combo",
    sub: "Mixed Dry Fruit Box",
    category: "combo",
    description:
      "A beautiful gift box of almonds, walnuts, apricots, pistachios and raisins — ready for weddings, winters and warm wishes.",
    packs: [{ label: "1kg gift box", price: 3500 }],
    motif: "gift",
  },
];

/* ============================================================================
   ⚠ SAMPLE DATA — replace with the shop's real products, pack sizes and
   prices before showing this website to customers.
   ============================================================================
   TODO (owner):
   1. Set CONFIG.whatsappNumber to the real WhatsApp Business number
      (country code + number, no +, no spaces — e.g. "923001234567").
   2. Replace every product below with the shop's REAL name, description,
      pack sizes and prices. Delete products you don't sell, add ones
      you do. Keep the same structure: { id, name, category, description,
      img, packs: [{ label, price }], badge? }.
   Category must be one of: "dry-fruit" | "shilajit" | "combo".
   ========================================================================== */

const IMG_SHILAJIT = "data:image/webp;base64,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";

const CONFIG = {
  brandName: "Sultan's Organics",
  currency: "Rs ",
  // TODO: replace with the real WhatsApp Business number before launch!
  whatsappNumber: "923000000000",
};

const PRODUCTS = [
  {
    id: "kaghazi-badam",
    name: "Kaghazi Badam",
    category: "dry-fruit",
    description: "Thin-shelled premium almonds — sweet, crunchy, hand-sorted.",
    imgClass: "photo-food",
    badge: "Best Seller",
    packs: [
      { label: "250g", price: 850 },
      { label: "500g", price: 1650 },
      { label: "1kg", price: 3200 },
    ],
  },
  {
    id: "desi-akhrot",
    name: "Desi Akhrot",
    category: "dry-fruit",
    description: "Mountain walnuts with rich, buttery kernels.",
    imgClass: "photo-food",
    packs: [
      { label: "250g", price: 700 },
      { label: "500g", price: 1350 },
      { label: "1kg", price: 2600 },
    ],
  },
  {
    id: "khubani",
    name: "Khubani",
    category: "dry-fruit",
    description: "Sun-dried Hunza apricots — naturally sweet, no additives.",
    imgClass: "photo-food",
    badge: "Best Seller",
    packs: [
      { label: "250g", price: 550 },
      { label: "500g", price: 1050 },
      { label: "1kg", price: 2000 },
    ],
  },
  {
    id: "namkeen-pista",
    name: "Namkeen Pista",
    category: "dry-fruit",
    description: "Lightly salted roasted pistachios, full of flavour.",
    imgClass: "photo-food",
    packs: [
      { label: "250g", price: 950 },
      { label: "500g", price: 1850 },
      { label: "1kg", price: 3600 },
    ],
  },
  {
    id: "kaju",
    name: "Kaju",
    category: "dry-fruit",
    description: "Whole creamy cashews — perfect for snacking and gifting.",
    imgClass: "photo-food",
    packs: [
      { label: "250g", price: 1100 },
      { label: "500g", price: 2150 },
      { label: "1kg", price: 4200 },
    ],
  },
  {
    id: "kishmish",
    name: "Kishmish",
    category: "dry-fruit",
    description: "Golden raisins — soft, sweet and naturally dried.",
    imgClass: "photo-food",
    packs: [
      { label: "250g", price: 450 },
      { label: "500g", price: 850 },
      { label: "1kg", price: 1600 },
    ],
  },
  {
    id: "anjeer",
    name: "Anjeer",
    category: "dry-fruit",
    description: "Premium dried figs — soft, honeyed and fibre-rich.",
    imgClass: "photo-food",
    packs: [
      { label: "250g", price: 800 },
      { label: "500g", price: 1550 },
      { label: "1kg", price: 3000 },
    ],
  },
  {
    id: "chilgoza",
    name: "Chilgoza",
    category: "dry-fruit",
    description: "The prized pine nut of the northern valleys.",
    imgClass: "photo-food",
    badge: "Best Seller",
    packs: [
      { label: "100g", price: 1500 },
      { label: "250g", price: 3600 },
      { label: "500g", price: 7000 },
    ],
  },
  {
    id: "khalis-shilajit",
    name: "Khalis Shilajit",
    category: "shilajit",
    description: "Pure, lab-tested mountain resin — sun-purified, no fillers.",
    img: IMG_SHILAJIT,
    badge: "Best Seller",
    packs: [
      { label: "10g", price: 1500 },
      { label: "20g", price: 2800 },
      { label: "30g", price: 4000 },
    ],
  },
  {
    id: "winter-gift-combo",
    name: "Winter Gift Combo",
    category: "combo",
    description: "A festive box of mixed dry fruits — ready for gifting.",
    imgClass: "photo-food",
    packs: [
      { label: "1 box", price: 2500 },
      { label: "2 boxes", price: 4800 },
    ],
  },
];

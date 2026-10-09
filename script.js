/* ============================================================================
   Sultan's Organics — storefront logic
   Renders the catalog from products.js, cart drawer, WhatsApp checkout,
   FAQ accordion, sticky bar, back-to-top, toasts, scroll reveals.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };

  function money(n) {
    return CONFIG.currency + n.toLocaleString("en-US");
  }

  /* ---------------- WhatsApp links ---------------- */
  function waLink(message) {
    return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
  }
  function wireWhatsAppLinks() {
    var links = document.querySelectorAll(".wa-link");
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute("href", waLink(links[i].getAttribute("data-wa-msg") || "Assalam-o-Alaikum!"));
      links[i].setAttribute("target", "_blank");
      links[i].setAttribute("rel", "noopener");
    }
  }

  /* ---------------- toast ---------------- */
  var toastTimer = null;
  function toast(msg) {
    var el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2400);
  }

  /* ---------------- product grid ---------------- */
  var activeFilter = "all";
  var selectedPacks = {}; // productId -> pack index

  function productCard(p) {
    var packIdx = selectedPacks[p.id] || 0;
    var pack = p.packs[packIdx];
    var pills = p.packs.map(function (pk, i) {
      return '<button class="pack-pill' + (i === packIdx ? " active" : "") +
        '" data-pack="' + i + '" aria-pressed="' + (i === packIdx) + '">' + pk.label + "</button>";
    }).join("");
    var ribbon = p.badge ? '<span class="ribbon">' + p.badge + "</span>" : "";
    return (
      '<article class="product-card reveal" data-id="' + p.id + '">' +
        '<div class="product-media">' + ribbon +
          (p.imgClass ? '<div class="p-photo ' + p.imgClass + '" role="img" aria-label="' + p.name + '"></div>' : '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy" />') +
        "</div>" +
        '<div class="product-body">' +
          "<h3>" + p.name + "</h3>" +
          '<p class="product-desc">' + p.description + "</p>" +
          '<div class="pack-pills" role="group" aria-label="Pack size for ' + p.name + '">' + pills + "</div>" +
          '<div class="product-foot">' +
            '<span class="price" data-price>' + money(pack.price) + "</span>" +
            '<button class="btn btn-primary btn-add" data-add>Add to Cart</button>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function renderProducts() {
    var grid = $("productGrid");
    var list = PRODUCTS.filter(function (p) {
      return activeFilter === "all" || p.category === activeFilter;
    });
    grid.innerHTML = list.map(productCard).join("");
    observeReveals(grid);
  }

  $("productGrid").addEventListener("click", function (e) {
    var card = e.target.closest(".product-card");
    if (!card) return;
    var id = card.getAttribute("data-id");
    var p = PRODUCTS.find(function (x) { return x.id === id; });
    if (!p) return;

    var packBtn = e.target.closest(".pack-pill");
    if (packBtn) {
      var idx = parseInt(packBtn.getAttribute("data-pack"), 10);
      selectedPacks[id] = idx;
      var pills = card.querySelectorAll(".pack-pill");
      pills.forEach(function (b, i) {
        b.classList.toggle("active", i === idx);
        b.setAttribute("aria-pressed", i === idx);
      });
      card.querySelector("[data-price]").textContent = money(p.packs[idx].price);
      return;
    }
    if (e.target.closest("[data-add]")) {
      var packIdx = selectedPacks[id] || 0;
      addToCart(p, packIdx);
    }
  });

  var filterBtns = document.querySelectorAll(".filters .pill");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      activeFilter = btn.getAttribute("data-filter");
      renderProducts();
    });
  });

  /* ---------------- cart ---------------- */
  var cart = [];
  try {
    cart = JSON.parse(localStorage.getItem("sultans_cart") || "[]");
  } catch (e) { cart = []; }

  function saveCart() {
    try { localStorage.setItem("sultans_cart", JSON.stringify(cart)); } catch (e) {}
  }
  function cartCount() {
    return cart.reduce(function (n, it) { return n + it.qty; }, 0);
  }
  function cartSubtotal() {
    return cart.reduce(function (s, it) { return s + it.price * it.qty; }, 0);
  }

  function addToCart(p, packIdx) {
    var pack = p.packs[packIdx];
    var key = p.id + "|" + packIdx;
    var found = cart.find(function (it) { return it.key === key; });
    if (found) { found.qty += 1; }
    else {
      cart.push({ key: key, id: p.id, name: p.name, pack: pack.label, price: pack.price, img: p.img || null, imgClass: p.imgClass || null, qty: 1 });
    }
    saveCart();
    renderCart();
    var badge = $("cartCount");
    badge.classList.remove("pop");
    void badge.offsetWidth;
    badge.classList.add("pop");
    toast(p.name + " (" + pack.label + ") added to cart");
  }

  function renderCart() {
    var n = cartCount();
    var badge = $("cartCount");
    badge.textContent = n;
    badge.hidden = n === 0;
    $("drawerCount").textContent = n ? "(" + n + ")" : "";

    var box = $("cartItems");
    if (cart.length === 0) {
      box.innerHTML = "";
      $("cartEmpty").style.display = "block";
      $("cartFoot").hidden = true;
      return;
    }
    $("cartEmpty").style.display = "none";
    $("cartFoot").hidden = false;
    box.innerHTML = cart.map(function (it) {
      return (
        '<div class="cart-item" data-key="' + it.key + '">' +
          (it.imgClass ? '<div class="cart-photo ' + it.imgClass + '" aria-hidden="true"></div>' : '<img src="' + it.img + '" alt="" />') +
          '<div class="cart-item-info"><h4>' + it.name + '</h4>' +
            '<span class="pack-label">' + it.pack + "</span>" +
            '<div class="qty-row">' +
              '<button class="qty-btn" data-dec aria-label="Decrease quantity">−</button>' +
              '<span class="qty">' + it.qty + "</span>" +
              '<button class="qty-btn" data-inc aria-label="Increase quantity">+</button>' +
            "</div>" +
          "</div>" +
          '<div class="cart-item-right">' +
            '<span class="line-total">' + money(it.price * it.qty) + "</span>" +
            '<button class="remove-btn" data-remove>Remove</button>' +
          "</div>" +
        "</div>"
      );
    }).join("");
    $("cartSubtotal").textContent = money(cartSubtotal());
  }

  $("cartItems").addEventListener("click", function (e) {
    var row = e.target.closest(".cart-item");
    if (!row) return;
    var key = row.getAttribute("data-key");
    var it = cart.find(function (x) { return x.key === key; });
    if (!it) return;
    if (e.target.closest("[data-inc]")) { it.qty += 1; }
    else if (e.target.closest("[data-dec]")) {
      it.qty -= 1;
      if (it.qty <= 0) { cart = cart.filter(function (x) { return x.key !== key; }); }
    }
    else if (e.target.closest("[data-remove]")) {
      cart = cart.filter(function (x) { return x.key !== key; });
    }
    else { return; }
    saveCart();
    renderCart();
  });

  /* drawer open/close */
  var drawer = $("cartDrawer"), overlay = $("overlay");
  function openCart() {
    drawer.hidden = false;
    overlay.hidden = false;
    requestAnimationFrame(function () { drawer.classList.remove("closed"); });
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    drawer.classList.add("closed");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(function () {
      drawer.hidden = true;
      overlay.hidden = true;
    }, reduceMotion ? 0 : 350);
  }
  drawer.classList.add("closed");
  $("cartOpenBtn").addEventListener("click", openCart);
  $("cartCloseBtn").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !drawer.hidden) closeCart();
  });

  /* ---------------- WhatsApp checkout ---------------- */
  $("checkoutBtn").addEventListener("click", function () {
    if (cart.length === 0) return;
    var lines = ["*New Order — " + CONFIG.brandName + "*", "--------------------------"];
    cart.forEach(function (it) {
      lines.push("• " + it.name + " (" + it.pack + ") × " + it.qty + " — " + money(it.price * it.qty));
    });
    lines.push("--------------------------");
    lines.push("Subtotal: " + money(cartSubtotal()));
    var name = $("custName").value.trim();
    var phone = $("custPhone").value.trim();
    var addr = $("custAddr").value.trim();
    if (name) lines.push("Name: " + name);
    if (phone) lines.push("Phone: " + phone);
    if (addr) lines.push("Address: " + addr);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
    toast("Opening WhatsApp with your order…");
  });

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".faq-q").forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
      });
      btn.setAttribute("aria-expanded", String(!open));
    });
  });

  /* ---------------- sticky bar + back-to-top ---------------- */
  var stickyBar = $("stickyBar"), backTop = $("backToTop"), hero = document.querySelector(".hero");
  function onScroll() {
    var past = window.scrollY > (hero ? hero.offsetHeight * 0.6 : 500);
    stickyBar.classList.toggle("show", past);
    backTop.classList.toggle("show", window.scrollY > 900);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------------- scroll reveals ---------------- */
  var observer = null;
  function observeReveals(root) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      (root || document).querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            observer.unobserve(en.target);
          }
        });
      }, { threshold: 0.12 });
    }
    (root || document).querySelectorAll(".reveal:not(.visible)").forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------------- init ---------------- */
  document.querySelectorAll("main .wrap > .section-label, main .wrap > h2, .place-copy, .principle, .faq-item").forEach(function (el) {
    el.classList.add("reveal");
  });
  wireWhatsAppLinks();
  renderProducts();
  renderCart();
  observeReveals(document);
})();

// ============================================================
// SERAVIQUE — APLIKASI UTAMA
// (Tidak perlu diubah untuk menambah produk)
// ============================================================

// ── STATE ──────────────────────────────────────────────────
let cart = [];
let activeCategory = "all";
let activeBrands = [];
let activeConditions = [];
let maxPrice = 500000;
let currentPage = "home";

// ── INIT ───────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    buildCategoryGrid();
    buildFeaturedGrid();
    buildShopSidebar();
    renderShopGrid(products);
    setupSearch();
    updatePriceRange();
});

// ── NAVIGATION ─────────────────────────────────────────────
function showPage(page) {
    document.getElementById("page-home").style.display = page === "home" ? "" : "none";
    document.getElementById("page-shop").style.display = page === "shop" ? "" : "none";
    currentPage = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToSection(id) {
    showPage("home");
    setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
}

// ── NAVBAR SCROLL ──────────────────────────────────────────
window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    nav.classList.toggle("scrolled", window.scrollY > 40);
});

// ── MOBILE MENU ────────────────────────────────────────────
function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    const hamburger = document.getElementById("hamburger");
    menu.classList.toggle("open");
    hamburger.classList.toggle("open");
}

// ── SEARCH ─────────────────────────────────────────────────
function setupSearch() {
    const toggle = document.getElementById("searchToggle");
    const bar = document.getElementById("searchBar");
    const input = document.getElementById("searchInput");

    toggle.addEventListener("click", () => {
        bar.classList.toggle("open");
        if (bar.classList.contains("open")) input.focus();
    });

    input.addEventListener("input", () => {
        const q = input.value.trim().toLowerCase();
        if (q.length < 2) return;
        const results = products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
        // Navigate to shop and filter
        showPage("shop");
        document.getElementById("shopSearchInput").value = q;
        filterProducts();
    });
}

function closeSearch() {
    document.getElementById("searchBar").classList.remove("open");
    document.getElementById("searchInput").value = "";
}

// ── CATEGORIES GRID (Home) ─────────────────────────────────
function buildCategoryGrid() {
    const grid = document.getElementById("categoryGrid");
    grid.innerHTML = CATEGORIES.map(cat => `
    <button class="category-card" onclick="filterByCategory('${cat.label}'); showPage('shop')">
      <span class="cat-icon">${cat.icon}</span>
      <span class="cat-label">${cat.label}</span>
      <span class="cat-count">${products.filter(p => p.category === cat.id).length} item</span>
    </button>
  `).join("");
}

// ── FEATURED GRID (Home) ───────────────────────────────────
function buildFeaturedGrid() {
    const grid = document.getElementById("featuredGrid");
    const featured = products.filter(p => p.featured).slice(0, 6);
    grid.innerHTML = featured.map(p => productCard(p)).join("");
}

// ── SHOP SIDEBAR ───────────────────────────────────────────
function buildShopSidebar() {
    // Categories
    const catEl = document.getElementById("sidebarCategories");
    catEl.innerHTML = `<label class="filter-item"><input type="radio" name="cat" value="all" checked onchange="filterProducts()"><span>Semua</span></label>` +
        CATEGORIES.map(c => `
      <label class="filter-item">
        <input type="radio" name="cat" value="${c.id}" onchange="filterProducts()">
        <span>${c.icon} ${c.label}</span>
      </label>
    `).join("");

    // Brands
    const brands = [...new Set(products.map(p => p.brand))].sort();
    const brandEl = document.getElementById("sidebarBrands");
    brandEl.innerHTML = brands.map(b => `
    <label class="filter-item">
      <input type="checkbox" value="${b}" onchange="filterProducts()">
      <span>${b}</span>
    </label>
  `).join("");

    // Conditions
    const condEl = document.getElementById("sidebarConditions");
    condEl.innerHTML = CONDITIONS.map(c => `
    <label class="filter-item">
      <input type="checkbox" value="${c.value}" onchange="filterProducts()">
      <span>${c.label}</span>
    </label>
  `).join("");

    // Price range max
    const maxP = Math.max(...products.map(p => p.price));
    const rangeEl = document.getElementById("priceRange");
    rangeEl.max = maxP;
    rangeEl.value = maxP;
    document.getElementById("priceLabel").textContent = formatRupiah(maxP);
}

function updatePriceRange() {
    const range = document.getElementById("priceRange");
    if (!range) return;
    document.getElementById("priceLabel").textContent = formatRupiah(parseInt(range.value));
}

// ── FILTER LOGIC ───────────────────────────────────────────
function filterProducts() {
    const catInput = document.querySelector('input[name="cat"]:checked');
    const selectedCat = catInput ? catInput.value : "all";

    const brandCheckboxes = document.querySelectorAll('#sidebarBrands input:checked');
    const selectedBrands = [...brandCheckboxes].map(el => el.value);

    const condCheckboxes = document.querySelectorAll('#sidebarConditions input:checked');
    const selectedConds = [...condCheckboxes].map(el => el.value);

    const priceEl = document.getElementById("priceRange");
    const maxP = priceEl ? parseInt(priceEl.value) : 9999999;
    document.getElementById("priceLabel").textContent = formatRupiah(maxP);

    const shopQ = document.getElementById("shopSearchInput")?.value.trim().toLowerCase() || "";

    let filtered = products.filter(p => {
        if (selectedCat !== "all" && p.category !== selectedCat) return false;
        if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
        if (selectedConds.length && !selectedConds.includes(p.condition)) return false;
        if (p.price > maxP) return false;
        if (shopQ && !(
            p.name.toLowerCase().includes(shopQ) ||
            p.brand.toLowerCase().includes(shopQ) ||
            p.desc?.toLowerCase().includes(shopQ)
        )) return false;
        return true;
    });

    renderShopGrid(filtered);
}

function filterByCategory(label) {
    const cat = CATEGORIES.find(c => c.label === label);
    if (!cat) return;
    setTimeout(() => {
        const radio = document.querySelector(`input[name="cat"][value="${cat.id}"]`);
        if (radio) { radio.checked = true; filterProducts(); }
    }, 100);
}

function resetFilters() {
    const allRadio = document.querySelector('input[name="cat"][value="all"]');
    if (allRadio) allRadio.checked = true;
    document.querySelectorAll('#sidebarBrands input, #sidebarConditions input')
        .forEach(el => el.checked = false);
    const range = document.getElementById("priceRange");
    if (range) { range.value = range.max; updatePriceRange(); }
    const shopQ = document.getElementById("shopSearchInput");
    if (shopQ) shopQ.value = "";
    renderShopGrid(products);
}

// ── RENDER PRODUCTS ────────────────────────────────────────
function renderShopGrid(list) {
    const grid = document.getElementById("shopGrid");
    const noResult = document.getElementById("noResult");
    const countEl = document.getElementById("productCount");

    if (!list.length) {
        grid.innerHTML = "";
        noResult.style.display = "block";
        countEl.textContent = "0 produk";
        return;
    }

    noResult.style.display = "none";
    countEl.textContent = `${list.length} produk`;
    grid.innerHTML = list.map(p => productCard(p)).join("");
}

// ── PRODUCT CARD ───────────────────────────────────────────
function productCard(p) {
    const cond = CONDITIONS.find(c => c.value === p.condition);
    const sizes = Array.isArray(p.size) ? p.size.join(", ") : p.size;
    const imgContent = p.image
        ? `<img src="${p.image}" alt="${p.name}" />`
        : `<div class="img-placeholder"><span>${p.name.split(" ")[0]}</span></div>`;

    return `
    <div class="product-card" onclick="openModal(${p.id})">
      <div class="product-img">
        ${imgContent}
        <span class="condition-badge condition-${p.condition}">${cond ? cond.label : p.condition}</span>
      </div>
      <div class="product-info">
        <p class="product-brand">${p.brand}</p>
        <p class="product-name">${p.name}</p>
        <p class="product-size">Size: ${sizes}</p>
        <div class="product-footer">
          <span class="product-price">${formatRupiah(p.price)}</span>
          <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${p.id})">+</button>
        </div>
      </div>
    </div>
  `;
}

// ── PRODUCT MODAL ──────────────────────────────────────────
function openModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const cond = CONDITIONS.find(c => c.value === p.condition);
    const cat = CATEGORIES.find(c => c.id === p.category);
    const sizes = Array.isArray(p.size) ? p.size : [p.size];
    const imgContent = p.image
        ? `<img src="${p.image}" alt="${p.name}" />`
        : `<div class="modal-img-placeholder"><span>${p.name.split(" ")[0]}</span></div>`;

    document.getElementById("modalContent").innerHTML = `
    <div class="modal-img">${imgContent}</div>
    <div class="modal-detail">
      <p class="modal-brand">${p.brand}</p>
      <h2 class="modal-name">${p.name}</h2>
      <p class="modal-price">${formatRupiah(p.price)}</p>
      <div class="modal-tags">
        <span class="tag">${cat ? cat.label : p.category}</span>
        <span class="tag condition-${p.condition}">${cond ? cond.label : p.condition}</span>
        <span class="tag">${p.color}</span>
      </div>
      <div class="modal-sizes">
        <p class="label">Ukuran</p>
        <div class="size-chips">
          ${sizes.map(s => `<span class="size-chip">${s}</span>`).join("")}
        </div>
      </div>
      <div class="modal-desc">
        <p class="label">Deskripsi</p>
        <p>${p.desc || "-"}</p>
      </div>
      ${p.sizeGuide ? `
      <div class="modal-size-guide">
        <p class="label">Panduan Ukuran</p>
        <p>${p.sizeGuide}</p>
      </div>` : ""}
      <div class="modal-notes">
        <p class="label">Catatan Kondisi</p>
        <p>${p.notes || "-"}</p>
      </div>
      <div class="modal-order-buttons">
        <button class="btn-order-wa" onclick="orderViaWA(${p.id})">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.122 1.528 5.855L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.214-3.727.977.995-3.635-.235-.374A9.818 9.818 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/></svg>
          Pesan via WhatsApp
        </button>
        <button class="btn-order-tiktok" onclick="orderViaTikTok(${p.id})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
          Pesan via TikTok Shop
        </button>
      </div>
    </div>
  `;

    document.getElementById("modalOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeModal(e) {
    if (e && e.target !== document.getElementById("modalOverlay")) return;
    document.getElementById("modalOverlay").classList.remove("open");
    document.body.style.overflow = "";
}

// ── CART ───────────────────────────────────────────────────
function addToCart(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const existing = cart.find(x => x.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...p, qty: 1 });
    }
    updateCartUI();
    showToast(`${p.name} ditambahkan ke keranjang!`);
}

function removeFromCart(id) {
    cart = cart.filter(x => x.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const count = cart.reduce((s, x) => s + x.qty, 0);
    document.getElementById("cartCount").textContent = count;
    document.getElementById("cartCount").style.display = count ? "flex" : "none";

    const itemsEl = document.getElementById("cartItems");
    const footerEl = document.getElementById("cartFooter");

    if (!cart.length) {
        itemsEl.innerHTML = `<div class="cart-empty"><p>Keranjang masih kosong</p></div>`;
        footerEl.innerHTML = "";
        return;
    }

    itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        ${item.image ? `<img src="${item.image}" alt="${item.name}">` : `<div class="ci-placeholder">${item.name[0]}</div>`}
      </div>
      <div class="cart-item-info">
        <p class="ci-brand">${item.brand}</p>
        <p class="ci-name">${item.name}</p>
        <p class="ci-price">${formatRupiah(item.price)}</p>
      </div>
      <button class="ci-remove" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join("");

    const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
    footerEl.innerHTML = `
    <div class="cart-total">
      <span>Total</span>
      <span>${formatRupiah(total)}</span>
    </div>
    <button class="btn-primary full-width" onclick="checkout()">Checkout via WhatsApp</button>
    <p class="cart-note">*Kamu akan diarahkan ke WhatsApp untuk konfirmasi order</p>
  `;
}

function toggleCart() {
    const overlay = document.getElementById("cartOverlay");
    overlay.classList.toggle("open");
    document.body.style.overflow = overlay.classList.contains("open") ? "hidden" : "";
}

function closeCart(e) {
    if (e && e.target !== document.getElementById("cartOverlay")) return;
    document.getElementById("cartOverlay").classList.remove("open");
    document.body.style.overflow = "";
}

// ── ORDER DARI MODAL ────────────────────────────────────────
function orderViaWA(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const sizes = Array.isArray(p.size) ? p.size.join(" / ") : p.size;
    const msg = encodeURIComponent(
        `Halo Seravique! Saya tertarik dengan produk ini:\n\n` +
        `• Produk : ${p.name}\n` +
        `• Brand  : ${p.brand}\n` +
        `• Ukuran : ${sizes}\n` +
        `• Harga  : ${formatRupiah(p.price)}\n\n` +
        `Apakah masih tersedia? Terima kasih!`
    );
    // Ganti nomor WA di bawah ini (format: 6281217883105)
    window.open(`https://wa.me/6281217883105?text=${msg}`, "_blank");
}

function orderViaTikTok(id) {
    // Ganti URL di bawah ini dengan link TikTok Shop tokomu
    // Contoh: https://www.tiktok.com/@seravique.trift/shop
    window.open(`https://www.tiktok.com/@seravique.trift`, "_blank");
}

function checkout() {
    if (!cart.length) return;
    const lines = cart.map(x => `• ${x.name} (${x.brand}) - ${formatRupiah(x.price)}`).join("\n");
    const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
    const msg = encodeURIComponent(`Halo Seravique! Saya ingin order:\n\n${lines}\n\nTotal: ${formatRupiah(total)}\n\nMohon info ketersediaan dan pengiriman. Terima kasih!`);
    // Ganti nomor WA di bawah ini dengan nomormu (format: 6281217883105)
    window.open(`https://wa.me/6281217883105?text=${msg}`, "_blank");
}

// ── TOAST ──────────────────────────────────────────────────
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
}

// ── UTILS ──────────────────────────────────────────────────
function formatRupiah(n) {
    return "Rp " + n.toLocaleString("id-ID");
}
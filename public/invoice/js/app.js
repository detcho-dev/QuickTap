/* =========================================================
   POS App – main logic
   Depends on: js/supabase.js (supabaseClient, SUPABASE_URL, SUPABASE_ANON_KEY)
   ========================================================= */

const AUTH_KEY = 'pos_admin_session';

let state = {
  products: [],
  offers: [],
  invoices: [],
  settings: null,
  cart: [],
};

/* ============ AUTH (simple gate) ============ */
function isLoggedIn() {
  return sessionStorage.getItem(AUTH_KEY) === 'ok';
}
async function login() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPassword').value;
  const err = document.getElementById('loginError');
  err.classList.add('d-none');

  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password: pass })
    });

    if (!res.ok) {
      err.textContent = 'Invalid email or password';
      err.classList.remove('d-none');
      return;
    }

    const data = await res.json();
    // خزّن الـ token عشان supabaseClient يستخدمه
    sessionStorage.setItem('access_token', data.access_token);
    sessionStorage.setItem('refresh_token', data.refresh_token);
    sessionStorage.setItem(AUTH_KEY, 'ok');
    showApp();
  } catch (e) {
    err.textContent = 'Login failed: ' + e.message;
    err.classList.remove('d-none');
  }
}
async function logout() {
  const token = sessionStorage.getItem('access_token');
  if (token) {
    // اختياري: بلّغ Supabase إن الجلسة انتهت
    try {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (e) { /* تجاهل */ }
  }
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
  sessionStorage.removeItem(AUTH_KEY);
  location.reload();
}

function showLogin() {
  document.getElementById('loginOverlay').style.display = 'flex';
  document.getElementById('app').classList.add('d-none');
}
function showApp() {
  document.getElementById('loginOverlay').style.display = 'none';
  document.getElementById('app').classList.remove('d-none');
  navigate('dashboard');
}

/* ============ NAVIGATION ============ */
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('d-none'));
  const el = document.getElementById('page-' + page);
  if (el) el.classList.remove('d-none');

  document.querySelectorAll('.sidebar .nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  if (page === 'dashboard') loadDashboard();
  if (page === 'products') loadProducts();
  if (page === 'offers') loadOffers();
  if (page === 'checkout') loadCheckout();
  if (page === 'invoices') loadInvoices();
  if (page === 'settings') loadSettings();
}

/* ============ DATA LOADERS ============ */
async function loadProducts() {
  try {
    const data = await supabaseClient.request(
      'pos_products?category=eq.product&order=created_at.desc'
    );
    state.products = data || [];
    renderProductsTable();
    if (document.getElementById('page-dashboard') && !document.getElementById('page-dashboard').classList.contains('d-none')) {
      document.getElementById('statProducts').textContent = state.products.length;
    }
  } catch (e) {
    console.error(e);
    alert('Failed to load products: ' + e.message);
  }
}

async function loadOffers() {
  try {
    const data = await supabaseClient.request(
      'pos_products?category=eq.offer&order=created_at.desc'
    );
    state.offers = data || [];
    renderOffersTable();
  } catch (e) {
    console.error(e);
    alert('Failed to load offers: ' + e.message);
  }
}

async function loadInvoices() {
  try {
    const data = await supabaseClient.request(
      'pos_invoices?order=created_at.desc'
    );
    state.invoices = data || [];
    renderInvoicesTable();
    if (!document.getElementById('page-dashboard').classList.contains('d-none')) {
      document.getElementById('statInvoices').textContent = state.invoices.length;
    }
  } catch (e) {
    console.error(e);
    alert('Failed to load invoices: ' + e.message);
  }
}

async function loadSettings() {
  try {
    const data = await supabaseClient.request('pos_settings?id=eq.1');
    state.settings = (data && data[0]) || null;
    fillSettingsForm();
  } catch (e) {
    console.error(e);
  }
}

/* ============ DASHBOARD ============ */
async function loadDashboard() {
  await Promise.all([loadProducts(), loadOffers(), loadInvoices(), loadSettings()]);
  document.getElementById('statProducts').textContent = state.products.length;
  document.getElementById('statOffers').textContent = state.offers.length;
  document.getElementById('statInvoices').textContent = state.invoices.length;

  const revenue = state.invoices.reduce((s, inv) => s + Number(inv.total || 0), 0);
  document.getElementById('statRevenue').textContent =
    (state.settings?.currency || 'EGP') + ' ' + revenue.toFixed(2);

  // recent 5
  const recent = state.invoices.slice(0, 5);
  if (!recent.length) {
    document.getElementById('recentInvoices').innerHTML =
      '<p class="text-muted">No invoices yet.</p>';
    return;
  }
  let html = `<table class="table table-sm bg-white"><thead><tr>
    <th>Invoice #</th><th>Customer</th><th>Total</th><th>Date</th><th></th>
  </tr></thead><tbody>`;
  recent.forEach(inv => {
    html += `<tr>
      <td>${esc(inv.invoice_number)}</td>
      <td>${esc(inv.customer_name)}</td>
      <td>${money(inv.total)}</td>
      <td>${new Date(inv.created_at).toLocaleString()}</td>
      <td><a class="btn btn-sm btn-outline-primary" target="_blank"
             href="invoice/invoice.html?inv=${encodeURIComponent(inv.invoice_number)}">View</a></td>
    </tr>`;
  });
  html += '</tbody></table>';
  document.getElementById('recentInvoices').innerHTML = html;
}

/* ============ PRODUCTS TABLE ============ */
function renderProductsTable() {
  if (!state.products.length) {
    document.getElementById('productsTable').innerHTML =
      '<p class="text-muted">No products yet. Add your first one.</p>';
    return;
  }
  let html = `<table class="table bg-white align-middle"><thead><tr>
    <th>Name</th><th>Price</th><th>Stock</th><th>Description</th><th></th>
  </tr></thead><tbody>`;
  state.products.forEach(p => {
    html += `<tr>
      <td class="fw-semibold">${esc(p.name)}</td>
      <td>${money(p.price)}</td>
      <td>${p.stock_quantity <= 0
        ? '<span class="badge bg-danger">Out of stock</span>'
        : p.stock_quantity}</td>
      <td class="text-muted small">${esc(p.description || '')}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-secondary"
                onclick="openProductModal('${p.id}')">Edit</button>
        <button class="btn btn-sm btn-outline-danger"
                onclick="deleteItem('${p.id}')">Delete</button>
      </td>
    </tr>`;
  });
  html += '</tbody></table>';
  document.getElementById('productsTable').innerHTML = html;
}

/* ============ OFFERS TABLE ============ */
function renderOffersTable() {
  if (!state.offers.length) {
    document.getElementById('offersTable').innerHTML =
      '<p class="text-muted">No offers yet. Add your first one.</p>';
    return;
  }
  let html = `<table class="table bg-white align-middle"><thead><tr>
    <th>Name</th><th>Price</th><th>Stock</th><th>Description</th><th></th>
  </tr></thead><tbody>`;
  state.offers.forEach(p => {
    html += `<tr>
      <td class="fw-semibold">${esc(p.name)}</td>
      <td>${money(p.price)}</td>
      <td>${p.stock_quantity <= 0
        ? '<span class="badge bg-danger">Out of stock</span>'
        : p.stock_quantity}</td>
      <td class="text-muted small">${esc(p.description || '')}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-secondary"
                onclick="openOfferModal('${p.id}')">Edit</button>
        <button class="btn btn-sm btn-outline-danger"
                onclick="deleteItem('${p.id}')">Delete</button>
      </td>
    </tr>`;
  });
  html += '</tbody></table>';
  document.getElementById('offersTable').innerHTML = html;
}

/* ============ INVOICES TABLE ============ */
function renderInvoicesTable() {
  if (!state.invoices.length) {
    document.getElementById('invoicesTable').innerHTML =
      '<p class="text-muted">No invoices yet.</p>';
    return;
  }
  let html = `<table class="table bg-white align-middle"><thead><tr>
    <th>Invoice #</th><th>Customer</th><th>Company</th><th>Total</th>
    <th>Date</th><th></th>
  </tr></thead><tbody>`;
  state.invoices.forEach(inv => {
    html += `<tr>
      <td class="fw-semibold">${esc(inv.invoice_number)}</td>
      <td>${esc(inv.customer_name)}</td>
      <td>${inv.is_company ? '<span class="badge bg-info text-dark">Yes</span>' : '—'}</td>
      <td>${money(inv.total)}</td>
      <td>${new Date(inv.created_at).toLocaleString()}</td>
      <td class="text-end">
        <a class="btn btn-sm btn-outline-primary" target="_blank"
           href="invoice/invoice.html?inv=${encodeURIComponent(inv.invoice_number)}">View</a>
        <button class="btn btn-sm btn-outline-secondary"
                onclick="copyLink('${inv.invoice_number}')">Copy link</button>
      </td>
    </tr>`;
  });
  html += '</tbody></table>';
  document.getElementById('invoicesTable').innerHTML = html;
}

/* ============ PRODUCT MODAL ============ */
let modalInstance = null;
function getModal() {
  if (!modalInstance) modalInstance = new bootstrap.Modal(document.getElementById('itemModal'));
  return modalInstance;
}

function openProductModal(id = null) {
  document.getElementById('modalTitle').textContent = id ? 'Edit Product' : 'Add Product';
  document.getElementById('modalCategory').value = 'product';
  const item = id ? state.products.find(p => p.id === id) : null;
  fillModal(item);
  getModal().show();
}

function openOfferModal(id = null) {
  document.getElementById('modalTitle').textContent = id ? 'Edit Offer' : 'Add Offer';
  document.getElementById('modalCategory').value = 'offer';
  const item = id ? state.offers.find(p => p.id === id) : null;
  fillModal(item);
  getModal().show();
}

function fillModal(item) {
  document.getElementById('modalId').value = item?.id || '';
  document.getElementById('modalName').value = item?.name || '';
  document.getElementById('modalPrice').value = item?.price ?? '';
  document.getElementById('modalStock').value = item?.stock_quantity ?? 0;
  document.getElementById('modalDesc').value = item?.description || '';
}

async function saveItem() {
  const id = document.getElementById('modalId').value;
  const category = document.getElementById('modalCategory').value;
  const payload = {
    name: document.getElementById('modalName').value.trim(),
    price: parseFloat(document.getElementById('modalPrice').value) || 0,
    stock_quantity: parseInt(document.getElementById('modalStock').value) || 0,
    description: document.getElementById('modalDesc').value.trim(),
    category
  };

  if (!payload.name) { alert('Name is required'); return; }

  try {
    if (id) {
      await supabaseClient.request(`pos_products?id=eq.${id}`, {
        method: 'PATCH', body: payload
      });
    } else {
      await supabaseClient.request('pos_products', {
        method: 'POST', body: payload
      });
    }
    getModal().hide();
    if (category === 'product') await loadProducts();
    else await loadOffers();
  } catch (e) {
    alert('Save failed: ' + e.message);
  }
}

async function deleteItem(id) {
  if (!confirm('Delete this item?')) return;
  try {
    await supabaseClient.request(`pos_products?id=eq.${id}`, { method: 'DELETE' });
    await loadProducts();
    await loadOffers();
  } catch (e) {
    alert('Delete failed: ' + e.message);
  }
}

/* ============ CHECKOUT ============ */
async function loadCheckout() {
  // ensure both lists loaded
  if (!state.products.length) await loadProducts();
  if (!state.offers.length) await loadOffers();
  if (!state.settings) await loadSettings();

  const sel = document.getElementById('checkoutItemSelect');
  sel.innerHTML = '';

  const all = [...state.products, ...state.offers];
  all.forEach(p => {
    if (p.stock_quantity > 0) {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.name} — ${money(p.price)} (stock: ${p.stock_quantity})`;
      sel.appendChild(opt);
    }
  });

  document.getElementById('deliveryFee').value = state.settings?.default_delivery_fee || 0;
  document.getElementById('isCompany').checked = false;
  renderCart();
  recalcTotals();
}

function addCheckoutItem() {
  const sel = document.getElementById('checkoutItemSelect');
  const id = sel.value;
  const qty = parseInt(document.getElementById('checkoutQty').value) || 1;
  if (!id) return;

  const all = [...state.products, ...state.offers];
  const prod = all.find(p => p.id === id);
  if (!prod) return;

  if (qty > prod.stock_quantity) {
    alert(`Only ${prod.stock_quantity} in stock.`);
    return;
  }

  const existing = state.cart.find(c => c.product_id === id);
  if (existing) {
    const newQty = existing.quantity + qty;
    if (newQty > prod.stock_quantity) {
      alert(`Only ${prod.stock_quantity} in stock.`);
      return;
    }
    existing.quantity = newQty;
  } else {
    state.cart.push({
      product_id: id,
      name: prod.name,
      price: Number(prod.price),
      quantity: qty,
      category: prod.category
    });
  }
  renderCart();
  recalcTotals();
}

function removeCartItem(index) {
  state.cart.splice(index, 1);
  renderCart();
  recalcTotals();
}

function renderCart() {
  const el = document.getElementById('cartItems');
  if (!state.cart.length) {
    el.innerHTML = '<p class="text-muted mb-0">Cart is empty.</p>';
    return;
  }
  let html = '';
  state.cart.forEach((c, i) => {
    html += `<div class="cart-item">
      <div>
        <div class="fw-semibold">${esc(c.name)}</div>
        <div class="text-muted small">${money(c.price)} × ${c.quantity}</div>
      </div>
      <div class="text-end">
        <div class="fw-semibold">${money(c.price * c.quantity)}</div>
        <button class="btn btn-sm btn-link text-danger p-0"
                onclick="removeCartItem(${i})">Remove</button>
      </div>
    </div>`;
  });
  el.innerHTML = html;
}

function recalcTotals() {
  const subtotal = state.cart.reduce((s, c) => s + c.price * c.quantity, 0);
  const isCompany = document.getElementById('isCompany').checked;
  const pct = isCompany ? Number(state.settings?.company_discount_percent || 0) : 0;
  const discount = subtotal * (pct / 100);
  const delivery = parseFloat(document.getElementById('deliveryFee').value) || 0;
  const total = subtotal - discount + delivery;

  document.getElementById('sumSubtotal').textContent = money(subtotal);
  document.getElementById('sumDelivery').textContent = money(delivery);
  document.getElementById('sumTotal').textContent = money(total);

  const row = document.getElementById('discountRow');
  if (discount > 0) {
    row.classList.remove('d-none');
    document.getElementById('discountPercent').textContent = pct;
    document.getElementById('sumDiscount').textContent = money(discount);
  } else {
    row.classList.add('d-none');
  }
}

async function submitCheckout() {
  if (!state.cart.length) { alert('Cart is empty.'); return; }

  const customer_name = document.getElementById('custName').value.trim();
  if (!customer_name) { alert('Customer name is required.'); return; }

  const subtotal = state.cart.reduce((s, c) => s + c.price * c.quantity, 0);
  const is_company = document.getElementById('isCompany').checked;
  const pct = is_company ? Number(state.settings?.company_discount_percent || 0) : 0;
  const discount_amt = subtotal * (pct / 100);
  const delivery = parseFloat(document.getElementById('deliveryFee').value) || 0;
  const total = subtotal - discount_amt + delivery;

  const payload = {
    customer_name,
    customer_email: document.getElementById('custEmail').value.trim(),
    customer_phone: document.getElementById('custPhone').value.trim(),
    items: state.cart,
    subtotal,
    is_company,
    company_discount_percent: pct,
    company_discount_amount: discount_amt,
    delivery_fee: delivery,
    total,
    status: 'completed'
  };

  try {
    const created = await supabaseClient.request('pos_invoices', {
      method: 'POST', body: payload
    });
    const invoice = Array.isArray(created) ? created[0] : created;

    // decrement stock
    for (const item of state.cart) {
      await supabaseClient.rpc('decrement_stock', {
        p_product_id: item.product_id,
        p_qty: item.quantity
      });
    }

    // show link modal
    const link = new URL(`invoice/invoice.html?inv=${encodeURIComponent(invoice.invoice_number)}`, location.href).href;
    document.getElementById('invoiceLink').value = link;
    document.getElementById('openInvoiceLink').href = link;
    new bootstrap.Modal(document.getElementById('linkModal')).show();

    // reset cart
    state.cart = [];
    renderCart();
    recalcTotals();
    document.getElementById('custName').value = '';
    document.getElementById('custEmail').value = '';
    document.getElementById('custPhone').value = '';
    document.getElementById('isCompany').checked = false;

    // refresh products to reflect new stock
    await loadProducts();
    await loadOffers();
  } catch (e) {
    alert('Checkout failed: ' + e.message);
  }
}

function copyInvoiceLink() {
  const input = document.getElementById('invoiceLink');
  input.select();
  document.execCommand('copy');
  alert('Link copied!');
}

function copyLink(invNumber) {
  const link = new URL(`invoice/invoice.html?inv=${encodeURIComponent(invNumber)}`, location.href).href;
  navigator.clipboard.writeText(link).then(() => alert('Link copied!'));
}

/* ============ SETTINGS ============ */
function fillSettingsForm() {
  const s = state.settings || {};
  document.getElementById('setCompanyName').value = s.company_name || '';
  document.getElementById('setCompanyEmail').value = s.company_email || '';
  document.getElementById('setCompanyPhone').value = s.company_phone || '';
  document.getElementById('setDiscount').value = s.company_discount_percent || 0;
  document.getElementById('setDelivery').value = s.default_delivery_fee || 0;
  document.getElementById('setCurrency').value = s.currency || 'EGP';
  document.getElementById('setPrefix').value = s.invoice_prefix || 'INV';
}

async function saveSettings() {
  const payload = {
    company_name: document.getElementById('setCompanyName').value.trim(),
    company_email: document.getElementById('setCompanyEmail').value.trim(),
    company_phone: document.getElementById('setCompanyPhone').value.trim(),
    company_discount_percent: parseFloat(document.getElementById('setDiscount').value) || 0,
    default_delivery_fee: parseFloat(document.getElementById('setDelivery').value) || 0,
    currency: document.getElementById('setCurrency').value.trim() || 'EGP',
    invoice_prefix: document.getElementById('setPrefix').value.trim() || 'INV',
    updated_at: new Date().toISOString()
  };
  try {
    await supabaseClient.request('pos_settings?id=eq.1', { method: 'PATCH', body: payload });
    state.settings = { ...state.settings, ...payload };
    alert('Settings saved!');
  } catch (e) {
    alert('Save failed: ' + e.message);
  }
}

/* ============ HELPERS ============ */
function money(n) {
  const cur = state.settings?.currency || 'EGP';
  return cur + ' ' + Number(n || 0).toFixed(2);
}
function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
  // sidebar
  document.querySelectorAll('.sidebar .nav-link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      navigate(a.dataset.page);
    });
  });

  document.getElementById('logoutBtn').addEventListener('click', logout);

  document.getElementById('loginBtn').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value;
    if (!email || !pass) {
      document.getElementById('loginError').textContent = 'Enter email and password';
      document.getElementById('loginError').classList.remove('d-none');
      return;
    }
    // Simple client-side gate.
    // Better: check against Supabase Auth if you want real security.
    login();
  });

  document.getElementById('isCompany').addEventListener('change', recalcTotals);
  document.getElementById('deliveryFee').addEventListener('input', recalcTotals);

  if (isLoggedIn()) {
    showApp();
    loadSettings(); // load early so currency formatting works
  } else {
    showLogin();
  }
});

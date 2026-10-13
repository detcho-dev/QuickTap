 /* =========================================================
   Public Invoice Page
   URL: invoice.html?inv=INV-XXXX
   ========================================================= */

(async function () {
  const root = document.getElementById('invoiceContent');
  const params = new URLSearchParams(location.search);
  const invNumber = params.get('inv');

  if (!invNumber) {
    root.innerHTML = '<div class="text-center py-5 text-danger">No invoice number provided.</div>';
    return;
  }

  try {
    const [invRes, setRes] = await Promise.all([
      supabaseClient.request(`pos_invoices?invoice_number=eq.${encodeURIComponent(invNumber)}`),
      supabaseClient.request('pos_settings?id=eq.1')
    ]);

    const inv = invRes && invRes[0];
    const settings = setRes && setRes[0];

    if (!inv) {
      root.innerHTML = '<div class="text-center py-5 text-danger">Invoice not found.</div>';
      return;
    }

    const currency = settings?.currency || 'USD';
    const money = n => currency + ' ' + Number(n || 0).toFixed(2);
    const esc = s => String(s ?? '')
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');

    const itemsHtml = (inv.items || []).map(it => `
      <tr>
        <td>${esc(it.name)}</td>
        <td class="text-end">${it.quantity}</td>
        <td class="text-end">${money(it.price)}</td>
        <td class="text-end">${money(it.price * it.quantity)}</td>
      </tr>
    `).join('');

    root.innerHTML = `
      <div class="d-flex justify-content-between mb-4 flex-wrap gap-3">
        <div>
          <h3 class="mb-0">${esc(settings?.company_name || 'My Business')}</h3>
          ${settings?.company_email ? `<div class="text-muted small">${esc(settings.company_email)}</div>` : ''}
          ${settings?.company_phone ? `<div class="text-muted small">${esc(settings.company_phone)}</div>` : ''}
        </div>
        <div class="text-end">
          <h4 class="mb-0">INVOICE</h4>
          <div class="small">${esc(inv.invoice_number)}</div>
          <div class="small text-muted">${new Date(inv.created_at).toLocaleString()}</div>
        </div>
      </div>

      <div class="mb-3">
        <div class="text-muted small">Billed to</div>
        <div class="fw-semibold">${esc(inv.customer_name)}</div>
        ${inv.customer_email ? `<div class="small">${esc(inv.customer_email)}</div>` : ''}
        ${inv.customer_phone ? `<div class="small">${esc(inv.customer_phone)}</div>` : ''}
      </div>

      <table class="table table-sm">
        <thead>
          <tr>
            <th>Item</th>
            <th class="text-end">Qty</th>
            <th class="text-end">Price</th>
            <th class="text-end">Total</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      <div class="ms-auto" style="max-width: 320px;">
        <div class="d-flex justify-content-between"><span>Subtotal</span><span>${money(inv.subtotal)}</span></div>
        ${inv.is_company ? `
          <div class="d-flex justify-content-between text-success">
            <span>Company discount (${inv.company_discount_percent}%)</span>
            <span>-${money(inv.company_discount_amount)}</span>
          </div>` : ''}
          ${inv.manual_discount_amount > 0 ? `
  <div class="d-flex justify-content-between text-warning">
    <span>Discount (${inv.manual_discount_percent}%)</span>
    <span>-${money(inv.manual_discount_amount)}</span>
  </div>` : ''}
        <div class="d-flex justify-content-between"><span>Delivery</span><span>${money(inv.delivery_fee)}</span></div>
        <hr class="my-2">
        <div class="d-flex justify-content-between fw-bold"><span>Total</span><span>${money(inv.total)}</span></div>
      </div>

      <div class="text-center mt-4 no-print">
        <button class="btn btn-dark" onclick="window.print()">Print</button>
      </div>
    `;
  } catch (e) {
    root.innerHTML = `<div class="text-center py-5 text-danger">Error: ${e.message}</div>`;
  }
})();

// invoice/js/supabase.js
// نفس القيم اللي في src/lib/supabase.js
// حط القيم الحقيقية بتاعتك هنا

const SUPABASE_URL = 'https://zumholtcgowtkszaeniu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1bWhvbHRjZ293dGtzemFlbml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3Mjg2ODgsImV4cCI6MjEwNDMwNDY4OH0.9eXUVwx027vXN-vDaOwZ5iF2MqOfMj47_NhUW-VQhP4';

// عميل Supabase بسيط (بدون مكتبات)
const supabaseClient = {
  async request(path, options = {}) {
    const url = `${SUPABASE_URL}/rest/v1/${path}`;
    const headers = {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': options.prefer || 'return=representation',
      ...options.headers
    };

    const res = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;
  },

  async rpc(fn, args) {
    const url = `${SUPABASE_URL}/rest/v1/rpc/${fn}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args)
    });
    if (!res.ok) throw new Error(await res.text());
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }
};

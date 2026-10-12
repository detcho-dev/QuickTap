// invoice/js/supabase.js
// نفس القيم اللي في src/lib/supabase.js
// حط القيم الحقيقية بتاعتك هنا

const SUPABASE_URL = 'https://zumholtcgowtkszaeniu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1bWhvbHRjZ293dGtzemFlbml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3Mjg2ODgsImV4cCI6MjEwNDMwNDY4OH0.9eXUVwx027vXN-vDaOwZ5iF2MqOfMj47_NhUW-VQhP4';

// عميل Supabase بسيط (بدون مكتبات)
const supabaseClient = {
  /* بيرجع access_token لو المستخدم مسجّل دخول، وإلا anon key */
  _token() {
    return sessionStorage.getItem('access_token') || SUPABASE_ANON_KEY;
  },

  /* طلب REST عادي */
  async request(path, options = {}) {
    const url = `${SUPABASE_URL}/rest/v1/${path}`;
    const headers = {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${this._token()}`,
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

  /* نداء دالة RPC (زي decrement_stock) */
  async rpc(fn, args) {
    const url = `${SUPABASE_URL}/rest/v1/rpc/${fn}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${this._token()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args)
    });

    if (!res.ok) throw new Error(await res.text());
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  },

  /* تسجيل دخول — بيرجع بيانات المستخدم أو يرمي خطأ */
  async signIn(email, password) {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error_description || err.msg || 'Invalid email or password');
    }

    const data = await res.json();
    sessionStorage.setItem('access_token', data.access_token);
    sessionStorage.setItem('refresh_token', data.refresh_token);
    sessionStorage.setItem('user_email', data.user?.email || email);
    return data;
  },

  /* تسجيل خروج — بيمسح التوكنات وبيلغي الجلسة من Supabase */
  async signOut() {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      try {
        await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (e) {
        // تجاهل الأخطاء — الأهم إننا نمسح محليًا
      }
    }
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('user_email');
  },

  /* هل المستخدم مسجّل دخول؟ */
  isAuthenticated() {
    return !!sessionStorage.getItem('access_token');
  }
};

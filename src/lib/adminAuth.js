const KEY = "quicktap_admin";

export function login(password) {
  if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
    localStorage.setItem(KEY, "1");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(KEY);
}

export function isAdmin() {
  return localStorage.getItem(KEY) === "1";
}

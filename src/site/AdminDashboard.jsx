import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { logout } from "../lib/adminAuth";

const EMPTY = {
  id: "",
  type: "user",
  name: "",
  bio: "",
  avatar: "",
  email: "",
  whatsapp: "",
  phone: "",
  phone2: "",
  instagram: "",
  facebook: "",
  twitter: "",
  threads: "",
  linkedin: "",
  github: "",
  discord: "",
  tiktok: "",
  website: "",
  telegram: "",
  youtube: "",
  maps: "",
  instapay: "",
  custom_url: "",
  custom_label: "",
};

export default function AdminDashboard() {
  const [form, setForm] = useState(EMPTY);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  async function fetchProfiles() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setProfiles(data || []);
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!form.id.trim() || !form.name.trim()) {
      setMessage({ type: "err", text: "ID and Name are required" });
      return;
    }

    setLoading(true);

    const payload = Object.fromEntries(
      Object.entries(form).filter(([, v]) => v !== "" && v !== null),
    );

    const { error } = await supabase
      .from("profiles")
      .upsert(payload, { onConflict: "id" });

    setLoading(false);

    if (error) {
      setMessage({ type: "err", text: error.message });
    } else {
      setMessage({ type: "ok", text: "Saved successfully ✅" });
      setForm(EMPTY);
      fetchProfiles();
    }
  }

  async function handleDelete(id) {
    if (!confirm(`Delete "${id}"?`)) return;
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) setMessage({ type: "err", text: error.message });
    else {
      setMessage({ type: "ok", text: "Deleted" });
      fetchProfiles();
    }
  }

  function handleEdit(p) {
    setForm({ ...EMPTY, ...p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  const filtered = profiles.filter(
    (p) =>
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage users & companies</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="admin-btn-ghost" onClick={() => navigate("/")}>
            View Site
          </button>
          <button className="admin-btn-ghost danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {message && (
        <div className={`admin-alert ${message.type}`}>{message.text}</div>
      )}

      {/* Form */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2 className="admin-section-title">
          {form.id ? "Edit Profile" : "Add New Profile"}
        </h2>

        {/* ===== Basic Info ===== */}
        <div className="admin-grid-2">
          <div className="admin-field">
            <label>ID *</label>
            <input
              className="admin-input"
              placeholder="e.g. ahmed or techco"
              value={form.id}
              onChange={(e) => update("id", e.target.value)}
              disabled={!!profiles.find((p) => p.id === form.id)}
            />
            <small>Letters/numbers only. Used in the URL.</small>
          </div>

          <div className="admin-field">
            <label>Type *</label>
            <select
              className="admin-input"
              value={form.type}
              onChange={(e) => update("type", e.target.value)}
            >
              <option value="user">User</option>
              <option value="company">Company</option>
            </select>
          </div>

          <div className="admin-field">
            <label>Name *</label>
            <input
              className="admin-input"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Ahmed Mohamed"
            />
          </div>

          <div className="admin-field">
            <label>Avatar URL</label>
            <input
              className="admin-input"
              value={form.avatar}
              onChange={(e) => update("avatar", e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="admin-field admin-full">
            <label>Bio</label>
            <textarea
              className="admin-input"
              rows={2}
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              placeholder="Short description"
            />
          </div>
        </div>

        {/* ===== Contact ===== */}
        <h3 className="admin-section-title" style={{ marginTop: 24 }}>
          Contact
        </h3>

        <div className="admin-grid-3">
          <div className="admin-field">
            <label>Email</label>
            <input
              className="admin-input"
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <div className="admin-field">
            <label>Phone</label>
            <input
              className="admin-input"
              type="tel"
              placeholder="+201001234567"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>

          <div className="admin-field">
            <label>Phone 2</label>
            <input
              className="admin-input"
              type="tel"
              placeholder="+201001234567"
              value={form.phone2}
              onChange={(e) => update("phone2", e.target.value)}
            />
          </div>

          <div className="admin-field">
            <label>WhatsApp</label>
            <input
              className="admin-input"
              placeholder="201001234567 or username"
              value={form.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value)}
            />
            <small>Number or username</small>
          </div>

          <div className="admin-field">
            <label>Telegram</label>
            <input
              className="admin-input"
              placeholder="username"
              value={form.telegram}
              onChange={(e) => update("telegram", e.target.value)}
            />
            <small>Without @</small>
          </div>

          <div className="admin-field">
            <label>InstaPay</label>
            <input
              className="admin-input"
              placeholder="username or link"
              value={form.instapay}
              onChange={(e) => update("instapay", e.target.value)}
            />
            <small>Username or full link</small>
          </div>

          <div className="admin-field">
            <label>Google Maps</label>
            <input
              className="admin-input"
              placeholder="https://maps.google.com/..."
              value={form.maps}
              onChange={(e) => update("maps", e.target.value)}
            />
            <small>Full share link</small>
          </div>
        </div>

        {/* ===== Social Links ===== */}
        <h3 className="admin-section-title" style={{ marginTop: 24 }}>
          Social Links
        </h3>

        <div className="admin-grid-3">
          <div className="admin-field">
            <label>Instagram</label>
            <input
              className="admin-input"
              placeholder="username"
              value={form.instagram}
              onChange={(e) => update("instagram", e.target.value)}
            />
          </div>

          <div className="admin-field">
            <label>TikTok</label>
            <input
              className="admin-input"
              placeholder="username"
              value={form.tiktok}
              onChange={(e) => update("tiktok", e.target.value)}
            />
          </div>

          <div className="admin-field">
            <label>Facebook</label>
            <input
              className="admin-input"
              placeholder="username"
              value={form.facebook}
              onChange={(e) => update("facebook", e.target.value)}
            />
          </div>

          <div className="admin-field">
            <label>Twitter / X</label>
            <input
              className="admin-input"
              placeholder="username"
              value={form.twitter}
              onChange={(e) => update("twitter", e.target.value)}
            />
          </div>

          <div className="admin-field">
            <label>Threads</label>
            <input
              className="admin-input"
              placeholder="username"
              value={form.threads}
              onChange={(e) => update("threads", e.target.value)}
            />
          </div>

          <div className="admin-field">
            <label>LinkedIn</label>
            <input
              className="admin-input"
              placeholder="username"
              value={form.linkedin}
              onChange={(e) => update("linkedin", e.target.value)}
            />
          </div>

          <div className="admin-field">
            <label>GitHub</label>
            <input
              className="admin-input"
              placeholder="username"
              value={form.github}
              onChange={(e) => update("github", e.target.value)}
            />
          </div>

          <div className="admin-field">
            <label>Discord</label>
            <input
              className="admin-input"
              placeholder="https://discord.gg/..."
              value={form.discord}
              onChange={(e) => update("discord", e.target.value)}
            />
          </div>

          <div className="admin-field">
            <label>YouTube</label>
            <input
              className="admin-input"
              placeholder="@channel or link"
              value={form.youtube}
              onChange={(e) => update("youtube", e.target.value)}
            />
          </div>
        </div>

        {/* ===== Other ===== */}
        <h3 className="admin-section-title" style={{ marginTop: 24 }}>
          Other
        </h3>

        <div className="admin-grid-2">
          <div className="admin-field">
            <label>Website</label>
            <input
              className="admin-input"
              placeholder="https://example.com"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </div>

          <div className="admin-field">
            <label>Custom Link — Label</label>
            <input
              className="admin-input"
              placeholder="e.g. My Portfolio"
              value={form.custom_label}
              onChange={(e) => update("custom_label", e.target.value)}
            />
            <small>Text shown on the button tooltip</small>
          </div>

          <div className="admin-field admin-full">
            <label>Custom Link — URL</label>
            <input
              className="admin-input"
              placeholder="https://example.com/anything"
              value={form.custom_url}
              onChange={(e) => update("custom_url", e.target.value)}
            />
          </div>
        </div>

        <div className="admin-actions">
          <button
            type="submit"
            className="admin-btn-primary"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : form.id && profiles.find((p) => p.id === form.id)
                ? "Update Profile"
                : "Add Profile"}
          </button>
          {form.id && (
            <button
              type="button"
              className="admin-btn-ghost"
              onClick={() => setForm(EMPTY)}
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="admin-list">
        <div className="admin-list-header">
          <h2 className="admin-section-title">
            All Profiles ({filtered.length})
          </h2>
          <input
            className="admin-input"
            style={{ maxWidth: 260 }}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <p className="admin-subtitle">No profiles yet.</p>
        ) : (
          <div className="admin-table">
            {filtered.map((p) => (
              <div key={p.id} className="admin-row">
                <div className="admin-row-main">
                  {p.avatar ? (
                    <img src={p.avatar} alt="" className="admin-row-avatar" />
                  ) : (
                    <div className="admin-row-avatar fallback">
                      {p.name?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                  <div>
                    <div className="admin-row-name">{p.name}</div>
                    <div className="admin-row-id">
                      /{p.type}/{p.id}
                    </div>
                  </div>
                </div>
                <div className="admin-row-actions">
                  <a
                    href={`/${p.type}/${p.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-btn-ghost"
                  >
                    View
                  </a>
                  <button
                    className="admin-btn-ghost"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-btn-ghost danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

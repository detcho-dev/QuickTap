import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/adminAuth";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (login(password)) navigate("/admin");
    else setError("Wrong password");
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1 className="profile-name">Admin Login</h1>
        <p className="profile-bio">Enter the admin password to continue</p>

        <input
          type="password"
          className="admin-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />

        {error && <p className="admin-error">{error}</p>}

        <button type="submit" className="admin-btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

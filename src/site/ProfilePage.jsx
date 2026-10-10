import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ProfileCard from "../components/ProfileCard";

// 🔽 غيّر ده للينك اللوجو بتاعك
const LOGO_URL = "https://quicktap-tags.vercel.app/og-image.png";
const SITE_URL = "https://quicktap-tags.vercel.app";
const SITE_NAME = "QuickTap";

export default function ProfilePage({ type }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError("");
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .eq("type", type)
        .maybeSingle();

      if (!active) return;
      if (error) setError("Something went wrong");
      else if (!data) setError("No profile found with this ID");
      else setData(data);
      setLoading(false);
    }
    load();
    return () => {
      active = false;
    };
  }, [id, type]);

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <p className="profile-bio">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h1 className="profile-name">Not Found</h1>
          <p className="profile-bio">{error}</p>
          <a href="/" className="notfound-btn" style={{ marginTop: 8 }}>
            ← Back to Home
          </a>
        </div>
        <PoweredBy />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <ProfileCard data={data} type={type} />
      <PoweredBy />
    </div>
  );
}

function PoweredBy() {
  return (
    <div className="powered-by">
      <span className="powered-by-text">Powered By</span>
      <a
        href={SITE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="powered-by-link"
        aria-label={`${SITE_NAME} website`}
        title={SITE_NAME}
      >
        <img
          src={LOGO_URL}
          alt={SITE_NAME}
          className="powered-by-logo"
          loading="lazy"
          width={24}
          height={24}
        />
        <span className="powered-by-brand">{SITE_NAME}</span>
      </a>
    </div>
  );
}

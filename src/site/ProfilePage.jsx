import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ProfileCard from "../components/ProfileCard";

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
      </div>
    );
  }

  return <ProfileCard data={data} type={type} />;
}

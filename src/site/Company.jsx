import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ProfileCard from "../components/ProfileCard";
import SocialButton from "../components/SocialButton";

export default function UserPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .eq("type", "company") // فلترة عشان تفرق بين user و company
        .maybeSingle();

      if (!active) return;
      if (error) setError("حصل خطأ في تحميل البيانات");
      else if (!data) setError("مفيش بيانات بالـ ID ده");
      else setData(data);
      setLoading(false);
    }
    load();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: 40 }}>جاري التحميل...</p>
    );
  if (error)
    return <p style={{ textAlign: "center", marginTop: 40 }}>{error}</p>;

  return (
    <>
      <ProfileCard name={data.name} bio={data.bio} avatar={data.avatar} />
      <SocialButton data={data} />
    </>
  );
}

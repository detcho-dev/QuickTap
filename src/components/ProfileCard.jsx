import {
  FaWhatsapp,
  FaPhoneAlt,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaTiktok,
  FaLinkedin,
  FaGithub,
  FaDiscord,
  FaEnvelope,        // ← جديد
} from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import { Globe } from "lucide-react";

export default function ProfileCard({ data, type }) {
  const links = [
    {
  key: "whatsapp",
  url: (() => {
    if (!data.whatsapp) return null;
    const v = data.whatsapp.trim();

    // 1. لينك كامل → استخدمه زي ما هو
    if (v.startsWith("http")) return v;

    // 2. رقم (8 أرقام على الأقل) → wa.me/رقم
    const digits = v.replace(/\D/g, "");
    if (digits.length >= 8) return `https://wa.me/${digits}`;

    // 3. username → wa.me/username
    return `https://wa.me/${v}`;
  })(),
  icon: <FaWhatsapp />,
},
    {
      key: "phone",
      url: data.phone && `tel:${data.phone}`,
      icon: <FaPhoneAlt />,
    },
    {
      key: "email",
      url: data.email && `mailto:${data.email}`,
      icon: <FaEnvelope />,
    },
    {
      key: "instagram",
      url:
        data.instagram &&
        (data.instagram.startsWith("http")
          ? data.instagram
          : `https://instagram.com/${data.instagram}`),
      icon: <FaInstagram />,
    },
    {
      key: "tiktok",
      url:
        data.tiktok &&
        (data.tiktok.startsWith("http")
          ? data.tiktok
          : `https://tiktok.com/@${data.tiktok}`),
      icon: <FaTiktok />,
    },
    {
      key: "facebook",
      url:
        data.facebook &&
        (data.facebook.startsWith("http")
          ? data.facebook
          : `https://facebook.com/${data.facebook}`),
      icon: <FaFacebook />,
    },
    {
      key: "twitter",
      url:
        data.twitter &&
        (data.twitter.startsWith("http")
          ? data.twitter
          : `https://x.com/${data.twitter}`),
      icon: <FaTwitter />,
    },
    {
      key: "threads",
      url:
        data.threads &&
        (data.threads.startsWith("http")
          ? data.threads
          : `https://threads.net/@${data.threads}`),
      icon: <SiThreads />,
    },
    {
      key: "linkedin",
      url:
        data.linkedin &&
        (data.linkedin.startsWith("http")
          ? data.linkedin
          : `https://linkedin.com/in/${data.linkedin}`),
      icon: <FaLinkedin />,
    },
    {
      key: "github",
      url:
        data.github &&
        (data.github.startsWith("http")
          ? data.github
          : `https://github.com/${data.github}`),
      icon: <FaGithub />,
    },
    { key: "discord", url: data.discord, icon: <FaDiscord /> },
    {
      key: "website",
      url:
        data.website &&
        (data.website.startsWith("http")
          ? data.website
          : `https://${data.website}`),
      icon: <Globe />,
    },
  ].filter((l) => l.url);

  return (
    <div className="profile-card">
      {data.avatar ? (
        <div className="profile-avatar-wrap">
          <img src={data.avatar} alt={data.name} className="profile-avatar" />
        </div>
      ) : (
        <div className="profile-avatar-wrap">
          <div className="profile-avatar-fallback">
            {data.name?.[0]?.toUpperCase() || "?"}
          </div>
        </div>
      )}

      <span className="profile-badge">
        {type === "company" ? "Company" : "Personal"}
      </span>

      <h1 className="profile-name">{data.name}</h1>

      {data.bio && <p className="profile-bio">{data.bio}</p>}

      {links.length > 0 ? (
        <div className="social-grid">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label={l.key}
              title={l.key}
            >
              {l.icon}
            </a>
          ))}
        </div>
      ) : (
        <p className="social-empty">No links available</p>
      )}
    </div>
  );
}

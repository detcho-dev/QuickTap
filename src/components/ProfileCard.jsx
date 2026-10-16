import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaTiktok,
  FaLinkedin,
  FaGithub,
  FaDiscord,
  FaTelegram,       // ← جديد
  FaYoutube,        // ← جديد
  FaMapMarkerAlt,   // ← جديد
} from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import { Globe, Link2 } from "lucide-react";  // ← Link2 جديد

export default function ProfileCard({ data, type }) {
  const links = [
  {
  key: "whatsapp",
  url: (() => {
    if (!data.whatsapp) return null;
    const v = data.whatsapp.trim();
    if (v.startsWith("http")) return v;
    const digits = v.replace(/\D/g, "");
    if (digits.length >= 8) return `https://wa.me/${digits}`;
    return `https://wa.me/${v}`;
  })(),
  icon: <FaWhatsapp />,
},
    {
  key: "phone2",
  url: data.phone2 && `tel:${data.phone2}`,
  icon: <FaPhoneAlt />,
  label: "phone 2",
},
{
  key: "email",
  url: data.email && `mailto:${data.email}`,
  icon: <FaEnvelope />,
},
{
  key: "telegram",
  url:
    data.telegram &&
    (data.telegram.startsWith("http")
      ? data.telegram
      : `https://t.me/${data.telegram.replace(/^@/, "")}`),
  icon: <FaTelegram />,
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
  key: "youtube",
  url:
    data.youtube &&
    (data.youtube.startsWith("http")
      ? data.youtube
      : data.youtube.startsWith("@")
        ? `https://youtube.com/${data.youtube}`
        : `https://youtube.com/@${data.youtube}`),
  icon: <FaYoutube />,
},
    {
      key: "website",
      url:
        data.website &&
        (data.website.startsWith("http")
          ? data.website
          : `https://${data.website}`),
      icon: <Globe />,
    },
    {
  key: "maps",
  url: data.maps,
  icon: <FaMapMarkerAlt />,
  label: "Google Maps",
},
{
  key: "instapay",
  url: data.instapay,
  icon: <InstaPayIcon />,
  label: "InstaPay",
},
{
  key: data.custom_label || "custom",
  url:
    data.custom_url &&
    (data.custom_url.startsWith("http")
      ? data.custom_url
      : `https://${data.custom_url}`),
  icon: <Link2 />,
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
  function InstaPayIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z" />
    </svg>
  );
}
}

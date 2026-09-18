import {
  FaWhatsapp,
  FaPhone,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaDiscord,
} from "react-icons/fa";
import { SiThreads } from "react-icons/si";

export default function ProfileCard({ data, type }) {
  const links = [
    {
      key: "whatsapp",
      url: data.whatsapp && `https://wa.me/${data.whatsapp.replace(/\D/g, "")}`,
      icon: <FaWhatsapp />,
    },
    { key: "phone", url: data.phone && `tel:${data.phone}`, icon: <FaPhone /> },
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
  ].filter((l) => l.url);

  return (
    <div className="profile-page">
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
    </div>
  );
}

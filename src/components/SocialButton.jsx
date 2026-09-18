import { useState } from "react";
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
import { FaPlus, FaTimes } from "react-icons/fa";

export default function SocialButton({ data }) {
  const [open, setOpen] = useState(false);

  // نبني قائمة اللينكات اللي موجودة بس
  const links = [
    {
      key: "whatsapp",
      url: data.whatsapp && `https://wa.me/${data.whatsapp.replace(/\D/g, "")}`,
      icon: <FaWhatsapp />,
      color: "#25D366",
    },
    {
      key: "phone",
      url: data.phone && `tel:${data.phone}`,
      icon: <FaPhone />,
      color: "#4CAF50",
    },
    {
      key: "instagram",
      url:
        data.instagram &&
        (data.instagram.startsWith("http")
          ? data.instagram
          : `https://instagram.com/${data.instagram}`),
      icon: <FaInstagram />,
      color: "#E1306C",
    },
    {
      key: "facebook",
      url:
        data.facebook &&
        (data.facebook.startsWith("http")
          ? data.facebook
          : `https://facebook.com/${data.facebook}`),
      icon: <FaFacebook />,
      color: "#1877F2",
    },
    {
      key: "twitter",
      url:
        data.twitter &&
        (data.twitter.startsWith("http")
          ? data.twitter
          : `https://x.com/${data.twitter}`),
      icon: <FaTwitter />,
      color: "#000",
    },
    {
      key: "threads",
      url:
        data.threads &&
        (data.threads.startsWith("http")
          ? data.threads
          : `https://threads.net/@${data.threads}`),
      icon: <SiThreads />,
      color: "#000",
    },
    {
      key: "linkedin",
      url:
        data.linkedin &&
        (data.linkedin.startsWith("http")
          ? data.linkedin
          : `https://linkedin.com/in/${data.linkedin}`),
      icon: <FaLinkedin />,
      color: "#0A66C2",
    },
    {
      key: "github",
      url:
        data.github &&
        (data.github.startsWith("http")
          ? data.github
          : `https://github.com/${data.github}`),
      icon: <FaGithub />,
      color: "#333",
    },
    {
      key: "discord",
      url: data.discord,
      icon: <FaDiscord />,
      color: "#5865F2",
    },
  ].filter((l) => l.url);

  if (links.length === 0) return null;

  return (
    <div className="social-wrapper">
      {open && (
        <div className="social-list">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
              style={{ background: l.color }}
              aria-label={l.key}
            >
              {l.icon}
            </a>
          ))}
        </div>
      )}

      <button
        className="social-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="social links"
      >
        {open ? <FaTimes /> : <FaPlus />}
      </button>
    </div>
  );
}

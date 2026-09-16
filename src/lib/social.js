import {
  MessageCircle,
  Mail,
  Camera,
  Facebook,
  Twitter,
  Music2,
} from "lucide-react";

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/quicktaptags",
    icon: Camera, // ← بديل Instagram
    color: "text-pink-400",
    labelKey: "social.instagram",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/201021859331",
    icon: MessageCircle,
    color: "text-green-400",
    labelKey: "social.whatsapp",
  },
  {
    name: "Email",
    href: "mailto:quicktaptags@hotmail.com",
    icon: Mail,
    color: "text-brand",
    labelKey: "social.email",
  },
  // ضيف اللي عندك بس
  // {
  //   name: 'Facebook',
  //   href: 'https://www.facebook.com/quicktaptags',
  //   icon: Facebook,
  //   color: 'text-blue-500',
  //   labelKey: 'social.facebook',
  // },
  // {
  //   name: 'Twitter',
  //   href: 'https://twitter.com/quicktaptags',
  //   icon: Twitter,
  //   color: 'text-sky-400',
  //   labelKey: 'social.twitter',
  // },
  // {
  //   name: 'TikTok',
  //   href: 'https://www.tiktok.com/@quicktaptags',
  //   icon: Music2,
  //   color: 'text-white',
  //   labelKey: 'social.tiktok',
  // },
];

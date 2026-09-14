import { createContext, useContext, useEffect, useState } from "react";

const dict = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.order": "Order",
    "nav.whatsapp": "WhatsApp",
    "nav.lang": "AR",

    // Hero
    "hero.badge": "Smart NFC Cards",
    "hero.title": "Share all your links with one tap",
    "hero.subtitle":
      "One card with all your accounts — no app, no hassle. Design it your way and share in seconds.",
    "hero.cta": "Order your card",
    "hero.cta2": "Learn more",

    // Features
    "features.title": "Why QuickTap?",
    "features.subtitle": "Everything you need in one card",
    "features.f1.title": "Lightning fast",
    "features.f1.desc": "Share your info in one second with a single tap.",
    "features.f2.title": "Fully secure",
    "features.f2.desc": "Your data is encrypted and only you control it.",
    "features.f3.title": "Custom design",
    "features.f3.desc":
      "Choose the shape, color, and design that represents you.",
    "features.f4.title": "Instant updates",
    "features.f4.desc": "Change your links anytime without changing the card.",
    "features.f5.title": "Works everywhere",
    "features.f5.desc": "Compatible with any modern phone that has NFC.",
    "features.f6.title": "Detailed analytics",
    "features.f6.desc": "Know who opened your card, when, and from where.",

    // How it works
    "how.title": "How it works",
    "how.subtitle": "Just 3 steps",
    "how.s1.title": "Order your card",
    "how.s1.desc": "Pick a design and fill in your info.",
    "how.s2.title": "Tap your phone",
    "how.s2.desc": "Enable NFC and tap the card on your phone.",
    "how.s3.title": "Share instantly",
    "how.s3.desc": "All your links open right in the browser.",

    // Order form
    "order.title": "Order your card",
    "order.subtitle": "Fill the form and we will contact you soon",
    "order.name": "Full name",
    "order.email": "Email",
    "order.phone": "Phone",
    "order.quantity": "Quantity",
    "order.product": "Product type",
    "order.product.card": "Smart Card",
    "order.product.tag": "Smart Tag",
    "order.station": "Nearest metro / LRT / monorail station",
    "order.station.placeholder": "Select a station",
    "order.select.placeholder": "Select...",
    "order.submit": "Send order",
    "order.sending": "Sending...",
    "order.success": "Order sent successfully! We will contact you soon.",
    "order.error": "Something went wrong. Try again or contact us on WhatsApp.",
    "order.required": "This field is required",
    "order.select.empty": "No results",

    // Footer
    "footer.rights": "© 2025 QuickTap — All rights reserved",
  },

  ar: {
    // Nav
    "nav.home": "الرئيسية",
    "nav.order": "اطلب الآن",
    "nav.whatsapp": "واتساب",
    "nav.lang": "EN",

    // Hero
    "hero.badge": "بطاقات NFC ذكية",
    "hero.title": "شارك كل روابطك بلمسة واحدة",
    "hero.subtitle":
      "بطاقة واحدة تحمل كل حساباتك — بدون تطبيق، بدون تعقيد. صممها بشكلك وشاركها في ثانية.",
    "hero.cta": "اطلب بطاقتك",
    "hero.cta2": "اعرف أكثر",

    // Features
    "features.title": "ليه QuickTap؟",
    "features.subtitle": "كل اللي محتاجه في بطاقة واحدة",
    "features.f1.title": "سرعة فائقة",
    "features.f1.desc": "شارك بياناتك في ثانية واحدة بلمسة على الموبايل.",
    "features.f2.title": "آمنة تماماً",
    "features.f2.desc": "بياناتك محمية ومشفرة، وأنت الوحيد اللي تتحكم فيها.",
    "features.f3.title": "تصميم مخصص",
    "features.f3.desc": "اختر الشكل واللون والتصميم اللي يعبّر عنك.",
    "features.f4.title": "تحديث فوري",
    "features.f4.desc": "غيّر روابطك في أي وقت بدون ما تغيّر البطاقة.",
    "features.f5.title": "متوافقة مع كل الأجهزة",
    "features.f5.desc": "تشتغل مع أي موبايل حديث فيه NFC.",
    "features.f6.title": "إحصائيات دقيقة",
    "features.f6.desc": "اعرف مين فتح بطاقتك وامتى ومن فين.",

    // How it works
    "how.title": "إزاي بتشتغل؟",
    "how.subtitle": "3 خطوات بس",
    "how.s1.title": "اطلب بطاقتك",
    "how.s1.desc": "اختار التصميم واملأ بياناتك.",
    "how.s2.title": "قربها من الموبايل",
    "how.s2.desc": "افتح NFC وقرب البطاقة من موبايلك.",
    "how.s3.title": "شارك بلمسة",
    "how.s3.desc": "كل روابطك تظهر فوراً في المتصفح.",

    // Order form
    "order.title": "اطلب بطاقتك",
    "order.subtitle": "املأ البيانات وهنتواصل معاك في أقرب وقت",
    "order.name": "الاسم الكامل",
    "order.email": "البريد الإلكتروني",
    "order.phone": "رقم الهاتف",
    "order.quantity": "عدد البطاقات",
    "order.product": "نوع المنتج",
    "order.product.card": "بطاقة ذكية (Smart Card)",
    "order.product.tag": "ملصق ذكي (Smart Tag)",
    "order.station": "أقرب محطة مترو / LRT / مونوريل",
    "order.station.placeholder": "اختر المحطة",
    "order.select.placeholder": "اختر...",
    "order.submit": "إرسال الطلب",
    "order.sending": "جاري الإرسال...",
    "order.success": "تم إرسال طلبك بنجاح! هنتواصل معاك قريب.",
    "order.error": "حصل خطأ، حاول تاني أو تواصل معانا على واتساب.",
    "order.required": "الحقل ده مطلوب",
    "order.select.empty": "لا توجد نتائج",

    // Footer
    "footer.rights": "© 2025 QuickTap — جميع الحقوق محفوظة",
  },
};

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("quicktap-lang") || "en";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("quicktap-lang", lang);
  }, [lang]);

  const t = (key) => dict[lang][key] ?? key;
  const toggle = () => setLang((l) => (l === "ar" ? "en" : "ar"));

  return (
    <I18nContext.Provider value={{ lang, t, toggle }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

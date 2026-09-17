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
    "faq.title": "Frequently asked questions",
    "faq.subtitle": "Everything you need to know about QuickTap",
    "faq.q1.q": "What is an NFC card?",
    "faq.q1.a":
      "An NFC card is a smart card that uses Near Field Communication technology to share digital information (like your contact details or social links) with any NFC-enabled smartphone by simply tapping it.",
    "faq.q2.q": "How does QuickTap work?",
    "faq.q2.a":
      "Order your QuickTap card, tap it on any NFC-enabled phone, and your digital profile opens instantly in the browser. No app needed.",
    "faq.q3.q": "Do I need an app to use QuickTap?",
    "faq.q3.a":
      "No. QuickTap works natively with any modern smartphone that supports NFC. Just tap the card and the profile opens in the browser.",
    "faq.q4.q": "Can I update my links after getting the card?",
    "faq.q4.a":
      "Yes. You can update your profile and links anytime through Contacting us without changing the physical card.",
    "faq.q5.q": "Where can I buy QuickTap NFC cards in Egypt?",
    "faq.q5.a":
      "You can order directly from our website at quicktap-tags.vercel.app . We deliver across Cairo and Giza within 3-5 business days.",
    "about.title": "About QuickTap",
    "about.subtitle": "Egyptian NFC innovation",
    "about.p1":
      "QuickTap is an Egyptian company founded in 2024 that specializes in smart NFC products. Our mission is to eliminate paper business cards and replace them with fast, eco-friendly, and updatable digital alternatives.",
    "about.p2":
      "All our cards are designed, manufactured, and shipped from Cairo, Egypt. We serve entrepreneurs, sales professionals, hotels, and event organizers across the country.",
    "about.p3":
      "Our products are compatible with all modern NFC-enabled smartphones from Apple, Samsung, Google, Huawei, and Xiaomi.",
    "about.stat.customers": "Happy customers",
    "about.stat.founded": "Founded",
    "about.stat.rating": "Rating",
    "about.stat.delivery": "Days delivery",
    "social.instagram": "Instagram",
    "social.whatsapp": "WhatsApp",
    "social.email": "Email",
    // Footer
    "footer.rights": "© 2026 QuickTap — All rights reserved",
  },

  ar: {
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
      "order.select.empty": "لا توجد نتائج",
      "order.submit": "إرسال الطلب",
      "order.sending": "جاري الإرسال...",
      "order.success": "تم إرسال طلبك بنجاح! هنتواصل معاك قريب.",
      "order.error": "حصل خطأ، حاول تاني أو تواصل معانا على واتساب.",
      "order.required": "الحقل ده مطلوب",

      // FAQ
      "faq.title": "الأسئلة الشائعة",
      "faq.subtitle": "كل اللي محتاج تعرفه عن QuickTap",
      "faq.q1.q": "إيه هي بطاقة الـ NFC؟",
      "faq.q1.a":
        "بطاقة NFC هي بطاقة ذكية بتستخدم تقنية الاتصال قريب المدى (Near Field Communication) لمشاركة معلوماتك الرقمية — زي بيانات التواصل أو روابط السوشيال ميديا — مع أي موبايل حديث بيدعم NFC بمجرد ما تقرّبها منه.",
      "faq.q2.q": "إزاي QuickTap بتشتغل؟",
      "faq.q2.a":
        "اطلب بطاقتك من QuickTap، قرّبها من أي موبايل فيه NFC، وبروفايلك الرقمي هيفتح فوراً في المتصفح. مش محتاج أي تطبيق.",
      "faq.q3.q": "محتاج تطبيق عشان أستخدم QuickTap؟",
      "faq.q3.a":
        "لأ. QuickTap بتشتغل مباشرة مع أي موبايل حديث بيدعم NFC. بس قرّب البطاقة والبروفايل هيفتح في المتصفح.",
      "faq.q4.q": "أقدر أحدّث روابطي بعد استلام البطاقة؟",
      "faq.q4.a":
        "أيوه. تقدر تحدّث البروفايل والروابط في أي وقت من خلال التواصل معانا، من غير ما تغيّر البطاقة نفسها.",
      "faq.q5.q": "منين أقدر أشتري بطاقات QuickTap في مصر؟",
      "faq.q5.a":
        "تقدر تطلب مباشرة من موقعنا quicktap-tags.vercel.app. بنوصّل للقاهرة والجيزة خلال 3-5 أيام عمل.",

      // About
      "about.title": "عن QuickTap",
      "about.subtitle": "ابتكار مصري في عالم NFC",
      "about.p1":
        "QuickTap شركة مصرية اتأسست في 2024، متخصصة في منتجات الـ NFC الذكية. مهمتنا إننا نلغي كروت البيزنس الورقية ونستبدلها ببدائل رقمية سريعة وصديقة للبيئة وقابلة للتحديث.",
      "about.p2":
        "كل بطاقاتنا بتتصمم وتتصنع وتتبعت من القاهرة. بنخدم رواد الأعمال، مندوبين المبيعات، الفنادق، ومنظمي الفعاليات في كل مصر.",
      "about.p3":
        "منتجاتنا متوافقة مع كل الموبايلات الحديثة اللي بتدعم NFC من Apple و Samsung و Google و Huawei و Xiaomi.",
      "about.stat.customers": "عميل سعيد",
      "about.stat.founded": "سنة التأسيس",
      "about.stat.rating": "التقييم",
      "about.stat.delivery": "أيام التوصيل",

      // Social
      "social.instagram": "إنستجرام",
      "social.whatsapp": "واتساب",
      "social.email": "الإيميل",
      "social.followUs": "تابعنا",

      // Footer
      "footer.rights": "© 2026 QuickTap — جميع الحقوق محفوظة",
    },
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

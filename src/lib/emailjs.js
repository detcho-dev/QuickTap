import emailjs from "@emailjs/browser";

export const EMAILJS_CONFIG = {
  SERVICE_ID: "service_b2h9oc4",
  TEMPLATE_ID: "template_e6f0mhc",
  PUBLIC_KEY: "ZDMEhnDV3sWEXLXJh",
};

export const TO_EMAIL = "quicktaptags@hotmail.com";

// بيرجّع ID فريد لكل طلب (حروف + أرقام)
function generateOrderId() {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  const date = new Date();
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  return `${stamp}-${rand}`;
}

export async function sendOrder(formData) {
  if (!formData?.name || !formData?.email || !formData?.phone) {
    throw new Error("Missing required fields");
  }

  const orderId = generateOrderId();
  const now = new Date();

  // ⚠️ كل الأسماء اللي القوالب بتتوقعها
  const templateParams = {
    // مخصص لك (الإشعار)
    order_id: orderId,
    customer_name: formData.name,
    customer_phone: formData.phone,
    customer_email: formData.email,
    product_type: formData.product || "—",
    quantity: formData.quantity || "1",
    delivery_address: formData.station || "—",
    order_time: now.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),

    // للعميل (الرد التلقائي) — نفس الأسماء
    to_email: formData.email, // ← مهم: الرد التلقائي بيروح للعميل
  };

  return emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.TEMPLATE_ID,
    templateParams,
    { publicKey: EMAILJS_CONFIG.PUBLIC_KEY },
  );
}

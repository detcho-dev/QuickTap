import { useState, useRef, useMemo } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { sendOrder } from "@/lib/emailjs";
import { STATIONS, STATIONS_AR } from "@/lib/stations";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Autocomplete } from "../ui/Autocomplete";

export function OrderForm() {
  const { t, lang } = useI18n();
  const [status, setStatus] = useState("idle");
  const [product, setProduct] = useState("");
  const [station, setStation] = useState("");
  const formRef = useRef(null);

  const productOptions = useMemo(
    () => [
      { value: "Smart Card", label: t("order.product.card") },
      { value: "Smart Tag", label: t("order.product.tag") },
    ],
    [t],
  );

  const stationOptions = useMemo(
    () =>
      STATIONS.map((s) => ({
        value: s,
        label: lang === "ar" ? STATIONS_AR[s] || s : s,
      })),
    [lang],
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    data.product = product;
    data.station = station;

    try {
      await sendOrder(data);
      setStatus("success");
      formRef.current?.reset();
      setProduct("");
      setStation("");
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      console.error("[EmailJS Error]", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  }

  return (
    <section id="order" className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          {t("order.title")}
        </h2>
        <p className="mt-3 text-muted-foreground">{t("order.subtitle")}</p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="surface-card space-y-5 rounded-2xl p-6 sm:p-8"
      >
        <Field label={t("order.name")} required>
          <Input name="name" required autoComplete="name" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t("order.email")} required>
            <Input name="email" type="email" required autoComplete="email" />
          </Field>
          <Field label={t("order.phone")} required>
            <Input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              pattern="[0-9+\s\-()]{6,20}"
            />
          </Field>
        </div>

        <Field label={t("order.quantity")}>
          <Input
            name="quantity"
            type="number"
            min="1"
            max="1000"
            defaultValue="1"
          />
        </Field>

        <Field label={t("order.product")} required>
          <Autocomplete
            value={product}
            onChange={setProduct}
            options={productOptions}
            placeholder={t("order.select.placeholder")}
            emptyText={t("order.select.empty")}
          />
          <input type="hidden" name="product" value={product} />
        </Field>

        <Field label={t("order.station")} required>
          <Autocomplete
            value={station}
            onChange={setStation}
            options={stationOptions}
            placeholder={t("order.station.placeholder")}
            emptyText={t("order.select.empty")}
          />
          <input type="hidden" name="station" value={station} />
        </Field>

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full glow-brand"
          disabled={status === "sending" || !product || !station}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("order.sending")}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {t("order.submit")}
            </>
          )}
        </Button>

        {status === "success" && (
          <StatusMessage
            type="success"
            icon={<CheckCircle2 className="h-4 w-4" />}
            text={t("order.success")}
          />
        )}
        {status === "error" && (
          <StatusMessage
            type="error"
            icon={<AlertCircle className="h-4 w-4" />}
            text={t("order.error")}
          />
        )}
      </form>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-brand-cyan">*</span>}
      </label>
      {children}
    </div>
  );
}

function StatusMessage({ type, icon, text }) {
  const styles = {
    success: "border-green-500/30 bg-green-500/10 text-green-400",
    error: "border-red-500/30 bg-red-500/10 text-red-400",
  };
  return (
    <div
      className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-center text-sm ${styles[type]}`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}

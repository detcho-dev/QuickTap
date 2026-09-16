import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const faqs = [
  { key: "q1" },
  { key: "q2" },
  { key: "q3" },
  { key: "q4" },
  { key: "q5" },
];

export function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          {t("faq.title")}
        </h2>
        <p className="mt-3 text-muted-foreground">{t("faq.subtitle")}</p>
      </div>

      <div className="space-y-3">
        {faqs.map(({ key }, i) => (
          <div key={key} className="surface-card overflow-hidden rounded-xl">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between p-5 text-start transition-colors hover:bg-brand/5"
            >
              <h3 className="font-display text-base font-semibold">
                {t(`faq.${key}.q`)}
              </h3>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-brand transition-transform ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {open === i && (
              <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                {t(`faq.${key}.a`)}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

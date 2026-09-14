import { MousePointerClick, Smartphone, Share2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const steps = [
  { icon: MousePointerClick, num: "01", key: "s1" },
  { icon: Smartphone, num: "02", key: "s2" },
  { icon: Share2, num: "03", key: "s3" },
];

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id="how" className="border-y border-border bg-card/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            {t("how.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("how.subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, num, key }) => (
            <div key={key} className="relative surface-card rounded-2xl p-6">
              <span className="absolute right-5 top-5 font-display text-4xl font-bold text-brand/20">
                {num}
              </span>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {t(`how.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`how.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

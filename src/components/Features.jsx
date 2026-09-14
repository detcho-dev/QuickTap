import {
  Zap,
  Shield,
  Palette,
  RefreshCw,
  Smartphone,
  BarChart3,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const features = [
  { icon: Zap, key: "f1" },
  { icon: Shield, key: "f2" },
  { icon: Smartphone, key: "f5" },
];

export function Features() {
  const { t } = useI18n();

  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-12 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          {t("features.title")}
        </h2>
        <p className="mt-3 text-muted-foreground">{t("features.subtitle")}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, key }) => (
          <div
            key={key}
            className="surface-card group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-brand"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand">
              <Icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">
              {t(`features.${key}.title`)}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(`features.${key}.desc`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

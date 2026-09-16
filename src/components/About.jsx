import { useI18n } from "../lib/i18n";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="border-y border-border bg-card/30 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            {t("about.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("about.subtitle")}</p>
        </div>

        <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Stat num="500+" label={t("about.stat.customers")} />
          <Stat num="2024" label={t("about.stat.founded")} />
          <Stat num="4.9★" label={t("about.stat.rating")} />
          <Stat num="3-5" label={t("about.stat.delivery")} />
        </div>
      </div>
    </section>
  );
}

function Stat({ num, label }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl font-bold text-gradient">{num}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

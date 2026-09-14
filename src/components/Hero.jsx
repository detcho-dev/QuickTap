import { Nfc, ArrowLeft, Sparkles, Wifi } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "../ui/Button";

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="hero" className="grid-glow relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* === Text side === */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
              {t("hero.badge")}
            </span>

            <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              {t("hero.title")
                .split(" ")
                .map((word, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? (
                      <span className="text-gradient">{word}</span>
                    ) : (
                      word
                    )}{" "}
                  </span>
                ))}
            </h1>

            <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="gradient"
                size="lg"
                className="glow-brand"
                asChild
              >
                <a href="#order">
                  {t("hero.cta")}
                  <ArrowLeft className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#features">{t("hero.cta2")}</a>
              </Button>
            </div>
          </div>

          {/* === Card side === */}
          <div className="relative flex justify-center perspective-[1200px]">
            <div className="group relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-brand opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70" />

              {/* === The card === */}
              <div
                className="
                  relative h-72 w-52 rounded-3xl p-6
                  surface-card glow-brand
                  transition-all duration-700 ease-out
                  [transform:rotateY(-22deg)_rotateX(8deg)_rotateZ(-6deg)]
                  group-hover:[transform:rotateY(0deg)_rotateX(0deg)_rotateZ(0deg)_scale(1.03)]
                  [transform-style:preserve-3d]
                  will-change-transform
                "
              >
                {/* Card shine */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent" />

                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand shadow-lg">
                    <Nfc className="h-7 w-7 text-white" strokeWidth={2.4} />
                  </div>
                  <Wifi className="h-5 w-5 rotate-90 text-brand-cyan/70" />
                </div>

                {/* Brand */}
                <div className="mt-8">
                  <p className="font-display text-xl font-bold tracking-tight">
                    QuickTap
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                    Smart NFC Card
                  </p>
                </div>

                {/* Bottom row: fake chip + dots */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  {/* chip */}
                  <div className="h-6 w-9 rounded-md bg-gradient-to-br from-yellow-300/60 to-yellow-600/40 shadow-inner" />
                  {/* dots */}
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan/60" />
                    <span className="h-1.5 w-1.5 rounded-full bg-brand/60" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                  </div>
                </div>
              </div>

              {/* Floating accent dots */}
              <div className="absolute -top-4 -left-4 h-3 w-3 rounded-full bg-brand-cyan/60 blur-sm" />
              <div className="absolute -bottom-6 -right-6 h-4 w-4 rounded-full bg-brand/60 blur-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

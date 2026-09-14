import { Nfc, MessageCircle, Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const WHATSAPP_URL = "https://wa.me/yossef_el_gammal";
export const CONTACT_EMAIL = "quicktaptags@hotmail.com";

export function Nav() {
  const { t, toggle } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3.5 sm:px-6">
        <a href="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand">
            <Nfc className="h-5 w-5 text-white" strokeWidth={2.4} />
          </span>
          <span className="truncate font-display text-lg font-bold tracking-tight">
            QuickTap
          </span>
        </a>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <a
            href="#hero"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            {t("nav.home")}
          </a>
          <a
            href="#order"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.order")}
          </a>
          <button
            type="button"
            onClick={toggle}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent"
          >
            <Languages className="h-4 w-4 text-brand" />
            <span>{t("nav.lang")}</span>
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent"
          >
            <MessageCircle className="h-4 w-4 text-brand-cyan" />
            <span className="hidden sm:inline">{t("nav.whatsapp")}</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

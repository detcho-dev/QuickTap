import { Nfc, MessageCircle, Mail } from "lucide-react";
import { CONTACT_EMAIL, WHATSAPP_URL } from "./Nav";
import { useI18n } from "../lib/i18n";
import { SOCIAL_LINKS } from "../lib/social";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Row 1: Logo + Social icons */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand">
              <Nfc className="h-5 w-5 text-white" strokeWidth={2.4} />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              QuickTap
            </span>
          </div>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ name, href, icon: Icon, color }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={name}
                title={name}
                className={`grid h-10 w-10 place-items-center rounded-lg border border-border bg-secondary transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:bg-accent ${color}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="my-8 h-px bg-border" />

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm transition-colors hover:bg-accent"
          >
            <MessageCircle className="h-4 w-4 text-brand-cyan" />
            {t("nav.whatsapp")}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm transition-colors hover:bg-accent"
          >
            <Mail className="h-4 w-4 text-brand" />
            {CONTACT_EMAIL}
          </a>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}

import { Mail, MessageCircle, Nfc } from "lucide-react";
import { CONTACT_EMAIL, WHATSAPP_URL } from "./Nav";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-2 md:items-center">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-brand">
            <Nfc className="h-4 w-4 text-white" />
          </span>
          <p className="truncate text-sm text-muted-foreground">
            {t("footer.rights")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm transition-colors hover:bg-accent"
          >
            <MessageCircle className="h-4 w-4 text-brand-cyan" />{" "}
            {t("nav.whatsapp")}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm transition-colors hover:bg-accent"
          >
            <Mail className="h-4 w-4 text-brand" /> {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}

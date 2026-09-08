"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n";

// Hors du composant : l'écriture du cookie est un effet de bord sur le
// document, pas un état React.
function persistLocale(next: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const router = useRouter();

  function setLocale(next: Locale) {
    if (next === locale) return;
    persistLocale(next);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1 text-xs">
      {(["fr", "en"] as Locale[]).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-neutral-300">/</span>}
          <button
            onClick={() => setLocale(l)}
            className={
              l === locale
                ? "font-semibold text-foreground"
                : "text-neutral-400 hover:text-foreground"
            }
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

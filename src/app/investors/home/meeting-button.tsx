"use client";

import { track } from "@/lib/tracking";
import { deal } from "@/lib/deal";
import { t, type Locale } from "@/lib/i18n";

export function MeetingButton({ locale }: { locale: Locale }) {
  return (
    <a
      href={deal.meetingUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        track({ type: "cta_click", path: "/investors/home", label: "rdv-equipe" })
      }
      className="rounded-md border border-foreground/20 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/50"
    >
      {t(locale, "meeting.cta")}
    </a>
  );
}

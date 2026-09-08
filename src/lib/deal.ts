// Conditions de la levée affichées sur la home investisseurs.
// À ajuster ici au fil du deal (montants en clair, pas de calcul).

import type { Locale } from "@/lib/i18n";

export const deal = {
  round: "Pre-seed 2026",
  period: "Q3–Q4 2026",
  target: "1,5 M€",
  minTicket: "100 K€",
  leadWanted: "500 K€",
  matchingFund: "600 K€ en discussion",
  engagedLabel: "700 K€ matching fund — soft commit",
  progressPct: 47,
  tranches: ["< 100 K€", "< 250 K€", "< 500 K€", "500 K€+ (lead)"],
  // Lien de prise de RDV (Calendly / Cal.com) — placeholder à remplacer.
  meetingUrl: "https://cal.com/minah/30min",
} as const;

// Mêmes montants, format anglophone (« 1,5 M€ » → « €1.5M »).
const dealEn = {
  period: "Q3–Q4 2026",
  target: "€1.5M",
  minTicket: "€100K",
  leadWanted: "€500K",
  matchingFund: "€600K in discussion",
  engagedLabel: "€700K matching fund — soft commit",
  tranches: ["< €100K", "< €250K", "< €500K", "€500K+ (lead)"],
} as const;

export function dealFor(locale: Locale) {
  return locale === "en" ? { ...deal, ...dealEn } : deal;
}

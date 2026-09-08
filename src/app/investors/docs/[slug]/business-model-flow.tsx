"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

// Schéma interactif du modèle : d'où vient l'argent, par où il passe, où il
// se déploie, et par quel chemin il revient. Premier jet volontairement
// simple — chaque étage est cliquable et détaillé sous le schéma.
type StageId = "capital" | "minah" | "filiales" | "pme";

type Stage = {
  id: StageId;
  label: { fr: string; en: string };
  sub: { fr: string; en: string };
  detail: { fr: string[]; en: string[] };
};

const STAGES: Stage[] = [
  {
    id: "capital",
    label: { fr: "Investisseurs globaux", en: "Global investors" },
    sub: { fr: "Europe · Golfe · Afrique", en: "Europe · Gulf · Africa" },
    detail: {
      fr: [
        "Business angels, family offices, banquiers privés et asset managers souscrivent à une stratégie identifiée — pas à un fonds aveugle.",
        "Chaque souscription est adossée à un portefeuille de contrats déjà signés, avec une maturité et un coupon connus à l'entrée.",
        "Le capital est appelé en euros ; le risque de change est couvert en amont du déploiement.",
      ],
      en: [
        "Angels, family offices, private bankers and asset managers subscribe to an identified strategy — not a blind pool.",
        "Every subscription is backed by already-signed contracts, with maturity and coupon known upfront.",
        "Capital is called in euros; currency risk is hedged before deployment.",
      ],
    },
  },
  {
    id: "minah",
    label: { fr: "Minah", en: "Minah" },
    sub: { fr: "Structuration & registre", en: "Structuring & registry" },
    detail: {
      fr: [
        "Minah structure la dette senior sécurisée : sélection des contrats, montage des protections, fixation du coupon et de la maturité.",
        "Le registre est digital et le règlement on-chain : chaque investisseur suit sa position, ses échéances et ses flux sans passer par un relevé trimestriel.",
        "Les opérations — appels de fonds, suivi des remboursements, reporting — sont pilotées par l'IA, ce qui permet de tenir des tickets petits sans que les coûts fixes mangent le rendement.",
      ],
      en: [
        "Minah structures the senior secured debt: contract selection, protection stack, coupon and maturity setting.",
        "The registry is digital and settlement is on-chain: each investor tracks their position, schedule and flows without waiting for a quarterly statement.",
        "Operations — capital calls, repayment tracking, reporting — are AI-driven, which keeps small tickets viable without fixed costs eating the yield.",
      ],
    },
  },
  {
    id: "filiales",
    label: { fr: "Filiales locales", en: "Local subsidiaries" },
    sub: { fr: "Africa Rise Ltd · Lusaka", en: "Africa Rise Ltd · Lusaka" },
    detail: {
      fr: [
        "Le déploiement passe par une entité de droit local, au plus près du payeur et du tribunal compétent.",
        "Africa Rise Ltd (Lusaka) porte la stratégie Kupanda dans le cadre des accords avec la République de Zambie.",
        "Ce maillon est ce qui rend les protections exécutables : performance bond, assurance défaut de crédit, lettres d'engagement du ministère, swap de change avec Zanaco.",
      ],
      en: [
        "Deployment runs through a locally incorporated entity, close to the payer and to the competent court.",
        "Africa Rise Ltd (Lusaka) carries the Kupanda strategy under the agreements with the Republic of Zambia.",
        "This link is what makes the protections enforceable: performance bond, credit default insurance, ministry engagement letters, currency swap with Zanaco.",
      ],
    },
  },
  {
    id: "pme",
    label: { fr: "PME sous contrat", en: "SMEs under contract" },
    sub: { fr: "Marchés publics exécutés", en: "Public contracts delivered" },
    detail: {
      fr: [
        "L'argent finance l'exécution d'un contrat gouvernemental déjà attribué — pas un plan d'affaires.",
        "La PME livre, l'État paie, le remboursement remonte la chaîne. Le risque porte sur l'exécution et le délai de paiement, pas sur la demande.",
        "Le paiement est dirigé directement du ministère vers la structure de portage, sans transiter par la trésorerie de la PME.",
      ],
      en: [
        "The money funds delivery of an already-awarded government contract — not a business plan.",
        "The SME delivers, the state pays, repayment flows back up the chain. The risk sits on execution and payment timing, not on demand.",
        "Payment is routed directly from the ministry to the holding structure, never through the SME's own treasury.",
      ],
    },
  },
];

const copy = {
  fr: {
    forward: "Déploiement du capital",
    back: "Coupons fixes + principal",
    hint: "Cliquez sur une étape du schéma pour la détailler.",
  },
  en: {
    forward: "Capital deployment",
    back: "Fixed coupons + principal",
    hint: "Click a stage of the diagram to expand it.",
  },
};

const NODE_X = [20, 268, 516, 764];
const NODE_W = 200;
const NODE_Y = 74;
const NODE_H = 84;

export function BusinessModelFlow({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<StageId>("minah");
  const c = copy[locale];
  const active = STAGES.find((s) => s.id === selected)!;

  return (
    <section className="mt-10">
      <div className="rounded-lg border border-foreground/10 bg-white/50 p-4 sm:p-6">
        <svg
          viewBox="0 0 984 250"
          className="w-full"
          role="img"
          aria-label={
            locale === "fr"
              ? "Schéma des flux de capitaux entre investisseurs, Minah, filiales locales et PME"
              : "Diagram of capital flows between investors, Minah, local subsidiaries and SMEs"
          }
        >
          {/* flux aller : le capital se déploie */}
          <text x="20" y="26" className="fill-neutral-400 text-[13px]">
            {c.forward}
          </text>
          {NODE_X.slice(0, 3).map((x, i) => (
            <g key={`f${i}`}>
              <line
                x1={x + NODE_W + 6}
                y1={NODE_Y + NODE_H / 2}
                x2={NODE_X[i + 1] - 12}
                y2={NODE_Y + NODE_H / 2}
                stroke="var(--brand)"
                strokeWidth="2"
                className="flow-forward"
              />
              <path
                d={`M${NODE_X[i + 1] - 12} ${NODE_Y + NODE_H / 2 - 5} l6 5 -6 5`}
                fill="none"
                stroke="var(--brand)"
                strokeWidth="2"
              />
            </g>
          ))}

          {/* les quatre étages */}
          {STAGES.map((s, i) => {
            const on = s.id === selected;
            return (
              <g
                key={s.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelected(s.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(s.id);
                  }
                }}
                className="cursor-pointer outline-none"
              >
                <rect
                  x={NODE_X[i]}
                  y={NODE_Y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill={on ? "var(--marsala)" : "var(--chalk)"}
                  stroke={on ? "var(--marsala)" : "rgba(44,23,22,0.15)"}
                  strokeWidth="1.5"
                />
                <text
                  x={NODE_X[i] + NODE_W / 2}
                  y={NODE_Y + 36}
                  textAnchor="middle"
                  className="text-[15px] font-semibold"
                  fill={on ? "#fff" : "var(--foreground)"}
                >
                  {s.label[locale]}
                </text>
                <text
                  x={NODE_X[i] + NODE_W / 2}
                  y={NODE_Y + 58}
                  textAnchor="middle"
                  className="text-[12px]"
                  fill={on ? "rgba(255,255,255,0.75)" : "rgba(44,23,22,0.5)"}
                >
                  {s.sub[locale]}
                </text>
              </g>
            );
          })}

          {/* flux retour : les coupons remontent */}
          <path
            d={`M${NODE_X[3] + NODE_W / 2} ${NODE_Y + NODE_H + 8}
                V208 H${NODE_X[0] + NODE_W / 2} V${NODE_Y + NODE_H + 8}`}
            fill="none"
            stroke="var(--marsala)"
            strokeWidth="2"
            className="flow-back"
          />
          <path
            d={`M${NODE_X[0] + NODE_W / 2 - 5} ${NODE_Y + NODE_H + 14} l5 -6 5 6`}
            fill="none"
            stroke="var(--marsala)"
            strokeWidth="2"
          />
          <text
            x={492}
            y={228}
            textAnchor="middle"
            className="fill-neutral-400 text-[13px]"
          >
            {c.back}
          </text>
        </svg>

        <p className="mt-2 text-center text-xs text-neutral-400">{c.hint}</p>
      </div>

      {/* détail de l'étape sélectionnée */}
      <div className="mt-4 rounded-lg border border-marsala/20 bg-white/60 p-6">
        <h3 className="text-sm font-semibold">
          {active.label[locale]}
          <span className="ml-2 font-normal text-neutral-400">
            {active.sub[locale]}
          </span>
        </h3>
        <ul className="mt-3 space-y-2.5">
          {active.detail[locale].map((line) => (
            <li
              key={line}
              className="flex gap-3 text-sm leading-6 text-neutral-600"
            >
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

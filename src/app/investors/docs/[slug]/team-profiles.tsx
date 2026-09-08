import type { Locale } from "@/lib/i18n";

// Fiche équipe : trois portraits longs. Les monogrammes servent de repli tant
// qu'il n'y a pas de photos — déposer public/brand/team/<id>.jpg et renseigner
// `photo` ci-dessous suffit à les remplacer.
type Profile = {
  id: string;
  name: string;
  initials: string;
  photo?: string;
  role: { fr: string; en: string };
  tagline: { fr: string; en: string };
  story: { fr: string[]; en: string[] };
  owns: { fr: string[]; en: string[] };
};

const PROFILES: Profile[] = [
  {
    id: "coralie-lolliot",
    name: "Coralie Lolliot",
    initials: "CL",
    role: { fr: "Co-fondatrice — Ecosystems & Partnerships", en: "Co-founder — Ecosystems & Partnerships" },
    tagline: {
      fr: "Celle par qui le capital arrive.",
      en: "The one the capital comes through.",
    },
    story: {
      fr: [
        "Dans un fonds de dette, la difficulté n'est jamais de trouver des dossiers : c'est de trouver de l'argent qui comprend ce qu'il finance. Coralie tient cette moitié-là du problème.",
        "Son terrain : les network builders, les brokers, les banquiers privés et les asset managers — c'est-à-dire les gens qui décident, chez leurs clients, si une classe d'actifs mérite qu'on s'y arrête. Ce réseau ne se constitue pas au moment où l'on lève ; il se construit en amont, relation par relation, et c'est ce qui explique qu'un pre-seed sur un actif aussi peu couvert que la dette privée africaine soit déjà engagé à plus de 700 K€.",
        "Le rôle couvre aussi l'écosystème au sens large : partenaires bancaires, structures d'accompagnement, interlocuteurs institutionnels. Autrement dit, tout ce qui transforme une thèse d'investissement en canal de distribution durable.",
      ],
      en: [
        "In a debt fund the hard part is never finding deals — it is finding money that understands what it is funding. Coralie owns that half of the problem.",
        "The ground covered: network builders, brokers, private bankers and asset managers — the people who decide, on behalf of their clients, whether an asset class is worth a second look. That network is not assembled when the raise opens; it is built beforehand, relationship by relationship, which is why a pre-seed on an asset as thinly covered as African private debt is already over €700K committed.",
        "The remit also spans the wider ecosystem: banking partners, support structures, institutional counterparts — everything that turns an investment thesis into a durable distribution channel.",
      ],
    },
    owns: {
      fr: ["Relation investisseurs et capital-in", "Réseau prescripteurs et distribution", "Partenariats écosystème"],
      en: ["Investor relations and capital-in", "Prescriber network and distribution", "Ecosystem partnerships"],
    },
  },
  {
    id: "herve-gakpe",
    name: "Hervé Gakpe",
    initials: "HG",
    role: { fr: "Co-fondateur — Directeur financier", en: "Co-founder — CFO" },
    tagline: {
      fr: "Trente bilans de PME avant celui-ci.",
      en: "Thirty SME balance sheets before this one.",
    },
    story: {
      fr: [
        "Hervé commence sa carrière au Crédit Agricole, en financement de projets. C'est exactement la discipline dont vit Minah : regarder un contrat, un échéancier et un ensemble de sûretés, et dire si l'argent reviendra — et quand.",
        "Il devient ensuite directeur financier à temps partiel pour plus de trente startups et PME françaises. Un DAF externalisé voit ce qu'un DAF interne ne voit jamais : trente façons de se tromper sur sa trésorerie, trente jeux d'hypothèses qui tiennent ou qui cassent. Cette accumulation est difficile à répliquer, et elle explique la prudence du modèle — coupons fixes, maturités courtes, protections empilées plutôt que rendement maximal affiché.",
        "Formé à l'ESSEC et passé par SMASH, il pilote aujourd'hui la finance de Minah et le reporting investisseurs : la cap table, les appels de fonds, les échéanciers, et la discipline de ce que l'on promet par écrit à ceux qui souscrivent.",
      ],
      en: [
        "Hervé started out at Crédit Agricole in project finance — precisely the discipline Minah lives on: look at a contract, a repayment schedule and a set of securities, and say whether the money comes back, and when.",
        "He then spent years as a part-time CFO for more than thirty French startups and SMEs. An outsourced CFO sees what an in-house one never does: thirty ways to be wrong about your cash position, thirty sets of assumptions that hold or break. That accumulation is hard to replicate, and it explains the caution built into the model — fixed coupons, short maturities, stacked protections rather than a headline yield.",
        "ESSEC-trained and formerly at SMASH, he now runs Minah's finance and investor reporting: the cap table, capital calls, repayment schedules, and the discipline of what gets promised in writing to those who subscribe.",
      ],
    },
    owns: {
      fr: ["Finance, trésorerie et cap table", "Reporting investisseurs et échéanciers", "Modélisation des stratégies"],
      en: ["Finance, treasury and cap table", "Investor reporting and schedules", "Strategy modelling"],
    },
  },
  {
    id: "julien-gakpe",
    name: "Julien Gakpe",
    initials: "JG",
    role: { fr: "Co-fondateur — Directeur général", en: "Co-founder — CEO" },
    tagline: {
      fr: "Le financement public, vu de l'intérieur.",
      en: "Public financing, seen from the inside.",
    },
    story: {
      fr: [
        "Polytechnicien, Julien a exercé chez Bpifrance et chez Avolta. Bpifrance, c'est l'école du financement d'entreprise à grande échelle : instruire, structurer, doser le risque, et le faire dans un cadre institutionnel où l'on rend des comptes.",
        "Cette trajectoire explique le positionnement de Minah. Là où la première génération de la fintech africaine a construit les rails du paiement, Minah s'attaque à ce qui reste ouvert — la façon dont l'argent travaille. Ce n'est pas un pari technologique : c'est une question de structuration, et elle se traite avec les outils du financement de projets, pas avec ceux du capital-risque.",
        "Julien pilote la structuration et l'origination : le choix des contrats financés, le montage des protections, la relation avec les payeurs publics et les partenaires bancaires. C'est-à-dire l'endroit exact où se décide si un coupon de 20 % est un rendement ou un risque mal évalué.",
      ],
      en: [
        "An École Polytechnique graduate, Julien has worked at Bpifrance and at Avolta. Bpifrance is the school of corporate financing at scale: assess, structure, calibrate risk — and do it inside an institutional frame where you answer for it.",
        "That path explains Minah's positioning. Where African fintech's first generation built the payment rails, Minah takes on what is still open: how money works, not how it moves. This is not a technology bet — it is a structuring question, and it is handled with project-finance tools rather than venture-capital ones.",
        "Julien runs structuring and origination: which contracts get financed, how the protections are assembled, the relationship with public payers and banking partners. That is precisely where it is decided whether a 20% coupon is a yield or a mispriced risk.",
      ],
    },
    owns: {
      fr: ["Structuration et origination", "Relation payeurs publics et partenaires bancaires", "Direction générale et stratégie"],
      en: ["Structuring and origination", "Public payer and banking relationships", "General management and strategy"],
    },
  },
];

const copy = {
  fr: {
    owns: "Son périmètre",
    support:
      "Autour des fondateurs, huit profils support — tech, communication, juridique. Bios détaillées sur demande.",
  },
  en: {
    owns: "Scope",
    support:
      "Around the founders, eight support profiles — tech, communications, legal. Detailed bios on request.",
  },
};

export function TeamProfiles({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <section className="mt-10">
      <div className="space-y-8">
        {PROFILES.map((p, i) => (
          <article
            key={p.id}
            className="overflow-hidden rounded-xl border border-foreground/10 bg-white/60"
          >
            <div className="flex flex-col gap-6 p-6 sm:flex-row sm:gap-8 sm:p-8">
              {/* portrait : monogramme tant qu'il n'y a pas de photo */}
              <div className="shrink-0">
                {p.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="h-24 w-24 rounded-full object-cover shadow-sm"
                  />
                ) : (
                  <div
                    aria-hidden
                    className={`flex h-24 w-24 items-center justify-center rounded-full text-2xl font-semibold tracking-wide shadow-sm ${
                      i === 1
                        ? "bg-marsala text-white"
                        : i === 2
                          ? "bg-brand text-white"
                          : "bg-salvia text-marsala"
                    }`}
                  >
                    {p.initials}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-semibold tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-marsala">
                  {p.role[locale]}
                </p>
                <p className="mt-3 text-sm italic text-neutral-500">
                  {p.tagline[locale]}
                </p>

                <div className="mt-4 space-y-3">
                  {p.story[locale].map((para) => (
                    <p key={para} className="text-sm leading-7 text-neutral-700">
                      {para}
                    </p>
                  ))}
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  {c.owns}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {p.owns[locale].map((o) => (
                    <li
                      key={o}
                      className="rounded-full border border-foreground/10 bg-chalk px-3 py-1 text-xs text-neutral-600"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm leading-6 text-neutral-500">{c.support}</p>
    </section>
  );
}

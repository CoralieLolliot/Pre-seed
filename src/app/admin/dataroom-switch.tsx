"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DataRoomStatus } from "@/lib/dataroom";

const OPTIONS: {
  value: DataRoomStatus;
  label: string;
  on: string;
  title: string;
}[] = [
  {
    value: "open",
    label: "Ouverte",
    on: "bg-salvia text-marsala",
    title: "Accès normal pour tous les investisseurs.",
  },
  {
    value: "maintenance",
    label: "Maintenance",
    on: "bg-brand text-white",
    title:
      "Data room inaccessible le temps d'une mise à jour. Les investisseurs seront prévenus par email à la réouverture.",
  },
  {
    value: "closed",
    label: "Fermée",
    on: "bg-marsala text-white",
    title: "Data room fermée. Aucun email ne sera envoyé.",
  },
];

export function DataRoomSwitch({ status }: { status: DataRoomStatus }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  async function change(next: DataRoomStatus) {
    if (next === status || busy) return;

    // Sortir de maintenance envoie un email à tous les investisseurs actifs :
    // c'est irréversible, on demande confirmation.
    if (status === "maintenance" && next === "open") {
      const ok = window.confirm(
        "Rouvrir la data room et prévenir les investisseurs par email que la mise à jour est terminée ?"
      );
      if (!ok) return;
    }

    setBusy(true);
    setNote(null);
    const res = await fetch("/api/dataroom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    }).catch(() => null);
    setBusy(false);

    if (!res?.ok) {
      setNote("Échec, réessayez.");
      return;
    }
    const data = (await res.json()) as { emailed: number };
    if (data.emailed > 0) {
      setNote(
        `${data.emailed} investisseur${data.emailed > 1 ? "s" : ""} prévenu${data.emailed > 1 ? "s" : ""} par email`
      );
    }
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-xs text-neutral-400 sm:inline">
        Data room
      </span>
      <div className="flex items-center gap-0.5 rounded-md border border-neutral-200 p-0.5 dark:border-neutral-800">
        {OPTIONS.map((o) => (
          <button
            key={o.value}
            onClick={() => change(o.value)}
            disabled={busy}
            title={o.title}
            aria-pressed={o.value === status}
            className={`rounded px-2 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
              o.value === status
                ? o.on
                : "text-neutral-500 hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      {note && <span className="text-xs text-neutral-500">{note}</span>}
    </div>
  );
}

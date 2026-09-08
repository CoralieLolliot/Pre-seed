import { t, type Locale } from "@/lib/i18n";
import type { DataRoomStatus } from "@/lib/dataroom";

// Écran affiché à la place de la data room quand elle est fermée ou en
// maintenance. Les admins et les sessions de démo ne le voient jamais.
// Même portrait dans les deux cas ; seul le filet sous le message distingue
// une mise à jour en cours (orange) d'une fermeture (blanc discret).
export function DataRoomNotice({
  status,
  locale,
}: {
  status: Exclude<DataRoomStatus, "open">;
  locale: Locale;
}) {
  const maintenance = status === "maintenance";

  return (
    <main className="relative flex flex-1 items-center overflow-hidden">
      {/* fond pleine page */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/bg-notice.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* voile : le texte doit rester lisible quel que soit le recadrage */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

      <div className="relative mx-auto w-full max-w-5xl px-6 py-24">
        <div className="max-w-md text-center sm:text-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-3d.webp"
            alt=""
            // l'ombre décolle le logo du fond orange de la maintenance
            className="mx-auto h-28 w-28 drop-shadow-[0_10px_28px_rgba(0,0,0,0.45)] sm:mx-0 sm:h-32 sm:w-32"
          />
          <h1 className="mt-8 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {t(
              locale,
              maintenance
                ? "dataroom.maintenance.title"
                : "dataroom.closed.title"
            )}
          </h1>
          <p className="mt-4 text-base leading-7 text-white/80">
            {t(
              locale,
              maintenance
                ? "dataroom.maintenance.body"
                : "dataroom.closed.body"
            )}
          </p>
          <span
            className={`mx-auto mt-10 block h-px w-24 sm:mx-0 ${
              maintenance ? "bg-brand" : "bg-white/40"
            }`}
          />
        </div>
      </div>
    </main>
  );
}

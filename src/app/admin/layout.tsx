import Link from "next/link";
import { getDataRoomStatus } from "@/lib/dataroom";
import { DataRoomSwitch } from "./dataroom-switch";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const dataRoomStatus = await getDataRoomStatus();

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="Minah">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.png" alt="Minah" className="h-5 w-auto" />
          </Link>
          <Link href="/admin" className="text-xs text-neutral-500 hover:underline">
            Investisseurs
          </Link>
          <Link
            href="/admin/captable"
            className="text-xs text-neutral-500 hover:underline"
          >
            Cap table
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <DataRoomSwitch status={dataRoomStatus} />
          {/* Démo : ouvre un espace investisseur factice pour les calls. */}
          <Link
            href="/investors?demo=1"
            className="rounded-md border border-brand/40 bg-brand/10 px-2.5 py-1 text-xs font-medium text-marsala transition-colors hover:border-brand"
          >
            Démo
          </Link>
          <form action="/auth/signout" method="post">
            <button type="submit" className="text-xs text-neutral-500 hover:underline">
              Se déconnecter
            </button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}

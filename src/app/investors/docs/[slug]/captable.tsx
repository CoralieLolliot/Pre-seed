// Cap table interactive (vue investisseur) : HTML autonome servi par
// /api/captable avec les paramètres officiels enregistrés depuis /admin/captable.
// Les hypothèses internes n'y sont ni visibles ni modifiables.
export function CapTableInteractive({ title }: { title: string }) {
  return (
    <iframe
      src="/api/captable"
      title={title}
      className="mt-8 h-[1600px] w-full rounded-md border border-neutral-200 dark:border-neutral-800"
    />
  );
}

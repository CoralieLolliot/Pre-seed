import {
  addAdmin,
  getAdminEmail,
  isEmailShaped,
  listAdmins,
  normalizeEmail,
  removeAdmin,
} from "@/lib/admin";

// Gestion de la whitelist admin. Réservé aux admins : c'est la porte d'entrée
// de tout le back-office.
export async function POST(request: Request) {
  const me = await getAdminEmail();
  if (!me) return new Response(null, { status: 403 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await request.text());
  } catch {
    return new Response(null, { status: 400 });
  }

  const email = normalizeEmail(String(body.email ?? ""));
  if (!isEmailShaped(email)) {
    return Response.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  await addAdmin(email);
  return Response.json({ admins: await listAdmins() });
}

export async function DELETE(request: Request) {
  const me = await getAdminEmail();
  if (!me) return new Response(null, { status: 403 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await request.text());
  } catch {
    return new Response(null, { status: 400 });
  }
  const email = normalizeEmail(String(body.email ?? ""));

  // On ne se retire pas soi-même : c'est la façon la plus simple de se
  // retrouver dehors sans pouvoir revenir.
  if (email === me) {
    return Response.json(
      { error: "Vous ne pouvez pas retirer votre propre accès." },
      { status: 400 }
    );
  }

  const entry = (await listAdmins()).find((a) => a.email === email);
  if (entry?.source === "env") {
    return Response.json(
      {
        error:
          "Cet accès vient de la configuration du serveur (ADMIN_EMAILS) et se retire depuis Vercel.",
      },
      { status: 400 }
    );
  }

  await removeAdmin(email);
  return Response.json({ admins: await listAdmins() });
}

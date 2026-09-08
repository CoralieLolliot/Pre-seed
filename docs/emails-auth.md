# Emails d'authentification

Les codes d'accès partent de **Supabase Auth**, qui envoie via **Resend en SMTP**.
Il n'y a donc aucun appel à l'API Resend dans le code : `signInWithOtp()` suffit,
tout le reste est de la configuration côté projet Supabase (non versionnée).

## SMTP

| Paramètre | Valeur |
| --- | --- |
| `smtp_host` | `smtp.resend.com` |
| `smtp_port` | `465` |
| `smtp_user` | `resend` |
| `smtp_pass` | clé API Resend (`re_…`) |
| Expéditeur | `Minah <access@minah.io>` |

`mailer_otp_exp = 3600` (1 h) et `mailer_otp_length = 8` — cette longueur est
reprise par `OTP_LENGTH` dans `src/app/investors/request-access-form.tsx`.
**Si tu la changes dans Supabase, change-la aussi là-bas.**

## Templates bilingues

Supabase Auth n'a qu'un seul template par type et ne connaît pas la langue
choisie par l'investisseur (elle vit dans un cookie côté site). Les templates
`confirmation` et `magic_link` contiennent donc **les deux langues dans le même
email** : titre bilingue, code affiché une fois, puis un paragraphe FR et un
paragraphe EN.

Sujet : `Votre code d'accès Minah · Your Minah access code`

Les relire ou les modifier :

```bash
TOKEN=$(grep SUPABASE_ACCESS_TOKEN .env.local | cut -d= -f2)
curl -s -H "Authorization: Bearer $TOKEN" \
  https://api.supabase.com/v1/projects/nuzklwegigoykemeznzw/config/auth \
  | jq '{mailer_subjects_magic_link, mailer_templates_magic_link_content}'
```

## Les autres emails passent, eux, par l'API Resend

L'email de réouverture de la data room (transition « maintenance » →
« ouverte », cf. `src/app/api/dataroom/route.ts`) ne passe pas par Supabase :
il est envoyé directement via l'API Resend depuis `src/lib/email.ts`, ce qui
demande **`RESEND_API_KEY`** dans l'environnement. Pas de dépendance npm, la
route REST suffit.

Un envoi par destinataire, jamais de liste groupée : personne ne doit
découvrir les autres investisseurs dans un champ de destinataires.

## Si un jour on veut un email d'authentification 100 % dans la langue choisie

Il faut passer par un **Auth Hook « Send Email »** : Supabase appellerait une
route Next.js qui lit la langue et envoie le mail via l'API Resend — la brique
d'envoi existe déjà (`sendBatch`), il ne manque que le hook.

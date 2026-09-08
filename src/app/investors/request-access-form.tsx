"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { track } from "@/lib/tracking";
import { t, type Locale } from "@/lib/i18n";

const inputClass =
  "w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700 dark:focus:border-neutral-400";

// Longueur du code envoyé par Supabase Auth (config `mailer_otp_length`).
const OTP_LENGTH = 8;

type Mode = "new" | "returning";
type Step = "form" | "code";

export function RequestAccessForm({
  refCode,
  nextPath,
  locale,
}: {
  refCode: string | null;
  nextPath?: string | null;
  locale: Locale;
}) {
  const destination =
    nextPath && nextPath.startsWith("/") ? nextPath : "/investors/home";
  const [mode, setMode] = useState<Mode>("new");
  const [step, setStep] = useState<Step>("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [entity, setEntity] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callbackUrl = () =>
    `${window.location.origin}/auth/callback?next=${encodeURIComponent(destination)}`;

  async function sendCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const supabase = createClient();
    const { error } =
      mode === "new"
        ? await supabase.auth.signInWithOtp({
            email: email.trim(),
            options: {
              emailRedirectTo: callbackUrl(),
              data: {
                full_name: `${firstName.trim()} ${lastName.trim()}`.trim(),
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                entity: entity.trim(),
                ref: refCode ?? undefined,
              },
            },
          })
        : await supabase.auth.signInWithOtp({
            email: email.trim(),
            options: { shouldCreateUser: false, emailRedirectTo: callbackUrl() },
          });

    setBusy(false);
    if (error) {
      if (/signup|not allowed|not found/i.test(error.message)) {
        setError(t(locale, "auth.unknownEmail"));
      } else {
        setError(`${t(locale, "auth.sendFailed")} ${error.message}`);
      }
    } else {
      setStep("code");
    }
  }

  async function verifyCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });

    if (error) {
      setBusy(false);
      setError(t(locale, "auth.codeInvalid"));
      return;
    }

    track({ type: "login", path: "/investors" });
    // Le code est validé : c'est le moment d'entrée, la cinématique se joue
    // sur la page d'arrivée (cf. splash.tsx).
    window.sessionStorage.setItem("minah_splash_pending", "1");
    window.location.href = destination;
  }

  if (step === "code") {
    return (
      <form onSubmit={verifyCode} className="mt-8 space-y-4">
        <div className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <p className="font-medium">{t(locale, "auth.codeSent")}</p>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            {t(locale, "auth.codeSentDetail", {
              n: OTP_LENGTH,
              email: email.trim(),
            })}
          </p>
        </div>
        <div>
          <label htmlFor="code" className="mb-1 block text-sm font-medium">
            {t(locale, "auth.codeLabel")}
          </label>
          <input
            id="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={OTP_LENGTH}
            placeholder={"0".repeat(OTP_LENGTH)}
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`${inputClass} text-center text-lg tracking-[6px]`}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <button
          type="submit"
          disabled={busy || code.trim().length < OTP_LENGTH}
          className="w-full rounded-md bg-marsala py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {busy ? t(locale, "auth.codeVerifying") : t(locale, "auth.codeSubmit")}
        </button>
        <button
          type="button"
          onClick={() => {
            setStep("form");
            setCode("");
            setError(null);
          }}
          className="w-full text-center text-xs text-neutral-500 hover:underline"
        >
          {t(locale, "auth.codeBack")}
        </button>
      </form>
    );
  }

  return (
    <div className="mt-8">
      {/* Choix nouveau / déjà inscrit */}
      <div className="grid grid-cols-2 gap-1 rounded-md border border-neutral-200 p-1 dark:border-neutral-800">
        {(
          [
            ["new", t(locale, "auth.tab.new")],
            ["returning", t(locale, "auth.tab.returning")],
          ] as [Mode, string][]
        ).map(([m, label]) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError(null);
            }}
            className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
              mode === m
                ? "bg-foreground text-background"
                : "text-neutral-500 hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={sendCode} className="mt-6 space-y-4">
        {mode === "new" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="mb-1 block text-sm font-medium">
                  {t(locale, "auth.firstName")}
                </label>
                <input
                  id="first_name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClass}
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="mb-1 block text-sm font-medium">
                  {t(locale, "auth.lastName")}
                </label>
                <input
                  id="last_name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClass}
                  autoComplete="family-name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="entity" className="mb-1 block text-sm font-medium">
                {t(locale, "auth.entity")}
              </label>
              <input
                id="entity"
                required
                value={entity}
                onChange={(e) => setEntity(e.target.value)}
                className={inputClass}
                autoComplete="organization"
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            {t(locale, "auth.email")}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-md bg-marsala py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {busy ? t(locale, "auth.submitting") : t(locale, "auth.submit")}
        </button>

        {mode === "new" && (
          <p className="pt-2 text-xs leading-5 text-neutral-500">
            {t(locale, "auth.rgpd")}{" "}
            <a href="mailto:contact@minah.io" className="underline">
              contact@minah.io
            </a>
          </p>
        )}
      </form>
    </div>
  );
}

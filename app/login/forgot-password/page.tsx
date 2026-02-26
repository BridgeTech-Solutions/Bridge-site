"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { resetPasswordForEmail } from "@/lib/auth/auth-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    setLoading(true);
    try {
      const { success: ok, error: err } = await resetPasswordForEmail(email);
      if (ok) {
        setSuccess(true);
      } else {
        console.error("resetPasswordForEmail error:", err);
        setError(err || "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (e) {
      console.error("resetPasswordForEmail exception:", e);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.png"
            alt="Bridge Technologies Solutions"
            width={160}
            height={52}
            className="object-contain h-14 w-auto mb-4"
            priority
          />
          <h1 className="text-xl font-bold text-gray-900">Espace Administration</h1>
          <p className="text-sm text-gray-500 mt-1">Réinitialisation du mot de passe</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="mb-6">
            <div className="h-1 w-12 rounded-full bg-[#0088C1] mb-4" />
            <h2 className="text-lg font-bold text-gray-900">Mot de passe oublié</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Entrez votre email pour recevoir un lien de réinitialisation.
            </p>
          </div>

          {success ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50">
                <CheckCircle2 className="w-7 h-7 text-emerald-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Email envoyé !</p>
                <p className="text-sm text-gray-500 mt-1">
                  Si un compte existe pour <span className="font-medium text-gray-700">{email}</span>,
                  vous recevrez un lien de réinitialisation sous peu.
                </p>
              </div>
              <Link
                href="/login"
                className="mt-2 text-sm font-semibold text-[#0088C1] hover:text-[#014B6A] transition-colors"
              >
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="admin@bridgetech-solutions.com"
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0088C1] focus:ring-2 focus:ring-[#0088C1]/10 disabled:opacity-50 transition"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-100">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600 leading-snug">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-[#0088C1] text-white hover:bg-[#014B6A] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Envoi en cours…
                  </>
                ) : (
                  "Envoyer le lien"
                )}
              </button>

              <Link
                href="/login"
                className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Retour à la connexion
              </Link>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} Bridge Technologies Solutions
        </p>
      </div>
    </div>
  );
}

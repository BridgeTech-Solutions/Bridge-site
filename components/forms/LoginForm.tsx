"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { signInWithEmail } from "@/lib/auth/auth-client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      const { success, error: authError } = await signInWithEmail(email, password);
      if (success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(authError ?? "Identifiants incorrects. Vérifiez votre email et mot de passe.");
      }
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
          Adresse email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          placeholder="admin@bridgetech-solutions.com"
          disabled={loading}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0088C1] focus:ring-2 focus:ring-[#0088C1]/10 disabled:opacity-50 transition"
        />
      </div>

      {/* Mot de passe */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
            Mot de passe
          </label>
          <Link
            href="/login/forgot-password"
            className="text-xs font-medium text-[#0088C1] hover:text-[#014B6A] transition-colors"
            tabIndex={-1}
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            placeholder="••••••••"
            disabled={loading}
            className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0088C1] focus:ring-2 focus:ring-[#0088C1]/10 disabled:opacity-50 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-100">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 leading-snug">{error}</p>
        </div>
      )}

      {/* Bouton */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: loading ? '#0088C1' : '#0088C1', color: '#ffffff' }}
        onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#014B6A'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0088C1'; }}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Connexion en cours…
          </>
        ) : (
          "Se connecter"
        )}
      </button>
    </form>
  );
}

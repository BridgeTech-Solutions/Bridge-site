"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Lock, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export function SetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    // Rediriger vers le dashboard après 2 secondes
    setTimeout(() => router.push("/admin"), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Nouveau mot de passe */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          Nouveau mot de passe <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            placeholder="Minimum 8 caractères"
            className="w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Confirmation */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          Confirmer le mot de passe <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            placeholder="Répétez le mot de passe"
            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1]"
          />
        </div>
      </div>

      {/* Indicateur de force */}
      {password.length > 0 && (
        <div className="space-y-1">
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i < strengthScore(password)
                    ? strengthColor(password)
                    : "bg-gray-100"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-400">{strengthLabel(password)}</p>
        </div>
      )}

      {/* Feedback */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 text-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          Mot de passe défini ! Redirection vers le dashboard…
        </div>
      )}

      <button
        type="submit"
        disabled={loading || success}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold disabled:opacity-60 transition-opacity mt-2"
        style={{ backgroundColor: "#0088C1", color: "#ffffff" }}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Accéder au dashboard"
        )}
      </button>
    </form>
  );
}

// Helpers indicateur de force
function strengthScore(pwd: string): number {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

function strengthColor(pwd: string): string {
  const s = strengthScore(pwd);
  if (s <= 1) return "bg-red-400";
  if (s === 2) return "bg-amber-400";
  if (s === 3) return "bg-yellow-400";
  return "bg-emerald-500";
}

function strengthLabel(pwd: string): string {
  const s = strengthScore(pwd);
  if (s <= 1) return "Faible";
  if (s === 2) return "Moyen";
  if (s === 3) return "Bon";
  return "Excellent";
}

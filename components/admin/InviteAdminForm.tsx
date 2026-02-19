"use client";

import { useState } from "react";
import { UserPlus, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export function InviteAdminForm({ onInvited }: { onInvited: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: "",
    full_name: "",
    role: "admin",
  });

  const set = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Erreur lors de l'invitation");
      return;
    }

    setSuccess(true);
    setForm({ email: "", full_name: "", role: "admin" });
    setTimeout(() => {
      setSuccess(false);
      setOpen(false);
      onInvited();
    }, 2000);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-opacity"
        style={{ backgroundColor: "#0088C1", color: "#ffffff" }}
      >
        <UserPlus className="w-4 h-4" />
        Inviter un admin
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => !loading && setOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10">
            <h3 className="text-base font-bold text-gray-900 mb-1">Inviter un administrateur</h3>
            <p className="text-xs text-gray-500 mb-5">
              Un email d&apos;invitation sera envoyé. L&apos;utilisateur devra définir son mot de passe.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => set("full_name", e.target.value)}
                  placeholder="Jean Dupont"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  required
                  placeholder="jean@bridgetech-solutions.com"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Rôle <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.role}
                  onChange={(e) => set("role", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1] bg-white"
                >
                  <option value="super_admin">Super Admin — accès total</option>
                  <option value="admin">Admin — gestion du contenu</option>
                  <option value="editor">Éditeur — modification uniquement</option>
                  <option value="viewer">Lecteur — lecture seule</option>
                </select>
              </div>

              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Invitation envoyée avec succès !
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={loading || success}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60"
                  style={{ backgroundColor: "#0088C1", color: "#ffffff" }}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                  Envoyer l&apos;invitation
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-60"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

type TeamMemberFormProps = {
  member?: {
    id: string;
    full_name: string;
    position: string;
    email?: string;
    photo_url?: string;
    linkedin_url?: string;
    status: string;
    order_position?: number;
  };
};

export function TeamMemberForm({ member }: TeamMemberFormProps) {
  const router = useRouter();
  const isEdit = !!member;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: member?.full_name ?? "",
    position: member?.position ?? "",
    email: member?.email ?? "",
    photo_url: member?.photo_url ?? "",
    linkedin_url: member?.linkedin_url ?? "",
    status: member?.status ?? "published",
    order_position: member?.order_position ?? 0,
  });

  const set = <K extends keyof typeof form>(field: K, value: typeof form[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const url = isEdit
      ? `/api/admin/team/${member.id}/update`
      : "/api/admin/team";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Erreur lors de la sauvegarde");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/team"), 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">

        {/* Nom complet */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.full_name}
            onChange={(e) => set("full_name", e.target.value)}
            required
            placeholder="Jean Dupont"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1]"
          />
        </div>

        {/* Poste */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Poste / Rôle <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.position}
            onChange={(e) => set("position", e.target.value)}
            required
            placeholder="Directeur Technique"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="jean@bridgetech-solutions.com"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1]"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            URL photo <span className="text-gray-400 font-normal">(lien direct vers l&apos;image)</span>
          </label>
          <input
            type="url"
            value={form.photo_url}
            onChange={(e) => set("photo_url", e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1]"
          />
          {form.photo_url && (
            <div className="mt-2 flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.photo_url}
                alt="Aperçu"
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              />
              <span className="text-xs text-gray-400">Aperçu</span>
            </div>
          )}
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            URL LinkedIn
          </label>
          <input
            type="url"
            value={form.linkedin_url}
            onChange={(e) => set("linkedin_url", e.target.value)}
            placeholder="https://linkedin.com/in/..."
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1]"
          />
        </div>

        {/* Ordre + Statut */}
        <div className="flex items-center gap-6">
          <div className="w-32">
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Ordre d&apos;affichage
            </label>
            <input
              type="number"
              value={form.order_position}
              onChange={(e) => set("order_position", Number(e.target.value))}
              min={0}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1]"
            />
          </div>
          <div className="flex items-center gap-3 pt-5">
            <input
              type="checkbox"
              id="status"
              checked={form.status === "published"}
              onChange={(e) => set("status", e.target.checked ? "published" : "draft")}
              className="w-4 h-4 accent-[#0088C1]"
            />
            <label htmlFor="status" className="text-sm font-medium text-gray-700 cursor-pointer">
              Membre actif (visible sur le site)
            </label>
          </div>
        </div>
      </div>

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
          {isEdit ? "Modifié avec succès !" : "Membre ajouté !"} Redirection…
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading || success}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 transition-opacity"
          style={{ backgroundColor: "#0088C1", color: "#ffffff" }}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isEdit ? "Sauvegarder" : "Ajouter le membre"}
        </button>
        <Link
          href="/admin/team"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
      </div>
    </form>
  );
}

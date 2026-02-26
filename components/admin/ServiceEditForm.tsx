"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

type Service = {
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  full_description?: string;
  icon?: string;
  features?: string[];
  status: string;
  order_position?: number;
};

export function ServiceEditForm({ service }: { service: Service }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: service.title ?? "",
    short_description: service.short_description ?? "",
    full_description: service.full_description ?? "",
    icon: service.icon ?? "",
    features: (service.features ?? []).join("\n"),
    order_position: service.order_position ?? 0,
  });

  const set = (field: keyof typeof form, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const features = form.features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const res = await fetch(`/api/admin/services/${service.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, features }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Erreur lors de la sauvegarde");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/services"), 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">

        {/* Titre */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Titre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            required
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1]"
          />
        </div>

        {/* Slug (lecture seule) */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Slug <span className="text-gray-400 font-normal">(non modifiable)</span>
          </label>
          <input
            type="text"
            value={service.slug}
            disabled
            className="w-full px-3 py-2.5 text-sm border border-gray-100 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* Icône */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Icône <span className="text-gray-400 font-normal">(nom Lucide, ex: Server)</span>
          </label>
          <input
            type="text"
            value={form.icon}
            onChange={(e) => set("icon", e.target.value)}
            placeholder="FolderKanban"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1]"
          />
        </div>

        {/* Description courte */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Description courte
          </label>
          <textarea
            value={form.short_description}
            onChange={(e) => set("short_description", e.target.value)}
            rows={2}
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1] resize-none"
          />
        </div>

        {/* Description complète */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Description complète
          </label>
          <textarea
            value={form.full_description}
            onChange={(e) => set("full_description", e.target.value)}
            rows={5}
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1] resize-y"
          />
        </div>

        {/* Fonctionnalités */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Fonctionnalités <span className="text-gray-400 font-normal">(une par ligne)</span>
          </label>
          <textarea
            value={form.features}
            onChange={(e) => set("features", e.target.value)}
            rows={4}
            placeholder={"Gestion des délais\nSuivi des ressources\nTableau de bord"}
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1] resize-y font-mono"
          />
        </div>

        {/* Ordre d'affichage */}
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
          Sauvegardé ! Redirection…
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
          Sauvegarder
        </button>
        <Link
          href="/admin/services"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
      </div>
    </form>
  );
}

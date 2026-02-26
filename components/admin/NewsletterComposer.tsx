"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Send, Loader2, Users } from "lucide-react";

export function NewsletterComposer({ activeCount }: { activeCount: number }) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value.trim();
    const body = (form.elements.namedItem("body") as HTMLTextAreaElement).value.trim();
    if (!subject || !body) return;

    setSending(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        form.reset();
      } else {
        setError(data.error ?? "Erreur lors de l'envoi");
      }
    } catch {
      setError("Erreur réseau");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Toggle header */}
      <button
        onClick={() => { setOpen((v) => !v); setResult(null); setError(null); }}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0088C1]/10 text-[#0088C1]">
            <Send className="w-4 h-4" />
          </span>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900">Composer une newsletter</p>
            <p className="text-xs text-gray-400">
              {activeCount > 0
                ? `Envoi à ${activeCount} abonné${activeCount > 1 ? "s" : ""} actif${activeCount > 1 ? "s" : ""}`
                : "Aucun abonné actif"}
            </p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {/* Form */}
      {open && (
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
          {/* Badge destinataires */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
              <Users className="w-3.5 h-3.5" />
              {activeCount} destinataire{activeCount > 1 ? "s" : ""}
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
              Sujet
            </label>
            <input
              name="subject"
              required
              placeholder="Sujet de la newsletter…"
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
              Message
            </label>
            <textarea
              name="body"
              rows={8}
              required
              placeholder="Contenu de la newsletter…"
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1] resize-none"
            />
          </div>

          {result && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
              <p className="font-semibold">Newsletter envoyée !</p>
              <p className="text-xs mt-0.5">
                {result.sent} envoyé{result.sent > 1 ? "s" : ""}
                {result.failed > 0 && `, ${result.failed} échec${result.failed > 1 ? "s" : ""}`}
                {" "}sur {result.total} destinataire{result.total > 1 ? "s" : ""}
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={sending || activeCount === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0088C1] hover:bg-[#006fa0] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {sending ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours…</>
            ) : (
              <><Send className="w-4 h-4" /> Envoyer à {activeCount} abonné{activeCount > 1 ? "s" : ""}</>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

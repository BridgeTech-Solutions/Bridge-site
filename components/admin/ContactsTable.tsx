"use client";

import { useState } from "react";
import { Eye, Trash2, CheckCheck, X, Mail, Phone, Send, Loader2 } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  status: string;
  created_at: string;
};

export function ContactsTable({ contacts }: { contacts: Contact[] }) {
  const [selected, setSelected] = useState<Contact | null>(null);
  const [list, setList] = useState<Contact[]>(contacts);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // États réponse admin
  const [replyTarget, setReplyTarget] = useState<Contact | null>(null);
  const [replySending, setReplySending] = useState(false);
  const [replyResult, setReplyResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const markAsRead = async (id: string) => {
    setLoadingId(id);
    try {
      await fetch(`/api/admin/contacts/${id}/read`, { method: "PATCH" });
      setList((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "read" } : c))
      );
      if (selected?.id === id) setSelected((s) => s ? { ...s, status: "read" } : s);
    } finally {
      setLoadingId(null);
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Supprimer ce message définitivement ?")) return;
    setLoadingId(id);
    try {
      await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
      setList((prev) => prev.filter((c) => c.id !== id));
      if (selected?.id === id) setSelected(null);
    } finally {
      setLoadingId(null);
    }
  };

  const openReply = (contact: Contact) => {
    setReplyResult(null);
    setReplyTarget(contact);
    setSelected(null);
  };

  const sendReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!replyTarget) return;
    const form = e.currentTarget;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value.trim();
    const body = (form.elements.namedItem("body") as HTMLTextAreaElement).value.trim();
    if (!subject || !body) return;

    setReplySending(true);
    setReplyResult(null);
    try {
      const res = await fetch(`/api/admin/contacts/${replyTarget.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body }),
      });
      if (res.ok) {
        setList((prev) =>
          prev.map((c) => c.id === replyTarget.id ? { ...c, status: "replied" } : c)
        );
        setReplyResult({ ok: true, msg: "Email envoyé avec succès !" });
      } else {
        const data = await res.json();
        setReplyResult({ ok: false, msg: data.error ?? "Erreur lors de l'envoi" });
      }
    } catch {
      setReplyResult({ ok: false, msg: "Erreur réseau" });
    } finally {
      setReplySending(false);
    }
  };

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Mail className="w-10 h-10 text-gray-200 mb-3" />
        <p className="text-sm text-gray-400 font-medium">Aucun message</p>
      </div>
    );
  }

  return (
    <>
      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Expéditeur</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Sujet</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Date</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {list.map((contact) => (
              <tr
                key={contact.id}
                className={`hover:bg-gray-50 transition-colors ${contact.status === "new" ? "bg-[#0088C1]/3" : ""}`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0088C1]/10 text-[#0088C1] text-xs font-bold shrink-0">
                      {contact.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <div>
                      <p className={`font-semibold text-gray-900 ${contact.status === "new" ? "font-bold" : ""}`}>
                        {contact.name}
                      </p>
                      <p className="text-xs text-gray-400">{contact.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <p className="text-gray-700 truncate max-w-xs">{contact.subject ?? "—"}</p>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <p className="text-gray-500 text-xs">
                    {new Date(contact.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </p>
                </td>
                <td className="px-6 py-4">
                  {contact.status === "new" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-[#0088C1] text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      Non lu
                    </span>
                  ) : contact.status === "replied" ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-700">
                      Répondu
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-gray-100 text-gray-500">
                      Lu
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => setSelected(contact)}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-[#0088C1] transition-colors"
                      title="Voir le message"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openReply(contact)}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-[#0088C1] transition-colors"
                      title="Répondre par email"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                    {contact.status === "new" && (
                      <button
                        onClick={() => markAsRead(contact.id)}
                        disabled={loadingId === contact.id}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors disabled:opacity-40"
                        title="Marquer comme lu"
                      >
                        <CheckCheck className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteContact(contact.id)}
                      disabled={loadingId === contact.id}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal détail */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            {/* Header modal */}
            <div className="flex items-start justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0088C1]/10 text-[#0088C1] font-bold">
                  {selected.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{selected.name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(selected.created_at).toLocaleDateString("fr-FR", {
                      weekday: "long", day: "numeric", month: "long", year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corps modal */}
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-1.5 text-[#0088C1]">
                  <Mail className="w-4 h-4" /> {selected.email}
                </span>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-1.5 text-gray-500 hover:underline">
                    <Phone className="w-4 h-4" /> {selected.phone}
                  </a>
                )}
              </div>

              {selected.subject && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Sujet</p>
                  <p className="text-sm font-semibold text-gray-800">{selected.subject}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Message</p>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4">
                  {selected.message ?? "Aucun message"}
                </p>
              </div>
            </div>

            {/* Actions modal */}
            <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              {selected.status === "new" && (
                <button
                  onClick={() => markAsRead(selected.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[#0088C1] transition-colors"
                  style={{ color: '#ffffff' }}
                >
                  <CheckCheck className="w-4 h-4" /> Marquer comme lu
                </button>
              )}
              <button
                onClick={() => openReply(selected)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-white transition-colors"
              >
                <Send className="w-4 h-4" /> Répondre
              </button>
              <button
                onClick={() => deleteContact(selected.id)}
                className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de réponse */}
      {replyTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <p className="font-bold text-gray-900">Répondre à {replyTarget.name}</p>
                <p className="text-xs text-gray-400">{replyTarget.email}</p>
              </div>
              <button
                onClick={() => { setReplyTarget(null); setReplyResult(null); }}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={sendReply} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                  Destinataire
                </label>
                <input
                  readOnly
                  value={replyTarget.email}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                  Sujet
                </label>
                <input
                  name="subject"
                  defaultValue={replyTarget.subject ? `Re: ${replyTarget.subject}` : "Re: Votre message"}
                  required
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                  Message
                </label>
                <textarea
                  name="body"
                  rows={6}
                  required
                  placeholder="Votre réponse..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 focus:border-[#0088C1] resize-none"
                />
              </div>

              {replyResult && (
                <p className={`text-sm font-medium rounded-lg px-3 py-2 ${replyResult.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                  {replyResult.msg}
                </p>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={replySending}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0088C1] hover:bg-[#006fa0] disabled:opacity-60 transition-colors"
                >
                  {replySending ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Envoi…</>
                  ) : (
                    <><Send className="w-4 h-4" /> Envoyer</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setReplyTarget(null); setReplyResult(null); }}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { Trash2, Bell } from "lucide-react";

type Subscriber = {
  id: string;
  email: string;
  status: string;
  source?: string;
  subscribed_at: string;
};

export function NewsletterTable({ subscribers }: { subscribers: Subscriber[] }) {
  const [list, setList] = useState<Subscriber[]>(subscribers);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Supprimer cet abonné définitivement ?")) return;
    setLoadingId(id);
    try {
      await fetch(`/api/admin/newsletter/${id}`, { method: "DELETE" });
      setList((prev) => prev.filter((s) => s.id !== id));
    } finally {
      setLoadingId(null);
    }
  };

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Bell className="w-10 h-10 text-gray-200 mb-3" />
        <p className="text-sm text-gray-400 font-medium">Aucun abonné pour le moment</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Statut</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Source</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Date inscription</th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {list.map((sub) => (
            <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-3.5">
                <p className="font-medium text-gray-800">{sub.email}</p>
              </td>
              <td className="px-6 py-3.5 hidden sm:table-cell">
                {sub.status === "active" ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Actif
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-500">
                    Désabonné
                  </span>
                )}
              </td>
              <td className="px-6 py-3.5 hidden md:table-cell">
                <p className="text-xs text-gray-400">{sub.source ?? "Site web"}</p>
              </td>
              <td className="px-6 py-3.5 hidden lg:table-cell">
                <p className="text-xs text-gray-400">
                  {new Date(sub.subscribed_at).toLocaleDateString("fr-FR", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              </td>
              <td className="px-6 py-3.5">
                <div className="flex justify-end">
                  <button
                    onClick={() => deleteSubscriber(sub.id)}
                    disabled={loadingId === sub.id}
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
  );
}

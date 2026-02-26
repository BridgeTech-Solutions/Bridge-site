"use client";

import { useState } from "react";
import { ToggleLeft, ToggleRight, Trash2, UserCog } from "lucide-react";

type AdminUser = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  last_sign_in_at: string | null;
  created_at: string;
};

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  super_admin: { label: "Super Admin", color: "bg-violet-100 text-violet-700" },
  admin:       { label: "Admin",       color: "bg-[#0088C1]/10 text-[#0088C1]" },
  editor:      { label: "Éditeur",     color: "bg-amber-100 text-amber-700" },
  viewer:      { label: "Lecteur",     color: "bg-gray-100 text-gray-600" },
};

const ROLES = ["super_admin", "admin", "editor", "viewer"];

export function AdminUsersTable({
  users,
  currentUserId,
}: {
  users: AdminUser[];
  currentUserId: string;
}) {
  const [list, setList] = useState<AdminUser[]>(users);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const toggleActive = async (id: string, current: boolean) => {
    setLoadingId(id);
    try {
      await fetch(`/api/admin/users/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !current }),
      });
      setList((prev) =>
        prev.map((u) => (u.id === id ? { ...u, is_active: !current } : u))
      );
    } finally {
      setLoadingId(null);
    }
  };

  const changeRole = async (id: string, role: string) => {
    setLoadingId(id);
    try {
      await fetch(`/api/admin/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      setList((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role } : u))
      );
    } finally {
      setLoadingId(null);
    }
  };

  const removeUser = async (id: string, name: string) => {
    if (!confirm(`Retirer les droits admin de ${name} ? Le compte Supabase sera conservé.`)) return;
    setLoadingId(id);
    try {
      await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      setList((prev) => prev.filter((u) => u.id !== id));
    } finally {
      setLoadingId(null);
    }
  };

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <UserCog className="w-10 h-10 text-gray-200 mb-3" />
        <p className="text-sm text-gray-400">Aucun administrateur</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Utilisateur</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Rôle</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Dernière connexion</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {list.map((u) => {
            const roleInfo = ROLE_LABELS[u.role] ?? ROLE_LABELS.viewer;
            const isSelf = u.id === currentUserId;

            return (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                {/* Nom + email */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0088C1]/10 text-[#0088C1] text-sm font-bold shrink-0">
                      {(u.full_name || u.email)?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 flex items-center gap-2">
                        {u.full_name || "—"}
                        {isSelf && (
                          <span className="text-[10px] font-bold bg-[#0088C1]/10 text-[#0088C1] px-1.5 py-0.5 rounded-full">
                            Vous
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                  </div>
                </td>

                {/* Rôle — select modifiable */}
                <td className="px-6 py-4 hidden md:table-cell">
                  {isSelf ? (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${roleInfo.color}`}>
                      {roleInfo.label}
                    </span>
                  ) : (
                    <select
                      value={u.role}
                      onChange={(e) => changeRole(u.id, e.target.value)}
                      disabled={loadingId === u.id}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0088C1]/30 disabled:opacity-50 cursor-pointer"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {ROLE_LABELS[r].label}
                        </option>
                      ))}
                    </select>
                  )}
                </td>

                {/* Dernière connexion */}
                <td className="px-6 py-4 hidden lg:table-cell">
                  <p className="text-xs text-gray-400">
                    {u.last_sign_in_at
                      ? new Date(u.last_sign_in_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Jamais connecté"}
                  </p>
                </td>

                {/* Statut toggle */}
                <td className="px-6 py-4">
                  {isSelf ? (
                    <span className="flex items-center gap-1.5">
                      <ToggleRight className="w-5 h-5 text-emerald-500" />
                      <span className="text-xs font-medium text-emerald-600">Actif</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => toggleActive(u.id, u.is_active)}
                      disabled={loadingId === u.id}
                      className="flex items-center gap-1.5 disabled:opacity-40"
                    >
                      {u.is_active ? (
                        <>
                          <ToggleRight className="w-5 h-5 text-emerald-500" />
                          <span className="text-xs font-medium text-emerald-600">Actif</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-5 h-5 text-gray-300" />
                          <span className="text-xs font-medium text-gray-400">Inactif</span>
                        </>
                      )}
                    </button>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end">
                    {!isSelf && (
                      <button
                        onClick={() => removeUser(u.id, u.full_name || u.email)}
                        disabled={loadingId === u.id}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40"
                        title="Retirer les droits admin"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

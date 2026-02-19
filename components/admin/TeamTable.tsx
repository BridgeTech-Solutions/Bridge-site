"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, ToggleLeft, ToggleRight, Users } from "lucide-react";

type Member = {
  id: string;
  full_name: string;
  position: string;
  email?: string;
  photo_url?: string;
  linkedin_url?: string;
  status: string;
  order_position?: number;
};

export function TeamTable({ members }: { members: Member[] }) {
  const [list, setList] = useState<Member[]>(members);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const toggleActive = async (id: string, isPublished: boolean) => {
    setLoadingId(id);
    const newStatus = isPublished ? "draft" : "published";
    try {
      await fetch(`/api/admin/team/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setList((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      );
    } finally {
      setLoadingId(null);
    }
  };

  const deleteMember = async (id: string) => {
    if (!confirm("Supprimer ce membre définitivement ?")) return;
    setLoadingId(id);
    try {
      await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      setList((prev) => prev.filter((m) => m.id !== id));
    } finally {
      setLoadingId(null);
    }
  };

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Users className="w-10 h-10 text-gray-200 mb-3" />
        <p className="text-sm text-gray-400 font-medium">Aucun membre dans l&apos;équipe</p>
        <Link
          href="/admin/team/new"
          className="mt-4 text-sm font-semibold text-[#0088C1] hover:text-[#014B6A] transition-colors"
        >
          Ajouter le premier membre
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Membre</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Poste</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Email</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {list.map((member) => {
            const isPublished = member.status === "published";
            return (
              <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {member.photo_url ? (
                      <Image
                        src={member.photo_url}
                        alt={member.full_name}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0088C1]/10 text-[#0088C1] text-sm font-bold shrink-0">
                        {member.full_name?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <p className="font-semibold text-gray-900">{member.full_name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <p className="text-gray-600">{member.position}</p>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <p className="text-gray-400 text-xs">{member.email ?? "—"}</p>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleActive(member.id, isPublished)}
                    disabled={loadingId === member.id}
                    className="flex items-center gap-1.5 disabled:opacity-40"
                    title={isPublished ? "Désactiver" : "Activer"}
                  >
                    {isPublished ? (
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
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/team/${member.id}/edit`}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-[#0088C1] transition-colors"
                      title="Modifier"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deleteMember(member.id)}
                      disabled={loadingId === member.id}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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

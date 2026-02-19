"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, ToggleLeft, ToggleRight, Briefcase } from "lucide-react";

type Service = {
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  icon?: string;
  status: string;
  order_position?: number;
};

export function ServicesTable({ services }: { services: Service[] }) {
  const [list, setList] = useState<Service[]>(services);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const toggleActive = async (id: string, isPublished: boolean) => {
    setLoadingId(id);
    const newStatus = isPublished ? "draft" : "published";
    try {
      await fetch(`/api/admin/services/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setList((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );
    } finally {
      setLoadingId(null);
    }
  };

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Briefcase className="w-10 h-10 text-gray-200 mb-3" />
        <p className="text-sm text-gray-400 font-medium">Aucun service configuré</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Service</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Slug</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Description courte</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {list.map((service, index) => {
            const isPublished = service.status === "published";
            return (
              <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0088C1]/10 text-[#0088C1] text-sm font-bold shrink-0">
                      {index + 1}
                    </div>
                    <p className="font-semibold text-gray-900">{service.title}</p>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {service.slug}
                  </code>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <p className="text-gray-500 text-xs truncate max-w-xs">
                    {service.short_description ?? "—"}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleActive(service.id, isPublished)}
                    disabled={loadingId === service.id}
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
                  <div className="flex items-center justify-end">
                    <Link
                      href={`/admin/services/${service.id}/edit`}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-[#0088C1] transition-colors"
                      title="Modifier"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
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

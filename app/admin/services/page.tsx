import { requireAuth } from "@/lib/auth/auth";
import Link from "next/link";
import { Briefcase, ToggleRight, FileCode, ExternalLink } from "lucide-react";
import { SERVICES } from "@/app/services/data";

export const metadata = { title: "Services — Admin BTS" };

export default async function AdminServicesPage() {
  await requireAuth();

  const stats = [
    {
      label: "Total services",
      value: SERVICES.length,
      icon: Briefcase,
      color: "text-[#0088C1]",
      bg: "bg-[#0088C1]/10",
    },
    {
      label: "Actifs",
      value: SERVICES.length,
      icon: ToggleRight,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Source",
      value: "Code",
      icon: FileCode,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
              <span className={`flex items-center justify-center w-9 h-9 rounded-lg ${s.bg} ${s.color} shrink-0`}>
                <Icon className="w-4 h-4" />
              </span>
              <div>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bannière info */}
      <div className="flex items-start gap-3 px-5 py-4 rounded-xl border border-violet-200 bg-violet-50">
        <FileCode className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-violet-800">Services gérés dans le code</p>
          <p className="text-xs text-violet-600 mt-0.5">
            Le contenu des services (titres, descriptions, fonctionnalités) est défini dans{" "}
            <code className="bg-violet-100 px-1 rounded">app/services/data.ts</code>.
            Pour modifier un service, mettez à jour ce fichier directement.
          </p>
        </div>
      </div>

      {/* Tableau lecture seule */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">
            Services du site
            <span className="ml-2 text-gray-400 font-normal">({SERVICES.length})</span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Vue en lecture seule — tous les services sont actifs et visibles sur le site.
          </p>
        </div>

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
              {SERVICES.map((service, i) => (
                <tr key={service.slug} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0088C1]/10 text-[#0088C1] text-sm font-bold shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{service.title}</p>
                        <p className="text-xs text-gray-400">{service.subtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {service.slug}
                    </code>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <p className="text-gray-500 text-xs truncate max-w-xs">{service.shortDesc}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Actif
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/services/${service.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-[#0088C1] transition-colors"
                      title="Voir sur le site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

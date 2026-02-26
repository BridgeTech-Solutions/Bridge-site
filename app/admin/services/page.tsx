import { requireAuth } from "@/lib/auth/auth";
import { createClient } from "@/lib/supabase/server";
import { ServicesTable } from "@/components/admin/ServicesTable";
import { Briefcase, ToggleRight, ToggleLeft } from "lucide-react";

export const metadata = { title: "Services — Admin BTS" };

export default async function AdminServicesPage() {
  await requireAuth();

  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("order_position", { ascending: true });

  const active = services?.filter((s) => s.status === "published").length ?? 0;
  const total = services?.length ?? 0;

  const stats = [
    {
      label: "Total services",
      value: total,
      icon: Briefcase,
      color: "text-[#0088C1]",
      bg: "bg-[#0088C1]/10",
    },
    {
      label: "Actifs",
      value: active,
      icon: ToggleRight,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Inactifs",
      value: total - active,
      icon: ToggleLeft,
      color: "text-gray-500",
      bg: "bg-gray-100",
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

      {/* Tableau */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">
            Services du site
            <span className="ml-2 text-gray-400 font-normal">({total})</span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Activez ou désactivez les services visibles sur le site. Cliquez sur le crayon pour modifier le contenu.
          </p>
        </div>
        <ServicesTable services={services ?? []} />
      </div>
    </div>
  );
}

import { requireAuth } from "@/lib/auth/auth";
import { createClient } from "@/lib/supabase/server";
import { Bell, UserCheck, UserX, Users } from "lucide-react";
import { NewsletterTable } from "@/components/admin/NewsletterTable";

export const metadata = { title: "Newsletter — Admin BTS" };

export default async function AdminNewsletterPage() {
  await requireAuth();

  const supabase = await createClient();

  const [
    { count: total },
    { count: active },
    { count: unsubscribed },
    { data: subscribers },
  ] = await Promise.all([
    supabase.from("newsletters").select("*", { count: "exact", head: true }),
    supabase.from("newsletters").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("newsletters").select("*", { count: "exact", head: true }).eq("status", "unsubscribed"),
    supabase.from("newsletters").select("*").order("subscribed_at", { ascending: false }),
  ]);

  const stats = [
    { label: "Total abonnés", value: total ?? 0, icon: Users, color: "text-[#0088C1]", bg: "bg-[#0088C1]/10" },
    { label: "Actifs", value: active ?? 0, icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Désabonnés", value: unsubscribed ?? 0, icon: UserX, color: "text-red-500", bg: "bg-red-50" },
    { label: "Taux actifs", value: total ? `${Math.round(((active ?? 0) / total) * 100)}%` : "—", icon: Bell, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">
            Liste des abonnés
            <span className="ml-2 text-gray-400 font-normal">({subscribers?.length ?? 0})</span>
          </h3>
          <a
            href="/api/admin/newsletter/export"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 hover:border-[#0088C1] hover:text-[#0088C1] transition-colors"
          >
            Export CSV
          </a>
        </div>
        <NewsletterTable subscribers={subscribers ?? []} />
      </div>
    </div>
  );
}

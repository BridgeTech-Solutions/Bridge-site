import { requireAuth } from "@/lib/auth/auth";
import { createClient } from "@/lib/supabase/server";
import { Mail, Inbox, CheckCheck, Calendar } from "lucide-react";
import { ContactsTable } from "@/components/admin/ContactsTable";

export const metadata = { title: "Contacts — Admin BTS" };

export default async function AdminContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  await requireAuth();

  const { filter } = await searchParams;
  const supabase = await createClient();

  // Stats
  const [
    { count: total },
    { count: unread },
    { count: today },
  ] = await Promise.all([
    supabase.from("contacts").select("*", { count: "exact", head: true }),
    supabase.from("contacts").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase
      .from("contacts")
      .select("*", { count: "exact", head: true })
      .gte("created_at", new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
  ]);

  // Liste selon le filtre actif
  let query = supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (filter === "new") query = query.eq("status", "new");
  if (filter === "read") query = query.eq("status", "read");

  const { data: contacts } = await query;

  const stats = [
    { label: "Total", value: total ?? 0, icon: Mail, color: "text-[#0088C1]", bg: "bg-[#0088C1]/10", filterKey: "" },
    { label: "Non lus", value: unread ?? 0, icon: Inbox, color: "text-red-500", bg: "bg-red-50", filterKey: "new" },
    { label: "Lus", value: (total ?? 0) - (unread ?? 0), icon: CheckCheck, color: "text-emerald-600", bg: "bg-emerald-50", filterKey: "read" },
    { label: "Aujourd'hui", value: today ?? 0, icon: Calendar, color: "text-amber-600", bg: "bg-amber-50", filterKey: "today" },
  ];

  return (
    <div className="space-y-6 max-w-6xl">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.label}
              href={s.filterKey ? `/admin/contacts?filter=${s.filterKey}` : "/admin/contacts"}
              className={`flex items-center gap-3 p-4 bg-white rounded-xl border transition-all hover:shadow-sm ${
                filter === s.filterKey || (!filter && !s.filterKey)
                  ? "border-[#0088C1] shadow-sm"
                  : "border-gray-100"
              }`}
            >
              <span className={`flex items-center justify-center w-9 h-9 rounded-lg ${s.bg} ${s.color} shrink-0`}>
                <Icon className="w-4 h-4" />
              </span>
              <div>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">
            {filter === "new" ? "Messages non lus" : filter === "read" ? "Messages lus" : "Tous les messages"}
            <span className="ml-2 text-gray-400 font-normal">({contacts?.length ?? 0})</span>
          </h3>
        </div>

        <ContactsTable contacts={contacts ?? []} />
      </div>
    </div>
  );
}

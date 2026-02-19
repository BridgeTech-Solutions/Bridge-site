import { requireRole } from "@/lib/auth/auth";
import { createAdminClient } from "@/lib/supabase/server";
import { AdminUsersClient } from "@/components/admin/AdminUsersClient";
import { Users, ShieldCheck, UserX } from "lucide-react";

export const metadata = { title: "Utilisateurs — Admin BTS" };

export default async function AdminUsersPage() {
  // Seuls super_admin et admin peuvent gérer les utilisateurs
  const { user: currentUser } = await requireRole(["super_admin", "admin"]);

  const adminClient = createAdminClient();

  const [{ data: adminUsers }, { data: authData }] = await Promise.all([
    adminClient.from("admin_users").select("*").order("created_at", { ascending: true }),
    adminClient.auth.admin.listUsers(),
  ]);

  const authMap = Object.fromEntries(
    (authData?.users ?? []).map((u) => [u.id, u])
  );

  const merged = (adminUsers ?? []).map((admin) => ({
    ...admin,
    email: authMap[admin.id]?.email ?? "—",
    last_sign_in_at: authMap[admin.id]?.last_sign_in_at ?? null,
  }));

  const total = merged.length;
  const active = merged.filter((u) => u.is_active).length;

  const stats = [
    { label: "Total admins", value: total,         icon: Users,       color: "text-[#0088C1]",  bg: "bg-[#0088C1]/10" },
    { label: "Actifs",       value: active,         icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50"   },
    { label: "Inactifs",     value: total - active, icon: UserX,       color: "text-gray-500",    bg: "bg-gray-100"     },
  ];

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Description */}
      <p className="text-sm text-gray-500">
        Gérez les accès au dashboard. Invitez un collaborateur — il recevra un email pour définir son mot de passe.
      </p>

      {/* Rôles expliqués */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { role: "Super Admin", desc: "Accès total + gestion des utilisateurs", color: "border-violet-200 bg-violet-50", badge: "bg-violet-100 text-violet-700" },
          { role: "Admin",       desc: "Gestion complète du contenu",            color: "border-[#0088C1]/20 bg-[#0088C1]/5", badge: "bg-[#0088C1]/10 text-[#0088C1]" },
          { role: "Éditeur",     desc: "Modification du contenu uniquement",     color: "border-amber-200 bg-amber-50", badge: "bg-amber-100 text-amber-700" },
          { role: "Lecteur",     desc: "Lecture seule, aucune modification",     color: "border-gray-200 bg-gray-50",   badge: "bg-gray-100 text-gray-600" },
        ].map((r) => (
          <div key={r.role} className={`p-3 rounded-xl border ${r.color}`}>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.badge}`}>
              {r.role}
            </span>
            <p className="text-xs text-gray-500 mt-2">{r.desc}</p>
          </div>
        ))}
      </div>

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

      {/* Tableau + bouton invitation (client) */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">
            Administrateurs
            <span className="ml-2 text-gray-400 font-normal">({total})</span>
          </h3>
        </div>
        <AdminUsersClient users={merged} currentUserId={currentUser.id} />
      </div>
    </div>
  );
}

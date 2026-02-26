import { requireAuth } from "@/lib/auth/auth";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import { TeamTable } from "@/components/admin/TeamTable";

export const metadata = { title: "Équipe — Admin BTS" };

export default async function AdminTeamPage() {
  await requireAuth();

  const supabase = await createClient();
  const { data: members } = await supabase
    .from("team_members")
    .select("*")
    .order("order_position", { ascending: true });

  const active = members?.filter((m) => m.status === "published").length ?? 0;

  return (
    <div className="space-y-6 max-w-5xl">

      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{active} membre{active > 1 ? "s" : ""} actif{active > 1 ? "s" : ""} · {members?.length ?? 0} au total</p>
        </div>
        <Link
          href="/admin/team/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          style={{ backgroundColor: '#0088C1', color: '#ffffff' }}
        >
          <Plus className="w-4 h-4" /> Nouveau membre
        </Link>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">
            Membres de l&apos;équipe
            <span className="ml-2 text-gray-400 font-normal">({members?.length ?? 0})</span>
          </h3>
        </div>
        <TeamTable members={members ?? []} />
      </div>
    </div>
  );
}

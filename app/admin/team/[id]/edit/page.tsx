import { requireAuth } from "@/lib/auth/auth";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { TeamMemberForm } from "@/components/admin/TeamMemberForm";

export const metadata = { title: "Modifier membre — Admin BTS" };

export default async function AdminTeamEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth();
  const { id } = await params;

  const supabase = await createClient();
  const { data: member } = await supabase
    .from("team_members")
    .select("*")
    .eq("id", id)
    .single();

  if (!member) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Modifier le membre</h2>
        <p className="text-sm text-gray-500 mt-1">{member.full_name}</p>
      </div>
      <TeamMemberForm member={member} />
    </div>
  );
}

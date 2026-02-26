import { requireAuth } from "@/lib/auth/auth";
import { TeamMemberForm } from "@/components/admin/TeamMemberForm";

export const metadata = { title: "Nouveau membre — Admin BTS" };

export default async function AdminTeamNewPage() {
  await requireAuth();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Ajouter un membre</h2>
        <p className="text-sm text-gray-500 mt-1">
          Le membre sera visible sur la page Équipe du site une fois activé.
        </p>
      </div>
      <TeamMemberForm />
    </div>
  );
}

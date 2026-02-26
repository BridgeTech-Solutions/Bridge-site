import { requireAuth } from "@/lib/auth/auth";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ServiceEditForm } from "@/components/admin/ServiceEditForm";

export const metadata = { title: "Modifier service — Admin BTS" };

export default async function AdminServiceEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth();
  const { id } = await params;

  const supabase = await createClient();
  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (!service) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Modifier le service</h2>
        <p className="text-sm text-gray-500 mt-1">{service.title}</p>
      </div>
      <ServiceEditForm service={service} />
    </div>
  );
}

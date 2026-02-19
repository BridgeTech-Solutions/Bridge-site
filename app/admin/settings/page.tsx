import { requireAuth } from "@/lib/auth/auth";
import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const metadata = { title: "Paramètres — Admin BTS" };

const DEFAULTS = {
  company_name: "Bridge Technologies Solutions",
  contact_email: "contact@bridgetech-solutions.com",
  phone_1: "+237 679 289 166",
  phone_2: "+237 692 143 811",
  address: "Bonamoussadi, DLA, Douala, Cameroun",
  facebook_url: "https://www.facebook.com/people/Bridge-Technologies-Solutions/100093075549355/",
  linkedin_url: "https://www.linkedin.com/company/bridgetechnologies-solutions/",
  meta_description: "Bridge Technologies Solutions — Expert en infrastructure informatique, cloud computing et sécurité des données au Cameroun.",
};

export default async function AdminSettingsPage() {
  await requireAuth();

  const supabase = await createClient();
  const { data: rows } = await supabase.from("site_settings").select("key, value");

  // Merge DB values over defaults
  const dbValues = Object.fromEntries((rows ?? []).map((r) => [r.key, r.value]));
  const settings = { ...DEFAULTS, ...dbValues } as typeof DEFAULTS;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <p className="text-sm text-gray-500">
          Ces informations sont utilisées dans le footer, les pages de contact et les métadonnées SEO.
        </p>
      </div>
      <SettingsForm defaults={settings} />
    </div>
  );
}

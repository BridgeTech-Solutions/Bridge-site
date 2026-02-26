import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { COMPANY } from "@/lib/constants";

export interface SiteSettings {
  company_name: string;
  contact_email: string;
  phone_1: string;
  phone_2: string;
  address: string;
  facebook_url: string;
  linkedin_url: string;
  meta_description: string;
}

/** Fallback values from constants (used when DB has no override). */
const DEFAULTS: SiteSettings = {
  company_name:     COMPANY.name,
  contact_email:    COMPANY.email,
  phone_1:          COMPANY.phones[0],
  phone_2:          COMPANY.phones[1],
  address:          COMPANY.address.full,
  facebook_url:     COMPANY.social.facebook,
  linkedin_url:     COMPANY.social.linkedin,
  meta_description: "Bridge Technologies Solutions — Expert en infrastructure informatique, cloud computing et sécurité des données au Cameroun.",
};

/**
 * Server-side utility — fetch site settings from Supabase.
 * Mis en cache 1 heure (revalidé automatiquement quand l'admin sauvegarde via revalidateTag).
 * Falls back to lib/constants.ts values if the DB row is missing or on error.
 */
export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

      if (error || !data) return DEFAULTS;

      const dbValues = Object.fromEntries(
        data.map((row) => {
          let v = row.value;
          try { v = JSON.parse(v); } catch { /* keep raw string */ }
          return [row.key, v];
        })
      );

      return { ...DEFAULTS, ...dbValues } as SiteSettings;
    } catch {
      return DEFAULTS;
    }
  },
  ["site-settings"],
  { revalidate: 3600, tags: ["site-settings"] }
);

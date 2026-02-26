-- ============================================================
-- Table site_settings
-- Clé-valeur simple pour les paramètres éditables depuis l'admin
-- ============================================================

create table if not exists site_settings (
  key   text primary key,
  value text not null default ''
);

-- RLS : lecture publique, écriture admin uniquement
alter table site_settings enable row level security;

create policy "Public read" on site_settings
  for select using (true);

create policy "Admin write" on site_settings
  for all using (
    exists (
      select 1 from admin_users
      where id = auth.uid()
        and role in ('super_admin', 'admin')
        and is_active = true
    )
  );

-- Valeurs initiales (peuvent être modifiées depuis /admin/settings)
insert into site_settings (key, value) values
  ('company_name',     '"Bridge Technologies Solutions"'),
  ('contact_email',    '"contact@bridgetech-solutions.com"'),
  ('phone_1',          '"+237 679 289 166"'),
  ('phone_2',          '"+237 692 143 811"'),
  ('address',          '"Bonamoussadi, DLA, Douala, Cameroun"'),
  ('facebook_url',     '"https://www.facebook.com/people/Bridge-Technologies-Solutions/100093075549355/"'),
  ('linkedin_url',     '"https://www.linkedin.com/company/bridgetechnologies-solutions/"'),
  ('meta_description', '"Bridge Technologies Solutions — Expert en infrastructure informatique, cloud computing et sécurité des données au Cameroun."')
on conflict (key) do nothing;

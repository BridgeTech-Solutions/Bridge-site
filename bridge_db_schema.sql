-- ============================================================================
-- SCHÉMA COMPLET BASE DE DONNÉES - BRIDGE TECHNOLOGIES SOLUTIONS
-- Stack: Next.js 15 + Supabase
-- ============================================================================

-- ============================================================================
-- 1. EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- ============================================================================
-- 2. ENUMS (Types personnalisés)
-- ============================================================================

-- Statuts Newsletter
CREATE TYPE newsletter_status AS ENUM ('active', 'unsubscribed', 'bounced');

-- Statuts Messages Contact
CREATE TYPE contact_status AS ENUM ('new', 'read', 'in_progress', 'replied', 'archived');

-- Priorités Messages
CREATE TYPE contact_priority AS ENUM ('low', 'normal', 'high', 'urgent');

-- Rôles Admin
CREATE TYPE admin_role AS ENUM ('super_admin', 'admin', 'editor', 'viewer');

-- Statuts Contenu
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- Types de notifications
CREATE TYPE notification_type AS ENUM ('contact', 'newsletter', 'system', 'security');

-- ============================================================================
-- 3. TABLES PRINCIPALES
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 3.1 NEWSLETTER
-- ---------------------------------------------------------------------------
CREATE TABLE newsletters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  status newsletter_status DEFAULT 'active',
  source VARCHAR(100), -- 'homepage', 'footer', 'popup', 'services_page'
  ip_address INET,
  user_agent TEXT,
  locale VARCHAR(10) DEFAULT 'fr', -- 'fr', 'en'
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  last_email_sent_at TIMESTAMPTZ,
  email_count INTEGER DEFAULT 0, -- Nombre d'emails envoyés
  click_count INTEGER DEFAULT 0, -- Nombre de clics
  open_count INTEGER DEFAULT 0, -- Nombre d'ouvertures
  metadata JSONB, -- Données supplémentaires
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- Index pour performance
CREATE INDEX idx_newsletters_email ON newsletters(email);
CREATE INDEX idx_newsletters_status ON newsletters(status);
CREATE INDEX idx_newsletters_created_at ON newsletters(created_at DESC);

-- ---------------------------------------------------------------------------
-- 3.2 MESSAGES DE CONTACT
-- ---------------------------------------------------------------------------
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status contact_status DEFAULT 'new',
  priority contact_priority DEFAULT 'normal',
  service_interest VARCHAR(100), -- Service concerné
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  locale VARCHAR(10) DEFAULT 'fr',
  assigned_to UUID REFERENCES auth.users(id), -- Admin assigné
  reply_count INTEGER DEFAULT 0,
  read_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  tags TEXT[], -- ['urgent', 'devis', 'support']
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_priority ON contacts(priority);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_assigned_to ON contacts(assigned_to);

-- ---------------------------------------------------------------------------
-- 3.3 RÉPONSES AUX CONTACTS
-- ---------------------------------------------------------------------------
CREATE TABLE contact_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES auth.users(id),
  message TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT FALSE, -- Note interne ou réponse client
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_replies_contact_id ON contact_replies(contact_id);

-- ---------------------------------------------------------------------------
-- 3.4 ANALYTICS / STATISTIQUES
-- ---------------------------------------------------------------------------
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_url TEXT NOT NULL,
  page_title VARCHAR(255),
  referrer TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  device_type VARCHAR(50), -- 'desktop', 'mobile', 'tablet'
  browser VARCHAR(100),
  os VARCHAR(100),
  country VARCHAR(100),
  city VARCHAR(100),
  ip_address INET,
  session_id UUID,
  user_id UUID, -- Si connecté
  duration_seconds INTEGER, -- Temps passé sur la page
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour analytics rapides
CREATE INDEX idx_page_views_page_url ON page_views(page_url);
CREATE INDEX idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX idx_page_views_country ON page_views(country);
CREATE INDEX idx_page_views_session_id ON page_views(session_id);

-- ---------------------------------------------------------------------------
-- 3.5 ÉVÉNEMENTS / TRACKING
-- ---------------------------------------------------------------------------
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_name VARCHAR(100) NOT NULL, -- 'button_click', 'form_submit', 'download'
  event_category VARCHAR(100), -- 'engagement', 'conversion', 'navigation'
  page_url TEXT,
  element_id VARCHAR(255),
  element_text TEXT,
  session_id UUID,
  user_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_name ON events(event_name);
CREATE INDEX idx_events_created_at ON events(created_at DESC);

-- ---------------------------------------------------------------------------
-- 3.6 UTILISATEURS ADMIN
-- ---------------------------------------------------------------------------
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role admin_role DEFAULT 'viewer',
  full_name VARCHAR(255),
  avatar_url TEXT,
  phone VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  login_count INTEGER DEFAULT 0,
  permissions JSONB, -- Permissions personnalisées
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_admin_users_role ON admin_users(role);
CREATE INDEX idx_admin_users_active ON admin_users(is_active);

-- ---------------------------------------------------------------------------
-- 3.7 SERVICES (Gestion de contenu)
-- ---------------------------------------------------------------------------
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  short_description TEXT,
  full_description TEXT,
  icon VARCHAR(100), -- Nom de l'icône Lucide
  image_url TEXT,
  features JSONB, -- Liste des features
  status content_status DEFAULT 'published',
  order_position INTEGER DEFAULT 0,
  meta_title VARCHAR(255),
  meta_description TEXT,
  view_count INTEGER DEFAULT 0,
  locale VARCHAR(10) DEFAULT 'fr',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_services_order ON services(order_position);

-- ---------------------------------------------------------------------------
-- 3.8 PARTENAIRES / TECHNOLOGIES
-- ---------------------------------------------------------------------------
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  description TEXT,
  category VARCHAR(100), -- 'cloud', 'security', 'network', 'storage'
  order_position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_partners_category ON partners(category);
CREATE INDEX idx_partners_active ON partners(is_active);

-- ---------------------------------------------------------------------------
-- 3.9 TÉMOIGNAGES CLIENTS
-- ---------------------------------------------------------------------------
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name VARCHAR(255) NOT NULL,
  client_position VARCHAR(255),
  client_company VARCHAR(255),
  client_photo_url TEXT,
  testimonial_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  service_id UUID REFERENCES services(id),
  is_featured BOOLEAN DEFAULT FALSE,
  status content_status DEFAULT 'published',
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_testimonials_status ON testimonials(status);
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured);

-- ---------------------------------------------------------------------------
-- 3.10 BLOG / ACTUALITÉS
-- ---------------------------------------------------------------------------
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author_id UUID REFERENCES auth.users(id),
  status content_status DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0,
  read_time_minutes INTEGER,
  meta_title VARCHAR(255),
  meta_description TEXT,
  tags TEXT[],
  locale VARCHAR(10) DEFAULT 'fr',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- ---------------------------------------------------------------------------
-- 3.11 PARAMÈTRES DU SITE
-- ---------------------------------------------------------------------------
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  category VARCHAR(100), -- 'general', 'seo', 'contact', 'social'
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_site_settings_key ON site_settings(key);
CREATE INDEX idx_site_settings_category ON site_settings(category);

-- ---------------------------------------------------------------------------
-- 3.12 NOTIFICATIONS ADMIN
-- ---------------------------------------------------------------------------
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_admin_id ON notifications(admin_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- ---------------------------------------------------------------------------
-- 3.13 LOGS D'ACTIVITÉ ADMIN
-- ---------------------------------------------------------------------------
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES auth.users(id),
  action VARCHAR(100) NOT NULL, -- 'create', 'update', 'delete', 'login'
  entity_type VARCHAR(100), -- 'contact', 'service', 'newsletter'
  entity_id UUID,
  ip_address INET,
  user_agent TEXT,
  changes JSONB, -- Détails des changements
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_admin_id ON activity_logs(admin_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);

-- ---------------------------------------------------------------------------
-- 3.14 EMAILS ENVOYÉS (Historique)
-- ---------------------------------------------------------------------------
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  body TEXT,
  email_type VARCHAR(100), -- 'newsletter', 'contact_reply', 'notification'
  status VARCHAR(50), -- 'sent', 'failed', 'bounced'
  error_message TEXT,
  sent_by UUID REFERENCES auth.users(id),
  metadata JSONB,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX idx_email_logs_type ON email_logs(email_type);
CREATE INDEX idx_email_logs_sent_at ON email_logs(sent_at DESC);

-- ---------------------------------------------------------------------------
-- 3.15 ÉQUIPE / MEMBRES
-- ---------------------------------------------------------------------------
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  bio TEXT,
  photo_url TEXT,
  email VARCHAR(255),
  phone VARCHAR(50),
  linkedin_url TEXT,
  twitter_url TEXT,
  order_position INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  status content_status DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_team_members_status ON team_members(status);
CREATE INDEX idx_team_members_featured ON team_members(is_featured);
CREATE INDEX idx_team_members_order ON team_members(order_position);

-- ---------------------------------------------------------------------------
-- 3.16 PROJETS / RÉALISATIONS (Portfolio)
-- ---------------------------------------------------------------------------
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  client_name VARCHAR(255),
  short_description TEXT,
  full_description TEXT,
  featured_image_url TEXT,
  gallery_images JSONB, -- Array d'URLs d'images
  technologies TEXT[], -- ['AWS', 'Cisco', 'VMware']
  service_id UUID REFERENCES services(id),
  completion_date DATE,
  project_url TEXT,
  testimonial_id UUID REFERENCES testimonials(id),
  status content_status DEFAULT 'published',
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_service_id ON projects(service_id);

-- ---------------------------------------------------------------------------
-- 3.17 FAQ
-- ---------------------------------------------------------------------------
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100), -- 'general', 'services', 'billing', 'technical'
  service_id UUID REFERENCES services(id),
  order_position INTEGER DEFAULT 0,
  locale VARCHAR(10) DEFAULT 'fr',
  status content_status DEFAULT 'published',
  view_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_service_id ON faqs(service_id);
CREATE INDEX idx_faqs_status ON faqs(status);
CREATE INDEX idx_faqs_order ON faqs(order_position);

-- ---------------------------------------------------------------------------
-- 3.18 DEMANDES DE DEVIS
-- ---------------------------------------------------------------------------
CREATE TABLE quote_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  service_id UUID REFERENCES services(id),
  budget_range VARCHAR(100), -- 'under_10k', '10k_50k', '50k_100k', '100k_plus'
  timeline VARCHAR(100), -- 'urgent', '1_month', '3_months', '6_months_plus'
  project_description TEXT NOT NULL,
  requirements JSONB, -- Détails des besoins
  status contact_status DEFAULT 'new',
  assigned_to UUID REFERENCES auth.users(id),
  quoted_amount DECIMAL(12, 2),
  quoted_at TIMESTAMPTZ,
  ip_address INET,
  locale VARCHAR(10) DEFAULT 'fr',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quote_requests_email ON quote_requests(email);
CREATE INDEX idx_quote_requests_status ON quote_requests(status);
CREATE INDEX idx_quote_requests_service_id ON quote_requests(service_id);
CREATE INDEX idx_quote_requests_created_at ON quote_requests(created_at DESC);

-- ---------------------------------------------------------------------------
-- 3.19 TRADUCTIONS (i18n)
-- ---------------------------------------------------------------------------
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(255) NOT NULL,
  locale VARCHAR(10) NOT NULL, -- 'fr', 'en'
  value TEXT NOT NULL,
  category VARCHAR(100), -- 'common', 'services', 'navigation', 'forms'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(key, locale)
);

CREATE INDEX idx_translations_key ON translations(key);
CREATE INDEX idx_translations_locale ON translations(locale);
CREATE INDEX idx_translations_category ON translations(category);

-- ---------------------------------------------------------------------------
-- 3.20 VALEURS DE L'ENTREPRISE
-- ---------------------------------------------------------------------------
CREATE TABLE company_values (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100), -- Nom de l'icône
  image_url TEXT,
  order_position INTEGER DEFAULT 0,
  locale VARCHAR(10) DEFAULT 'fr',
  status content_status DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_company_values_status ON company_values(status);
CREATE INDEX idx_company_values_order ON company_values(order_position);

-- ---------------------------------------------------------------------------
-- 3.21 MÉTRIQUES / CHIFFRES CLÉS
-- ---------------------------------------------------------------------------
CREATE TABLE key_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_key VARCHAR(100) UNIQUE NOT NULL, -- 'years_experience', 'clients_served', 'projects_completed'
  metric_value VARCHAR(50) NOT NULL, -- '10+', '50+', '100+'
  metric_label VARCHAR(255) NOT NULL,
  metric_description TEXT,
  icon VARCHAR(100),
  order_position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_key_metrics_key ON key_metrics(metric_key);
CREATE INDEX idx_key_metrics_active ON key_metrics(is_active);
CREATE INDEX idx_key_metrics_order ON key_metrics(order_position);

-- ============================================================================
-- 4. FONCTIONS UTILITAIRES
-- ============================================================================

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer aux tables concernées
CREATE TRIGGER update_newsletters_updated_at BEFORE UPDATE ON newsletters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quote_requests_updated_at BEFORE UPDATE ON quote_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_translations_updated_at BEFORE UPDATE ON translations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_values_updated_at BEFORE UPDATE ON company_values
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_key_metrics_updated_at BEFORE UPDATE ON key_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer une notification automatiquement
CREATE OR REPLACE FUNCTION create_notification_on_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  -- Notifier tous les admins actifs
  INSERT INTO notifications (admin_id, type, title, message, link, metadata)
  SELECT 
    id,
    'contact'::notification_type,
    'Nouveau message de contact',
    'Message de ' || NEW.name || ' (' || NEW.company || ')',
    '/admin/contacts/' || NEW.id::text,
    jsonb_build_object('contact_id', NEW.id, 'email', NEW.email)
  FROM admin_users
  WHERE is_active = TRUE AND role IN ('super_admin', 'admin');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notification_new_contact
  AFTER INSERT ON contacts
  FOR EACH ROW EXECUTE FUNCTION create_notification_on_new_contact();

-- ============================================================================
-- 5. VUES UTILES POUR LE DASHBOARD
-- ============================================================================

-- Vue: Statistiques globales
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM newsletters WHERE status = 'active') as active_subscribers,
  (SELECT COUNT(*) FROM contacts WHERE status = 'new') as new_contacts,
  (SELECT COUNT(*) FROM page_views WHERE created_at > NOW() - INTERVAL '24 hours') as views_24h,
  (SELECT COUNT(*) FROM page_views WHERE created_at > NOW() - INTERVAL '7 days') as views_7d,
  (SELECT COUNT(*) FROM page_views WHERE created_at > NOW() - INTERVAL '30 days') as views_30d,
  (SELECT COUNT(DISTINCT session_id) FROM page_views WHERE created_at > NOW() - INTERVAL '24 hours') as unique_visitors_24h;

-- Vue: Top pages
CREATE OR REPLACE VIEW top_pages AS
SELECT 
  page_url,
  page_title,
  COUNT(*) as views,
  COUNT(DISTINCT session_id) as unique_visitors,
  AVG(duration_seconds) as avg_duration
FROM page_views
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY page_url, page_title
ORDER BY views DESC
LIMIT 10;

-- Vue: Contacts récents avec détails
CREATE OR REPLACE VIEW recent_contacts AS
SELECT 
  c.*,
  a.full_name as assigned_to_name,
  (SELECT COUNT(*) FROM contact_replies WHERE contact_id = c.id) as reply_count_calc
FROM contacts c
LEFT JOIN admin_users a ON c.assigned_to = a.id
ORDER BY c.created_at DESC
LIMIT 50;

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Activer RLS sur toutes les tables
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_metrics ENABLE ROW LEVEL SECURITY;

-- Policies pour NEWSLETTER (Public peut insérer, Admin peut tout faire)
CREATE POLICY "Public peut s'inscrire newsletter" ON newsletters
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admin peut tout voir newsletters" ON newsletters
  FOR SELECT TO authenticated 
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Admin peut modifier newsletters" ON newsletters
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Policies pour CONTACTS (Public peut créer, Admin peut tout)
CREATE POLICY "Public peut créer contact" ON contacts
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admin peut voir contacts" ON contacts
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Admin peut modifier contacts" ON contacts
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Policies pour SERVICES (Public peut lire published, Admin peut tout)
CREATE POLICY "Public peut voir services publiés" ON services
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admin peut tout faire services" ON services
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Policies pour BLOG (Public peut lire published, Admin peut tout)
CREATE POLICY "Public peut voir blog posts publiés" ON blog_posts
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admin peut tout faire blog" ON blog_posts
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Policies pour NOTIFICATIONS (Utilisateur voit seulement ses notifications)
CREATE POLICY "User voit ses notifications" ON notifications
  FOR SELECT TO authenticated
  USING (admin_id = auth.uid());

CREATE POLICY "User peut modifier ses notifications" ON notifications
  FOR UPDATE TO authenticated
  USING (admin_id = auth.uid());

-- Policies pour TEAM MEMBERS (Public peut lire published, Admin peut tout)
CREATE POLICY "Public peut voir membres équipe publiés" ON team_members
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admin peut tout faire team members" ON team_members
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Policies pour PROJECTS (Public peut lire published, Admin peut tout)
CREATE POLICY "Public peut voir projets publiés" ON projects
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admin peut tout faire projects" ON projects
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Policies pour FAQs (Public peut lire published, Admin peut tout)
CREATE POLICY "Public peut voir FAQs publiées" ON faqs
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admin peut tout faire FAQs" ON faqs
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Policies pour QUOTE REQUESTS (Public peut créer, Admin peut tout)
CREATE POLICY "Public peut créer demande devis" ON quote_requests
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admin peut voir demandes devis" ON quote_requests
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Admin peut modifier demandes devis" ON quote_requests
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Policies pour TRANSLATIONS (Public peut lire, Admin peut tout)
CREATE POLICY "Public peut lire traductions" ON translations
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admin peut tout faire translations" ON translations
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Policies pour COMPANY VALUES (Public peut lire published, Admin peut tout)
CREATE POLICY "Public peut voir valeurs publiées" ON company_values
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admin peut tout faire company values" ON company_values
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Policies pour KEY METRICS (Public peut lire active, Admin peut tout)
CREATE POLICY "Public peut voir métriques actives" ON key_metrics
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admin peut tout faire key metrics" ON key_metrics
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================================================
-- 7. DONNÉES INITIALES (SEED)
-- ============================================================================

-- Insérer paramètres du site par défaut
INSERT INTO site_settings (key, value, description, category) VALUES
  ('site_name', '"Bridge Technologies Solutions"', 'Nom du site', 'general'),
  ('site_tagline', '"We drive your digital transformation"', 'Baseline du site', 'general'),
  ('contact_email', '"contact@bridgetech-solutions.com"', 'Email de contact', 'contact'),
  ('contact_phone', '"+237 679 289 166"', 'Téléphone principal', 'contact'),
  ('contact_phone_2', '"+237 692 143 811"', 'Téléphone secondaire', 'contact'),
  ('address', '"Bonamoussadi, DLA, Douala, Cameroun"', 'Adresse physique', 'contact'),
  ('maintenance_mode', 'false', 'Mode maintenance', 'general'),
  ('analytics_enabled', 'true', 'Analytics activé', 'general');

-- ============================================================================
-- FIN DU SCHÉMA
-- ============================================================================
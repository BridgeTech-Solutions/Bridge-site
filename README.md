# Bridge Technologies Solutions - Site Web

Site web pour Bridge Technologies Solutions (BTS), entreprise de solutions technologiques basee a Douala, Cameroun.

## Stack Technique

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Styles** : Tailwind CSS
- **Base de donnees** : Supabase (PostgreSQL)
- **Authentification** : Supabase Auth
- **Icones** : Lucide React
- **Animations** : Framer Motion

## Installation

```bash
# 1. Cloner le projet
git clone <url-du-repo>
cd projet-stagiaires

# 2. Installer les dependances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Remplir avec vos vraies valeurs Supabase

# 4. Lancer le serveur de developpement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Structure du Projet

```
projet-stagiaires/
  app/                          # Pages de l'application
    page.tsx                    # Homepage
    layout.tsx                  # Layout principal
    contact/page.tsx            # Page contact
    entreprise/page.tsx         # Page a propos
    equipe/page.tsx             # Page equipe
    services/page.tsx           # Liste des services
    blog/page.tsx               # Liste articles blog
    faq/page.tsx                # FAQ
    projets/page.tsx            # Portfolio projets
    login/page.tsx              # Connexion admin
    admin/                      # Dashboard admin (protege)
      layout.tsx                # Layout admin (sidebar + logout)
      page.tsx                  # Dashboard stats
      contacts/page.tsx         # Gestion contacts
      newsletter/page.tsx       # Gestion newsletter
      blog/page.tsx             # Gestion blog
      projects/page.tsx         # Gestion projets
      team/page.tsx             # Gestion equipe
      services/page.tsx         # Gestion services
      settings/page.tsx         # Parametres
    api/                        # API Routes
      contact/route.ts          # POST - formulaire contact
      newsletter/route.ts       # POST - inscription newsletter
      quote/route.ts            # POST - demande de devis
  components/                   # Composants reutilisables
    ui/                         # Composants UI de base (Button, Input, etc.)
    layout/                     # Header, Footer, PageHeader
    home/                       # Composants homepage
    admin/                      # Composants dashboard admin
  lib/                          # Utilitaires
    supabase/client.ts          # Client Supabase (cote navigateur)
    supabase/server.ts          # Client Supabase (cote serveur)
    auth/auth.ts                # Auth serveur (requireAuth, getSession)
    auth/auth-client.ts         # Auth client (signIn, signOut)
    utils.ts                    # Fonctions utilitaires
    constants.ts                # Constantes du site
  middleware.ts                 # Protection routes /admin
  bridge_db_schema.sql          # Schema complet base de donnees
  REPARTITION_STAGIAIRES.md     # Repartition des taches par stagiaire
  public/                       # Fichiers statiques
    logo.png                    # Logo Bridge Technologies Solutions
```

## Configuration Supabase

### 1. Creer un projet Supabase
- Aller sur [supabase.com](https://supabase.com)
- Creer un nouveau projet
- Noter l'URL et les cles API

### 2. Executer le schema SQL
- Aller dans SQL Editor de Supabase
- Copier le contenu de `bridge_db_schema.sql`
- Executer le script

### 3. Variables d'environnement
Creer `.env.local` avec :
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

### 4. Creer le premier admin
Dans SQL Editor de Supabase :
```sql
-- Apres avoir cree un utilisateur via Supabase Auth Dashboard
INSERT INTO admin_users (id, role, full_name, is_active)
VALUES ('uuid-de-lutilisateur', 'super_admin', 'Admin', true);
```

## Informations BTS

- **Email** : contact@bridgetech-solutions.com
- **Telephones** : +237 679 289 166 / +237 692 143 811
- **Adresse** : Bonamoussadi, DLA, Douala, Cameroun
- **Couleur primaire** : #0088C1
- **Police** : Montserrat

## Services (6)

| Service | Slug |
|---------|------|
| Gestion de projets | gestion-projets |
| Infrastructure informatique | infrastructure |
| Cloud Computing | cloud |
| Protection des donnees | protection-donnees |
| DSI Externe | dsi-externe |
| Conseil & Consulting | conseil-consulting |

## Tables Supabase

| Table | Description |
|-------|-------------|
| contacts | Messages du formulaire contact |
| newsletters | Abonnes newsletter |
| quote_requests | Demandes de devis |
| blog_posts | Articles de blog |
| projects | Projets du portfolio |
| team_members | Membres de l'equipe |
| services | Services de l'entreprise |
| testimonials | Temoignages clients |
| partners | Logos partenaires |
| site_settings | Parametres du site |
| admin_users | Utilisateurs admin |
| faqs | Questions frequentes |

## Commandes

```bash
npm run dev       # Lancer en developpement
npm run build     # Compiler pour production
npm run start     # Lancer en production
npm run lint      # Verifier le code
```

## Git - Regles

```bash
# Chaque stagiaire travaille sur sa branche
git checkout -b feature/nom-de-la-feature

# Commit souvent
git add .
git commit -m "feat: description claire"

# Pousser sa branche
git push origin feature/nom-de-la-feature

# Creer une Pull Request sur GitHub
# Ne JAMAIS push sur main directement
```

# Repartition des Taches - 3 Stagiaires

## Projet : Site Web Bridge Technologies Solutions
**Stack** : Next.js 15, TypeScript, Tailwind CSS, Supabase, Lucide Icons, Framer Motion

---

## IMPORTANT : ORDRE DE TRAVAIL

```
PHASE 1 → Composants communs (Header, Footer) + Layout
PHASE 2 → Pages publiques du site
PHASE 3 → API Routes (backend)
PHASE 4 → Dashboard Admin (A LA FIN)
```

Les stagiaires travaillent sur les PHASES 1, 2 et 3 en premier.
La Phase 4 (Admin) sera faite ensemble a la fin quand tout le site public sera termine.

### Pages du site (pour cette phase)

| Page | URL | Statut |
|------|-----|--------|
| Homepage | `/` | A FAIRE |
| Entreprise | `/entreprise` | A FAIRE |
| Services (liste) | `/services` | A FAIRE |
| Service (detail) | `/services/[slug]` | A FAIRE |
| Contact | `/contact` | A FAIRE |
| FAQ | `/faq` | A FAIRE |
| Login admin | `/login` | A FAIRE |
| **ASSENT** | `/assent` | **DEJA FAIT** (ne pas toucher) |

> Les pages Equipe, Projets et Blog seront ajoutees dans une phase ulterieure.

---

## AVANT DE COMMENCER

### 1. Installation

```bash
git clone <url-du-repo>
cd projet-stagiaires
npm install
cp .env.example .env.local
# Remplir .env.local avec les valeurs Supabase
npm run dev
```

### 2. Branches Git

Chaque stagiaire a sa propre branche :

```bash
# Stagiaire 1
git checkout -b stagiaire-1/pages-publiques

# Stagiaire 2
git checkout -b stagiaire-2/pages-publiques

# Stagiaire 3
git checkout -b stagiaire-3/pages-publiques
```

### 3. Regles

- **JAMAIS** push directement sur `main`
- Faire `git pull origin main` avant de commencer chaque jour
- `npm run build` DOIT passer avant chaque commit
- Messages de commit clairs : `feat: ajout page contact`
- **Ne modifie pas les fichiers d'un autre stagiaire**

---

## PHASE 1 : COMPOSANTS COMMUNS (Faire en equipe le 1er jour)

Ces composants sont utilises par TOUTES les pages. A faire ensemble pour eviter les conflits.

### Tache commune 1 : Header / Navbar

```
Fichier a creer : components/layout/Header.tsx

Ce qu'il faut :
- Barre de navigation fixe en haut (position fixed, z-50)
- Logo BTS a gauche (/logo.png)
- Liens de navigation : Accueil, Services (dropdown), L'entreprise, Contact, Assent (badge "New")
- Menu hamburger sur mobile
- Fond blanc avec ombre legere

Utiliser les donnees de : lib/constants.ts → NAV_ITEMS

Exemple de structure :
<header className="fixed top-0 w-full bg-white shadow-sm z-50">
  <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
    <Image src="/logo.png" alt="BTS" width={150} height={50} />
    <nav>...</nav>
  </div>
</header>

ATTENTION : Le dropdown "Services" doit lister les 6 services
avec un lien vers /services/<slug> pour chacun.
Le lien "Assent" doit avoir un petit badge "New" a cote.
```

### Tache commune 2 : Footer

```
Fichier a creer : components/layout/Footer.tsx

Ce qu'il faut :
- Fond sombre (#1a1a2e ou similaire)
- 3-4 colonnes :
  Col 1 : Logo + description courte
  Col 2 : Liens utiles (Accueil, Services, Entreprise, Contact)
  Col 3 : Contact (email, telephones, adresse)
  Col 4 : Formulaire newsletter (email + bouton)
- Reseaux sociaux (Facebook, LinkedIn)
- Copyright en bas

Utiliser : COMPANY et SERVICES de lib/constants.ts

Le formulaire newsletter doit envoyer un POST vers /api/newsletter
```

### Tache commune 3 : Layout principal

```
Fichier a modifier : app/layout.tsx

Ce qu'il faut :
- Importer et inclure le Header et Footer
- Changer lang="en" en lang="fr"
- Mettre les bonnes metadata (titre, description)
- Ajouter la font Montserrat (Google Fonts)

Structure :
<html lang="fr">
  <body>
    <Header />
    {children}
    <Footer />
  </body>
</html>
```

---

## PHASE 2 : PAGES PUBLIQUES

---

### STAGIAIRE 1 : Homepage + Entreprise

**Branche** : `stagiaire-1/pages-publiques`

| # | Tache | Fichier | Difficulte |
|---|-------|---------|------------|
| 1 | Homepage | `app/page.tsx` | Elevee |
| 2 | Page entreprise | `app/entreprise/page.tsx` | Moyenne |

#### Tache 1 : Homepage (/)

```
Fichier : app/page.tsx

Sections a creer :
1. HERO : Grande banniere avec titre, sous-titre, bouton CTA
   - Texte : "Bridge Technologies Solutions"
   - Sous-titre : "We drive your digital transformation"
   - Bouton : "Decouvrir nos services" → /services
   - Image de fond : /images/btshomeimage.jpg (ou gradient bleu)

2. SERVICES : Grille de 6 cartes de services
   - Utiliser SERVICES de lib/constants.ts
   - Chaque carte : image (SERVICES[].image) + icone + titre + description courte
   - Images deja dans public/images/ (tasklist.png, infrastructure.png, cloud.png, etc.)
   - Lien vers /services/<slug>

3. CHIFFRES CLES : Section avec les metriques
   - Utiliser METRICS de lib/constants.ts
   - 4 compteurs : 10+ annees, 50+ clients, 100+ projets, 15+ experts
   - Animation de comptage (optionnel, avec Framer Motion)

4. VALEURS : Section avec les 3 valeurs
   - Utiliser VALUES de lib/constants.ts
   - Qualite (quality.png), Collaboration (friendship.png), Accomplissement (certificate.png)
   - Images deja dans public/images/

5. CALL TO ACTION : Section finale
   - "Besoin d'un accompagnement ?" + bouton Contact

Design : Alterner fond blanc et fond gris clair entre les sections
Animations : Utiliser Framer Motion pour les fade-in au scroll
```

#### Tache 2 : Page Entreprise (/entreprise)

```
Fichier : app/entreprise/page.tsx

Sections :
1. Banniere avec titre "L'entreprise"
2. Presentation de BTS (qui nous sommes, notre mission)
3. Nos valeurs (reutiliser VALUES de constants.ts)
4. Nos partenaires technologiques (PARTNERS de constants.ts)
   - Logos dans public/images/partners/ (aws.png, azure.png, cisco.png, etc.)
   - 25 logos disponibles

Texte a utiliser (depuis l'ancien site PHP) :
"Bridge Technologies Solutions est un fournisseur de solutions
technologiques pour les entreprises. Nous vous accompagnons dans
votre transformation digitale avec expertise et engagement."
```

---

### STAGIAIRE 2 : Services + FAQ + API Newsletter

**Branche** : `stagiaire-2/pages-publiques`

| # | Tache | Fichier | Difficulte |
|---|-------|---------|------------|
| 1 | Page liste services | `app/services/page.tsx` | Moyenne |
| 2 | Page detail service | `app/services/[slug]/page.tsx` | Moyenne |
| 3 | Page FAQ | `app/faq/page.tsx` | Facile |
| 4 | API Newsletter | `app/api/newsletter/route.ts` | Facile |

#### Tache 1 : Page Services (/services)

```
Fichier : app/services/page.tsx

Sections :
1. Banniere "Nos Services"
2. Grille de 6 cartes de services
   - Utiliser SERVICES de lib/constants.ts
   - Chaque carte : image (SERVICES[].image deja defini) + icone + titre + description
   - Images deja dans public/images/ (tasklist.png, infrastructure.png, cloud.png, etc.)
   - Bouton "En savoir plus" → /services/<slug>
   - Effet hover (scale ou shadow)

Design : grille responsive
- Mobile : 1 colonne
- Tablette : 2 colonnes
- Desktop : 3 colonnes

Icones Lucide a utiliser pour chaque service :
- folder-kanban (gestion projets)
- server (infrastructure)
- cloud (cloud)
- shield-check (protection)
- users (DSI externe)
- lightbulb (conseils)
```

#### Tache 2 : Page Detail Service (/services/[slug])

```
Fichier a creer : app/services/[slug]/page.tsx (creer le dossier [slug])

C'est une page DYNAMIQUE. Le slug vient de l'URL.

import { SERVICES } from "@/lib/constants";
import { notFound } from "next/navigation";

export default function ServiceDetail({ params }: { params: { slug: string } }) {
  const service = SERVICES.find(s => s.slug === params.slug);
  if (!service) notFound();

  return (
    <main className="pt-20">
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      {/* Ajouter plus de contenu, images, CTA */}
    </main>
  );
}

Chaque page de service doit avoir :
- Titre du service
- Description complete
- Image illustrative (utiliser SERVICES[].image, deja dans public/images/)
- Liste des avantages / ce qu'on offre
- Bouton "Demander un devis" → /contact
- Bouton "Retour aux services" → /services

OPTIONNEL : Charger des donnees supplementaires depuis Supabase (table: services)

Generer les pages statiques :
export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}
```

#### Tache 3 : Page FAQ (/faq)

```
Fichier : app/faq/page.tsx

2 options :

OPTION A - Donnees statiques (plus simple) :
- Creer un tableau de FAQ en dur dans le fichier
- Utiliser le composant Accordion de components/ui/accordion.tsx

OPTION B - Donnees Supabase (dynamique) :
const supabase = await createClient();
const { data: faqs } = await supabase
  .from("faqs")
  .select("*")
  .eq("is_active", true)
  .order("display_order", { ascending: true });

Affichage :
- Titre "Questions Frequentes"
- Barre de recherche pour filtrer (optionnel)
- Accordeon : cliquer sur la question → la reponse s'affiche

Utiliser : Accordion, AccordionItem, AccordionTrigger, AccordionContent
de components/ui/accordion.tsx
```

#### Tache 4 : API Newsletter

```
Fichier : app/api/newsletter/route.ts

1. Recevoir { email } dans le body
2. Valider que l'email est present et valide
3. Verifier si l'email existe deja :
   const { data: existing } = await supabase
     .from("newsletters")
     .select("id, status")
     .eq("email", email)
     .single();

4. Si existe et actif → retourner "Deja inscrit"
5. Si existe et desabonne → reactiver (update status = "active")
6. Si n'existe pas → inserer nouveau

const { error } = await supabase.from("newsletters").insert({
  email,
  source: "footer",
  status: "active"
});

7. Retourner { success: true, message: "Inscription reussie !" }
```

---

### STAGIAIRE 3 : Contact + Login + APIs

**Branche** : `stagiaire-3/pages-publiques`

| # | Tache | Fichier | Difficulte |
|---|-------|---------|------------|
| 1 | Page contact | `app/contact/page.tsx` | Moyenne |
| 2 | API Contact | `app/api/contact/route.ts` | Facile |
| 3 | Page login | `app/login/page.tsx` | Moyenne |
| 4 | API Devis | `app/api/quote/route.ts` | Facile |

#### Tache 1 : Page Contact (/contact)

```
Fichier : app/contact/page.tsx
Type : "use client" (Client Component car formulaire interactif)

Layout : 2 colonnes
- Gauche : Formulaire
- Droite : Informations de contact

Formulaire :
- Nom complet (input, obligatoire)
- Email (input email, obligatoire)
- Telephone (input tel, optionnel)
- Sujet (input, obligatoire)
- Message (textarea, obligatoire)
- Bouton "Envoyer le message"

Infos contact (droite) :
- Email : contact@bridgetech-solutions.com
- Telephones : +237 679 289 166 / +237 692 143 811
- Adresse : Bonamoussadi, DLA, Douala, Cameroun
- Icones Lucide : Mail, Phone, MapPin

Utiliser : COMPANY de lib/constants.ts pour les infos

Envoi du formulaire :
const res = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, phone, subject, message }),
});

Apres envoi : afficher message succes ou erreur
Utiliser les composants : Input, Textarea, Button, Label de components/ui/
```

#### Tache 2 : API Contact

```
Fichier : app/api/contact/route.ts

1. Recevoir le body JSON (name, email, phone, subject, message)
2. Valider : name, email et message obligatoires
3. Inserer dans Supabase :

import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
const { error } = await supabase.from("contacts").insert({
  name, email, phone, subject, message
});

4. Retourner { success: true } ou { error: "message" }
```

#### Tache 3 : Page Login (/login)

```
Fichier : app/login/page.tsx
Type : "use client" (Client Component)

IMPORTANT : LE LOGO DE BTS DOIT ETRE VISIBLE SUR CETTE PAGE !

Design : page centree, fond clair ou gradient leger

Structure :
<div className="min-h-screen flex items-center justify-center">
  <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
    <Image src="/logo.png" alt="BTS" width={200} height={60} className="mx-auto mb-8" />
    <h1>Connexion Admin</h1>
    <form>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Mot de passe" />
      <Button>Se connecter</Button>
    </form>
  </div>
</div>

Logique de connexion :
import { signInWithEmail } from "@/lib/auth/auth-client";

const { success, error } = await signInWithEmail(email, password);
if (success) {
  router.push("/admin");
  router.refresh();
} else {
  setError("Email ou mot de passe incorrect");
}

Gerer le parametre ?error=unauthorized (afficher "Acces refuse")
```

#### Tache 4 : API Devis

```
Fichier : app/api/quote/route.ts

1. Recevoir le body :
   { company_name, contact_name, email, phone, service_type, description, budget_range?, deadline? }
2. Valider les champs obligatoires
3. Inserer dans Supabase :
   await supabase.from("quote_requests").insert({ ... });
4. Retourner { success: true }
```

---

## PHASE 3 : INTEGRATION ET TESTS (Equipe complete)

Quand toutes les pages sont faites :

| # | Tache | Responsable |
|---|-------|-------------|
| 1 | Merger toutes les branches dans main | Ensemble |
| 2 | Resoudre les conflits Git | Ensemble |
| 3 | Tester toutes les pages sur mobile | Stagiaire 1 |
| 4 | Tester tous les formulaires | Stagiaire 2 |
| 5 | Tester la navigation complete | Stagiaire 3 |
| 6 | Corriger les bugs trouves | Ensemble |
| 7 | `npm run build` passe sans erreur | Ensemble |

---

## PHASE 4 : DASHBOARD ADMIN (A LA FIN)

> Cette phase sera faite APRES que tout le site public fonctionne.

Taches admin a repartir plus tard :
- Dashboard principal (stats)
- Gestion contacts (liste + lecture)
- Gestion newsletter (liste + desabonnement)
- Gestion services (CRUD complet)
- Parametres du site
- Layout admin (sidebar + navigation)

---

## PAGES REPORTEES (Phase ulterieure)

Les pages suivantes ne sont PAS a faire pour l'instant :
- ~~Page Equipe (/equipe)~~
- ~~Page Projets (/projets)~~
- ~~Page Blog (/blog)~~

Elles seront ajoutees plus tard quand le site de base sera fonctionnel.

---

## PLANNING SUGGERE

### Semaine 1

| Jour | Stagiaire 1 | Stagiaire 2 | Stagiaire 3 |
|------|-------------|-------------|-------------|
| Lun | ENSEMBLE : Header + Footer + Layout | ENSEMBLE | ENSEMBLE |
| Mar | Homepage (Hero + Services) | Page Services liste | Page Contact |
| Mer | Homepage (Chiffres + Valeurs + CTA) | Page Service detail (6 pages) | API Contact + API Devis |
| Jeu | Page Entreprise | Page FAQ + API Newsletter | Page Login |
| Ven | Finitions + responsive | Finitions + responsive | Finitions + responsive |

### Semaine 2

| Jour | Stagiaire 1 | Stagiaire 2 | Stagiaire 3 |
|------|-------------|-------------|-------------|
| Lun | Tests mobile | Tests formulaires | Tests navigation |
| Mar | ENSEMBLE : Merge + Resolution conflits | ENSEMBLE | ENSEMBLE |
| Mer | ENSEMBLE : Corrections bugs | ENSEMBLE | ENSEMBLE |
| Jeu | ENSEMBLE : Phase 4 Admin (debut) | ENSEMBLE | ENSEMBLE |
| Ven | ENSEMBLE : Phase 4 Admin (suite) | ENSEMBLE | ENSEMBLE |

---

## CHECKLIST PAR STAGIAIRE

### Stagiaire 1 - Avant Pull Request
- [ ] Homepage : Hero, Services, Chiffres, Valeurs, CTA
- [ ] Page Entreprise complete
- [ ] `npm run build` passe sans erreur
- [ ] Responsive (mobile + desktop)

### Stagiaire 2 - Avant Pull Request
- [ ] Page Services (liste des 6 services)
- [ ] Pages detail service (6 pages dynamiques)
- [ ] Page FAQ avec accordeon
- [ ] API /api/newsletter fonctionnelle
- [ ] `npm run build` passe sans erreur
- [ ] Responsive (mobile + desktop)

### Stagiaire 3 - Avant Pull Request
- [ ] Page Contact avec formulaire fonctionnel
- [ ] API /api/contact fonctionnelle
- [ ] Page Login avec logo BTS + formulaire fonctionnel
- [ ] API /api/quote fonctionnelle
- [ ] `npm run build` passe sans erreur
- [ ] Responsive (mobile + desktop)

---

## RAPPELS IMPORTANTS

1. **Lire GUIDE_ARCHITECTURE.md** avant de commencer - il explique tout
2. **Server Component vs Client Component** - c'est LE piege principal (voir le guide)
3. **Utiliser les constantes** de `lib/constants.ts` (ne pas copier-coller les donnees)
4. **Composants UI** deja prets dans `components/ui/` (Button, Input, Card, etc.)
5. **Page ASSENT** deja faite → ne pas y toucher
6. **Pages reportees** : Equipe, Projets, Blog → ne pas les faire pour l'instant
7. **pt-20** sur chaque page (padding-top 80px pour le header fixe)
8. **Couleur principale** : `#0088C1` ou `bg-[#0088C1]` en Tailwind

---

*Document cree le 17 fevrier 2026 - Bridge Technologies Solutions*

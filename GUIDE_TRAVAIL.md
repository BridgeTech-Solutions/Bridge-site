# Guide de Travail - Regles et Bonnes Pratiques

## Pour les stagiaires de Bridge Technologies Solutions

Ce guide explique comment travailler proprement en equipe sur le projet.
Lisez-le ENTIEREMENT avant d'ecrire la moindre ligne de code.

---

## 1. Mise en Place de l'Environnement

### 1.1 Logiciels a installer

| Logiciel | A quoi ca sert | Lien |
|----------|----------------|------|
| **Node.js** (v18+) | Executer JavaScript/TypeScript | https://nodejs.org |
| **VS Code** | Editeur de code | https://code.visualstudio.com |
| **Git** | Gestion de versions | https://git-scm.com |
| **Navigateur** (Chrome/Edge) | Tester le site + DevTools | Deja installe |

### 1.2 Extensions VS Code recommandees

Installer ces extensions dans VS Code (Ctrl+Shift+X) :

| Extension | Pourquoi |
|-----------|----------|
| **ES7+ React/Redux/React-Native snippets** | Raccourcis pour creer des composants |
| **Tailwind CSS IntelliSense** | Autocompletion des classes Tailwind |
| **Prettier - Code formatter** | Formatage automatique du code |
| **ESLint** | Detection des erreurs en temps reel |
| **Auto Rename Tag** | Renomme automatiquement les balises HTML |
| **GitLens** | Voir qui a modifie quoi dans le code |

### 1.3 Configuration VS Code

Creer un fichier `.vscode/settings.json` a la racine (si pas deja present) :

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "tailwindCSS.experimental.classRegex": [
    ["className\\s*=\\s*['\"]([^'\"]*)['\"]"]
  ]
}
```

### 1.4 Premier lancement

```bash
# 1. Cloner le projet
git clone <url-du-repo>
cd projet-stagiaires

# 2. Installer les dependances
npm install

# 3. Copier les variables d'environnement
cp .env.example .env.local

# 4. Editer .env.local avec les vraies valeurs
# (demander au responsable les cles Supabase)

# 5. Lancer le serveur
npm run dev

# 6. Ouvrir dans le navigateur
# http://localhost:3000
```

**Si ca ne marche pas :**
- Verifier que Node.js est bien installe : `node -v` (doit afficher v18+)
- Verifier que npm est installe : `npm -v`
- Supprimer node_modules et reinstaller : `rm -rf node_modules && npm install`

---

## 2. Git - Travailler en Equipe

### 2.1 Pourquoi Git ?

Git permet a 3 personnes de travailler sur le meme projet sans ecraser le travail des autres.
Chaque stagiaire travaille sur sa propre **branche** (copie du projet), puis fusionne son travail dans la branche principale quand c'est pret.

### 2.2 Creer sa branche (1ere fois seulement)

```bash
# S'assurer d'etre sur main et a jour
git checkout main
git pull origin main

# Creer sa branche
git checkout -b stagiaire-1/pages-publiques   # Stagiaire 1
git checkout -b stagiaire-2/pages-publiques   # Stagiaire 2
git checkout -b stagiaire-3/pages-publiques   # Stagiaire 3
```

### 2.3 Routine quotidienne

Chaque matin, AVANT de commencer a coder :

```bash
# 1. Sauvegarder son travail en cours
git add .
git stash

# 2. Recuperer les derniers changements de main
git checkout main
git pull origin main

# 3. Revenir sur sa branche
git checkout stagiaire-1/pages-publiques

# 4. Mettre a jour sa branche avec main
git merge main

# 5. Recuperer son travail sauvegarde
git stash pop
```

### 2.4 Faire un commit (sauvegarder son travail)

Un commit = une sauvegarde avec un message qui explique ce qu'on a fait.

**QUAND faire un commit :**
- Apres avoir termine une tache ou une partie de tache
- Quand le code fonctionne (pas de bugs evidents)
- Avant de quitter pour la journee
- Avant de passer a une autre tache

**COMMENT faire un commit :**

```bash
# 1. Voir ce qui a change
git status

# 2. Ajouter les fichiers modifies (UN PAR UN, pas "git add .")
git add app/page.tsx
git add components/home/Hero.tsx

# 3. Creer le commit avec un message clair
git commit -m "feat: ajout section Hero sur la homepage"
```

### 2.5 Format des messages de commit

```
<type>: <description courte>

Types :
  feat:     nouvelle fonctionnalite
  fix:      correction de bug
  style:    changement visuel (CSS, design)
  refactor: reorganisation du code (sans changer le comportement)
```

**Bons exemples :**
```
feat: ajout page contact avec formulaire
feat: ajout section services sur la homepage
fix: correction du menu mobile qui ne se ferme pas
style: ajustement des marges sur la page entreprise
```

**Mauvais exemples :**
```
update                    ← trop vague
fix bug                   ← quel bug ?
wip                       ← pas informatif
changes                   ← inutile
azertyuiop               ← n'importe quoi
```

### 2.6 Pousser son travail (push)

```bash
# Envoyer ses commits sur le serveur
git push origin stagiaire-1/pages-publiques
```

Faire un push au minimum **1 fois par jour** (en fin de journee).

### 2.7 Creer une Pull Request (PR)

Quand ta tache est TERMINEE et TESTEE :

1. Pousser tous tes commits : `git push origin ta-branche`
2. Aller sur GitHub
3. Cliquer "Compare & pull request"
4. Titre : decrire ce qui a ete fait
5. Description : lister les pages/fonctionnalites ajoutees
6. Assigner le responsable comme reviewer

**AVANT de creer la PR :**
```bash
# Verifier que ca compile
npm run build

# Verifier qu'il n'y a pas d'erreur
npm run lint
```

### 2.8 Ce qu'il ne faut JAMAIS faire

```
INTERDIT :
❌ git push origin main           → NE JAMAIS push sur main directement
❌ git push --force                → NE JAMAIS forcer un push
❌ git add .                       → NE PAS tout ajouter sans verifier
❌ Modifier un fichier d'un autre stagiaire sans prevenir
❌ Supprimer du code sans comprendre a quoi il sert
```

---

## 3. Organisation du Code

### 3.1 Ou creer ses fichiers

```
Ta page → app/<nom-page>/page.tsx
Tes composants → components/<categorie>/<NomComposant>.tsx
```

**Exemples :**
```
Page contact      → app/contact/page.tsx
Composant Hero    → components/home/Hero.tsx
Composant Footer  → components/layout/Footer.tsx
Carte service     → components/services/ServiceCard.tsx
```

### 3.2 Nommage des fichiers

| Type | Convention | Exemple |
|------|-----------|---------|
| Pages | `page.tsx` (impose par Next.js) | `app/contact/page.tsx` |
| Composants | PascalCase | `ServiceCard.tsx`, `Hero.tsx` |
| Utilitaires | camelCase | `utils.ts`, `constants.ts` |
| Styles | kebab-case | `globals.css` |

### 3.3 Structure d'un composant

```tsx
// 1. "use client" SI le composant utilise useState, onClick, etc.
"use client";

// 2. Imports (groupes par type)
// Imports React/Next
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Imports de librairies
import { Mail, Phone } from "lucide-react";

// Imports du projet
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

// 3. Le composant
export default function MonComposant() {
  // 3a. State et logique
  const [email, setEmail] = useState("");

  // 3b. Fonctions
  const handleSubmit = () => {
    // ...
  };

  // 3c. Rendu JSX
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Contenu */}
      </div>
    </section>
  );
}
```

### 3.4 Decouper en composants

**Regle : si une section de page fait plus de 80 lignes, la decouper en composant separe.**

Exemple pour la Homepage :

```
MAUVAIS (tout dans un seul fichier de 500 lignes) :
app/page.tsx → Hero + Services + Chiffres + Valeurs + CTA

BON (decoupe en composants) :
app/page.tsx                      → importe et assemble les composants
components/home/Hero.tsx          → Section Hero
components/home/ServicesGrid.tsx  → Grille des 6 services
components/home/Stats.tsx         → Chiffres cles
components/home/Values.tsx        → 3 valeurs
components/home/CallToAction.tsx  → Section CTA
```

La page assemble le tout :
```tsx
// app/page.tsx
import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import Stats from "@/components/home/Stats";
import Values from "@/components/home/Values";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <Stats />
      <Values />
      <CallToAction />
    </main>
  );
}
```

---

## 4. Ecrire du Code Propre

### 4.1 Indentation

- Toujours **2 espaces** (pas de tabulations)
- Configurer VS Code (voir section 1.3)

### 4.2 Noms de variables

```tsx
// BON - noms descriptifs
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [contactName, setContactName] = useState("");
const [isLoading, setIsLoading] = useState(false);

// MAUVAIS - noms vagues
const [x, setX] = useState(false);
const [data, setData] = useState("");
const [a, setA] = useState(false);
```

### 4.3 Commentaires

```tsx
// BON - explique le POURQUOI
// Rediriger vers /admin si deja connecte
if (session) router.push("/admin");

// MAUVAIS - explique le QUOI (inutile, le code est deja clair)
// On met isLoading a true
setIsLoading(true);
```

Ne pas commenter chaque ligne. Commenter seulement quand la logique n'est pas evidente.

### 4.4 Gestion des erreurs

Toujours gerer les cas d'erreur :

```tsx
// BON
const { data, error } = await supabase.from("contacts").select("*");
if (error) {
  console.error("Erreur chargement contacts:", error);
  return <p>Une erreur est survenue</p>;
}
if (!data || data.length === 0) {
  return <p>Aucun contact pour le moment</p>;
}

// MAUVAIS
const { data } = await supabase.from("contacts").select("*");
// Pas de gestion d'erreur = crash si probleme
```

### 4.5 Ne pas dupliquer le code

```tsx
// MAUVAIS - copier-coller les infos de contact partout
<p>contact@bridgetech-solutions.com</p>
<p>+237 679 289 166</p>

// BON - utiliser les constantes
import { COMPANY } from "@/lib/constants";
<p>{COMPANY.email}</p>
<p>{COMPANY.phones[0]}</p>
```

---

## 5. Tailwind CSS - Bonnes Pratiques

### 5.1 Ordre des classes

Suivre cet ordre logique :

```
1. Layout      : flex, grid, block, hidden
2. Position    : relative, absolute, fixed
3. Taille      : w-full, h-20, max-w-7xl
4. Espacement  : p-4, m-2, gap-6
5. Typographie : text-lg, font-bold, text-gray-700
6. Couleur     : bg-white, text-[#0088C1], border-gray-200
7. Effets      : shadow-lg, rounded-xl, opacity-50
8. Transitions : transition-all, hover:bg-blue-600
```

```tsx
// BON (organise)
<div className="flex items-center justify-between w-full px-4 py-3 text-sm bg-white shadow-sm rounded-lg hover:shadow-md transition-shadow">

// MAUVAIS (en desordre)
<div className="hover:shadow-md shadow-sm text-sm px-4 rounded-lg flex bg-white items-center w-full py-3 justify-between transition-shadow">
```

### 5.2 Responsive design

Toujours coder **mobile d'abord**, puis ajouter les styles pour tablette et desktop :

```tsx
// Mobile d'abord : 1 colonne par defaut
// md: (768px+) → 2 colonnes
// lg: (1024px+) → 3 colonnes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### 5.3 Couleur principale

Utiliser la couleur BTS de maniere coherente :

```tsx
// Pour le fond
className="bg-[#0088C1]"

// Pour le texte
className="text-[#0088C1]"

// Pour le hover
className="hover:bg-[#014B6A]"

// Pour une bordure
className="border-[#0088C1]"
```

### 5.4 Espacements coherents

Utiliser toujours les memes espacements pour la coherence :

```
Entre sections         : py-16 ou py-20
Padding conteneur      : px-4 sm:px-6 lg:px-8
Largeur max conteneur  : max-w-7xl mx-auto
Espace entre cartes    : gap-6 ou gap-8
Padding interne carte  : p-6 ou p-8
Padding top page       : pt-20 (pour le header fixe)
```

---

## 6. Tester son Travail

### 6.1 Verifier dans le navigateur

Apres chaque modification :

1. **Sauvegarder** le fichier (Ctrl+S)
2. Le navigateur se rafraichit automatiquement (Hot Reload)
3. **Verifier visuellement** que ca ressemble a ce qu'on veut
4. **Ouvrir les DevTools** (F12) → onglet Console → verifier qu'il n'y a pas d'erreur rouge

### 6.2 Tester le responsive

1. Ouvrir les DevTools (F12)
2. Cliquer sur l'icone mobile/tablette (ou Ctrl+Shift+M)
3. Tester ces tailles :
   - **Mobile** : 375px (iPhone SE)
   - **Tablette** : 768px (iPad)
   - **Desktop** : 1280px

Chaque page doit etre lisible et utilisable sur les 3 tailles.

### 6.3 Tester le build

AVANT chaque push, verifier que le projet compile :

```bash
npm run build
```

Si ca echoue, lire le message d'erreur et corriger. Les erreurs les plus courantes :
- Import manquant
- Variable non definie
- `"use client"` manquant sur un composant avec useState
- Import de `@/lib/supabase/server` dans un Client Component

### 6.4 Tester les formulaires

Pour chaque formulaire :
1. Soumettre avec tous les champs vides → doit afficher des erreurs
2. Soumettre avec des donnees valides → doit afficher un message de succes
3. Soumettre avec un email invalide → doit refuser
4. Verifier dans Supabase que les donnees sont bien inserees

---

## 7. Resoudre les Problemes

### 7.1 Demarche generale

Quand quelque chose ne marche pas :

```
1. LIRE le message d'erreur (en entier, pas juste la premiere ligne)
2. IDENTIFIER le fichier et la ligne concernes
3. CHERCHER sur Google le message d'erreur exact
4. DEMANDER a un collegue si tu es bloque > 30 minutes
5. DEMANDER au responsable en dernier recours
```

### 7.2 Le navigateur affiche une page blanche

1. Ouvrir la console (F12 → Console)
2. Lire l'erreur rouge
3. En general : un import qui ne marche pas ou une variable undefined

### 7.3 "Module not found"

```
Error: Cannot find module '@/components/home/Hero'
```

Verifier :
- Le fichier existe bien a cet emplacement
- L'orthographe est correcte (majuscules/minuscules comptent)
- Le fichier est bien exporte avec `export default`

### 7.4 "cookies() is not allowed"

Tu importes du code serveur dans un composant client.
- Remplacer `@/lib/supabase/server` par `@/lib/supabase/client`
- Remplacer `@/lib/auth/auth` par `@/lib/auth/auth-client`

### 7.5 Le style ne s'applique pas

- Verifier que la classe Tailwind est correcte (pas de faute de frappe)
- Verifier qu'il n'y a pas de conflit entre classes
- Utiliser les DevTools (F12 → Elements → voir les styles appliques)

### 7.6 Les donnees ne s'affichent pas

```tsx
// Ajouter un console.log pour debugger
const { data, error } = await supabase.from("contacts").select("*");
console.log("data:", data);
console.log("error:", error);
```

Causes possibles :
- La table est vide dans Supabase
- Le nom de la table est mal orthographie
- Les variables d'environnement (.env.local) sont manquantes
- Les politiques RLS dans Supabase bloquent la lecture

---

## 8. Communication en Equipe

### 8.1 Stand-up quotidien (5 minutes)

Chaque matin, chaque stagiaire dit :
1. **Hier** : ce que j'ai fait
2. **Aujourd'hui** : ce que je vais faire
3. **Bloqueur** : est-ce que quelque chose me bloque ?

### 8.2 Avant de modifier un fichier partage

Les fichiers partages (Header, Footer, Layout) ne doivent etre modifies que par UNE personne a la fois.

Procedure :
1. Prevenir les autres : "Je modifie le Header"
2. Faire la modification
3. Commit + push immediatement
4. Prevenir les autres : "C'est fait, vous pouvez pull"

### 8.3 Quand tu es bloque

```
< 15 min → Chercher sur Google / Stack Overflow
< 30 min → Demander a un collegue stagiaire
> 30 min → Demander au responsable
```

Ne reste JAMAIS bloque en silence pendant des heures.

---

## 9. Checklist Quotidienne

### En arrivant le matin
- [ ] `git pull origin main` (recuperer les changements)
- [ ] `npm run dev` (lancer le serveur)
- [ ] Verifier que le site fonctionne
- [ ] Regarder la tache du jour dans REPARTITION_TACHES.md

### Pendant la journee
- [ ] Commit regulierement (toutes les 1-2h minimum)
- [ ] Tester dans le navigateur apres chaque changement
- [ ] Tester le responsive (mobile + desktop)
- [ ] Pas d'erreur dans la console du navigateur

### Avant de partir
- [ ] `npm run build` passe sans erreur
- [ ] `git add` + `git commit` de tout le travail
- [ ] `git push` vers sa branche
- [ ] Prevenir l'equipe de ce qui a ete fait

---

## 10. Resume des Commandes Essentielles

```bash
# === GIT ===
git status                    # Voir les fichiers modifies
git add <fichier>             # Ajouter un fichier au commit
git commit -m "message"       # Creer un commit
git push origin ma-branche    # Envoyer sur le serveur
git pull origin main          # Recuperer les derniers changements
git checkout ma-branche       # Changer de branche
git merge main                # Fusionner main dans sa branche
git log --oneline -10         # Voir les 10 derniers commits
git diff                      # Voir les modifications non commitees

# === NPM ===
npm run dev                   # Lancer le serveur de dev
npm run build                 # Compiler (verifier les erreurs)
npm run lint                  # Verifier la qualite du code
npm install                   # Installer les dependances

# === RACCOURCIS VS CODE ===
Ctrl+S          # Sauvegarder
Ctrl+Shift+P    # Palette de commandes
Ctrl+`          # Ouvrir le terminal
Ctrl+P          # Rechercher un fichier
Ctrl+Shift+F    # Rechercher dans tout le projet
F12             # Ouvrir les DevTools du navigateur
```

---

*Document cree le 17 fevrier 2026 - Bridge Technologies Solutions*
*Pour toute question, contacter le responsable du projet.*

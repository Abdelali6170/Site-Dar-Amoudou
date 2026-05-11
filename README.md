# Dar Amoudou — Site Web Officiel

Site vitrine de luxe pour **Dar Amoudou**, maison d'hôte d'exception nichée dans l'Atlas marocain à 1 400 mètres d'altitude. Le projet vise un positionnement haut de gamme avec un storytelling visuel immersif et une expérience utilisateur fluide.

---

## Stack Technique

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 16+ (App Router) | Framework React SSG/SSR |
| TypeScript | 6+ | Typage statique |
| Tailwind CSS | v4 | Styling utility-first |
| Framer Motion | 12+ | Animations et transitions |
| Lucide React | — | Icônes SVG |
| Sanity.io | *(à venir)* | CMS Headless |

---

## Architecture du Projet

```
src/
├── app/
│   └── (site)/
│       ├── page.tsx              # Page d'accueil
│       ├── suites/
│       │   ├── page.tsx          # Liste des suites
│       │   └── [slug]/
│       │       └── page.tsx      # Détail d'une suite
│       ├── experiences/
│       │   └── page.tsx          # Page expériences
│       ├── galerie/
│       │   └── page.tsx          # Galerie photo
│       └── contact/
│           └── page.tsx          # Contact & réservation
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Navigation burger animée
│   │   └── Footer.tsx            # Pied de page
│   └── sections/
│       ├── home/                 # Hero, Introduction, RoomsPreview, Gastronomy, ExperiencesPreview
│       ├── suites/               # SuitesHero, SuitesList, SuiteGallery, SuiteSidebar, SuiteAmbiance
│       ├── experiences/          # ExperiencesHero, ExperiencesList
│       ├── galerie/              # GalerieHero, GalerieGrid, Lightbox
│       └── contact/              # ContactHero, ContactForm, ContactInfo
└── lib/
    ├── suites.ts                 # Données & types des suites (mock → Sanity)
    └── experiences.ts            # Données & types des expériences (mock → Sanity)
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero cinématique, introduction, aperçu suites, gastronomie, expériences |
| `/suites` | Liste des 3 suites avec cards alternées gauche/droite |
| `/suites/[slug]` | Détail dynamique — galerie, sidebar sticky, section ambiance |
| `/galerie` | Grille éditoriale masonry avec filtres et lightbox |
| `/experiences` | 5 expériences avec filtres par catégorie et détails expandables |
| `/contact` | Formulaire de réservation intelligent + informations pratiques |

---

## Design System

| Élément | Valeur |
|---|---|
| Fond principal | `#FDFBF7` (Sable) |
| Texte | `#1A1A1A` (Anthracite) |
| Accent | `#EA580C` (Orange) |
| Or | `#A3895D` (Doré) |
| Police serif | Cormorant Garamond (titres) |
| Police sans | Inter (corps de texte) |

---

## Installation & Démarrage

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-compte/projet_daramoudou.git
cd projet_daramoudou

# Installer les dépendances
npm install
```

### Démarrage en développement

```bash
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000)

### Build de production

```bash
npm run build
npm run start
```

---

## Données & Contenu

Les données sont actuellement **statiques** dans `src/lib/` :

- `suites.ts` — 3 suites (Nomade, Berbère, Atlas) avec descriptions, images, équipements et tarifs
- `experiences.ts` — 5 expériences (Trek, Cuisine, Hammam, Astronomie, Villages berbères)

Ces fichiers sont **prêts pour la migration Sanity.io** — il suffira de remplacer les fonctions `getSuiteBySlug()` et `getAllSlugs()` par des appels GROQ sans toucher aux composants.

---

## Fonctionnalités Clés

- **Galerie** — grille éditoriale asymétrique (3 patterns alternés), filtres avec animation "magic pill", lightbox plein écran avec navigation clavier
- **Suites** — page détail avec hero 100% largeur, galerie scrollable, sidebar sticky, section ambiance immersive
- **Expériences** — cards alternées gauche/droite, détails expandables, filtres par catégorie
- **Contact** — formulaire dynamique (champs conditionnels selon l'objet), état de succès animé
- **Navbar** — hamburger adaptatif (blanc sur hero, anthracite après scroll), menu plein écran animé
- **Responsive** — optimisé mobile, tablette et desktop

---

## Déploiement

Le projet est optimisé pour un déploiement sur **Vercel** :

```bash
# Via Vercel CLI
vercel deploy
```

Ou connecter le dépôt GitHub directement depuis [vercel.com](https://vercel.com).

---

## Roadmap

- [ ] Intégration Sanity.io (CMS headless)
- [ ] Schémas Sanity pour suites, expériences et galerie
- [ ] Formulaire de contact connecté (Resend ou Nodemailer)
- [ ] Internationalisation FR / EN / AR
- [ ] Optimisation SEO avancée (sitemap, schema.org)

---

## Licence

Projet privé — © 2025 Dar Amoudou. Tous droits réservés.

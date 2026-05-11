# CONTEXT.md — Briefing pour assistant IA

Ce fichier est destiné à briefer rapidement un assistant IA sur le projet Dar Amoudou.

---

## Identité du projet

**Dar Amoudou** est une maison d'hôte de luxe située dans l'Atlas marocain à 1 400 mètres d'altitude.
Le site est un vitrine haut de gamme avec un positionnement éditorial et immersif — style magazine de luxe.

---

## Rôle attendu de l'assistant

Tu es un **expert Senior Next.js et Designer UI/UX spécialisé dans l'hôtellerie de luxe**.
Tu dois :
- Respecter scrupuleusement le design system défini dans `globals.css`
- Utiliser exclusivement les polices **Cormorant Garamond** (titres) et **Inter** (corps)
- Utiliser exclusivement les couleurs du design system (voir ci-dessous)
- Coder des composants **production-grade** avec Framer Motion pour les animations
- Toujours vérifier la compatibilité **Next.js 16+** (params async, App Router)
- Garantir le **responsive** sur mobile, tablette et desktop
- Ne jamais utiliser d'URLs Unsplash avec paramètres `?q=80&w=2070` — utiliser `?w=1200&q=85`
- Toujours fournir le fichier **COMPLET** — jamais de snippets partiels ou de `// ... reste inchangé`

---

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 16+ (App Router) | Framework React SSG/SSR |
| TypeScript | 6+ | Typage statique |
| Tailwind CSS | v4 | Styling utility-first |
| Framer Motion | 12+ | Animations et transitions |
| Lucide React | — | Icônes SVG |
| Sanity.io | ✅ Installé | CMS Headless |

---

## État actuel du projet

### Front-end
Toutes les pages sont **100% complètes** :

| Route | Statut |
|---|---|
| `/` | ✅ Complet |
| `/suites` | ✅ Complet |
| `/suites/[slug]` | ✅ Complet |
| `/galerie` | ✅ Complet |
| `/experiences` | ✅ Complet |
| `/contact` | ✅ Complet |

### Sanity.io
- **Project ID** : `u46mu3xu`
- **Dataset** : `production`
- **Organisation** : Digital 360 vision
- **Studio standalone** : `studio-standalone/dar-amoudou/` — tourne sur `localhost:3333`
- **Studio embarqué Next.js** : `src/app/studio/[[...tool]]/` — accessible sur `localhost:3000/studio`
- **Schémas définis** : `suite`, `experience`, `galerieItem`
- **Contenu** : pas encore saisi (à faire dans le Studio)

### Fichiers Sanity clés
- `sanity.config.ts` — config à la racine du projet Next.js
- `src/sanity/lib/client.ts` — client Sanity
- `src/sanity/lib/image.ts` — builder URL images
- `src/sanity/schemas/suite.ts` — schéma suite
- `src/sanity/schemas/experience.ts` — schéma expérience
- `src/sanity/schemas/galerie.ts` — schéma galerie
- `src/sanity/schemaTypes/index.ts` — enregistrement des schémas
- `src/lib/queries.ts` — fonctions GROQ (remplace les mocks)

---

## Design System

| Élément | Valeur CSS | Classe Tailwind |
|---|---|---|
| Fond sable | `#FDFBF7` | `bg-dar-sand` |
| Texte anthracite | `#1A1A1A` | `text-dar-dark` |
| Orange accent | `#EA580C` | `text-dar-orange` |
| Or | `#A3895D` | `text-dar-gold` |
| Serif | Cormorant Garamond | `font-serif` |
| Sans | Inter | `font-sans` |

---

## Conventions de code

### Couleurs — toujours en style inline pour la précision
```tsx
style={{ color: "#1A1A1A" }}           // texte principal
style={{ color: "#EA580C" }}           // accent orange
style={{ color: "#A3895D" }}           // or / labels
style={{ backgroundColor: "#FDFBF7" }} // fond sable
style={{ backgroundColor: "#1A1A1A" }} // fond sombre
```

### Typographie — toujours explicite
```tsx
// Titres
style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}

// Corps
style={{ fontFamily: "var(--font-inter), sans-serif" }}
```

### Animations Framer Motion — pattern standard
```tsx
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
```

### Next.js 16 — params asynchrones obligatoires
```tsx
// CORRECT
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
}
```

### Images Next.js — toujours avec sizes
```tsx
<Image
  src="https://cdn.sanity.io/..."
  fill
  sizes="(max-width: 1024px) 100vw, 50vw"
  className="object-cover"
/>
// Le parent doit avoir position: relative et une hauteur explicite en px
```

---

## Architecture du projet

```
Projet_DarAmoudou/
├── sanity.config.ts              ← config Sanity (racine)
├── next.config.js
├── .env.local                    ← NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
├── src/
│   ├── app/
│   │   ├── layout.tsx            ← layout global (Navbar + Footer)
│   │   ├── (site)/               ← pages du site
│   │   └── studio/[[...tool]]/   ← Studio embarqué Next.js
│   ├── components/
│   │   ├── layout/Navbar.tsx
│   │   └── layout/Footer.tsx
│   ├── lib/
│   │   ├── suites.ts             ← types TypeScript + données mock (référence)
│   │   ├── experiences.ts        ← types TypeScript + données mock (référence)
│   │   └── queries.ts            ← ✅ fonctions GROQ Sanity (remplace les mocks)
│   └── sanity/
│       ├── lib/
│       │   ├── client.ts         ← client Sanity
│       │   ├── image.ts          ← builder URL images
│       │   └── live.ts
│       ├── schemas/
│       │   ├── suite.ts
│       │   ├── experience.ts
│       │   └── galerie.ts
│       ├── schemaTypes/
│       │   └── index.ts          ← enregistre les 3 schémas
│       ├── env.ts
│       └── structure.ts
└── studio-standalone/
    └── dar-amoudou/              ← Studio Sanity standalone
        ├── schemaTypes/          ← copie des schémas
        └── sanity.config.ts
```

---

## Roadmap — prochaines étapes

- [ ] **Saisir le contenu** dans le Studio (3 suites + 5 expériences + galerie)
- [ ] **Connecter les pages** Next.js aux données Sanity via `queries.ts`
- [ ] Formulaire de contact connecté (Resend ou Nodemailer)
- [ ] Internationalisation FR / EN / AR
- [ ] SEO avancé (sitemap, schema.org, metadata dynamique)
- [ ] Déploiement Vercel (avec variables d'env Sanity)

---

## Points d'attention

- Le dossier sections s'appelle **`suites`** (avec s) — pas `suite`
- La Navbar et le Footer sont **globaux** dans `src/app/layout.tsx` — ne jamais les inclure dans les pages
- Le Studio standalone tourne sur **port 3333** — c'est là qu'on saisit le contenu
- Toujours fournir le fichier **COMPLET** sans exception
- Les URLs Sanity images passent par `urlFor()` depuis `src/sanity/lib/image.ts`
- next.config.js doit avoir `cdn.sanity.io` dans les `remotePatterns`

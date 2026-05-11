// src/lib/experiences.ts

export interface Experience {
  id: string;
  numero: string;
  categorie: string;
  titre: string;
  sousTitre: string;
  description: string;
  details: string;
  duree: string;
  difficulte?: string;
  included: string[];
  image: string;
  imageAlt: string;
  imageSecondaire?: string;
  saison: string;
  tag: "Aventure" | "Culture" | "Gastronomie" | "Bien-être" | "Nature";
}

export const EXPERIENCES: Experience[] = [
  {
    id: "trek-atlas",
    numero: "01",
    categorie: "Aventure",
    tag: "Aventure",
    titre: "Trek vers les sommets",
    sousTitre: "L'Atlas à pied, comme les premiers explorateurs",
    description:
      "Quittez Dar Amoudou à l'aube, quand la vallée dort encore sous ses voiles de brume. Nos guides berbères — héritiers de siècles de connaissance de la montagne — vous mènent vers des cols où seuls les mulets et les chamois s'aventurent d'ordinaire.",
    details:
      "L'itinéraire traverse trois vallées distinctes, chacune avec sa palette végétale et ses villages de pisé accrochés aux falaises. Au sommet du Jbel Mgoun (4 071 m), l'horizon s'étend sur 400 kilomètres par temps clair. Le retour se fait par une piste méconnue, bordée de genévriers millénaires.",
    duree: "1 à 3 jours",
    difficulte: "Modéré à difficile",
    saison: "Avril — Octobre",
    included: [
      "Guide certifié bilingue",
      "Mulets pour le matériel",
      "Pique-nique berbère en altitude",
      "Bivouac sous les étoiles (option)",
      "Transfert retour",
    ],
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1400&q=85",
    imageAlt: "Trek dans les gorges du Dadès près de Ouarzazate",
    imageSecondaire: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=85",
  },
  {
    id: "cuisine-berbere",
    numero: "02",
    categorie: "Gastronomie",
    tag: "Gastronomie",
    titre: "L'atelier du tajine",
    sousTitre: "Cuisine berbère au cœur du foyer",
    description:
      "Fatima, notre cheffe depuis douze ans, ouvre les portes de sa cuisine. Elle transmet les recettes que sa grand-mère lui a apprises dans ce même village — des gestes millimétrés, des dosages gardés secrets, une patience qui n'appartient qu'à la montagne.",
    details:
      "La session commence par une visite du jardin potager et des herbes aromatiques cultivées sur place. Vous sélectionnez vos ingrédients, vous pétrissez la pâte à pain, vous assemblez votre tajine sous l'œil bienveillant de Fatima. Le repas que vous avez cuisiné devient votre déjeuner, servi dans le patio.",
    duree: "3 à 4 heures",
    saison: "Toute l'année",
    included: [
      "Tablier et carnet de recettes",
      "Visite du jardin aromatique",
      "Tous les ingrédients",
      "Déjeuner complet avec thé",
      "Accès à la recette digitale",
    ],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85",
    imageAlt: "Atelier de cuisine berbère avec tajines et épices",
    imageSecondaire: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=85",
  },
  {
    id: "hammam-rituel",
    numero: "03",
    categorie: "Bien-être",
    tag: "Bien-être",
    titre: "Rituel hammam & argan",
    sousTitre: "Le temps suspendu de l'eau et de la pierre",
    description:
      "Dans notre hammam privé taillé dans la roche, le temps s'arrête. Le rituel traditionnel — vapeur, savon beldi, gant de kessa, huile d'argan pure — est pratiqué depuis des siècles dans ces montagnes. Un voyage immobile au cœur du corps.",
    details:
      "Le soin commence par une inhalation aux herbes de l'Atlas — thym sauvage, romarin, eucalyptus. La vapeur ouvre les pores. Le gommage au savon beldi noir révèle une peau neuve. Le massage à l'huile d'argan pressée à froid dans le village voisin clôt le rituel. Deux heures hors du temps.",
    duree: "2 heures",
    saison: "Toute l'année",
    included: [
      "Hammam privatif",
      "Savon beldi & huile d'argan artisanale",
      "Gommage et massage complet",
      "Thé à la menthe et dattes",
      "Peignoir et sandales",
    ],
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=85",
    imageAlt: "Hammam traditionnel marocain aux bougies",
    imageSecondaire: "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=800&q=85",
  },
  {
    id: "nuit-etoiles",
    numero: "04",
    categorie: "Nature",
    tag: "Nature",
    titre: "Nuit sous les étoiles",
    sousTitre: "L'Atlas comme planétarium naturel",
    description:
      "À 1 400 mètres d'altitude, sans pollution lumineuse à des kilomètres à la ronde, le ciel nocturne de Dar Amoudou est d'une clarté rare en Europe ou au Maghreb. La Voie lactée se dessine comme une rivière de lumière au-dessus de vos têtes.",
    details:
      "Notre astronome amateur résidant installe le télescope sur la terrasse panoramique avant le coucher du soleil. Après un dîner étoilé sous la pergola, l'observation commence : Saturne et ses anneaux, les amas d'étoiles de la constellation d'Orion, les nébuleuses visibles à l'œil nu. Une carte du ciel personnalisée vous est remise en souvenir.",
    duree: "Soirée complète",
    saison: "Toute l'année (optimal : nov — fév)",
    included: [
      "Télescope professionnel",
      "Guide astronome",
      "Dîner gastronomique sous les étoiles",
      "Carte du ciel personnalisée",
      "Couvertures et thé chaud",
    ],
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1400&q=85",
    imageAlt: "Ciel étoilé au-dessus du désert de Ouarzazate",
    imageSecondaire: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=85",
  },
  {
    id: "visite-village",
    numero: "05",
    categorie: "Culture",
    tag: "Culture",
    titre: "Rencontres berbères",
    sousTitre: "Au rythme des villages de l'Atlas",
    description:
      "Ibrahim, fils du village d'Amoudou, vous guide dans les ruelles de sa communauté. Pas un circuit touristique — une invitation authentique dans des maisons de pisé où se perpétuent des savoir-faire millénaires : tissage, poterie, tannage du cuir.",
    details:
      "La visite comprend une halte chez un maître tisserand qui fabrique les tapis berbères selon les motifs tribaux de la région. Puis chez une coopérative de femmes qui pressent l'huile d'argan à la main. La journée se termine dans la maison familiale d'Ibrahim pour un thé à la menthe — le vrai cérémonial de l'hospitalité berbère.",
    duree: "Demi-journée",
    saison: "Toute l'année",
    included: [
      "Guide local natif",
      "Visite de l'atelier de tissage",
      "Dégustation huile d'argan",
      "Thé cérémonial en famille",
      "Don à la coopérative féminine inclus",
    ],
    image: "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?w=1400&q=85",
    imageAlt: "Village berbère dans la vallée du Drâa près de Ouarzazate",
    imageSecondaire: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=85",
  },
];

export const TAGS = ["Tous", "Aventure", "Culture", "Gastronomie", "Bien-être", "Nature"] as const;
export type ExperienceTag = (typeof TAGS)[number];

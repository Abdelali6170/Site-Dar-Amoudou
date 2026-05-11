// src/lib/suites.ts
// Données statiques — à remplacer par des appels Sanity.io

export interface SuiteAmenity {
  icon: string;
  label: string;
}

export interface Suite {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  surface: number;
  capacity: number;
  altitude: string;
  view: string;
  priceFrom: number;
  images: { src: string; alt: string }[];
  amenities: SuiteAmenity[];
  details: { label: string; value: string }[];
  ambiance: string;
}

export const SUITES: Suite[] = [
  {
    slug: "suite-nomade",
    name: "Suite Nomade",
    subtitle: "L'essence du voyage immobile",
    description:
      "Suspendue entre ciel et vallée, la Suite Nomade célèbre la liberté des grandes traversées. Tapis berbères, bois de cèdre et cuivre martelé composent un refuge d'une élégance primitive.",
    longDescription:
      "La Suite Nomade est née d'un dialogue entre le mobilier des caravansérails et le raffinement contemporain. Chaque pièce raconte une étape : le zellige de Fès sur le mur de la salle de bain, les babouches en cuir de Marrakech posées au pied du lit, la lampe en cuivre ciselé de Tiznit qui projette ses arabesques au plafond la nuit. La terrasse privée s'ouvre à 360° sur l'Atlas — le panorama change d'heure en heure, du rose de l'aube au violet du crépuscule.",
    surface: 65,
    capacity: 2,
    altitude: "1 400 m",
    view: "Atlas & vallée du Drâa",
    priceFrom: 480,
    images: [
      {
        src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=85",
        alt: "Suite Nomade — chambre avec vue sur l'Atlas",
      },
      {
        src: "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=1200&q=85",
        alt: "Suite Nomade — détail artisanat marocain",
      },
      {
        src: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200&q=85",
        alt: "Suite Nomade — terrasse avec vue Ouarzazate",
      },
      {
        src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=85",
        alt: "Suite Nomade — hammam privatif",
      },
    ],
    amenities: [
      { icon: "bed", label: "Lit King Size" },
      { icon: "bath", label: "Hammam privatif" },
      { icon: "terrace", label: "Terrasse 360°" },
      { icon: "fire", label: "Cheminée" },
      { icon: "wifi", label: "Wi-Fi haut débit" },
      { icon: "breakfast", label: "Petit-déjeuner inclus" },
      { icon: "minibar", label: "Minibar de saison" },
      { icon: "concierge", label: "Concierge dédié" },
    ],
    details: [
      { label: "Surface", value: "65 m²" },
      { label: "Altitude", value: "1 400 m" },
      { label: "Vue", value: "Atlas & vallée" },
      { label: "Capacité", value: "2 personnes" },
      { label: "Salle de bain", value: "Hammam + douche à l'italienne" },
      { label: "Terrasse", value: "Privée, 20 m²" },
    ],
    ambiance:
      "Quand le soleil disparaît derrière le Jbel Mgoun, la Suite Nomade se transforme. La cheminée prend vie, les lampes en cuivre diffusent une lumière ambrée, et le silence de l'Atlas — absolu, dense, presque tactile — enveloppe l'espace. C'est ici que le voyage cesse d'être un déplacement pour devenir une présence.",
  },
  {
    slug: "suite-berbere",
    name: "Suite Berbère",
    subtitle: "Les racines de la montagne",
    description:
      "Ancrée dans la roche comme une kasba millénaire, la Suite Berbère honore l'architecture vernaculaire de l'Atlas. Pisé, bois sculpté et textiles tissés main composent un intérieur d'une authenticité rare.",
    longDescription:
      "La Suite Berbère a été construite selon les techniques ancestrales du pisé — cette terre crue et paille compressée qui régule naturellement la température. L'été, la suite reste fraîche sans climatisation. L'hiver, elle conserve la chaleur du jour jusqu'au petit matin. Les plafonds en bois de genévrier, sculptés par des artisans de Ouarzazate, racontent en arabesques l'histoire des tribus Aït Atta qui peuplent ces vallées depuis des siècles.",
    surface: 78,
    capacity: 2,
    altitude: "1 420 m",
    view: "Kasbahs et oliveraies",
    priceFrom: 550,
    images: [
      {
        src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=85",
        alt: "Suite Berbère — kasbah de la région de Ouarzazate",
      },
      {
        src: "https://images.unsplash.com/photo-1471623432079-b009d30b6729?w=1200&q=85",
        alt: "Suite Berbère — piscine avec vue Atlas",
      },
      {
        src: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=85",
        alt: "Suite Berbère — vallée du Drâa",
      },
      {
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
        alt: "Suite Berbère — sentier dans l'Atlas",
      },
    ],
    amenities: [
      { icon: "bed", label: "Lit King Size" },
      { icon: "pool", label: "Piscine privée" },
      { icon: "terrace", label: "Terrasse kasba" },
      { icon: "fire", label: "Brasero extérieur" },
      { icon: "wifi", label: "Wi-Fi haut débit" },
      { icon: "breakfast", label: "Petit-déjeuner inclus" },
      { icon: "minibar", label: "Minibar de saison" },
      { icon: "concierge", label: "Concierge dédié" },
    ],
    details: [
      { label: "Surface", value: "78 m²" },
      { label: "Altitude", value: "1 420 m" },
      { label: "Vue", value: "Kasbahs & oliveraies" },
      { label: "Capacité", value: "2 personnes" },
      { label: "Salle de bain", value: "Baignoire en cuivre + douche" },
      { label: "Piscine", value: "Privée, chauffée, 20 m²" },
    ],
    ambiance:
      "À l'heure où les muezzins appellent depuis la vallée, la Suite Berbère offre un panorama sur les kasbahs ocre qui parsèment le versant sud de l'Atlas. La terrasse, surélevée de trois mètres sur la muraille de pisé, donne le sentiment de flotter au-dessus des siècles.",
  },
  {
    slug: "suite-atlas",
    name: "Suite Atlas",
    subtitle: "Au sommet du monde habité",
    description:
      "La plus haute de nos suites. Perchée à 1 450 mètres, elle offre un panorama à 180° sur les sommets enneigés. Un lieu pour ceux qui cherchent le vertige de l'infini.",
    longDescription:
      "La Suite Atlas occupe l'angle nord-ouest de Dar Amoudou, là où les deux chaînes de l'Atlas se rejoignent à l'horizon. Son double vitrage panoramique — une prouesse de l'architecture contemporaine insérée dans les murs de pisé du XVIIIe siècle — efface la frontière entre l'intérieur et le ciel. Toute la nuit, les étoiles sont à portée de main.",
    surface: 90,
    capacity: 2,
    altitude: "1 450 m",
    view: "Panorama 180° sur l'Atlas",
    priceFrom: 680,
    images: [
      {
        src: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200&q=85",
        alt: "Suite Atlas — vue panoramique Ouarzazate",
      },
      {
        src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=85",
        alt: "Suite Atlas — ciel étoilé Atlas marocain",
      },
      {
        src: "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?w=1200&q=85",
        alt: "Suite Atlas — intérieur raffiné",
      },
      {
        src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85",
        alt: "Suite Atlas — dîner gastronomique",
      },
    ],
    amenities: [
      { icon: "bed", label: "Lit King Size" },
      { icon: "bath", label: "Bain en cuivre" },
      { icon: "terrace", label: "Belvédère privatif" },
      { icon: "telescope", label: "Télescope fourni" },
      { icon: "wifi", label: "Wi-Fi haut débit" },
      { icon: "breakfast", label: "Petit-déjeuner inclus" },
      { icon: "dinner", label: "Dîner en suite sur demande" },
      { icon: "concierge", label: "Concierge dédié" },
    ],
    details: [
      { label: "Surface", value: "90 m²" },
      { label: "Altitude", value: "1 450 m" },
      { label: "Vue", value: "Panorama 180° Atlas" },
      { label: "Capacité", value: "2 personnes" },
      { label: "Salle de bain", value: "Bain en cuivre + hammam" },
      { label: "Belvédère", value: "Privatif, 30 m²" },
    ],
    ambiance:
      "À 1 450 mètres, l'air a une qualité différente. Plus dense, presque minéral. La nuit, en l'absence de toute pollution lumineuse, la Voie lactée se déploie en un arc parfait au-dessus du belvédère. Le télescope de la suite permet d'observer Saturne — et ses anneaux — à l'œil nu.",
  },
];

export function getSuiteBySlug(slug: string): Suite | undefined {
  return SUITES.find((s) => s.slug === slug);
}

export function getAllSlugs(): string[] {
  return SUITES.map((s) => s.slug);
}

// src/lib/chambres.ts
// Données statiques — même structure que suites.ts, prêtes pour Sanity

export interface Chambre {
  slug: string
  name: string
  subtitle: string
  description: string
  longDescription: string
  surface: number
  capacity: number
  altitude: string
  view: string
  priceFrom: number
  images: { src: string; alt: string }[]
  amenities: { icon: string; label: string }[]
  details: { label: string; value: string }[]
  ambiance: string
}

export const CHAMBRES: Chambre[] = [
  {
    slug: "chambre-safran",
    name: "Chambre Safran",
    subtitle: "La douceur de l'aube berbère",
    description:
      "Baignée de lumière dorée dès le lever du soleil, la Chambre Safran célèbre les teintes chaudes de l'Atlas. Zellige miel, textiles tissés main et bois de cèdre composent un intérieur d'une sérénité absolue.",
    longDescription:
      "La Chambre Safran tire son nom de la couleur qui envahit ses murs à l'heure où le soleil effleure les crêtes de l'Atlas. Orientée plein est, elle capte la première lumière du jour et la diffuse en arabesques sur les zellige ocre de sa salle de bain. Les textiles — jetés de lit en laine d'agneau, coussins brodés de Fès — ont été sélectionnés un à un dans les souks de la médina de Marrakech.",
    surface: 32,
    capacity: 2,
    altitude: "1 400 m",
    view: "Jardins et oliveraies",
    priceFrom: 220,
    images: [
      {
        src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85",
        alt: "Chambre Safran — lit et zellige",
      },
      {
        src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=85",
        alt: "Chambre Safran — salle de bain",
      },
      {
        src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=85",
        alt: "Chambre Safran — vue jardins",
      },
    ],
    amenities: [
      { icon: "bed", label: "Lit Queen Size" },
      { icon: "bath", label: "Douche à l'italienne" },
      { icon: "wifi", label: "Wi-Fi haut débit" },
      { icon: "breakfast", label: "Petit-déjeuner inclus" },
      { icon: "minibar", label: "Minibar de saison" },
      { icon: "concierge", label: "Concierge dédié" },
    ],
    details: [
      { label: "Surface", value: "32 m²" },
      { label: "Altitude", value: "1 400 m" },
      { label: "Vue", value: "Jardins & oliveraies" },
      { label: "Capacité", value: "2 personnes" },
      { label: "Salle de bain", value: "Douche à l'italienne" },
      { label: "Exposition", value: "Plein est" },
    ],
    ambiance:
      "À l'aube, quand la vallée dort encore, la Chambre Safran s'illumine d'une lumière que nulle lampe ne saurait reproduire. C'est l'heure où le silence de l'Atlas est le plus dense — et le plus précieux.",
  },
  {
    slug: "chambre-indigo",
    name: "Chambre Indigo",
    subtitle: "L'heure bleue de la montagne",
    description:
      "Inspirée des bleus profonds des poteries de Fès, la Chambre Indigo offre une parenthèse de calme absolu. Sa terrasse privée sur le patio intérieur en fait un refuge idéal pour les voyageurs en quête de silence.",
    longDescription:
      "La Chambre Indigo doit son nom aux carreaux de faïence bleu nuit qui tapissent l'alcôve de sa salle de bain — un travail de maître artisan de Fès qui a nécessité trois semaines de pose. Son patio privé, planté d'un oranger centenaire, diffuse le soir venu un parfum entêtant qui accompagne l'endormissement.",
    surface: 28,
    capacity: 2,
    altitude: "1 400 m",
    view: "Patio et oranger centenaire",
    priceFrom: 195,
    images: [
      {
        src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=85",
        alt: "Chambre Indigo — ambiance bleue",
      },
      {
        src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85",
        alt: "Chambre Indigo — patio privé",
      },
      {
        src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=85",
        alt: "Chambre Indigo — détail faïence",
      },
    ],
    amenities: [
      { icon: "bed", label: "Lit Queen Size" },
      { icon: "terrace", label: "Patio privé" },
      { icon: "bath", label: "Baignoire sur pieds" },
      { icon: "wifi", label: "Wi-Fi haut débit" },
      { icon: "breakfast", label: "Petit-déjeuner inclus" },
      { icon: "concierge", label: "Concierge dédié" },
    ],
    details: [
      { label: "Surface", value: "28 m²" },
      { label: "Altitude", value: "1 400 m" },
      { label: "Vue", value: "Patio & oranger" },
      { label: "Capacité", value: "2 personnes" },
      { label: "Salle de bain", value: "Baignoire sur pieds" },
      { label: "Terrasse", value: "Patio privé, 12 m²" },
    ],
    ambiance:
      "Le soir, quand les dernières lueurs du couchant effleurent les faïences bleues, la Chambre Indigo semble suspendue hors du temps. L'oranger du patio diffuse son parfum — et le silence fait le reste.",
  },
  {
    slug: "chambre-ocre",
    name: "Chambre Ocre",
    subtitle: "La terre et le ciel réconciliés",
    description:
      "Construite en pisé traditionnel, la Chambre Ocre incarne l'architecture vernaculaire de l'Atlas dans ce qu'elle a de plus pur. Ses murs épais gardent la fraîcheur l'été, la chaleur l'hiver.",
    longDescription:
      "La Chambre Ocre a été conçue en collaboration avec des maçons du village d'Amoudou, héritiers d'une tradition constructive millénaire. Le pisé — terre crue, paille et eau — régule naturellement la température et crée une acoustique unique : le silence y est presque palpable. La fenêtre à moucharabieh filtre la lumière en dentelle d'ombre sur le sol de tadelakt.",
    surface: 30,
    capacity: 2,
    altitude: "1 410 m",
    view: "Vallée et sommets de l'Atlas",
    priceFrom: 210,
    images: [
      {
        src: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200&q=85",
        alt: "Chambre Ocre — murs en pisé",
      },
      {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
        alt: "Chambre Ocre — vue vallée",
      },
      {
        src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=85",
        alt: "Chambre Ocre — détail tadelakt",
      },
    ],
    amenities: [
      { icon: "bed", label: "Lit Queen Size" },
      { icon: "bath", label: "Douche tadelakt" },
      { icon: "fire", label: "Poêle à bois" },
      { icon: "wifi", label: "Wi-Fi haut débit" },
      { icon: "breakfast", label: "Petit-déjeuner inclus" },
      { icon: "concierge", label: "Concierge dédié" },
    ],
    details: [
      { label: "Surface", value: "30 m²" },
      { label: "Altitude", value: "1 410 m" },
      { label: "Vue", value: "Vallée & sommets" },
      { label: "Capacité", value: "2 personnes" },
      { label: "Salle de bain", value: "Douche tadelakt" },
      { label: "Chauffage", value: "Poêle à bois" },
    ],
    ambiance:
      "Dans la Chambre Ocre, les murs respirent. Le pisé absorbe la chaleur du jour et la restitue doucement la nuit — une régulation thermique que nulle technologie moderne n'égale. Et par la fenêtre à moucharabieh, l'Atlas veille.",
  },
]

export function getChambreBySlug(slug: string): Chambre | undefined {
  return CHAMBRES.find((c) => c.slug === slug)
}

export function getAllChambreSlugs(): string[] {
  return CHAMBRES.map((c) => c.slug)
}

"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Lightbox from "./Lightbox";

// ─── Types ──────────────────────────────────────────────────────────────────

export type GalerieCategory = "Tous" | "Suites" | "Jardins" | "Gastronomie" | "Atlas";

export interface GalerieImage {
  id: string;
  src: string;
  alt: string;
  category: Exclude<GalerieCategory, "Tous">;
  title: string;
  description?: string;
}

// ─── Données placeholder (à remplacer par Sanity) ───────────────────────────

const IMAGES: GalerieImage[] = [
  // Rangée A
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85",
    alt: "Suite Nomade - vue intérieure",
    category: "Suites",
    title: "Suite Nomade",
    description: "Un refuge de terre et de lumière au cœur de l'Atlas.",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85",
    alt: "Vue panoramique Atlas",
    category: "Atlas",
    title: "L'Atlas au lever du jour",
    description: "Les sommets enneigés surgissent de la brume matinale.",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85",
    alt: "Jardin intérieur riad",
    category: "Jardins",
    title: "Patio secret",
    description: "L'eau, les orangers, l'ombre — un silence rare.",
  },
  // Rangée B (texte éditorial + grande image)
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85",
    alt: "Table gastronomique",
    category: "Gastronomie",
    title: "La table des seigneurs",
    description: "Saveurs berbères revisitées avec une élégance contemporaine.",
  },
  // Rangée C (triptyque)
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=85",
    alt: "Détail zellige bleu",
    category: "Suites",
    title: "Zellige Bleu de Fès",
    description: "L'art du zellige transmis de génération en génération.",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=85",
    alt: "Rituel hammam",
    category: "Suites",
    title: "Rituel de l'eau",
    description: "Le hammam traditionnel, au rythme du silence.",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=85",
    alt: "Sentier vers le col",
    category: "Atlas",
    title: "Le chemin de crête",
    description: "À chaque virage, l'horizon s'élargit encore.",
  },
  // Rangée D — seconde série
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=85",
    alt: "Suite Berbère terrasse",
    category: "Suites",
    title: "Suite Berbère",
    description: "La terrasse privée embrasse la vallée jusqu'au coucher du soleil.",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=85",
    alt: "Piscine infinity jardin",
    category: "Jardins",
    title: "Le bassin infini",
    description: "L'eau se fond dans le panorama de l'Atlas.",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=85",
    alt: "Tajine aux olives",
    category: "Gastronomie",
    title: "Tajine ancestral",
    description: "Vingt-quatre heures de cuisson lente, mille ans de tradition.",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=85",
    alt: "Épices du souk",
    category: "Gastronomie",
    title: "L'alchimie des épices",
    description: "Cumin, safran, ras el hanout — la palette du chef.",
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=85",
    alt: "Caravane dans les dunes",
    category: "Atlas",
    title: "Vers les sommets",
    description: "L'expédition commence à l'aube, quand le silence appartient encore aux mulets.",
  },
];

const CATEGORIES: GalerieCategory[] = ["Tous", "Suites", "Jardins", "Gastronomie", "Atlas"];

// ─── Variants Framer Motion ──────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
};

// ─── Sous-composant : une cellule image ─────────────────────────────────────

interface GalerieCellProps {
  image: GalerieImage;
  onClick: (image: GalerieImage) => void;
  className?: string;
  style?: React.CSSProperties;
}

function GalerieCell({ image, onClick, className = "", style }: GalerieCellProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      layout
      className={`relative overflow-hidden cursor-pointer group ${className}`}
      style={{ borderRadius: "2px", ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(image)}
    >
      {/* Image */}
      <div className="w-full h-full relative">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={false}
        />
      </div>

      {/* Overlay au hover */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6"
        style={{
          background:
            "linear-gradient(to top, rgba(26,26,26,0.82) 0%, rgba(26,26,26,0.35) 45%, transparent 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Catégorie */}
        <span
          className="text-xs tracking-[0.25em] uppercase mb-2 block"
          style={{ color: "#EA580C", fontFamily: "var(--font-inter), sans-serif" }}
        >
          {image.category}
        </span>

        {/* Titre */}
        <h3
          className="text-white leading-tight mb-1"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
            fontWeight: 400,
          }}
        >
          {image.title}
        </h3>

        {/* Flèche */}
        <motion.span
          className="text-white/70 text-sm"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
          initial={{ x: -6, opacity: 0 }}
          animate={{ x: hovered ? 0 : -6, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          Voir →
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

// ─── Sous-composant : carte texte éditorial ──────────────────────────────────

interface EditorialCardProps {
  quote?: string;
  attribution?: string;
  index: number;
  style?: React.CSSProperties;
}

const EDITORIAL_QUOTES = [
  {
    quote: "Un lieu où le temps retrouve sa lenteur originelle.",
    attribution: "— Dar Amoudou",
  },
  {
    quote: "L'hospitalité berbère est une philosophie, non un service.",
    attribution: "— Dar Amoudou",
  },
];

function EditorialCard({ index, style }: EditorialCardProps) {
  const q = EDITORIAL_QUOTES[index % EDITORIAL_QUOTES.length];
  return (
    <motion.div
      variants={itemVariants}
      layout
      className="relative flex flex-col justify-center items-start p-8 md:p-10"
      style={{
        backgroundColor: "#FDFBF7",
        border: "1px solid rgba(26,26,26,0.1)",
        borderRadius: "2px",
        ...style,
      }}
    >
      {/* Guillemet décoratif */}
      <span
        className="absolute top-6 left-8 leading-none select-none"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "6rem",
          color: "rgba(163,137,93,0.18)",
          lineHeight: 1,
        }}
      >
        "
      </span>

      {/* Trait orange */}
      <div
        className="w-8 mb-6"
        style={{ height: "1px", backgroundColor: "#EA580C" }}
      />

      {/* Citation */}
      <blockquote
        className="relative"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(1.15rem, 1.8vw, 1.45rem)",
          fontWeight: 300,
          lineHeight: 1.55,
          color: "#1A1A1A",
          fontStyle: "italic",
        }}
      >
        {q.quote}
      </blockquote>

      {/* Attribution */}
      <p
        className="mt-6 text-xs tracking-[0.2em] uppercase"
        style={{
          color: "#A3895D",
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        {q.attribution}
      </p>
    </motion.div>
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────

export default function GalerieGrid() {
  const [activeCategory, setActiveCategory] = useState<GalerieCategory>("Tous");
  const [lightboxImage, setLightboxImage] = useState<GalerieImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const filtered = activeCategory === "Tous"
    ? IMAGES
    : IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback((image: GalerieImage) => {
    const idx = filtered.findIndex((i) => i.id === image.id);
    setLightboxIndex(idx);
    setLightboxImage(image);
  }, [filtered]);

  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  const goNext = useCallback(() => {
    const next = (lightboxIndex + 1) % filtered.length;
    setLightboxIndex(next);
    setLightboxImage(filtered[next]);
  }, [lightboxIndex, filtered]);

  const goPrev = useCallback(() => {
    const prev = (lightboxIndex - 1 + filtered.length) % filtered.length;
    setLightboxIndex(prev);
    setLightboxImage(filtered[prev]);
  }, [lightboxIndex, filtered]);

  // ── Layout des rangées ──────────────────────────────────────────────────
  // On découpe `filtered` en rangées selon le pattern éditorial :
  // A → 3 images (1 grande portrait + 2 paysage empilées)
  // B → 1 carte éditoriale + 1 grande image paysage
  // C → 3 images carrées
  // puis on répète

  const chunks: { type: "A" | "B" | "C"; images: GalerieImage[]; editorialIndex?: number }[] = [];
  let cursor = 0;
  let editorialCount = 0;

  while (cursor < filtered.length) {
    const patternIndex = chunks.length % 3;

    if (patternIndex === 0) {
      // Rangée A : 3 images
      chunks.push({ type: "A", images: filtered.slice(cursor, cursor + 3) });
      cursor += 3;
    } else if (patternIndex === 1) {
      // Rangée B : 1 editorial + 1 image
      chunks.push({
        type: "B",
        images: filtered.slice(cursor, cursor + 1),
        editorialIndex: editorialCount++,
      });
      cursor += 1;
    } else {
      // Rangée C : 3 images
      chunks.push({ type: "C", images: filtered.slice(cursor, cursor + 3) });
      cursor += 3;
    }
  }

  return (
    <>
      {/* ── Filtre sticky ───────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-30 flex items-center justify-center gap-2 py-4 px-4"
        style={{
          backgroundColor: "rgba(253,251,247,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(26,26,26,0.08)",
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="relative px-4 py-1.5 text-xs tracking-[0.15em] uppercase transition-colors duration-300"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              color: activeCategory === cat ? "#FDFBF7" : "#1A1A1A",
              borderRadius: "999px",
              border: "1px solid transparent",
            }}
          >
            {/* Pill animée */}
            <AnimatePresence>
              {activeCategory === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0"
                  style={{
                    backgroundColor: "#1A1A1A",
                    borderRadius: "999px",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      {/* ── Grille éditoriale ───────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="px-4 md:px-8 lg:px-12 py-8 space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {chunks.map((chunk, chunkIdx) => {
            // ── Rangée A ──────────────────────────────────────────────
            if (chunk.type === "A" && chunk.images.length > 0) {
              return (
                <div
                  key={`chunk-${chunkIdx}`}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  style={{ gridTemplateRows: "240px 240px" }}
                >
                  {/* Grande image gauche — couvre les 2 rangées */}
                  {chunk.images[0] && (
                    <GalerieCell
                      image={chunk.images[0]}
                      onClick={openLightbox}
                      key={chunk.images[0].id}
                      className="row-span-2"
                      style={{ height: "483px" }}
                    />
                  )}
                  {/* Image haut droite */}
                  {chunk.images[1] && (
                    <GalerieCell
                      image={chunk.images[1]}
                      onClick={openLightbox}
                      key={chunk.images[1].id}
                      style={{ height: "240px" }}
                    />
                  )}
                  {/* Image bas droite */}
                  {chunk.images[2] && (
                    <GalerieCell
                      image={chunk.images[2]}
                      onClick={openLightbox}
                      key={chunk.images[2].id}
                      style={{ height: "240px" }}
                    />
                  )}
                </div>
              );
            }

            // ── Rangée B ──────────────────────────────────────────────
            if (chunk.type === "B") {
              return (
                <div key={`chunk-${chunkIdx}`} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <EditorialCard
                    quote=""
                    attribution=""
                    index={chunk.editorialIndex ?? 0}
                    style={{ height: "340px" }}
                  />
                  {chunk.images[0] && (
                    <GalerieCell
                      image={chunk.images[0]}
                      onClick={openLightbox}
                      key={chunk.images[0].id}
                      className="md:col-span-2"
                      style={{ height: "340px" }}
                    />
                  )}
                </div>
              );
            }

            // ── Rangée C ──────────────────────────────────────────────
            if (chunk.type === "C" && chunk.images.length > 0) {
              return (
                <div key={`chunk-${chunkIdx}`} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {chunk.images.map((img) => (
                    <GalerieCell
                      key={img.id}
                      image={img}
                      onClick={openLightbox}
                      style={{ height: "280px" }}
                    />
                  ))}
                </div>
              );
            }

            return null;
          })}

          {/* Message si aucun résultat */}
          {filtered.length === 0 && (
            <motion.div
              className="flex flex-col items-center justify-center py-32 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p
                className="text-2xl mb-3"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  color: "#A3895D",
                }}
              >
                Aucune image dans cette catégorie.
              </p>
              <button
                onClick={() => setActiveCategory("Tous")}
                className="text-xs tracking-[0.2em] uppercase underline underline-offset-4"
                style={{ color: "#1A1A1A", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Voir tout
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
      <Lightbox
        image={lightboxImage}
        onClose={closeLightbox}
        onNext={goNext}
        onPrev={goPrev}
        currentIndex={lightboxIndex}
        total={filtered.length}
      />
    </>
  );
}

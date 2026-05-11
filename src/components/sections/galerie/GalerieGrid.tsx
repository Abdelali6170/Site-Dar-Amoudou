"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Lightbox from "./Lightbox";

// ─── Types ────────────────────────────────────────────────────────────────────

export type GalerieCategory = "Tous" | "Suites" | "Chambre" | "Gastronomie" | "Activités" | "Autre";

export interface GalerieImage {
  id: string;
  src: string;
  alt: string;
  category: Exclude<GalerieCategory, "Tous">;
  title: string;
  description?: string;
}

const CATEGORIES: GalerieCategory[] = ["Tous", "Suites", "Chambre", "Gastronomie", "Activités", "Autre"];

// ─── Données placeholder ──────────────────────────────────────────────────────

const IMAGES: GalerieImage[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85", alt: "Suite Nomade - vue intérieure", category: "Suites", title: "Suite Nomade", description: "Un refuge de terre et de lumière au cœur de l'Atlas." },
  { id: "2", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85", alt: "Vue panoramique Atlas", category: "Activités", title: "L'Atlas au lever du jour", description: "Les sommets enneigés surgissent de la brume matinale." },
  { id: "3", src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85", alt: "Jardin intérieur riad", category: "Autre", title: "Patio secret", description: "L'eau, les orangers, l'ombre — un silence rare." },
  { id: "4", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85", alt: "Table gastronomique", category: "Gastronomie", title: "La table des seigneurs", description: "Saveurs berbères revisitées avec une élégance contemporaine." },
  { id: "5", src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=85", alt: "Détail zellige bleu", category: "Suites", title: "Zellige Bleu de Fès", description: "L'art du zellige transmis de génération en génération." },
  { id: "6", src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=85", alt: "Rituel hammam", category: "Activités", title: "Rituel de l'eau", description: "Le hammam traditionnel, au rythme du silence." },
  { id: "7", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=85", alt: "Sentier vers le col", category: "Activités", title: "Le chemin de crête", description: "À chaque virage, l'horizon s'élargit encore." },
  { id: "8", src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=85", alt: "Chambre Safran", category: "Chambre", title: "Chambre Safran", description: "La terrasse privée embrasse la vallée jusqu'au coucher du soleil." },
  { id: "9", src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=85", alt: "Chambre Indigo", category: "Chambre", title: "Chambre Indigo", description: "L'eau se fond dans le panorama de l'Atlas." },
  { id: "10", src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=85", alt: "Tajine aux olives", category: "Gastronomie", title: "Tajine ancestral", description: "Vingt-quatre heures de cuisson lente, mille ans de tradition." },
  { id: "11", src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=85", alt: "Épices du souk", category: "Gastronomie", title: "L'alchimie des épices", description: "Cumin, safran, ras el hanout — la palette du chef." },
  { id: "12", src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=85", alt: "Nuit étoilée", category: "Activités", title: "Vers les sommets", description: "L'expédition commence à l'aube, quand le silence appartient encore aux mulets." },
];

// ─── Variants ────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.3, ease: "easeIn" as const } },
};

// ─── GalerieCell ─────────────────────────────────────────────────────────────

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
      <div className="w-full h-full relative">
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      </div>
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6"
        style={{ background: "linear-gradient(to top, rgba(26,26,26,0.82) 0%, rgba(26,26,26,0.35) 45%, transparent 100%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" as const }}
      >
        <span className="text-xs tracking-[0.25em] uppercase mb-2 block" style={{ color: "#EA580C", fontFamily: "var(--font-inter), sans-serif" }}>{image.category}</span>
        <h3 className="text-white leading-tight mb-1" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 400 }}>{image.title}</h3>
        <motion.span className="text-white/70 text-sm" style={{ fontFamily: "var(--font-inter), sans-serif" }} initial={{ x: -6, opacity: 0 }} animate={{ x: hovered ? 0 : -6, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.25, delay: 0.05 }}>
          Voir →
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

// ─── EditorialCard ────────────────────────────────────────────────────────────

const EDITORIAL_QUOTES = [
  { quote: "Un lieu où le temps retrouve sa lenteur originelle.", attribution: "— Dar Amoudou" },
  { quote: "L'Atlas offre ce que nulle ville ne peut promettre : le silence absolu.", attribution: "— Dar Amoudou" },
  { quote: "Chaque pierre de ces murs a été posée à la main, chaque image raconte une histoire.", attribution: "— Dar Amoudou" },
];

function EditorialCard({ index, style }: { index: number; style?: React.CSSProperties }) {
  const q = EDITORIAL_QUOTES[index % EDITORIAL_QUOTES.length];
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-start justify-center px-8 py-10"
      style={{ backgroundColor: "#1A1A1A", borderRadius: "2px", ...style }}
    >
      <div style={{ width: "32px", height: "1px", backgroundColor: "#EA580C", marginBottom: "1.5rem" }} />
      <blockquote style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", fontWeight: 300, fontStyle: "italic", color: "#FDFBF7", lineHeight: 1.5 }}>
        "{q.quote}"
      </blockquote>
      <p className="mt-4 text-xs tracking-[0.2em] uppercase" style={{ color: "#A3895D", fontFamily: "var(--font-inter), sans-serif" }}>{q.attribution}</p>
    </motion.div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function GalerieGrid() {
  const searchParams = useSearchParams();
  const categorieParam = searchParams.get("categorie") as GalerieCategory | null;

  const [activeCategory, setActiveCategory] = useState<GalerieCategory>(
    categorieParam && CATEGORIES.includes(categorieParam as GalerieCategory) ? categorieParam : "Tous"
  );
  const [lightboxImage, setLightboxImage] = useState<GalerieImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Synchronise si l'URL change (clic depuis le mega menu)
  useEffect(() => {
    if (categorieParam && CATEGORIES.includes(categorieParam as GalerieCategory)) {
      setActiveCategory(categorieParam as GalerieCategory);
      setTimeout(() => {
        document.getElementById("galerie-filtres")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [categorieParam]);

  const filtered = activeCategory === "Tous" ? IMAGES : IMAGES.filter((img) => img.category === activeCategory);

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

  // Layout éditorial
  const chunks: { type: "A" | "B" | "C"; images: GalerieImage[]; editorialIndex?: number }[] = [];
  let cursor = 0;
  let editorialCount = 0;

  while (cursor < filtered.length) {
    const patternIndex = chunks.length % 3;
    if (patternIndex === 0) {
      chunks.push({ type: "A", images: filtered.slice(cursor, cursor + 3) });
      cursor += 3;
    } else if (patternIndex === 1) {
      chunks.push({ type: "B", images: filtered.slice(cursor, cursor + 1), editorialIndex: editorialCount++ });
      cursor += 1;
    } else {
      chunks.push({ type: "C", images: filtered.slice(cursor, cursor + 3) });
      cursor += 3;
    }
  }

  return (
    <>
      {/* Filtres sticky */}
      <div
        id="galerie-filtres"
        className="sticky top-0 z-30 flex items-center justify-center gap-2 py-4 px-4 flex-wrap"
        style={{ backgroundColor: "rgba(253,251,247,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(26,26,26,0.08)" }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="relative px-4 py-1.5 text-xs tracking-[0.15em] uppercase transition-colors duration-300"
            style={{ fontFamily: "var(--font-inter), sans-serif", color: activeCategory === cat ? "#FDFBF7" : "#1A1A1A", borderRadius: "999px", border: "1px solid transparent", cursor: "pointer", background: "none" }}
          >
            <AnimatePresence>
              {activeCategory === cat && (
                <motion.span layoutId="filter-pill" className="absolute inset-0" style={{ backgroundColor: "#1A1A1A", borderRadius: "999px" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
            </AnimatePresence>
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      {/* Grille */}
      <AnimatePresence mode="wait">
        <motion.div key={activeCategory} className="px-4 md:px-8 lg:px-12 py-8 space-y-3" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
          {chunks.map((chunk, chunkIdx) => {
            if (chunk.type === "A" && chunk.images.length > 0) {
              return (
                <div key={`chunk-${chunkIdx}`} className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ gridTemplateRows: "240px 240px" }}>
                  {chunk.images[0] && <GalerieCell image={chunk.images[0]} onClick={openLightbox} className="row-span-2" style={{ height: "483px" }} />}
                  {chunk.images[1] && <GalerieCell image={chunk.images[1]} onClick={openLightbox} style={{ height: "240px" }} />}
                  {chunk.images[2] && <GalerieCell image={chunk.images[2]} onClick={openLightbox} style={{ height: "240px" }} />}
                </div>
              );
            }
            if (chunk.type === "B") {
              return (
                <div key={`chunk-${chunkIdx}`} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <EditorialCard index={chunk.editorialIndex ?? 0} style={{ height: "340px" }} />
                  {chunk.images[0] && <GalerieCell image={chunk.images[0]} onClick={openLightbox} className="md:col-span-2" style={{ height: "340px" }} />}
                </div>
              );
            }
            if (chunk.type === "C" && chunk.images.length > 0) {
              return (
                <div key={`chunk-${chunkIdx}`} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {chunk.images.map((img) => <GalerieCell key={img.id} image={img} onClick={openLightbox} style={{ height: "280px" }} />)}
                </div>
              );
            }
            return null;
          })}

          {filtered.length === 0 && (
            <motion.div className="flex flex-col items-center justify-center py-32 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.4rem", fontStyle: "italic", color: "#A3895D" }}>Aucune image dans cette catégorie.</p>
              <button onClick={() => setActiveCategory("Tous")} className="mt-4 text-xs tracking-[0.2em] uppercase underline underline-offset-4" style={{ color: "#1A1A1A", fontFamily: "var(--font-inter), sans-serif" }}>
                Voir tout
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <Lightbox image={lightboxImage} onClose={closeLightbox} onNext={goNext} onPrev={goPrev} currentIndex={lightboxIndex} total={filtered.length} />
    </>
  );
}

"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { GalerieImage } from "./GalerieGrid";

// ─── Props ───────────────────────────────────────────────────────────────────

interface LightboxProps {
  image: GalerieImage | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  total: number;
}

// ─── Variants Framer Motion ──────────────────────────────────────────────────

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.35, ease: "easeIn" } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const infoVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: 0.2 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ─── Composant ───────────────────────────────────────────────────────────────

export default function Lightbox({
  image,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  total,
}: LightboxProps) {
  // Navigation clavier
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!image) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [image, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Blocage du scroll body
  useEffect(() => {
    if (image) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [image]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          key="lightbox-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: "rgba(10, 10, 10, 0.97)" }}
          // Clic sur l'overlay → ferme
          onClick={onClose}
        >
          {/* ── Barre supérieure ──────────────────────────────────────────── */}
          <div
            className="flex items-center justify-between px-6 py-5 flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Compteur */}
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{
                color: "rgba(253,251,247,0.45)",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {String(currentIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;
              {String(total).padStart(2, "0")}
            </span>

            {/* Logo texte centré */}
            <span
              className="absolute left-1/2 -translate-x-1/2 text-sm tracking-[0.35em] uppercase"
              style={{
                color: "rgba(253,251,247,0.5)",
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 300,
                letterSpacing: "0.35em",
              }}
            >
              Dar Amoudou
            </span>

            {/* Bouton fermer */}
            <button
              onClick={onClose}
              aria-label="Fermer la galerie"
              className="flex items-center gap-2 group"
            >
              <span
                className="text-xs tracking-[0.2em] uppercase transition-opacity duration-200 group-hover:opacity-70"
                style={{
                  color: "rgba(253,251,247,0.6)",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                Fermer
              </span>
              {/* Icône × en SVG */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-opacity duration-200 group-hover:opacity-70"
              >
                <path
                  d="M2 2L14 14M14 2L2 14"
                  stroke="rgba(253,251,247,0.7)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* ── Zone image principale ─────────────────────────────────────── */}
          <div
            className="flex-1 flex items-center justify-center px-4 md:px-16 py-4 relative min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton Précédent */}
            <button
              onClick={onPrev}
              aria-label="Image précédente"
              className="absolute left-4 md:left-8 z-10 flex items-center justify-center w-10 h-10 group"
            >
              <motion.div
                whileHover={{ x: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 19L8 12L15 5"
                    stroke="rgba(253,251,247,0.65)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-[rgba(253,251,247,1)] transition-all duration-200"
                  />
                </svg>
              </motion.div>
            </button>

            {/* Image avec transition layoutId */}
            <AnimatePresence mode="wait">
              <motion.div
                key={image.id}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full h-full flex items-center justify-center"
                style={{ maxWidth: "860px" }}
              >
                <div
                  className="relative w-full"
                  style={{ maxHeight: "calc(100vh - 240px)", aspectRatio: "4/3" }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 860px"
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bouton Suivant */}
            <button
              onClick={onNext}
              aria-label="Image suivante"
              className="absolute right-4 md:right-8 z-10 flex items-center justify-center w-10 h-10 group"
            >
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="rgba(253,251,247,0.65)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-[rgba(253,251,247,1)] transition-all duration-200"
                  />
                </svg>
              </motion.div>
            </button>
          </div>

          {/* ── Barre inférieure — infos image ────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={image.id + "-info"}
              variants={infoVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-shrink-0 flex flex-col items-center text-center pb-8 px-8 gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Catégorie */}
              <span
                className="text-xs tracking-[0.25em] uppercase"
                style={{
                  color: "#EA580C",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {image.category}
              </span>

              {/* Titre */}
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(1.3rem, 3vw, 2rem)",
                  fontWeight: 300,
                  color: "#FDFBF7",
                  lineHeight: 1.3,
                }}
              >
                {image.title}
              </h2>

              {/* Description */}
              {image.description && (
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(253,251,247,0.5)",
                    maxWidth: "420px",
                    lineHeight: 1.65,
                  }}
                >
                  {image.description}
                </p>
              )}

              {/* Trait + dots navigation ────────────────────────── */}
              <div className="flex items-center gap-1.5 mt-3">
                {Array.from({ length: Math.min(total, 12) }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === currentIndex % 12 ? "16px" : "4px",
                      height: "3px",
                      borderRadius: "999px",
                      backgroundColor:
                        i === currentIndex % 12
                          ? "#EA580C"
                          : "rgba(253,251,247,0.25)",
                      transition: "all 0.35s ease",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

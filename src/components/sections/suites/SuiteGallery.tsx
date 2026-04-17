"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SuiteGalleryProps {
  images: { src: string; alt: string }[];
  name: string;
  heroOnly?: boolean;
}

export default function SuiteGallery({ images, name, heroOnly = false }: SuiteGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const [heroImg, ...restImgs] = images;

  return (
    <>
      {/* ── Hero pleine largeur + sidebar flottante ─────────────────────── */}
      <div className="relative w-full" style={{ height: "90vh", minHeight: "520px" }}>

        {/* Image hero 100% */}
        <motion.div
          className="absolute inset-0 cursor-zoom-in overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setLightbox(0)}
        >
          <Image
            src={heroImg.src}
            alt={heroImg.alt}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            priority
          />
          {/* Overlay dégradé bas-droite pour lisibilité sidebar */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top left, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.3) 40%, transparent 65%)",
            }}
          />
        </motion.div>

        {/* Breadcrumb haut gauche */}
        <div
          className="absolute top-6 left-6 z-10 flex items-center gap-2"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          <a
            href="/suites"
            className="text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-60"
            style={{ color: "rgba(253,251,247,0.7)" }}
          >
            Suites
          </a>
          <span style={{ color: "rgba(253,251,247,0.35)", fontSize: "10px" }}>/</span>
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "rgba(253,251,247,0.45)" }}
          >
            {name}
          </span>
        </div>

        {/* Compteur photo haut droite */}
        <div
          className="absolute top-6 right-6 z-10 text-xs tracking-[0.2em]"
          style={{
            color: "rgba(253,251,247,0.45)",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          01 / {String(images.length).padStart(2, "0")}
        </div>

      </div>

      {/* ── Images suivantes — uniquement si pas heroOnly ── */}
      {!heroOnly && (
        <div className="flex flex-col gap-1">
          {restImgs.map((img, i) => (
          <motion.div
            key={i + 1}
            className="relative w-full overflow-hidden cursor-zoom-in"
            style={{ height: "65vh", minHeight: "320px" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: (i + 1) * 0.1,
            }}
            onClick={() => setLightbox(i + 1)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            {/* Numéro */}
            <div
              className="absolute bottom-4 right-5 text-xs tracking-[0.2em]"
              style={{
                color: "rgba(253,251,247,0.45)",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {String(i + 2).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>

            {/* Loupe hover */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: "rgba(26,26,26,0.12)" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(253,251,247,0.12)",
                  backdropFilter: "blur(8px)",
                  border: "0.5px solid rgba(253,251,247,0.3)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="4.5" stroke="rgba(253,251,247,0.8)" strokeWidth="1"/>
                  <path d="M10.5 10.5L14 14" stroke="rgba(253,251,247,0.8)" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M7 5v4M5 7h4" stroke="rgba(253,251,247,0.8)" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      )}

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ backgroundColor: "rgba(10,10,10,0.96)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-xs tracking-[0.2em] uppercase flex items-center gap-2"
              style={{ color: "rgba(253,251,247,0.6)", fontFamily: "var(--font-inter), sans-serif" }}
              onClick={() => setLightbox(null)}
            >
              Fermer
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>

            <button
              className="absolute left-6 top-1/2 -translate-y-1/2"
              onClick={(e) => { e.stopPropagation(); setLightbox((p) => p === null ? 0 : (p - 1 + images.length) % images.length); }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 19L8 12L15 5" stroke="rgba(253,251,247,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <motion.div
              key={lightbox}
              className="relative"
              style={{ width: "min(90vw, 960px)", height: "min(80vh, 640px)" }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightbox].src}
                alt={images[lightbox].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <p
              className="absolute bottom-8 text-xs tracking-[0.25em]"
              style={{ color: "rgba(253,251,247,0.35)", fontFamily: "var(--font-inter), sans-serif" }}
            >
              {String((lightbox ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>

            <button
              className="absolute right-6 top-1/2 -translate-y-1/2"
              onClick={(e) => { e.stopPropagation(); setLightbox((p) => p === null ? 0 : (p + 1) % images.length); }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 5L16 12L9 19" stroke="rgba(253,251,247,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

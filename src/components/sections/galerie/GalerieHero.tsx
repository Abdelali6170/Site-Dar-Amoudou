"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// ─── Variants ────────────────────────────────────────────────────────────────

const lineVariant = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.6 },
  },
};

const titleVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

const subtitleVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, delay: 0.8 },
  },
};

const scrollCueVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 1.4 },
  },
};

// ─── Composant ───────────────────────────────────────────────────────────────

export default function GalerieHero() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-end overflow-hidden"
      style={{ height: "92vh", minHeight: "520px" }}
    >
      {/* Image de fond */}
      <Image
        src="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1800&q=85"
        alt="Vue aérienne de la vallée de l'Atlas au coucher du soleil"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay dégradé */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.45) 40%, rgba(10,10,10,0.15) 100%)",
        }}
      />

      {/* Contenu texte */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center pb-20 px-6 w-full"
        initial="hidden"
        animate="visible"
      >
        {/* Trait horizontal animé */}
        <motion.div
          variants={lineVariant}
          className="mb-6"
          style={{
            width: "40px",
            height: "1px",
            backgroundColor: "#EA580C",
          }}
        />

        {/* Titre principal */}
        <motion.h1
          variants={titleVariant}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            letterSpacing: "0.12em",
            color: "#FDFBF7",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          Galerie
        </motion.h1>

        {/* Sous-titre catégories */}
        <motion.p
          variants={subtitleVariant}
          className="mt-4 text-xs tracking-[0.35em] uppercase"
          style={{
            color: "rgba(253,251,247,0.55)",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          Suites &nbsp;·&nbsp; Jardins &nbsp;·&nbsp; Gastronomie &nbsp;·&nbsp; Atlas
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        variants={scrollCueVariant}
        initial="hidden"
        animate="visible"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{
            color: "rgba(253,251,247,0.35)",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          Défiler
        </span>
        {/* Chevron animé */}
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1L6 6L11 1"
              stroke="rgba(253,251,247,0.35)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

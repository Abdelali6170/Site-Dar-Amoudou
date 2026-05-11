"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ExperiencesHero() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-end overflow-hidden"
      style={{ height: "75vh", minHeight: "480px" }}
    >
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85"
        alt="Les sommets de l'Atlas marocain"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay — classe globale */}
      <div className="hero-overlay" />

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center text-center pb-16 px-6 w-full">
        {/* Numéro décoratif */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(5rem, 15vw, 12rem)",
            fontWeight: 300,
            color: "rgba(253,251,247,0.06)",
            lineHeight: 1,
            position: "absolute",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            letterSpacing: "0.05em",
          }}
        >
          EXPÉRIENCES
        </motion.span>

        <motion.div
          className="mb-6"
          style={{ width: "32px", height: "1px", backgroundColor: "#EA580C" }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
          className="hero-title"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            letterSpacing: "0.08em",
            color: "#FDFBF7",
            lineHeight: 1.05,
            textTransform: "uppercase",
          }}
        >
          Vivre l'Atlas
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hero-subtitle mt-4 text-xs tracking-[0.3em] uppercase"
          style={{
            color: "#FDFBF7",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          Trek &nbsp;·&nbsp; Cuisine &nbsp;·&nbsp; Bien-être &nbsp;·&nbsp; Culture &nbsp;·&nbsp; Astronomie
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-10 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="rgba(253,251,247,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

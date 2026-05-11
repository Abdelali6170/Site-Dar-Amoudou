"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactHero() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-end overflow-hidden"
      style={{ height: "55vh", minHeight: "380px" }}
    >
      <Image
        src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1800&q=85"
        alt="Patio de Dar Amoudou"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay — classe globale */}
      <div className="hero-overlay" />

      <div className="relative z-10 flex flex-col items-center text-center pb-14 px-6">
        <motion.div
          style={{ width: "32px", height: "1px", backgroundColor: "#EA580C" }}
          className="mb-6"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
          className="hero-title"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            fontSize: "clamp(3rem, 7vw, 6rem)",
            letterSpacing: "0.1em",
            color: "#FDFBF7",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          Contact
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="hero-subtitle mt-4 text-xs tracking-[0.3em] uppercase"
          style={{
            color: "#FDFBF7",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          Réservation &nbsp;·&nbsp; Renseignements &nbsp;·&nbsp; Événements privés
        </motion.p>
      </div>
    </section>
  );
}

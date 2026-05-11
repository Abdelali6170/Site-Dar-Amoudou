"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ChambresHero() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-end overflow-hidden"
      style={{ height: "70vh", minHeight: "460px" }}
    >
      <Image
        src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1800&q=85"
        alt="Chambre de Dar Amoudou"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="hero-overlay" />

      <div className="relative z-10 flex flex-col items-center text-center pb-16 px-6 w-full">
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
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            letterSpacing: "0.1em",
            color: "#FDFBF7",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          Nos Chambres
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
          Trois chambres &nbsp;·&nbsp; Un Atlas &nbsp;·&nbsp; L'authenticité
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1L6 6L11 1"
              stroke="rgba(253,251,247,0.6)"
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

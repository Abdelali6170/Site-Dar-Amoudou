"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import type { Suite } from "../../../lib/suites";

interface SuiteAmbianceProps {
  suite: Suite;
}

export default function SuiteAmbiance({ suite }: SuiteAmbianceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} style={{ backgroundColor: "#1A1A1A" }}>

      {/* ── Bloc citation immersive ──────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: "60vh", minHeight: "400px" }}>
        {/* Image de fond — dernière photo de la suite */}
        <Image
          src={suite.images[suite.images.length - 1]?.src ?? suite.images[0].src}
          alt={`Ambiance ${suite.name}`}
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay sombre */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(26,26,26,1) 0%, rgba(26,26,26,0.6) 50%, rgba(26,26,26,0.2) 100%)",
          }}
        />

        {/* Trait orange centré */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ width: "1px", backgroundColor: "#EA580C", originY: 1 }}
          initial={{ height: 0 }}
          animate={inView ? { height: "80px" } : { height: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>

      {/* ── Texte immersif ───────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 py-20 flex flex-col gap-12">

        {/* Titre de section */}
        <motion.div
          className="flex flex-col items-center text-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#EA580C", fontFamily: "var(--font-inter), sans-serif" }}
          >
            L'atmosphère
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "#FDFBF7",
              lineHeight: 1.2,
            }}
          >
            {suite.name}
          </h2>
        </motion.div>

        {/* Citation ambiance */}
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-center"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(253,251,247,0.75)",
            lineHeight: 1.7,
          }}
        >
          "{suite.ambiance}"
        </motion.blockquote>

        {/* Séparateur */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(253,251,247,0.1)" }} />
          <span style={{ color: "#A3895D", fontSize: "18px" }}>✦</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(253,251,247,0.1)" }} />
        </motion.div>

        {/* Description longue */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.8 }}
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.85,
            color: "rgba(253,251,247,0.55)",
            textAlign: "center",
          }}
        >
          {suite.longDescription}
        </motion.p>
      </div>

      {/* ── Navigation — retour + suites adjacentes ──────────────────── */}
      <motion.div
        className="px-6 pb-16 flex flex-col items-center gap-8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
      >
        {/* Séparateur */}
        <div style={{ width: "100%", maxWidth: "640px", height: "1px", backgroundColor: "rgba(253,251,247,0.08)" }} />

        <div className="flex flex-wrap items-center justify-center gap-6">
          {/* Retour aux suites */}
          <a
            href="/suites"
            className="flex items-center gap-2 group"
            style={{ textDecoration: "none" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H2M7 2L2 7l5 5" stroke="rgba(253,251,247,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[rgba(253,251,247,0.8)] transition-all"/>
            </svg>
            <span
              className="text-xs tracking-[0.2em] uppercase transition-colors duration-300"
              style={{
                color: "rgba(253,251,247,0.4)",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              Toutes les suites
            </span>
          </a>

          <span style={{ color: "rgba(253,251,247,0.15)", fontSize: "10px" }}>|</span>

          {/* CTA réservation */}
          <a
            href="/contact"
            className="group flex items-center gap-2"
            style={{ textDecoration: "none" }}
          >
            <span
              className="text-xs tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-orange-500"
              style={{
                color: "#EA580C",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              Réserver {suite.name}
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="#EA580C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

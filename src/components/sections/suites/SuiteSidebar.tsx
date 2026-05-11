"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Suite } from "../../../lib/suites";

// ─── Icônes SVG inline pour les équipements ──────────────────────────────────

const ICONS: Record<string, React.ReactElement> = {
  bed: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7v13M21 7v13M3 13h18M7 13V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"/>
    </svg>
  ),
  bath: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6L9 3.5a1.5 1.5 0 0 1 3 0V6"/><ellipse cx="12" cy="14" rx="9" ry="5"/><path d="M5 19l-1 2M19 19l1 2"/>
    </svg>
  ),
  terrace: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V9l7-6 7 6v12"/><path d="M10 21V15h4v6"/>
    </svg>
  ),
  fire: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.5 6 4 10 4 14a8 8 0 0 0 16 0c0-3.5-1.5-6.5-4-10-1 3-2 4-4 4s-2-2-2-4 2-4 2-4z"/>
    </svg>
  ),
  wifi: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>
    </svg>
  ),
  breakfast: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><path d="M6 1v3M10 1v3M14 1v3"/>
    </svg>
  ),
  minibar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2l1.88 1.88M14.12 3.88 16 2M9 7.13v6.61a4 4 0 1 0 6 0V7.13"/><path d="M8 7h8"/>
    </svg>
  ),
  concierge: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10M12 20V4M6 20v-6"/>
    </svg>
  ),
  pool: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h20M2 17c2 2 4 2 6 0s4-2 6 0 4 2 6 0M2 7l4-4 4 4 4-4 4 4"/>
    </svg>
  ),
  telescope: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 16l-3 5M14 16l3 5M12 16v-4M3 5l18 4-4 5-14-9z"/>
    </svg>
  ),
  dinner: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
    </svg>
  ),
};

// ─── Composant ───────────────────────────────────────────────────────────────

interface SuiteSidebarProps {
  suite: Suite;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

export default function SuiteSidebar({ suite }: SuiteSidebarProps) {
  return (
    <aside
      className="flex flex-col"
      style={{
        backgroundColor: "#FDFBF7",
        borderLeft: "1px solid rgba(26,26,26,0.08)",
        borderBottom: "1px solid rgba(26,26,26,0.08)",
      }}
    >
      <div className="px-6 py-8 md:px-8 flex flex-col gap-7 min-h-full">

        {/* ── En-tête ──────────────────────────────────────────────────── */}
        <div>
          {/* Trait + catégorie */}
          <motion.div
            className="flex items-center gap-3 mb-5"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div style={{ width: "24px", height: "1px", backgroundColor: "#EA580C" }} />
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: "#EA580C", fontFamily: "var(--font-inter), sans-serif" }}
            >
              Suite privée
            </span>
          </motion.div>

          {/* Nom */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#1A1A1A",
            }}
          >
            {suite.name}
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-2"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#A3895D",
            }}
          >
            {suite.subtitle}
          </motion.p>
        </div>

        {/* ── Prix ─────────────────────────────────────────────────────── */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-baseline gap-2"
          style={{ borderTop: "1px solid rgba(26,26,26,0.08)", paddingTop: "1.25rem" }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "2.2rem",
              fontWeight: 300,
              color: "#1A1A1A",
            }}
          >
            {suite.priceFrom.toLocaleString("fr-FR")} €
          </span>
          <span
            className="text-xs tracking-[0.15em] uppercase"
            style={{ color: "#A3895D", fontFamily: "var(--font-inter), sans-serif" }}
          >
            / nuit
          </span>
        </motion.div>

        {/* ── Description courte ───────────────────────────────────────── */}
        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.875rem",
            lineHeight: 1.75,
            color: "rgba(26,26,26,0.7)",
          }}
        >
          {suite.description}
        </motion.p>

        {/* ── Détails clés ─────────────────────────────────────────────── */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-x-4 gap-y-4"
          style={{ borderTop: "1px solid rgba(26,26,26,0.08)", paddingTop: "1.25rem" }}
        >
          {suite.details.map((d) => (
            <div key={d.label}>
              <p
                className="text-xs tracking-[0.15em] uppercase mb-1"
                style={{ color: "#A3895D", fontFamily: "var(--font-inter), sans-serif" }}
              >
                {d.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: "#1A1A1A",
                }}
              >
                {d.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Équipements ──────────────────────────────────────────────── */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ borderTop: "1px solid rgba(26,26,26,0.08)", paddingTop: "1.25rem" }}
        >
          <p
            className="text-xs tracking-[0.2em] uppercase mb-3"
            style={{ color: "#A3895D", fontFamily: "var(--font-inter), sans-serif" }}
          >
            Équipements
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {suite.amenities.map((a) => (
              <div key={a.label} className="flex items-center gap-2.5">
                <span style={{ color: "#A3895D", flexShrink: 0 }}>
                  {ICONS[a.icon] ?? ICONS.concierge}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(26,26,26,0.75)",
                  }}
                >
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <motion.div
          custom={7}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3 mt-auto"
          style={{ borderTop: "1px solid rgba(26,26,26,0.08)", paddingTop: "1.25rem" }}
        >
          {/* Bouton principal */}
          <a
            href="/contact"
            className="group relative flex items-center justify-center gap-3 py-4 px-6 overflow-hidden"
            style={{ backgroundColor: "#1A1A1A", borderRadius: "2px", textDecoration: "none" }}
          >
            <span
              className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
              style={{ backgroundColor: "#EA580C" }}
            />
            <span
              className="relative text-xs tracking-[0.25em] uppercase"
              style={{ color: "#FDFBF7", fontFamily: "var(--font-inter), sans-serif" }}
            >
              Réserver cette suite
            </span>
            <svg className="relative" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="#FDFBF7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Lien secondaire */}
          <a
            href="/contact"
            className="flex items-center justify-center py-3 px-6 transition-colors duration-300 hover:bg-black/5"
            style={{ border: "1px solid rgba(26,26,26,0.15)", borderRadius: "2px", textDecoration: "none" }}
          >
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: "rgba(26,26,26,0.6)", fontFamily: "var(--font-inter), sans-serif" }}
            >
              Demander un devis
            </span>
          </a>

          {/* Mention rassurante */}
          <p
            className="text-center text-xs"
            style={{ color: "rgba(26,26,26,0.4)", fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.6 }}
          >
            Annulation gratuite jusqu'à 48h avant l'arrivée
          </p>
        </motion.div>
      </div>
    </aside>
  );
}

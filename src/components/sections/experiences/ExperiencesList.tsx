"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Experience, ExperienceTag } from "../../../lib/experiences";
import { TAGS } from "../../../lib/experiences";

// ─── Couleurs par tag ─────────────────────────────────────────────────────────

const TAG_COLORS: Record<string, string> = {
  Aventure: "#EA580C",
  Culture: "#A3895D",
  Gastronomie: "#8B6914",
  "Bien-être": "#5B7F6E",
  Nature: "#4A6741",
};

// ─── Card expérience ──────────────────────────────────────────────────────────

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);
  const isReversed = index % 2 !== 0;

  return (
    <div
      ref={ref}
      style={{ borderBottom: "1px solid rgba(26,26,26,0.08)" }}
    >
      <div
        className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}
        style={{ minHeight: "520px" }}
      >
        {/* ── Colonne image ── */}
        <motion.div
          className="relative overflow-hidden w-full lg:w-[55%] flex-shrink-0"
          initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.1, ease: "easeOut" as const }}
        >
          <div className="relative w-full" style={{ minHeight: "320px", height: "100%" }}>
            <Image
              src={experience.image}
              alt={experience.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.04]"
            />

            {/* Numéro éditorial en surimpression */}
            <div
              className="absolute bottom-5 left-6 select-none"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "7rem",
                fontWeight: 300,
                color: "rgba(253,251,247,0.1)",
                lineHeight: 1,
              }}
            >
              {experience.numero}
            </div>

            {/* Badge tag */}
            <div
              className="absolute top-5 left-5 px-3 py-1.5"
              style={{
                backgroundColor: TAG_COLORS[experience.tag] ?? "#EA580C",
                borderRadius: "2px",
              }}
            >
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: "#FDFBF7", fontFamily: "var(--font-inter), sans-serif" }}
              >
                {experience.tag}
              </span>
            </div>

            {/* Méta durée + saison en bas */}
            <div
              className="absolute bottom-5 right-5 flex flex-col items-end gap-1"
            >
              <span
                className="text-xs tracking-[0.15em] uppercase px-2 py-1"
                style={{
                  backgroundColor: "rgba(10,10,10,0.65)",
                  backdropFilter: "blur(8px)",
                  color: "rgba(253,251,247,0.8)",
                  fontFamily: "var(--font-inter), sans-serif",
                  borderRadius: "2px",
                }}
              >
                {experience.duree}
              </span>
              <span
                className="text-xs tracking-[0.12em] px-2 py-1"
                style={{
                  backgroundColor: "rgba(10,10,10,0.65)",
                  backdropFilter: "blur(8px)",
                  color: "rgba(253,251,247,0.55)",
                  fontFamily: "var(--font-inter), sans-serif",
                  borderRadius: "2px",
                }}
              >
                {experience.saison}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Colonne contenu ── */}
        <motion.div
          className="flex flex-col justify-center px-8 py-12 lg:px-12 w-full lg:w-[45%]"
          style={{ flex: "none", backgroundColor: "#FDFBF7" }}
          initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.1, ease: "easeOut" as const, delay: 0.08 }}
        >
          {/* Numéro + catégorie */}
          <div className="flex items-center gap-3 mb-5">
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "0.9rem",
                fontWeight: 300,
                color: "#A3895D",
              }}
            >
              {experience.numero}
            </span>
            <div style={{ width: "20px", height: "1px", backgroundColor: "#EA580C" }} />
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: "#EA580C", fontFamily: "var(--font-inter), sans-serif" }}
            >
              {experience.categorie}
            </span>
          </div>

          {/* Titre */}
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(2rem, 3vw, 2.8rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#1A1A1A",
            }}
          >
            {experience.titre}
          </h2>

          {/* Sous-titre */}
          <p
            className="mt-2 mb-6"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.05rem",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#A3895D",
            }}
          >
            {experience.sousTitre}
          </p>

          {/* Description */}
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.875rem",
              lineHeight: 1.85,
              color: "rgba(26,26,26,0.68)",
            }}
          >
            {experience.description}
          </p>

          {/* Détails expandables */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" as const }}
                className="overflow-hidden"
              >
                {/* Texte détaillé */}
                <p
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.85rem",
                    lineHeight: 1.85,
                    color: "rgba(26,26,26,0.55)",
                  }}
                >
                  {experience.details}
                </p>

                {/* Ce qui est inclus */}
                <div
                  className="mb-6"
                  style={{
                    borderTop: "1px solid rgba(26,26,26,0.08)",
                    paddingTop: "1.25rem",
                  }}
                >
                  <p
                    className="text-xs tracking-[0.2em] uppercase mb-3"
                    style={{ color: "#A3895D", fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Inclus
                  </p>
                  <ul className="flex flex-col gap-2">
                    {experience.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span style={{ color: "#EA580C", marginTop: "1px", flexShrink: 0 }}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1 5l3 3 5-7" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            fontSize: "0.8rem",
                            color: "rgba(26,26,26,0.7)",
                            lineHeight: 1.5,
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Difficulté si applicable */}
                {experience.difficulte && (
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="text-xs tracking-[0.15em] uppercase"
                      style={{ color: "#A3895D", fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Niveau
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "0.95rem",
                        color: "#1A1A1A",
                      }}
                    >
                      {experience.difficulte}
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center gap-5 mt-2">
            {/* Bouton détails */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 group"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <span
                className="text-xs tracking-[0.2em] uppercase transition-opacity duration-300 group-hover:opacity-60"
                style={{ color: "rgba(26,26,26,0.55)", fontFamily: "var(--font-inter), sans-serif" }}
              >
                {expanded ? "Réduire" : "En savoir plus"}
              </span>
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="rgba(26,26,26,0.45)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>

            <div style={{ width: "1px", height: "16px", backgroundColor: "rgba(26,26,26,0.12)" }} />

            {/* CTA Réserver */}
            <Link
              href="/contact"
              className="group relative flex items-center gap-2 py-3 px-6 overflow-hidden"
              style={{
                backgroundColor: "#1A1A1A",
                borderRadius: "2px",
                textDecoration: "none",
              }}
            >
              <span
                className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ backgroundColor: "#EA580C" }}
              />
              <span
                className="relative text-xs tracking-[0.2em] uppercase"
                style={{ color: "#FDFBF7", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Réserver
              </span>
              <svg
                className="relative transition-transform duration-300 group-hover:translate-x-0.5"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path
                  d="M1 5h8M5 1l4 4-4 4"
                  stroke="#FDFBF7"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

interface ExperiencesListProps {
  experiences: Experience[];
}

export default function ExperiencesList({ experiences }: ExperiencesListProps) {
  const [activeTag, setActiveTag] = useState<ExperienceTag>("Tous");

  const filtered =
    activeTag === "Tous"
      ? experiences
      : experiences.filter((e) => e.tag === activeTag);

  return (
    <section style={{ backgroundColor: "#FDFBF7" }}>

      {/* ── Intro éditoriale ── */}
      <div
        className="flex flex-col items-center text-center px-6 py-16"
        style={{ borderBottom: "1px solid rgba(26,26,26,0.08)" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-xs tracking-[0.3em] uppercase mb-5"
          style={{ color: "#EA580C", fontFamily: "var(--font-inter), sans-serif" }}
        >
          Cinq chemins vers l'essentiel
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
            fontWeight: 300,
            color: "#1A1A1A",
            lineHeight: 1.3,
            maxWidth: "580px",
          }}
        >
          Chaque expérience est une invitation à habiter l'Atlas autrement
        </motion.h2>
      </div>

      {/* ── Filtres ── */}
      <div
        className="sticky top-0 z-30 flex items-center justify-center gap-2 py-4 px-4 flex-wrap"
        style={{
          backgroundColor: "rgba(253,251,247,0.93)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(26,26,26,0.08)",
        }}
      >
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className="relative px-4 py-1.5 text-xs tracking-[0.15em] uppercase transition-colors duration-300"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              color: activeTag === tag ? "#FDFBF7" : "rgba(26,26,26,0.6)",
              borderRadius: "999px",
              border: "1px solid transparent",
              cursor: "pointer",
              background: "none",
            }}
          >
            <AnimatePresence>
              {activeTag === tag && (
                <motion.span
                  layoutId="exp-filter-pill"
                  className="absolute inset-0"
                  style={{ backgroundColor: "#1A1A1A", borderRadius: "999px" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{tag}</span>
          </button>
        ))}
      </div>

      {/* ── Cards ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center">
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1.4rem",
                  fontStyle: "italic",
                  color: "#A3895D",
                }}
              >
                Aucune expérience dans cette catégorie.
              </p>
              <button
                onClick={() => setActiveTag("Tous")}
                className="mt-4 text-xs tracking-[0.2em] uppercase underline underline-offset-4"
                style={{ color: "rgba(26,26,26,0.5)", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Voir tout
              </button>
            </div>
          ) : (
            filtered.map((exp, i) => (
              <ExperienceCard key={exp.id} experience={exp} index={i} />
            ))
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── CTA final ── */}
      <div
        className="flex flex-col items-center text-center py-20 px-6"
        style={{ borderTop: "1px solid rgba(26,26,26,0.08)" }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "#EA580C", fontFamily: "var(--font-inter), sans-serif" }}
        >
          Sur mesure
        </p>
        <h3
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 300,
            color: "#1A1A1A",
            marginBottom: "0.75rem",
            maxWidth: "480px",
          }}
        >
          Une expérience que vous n'avez pas trouvée ici ?
        </h3>
        <p
          className="mb-8"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.875rem",
            color: "rgba(26,26,26,0.55)",
            maxWidth: "380px",
            lineHeight: 1.7,
          }}
        >
          Nous concevons des programmes entièrement personnalisés — itinéraires
          privés, célébrations, retraites.
        </p>
        <Link
          href="/contact"
          className="group relative flex items-center gap-3 py-4 px-8 overflow-hidden"
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
            Nous contacter
          </span>
          <svg className="relative" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M1 6h10M6 1l5 5-5 5"
              stroke="#FDFBF7"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}

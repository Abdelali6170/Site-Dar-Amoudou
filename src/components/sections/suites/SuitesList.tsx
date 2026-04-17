"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Suite } from "../../../lib/suites";

// ─── Props ───────────────────────────────────────────────────────────────────

interface SuitesListProps {
  suites: Suite[];
}

// ─── Card individuelle ────────────────────────────────────────────────────────

interface SuiteCardProps {
  suite: Suite;
  index: number;
}

function SuiteCard({ suite, index }: SuiteCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Alternance : image gauche (pair) / image droite (impair)
  const isReversed = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{
        borderBottom: "1px solid rgba(26,26,26,0.08)",
      }}
    >
      <div
        className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}
        style={{ minHeight: "560px" }}
      >
        {/* ── Colonne image ── */}
        <motion.div
          className="relative overflow-hidden w-full lg:w-[58%] flex-shrink-0"
          initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" as const }}
        >
          {/* Image principale */}
          <div className="relative w-full" style={{ minHeight: "320px", height: "100%" }}>
            <Image
              src={suite.images[0].src}
              alt={suite.images[0].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Numéro de suite en grand — décoratif */}
            <div
              className="absolute top-6 left-6 select-none"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "6rem",
                fontWeight: 300,
                color: "rgba(253,251,247,0.12)",
                lineHeight: 1,
              }}
            >
              0{index + 1}
            </div>

            {/* Badge prix */}
            <div
              className="absolute bottom-6 right-6 px-4 py-2"
              style={{
                backgroundColor: "rgba(253,251,247,0.92)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  color: "#1A1A1A",
                }}
              >
                À partir de {suite.priceFrom.toLocaleString("fr-FR")} €
              </span>
              <span
                className="ml-1 text-xs"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  color: "#A3895D",
                }}
              >
                / nuit
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Colonne contenu ── */}
        <motion.div
          className="flex flex-col justify-center px-8 py-12 lg:px-14 w-full lg:w-[42%]"
          style={{ backgroundColor: "#FDFBF7" }}
          initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" as const, delay: 0.1 }}
        >
          {/* Trait + catégorie */}
          <div className="flex items-center gap-3 mb-6">
            <div
              style={{ width: "24px", height: "1px", backgroundColor: "#EA580C" }}
            />
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{
                color: "#EA580C",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              Suite privée
            </span>
          </div>

          {/* Nom */}
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "#1A1A1A",
            }}
          >
            {suite.name}
          </h2>

          {/* Sous-titre */}
          <p
            className="mt-2 mb-6"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#A3895D",
            }}
          >
            {suite.subtitle}
          </p>

          {/* Description */}
          <p
            className="mb-8"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.875rem",
              lineHeight: 1.8,
              color: "rgba(26,26,26,0.65)",
            }}
          >
            {suite.description}
          </p>

          {/* Specs clés */}
          <div
            className="grid grid-cols-2 gap-x-6 gap-y-4 mb-10"
            style={{
              borderTop: "1px solid rgba(26,26,26,0.08)",
              paddingTop: "1.5rem",
            }}
          >
            {[
              { label: "Surface", value: `${suite.surface} m²` },
              { label: "Altitude", value: suite.altitude },
              { label: "Vue", value: suite.view },
              { label: "Capacité", value: `${suite.capacity} pers.` },
            ].map((spec) => (
              <div key={spec.label}>
                <p
                  className="text-xs tracking-[0.15em] uppercase mb-1"
                  style={{
                    color: "#A3895D",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  {spec.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1rem",
                    color: "#1A1A1A",
                  }}
                >
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            {/* Bouton principal */}
            <Link
              href={`/suites/${suite.slug}`}
              className="group relative flex items-center gap-3 py-3.5 px-7 overflow-hidden"
              style={{
                backgroundColor: "#1A1A1A",
                borderRadius: "2px",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              {/* Hover fill orange */}
              <span
                className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ backgroundColor: "#EA580C" }}
              />
              <span
                className="relative text-xs tracking-[0.2em] uppercase"
                style={{
                  color: "#FDFBF7",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                Découvrir
              </span>
              <svg
                className="relative transition-transform duration-300 group-hover:translate-x-1"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M1 6h10M6 1l5 5-5 5"
                  stroke="#FDFBF7"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Lien secondaire */}
            <Link
              href="/contact"
              className="text-xs tracking-[0.18em] uppercase transition-opacity duration-300 hover:opacity-40"
              style={{
                color: "rgba(26,26,26,0.5)",
                fontFamily: "var(--font-inter), sans-serif",
                textDecoration: "none",
              }}
            >
              Réserver
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Intro éditoriale ─────────────────────────────────────────────────────────

function SuitesIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center px-6 py-20"
      style={{ backgroundColor: "#FDFBF7" }}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-xs tracking-[0.3em] uppercase mb-6"
        style={{ color: "#EA580C", fontFamily: "var(--font-inter), sans-serif" }}
      >
        L'art du séjour
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1 }}
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "#1A1A1A",
          maxWidth: "640px",
        }}
      >
        Chaque suite est une porte ouverte sur un fragment de l'Atlas
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8"
        style={{
          width: "40px",
          height: "1px",
          backgroundColor: "#A3895D",
          transformOrigin: "left",
        }}
      />
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function SuitesList({ suites }: SuitesListProps) {
  return (
    <section style={{ backgroundColor: "#FDFBF7" }}>
      {/* Intro éditoriale */}
      <SuitesIntro />

      {/* Séparateur */}
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgba(26,26,26,0.08)",
        }}
      />

      {/* Cards suites — alternance gauche / droite */}
      {suites.map((suite, i) => (
        <SuiteCard key={suite.slug} suite={suite} index={i} />
      ))}

      {/* Footer section — CTA général */}
      <div
        className="flex flex-col items-center text-center py-20 px-6"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "#EA580C", fontFamily: "var(--font-inter), sans-serif" }}
        >
          Une question ?
        </p>
        <h3
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            fontWeight: 300,
            color: "#FDFBF7",
            marginBottom: "2rem",
          }}
        >
          Notre équipe vous accompagne dans votre choix
        </h3>
        <Link
          href="/contact"
          className="group relative flex items-center gap-3 py-4 px-8 overflow-hidden"
          style={{
            border: "1px solid rgba(253,251,247,0.25)",
            borderRadius: "2px",
            textDecoration: "none",
          }}
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

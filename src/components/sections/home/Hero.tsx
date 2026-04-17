"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─── Variants ────────────────────────────────────────────────────────────────

const lineVariant = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } },
};

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* ── Image de fond ── */}
      <Image
        src="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1920&q=90"
        alt="Vue panoramique sur l'Atlas depuis Dar Amoudou"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* ── Overlay en couches ── */}
      {/* Assombrit globalement sans écraser la photo */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(10,8,6,0.38)",
        }}
      />
      {/* Dégradé bas → fond sable pour transition douce */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "35%",
          background: "linear-gradient(to top, #FDFBF7 0%, transparent 100%)",
        }}
      />
      {/* Dégradé haut pour navbar */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "140px",
          background: "linear-gradient(to bottom, rgba(10,8,6,0.55) 0%, transparent 100%)",
        }}
      />

      {/* ── Contenu principal ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-end px-8 md:px-16 lg:px-24 pb-36 text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Trait + surtitre */}
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
          <motion.div
            variants={lineVariant}
            style={{ width: "40px", height: "1px", backgroundColor: "#EA580C" }}
          />
          <span
            className="text-xs tracking-[0.35em] uppercase"
            style={{
              color: "rgba(253,251,247,0.7)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            Maison d'hôte d'exception · Atlas, Maroc
          </span>
          <motion.div
            variants={lineVariant}
            style={{ width: "40px", height: "1px", backgroundColor: "#EA580C" }}
          />
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            fontSize: "clamp(3.2rem, 8vw, 8rem)",
            color: "#FDFBF7",
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
          }}
        >
          L'Éveil des Sens
          <br />
          <span style={{ fontStyle: "italic", color: "rgba(253,251,247,0.85)" }}>
            au Cœur de l'Atlas
          </span>
        </motion.h1>

        {/* Description courte */}
        <motion.p
          variants={fadeUp}
          className="mt-6"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.8,
            color: "rgba(253,251,247,0.6)",
            maxWidth: "480px",
          }}
        >
          Trois suites privées suspendues entre ciel et vallée. Un refuge de luxe
          discret où l'hospitalité berbère rencontre l'élégance contemporaine.
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-6">
          <Link
            href="/suites"
            className="group relative flex items-center gap-3 py-4 px-8 overflow-hidden"
            style={{ backgroundColor: "#EA580C", borderRadius: "2px", textDecoration: "none" }}
          >
            <span
              className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
              style={{ backgroundColor: "#FDFBF7" }}
            />
            <span
              className="relative text-xs tracking-[0.25em] uppercase transition-colors duration-500 group-hover:text-dar-dark"
              style={{ color: "#FDFBF7", fontFamily: "var(--font-inter), sans-serif" }}
            >
              Découvrir nos suites
            </span>
            <svg className="relative transition-transform duration-300 group-hover:translate-x-1" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-dar-dark transition-colors duration-500"/>
            </svg>
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 group"
            style={{ textDecoration: "none" }}
          >
            <span
              className="text-xs tracking-[0.2em] uppercase transition-opacity duration-300 group-hover:opacity-60"
              style={{ color: "rgba(253,251,247,0.75)", fontFamily: "var(--font-inter), sans-serif" }}
            >
              Réserver
            </span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 5h8M5 1l4 4-4 4" stroke="rgba(253,251,247,0.75)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Chiffres clés — bas droite ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="absolute bottom-10 right-8 md:right-16 lg:right-24 flex gap-10"
      >
        {[
          { value: "3", label: "Suites privées" },
          { value: "1 400m", label: "Altitude" },
          { value: "5", label: "Expériences" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeIn}
            className="flex flex-col items-end"
          >
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "1.8rem",
                fontWeight: 300,
                color: "#FDFBF7",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </span>
            <span
              className="text-xs tracking-[0.15em] uppercase mt-1"
              style={{
                color: "rgba(253,251,247,0.45)",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute left-8 md:left-16 bottom-10 flex flex-col items-center gap-3"
      >
        <motion.div
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, rgba(253,251,247,0.5), transparent)",
          }}
          animate={{ scaleY: [1, 0.5, 1], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
          className="text-xs tracking-[0.25em] uppercase"
          style={{
            color: "rgba(253,251,247,0.4)",
            fontFamily: "var(--font-inter), sans-serif",
            writingMode: "vertical-rl",
            letterSpacing: "0.2em",
          }}
        >
          Défiler
        </span>
      </motion.div>

    </section>
  );
}

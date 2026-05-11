"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

// ─── Icônes SVG ──────────────────────────────────────────────────────────────

const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16.92z"/>
  </svg>
);

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconCar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/>
    <circle cx="8.5" cy="17" r="2.5"/>
    <circle cx="17.5" cy="17" r="2.5"/>
    <polyline points="10 2 10 8 16 8"/>
  </svg>
);

// ─── Composant ───────────────────────────────────────────────────────────────

export default function ContactInfo() {
  return (
    <aside
      className="flex flex-col px-8 py-14"
      style={{
        backgroundColor: "#FDFBF7",
        borderLeft: "1px solid rgba(26,26,26,0.08)",
      }}
    >
      {/* En-tête */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div style={{ width: "24px", height: "1px", backgroundColor: "#EA580C" }} />
          <span
            className="text-xs tracking-[0.25em] uppercase"
            style={{ color: "#EA580C", fontFamily: "var(--font-inter), sans-serif" }}
          >
            Informations
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
            fontWeight: 300,
            color: "#1A1A1A",
            lineHeight: 1.15,
          }}
        >
          Nous trouver
        </h2>
      </motion.div>

      {/* Coordonnées */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-5 mb-10"
        style={{ borderBottom: "1px solid rgba(26,26,26,0.08)", paddingBottom: "2.5rem" }}
      >
        {[
          {
            icon: <IconMapPin />,
            label: "Adresse",
            value: "Douar Amoudou, Route de l'Atlas\nTalat N'Yaaqoub, Maroc",
          },
          {
            icon: <IconPhone />,
            label: "Téléphone",
            value: "+212 6 00 00 00 00",
            href: "tel:+212600000000",
          },
          {
            icon: <IconMail />,
            label: "Email",
            value: "contact@daramoudou.ma",
            href: "mailto:contact@daramoudou.ma",
          },
          {
            icon: <IconClock />,
            label: "Réception",
            value: "Ouverte 7j/7 · 8h — 21h",
          },
        ].map((item, i) => (
          <div key={i} className="flex gap-4">
            <span style={{ color: "#A3895D", flexShrink: 0, marginTop: "2px" }}>
              {item.icon}
            </span>
            <div>
              <p
                className="text-xs tracking-[0.15em] uppercase mb-1"
                style={{ color: "#A3895D", fontFamily: "var(--font-inter), sans-serif" }}
              >
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.875rem",
                    color: "rgba(26,26,26,0.8)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {item.value}
                </a>
              ) : (
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.875rem",
                    color: "rgba(26,26,26,0.8)",
                    lineHeight: 1.7,
                    whiteSpace: "pre-line",
                  }}
                >
                  {item.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Comment venir */}
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-10"
        style={{ borderBottom: "1px solid rgba(26,26,26,0.08)", paddingBottom: "2.5rem" }}
      >
        <div className="flex gap-4 mb-4">
          <span style={{ color: "#A3895D", flexShrink: 0, marginTop: "2px" }}>
            <IconCar />
          </span>
          <p
            className="text-xs tracking-[0.15em] uppercase"
            style={{ color: "#A3895D", fontFamily: "var(--font-inter), sans-serif" }}
          >
            Comment venir
          </p>
        </div>
        <div className="flex flex-col gap-3 pl-8">
          {[
            { lieu: "Marrakech", distance: "2h30 de route" },
            { lieu: "Aéroport RAK", distance: "2h45" },
            { lieu: "Taroudant", distance: "1h15" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-baseline">
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1rem",
                  color: "#1A1A1A",
                }}
              >
                {item.lieu}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(26,26,26,0.4)",
                }}
              >
                {item.distance}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Politique d'annulation */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-10"
        style={{ borderBottom: "1px solid rgba(26,26,26,0.08)", paddingBottom: "2.5rem" }}
      >
        <p
          className="text-xs tracking-[0.2em] uppercase mb-3"
          style={{ color: "#A3895D", fontFamily: "var(--font-inter), sans-serif" }}
        >
          Politique d'annulation
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.8rem",
            color: "rgba(26,26,26,0.55)",
            lineHeight: 1.75,
          }}
        >
          Annulation gratuite jusqu'à 48h avant l'arrivée. Au-delà, la première
          nuit est retenue. En haute saison (juillet–août, décembre), 7 jours de
          préavis requis.
        </p>
      </motion.div>

      {/* Citation finale */}
      <motion.blockquote
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "1.15rem",
          fontStyle: "italic",
          fontWeight: 300,
          color: "rgba(26,26,26,0.45)",
          lineHeight: 1.6,
          borderLeft: "2px solid #EA580C",
          paddingLeft: "1rem",
          marginTop: "auto",
        }}
      >
        "L'hospitalité est la première vertu de la montagne."
      </motion.blockquote>
    </aside>
  );
}

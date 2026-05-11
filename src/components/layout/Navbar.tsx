"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { CategorieHebergement } from "@/lib/queries";

// ─── Hauteur uniforme des 3 mega menus ───────────────────────────────────────
const MEGA_MENU_HEIGHT = 380; // px — même hauteur pour les 3 menus

// ─── Fallback Hébergement ─────────────────────────────────────────────────────
const FALLBACK_CATEGORIES: CategorieHebergement[] = [
  {
    nom: "Suites",
    slug: "suites",
    description: "Trois suites d'exception suspendues entre ciel et Atlas, de 65 à 90 m².",
    image: { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85", alt: "Suite Nomade — Dar Amoudou" },
    lien: "/suites",
    ordre: 1,
  },
  {
    nom: "Chambres",
    slug: "chambres",
    description: "Des chambres élégantes où le confort contemporain dialogue avec l'artisanat berbère.",
    image: { src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=85", alt: "Chambre — Dar Amoudou" },
    lien: "/chambres",
    ordre: 2,
  },
];

// ─── Données Expériences ──────────────────────────────────────────────────────
const EXPERIENCES_MENU = [
  { tag: "Aventure", sousTitre: "L'Atlas à pied", duree: "1 à 3 jours", lien: "/experiences?tag=Aventure", image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=85", icone: "🏔️", couleur: "#6B8E6B" },
  { tag: "Culture", sousTitre: "Villages de l'Atlas", duree: "Demi-journée", lien: "/experiences?tag=Culture", image: "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?w=400&q=85", icone: "🏺", couleur: "#8B6B3D" },
  { tag: "Gastronomie", sousTitre: "Cuisine berbère", duree: "3 à 4 heures", lien: "/experiences?tag=Gastronomie", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=85", icone: "🍲", couleur: "#C17B3B" },
  { tag: "Bien-être", sousTitre: "Eau et pierre", duree: "2 heures", lien: "/experiences?tag=Bien-être", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=85", icone: "✨", couleur: "#7B8B9B" },
  { tag: "Nature", sousTitre: "Planétarium naturel", duree: "Soirée complète", lien: "/experiences?tag=Nature", image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=85", icone: "🌌", couleur: "#3B4B6B" },
];

// ─── Données Galerie ──────────────────────────────────────────────────────────
const GALERIE_MENU = [
  {
    categorie: "Suites",
    sousTitre: "Intérieurs d'exception",
    lien: "/galerie?categorie=Suites",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=85",
    icone: "🛏️",
    couleur: "#8B7355",
  },
  {
    categorie: "Chambre",
    sousTitre: "Confort et artisanat",
    lien: "/galerie?categorie=Chambre",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&q=85",
    icone: "🌙",
    couleur: "#6B7A8B",
  },
  {
    categorie: "Gastronomie",
    sousTitre: "Saveurs de l'Atlas",
    lien: "/galerie?categorie=Gastronomie",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=85",
    icone: "🍽️",
    couleur: "#C17B3B",
  },
  {
    categorie: "Activités",
    sousTitre: "Moments inoubliables",
    lien: "/galerie?categorie=Activités",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=85",
    icone: "🏃",
    couleur: "#4A6741",
  },
  {
    categorie: "Autre",
    sousTitre: "Atlas et paysages",
    lien: "/galerie?categorie=Autre",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=400&q=85",
    icone: "✨",
    couleur: "#5B7F6E",
  },
];

interface NavbarProps {
  categories?: CategorieHebergement[];
}

// ─── Composants réutilisables ─────────────────────────────────────────────────
function NavLink({ href, children, color }: { href: string; children: React.ReactNode; color: string }) {
  return (
    <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
      <Link href={href} style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.125rem", fontWeight: 500, letterSpacing: "0.12em", color, textDecoration: "none", display: "block" }}>
        {children}
      </Link>
    </motion.div>
  );
}

function NavTrigger({ label, isOpen, color }: { label: string; isOpen: boolean; color: string }) {
  return (
    <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
      <button
        className="flex items-center gap-1.5"
        style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.125rem", fontWeight: 500, letterSpacing: "0.12em", color, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        aria-expanded={isOpen}
      >
        {label}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          <ChevronDown size={15} strokeWidth={1.5} />
        </motion.span>
      </button>
    </motion.div>
  );
}

// ─── En-tête commun des mega menus ────────────────────────────────────────────
function MegaHeader({ left, right }: { left: string; right: string }) {
  return (
    <div className="px-8 pt-5 pb-4 border-b flex items-center justify-between flex-shrink-0" style={{ borderColor: "rgba(163,137,93,0.2)" }}>
      <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A3895D" }}>{left}</p>
      <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.85rem", fontStyle: "italic", color: "rgba(26,26,26,0.4)" }}>{right}</p>
    </div>
  );
}

// ─── Flèche décorative commune ────────────────────────────────────────────────
function MegaArrow() {
  return (
    <div className="flex justify-center">
      <div className="w-3 h-3 rotate-45" style={{ backgroundColor: "#F5F0E8", border: "1px solid rgba(163,137,93,0.3)", borderBottom: "none", borderRight: "none", marginBottom: "-6px", zIndex: 10, position: "relative" }} />
    </div>
  );
}

// ─── Wrapper commun des mega menus ────────────────────────────────────────────
function MegaPanel({ children, footer, width = 680 }: { children: React.ReactNode; footer: React.ReactNode; width?: number }) {
  return (
    <div className="overflow-hidden shadow-2xl flex flex-col" style={{ backgroundColor: "#F5F0E8", border: "1px solid rgba(163,137,93,0.25)", borderTop: "2px solid #A3895D", height: `${MEGA_MENU_HEIGHT}px` }}>
      {children}
      <div className="px-8 py-3 flex items-center justify-between border-t mt-auto flex-shrink-0" style={{ borderColor: "rgba(163,137,93,0.2)" }}>
        {footer}
      </div>
    </div>
  );
}

// ─── Mega Menu Hébergement ────────────────────────────────────────────────────
function MegaMenuHebergement({ categories, isScrolled }: { categories: CategorieHebergement[]; isScrolled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const open = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setIsOpen(true); };
  const close = () => { timeoutRef.current = setTimeout(() => setIsOpen(false), 180); };
  const color = "#1A1A1A";

  // Hauteur image = hauteur totale - header(~65px) - footer(~45px) - texte(~110px)
  const imageHeight = MEGA_MENU_HEIGHT - 65 - 45 - 120;

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      <NavTrigger label="Hébergement" isOpen={isOpen} color={color} />
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="absolute top-full left-1/2 -translate-x-1/2 mt-8" style={{ width: "680px" }}>
            <MegaArrow />
            <MegaPanel
              width={680}
              footer={
                <Link href="/contact" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group/cta ml-auto" style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", color: "#EA580C", textTransform: "uppercase" }}>
                  Réserver une nuit <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                </Link>
              }
            >
              <MegaHeader left="Nos hébergements" right="Atlas Marocain · 1 400m" />
              <div className="grid grid-cols-2 flex-1 overflow-hidden">
                {categories.map((cat, index) => (
                  <motion.div key={cat.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.08 }} className={`flex flex-col ${index === 0 ? "border-r" : ""}`} style={{ borderColor: "rgba(163,137,93,0.2)" }}>
                    <Link href={cat.lien} onClick={() => setIsOpen(false)} className="group flex flex-col h-full p-6"
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(163,137,93,0.07)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                    >
                      <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: `${imageHeight}px` }}>
                        <Image src={cat.image.src} alt={cat.image.alt} fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,26,0.35) 0%, transparent 55%)" }} />
                        <div className="absolute top-3 left-3 w-7 h-7 flex items-center justify-center" style={{ border: "1px solid rgba(163,137,93,0.8)", backgroundColor: "rgba(245,240,232,0.85)", fontFamily: "var(--font-cormorant), serif", fontSize: "0.7rem", color: "#A3895D" }}>0{index + 1}</div>
                      </div>
                      <div className="mt-3 flex-1">
                        <div className="flex items-end justify-between">
                          <h3 className="group-hover:text-dar-orange transition-colors duration-300" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.4rem", fontWeight: 400, color: "#1A1A1A" }}>{cat.nom}</h3>
                          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#A3895D", textTransform: "uppercase" }}>Voir →</span>
                        </div>
                        <p className="mt-1" style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.72rem", color: "rgba(26,26,26,0.5)", lineHeight: "1.5" }}>{cat.description}</p>
                        <div className="mt-3 h-px w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: "#A3895D" }} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </MegaPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mega Menu Expériences ────────────────────────────────────────────────────
function MegaMenuExperiences({ isScrolled }: { isScrolled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const open = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setIsOpen(true); };
  const close = () => { timeoutRef.current = setTimeout(() => { setIsOpen(false); setHovered(null); }, 180); };
  const color = "#1A1A1A";

  const imageHeight = MEGA_MENU_HEIGHT - 65 - 45 - 110;

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      <NavTrigger label="Expériences" isOpen={isOpen} color={color} />
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="absolute top-full left-1/2 -translate-x-1/2 mt-8" style={{ width: "860px" }}>
            <MegaArrow />
            <MegaPanel
              width={860}
              footer={
                <>
                  <Link href="/experiences" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group/all" style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", color: "rgba(26,26,26,0.5)", textTransform: "uppercase" }}>
                    <span className="group-hover/all:text-dar-dark transition-colors duration-300">Toutes les expériences</span>
                    <span className="transition-transform duration-300 group-hover/all:translate-x-1">→</span>
                  </Link>
                  <Link href="/contact" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group/cta" style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", color: "#EA580C", textTransform: "uppercase" }}>
                    Réserver une expérience <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                  </Link>
                </>
              }
            >
              <MegaHeader left="Nos expériences" right="5 univers · Atlas Marocain" />
              <div className="grid grid-cols-5 flex-1 overflow-hidden">
                {EXPERIENCES_MENU.map((exp, index) => (
                  <motion.div key={exp.tag} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.06 }} className={`flex flex-col ${index < 4 ? "border-r" : ""}`} style={{ borderColor: "rgba(163,137,93,0.2)" }} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)}>
                    <Link href={exp.lien} onClick={() => setIsOpen(false)} className="group flex flex-col h-full" style={{ backgroundColor: hovered === index ? "rgba(163,137,93,0.07)" : "transparent", transition: "background-color 0.3s" }}>
                      <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: `${imageHeight}px` }}>
                        <Image src={exp.image} alt={exp.tag} fill sizes="172px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 transition-opacity duration-400" style={{ backgroundColor: exp.couleur, opacity: hovered === index ? 0.25 : 0 }} />
                        <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5" style={{ background: "linear-gradient(to top, rgba(26,26,26,0.7) 0%, transparent 100%)" }}>
                          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(253,251,247,0.9)" }}>{exp.tag}</span>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 p-3">
                        <div className="flex items-start gap-1.5 mb-1.5">
                          <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>{exp.icone}</span>
                          <h3 className="transition-colors duration-300" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.95rem", fontWeight: 500, lineHeight: 1.2, color: hovered === index ? "#EA580C" : "#1A1A1A" }}>{exp.tag}</h3>
                        </div>
                        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.65rem", color: "rgba(26,26,26,0.5)", lineHeight: 1.4, marginBottom: "auto" }}>{exp.sousTitre}</p>
                        <div className="flex items-center justify-between mt-2 pt-2" style={{ borderTop: "1px solid rgba(163,137,93,0.2)" }}>
                          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.58rem", letterSpacing: "0.1em", color: "#A3895D", textTransform: "uppercase" }}>{exp.duree}</span>
                          <motion.span animate={{ x: hovered === index ? 3 : 0 }} transition={{ duration: 0.3 }} style={{ fontSize: "0.7rem", color: "#A3895D" }}>→</motion.span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </MegaPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mega Menu Galerie ────────────────────────────────────────────────────────
function MegaMenuGalerie({ isScrolled }: { isScrolled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const open = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setIsOpen(true); };
  const close = () => { timeoutRef.current = setTimeout(() => { setIsOpen(false); setHovered(null); }, 180); };
  const color = "#1A1A1A";

  const imageHeight = MEGA_MENU_HEIGHT - 65 - 45 - 110;

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      <NavTrigger label="Galerie" isOpen={isOpen} color={color} />
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="absolute top-full left-1/2 -translate-x-1/2 mt-8" style={{ width: "860px" }}>
            <MegaArrow />
            <MegaPanel
              width={860}
              footer={
                <>
                  <Link href="/galerie" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group/all" style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", color: "rgba(26,26,26,0.5)", textTransform: "uppercase" }}>
                    <span className="group-hover/all:text-dar-dark transition-colors duration-300">Voir toute la galerie</span>
                    <span className="transition-transform duration-300 group-hover/all:translate-x-1">→</span>
                  </Link>
                  <Link href="/contact" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group/cta" style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", color: "#EA580C", textTransform: "uppercase" }}>
                    Réserver <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                  </Link>
                </>
              }
            >
              <MegaHeader left="Notre galerie" right="5 univers · Dar Amoudou" />
              <div className="grid grid-cols-5 flex-1 overflow-hidden">
                {GALERIE_MENU.map((item, index) => (
                  <motion.div key={item.categorie} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.07 }} className={`flex flex-col ${index < 4 ? "border-r" : ""}`} style={{ borderColor: "rgba(163,137,93,0.2)" }} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)}>
                    <Link href={item.lien} onClick={() => setIsOpen(false)} className="group flex flex-col h-full" style={{ backgroundColor: hovered === index ? "rgba(163,137,93,0.07)" : "transparent", transition: "background-color 0.3s" }}>
                      <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: `${imageHeight}px` }}>
                        <Image src={item.image} alt={item.categorie} fill sizes="180px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 transition-opacity duration-400" style={{ backgroundColor: item.couleur, opacity: hovered === index ? 0.3 : 0 }} />
                        <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5" style={{ background: "linear-gradient(to top, rgba(26,26,26,0.7) 0%, transparent 100%)" }}>
                          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(253,251,247,0.9)" }}>{item.categorie}</span>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 p-3">
                        <div className="flex items-start gap-1.5 mb-1.5">
                          <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>{item.icone}</span>
                          <h3 className="transition-colors duration-300" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.95rem", fontWeight: 500, lineHeight: 1.2, color: hovered === index ? "#EA580C" : "#1A1A1A" }}>{item.categorie}</h3>
                        </div>
                        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.65rem", color: "rgba(26,26,26,0.5)", lineHeight: 1.4, marginBottom: "auto" }}>{item.sousTitre}</p>
                        <div className="flex items-center justify-end mt-2 pt-2" style={{ borderTop: "1px solid rgba(163,137,93,0.2)" }}>
                          <motion.span animate={{ x: hovered === index ? 3 : 0 }} transition={{ duration: 0.3 }} style={{ fontSize: "0.7rem", color: "#A3895D" }}>→</motion.span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </MegaPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Navbar principale ────────────────────────────────────────────────────────
export default function Navbar({ categories }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hebergementOpen, setHebergementOpen] = useState(false);
  const [experiencesOpen, setExperiencesOpen] = useState(false);
  const [galerieOpen, setGalerieOpen] = useState(false);

  const displayCategories = categories && categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  const pathname = usePathname();
  // Pages sans hero plein écran → navbar toujours avec fond visible

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkColor = "#1A1A1A";

  return (
    <>
      <nav
        className="fixed top-0 w-full z-[60] transition-all duration-500 bg-dar-sand/95 backdrop-blur-md shadow-sm"
        style={{ padding: "0 48px", height: "80px", display: "flex", alignItems: "center" }}
      >
        {/* Logo */}
        <div className="flex-none">
          <Link href="/" className="relative block transition-transform duration-300 hover:scale-105" style={{ width: "180px", height: "52px" }}>
            <Image src="/logo.png" alt="Dar Amoudou" fill sizes="180px" className="object-contain object-left" priority loading="eager" />
          </Link>
        </div>

        {/* Navigation centre */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          <MegaMenuHebergement categories={displayCategories} isScrolled={scrolled} />
          <MegaMenuExperiences isScrolled={scrolled} />
          <MegaMenuGalerie isScrolled={scrolled} />
          <NavLink href="/contact" color={linkColor}>Contact</NavLink>
        </div>

        {/* CTA + Burger */}
        <div className="flex-none ml-auto flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
            <Link href="/contact" className="hidden md:block px-6 py-2.5 text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-inter), sans-serif", backgroundColor: "#EA580C", color: "#FDFBF7", letterSpacing: "0.15em" }}>
              Réserver
            </Link>
          </motion.div>
          <button onClick={() => setIsOpen(!isOpen)} className="relative z-[70] p-2 md:hidden" aria-label="Menu">
            <div className="flex flex-col justify-between w-7 h-5">
              <motion.span animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }} className={`block h-0.5 w-full transition-colors duration-300 "bg-dar-dark"`} />
              <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className={`block h-0.5 w-full transition-colors duration-300 "bg-dar-dark"`} />
              <motion.span animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }} className={`block h-0.5 w-full transition-colors duration-300 "bg-dar-dark"`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center md:hidden"
            style={{ backgroundColor: "#FDFBF7" }}
          >
            <div className="flex flex-col items-center space-y-6 w-full px-8">

              {/* Hébergement */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="w-full text-center">
                <button onClick={() => setHebergementOpen(!hebergementOpen)} className="flex items-center justify-center gap-2 w-full" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "2.5rem", fontWeight: 400, color: "#1A1A1A" }}>
                  Hébergement <motion.span animate={{ rotate: hebergementOpen ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown size={24} strokeWidth={1} /></motion.span>
                </button>
                <AnimatePresence>
                  {hebergementOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                      <div className="mt-3 flex flex-col gap-2">
                        {displayCategories.map((cat) => (
                          <Link key={cat.slug} href={cat.lien} onClick={() => setIsOpen(false)} style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.75rem", color: "#A3895D", fontStyle: "italic" }}>{cat.nom}</Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Expériences */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="w-full text-center">
                <button onClick={() => setExperiencesOpen(!experiencesOpen)} className="flex items-center justify-center gap-2 w-full" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "2.5rem", fontWeight: 400, color: "#1A1A1A" }}>
                  Expériences <motion.span animate={{ rotate: experiencesOpen ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown size={24} strokeWidth={1} /></motion.span>
                </button>
                <AnimatePresence>
                  {experiencesOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                      <div className="mt-3 flex flex-col gap-2">
                        {EXPERIENCES_MENU.map((exp) => (
                          <Link key={exp.tag} href={exp.lien} onClick={() => setIsOpen(false)} style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.75rem", color: "#A3895D", fontStyle: "italic" }}>{exp.icone} {exp.tag}</Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Galerie */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full text-center">
                <button onClick={() => setGalerieOpen(!galerieOpen)} className="flex items-center justify-center gap-2 w-full" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "2.5rem", fontWeight: 400, color: "#1A1A1A" }}>
                  Galerie <motion.span animate={{ rotate: galerieOpen ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown size={24} strokeWidth={1} /></motion.span>
                </button>
                <AnimatePresence>
                  {galerieOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                      <div className="mt-3 flex flex-col gap-2">
                        {GALERIE_MENU.map((item) => (
                          <Link key={item.categorie} href={item.lien} onClick={() => setIsOpen(false)} style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.75rem", color: "#A3895D", fontStyle: "italic" }}>{item.icone} {item.categorie}</Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Contact */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <Link href="/contact" onClick={() => setIsOpen(false)} style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "2.5rem", fontWeight: 400, color: "#1A1A1A" }}>Contact</Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="pt-4">
                <Link href="/contact" onClick={() => setIsOpen(false)} className="px-8 py-3 text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-inter), sans-serif", backgroundColor: "#EA580C", color: "#FDFBF7" }}>Réserver</Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="absolute bottom-12 text-center">
              <p className="italic text-lg" style={{ fontFamily: "var(--font-cormorant), serif", color: "rgba(26,26,26,0.4)" }}>L'aventure vous attend</p>
              <div className="mt-4 flex space-x-6 justify-center text-xs tracking-widest uppercase">
                <a href="#" style={{ color: "rgba(26,26,26,0.4)" }}>Instagram</a>
                <a href="#" style={{ color: "rgba(26,26,26,0.4)" }}>Facebook</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

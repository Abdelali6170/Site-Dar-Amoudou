"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effet pour détecter le scroll et changer l'apparence de la barre
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Accueil", href: "/" },
    { name: "Suites & Chambres", href: "/suites" },
    { name: "Expériences", href: "/experiences" },
    { name: "Galerie", href: "/galerie" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[60] transition-all duration-500 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center ${
          scrolled ? "bg-dar-sand/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        {/* Logo - Utilise le fichier logo.png que vous avez mis dans /public */}
        <Link href="/" className="relative w-40 h-12 md:w-56 md:h-16 transition-transform duration-300 hover:scale-105">
          <Image 
            src="/logo.png" 
            alt="Dar Amoudou" 
            fill 
            className="object-contain"
            priority
          />
        </Link>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[70] p-2 group"
          aria-label="Menu"
        >
          <div className="flex flex-col justify-between w-8 h-5">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              className={`block h-0.5 w-full transition-colors duration-300 ${
                scrolled || isOpen ? "bg-dar-dark" : "bg-white"
              } group-hover:bg-dar-orange`}
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block h-0.5 w-full transition-colors duration-300 ${
                scrolled || isOpen ? "bg-dar-dark" : "bg-white"
              }`}
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              className={`block h-0.5 w-full transition-colors duration-300 ${
                scrolled || isOpen ? "bg-dar-dark" : "bg-white"
              } group-hover:bg-dar-orange`}
            />
          </div>
        </button>
      </nav>

      {/* Menu Plein Écran Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[55] bg-dar-sand flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl md:text-6xl font-serif text-dar-dark hover:text-dar-orange transition-all duration-300 hover:italic"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Informations de contact en bas du menu */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 text-center"
            >
              <p className="font-serif italic text-lg text-dar-dark/60">L'aventure vous attend</p>
              <div className="mt-4 flex space-x-6 justify-center text-sm tracking-widest uppercase">
                <a href="#" className="hover:text-dar-orange transition-colors">Instagram</a>
                <a href="#" className="hover:text-dar-orange transition-colors">Facebook</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
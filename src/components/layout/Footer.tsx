"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
<footer className="border-t border-dar-dark/10 pt-20 pb-10 px-6 md:px-12" style={{ backgroundColor: "#F0EDE6" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Colonne 1 : Logo */}
          <div className="space-y-6">
            <Link href="/" className="relative block w-48 h-16">
              <Image src="/logo.png" alt="Dar Amoudou" fill className="object-contain" />
            </Link>
            <p className="text-dar-dark/60 text-sm leading-relaxed italic font-serif">
              "L'essence de l'hospitalité marocaine au sommet de l'Atlas."
            </p>
          </div>

          {/* Colonne 2 : Navigation */}
          <div className="space-y-6">
            <h4 className="uppercase tracking-[0.2em] text-xs font-bold">Explorer</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/suites" className="hover:text-dar-orange transition-colors">Nos Suites</Link></li>
              <li><Link href="/experiences" className="hover:text-dar-orange transition-colors">Expériences</Link></li>
              <li><Link href="/contact" className="hover:text-dar-orange transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Contact */}
          <div className="space-y-6">
            <h4 className="uppercase tracking-[0.2em] text-xs font-bold">Nous Contacter</h4>
            <ul className="space-y-4 text-sm text-dar-dark/80">
              <li className="flex items-center gap-3"><MapPin size={16} className="text-dar-orange" /> Ouarzazate, Maroc</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-dar-orange" /> +212 (0) 6.60.70.81.44</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-dar-orange" /> +212 (0) 5.24.89.07.40</li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-dar-orange" /> contact@daramoudou.com</li>
            </ul>
          </div>

          {/* Colonne 4 : Réseaux Sociaux (Version SVG pour éviter l'erreur) */}
          <div className="space-y-6">
            <h4 className="uppercase tracking-[0.2em] text-xs font-bold">Suivre l'Aventure</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-dar-dark/10 rounded-full hover:bg-dar-dark hover:text-white transition-all">
                {/* Icône Instagram simplifiée */}
                <span className="text-xs font-bold font-sans">IG</span>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-dar-dark/10 rounded-full hover:bg-dar-dark hover:text-white transition-all">
                {/* Icône Facebook simplifiée */}
                <span className="text-xs font-bold font-sans">FB</span>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-dar-dark/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-dar-dark/40">
          <p>© {currentYear} Dar Amoudou. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
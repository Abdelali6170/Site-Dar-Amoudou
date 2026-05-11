"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Gastronomy() {
  return (
    <section className="py-24 px-6 md:px-12 bg-dar-dark text-dar-sand overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image avec effet de parallaxe ou zoom */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative h-[400px] md:h-[600px] order-2 lg:order-1"
          >
            <Image 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85" 
              alt="Table de Dar Amoudou"
              fill
              className="object-cover rounded-sm brightness-75"
            />
            <div className="absolute inset-0 border-[20px] border-dar-dark/30 m-4 pointer-events-none" />
          </motion.div>

          {/* Texte narratif */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <span className="text-dar-gold uppercase tracking-[0.3em] text-sm font-medium">
              La Table d'Hôte
            </span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              Un voyage culinaire <br />
              <span className="italic">aux mille épices</span>
            </h2>
            <p className="text-dar-sand/70 leading-relaxed text-lg">
              Chaque soir, notre table s'anime autour des saveurs de l'Atlas. 
              Des produits frais du marché, des herbes de notre jardin et 
              un savoir-faire ancestral se rencontrent pour créer des plats 
              inoubliables.
            </p>
            <ul className="space-y-4 font-serif italic text-xl">
              <li className="flex items-center gap-4">
                <span className="h-[1px] w-8 bg-dar-gold"></span>
                Tajines mijotés au feu de bois
              </li>
              <li className="flex items-center gap-4">
                <span className="h-[1px] w-8 bg-dar-gold"></span>
                Pain traditionnel cuit à l'instant
              </li>
              <li className="flex items-center gap-4">
                <span className="h-[1px] w-8 bg-dar-gold"></span>
                Thé à la menthe sous les étoiles
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
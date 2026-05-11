"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Introduction() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-12 bg-dar-sand">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Bloc Texte - Storytelling */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="text-dar-orange uppercase tracking-[0.3em] text-sm font-medium">
              L'Esprit de la Maison
            </span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              Une parenthèse hors du temps, <br />
              <span className="italic text-dar-gold">entre terre et ciel.</span>
            </h2>
            <div className="space-y-6 text-dar-dark/80 leading-relaxed text-lg max-w-xl">
              <p>
                Située aux portes du désert, Dar Amoudou n'est pas seulement une étape, 
                c'est une destination. Ici, l'architecture traditionnelle en pisé rencontre 
                le confort moderne dans un équilibre parfait.
              </p>
              <p>
                Chaque détail a été pensé pour célébrer l'artisanat local : des tapis 
                tissés à la main aux murs lissés au tadelakt, chaque recoin raconte 
                une histoire de passion et de transmission.
              </p>
            </div>
            
            <motion.div 
              whileHover={{ x: 10 }}
              className="inline-block pt-4"
            >
              <a href="/galerie" className="flex items-center gap-4 group">
                <span className="uppercase tracking-widest text-sm font-bold">Explorer la galerie</span>
                <div className="h-[1px] w-12 bg-dar-dark group-hover:w-20 transition-all duration-300"></div>
              </a>
            </motion.div>
          </motion.div>

          {/* Grille d'Images Asymétrique */}
          <div className="relative grid grid-cols-12 gap-4 h-[500px] md:h-[600px]">
            {/* Image Principale (Verticale) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="col-span-8 h-full relative overflow-hidden rounded-sm shadow-xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85" 
                alt="Architecture Dar Amoudou"
                fill
                className="object-cover hover:scale-110 transition-transform duration-[2s]"
              />
            </motion.div>

            {/* Petite Image (Horizontale - Décalée) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-10 -right-4 col-span-6 w-2/3 h-1/2 relative overflow-hidden rounded-sm shadow-2xl border-8 border-dar-sand"
            >
              <Image 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=85" 
                alt="Détails artisanat"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
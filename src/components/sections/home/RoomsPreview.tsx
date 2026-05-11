"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const rooms = [
  {
    id: 1,
    name: "Suite Nomade",
    description: "Vue panoramique sur les montagnes, terrasse privée et salon traditionnel.",
    price: "480",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=85",
    slug: "suite-nomade"
  },
  {
    id: 2,
    name: "Suite Berbère",
    description: "Un cocon de douceur aux tons ocre, idéal pour la sérénité et la contemplation.",
    price: "550",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85",
    slug: "suite-berbere"
  },
  {
    id: 3,
    name: "Suite Atlas",
    description: "Panorama 180° sur l'Atlas, belvédère privatif et ciel étoilé.",
    price: "680",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=85",
    slug: "suite-atlas"
  }
];

export default function RoomsPreview() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white text-dar-dark">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de section */}
        <div className="text-center mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-dar-orange uppercase tracking-[0.3em] text-sm font-medium block"
          >
            Le Repos
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif"
          >
            Nos Suites & Chambres
          </motion.h2>
        </div>

        {/* Grille des chambres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link href={`/suites/${room.slug}`}>
                <div className="relative h-[320px] md:h-[450px] overflow-hidden rounded-sm mb-6">
                  <Image 
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-dar-dark/10 group-hover:bg-dar-dark/30 transition-colors duration-500" />
                  
                  {/* Badge de prix - ICI SE TROUVAIT L'ERREUR */}
                  <div className="absolute bottom-6 left-6 bg-dar-sand px-4 py-2 text-sm font-medium tracking-widest uppercase shadow-lg text-dar-dark">
                    À partir de {room.price}€
                  </div>
                </div>

                <h3 className="text-2xl font-serif mb-2 group-hover:text-dar-orange transition-colors">
                  {room.name}
                </h3>
                <p className="text-dar-dark/60 text-sm leading-relaxed mb-4">
                  {room.description}
                </p>
                <div className="text-[10px] uppercase tracking-widest font-bold border-b border-dar-dark inline-block pb-1">
                  Découvrir la suite
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
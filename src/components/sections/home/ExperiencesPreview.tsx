"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const experiences = [
  {
    title: "Expéditions Désert",
    category: "Aventure",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
  },
  {
    title: "Atelier Cuisine",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85",
  },
  {
    title: "Hammam & Soins",
    category: "Bien-être",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=85",
  }
];

export default function ExperiencesPreview() {
  return (
    <section className="py-24 px-6 md:px-12 bg-dar-sand">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <span className="text-dar-orange uppercase tracking-[0.3em] text-sm font-medium">L'Aventure</span>
            <h2 className="text-4xl md:text-6xl font-serif">Expériences Immersives</h2>
          </div>
          <Link href="/experiences" className="text-sm uppercase tracking-widest border-b border-dar-dark pb-1 hover:text-dar-orange hover:border-dar-orange transition-all">
            Voir toutes les activités
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative h-[500px] w-full overflow-hidden rounded-sm">
                <Image 
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dar-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] mb-2 opacity-80">{exp.category}</p>
                  <h3 className="text-2xl font-serif">{exp.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
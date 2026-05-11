// src/app/(site)/contact/page.tsx

import type { Metadata } from "next";
import ContactHero from "../../../components/sections/contact/ContactHero";
import ContactForm from "../../../components/sections/contact/ContactForm";
import ContactInfo from "../../../components/sections/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact & Réservation | Dar Amoudou",
  description:
    "Contactez Dar Amoudou pour réserver votre suite ou obtenir plus d'informations sur notre maison d'hôte d'exception dans l'Atlas marocain.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />

      {/* Layout 2 colonnes : formulaire gauche | infos droite */}
      <section
        className="grid grid-cols-1 lg:grid-cols-[1fr_420px]"
        style={{ backgroundColor: "#FDFBF7" }}
      >
        <ContactForm />
        <ContactInfo />
      </section>
    </main>
  );
}

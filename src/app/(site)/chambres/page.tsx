// src/app/(site)/chambres/page.tsx

import type { Metadata } from "next";
import { CHAMBRES } from "../../../lib/chambres";
import ChambresHero from "../../../components/sections/chambres/ChambresHero";
import ChambresList from "../../../components/sections/chambres/ChambresList";

export const metadata: Metadata = {
  title: "Nos Chambres | Dar Amoudou",
  description:
    "Trois chambres authentiques au cœur de l'Atlas marocain. Artisanat berbère, confort contemporain et hospitalité d'exception à 1 400 mètres d'altitude.",
};

export default function ChambresPage() {
  return (
    <main>
      <ChambresHero />
      <ChambresList chambres={CHAMBRES} />
    </main>
  );
}

import type { Metadata } from "next";
import GalerieHero from "../../../components/sections/galerie/GalerieHero";
import GalerieGrid from "../../../components/sections/galerie/GalerieGrid";

export const metadata: Metadata = {
  title: "Galerie | Dar Amoudou",
  description:
    "Plongez dans l'univers visuel de Dar Amoudou — suites, jardins, gastronomie et l'Atlas marocain.",
};

export default function GaleriePage() {
  return (
    <>
      <GalerieHero />
      <GalerieGrid />
    </>
  );
}
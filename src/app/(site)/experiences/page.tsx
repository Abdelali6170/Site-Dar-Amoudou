// src/app/(site)/experiences/page.tsx

import type { Metadata } from "next";
import { EXPERIENCES } from "../../../lib/experiences";
import ExperiencesHero from "../../../components/sections/experiences/ExperiencesHero";
import ExperiencesList from "../../../components/sections/experiences/ExperiencesList";

export const metadata: Metadata = {
  title: "Expériences | Dar Amoudou",
  description:
    "Trek dans l'Atlas, cuisine berbère, hammam traditionnel, nuit sous les étoiles — des expériences conçues pour révéler l'âme du Maroc profond.",
};

export default function ExperiencesPage() {
  return (
    <main>
      <ExperiencesHero />
      <ExperiencesList experiences={EXPERIENCES} />
    </main>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { draftMode } from "next/headers";
import { getAllExperiences } from "@/lib/queries";
import ExperiencesHero from "../../../components/sections/experiences/ExperiencesHero";
import ExperiencesList from "../../../components/sections/experiences/ExperiencesList";

export const metadata: Metadata = {
  title: "Expériences | Dar Amoudou",
  description:
    "Trek, hammam, cuisine berbère, nuit sous les étoiles... Vivez l'Atlas de l'intérieur.",
};

export default async function ExperiencesPage() {
  const { isEnabled: isDraft } = await draftMode();
  const experiences = await getAllExperiences(isDraft);

  return (
    <>
      <ExperiencesHero />
      <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
        <ExperiencesList experiences={experiences} />
      </Suspense>
    </>
  );
}

// src/app/(site)/suites/page.tsx

import type { Metadata } from "next";
import { getAllSuites } from "../../../lib/queries";
import { SUITES } from "../../../lib/suites";
import SuitesHero from "../../../components/sections/suites/SuitesHero";
import SuitesList from "../../../components/sections/suites/SuitesList";

export const metadata: Metadata = {
  title: "Nos Suites | Dar Amoudou",
  description:
    "Trois suites d'exception suspendues entre ciel et Atlas. Chacune raconte une histoire différente de la montagne marocaine.",
};

export default async function SuitesPage() {
  // Tente de récupérer depuis Sanity, fallback sur les données mock si vide
  let suites = await getAllSuites();
  if (!suites || suites.length === 0) {
    suites = SUITES;
  }

  return (
    <main>
      <SuitesHero />
      <SuitesList suites={suites} />
    </main>
  );
}

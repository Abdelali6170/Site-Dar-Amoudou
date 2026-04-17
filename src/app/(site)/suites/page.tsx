// src/app/(site)/suites/page.tsx

import type { Metadata } from "next";
import { SUITES } from "../../../lib/suites";
import SuitesHero from "../../../components/sections/suites/SuitesHero";
import SuitesList from "../../../components/sections/suites/SuitesList";

export const metadata: Metadata = {
  title: "Nos Suites | Dar Amoudou",
  description:
    "Trois suites d'exception suspendues entre ciel et Atlas. Chacune raconte une histoire différente de la montagne marocaine.",
};

export default function SuitesPage() {
  return (
    <main>
      <SuitesHero />
      <SuitesList suites={SUITES} />
    </main>
  );
}

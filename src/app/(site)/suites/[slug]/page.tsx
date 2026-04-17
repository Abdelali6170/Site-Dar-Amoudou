// src/app/(site)/suites/[slug]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getSuiteBySlug, getAllSlugs } from "../../../../lib/suites";
import SuiteGallery from "../../../../components/sections/suites/SuiteGallery";
import SuiteSidebar from "../../../../components/sections/suites/SuiteSidebar";
import SuiteAmbiance from "../../../../components/sections/suites/SuiteAmbiance";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const suite = getSuiteBySlug(slug);
  if (!suite) return {};
  return {
    title: `${suite.name} | Dar Amoudou`,
    description: suite.description,
    openGraph: {
      title: `${suite.name} | Dar Amoudou`,
      description: suite.description,
      images: [{ url: suite.images[0]?.src ?? "" }],
    },
  };
}

export default async function SuitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const suite = getSuiteBySlug(slug);
  if (!suite) notFound();

  const [heroImage, ...restImages] = suite.images;

  return (
    <main>

      {/* ── 1. IMAGE HERO — 100% largeur ── */}
      <SuiteGallery
        images={[heroImage]}
        name={suite.name}
        heroOnly
      />

      {/* ── 2. DEUX COLONNES : images restantes gauche | sidebar droite ── */}
      <div className="flex flex-col lg:flex-row items-start" style={{ backgroundColor: "#FDFBF7" }}>

        {/* Colonne gauche — images empilées */}
        <div className="flex-1 flex flex-col gap-1">
          {restImages.map((img, i) => (
            <div
              key={i}
              className="relative w-full overflow-hidden"
              style={{ height: "65vh", minHeight: "320px" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="60vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Colonne droite — sidebar sticky */}
        <div
          className="lg:sticky lg:top-0 lg:self-start w-full lg:w-[420px] flex-shrink-0"
        >
          <SuiteSidebar suite={suite} />
        </div>

      </div>

      {/* ── 3. Section immersive plein-largeur ── */}
      <SuiteAmbiance suite={suite} />

    </main>
  );
}


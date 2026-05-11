// src/lib/queries.ts
import { getClient } from '@/sanity/lib/client'
import type { Suite } from './suites'
import type { Chambre } from './chambres'
import type { Experience } from './experiences'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CategorieHebergement {
  nom: string
  slug: string
  description: string
  image: {
    src: string
    alt: string
    hotspot?: { x: number; y: number }
    crop?: object
  }
  lien: string
  ordre: number
}

export interface GalerieItem {
  src: string
  alt: string
  hotspot?: { x: number; y: number }
  crop?: object
  categorie: 'Suites' | 'Gastronomie' | 'Atlas' | 'Expériences'
}

// ─── Fragments GROQ ───────────────────────────────────────────────────────────

const IMAGE_FIELDS = `
  "src": asset->url + "?w=1200&q=85",
  "hotspot": hotspot,
  "crop": crop,
  alt
`

const SUITE_FIELDS = `
  "slug": slug.current,
  name,
  subtitle,
  description,
  longDescription,
  surface,
  capacity,
  altitude,
  view,
  priceFrom,
  "images": images[]{
    ${IMAGE_FIELDS}
  },
  amenities,
  details,
  ambiance
`

const CHAMBRE_FIELDS = `
  "slug": slug.current,
  name,
  subtitle,
  description,
  longDescription,
  surface,
  capacity,
  altitude,
  view,
  priceFrom,
  "images": images[]{
    ${IMAGE_FIELDS}
  },
  amenities,
  details,
  ambiance
`

// ─── Catégories Hébergement ───────────────────────────────────────────────────

export async function getCategoriesHebergement(
  preview = false
): Promise<CategorieHebergement[]> {
  return getClient(preview).fetch(`
    *[_type == "categorieHebergement"] | order(ordre asc) {
      nom,
      "slug": slug.current,
      description,
      "image": {
        "src": image.asset->url + "?w=800&q=85",
        "hotspot": image.hotspot,
        "crop": image.crop,
        "alt": image.alt
      },
      lien,
      ordre
    }
  `)
}

// ─── Suites ───────────────────────────────────────────────────────────────────

export async function getAllSuites(preview = false): Promise<Suite[]> {
  const suites = await getClient(preview).fetch<Suite[]>(
    `*[_type == "suite"] | order(priceFrom asc) { ${SUITE_FIELDS} }`
  )
  // Fallback mock si Sanity vide
  if (!suites || suites.length === 0) {
    const { SUITES } = await import('./suites')
    return SUITES
  }
  return suites
}

export async function getSuiteBySlug(
  slug: string,
  preview = false
): Promise<Suite | undefined> {
  const suite = await getClient(preview).fetch<Suite | null>(
    `*[_type == "suite" && slug.current == $slug][0]{ ${SUITE_FIELDS} }`,
    { slug }
  )
  if (!suite) {
    const { getSuiteBySlug: getMock } = await import('./suites')
    return getMock(slug)
  }
  return suite
}

export async function getAllSuiteSlugs(): Promise<string[]> {
  const [sanityData] = await Promise.all([
    getClient().fetch<{ slug: string }[]>(
      `*[_type == "suite"]{ "slug": slug.current }`
    ),
  ])
  const sanitySlugs = (sanityData || []).map((s) => s.slug)
  const { getAllSlugs: getMockSlugs } = await import('./suites')
  const mockSlugs = getMockSlugs()
  // Union des deux (évite les pages 404 pendant la migration)
  return Array.from(new Set([...sanitySlugs, ...mockSlugs]))
}

// ─── Chambres ─────────────────────────────────────────────────────────────────

export async function getAllChambres(preview = false): Promise<Chambre[]> {
  const chambres = await getClient(preview).fetch<Chambre[]>(
    `*[_type == "chambre"] | order(priceFrom asc) { ${CHAMBRE_FIELDS} }`
  )
  if (!chambres || chambres.length === 0) {
    const { CHAMBRES } = await import('./chambres')
    return CHAMBRES
  }
  return chambres
}

export async function getChambreBySlug(
  slug: string,
  preview = false
): Promise<Chambre | undefined> {
  const chambre = await getClient(preview).fetch<Chambre | null>(
    `*[_type == "chambre" && slug.current == $slug][0]{ ${CHAMBRE_FIELDS} }`,
    { slug }
  )
  if (!chambre) {
    const { getChambreBySlug: getMock } = await import('./chambres')
    return getMock(slug)
  }
  return chambre
}

export async function getAllChambreSlugs(): Promise<string[]> {
  const sanityData = await getClient().fetch<{ slug: string }[]>(
    `*[_type == "chambre"]{ "slug": slug.current }`
  )
  const sanitySlugs = (sanityData || []).map((s) => s.slug)
  const { getAllChambreSlugs: getMockSlugs } = await import('./chambres')
  const mockSlugs = getMockSlugs()
  return Array.from(new Set([...sanitySlugs, ...mockSlugs]))
}

// ─── Expériences ──────────────────────────────────────────────────────────────

export async function getAllExperiences(
  preview = false
): Promise<Experience[]> {
  const experiences = await getClient(preview).fetch<Experience[]>(`
    *[_type == "experience"] | order(numero asc) {
      "id": id.current,
      numero,
      tag,
      titre,
      sousTitre,
      description,
      details,
      duree,
      difficulte,
      saison,
      included,
      "image": image.asset->url + "?w=1400&q=85",
      "imageAlt": image.alt,
      "imageSecondaire": imageSecondaire.asset->url + "?w=800&q=85"
    }
  `)
  if (!experiences || experiences.length === 0) {
    const { EXPERIENCES } = await import('./experiences')
    return EXPERIENCES
  }
  return experiences
}

// ─── Galerie ──────────────────────────────────────────────────────────────────

export async function getGalerieItems(
  preview = false
): Promise<GalerieItem[]> {
  return getClient(preview).fetch(`
    *[_type == "galerieItem"] | order(ordre asc) {
      "src": image.asset->url + "?w=1200&q=85",
      "hotspot": image.hotspot,
      "crop": image.crop,
      "alt": image.alt,
      categorie
    }
  `)
}

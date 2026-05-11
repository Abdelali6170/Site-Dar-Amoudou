// src/sanity/lib/client.ts
import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = '2024-01-01'

// Client standard (lecture publique, sans draft)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // Content Source Maps activées → nécessaire pour le click-to-edit
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333',
  },
})

// Client avec token (draft mode + écriture)
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts',
  stega: {
    enabled: true,
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333',
  },
})

// Retourne le bon client selon le mode draft
export function getClient(preview = false) {
  return preview ? previewClient : client
}

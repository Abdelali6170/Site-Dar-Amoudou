// sanity.config.ts — racine du projet Next.js
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import suite from './src/sanity/schemas/suite'
import experience from './src/sanity/schemas/experience'
import galerieItem from './src/sanity/schemas/galerie'
import categorieHebergement from './src/sanity/schemas/categorieHebergement'
import chambre from './src/sanity/schemas/chambre'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'dar-amoudou',
  title: 'Dar Amoudou Studio',
  projectId,
  dataset,

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        // En dev → localhost:3000, en prod → URL Hostinger
        origin:
          process.env.NEXT_PUBLIC_SITE_URL ||
          (process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://ton-domaine-hostinger.com'),
        draftMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],

  schema: {
    types: [suite, chambre, experience, galerieItem, categorieHebergement],
  },
})

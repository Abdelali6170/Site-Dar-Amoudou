// src/sanity/schemas/galerie.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galerieItem',
  title: 'Photo galerie',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Texte alternatif', type: 'string' },
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: ['Suites', 'Gastronomie', 'Atlas', 'Expériences'],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'ordre',
      title: "Ordre d'affichage",
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: 'ordreAsc',
      by: [{ field: 'ordre', direction: 'asc' }],
    },
  ],
})

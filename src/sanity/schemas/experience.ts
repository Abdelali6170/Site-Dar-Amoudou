// src/sanity/schemas/experience.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Expérience',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Identifiant (slug)',
      type: 'slug',
      options: { source: 'titre' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'numero',
      title: "Numéro d'ordre (01, 02…)",
      type: 'string',
    }),
    defineField({
      name: 'tag',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: ['Aventure', 'Culture', 'Gastronomie', 'Bien-être', 'Nature'],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sousTitre',
      title: 'Sous-titre',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'details',
      title: 'Détails',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'duree',
      title: 'Durée',
      type: 'string',
    }),
    defineField({
      name: 'difficulte',
      title: 'Difficulté',
      type: 'string',
    }),
    defineField({
      name: 'saison',
      title: 'Saison',
      type: 'string',
    }),
    defineField({
      name: 'included',
      title: 'Inclus dans la prestation',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Texte alternatif', type: 'string' },
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'imageSecondaire',
      title: 'Image secondaire (optionnelle)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: 'Numéro croissant',
      name: 'numeroAsc',
      by: [{ field: 'numero', direction: 'asc' }],
    },
  ],
})

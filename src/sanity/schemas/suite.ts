// src/sanity/schemas/suite.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'suite',
  title: 'Suite',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'longDescription',
      title: 'Description longue',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'surface',
      title: 'Surface (m²)',
      type: 'number',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacité (personnes)',
      type: 'number',
    }),
    defineField({
      name: 'altitude',
      title: 'Altitude',
      type: 'string',
    }),
    defineField({
      name: 'view',
      title: 'Vue',
      type: 'string',
    }),
    defineField({
      name: 'priceFrom',
      title: 'Prix à partir de (€/nuit)',
      type: 'number',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'amenities',
      title: 'Équipements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icône (nom SVG)', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'details',
      title: 'Détails techniques',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Valeur', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'ambiance',
      title: 'Ambiance (paragraphe immersif)',
      type: 'text',
      rows: 4,
    }),
  ],
  orderings: [
    {
      title: 'Prix croissant',
      name: 'priceAsc',
      by: [{ field: 'priceFrom', direction: 'asc' }],
    },
  ],
})

// src/sanity/schemas/categorieHebergement.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'categorieHebergement',
  title: 'Catégorie Hébergement',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom de la catégorie',
      type: 'string',
      validation: (r) => r.required(),
      description: 'Ex: Suites, Chambres',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'nom' },
      validation: (r) => r.required(),
      description: 'Généré automatiquement depuis le nom',
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 2,
      validation: (r) => r.required().max(120),
      description: 'Affiché dans le mega menu (max 120 caractères)',
    }),
    defineField({
      name: 'image',
      title: 'Image du mega menu',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Texte alternatif', type: 'string' },
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'lien',
      title: 'Lien de la catégorie',
      type: 'string',
      validation: (r) => r.required(),
      description: 'Ex: /suites ou /chambres',
    }),
    defineField({
      name: 'ordre',
      title: "Ordre d'affichage dans le menu",
      type: 'number',
      validation: (r) => r.required(),
      description: '1 = première colonne, 2 = deuxième colonne',
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: 'ordreAsc',
      by: [{ field: 'ordre', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'nom',
      media: 'image',
      subtitle: 'description',
    },
  },
})

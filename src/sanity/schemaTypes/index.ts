// src/sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import suite from '../schemas/suite'
import chambre from '../schemas/chambre'
import experience from '../schemas/experience'
import galerieItem from '../schemas/galerie'
import categorieHebergement from '../schemas/categorieHebergement'

export const schemaTypes: SchemaTypeDefinition[] = [
  suite,
  chambre,
  experience,
  galerieItem,
  categorieHebergement,
]

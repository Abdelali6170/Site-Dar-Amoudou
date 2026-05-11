// studio-standalone/Dar Amoudou Studio/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import suite from './suite'
import experience from './experience'
import galerieItem from './galerie'
import categorieHebergement from './categorieHebergement'
 
export const schemaTypes: SchemaTypeDefinition[] = [
  suite,
  experience,
  galerieItem,
  categorieHebergement,
]
 
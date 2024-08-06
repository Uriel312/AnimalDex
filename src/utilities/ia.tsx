import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

const google = createGoogleGenerativeAI({
  apiKey: import.meta.env.VITE_IA_KEY,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta'
});

const conservationStatus = z.enum([
  "Extinto",
  "Extinto en Estado Silvestre",
  "En Peligro Crítico",
  "En Peligro",
  "Vulnerable",
  "Casi Amenazado",
  "Preocupación Menor"
]);

const hostilityLevel = z.enum([
  "Inofensivo",
  "Moderadamente Peligroso",
  "Peligroso"
]);

const diet = z.enum([
  "Carnívoro",
  "Herbívoro",
  "Omnívoro",
  "Insectívoro",
  "Piscívoro",
  "Frugívoro",
  "Nectarívoro",
  "Coprófago",
  "Detritívoro",
  "Planctonívoro",
  "Micófago"
]);


const schema = z.object({
  common_name: z.string(),
  scientific_name: z.string(),
  animal_category: z.string(),
  weight: z.string(),
  height: z.string(),
  diet: diet,
  birth_type: z.string(),
  lifespan: z.string(),
  max_speed: z.string(),
  behavior_description: z.string(),
  habitat: z.string(),
  description: z.string(),
  conservation_status: conservationStatus,
  hostility_level: hostilityLevel,
  poison: z.boolean(),
  dangerous_to_humans: z.boolean(),
})

export async function getAnimalData(img: string) {
  const { object } = await generateObject({
    model: google('models/gemini-1.5-flash-latest'),
    temperature: 1,
    schema: schema,
    mode: 'json',
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: `Genera los datos del animal que aparece en la imagen, en idioma español. El campo 'animal_category' debe indicar el tipo del animal, por ejemplo, felino o insecto. Todas las medidas deben estar en el sistema de medidas internacional y abreviadas.` },
        { type: 'image', image: img }
      ]
    }]
  })

  return object
}

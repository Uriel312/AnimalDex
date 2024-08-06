import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

const google = createGoogleGenerativeAI({
  apiKey: import.meta.env.VITE_IA_KEY,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta'
});


const getPromp = (img: string) => {
  return `generame un objeto JSON con los siguientes datos de {id: 3,  nombre_común: 'Tigre de Bengala', nombre_científico: 'Panthera tigris tigris',tipo: Felino, Habilidades:Agilidad, Fuerza, Caza, peso: '100-300 kg', altura: '90-110 cm',  dieta: 'Carnívoro', tipo_de_nacimiento: 'Mamífero', esperanza_de_vida: '10-15 años en estado salvaje, hasta 20 años en cautiverio', velocidad_maxima: '65 km/h', reproducción: { periodo_de_gestación: '104-106 días', crías_por_parto: '2-4 cachorros'  }, comportamiento: 'Solitaria, territorial y nocturna. Los tigres son cazadores oportunistas y se alimentan principalmente de grandes ungulados., descripción: El tigre de Bengala es una de las subespecies de tigre más conocidas. Se caracteriza por su pelaje anaranjado con rayas negras y su impresionante tamaño. Es nativo de India, Bangladés, Nepal y Bután.', hábitat: 'Bosques tropicales, manglares y praderas', estado_de_conservación: 'En peligro',  imagen: 'url_de_la_imagen'} con el animal de esta imagen "${img}", si no es un animal manda un json de error de esta manera {error: ''} con su mensaje correspondiente`
}

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

const schema = z.object({
  common_name: z.string(),
  scientific_name: z.string(),
  animal_category: z.string(),
  weight: z.string(),
  height: z.string(),
  diet: z.string(),
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
  const promp = getPromp(img)
  navigator.clipboard.writeText(promp);

  const { object } = await generateObject({
    model: google('models/gemini-1.5-flash-latest'),
    temperature: 1,
    schema: schema,
    mode: 'json',
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: `generame los datos del animal que aparece en la imagen, en idioma español` },
        { type: 'image', image: img }
      ]
    }]
  })

  return object
}

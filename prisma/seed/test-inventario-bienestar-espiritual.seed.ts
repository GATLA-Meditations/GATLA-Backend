import { PrismaClient } from '@prisma/client';

export async function uploadInventarioBienestarEspiritual() {
  const prisma = new PrismaClient();
  await uploadQuestionnaire(prisma);
  await prisma.$disconnect();
}

async function uploadQuestionnaire(prisma: PrismaClient) {
  await prisma.questionnaire.upsert({
    where: { id: 'inventario-de-bienestar-espiritual' },
    update: {},
    create: {
      id: 'inventario-de-bienestar-espiritual',
      name: 'Inventario de Bienestar Espiritual',
      questions: {
        createMany: {
          data: [
            {
              id: 'inventario-bienestar-espiritual-1',
              name: '1 No hay mucho que pueda hacer para ayudarme a mí mismo',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["Completamente de acuerdo", "De acuerdo", "Ni de acuerdo ni en desacuerdo", "En desacuerdo", "Completamente en desacuerdo" ] }'
            },
            {
              id: 'inventario-bienestar-espiritual-2',
              name: '2 Frecuentemente, no hay forma de que yo pueda completar algo que haya iniciado',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["Completamente de acuerdo", "De acuerdo", "Ni de acuerdo ni en desacuerdo", "En desacuerdo", "Completamente en desacuerdo" ] }'
            },
            {
              id: 'inventario-bienestar-espiritual-3',
              name: '3 No puedo comenzar a entender mis problemas',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["Completamente de acuerdo", "De acuerdo", "Ni de acuerdo ni en desacuerdo", "En desacuerdo", "Completamente en desacuerdo" ] }'
            },
            {
              id: 'inventario-bienestar-espiritual-4',
              name: '4 Siento que las cosas me sobrepasan cuando tengo problemas y dificultades personales',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["Completamente de acuerdo", "De acuerdo", "Ni de acuerdo ni en desacuerdo", "En desacuerdo", "Completamente en desacuerdo" ] }'
            },
            {
              id: 'inventario-bienestar-espiritual-5',
              name: '5 No sé cómo comenzar a resolver mis problemas',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["Completamente de acuerdo", "De acuerdo", "Ni de acuerdo ni en desacuerdo", "En desacuerdo", "Completamente en desacuerdo" ] }'
            },
            {
              id: 'inventario-bienestar-espiritual-6',
              name: '6 No hay mucho que yo pueda hacer para marcar una diferencia en mi vida',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["Completamente de acuerdo", "De acuerdo", "Ni de acuerdo ni en desacuerdo", "En desacuerdo", "Completamente en desacuerdo" ] }'
            },
            {
              id: 'inventario-bienestar-espiritual-7',
              name: '7 Todavía no le encuentro un propósito a mi vida',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["Completamente de acuerdo", "De acuerdo", "Ni de acuerdo ni en desacuerdo", "En desacuerdo", "Completamente en desacuerdo" ] }'
            },
            {
              id: 'inventario-bienestar-espiritual-8',
              name: '8 No me conozco a mí mismo, de donde vengo o a donde voy',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["Completamente de acuerdo", "De acuerdo", "Ni de acuerdo ni en desacuerdo", "En desacuerdo", "Completamente en desacuerdo" ] }'
            },
            {
              id: 'inventario-bienestar-espiritual-9',
              name: '9 Me hace falta un propósito en mi vida',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["Completamente de acuerdo", "De acuerdo", "Ni de acuerdo ni en desacuerdo", "En desacuerdo", "Completamente en desacuerdo" ] }'
            },
            {
              id: 'inventario-bienestar-espiritual-10',
              name: '10 En este mundo, no sé qué lugar ocupo',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["Completamente de acuerdo", "De acuerdo", "Ni de acuerdo ni en desacuerdo", "En desacuerdo", "Completamente en desacuerdo" ] }'
            },
            {
              id: 'inventario-bienestar-espiritual-11',
              name: '11 Estoy muy lejos de entender el significado de mi vida',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["Completamente de acuerdo", "De acuerdo", "Ni de acuerdo ni en desacuerdo", "En desacuerdo", "Completamente en desacuerdo" ] }'
            },
            {
              id: 'inventario-bienestar-espiritual-12',
              name: '12 Hay un gran vacío en mi vida en este momento',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["Completamente de acuerdo", "De acuerdo", "Ni de acuerdo ni en desacuerdo", "En desacuerdo", "Completamente en desacuerdo" ] }'
            },
          ]
        }
      }
    }
  })
}
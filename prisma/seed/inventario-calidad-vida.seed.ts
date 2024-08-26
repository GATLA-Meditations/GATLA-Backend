import { PrismaClient } from '@prisma/client';

export async function uploadInventariodeCalidaddeVida() {
  const prisma = new PrismaClient();
  await uploadQuestionnaire(prisma);
  await prisma.$disconnect();
}

async function uploadQuestionnaire(prisma: PrismaClient) {
  await prisma.questionnaire.upsert({
    where: { id: 'inventario-calidad-vida' },
    update: {},
    create: {
      id: 'inventario-calidad-vida',
      name: 'Inventario de Calidad de Vida',
      questions: {
        createMany: {
          data: [
            {
              id: 'inventario-calidad-vida-0',
              name:
                'Estamos interesados en algunos aspectos de su vida cotidiana y de su salud. Por favor, responda a todas las' +
                ' preguntas personalmente marcar la opción que se aplique a su caso. No hay respuestas ' +
                '"correctas" o "incorrectas". La información que nos proporcione será estrictamente confidencial.',
              type: 'NOT_A_QUESTION',
              metadata: '{"comment": "comment before questions"}',
            },
            {
              id: 'inventario-calidad-vida-1',
              name: '1,  ¿Tiene alguna dificultad para hacer actividades que requieran un esfuerzo importante, importante, como llevar una bolsa de compras pesada o una valija?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-2',
              name: '2.  ¿Tiene alguna dificultad para dar un paseo largo?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-3',
              name: '3. ¿Tiene alguna dificultad para dar un paseo corto fuera de la casa?  ',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-4',
              name: '4. ¿Tiene que permanecer en cama o sentado/a en una silla durante el día? ',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-5',
              name: '5. ¿Necesita ayuda para comer, vestirse, asearse o ir al baño?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-prox-pgreg-1',
              name: 'Durante la semana pasada',
              type: 'NOT_A_QUESTION',
              metadata: '{ "comment": "Next questions are about the last week" }',
            },
            {
              id: 'inventario-calidad-vida-6',
              name: '6. ¿Tuvo algún impedimento para hacer su trabajo u otras actividades cotidianas?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-7',
              name: '7. ¿Tuvo algún impedimento para realizar sus pasatiempos favoritos u otras actividades recreativas?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-8',
              name: '8. ¿Tuvo sensación de “falta de aire” o dificultades para respirar?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-9',
              name: '9. ¿Ha tenido dolor? ',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-10',
              name: '10. ¿Necesitó descansar más de lo habitual?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-11',
              name: '11. ¿Ha tenido dificultad para dormir?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-12',
              name: '12. ¿Se ha sentido débil?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-13',
              name: '13. ¿Ha perdido el apetito?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-14',
              name: '14. ¿Ha tenido náuseas?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-15',
              name: '15. ¿Ha vomitado?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-16',
              name: '16. ¿Ha estado estreñido/a?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-17',
              name: '17. ¿Ha tenido diarrea?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-18',
              name: '18. ¿Se ha sentido cansado?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-19',
              name: '19. ¿Ha interferido el dolor durante sus actividades diarias?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-20',
              name: '20. ¿Ha tenido dificultad para concentrarse en cosas como leer el diario o ver la televisión? ',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-21',
              name: '21. ¿Se ha sentido tenso/a?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-22',
              name: '22.¿Se ha sentido preocupado/a?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-23',
              name: '23. ¿Se ha sentido irritable?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-24',
              name: '24 .¿Se ha sentido deprimido/a?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-25',
              name: '25. ¿Ha tenido dificultad para recordar cosas?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-26',
              name: '26 ¿Ha interferido su estado físico o el tratamiento medico en su vida familiar?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-27',
              name: '27. ¿Ha interferido su estado físico o el tratamiento medico en sus actividades sociales?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-28',
              name: '28. ¿Le ha causado problemas económicos su estado físico o el tratamiento médico?',
              type: 'SINGLE_CHOICE',
              metadata: '{ "options": ["En absoluto", "Un poco", "Bastante" "Mucho"] }',
            },
            {
              id: 'inventario-calidad-vida-prox-preg-2',
              name: 'Para las siguientes preguntas por favor marque el número que mejor lo describa siendo 1 pésima y 5 exelente ',
              type: 'NOT_A_QUESTION',
              metadata: '{ "comment": "Place-holder for next questions" }',
            },
            {
              id: 'inventario-calidad-vida-29',
              name: '29. ¿Cómo calificaría su estado de salud general durante la semana pasada?',
              type: 'NUMERIC',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'inventario-calidad-vida-30',
              name: '30. ¿Cómo calificaría su calidad de vida en general durante la semana pasada?',
              type: 'NUMERIC',
              metadata: '{ "min": 1, "max": 5 }',
            },
          ],
        },
      },
    },
  });
}

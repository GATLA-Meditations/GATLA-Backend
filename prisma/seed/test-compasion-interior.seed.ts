import { PrismaClient } from '@prisma/client';

export async function uploadCompasionInterior() {
  const prisma = new PrismaClient();
  await uploadQuestionnaire(prisma);
  await prisma.$disconnect();

}

async function uploadQuestionnaire(prisma: PrismaClient) {
  prisma.questionnaire.upsert({
    where: { id: 'compasion-interior' },
    update: {},
    create: {
      id: 'compasion-interior',
      name: 'Compasión Interior',
      questions: {
        createMany: {
          data: [
            {
              id: 'compasion-interior-0',
              type: 'NOT_A_QUESTION',
              name: '"Lea atentamente cada afirmación antes de responder. Para cada punto, indique con qué frecuencia se comporta\n' +
                'de la manera indicada, utilizando la siguiente escala entre 1 y 5.  Por favor, responda según lo que realmente refleja\n' +
                'su experiencia en lugar de lo que cree que debería ser su experiencia. "',
              metadata: '{}',
            },
            {
              id: 'compasion-interior-1',
              type: 'NUMERIC',
              name: '1. Yo desapruebo y juzgo mis propias imperfecciones y debilidades',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-2',
              type: 'NUMERIC',
              name: '2. Cuando me siento desanimado tiendo a obsesionarme y fijarme en todo lo que está mal',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-3',
              type: 'NUMERIC',
              name: '3. Cuando las cosas van mal para mí, veo las dificultades como parte de la vida que a todos nos toca vivir',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-4',
              type: 'NUMERIC',
              name: '4. Cuando pienso en mis debilidades, tiendo a sentirme más separado y aislado del resto del mundo',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-5',
              type: 'NUMERIC',
              name: '5. No darme cuenta que estoy incómodo o tenso hasta que estas sensaciones se vuelven muy tensas',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-6',
              type: 'NUMERIC',
              name: '6. Cuando fallo en algo que es importante para mí, me invade un sentimiento de ser incompetente',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-7',
              type: 'NUMERIC',
              name: '7. Cuando estoy desanimado y triste, me recuerdo a mí mismo que hay mucha gente en el mundo que se siente como yo',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-8',
              type: 'NUMERIC',
              name: '8. Cuando las circunstancias son realmente difíciles, tiendo a ser duro conmigo mismo',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-9',
              type: 'NUMERIC',
              name: '9. Cuando algo me altera trato de mantener mis emociones en equilibrio.',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-10',
              type: 'NUMERIC',
              name: '10. Cuando me siento incompetente de algún modo, trato de recordar que estos sentimientos de incompetencia, son compartidos por la mayoría de las personas.',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-11',
              type: 'NUMERIC',
              name: '11. Soy intolerante e impaciente hacia aquellos aspectos de mi personalidad que no me gustan',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-12',
              type: 'NUMERIC',
              name: '12. Cuando estoy pasando por un período muy difícil, me brindo el cuidado y la ternura que necesito',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-13',
              type: 'NUMERIC',
              name: '13. Cuando estoy con el ánimo bajo, tiendo a sentir que los demás probablemente están más felices que yo',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-14',
              type: 'NUMERIC',
              name: '14. Cuando algo doloroso sucede trato de tomar una perspectiva equilibrada de la situación.',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-15',
              type: 'NUMERIC',
              name: '15. Trato de ver mis errores como parte de la condición humana',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-16',
              type: 'NUMERIC',
              name: '16. Cuando veo aspectos de mí mismo/a que no me gustan, me critico a mí mismo/a',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-17',
              type: 'NUMERIC',
              name: '17. Cuando fallo en algo que tiene importancia para mí trato de ver las cosas en perspectiva',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-18',
              type: 'NUMERIC',
              name: '18. Cuando estoy pasando por un momento difícil, tiendo a pensar que para los demás esas cosas son más fáciles',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-19',
              type: 'NUMERIC',
              name: '19. Soy amable conmigo mismo cuando estoy sufriendo',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-20',
              type: 'NUMERIC',
              name: '20. Cuando algo me altera me dejo llevar por mis sentimientos ',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-21',
              type: 'NUMERIC',
              name: '21. Puedo ser un poco duro conmigo mismo cuando estoy sufriendo',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-22',
              type: 'NUMERIC',
              name: '22. Cuando me siento deprimido intento relacionarme con mis sentimientos con curiosidad y apertura',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-23',
              type: 'NUMERIC',
              name: '23. Soy tolerante con mis propias imperfecciones y debilidades',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-24',
              type: 'NUMERIC',
              name: '24. Cuando algo doloroso sucede tiendo a ver la situación de forma desproporcionada',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-25',
              type: 'NUMERIC',
              name: '25. Cuando fallo en algo que es importante para mí, tiendo a sentirme solo en mi fracaso',
              metadata: '{ "min": 1, "max": 5 }',
            },
            {
              id: 'compasion-interior-26',
              type: 'NUMERIC',
              name: '26. Trato de ser comprensivo y paciente hacia aquellos aspectos de mi personalidad que no me gustan',
              metadata: '{ "min": 1, "max": 5 }',
            },
          ]
        }
      }
    }
  })
}
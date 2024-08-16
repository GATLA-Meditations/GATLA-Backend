import { PrismaClient } from '@prisma/client';

export async function uploadEmocionesPositivas() {
  const prisma = new PrismaClient();
  await uploadQuestionnaire(prisma);
  await prisma.$disconnect();

}

async function uploadQuestionnaire(prisma: PrismaClient) {
  await prisma.questionnaire.upsert({
    where: { id: 'emociones-positivas' },
      update: {},
      create: {
        id: 'emociones-positivas',
       name: 'Emociones Positivas',
        questions: {
          createMany: {
            data: [
              {
                id: 'emociones-positivas-1',
                type: 'SINGLE_CHOICE',
                name: '1- Compasión- Soy una persona que se compadece de los demás.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-2',
                type: 'SINGLE_CHOICE',
                name: '2- Interés-Entusiasmo- Frecuentemente busco nuevas oportunidades para crecer en diferentes aspectos.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-3',
                type: 'SINGLE_CHOICE',
                name: '3- Gratitud- Me siento muy agradecido por todo lo que tengo.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-4',
                type: 'SINGLE_CHOICE',
                name: '4- Tranquilidad- Frecuentemente me siento libre de sensaciones de intranquilidad o agitación interna.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-5',
                type: 'SINGLE_CHOICE',
                name: '5- Alegría- La alegría es una emoción que forma parte de mi vida diaria.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-6',
                type: 'SINGLE_CHOICE',
                name: '6- Tranquilidad- En general siento paz o tranquilidad interior.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-7',
                type: 'SINGLE_CHOICE',
                name: '7- Gratitud- Identifico una larga lista de motivos por todo lo que me siento agradecido.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-8',
                type: 'SINGLE_CHOICE',
                name: '8- Alegría- Soy una persona alegre.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-9',
                type: 'SINGLE_CHOICE',
                name: '9- Gratitud- Frecuentemente siento gratitud hacia quienes me ayudaron a alcanzar mis objetivos.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-10',
                type: 'SINGLE_CHOICE',
                name: '10- Tranquilidad- A pesar de las vicisitudes, soy una persona que tiende a mantener la calma.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-11',
                type: 'SINGLE_CHOICE',
                name: '11- Compasión- En general me da tanta pena ver sufrir a los demás, que siento la necesidad de hacer algo por el otro.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-12',
                type: 'SINGLE_CHOICE',
                name: '12- Alegría- Soy de esas personas que transmiten mucha alegría.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-13',
                type: 'SINGLE_CHOICE',
                name: '13- Tranquilidad- Siento mucha calma en mi interior.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-14',
                type: 'SINGLE_CHOICE',
                name: '14- Interés-Entusiasmo- Donde vaya, siempre estoy a la búsqueda de nuevas cosas o experiencias.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-15',
                type: 'SINGLE_CHOICE',
                name: '15- Gratitud- Tengo razones suficientes para sentirme agradecido en la vida.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-16',
                type: 'SINGLE_CHOICE',
                name: '16- Compasión- Soy tan sensible frente a los problemas de los demás, que trato de ayudar a resolver o evitarles el malestar.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-17',
                type: 'SINGLE_CHOICE',
                name: '17- Interés-Entusiasmo- Me entusiasman las experiencias nuevas y/o lo desconocido.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-18',
                type: 'SINGLE_CHOICE',
                name: '18- Alegría- Los demás consideran que soy una persona alegre.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-19',
                type: 'SINGLE_CHOICE',
                name: '19- Interés- Entusiasmo-Realmente encuentro muchas cosas que me resultan interesantes.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-20',
                type: 'SINGLE_CHOICE',
                name: '20- Tranquilidad- Soy una persona que en general se siente tranquila.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-21',
                type: 'SINGLE_CHOICE',
                name: '21- Compasión- Los demás consideran que soy una persona que tiene una gran compasión por los demás.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-22',
                type: 'SINGLE_CHOICE',
                name: '22-Interés-Entusiasmo- Tener nuevos desafíos, es algo que me entusiasma mucho.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-23',
                type: 'SINGLE_CHOICE',
                name: '23- Compasión- Me caracterizo por ser una persona que se conmueve ante el padecimiento de los demás.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-24',
                type: 'SINGLE_CHOICE',
                name: '24- Interés-Entusiasmo- Soy una persona a la que le interesan diferentes cosas.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-25',
                type: 'SINGLE_CHOICE',
                name: '25- Tranquilidad- Me siento tranquilo/a conmigo misma/o.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-26',
                type: 'SINGLE_CHOICE',
                name: '26- Gratitud- Si hago un balance, siento que tengo muchos motivos para sentirme agradecido.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-27',
                type: 'SINGLE_CHOICE',
                name: '27- Alegría- Muchos me dicen que soy una persona que siempre está contenta.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-28',
                type: 'SINGLE_CHOICE',
                name: '28- Interés-Entusiasmo- El entusiasmo que me caracteriza, me lleva muchas veces a involucrarme en diferentes actividades.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-29',
                type: 'SINGLE_CHOICE',
                name: '29- Gratitud- Conozco muchas personas con las que me siento agradecido.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-30',
                type: 'SINGLE_CHOICE',
                name: '30- Alegría- En general, soy una persona que está contenta.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-31',
                type: 'SINGLE_CHOICE',
                name: '31- Compasión- Me caracterizo por ser una persona que se compadece de los demás y/o de sí mismo.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-32',
                type: 'SINGLE_CHOICE',
                name: '32- Tranquilidad- Mi mente y mi cuerpo están en general relajados, tranquilos.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-33',
                type: 'SINGLE_CHOICE',
                name: '33- Alegría- La mayoría de la gente dice que mi alegría es contagiosa.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-34',
                type: 'SINGLE_CHOICE',
                name: '34- Compasión- En general, siento la necesidad de ayudar y/o aliviar el dolor de los demás.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
              {
                id: 'emociones-positivas-35',
                type: 'SINGLE_CHOICE',
                name: '35- Gratitud- Cuando miro hacia atrás me siento agradecido por alguien o por algo.',
                metadata: '{ "options": ["Fuertemente en desacuedo", "Desacuerdo", "Neutro", "De acuerdo", "Fuertemente de acuerdo"] }',
              },
          ]
        },
      },
      }
    })
}

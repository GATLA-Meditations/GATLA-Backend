import { PrismaClient } from '@prisma/client';

export async function uploadSentidoVida() {
  const prisma = new PrismaClient();
  await uploadQuestionnaire(prisma);
  await prisma.$disconnect();
}

async function uploadQuestionnaire(prisma: any) {
  prisma.questionnaire.upsert({
    where: { id: 'sentido-de-vida' },
    create: {
      id: 'sentido-en-la-vida',
      name: 'Sentido de vida',
      questions: {
        createMany: {
          data: [
            {
              id: 'sentido-en-la-vida-1',
              type: 'SINGLE_CHOICE',
              name: '1- Estoy',
              metadata: '{ "options": ["aburrido", "neutro", "entusiasmado"] }',
            },
            {
              id: 'sentido-en-la-vida-2',
              type: 'SINGLE_CHOICE',
              name: '2- La vida es',
              metadata: '{ "options": ["rutinaria", "neutro", "emocionante"] }',
            },
            {
              id: 'sentido-en-la-vida-3',
              type: 'SINGLE_CHOICE',
              name: '3- Para mi vida',
              metadata: '{ "options": ["no tengo metas", "neutro", "si, tengo metas"] }',
            },
            {
              id: 'sentido-en-la-vida-4',
              type: 'SINGLE_CHOICE',
              name: '4- Mi vida',
              metadata: '{ "options": ["no tiene sentido", "neutro", "si, tiene sentido"] }',
            },
            {
              id: 'sentido-en-la-vida-5',
              type: 'SINGLE_CHOICE',
              name: '5- Vivo cada día como',
              metadata: '{ "options": ["idéntico", "neutro", "nuevo"] }',
            },
            {
              id: 'sentido-en-la-vida-6',
              type: 'SINGLE_CHOICE',
              name: '6- Preferiría',
              metadata: '{ "options": ["no haber nacido", "neutro", "vivir"] }',
            },
            {
              id: 'sentido-en-la-vida-7',
              type: 'SINGLE_CHOICE',
              name: '7- Al jubilarme haría',
              metadata: '{ "options": ["vaguear", "neutro", "mi interés"] }',
            },
            //8. En alcanzar metas	no he progresado			neutro			si, he progresado
            {
              id: 'sentido-en-la-vida-8',
              type: 'SINGLE_CHOICE',
              name: '8- En alcanzar metas',
              metadata: '{ "options": ["no he progresado", "neutro", "si, he progresado"] }',
            },
            //9. Mi vida está	vacía 			neutro			llena de valores
            {
              id: 'sentido-en-la-vida-9',
              type: 'SINGLE_CHOICE',
              name: '9- Mi vida está',
              metadata: '{ "options": ["vacía", "neutro", "llena de valores"] }',
            },
            //10. Si muriera, mi vida	valió la pena			neutro			no valió la pena	inv
            {
              id: 'sentido-en-la-vida-10',
              type: 'SINGLE_CHOICE',
              name: '10- Si muriera, mi vida',
              metadata: '{ "options": ["no valió la pena", "neutro", "valió la pena"] }',
            },
            //11. Tengo una razón para vivir	no			neutro			sí
            {
              id: 'sentido-en-la-vida-11',
              type: 'SINGLE_CHOICE',
              name: '11- Tengo una razón para vivir',
              metadata: '{ "options": ["no", "neutro", "si"] }',
            },
            //12. El mundo	me confunde			neutro			tiene sentido
            {
              id: 'sentido-en-la-vida-12',
              type: 'SINGLE_CHOICE',
              name: '12- El mundo',
              metadata: '{ "options": ["me confunde", "neutro", "tiene sentido"] }',
            },
            //13. Yo soy muy	responsable 			neutro			irresponsable	inv
            {
              id: 'sentido-en-la-vida-13',
              type: 'SINGLE_CHOICE',
              name: '13- Yo soy muy',
              metadata: '{ "options": ["irresponsable", "neutro", "responsable"] }',
            },
            //14. El hombre es 	libre			neutro			limitado	inv
            {
              id: 'sentido-en-la-vida-14',
              type: 'SINGLE_CHOICE',
              name: '14- El hombre es',
              metadata: '{ "options": ["limitado", "neutro", "libre"] }',
            },
            //15. Estoy preparado para morir	si			neutro			no 	inv
            {
              id: 'sentido-en-la-vida-15',
              type: 'SINGLE_CHOICE',
              name: '15- Estoy preparado para morir',
              metadata: '{ "options": ["no", "neutro", "si"] }',
            },
            //16. El suicidio	es una salida			neutro			no lo es
            {
              id: 'sentido-en-la-vida-16',
              type: 'SINGLE_CHOICE',
              name: '16- El suicidio',
              metadata: '{ "options": ["es una salida", "neutro", "no es una salida"] }',
            },
            //17. Mi capacidad de sentido es	grande			neutro			nulo	inv
            {
              id: 'sentido-en-la-vida-17',
              type: 'SINGLE_CHOICE',
              name: '17- Mi capacidad de sentido es',
              metadata: '{ "options": ["nulo", "neutro", "grande"] }',
            },
            //18. Mi vida	depende de mí			neutro			es condicionada	inv
            {
              id: 'sentido-en-la-vida-18',
              type: 'SINGLE_CHOICE',
              name: '18- Mi vida',
              metadata: '{ "options": ["es condicionada", "neutro", "depende de mí"] }',
            },
            //19. Mis tareas son	placenteras			neutro			penosas	inv
            {
              id: 'sentido-en-la-vida-19',
              type: 'SINGLE_CHOICE',
              name: '19- Mis tareas son',
              metadata: '{ "options": ["penosas", "neutro", "placenteras"] }',
            },
            //20. Yo he descubierto	vacío			neutro			sentido
            {
              id: 'sentido-en-la-vida-20',
              type: 'SINGLE_CHOICE',
              name: '20- Yo he descubierto',
              metadata: '{ "options": ["vacío", "neutro", "sentido"] }',
            },
          ],
        },
      },
    },
  });
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function main() {
  questionnaireSeed();
  userSeed();
}

async function questionnaireSeed() {
  await prisma.questionnaire.upsert({
    where: { id: 'questionnaireId' },
    update: {},
    create: {
      id: 'questionnaireId',
      name: 'Escala de satisfacción con la vida',
      questions: {
        createMany: {
          data: [
            {
              id: 'questionId1',
              type: 'NUMERIC',
              name: 'En muchos aspectos, mi vida se acerca a mi ideal',
              metadata: '{ "min": 1, "max": 7 }',
            },
            {
              id: 'questionId2',
              type: 'NUMERIC',
              name: 'Mis condiciones de vida son excelentes',
              metadata: '{ "min": 1, "max": 7 }',
            },
            {
              id: 'questionId3',
              type: 'NUMERIC',
              name: 'Estoy satisfecho/a con mi vida',
              metadata: '{ "min": 1, "max": 7 }',
            },
            {
              id: 'questionId4',
              type: 'NUMERIC',
              name: 'Hasta ahora, he conseguido las cosas importantes que quiero en la vida',
              metadata: '{ "min": 1, "max": 7 }',
            },
            {
              id: 'questionId5',
              type: 'NUMERIC',
              name: 'En muchos aspectos, mi vida se acerca a mi ideal',
              metadata: '{ "min": 1, "max": 7 }',
            },
          ],
        },
      },
    },
  });
}

async function userSeed(){
  await prisma.user.upsert({
    where: { id: 'userId' },
    update: {},
    create: {
      id: 'userId',
      patient_code: 'gtl-705',
      password: 'fake_user',
    }
  });
}

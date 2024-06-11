import { PrismaClient } from '@prisma/client';
import { uploadCompasionInterior } from './test-compasion-interior.seed';
import { uploadEmocionesPositivas } from './test-emociones-positivas.seed';
import { uploadInventarioBienestarEspiritual } from './test-inventario-bienestar-espiritual.seed';
import { uploadInventariodeCalidaddeVida } from './inventario-calidad-vida';
import { uploadUserModule } from './user-module';

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
  await questionnaireSeed();
  await userSeed();
  await treatmentSeed();
  await uploadCompasionInterior();
  await uploadEmocionesPositivas();
  await uploadInventarioBienestarEspiritual();
  await uploadInventariodeCalidaddeVida();
  await uploadUserModule();
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

async function userSeed() {
  await prisma.user.upsert({
    where: { id: 'userId' },
    update: {},
    create: {
      id: 'userId',
      patient_code: 'gtl-705',
      password: 'fake_user',
    },
  });
  await prisma.ingameData.upsert({
    where: { id: 'ingameDataId' },
    update: {},
    create: {
      id: 'ingameDataId',
      user: {
        connect: {
          id: 'userId',
        },
      },
      totalWatchTime: 45,
      maxStreak: 3,
    },
  });
}

async function treatmentSeed() {
  await prisma.treatment.upsert({
    where: { id: 'treatmentId' },
    update: {},
    create: {
      id: 'treatmentId',
      name: 'Tratamiento 1',
      description: 'Descripción de tratamiento 1',
      users: {
        connect: { id: 'userId' },
      },
    },
  });

  await prisma.module.upsert({
    where: { id: 'moduleId1' },
    update: {},
    create: {
      id: 'moduleId1',
      name: 'Semana 1',
      description: 'Descripción de semana 1',
      treatments: {
        create: {
          treatment_id: 'treatmentId',
          order: 1,
        },
      },
    },
  });
  await prisma.module.upsert({
    where: { id: 'moduleId2' },
    update: {},
    create: {
      id: 'moduleId2',
      name: 'Semana 2',
      description: 'Descripción de semana 2',
      treatments: {
        create: {
          treatment_id: 'treatmentId',
          order: 2,
        },
      },
    },
  });
  await prisma.module.upsert({
    where: { id: 'moduleId3' },
    update: {},
    create: {
      id: 'moduleId3',
      name: 'Semana 3',
      description: 'Descripción de semana 3',
      treatments: {
        create: {
          treatment_id: 'treatmentId',
          order: 3,
        },
      },
    },
  });
  await prisma.module.upsert({
    where: { id: 'moduleId4' },
    update: {},
    create: {
      id: 'moduleId4',
      name: 'Semana 4',
      description: 'Descripción de semana 4',
      treatments: {
        create: {
          treatment_id: 'treatmentId',
          order: 4,
        },
      },
    },
  });
  await prisma.module.upsert({
    where: { id: 'moduleId5' },
    update: {},
    create: {
      id: 'moduleId5',
      name: 'Semana 5',
      description: 'Descripción de semana 5',
      treatments: {
        create: {
          treatment_id: 'treatmentId',
          order: 5,
        },
      },
    },
  });
  //semana 6
  await prisma.module.upsert({
    where: { id: 'moduleId6' },
    update: {},
    create: {
      id: 'moduleId6',
      name: 'Semana 6',
      description: 'Descripción de semana 6',
      treatments: {
        create: {
          treatment_id: 'treatmentId',
          order: 6,
        },
      },
    },
  });
  //semana 7
  await prisma.module.upsert({
    where: { id: 'moduleId7' },
    update: {},
    create: {
      id: 'moduleId7',
      name: 'Semana 7',
      description: 'Descripción de semana 7',
      treatments: {
        create: {
          treatment_id: 'treatmentId',
          order: 7,
        },
      },
    },
  });
  //semana 8
  await prisma.module.upsert({
    where: { id: 'moduleId8' },
    update: {},
    create: {
      id: 'moduleId8',
      name: 'Semana 8',
      description: 'Descripción de semana 8',
      treatments: {
        create: {
          treatment_id: 'treatmentId',
          order: 8,
        },
      },
    },
  });

  // Actividades de la semana 1
  await prisma.activity.upsert({
    where: { id: 'activityId1' },
    update: {},
    create: {
      id: 'activityId1',
      name: 'Introducción a semana 1',
      modules: {
        create: {
          moduleId: 'moduleId1',
          order: 1,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId2' },
    update: {},
    create: {
      id: 'activityId2',
      name: 'Introducción a la meditación de la semana 1',
      modules: {
        create: {
          moduleId: 'moduleId1',
          order: 2,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId3' },
    update: {},
    create: {
      id: 'activityId3',
      name: 'Meditación de la semana 2',
      modules: {
        create: {
          moduleId: 'moduleId1',
          order: 3,
        },
      },
    },
  });

  // Actividades de la semana 2
  await prisma.activity.upsert({
    where: { id: 'activityId4' },
    update: {},
    create: {
      id: 'activityId4',
      name: 'Introducción a semana 2',
      modules: {
        create: {
          moduleId: 'moduleId2',
          order: 1,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId5' },
    update: {},
    create: {
      id: 'activityId5',
      name: 'Introducción a la meditación de la semana 2',
      modules: {
        create: {
          moduleId: 'moduleId2',
          order: 2,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId6' },
    update: {},
    create: {
      id: 'activityId6',
      name: 'Meditación de la semana 2',
      modules: {
        create: {
          moduleId: 'moduleId2',
          order: 3,
        },
      },
    },
  });

  // Actividades de la semana 3
  await prisma.activity.upsert({
    where: { id: 'activityId7' },
    update: {},
    create: {
      id: 'activityId7',
      name: 'Introducción a semana 3',
      modules: {
        create: {
          moduleId: 'moduleId3',
          order: 1,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId8' },
    update: {},
    create: {
      id: 'activityId8',
      name: 'Introducción a la meditación de la semana 3',
      modules: {
        create: {
          moduleId: 'moduleId3',
          order: 2,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId9' },
    update: {},
    create: {
      id: 'activityId9',
      name: 'Meditación de la semana 3',
      modules: {
        create: {
          moduleId: 'moduleId3',
          order: 3,
        },
      },
    },
  });

  // Actividades de la semana 4
  await prisma.activity.upsert({
    where: { id: 'activityId10' },
    update: {},
    create: {
      id: 'activityId10',
      name: 'Introducción a semana 4',
      modules: {
        create: {
          moduleId: 'moduleId4',
          order: 1,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId11' },
    update: {},
    create: {
      id: 'activityId11',
      name: 'Introducción a la meditación de la semana 4',
      modules: {
        create: {
          moduleId: 'moduleId4',
          order: 2,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId12' },
    update: {},
    create: {
      id: 'activityId12',
      name: 'Meditación de la semana 4',
      modules: {
        create: {
          moduleId: 'moduleId4',
          order: 3,
        },
      },
    },
  });

  // Actividades de la semana 5
  await prisma.activity.upsert({
    where: { id: 'activityId13' },
    update: {},
    create: {
      id: 'activityId13',
      name: 'Introducción a semana 5',
      modules: {
        create: {
          moduleId: 'moduleId5',
          order: 1,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId14' },
    update: {},
    create: {
      id: 'activityId14',
      name: 'Introducción a la meditación de la semana 5',
      modules: {
        create: {
          moduleId: 'moduleId5',
          order: 2,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId15' },
    update: {},
    create: {
      id: 'activityId15',
      name: 'Meditación de la semana 5',
      modules: {
        create: {
          moduleId: 'moduleId5',
          order: 3,
        },
      },
    },
  });

  // Actividades de la semana 6
  await prisma.activity.upsert({
    where: { id: 'activityId16' },
    update: {},
    create: {
      id: 'activityId16',
      name: 'Introducción a semana 6',
      modules: {
        create: {
          moduleId: 'moduleId6',
          order: 1,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId17' },
    update: {},
    create: {
      id: 'activityId17',
      name: 'Introducción a la meditación de la semana 6',
      modules: {
        create: {
          moduleId: 'moduleId6',
          order: 2,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId18' },
    update: {},
    create: {
      id: 'activityId18',
      name: 'Meditación de la semana 6',
      modules: {
        create: {
          moduleId: 'moduleId6',
          order: 3,
        },
      },
    },
  });

  // Actividades de la semana 7
  await prisma.activity.upsert({
    where: { id: 'activityId19' },
    update: {},
    create: {
      id: 'activityId19',
      name: 'Introducción a semana 7',
      modules: {
        create: {
          moduleId: 'moduleId7',
          order: 1,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId20' },
    update: {},
    create: {
      id: 'activityId20',
      name: 'Introducción a la meditación de la semana 7',
      modules: {
        create: {
          moduleId: 'moduleId7',
          order: 2,
        },
      },
    },
  });

  // Actividades de la semana 8
  await prisma.activity.upsert({
    where: { id: 'activityId21' },
    update: {},
    create: {
      id: 'activityId21',
      name: 'Introducción a semana 8',
      modules: {
        create: {
          moduleId: 'moduleId8',
          order: 1,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId22' },
    update: {},
    create: {
      id: 'activityId22',
      name: 'Introducción a la meditación de la semana 8',
      modules: {
        create: {
          moduleId: 'moduleId8',
          order: 2,
        },
      },
    },
  });
  await prisma.activity.upsert({
    where: { id: 'activityId23' },
    update: {},
    create: {
      id: 'activityId23',
      name: 'Meditación de la semana 8',
      modules: {
        create: {
          moduleId: 'moduleId8',
          order: 3,
        },
      },
    },
  });

  // contenido de la actividad 1
  await prisma.content.upsert({
    where: { id: 'contentId1' },
    update: {},
    create: {
      id: 'contentId1',
      content: 'Contenido de la introduccion a semana 1',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId1',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId2' },
    update: {
      content: 'https://youtu.be/-REiAqmXUh0',
    },
    create: {
      id: 'contentId2',
      content: 'https://youtu.be/-REiAqmXUh0',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId1',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 2
  await prisma.content.upsert({
    where: { id: 'contentId3' },
    update: {},
    create: {
      id: 'contentId3',
      content: 'Contenido de la introduccion a la meditacion de la semana 1',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId2',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId4' },
    update: {},
    create: {
      id: 'contentId4',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId2',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 3
  await prisma.content.upsert({
    where: { id: 'contentId5' },
    update: {},
    create: {
      id: 'contentId5',
      content: 'Contenido de la meditacion de la semana 1',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId3',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId6' },
    update: {},
    create: {
      id: 'contentId6',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId3',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 4
  await prisma.content.upsert({
    where: { id: 'contentId7' },
    update: {},
    create: {
      id: 'contentId7',
      content: 'Contenido de la introduccion a semana 2',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId4',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId8' },
    update: {
      content: 'https://youtu.be/AKYNvmAAQgE',
    },
    create: {
      id: 'contentId8',
      content: 'https://youtu.be/AKYNvmAAQgE',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId4',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 5
  await prisma.content.upsert({
    where: { id: 'contentId9' },
    update: {},
    create: {
      id: 'contentId9',
      content: 'Contenido de la introduccion a la meditacion de la semana 2',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId5',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId10' },
    update: {},
    create: {
      id: 'contentId10',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId5',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 6
  await prisma.content.upsert({
    where: { id: 'contentId11' },
    update: {},
    create: {
      id: 'contentId11',
      content: 'Contenido de la meditacion de la semana 2',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId6',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId12' },
    update: {},
    create: {
      id: 'contentId12',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId6',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 7
  await prisma.content.upsert({
    where: { id: 'contentId13' },
    update: {},
    create: {
      id: 'contentId13',
      content: 'Contenido de la introduccion a semana 3',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId7',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId14' },
    update: {},
    create: {
      id: 'contentId14',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId7',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 8
  await prisma.content.upsert({
    where: { id: 'contentId15' },
    update: {},
    create: {
      id: 'contentId15',
      content: 'Contenido de la introduccion a la meditacion de la semana 3',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId8',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId16' },
    update: {},
    create: {
      id: 'contentId16',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId8',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 9
  await prisma.content.upsert({
    where: { id: 'contentId17' },
    update: {},
    create: {
      id: 'contentId17',
      content: 'Contenido de la meditacion de la semana 3',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId9',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId18' },
    update: {},
    create: {
      id: 'contentId18',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId9',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 10
  await prisma.content.upsert({
    where: { id: 'contentId19' },
    update: {},
    create: {
      id: 'contentId19',
      content: 'Contenido de la introduccion a semana 4',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId10',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId20' },
    update: {},
    create: {
      id: 'contentId20',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId10',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 11
  await prisma.content.upsert({
    where: { id: 'contentId21' },
    update: {},
    create: {
      id: 'contentId21',
      content: 'Contenido de la introduccion a la meditacion de la semana 4',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId11',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId22' },
    update: {},
    create: {
      id: 'contentId22',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId11',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 12
  await prisma.content.upsert({
    where: { id: 'contentId23' },
    update: {},
    create: {
      id: 'contentId23',
      content: 'Contenido de la meditacion de la semana 4',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId12',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId24' },
    update: {},
    create: {
      id: 'contentId24',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId12',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 13
  await prisma.content.upsert({
    where: { id: 'contentId25' },
    update: {},
    create: {
      id: 'contentId25',
      content: 'Contenido de la introduccion a semana 5',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId13',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId26' },
    update: {},
    create: {
      id: 'contentId26',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId13',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 14
  await prisma.content.upsert({
    where: { id: 'contentId27' },
    update: {},
    create: {
      id: 'contentId27',
      content: 'Contenido de la introduccion a la meditacion de la semana 5',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId14',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId28' },
    update: {},
    create: {
      id: 'contentId28',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId14',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 15
  await prisma.content.upsert({
    where: { id: 'contentId29' },
    update: {},
    create: {
      id: 'contentId29',
      content: 'Contenido de la meditacion de la semana 5',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId15',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId30' },
    update: {},
    create: {
      id: 'contentId30',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId15',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 16
  await prisma.content.upsert({
    where: { id: 'contentId31' },
    update: {},
    create: {
      id: 'contentId31',
      content: 'Contenido de la introduccion a semana 6',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId16',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId32' },
    update: {},
    create: {
      id: 'contentId32',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId16',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 17
  await prisma.content.upsert({
    where: { id: 'contentId33' },
    update: {},
    create: {
      id: 'contentId33',
      content: 'Contenido de la introduccion a la meditacion de la semana 6',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId17',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId34' },
    update: {},
    create: {
      id: 'contentId34',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId17',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 18
  await prisma.content.upsert({
    where: { id: 'contentId35' },
    update: {},
    create: {
      id: 'contentId35',
      content: 'Contenido de la meditacion de la semana 6',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId18',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId36' },
    update: {},
    create: {
      id: 'contentId36',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId18',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 19
  await prisma.content.upsert({
    where: { id: 'contentId37' },
    update: {},
    create: {
      id: 'contentId37',
      content: 'Contenido de la introduccion a semana 7',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId19',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId38' },
    update: {},
    create: {
      id: 'contentId38',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId19',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 20
  await prisma.content.upsert({
    where: { id: 'contentId39' },
    update: {},
    create: {
      id: 'contentId39',
      content: 'Contenido de la introduccion a la meditacion de la semana 7',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId20',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId40' },
    update: {},
    create: {
      id: 'contentId40',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId20',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 21
  await prisma.content.upsert({
    where: { id: 'contentId41' },
    update: {},
    create: {
      id: 'contentId41',
      content: 'Contenido de la introduccion a semana 8',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId21',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId42' },
    update: {},
    create: {
      id: 'contentId42',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId21',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 22
  await prisma.content.upsert({
    where: { id: 'contentId43' },
    update: {},
    create: {
      id: 'contentId43',
      content: 'Contenido de la introduccion a la meditacion de la semana 8',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId22',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId44' },
    update: {},
    create: {
      id: 'contentId44',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId22',
          order: 2,
        },
      },
    },
  });

  // contenido de la actividad 23
  await prisma.content.upsert({
    where: { id: 'contentId45' },
    update: {},
    create: {
      id: 'contentId45',
      content: 'Contenido de la meditacion de la semana 8',
      type: 'TEXT',
      activities: {
        create: {
          activityId: 'activityId23',
          order: 1,
        },
      },
    },
  });
  await prisma.content.upsert({
    where: { id: 'contentId46' },
    update: {},
    create: {
      id: 'contentId46',
      content: 'https://youtu.be/dQw4w9WgXcQ?si=puk6-t4P3K9_nqHD',
      type: 'VIDEO',
      activities: {
        create: {
          activityId: 'activityId23',
          order: 2,
        },
      },
    },
  });
}

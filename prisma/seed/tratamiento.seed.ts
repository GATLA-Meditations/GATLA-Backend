import { PrismaClient } from "@prisma/client";

export async function updateTreatment() {
    const prisma = new PrismaClient();
    await cristianTreatment(prisma);
    await prisma.$disconnect();
}

async function cristianTreatment(prisma: PrismaClient) {
    await prisma.treatment.upsert({
        where: { id: 'cristianTreatment' },
        update: {
          questionnaires: {
            connect: { id: 'questionnaireId' },
          },
        },
        create: {
          id: 'cristianTreatment',
          name: 'Tratamiento cristiano',
          description: 'Descripción de tratamiento cristiano',
          questionnaires: {
            connect: { id: 'questionnaireId' },
          },
        },
      });
    
      await prisma.module.upsert({
        where: { id: 'cm1' },
        update: {},
        create: {
          id: 'cm1',
          name: 'Semana 1',
          description: 'Descripción de semana 1',
          treatments: {
            create: {
              treatment_id: 'cristianTreatment',
              order: 1,
            },
          },
        },
      });
      await prisma.module.upsert({
        where: { id: 'cm2' },
        update: {},
        create: {
          id: 'cm2',
          name: 'Semana 2',
          description: 'Descripción de semana 2',
          treatments: {
            create: {
              treatment_id: 'cristianTreatment',
              order: 2,
            },
          },
        },
      });
      await prisma.module.upsert({
        where: { id: 'cm3' },
        update: {},
        create: {
          id: 'cm3',
          name: 'Semana 3',
          description: 'Descripción de semana 3',
          treatments: {
            create: {
              treatment_id: 'cristianTreatment',
              order: 3,
            },
          },
        },
      });
      await prisma.module.upsert({
        where: { id: 'cm4' },
        update: {},
        create: {
          id: 'cm4',
          name: 'Semana 4',
          description: 'Descripción de semana 4',
          treatments: {
            create: {
              treatment_id: 'cristianTreatment',
              order: 4,
            },
          },
        },
      });
      await prisma.module.upsert({
        where: { id: 'cm5' },
        update: {},
        create: {
          id: 'cm5',
          name: 'Semana 5',
          description: 'Descripción de semana 5',
          treatments: {
            create: {
              treatment_id: 'cristianTreatment',
              order: 5,
            },
          },
        },
      });
      //semana 6
      await prisma.module.upsert({
        where: { id: 'cm6' },
        update: {},
        create: {
          id: 'cm6',
          name: 'Semana 6',
          description: 'Descripción de semana 6',
          treatments: {
            create: {
              treatment_id: 'cristianTreatment',
              order: 6,
            },
          },
        },
      });
      //semana 7
      await prisma.module.upsert({
        where: { id: 'cm7' },
        update: {},
        create: {
          id: 'cm7',
          name: 'Semana 7',
          description: 'Descripción de semana 7',
          treatments: {
            create: {
              treatment_id: 'cristianTreatment',
              order: 7,
            },
          },
        },
      });
      //semana 8
      await prisma.module.upsert({
        where: { id: 'cm8' },
        update: {},
        create: {
          id: 'cm8',
          name: 'Semana 8',
          description: 'Descripción de semana 8',
          treatments: {
            create: {
              treatment_id: 'cristianTreatment',
              order: 8,
            },
          },
        },
      });
    
      // Actividades de la semana 1
      await prisma.activity.upsert({
        where: { id: 'ca1' },
        update: {},
        create: {
          id: 'ca1',
          name: 'Introducción a semana 1',
          modules: {
            create: {
              moduleId: 'cm1',
              order: 1,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca2' },
        update: {},
        create: {
          id: 'ca2',
          name: 'Introducción a la meditación de la semana 1',
          modules: {
            create: {
              moduleId: 'cm1',
              order: 2,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca3' },
        update: {},
        create: {
          id: 'ca3',
          name: 'Meditación de la semana 2',
          modules: {
            create: {
              moduleId: 'cm1',
              order: 3,
            },
          },
        },
      });
    
      // Actividades de la semana 2
      await prisma.activity.upsert({
        where: { id: 'ca4' },
        update: {},
        create: {
          id: 'ca4',
          name: 'Introducción a semana 2',
          modules: {
            create: {
              moduleId: 'cm2',
              order: 1,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca5' },
        update: {},
        create: {
          id: 'ca5',
          name: 'Introducción a la meditación de la semana 2',
          modules: {
            create: {
              moduleId: 'cm2',
              order: 2,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca6' },
        update: {},
        create: {
          id: 'ca6',
          name: 'Meditación de la semana 2',
          modules: {
            create: {
              moduleId: 'cm2',
              order: 3,
            },
          },
        },
      });
    
      // Actividades de la semana 3
      await prisma.activity.upsert({
        where: { id: 'ca7' },
        update: {},
        create: {
          id: 'ca7',
          name: 'Introducción a semana 3',
          modules: {
            create: {
              moduleId: 'cm3',
              order: 1,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca8' },
        update: {},
        create: {
          id: 'ca8',
          name: 'Introducción a la meditación de la semana 3',
          modules: {
            create: {
              moduleId: 'cm3',
              order: 2,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca9' },
        update: {},
        create: {
          id: 'ca9',
          name: 'Meditación de la semana 3',
          modules: {
            create: {
              moduleId: 'cm3',
              order: 3,
            },
          },
        },
      });
    
      // Actividades de la semana 4
      await prisma.activity.upsert({
        where: { id: 'ca10' },
        update: {},
        create: {
          id: 'ca10',
          name: 'Introducción a semana 4',
          modules: {
            create: {
              moduleId: 'cm4',
              order: 1,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca11' },
        update: {},
        create: {
          id: 'ca11',
          name: 'Introducción a la meditación de la semana 4',
          modules: {
            create: {
              moduleId: 'cm4',
              order: 2,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca12' },
        update: {},
        create: {
          id: 'ca12',
          name: 'Meditación de la semana 4',
          modules: {
            create: {
              moduleId: 'cm4',
              order: 3,
            },
          },
        },
      });
    
      // Actividades de la semana 5
      await prisma.activity.upsert({
        where: { id: 'ca13' },
        update: {},
        create: {
          id: 'ca13',
          name: 'Introducción a semana 5',
          modules: {
            create: {
              moduleId: 'cm5',
              order: 1,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca14' },
        update: {},
        create: {
          id: 'ca14',
          name: 'Introducción a la meditación de la semana 5',
          modules: {
            create: {
              moduleId: 'cm5',
              order: 2,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca15' },
        update: {},
        create: {
          id: 'ca15',
          name: 'Meditación de la semana 5',
          modules: {
            create: {
              moduleId: 'cm5',
              order: 3,
            },
          },
        },
      });
    
      // Actividades de la semana 6
      await prisma.activity.upsert({
        where: { id: 'ca16' },
        update: {},
        create: {
          id: 'ca16',
          name: 'Introducción a semana 6',
          modules: {
            create: {
              moduleId: 'cm6',
              order: 1,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca17' },
        update: {},
        create: {
          id: 'ca17',
          name: 'Introducción a la meditación de la semana 6',
          modules: {
            create: {
              moduleId: 'cm6',
              order: 2,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca18' },
        update: {},
        create: {
          id: 'ca18',
          name: 'Meditación de la semana 6',
          modules: {
            create: {
              moduleId: 'cm6',
              order: 3,
            },
          },
        },
      });
    
      // Actividades de la semana 7
      await prisma.activity.upsert({
        where: { id: 'ca19' },
        update: {},
        create: {
          id: 'ca19',
          name: 'Introducción a semana 7',
          modules: {
            create: {
              moduleId: 'cm7',
              order: 1,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca20' },
        update: {},
        create: {
          id: 'ca20',
          name: 'Introducción a la meditación de la semana 7',
          modules: {
            create: {
              moduleId: 'cm7',
              order: 2,
            },
          },
        },
      });
    
      // Actividades de la semana 8
      await prisma.activity.upsert({
        where: { id: 'ca21' },
        update: {},
        create: {
          id: 'ca21',
          name: 'Introducción a semana 8',
          modules: {
            create: {
              moduleId: 'cm8',
              order: 1,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca22' },
        update: {},
        create: {
          id: 'ca22',
          name: 'Introducción a la meditación de la semana 8',
          modules: {
            create: {
              moduleId: 'cm8',
              order: 2,
            },
          },
        },
      });
      await prisma.activity.upsert({
        where: { id: 'ca23' },
        update: {},
        create: {
          id: 'ca23',
          name: 'Meditación de la semana 8',
          modules: {
            create: {
              moduleId: 'cm8',
              order: 3,
            },
          },
        },
      });
    
      // contenido de la actividad 1
      await prisma.content.upsert({
        where: { id: 'cc1' },
        update: {},
        create: {
          id: 'cc1',
          content: 'Contenido de la introduccion a semana 1',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca1',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc2' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc2',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca1',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 2
      await prisma.content.upsert({
        where: { id: 'cc3' },
        update: {},
        create: {
          id: 'cc3',
          content: 'Contenido de la introduccion a la meditacion de la semana 1',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca2',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc4' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc4',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca2',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 3
      await prisma.content.upsert({
        where: { id: 'cc5' },
        update: {},
        create: {
          id: 'cc5',
          content: 'Contenido de la meditacion de la semana 1',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca3',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc6' },
        update: {
          content: 'https://youtu.be/4E0ifUSIRzo',
          type: 'MED_VIDEO'
        },
        create: {
          id: 'cc6',
          content: 'https://youtu.be/4E0ifUSIRzo',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca3',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 4
      await prisma.content.upsert({
        where: { id: 'cc7' },
        update: {},
        create: {
          id: 'cc7',
          content: 'Contenido de la introduccion a semana 2',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca4',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc8' },
        update: {
          content: 'https://youtu.be/AKYNvmAAQgE',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc8',
          content: 'https://youtu.be/AKYNvmAAQgE',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca4',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 5
      await prisma.content.upsert({
        where: { id: 'cc9' },
        update: {},
        create: {
          id: 'cc9',
          content: 'Contenido de la introduccion a la meditacion de la semana 2',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca5',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc10' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc10',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca5',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 6
      await prisma.content.upsert({
        where: { id: 'cc11' },
        update: {},
        create: {
          id: 'cc11',
          content: 'Contenido de la meditacion de la semana 2',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca6',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc12' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_VIDEO',
        },
        create: {
          id: 'cc12',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca6',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 7
      await prisma.content.upsert({
        where: { id: 'cc13' },
        update: {},
        create: {
          id: 'cc13',
          content: 'Contenido de la introduccion a semana 3',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca7',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc14' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc14',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca7',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 8
      await prisma.content.upsert({
        where: { id: 'cc15' },
        update: {},
        create: {
          id: 'cc15',
          content: 'Contenido de la introduccion a la meditacion de la semana 3',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca8',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc16' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc16',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca8',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 9
      await prisma.content.upsert({
        where: { id: 'cc17' },
        update: {},
        create: {
          id: 'cc17',
          content: 'Contenido de la meditacion de la semana 3',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca9',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc18' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_VIDEO',
        },
        create: {
          id: 'cc18',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca9',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 10
      await prisma.content.upsert({
        where: { id: 'cc19' },
        update: {},
        create: {
          id: 'cc19',
          content: 'Contenido de la introduccion a semana 4',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca10',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc20' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc20',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca10',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 11
      await prisma.content.upsert({
        where: { id: 'cc21' },
        update: {},
        create: {
          id: 'cc21',
          content: 'Contenido de la introduccion a la meditacion de la semana 4',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca11',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'ccd22' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc22',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca11',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 12
      await prisma.content.upsert({
        where: { id: 'cc23' },
        update: {},
        create: {
          id: 'cc23',
          content: 'Contenido de la meditacion de la semana 4',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca12',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc24' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_VIDEO',
        },
        create: {
          id: 'cc24',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca12',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 13
      await prisma.content.upsert({
        where: { id: 'cc25' },
        update: {},
        create: {
          id: 'cc25',
          content: 'Contenido de la introduccion a semana 5',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca13',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc26' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc26',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca13',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 14
      await prisma.content.upsert({
        where: { id: 'cc27' },
        update: {},
        create: {
          id: 'cc27',
          content: 'Contenido de la introduccion a la meditacion de la semana 5',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca14',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc28' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc28',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca14',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 15
      await prisma.content.upsert({
        where: { id: 'cc29' },
        update: {},
        create: {
          id: 'cc29',
          content: 'Contenido de la meditacion de la semana 5',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca15',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc30' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_VIDEO',
        },
        create: {
          id: 'cc30',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca15',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 16
      await prisma.content.upsert({
        where: { id: 'cc31' },
        update: {},
        create: {
          id: 'cc31',
          content: 'Contenido de la introduccion a semana 6',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca16',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc32' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc32',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca16',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 17
      await prisma.content.upsert({
        where: { id: 'cc33' },
        update: {},
        create: {
          id: 'cc33',
          content: 'Contenido de la introduccion a la meditacion de la semana 6',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca17',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc34' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc34',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca17',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 18
      await prisma.content.upsert({
        where: { id: 'cc35' },
        update: {},
        create: {
          id: 'cc35',
          content: 'Contenido de la meditacion de la semana 6',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca18',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc36' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_VIDEO',
        },
        create: {
          id: 'cc36',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca18',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 19
      await prisma.content.upsert({
        where: { id: 'cc37' },
        update: {},
        create: {
          id: 'cc37',
          content: 'Contenido de la introduccion a semana 7',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca19',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc38' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc38',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca19',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 20
      await prisma.content.upsert({
        where: { id: 'cc39' },
        update: {},
        create: {
          id: 'cc39',
          content: 'Contenido de la introduccion a la meditacion de la semana 7',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca20',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc40' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc40',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca20',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 21
      await prisma.content.upsert({
        where: { id: 'cc41' },
        update: {},
        create: {
          id: 'cc41',
          content: 'Contenido de la introduccion a semana 8',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca21',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc42' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc42',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca21',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 22
      await prisma.content.upsert({
        where: { id: 'cc43' },
        update: {},
        create: {
          id: 'cc43',
          content: 'Contenido de la introduccion a la meditacion de la semana 8',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca22',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc44' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_INTRO',
        },
        create: {
          id: 'cc44',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca22',
              order: 2,
            },
          },
        },
      });
    
      // contenido de la actividad 23
      await prisma.content.upsert({
        where: { id: 'cc45' },
        update: {},
        create: {
          id: 'cc45',
          content: 'Contenido de la meditacion de la semana 8',
          type: 'TEXT',
          activities: {
            create: {
              activityId: 'ca23',
              order: 1,
            },
          },
        },
      });
      await prisma.content.upsert({
        where: { id: 'cc46' },
        update: {
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'MED_VIDEO',
        },
        create: {
          id: 'cc46',
          content: 'https://youtu.be/-REiAqmXUh0',
          type: 'VIDEO',
          activities: {
            create: {
              activityId: 'ca23',
              order: 2,
            },
          },
        },
      });
}
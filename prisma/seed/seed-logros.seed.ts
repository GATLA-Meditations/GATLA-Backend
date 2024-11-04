import { ACHIEVEMENT_TYPE, PrismaClient } from '@prisma/client';

export async function uploadAchievements() {
  const prisma = new PrismaClient();
  await achievements(prisma);
  await prisma.$disconnect();
}

async function achievements(prisma: PrismaClient) {
  const dataKeys = [
    { id: 'Semanas', dataKey: 'Semanas' },
    { id: 'Minutos', dataKey: 'Minutos' },
    { id: 'Racha', dataKey: 'Racha' },
    { id: 'Finalidad del test', dataKey: 'Finalidad del test' },
  ];

  await Promise.all(
    dataKeys.map((key) =>
      prisma.dataKey.upsert({
        where: { id: key.id },
        update: {},
        create: {
          id: key.id,
          dataKey: key.dataKey,
        },
      }),
    ),
  );

  const achievements = [
    {
      id: 'Semana 1',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 1',
      lockedDescription: 'Termina la primera semana para desbloquear este logro',
      lockedImage: 'locked_image_url_1',
      unlockedDescription: 'Terminaste la primera semana!',
      unlockedImage: 'unlocked_image_url_1',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId1", "cm1"], "number": 1} }',
    },
    {
      id: 'Semana 2',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 2',
      lockedDescription: 'Termina la segunda semana para desbloquear este logro',
      lockedImage: 'locked_image_url_2',
      unlockedDescription: 'Terminaste la segunda semana!',
      unlockedImage: 'unlocked_image_url_2',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId2", "cm2"], "number": 1} }',
    },
    {
      id: 'Semana 3',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 3',
      lockedDescription: 'Termina la tercera semana para desbloquear este logro',
      lockedImage: 'locked_image_url_3',
      unlockedDescription: 'Terminaste la tercera semana!',
      unlockedImage: 'unlocked_image_url_3',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId3", "cm3"], "number": 1} }',
    },
    {
      id: 'Semana 4',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 4',
      lockedDescription: 'Termina la cuarta semana para desbloquear este logro',
      lockedImage: 'locked_image_url_4',
      unlockedDescription: 'Terminaste la cuarta semana!',
      unlockedImage: 'unlocked_image_url_4',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId4", "cm4"], "number": 1} }',
    },
    {
      id: 'Semana 5',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 5',
      lockedDescription: 'Termina la quinta semana para desbloquear este logro',
      lockedImage: 'locked_image_url_5',
      unlockedDescription: 'Terminaste la quinta semana!',
      unlockedImage: 'unlocked_image_url_5',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId5", "cm5"], "number": 1} }',
    },
    {
      id: 'Semana 6',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 6',
      lockedDescription: 'Termina la sexta semana para desbloquear este logro',
      lockedImage: 'locked_image_url_6',
      unlockedDescription: 'Terminaste la sexta semana!',
      unlockedImage: 'unlocked_image_url_6',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId6", "cm6"], "number": 1} }',
    },
    {
      id: 'Semana 7',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 7',
      lockedDescription: 'Termina la séptima semana para desbloquear este logro',
      lockedImage: 'locked_image_url_7',
      unlockedDescription: 'Terminaste la séptima semana!',
      unlockedImage: 'unlocked_image_url_7',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId7", "cm7"], "number": 1} }',
    },
    {
      id: 'Semana 8',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 8',
      lockedDescription: 'Termina la octava semana para desbloquear este logro',
      lockedImage: 'locked_image_url_8',
      unlockedDescription: 'Terminaste la octava semana!',
      unlockedImage: 'unlocked_image_url_8',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId8", "cm8"], "number": 1} }',
    },
    {
      id: 'Semana 9',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 9',
      lockedDescription: 'Termina la novena semana para desbloquear este logro',
      lockedImage: 'locked_image_url_9',
      unlockedDescription: 'Terminaste la novena semana!',
      unlockedImage: 'unlocked_image_url_9',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId1", "cm1"], "number": 2} }',
    },
    {
      id: 'Semana 10',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 10',
      lockedDescription: 'Termina la décima semana para desbloquear este logro',
      lockedImage: 'locked_image_url_10',
      unlockedDescription: 'Terminaste la décima semana!',
      unlockedImage: 'unlocked_image_url_10',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId2", "cm2"], "number": 2} }',
    },
    {
      id: 'Semana 11',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 11',
      lockedDescription: 'Termina la semana once para desbloquear este logro',
      lockedImage: 'locked_image_url_11',
      unlockedDescription: 'Terminaste la semana once!',
      unlockedImage: 'unlocked_image_url_11',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId3", "cm3"], "number": 2} }',
    },
    {
      id: 'Semana 12',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 12',
      lockedDescription: 'Termina la semana doce para desbloquear este logro',
      lockedImage: 'locked_image_url_12',
      unlockedDescription: 'Terminaste la semana doce!',
      unlockedImage: 'unlocked_image_url_12',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId4", "cm4"], "number": 2} }',
    },
    {
      id: 'Semana 13',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 13',
      lockedDescription: 'Termina la semana trece para desbloquear este logro',
      lockedImage: 'locked_image_url_13',
      unlockedDescription: 'Terminaste la semana trece!',
      unlockedImage: 'unlocked_image_url_13',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId5", "cm5"], "number": 2} }',
    },
    {
      id: 'Semana 14',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 14',
      lockedDescription: 'Termina la semana catorce para desbloquear este logro',
      lockedImage: 'locked_image_url_14',
      unlockedDescription: 'Terminaste la semana catorce!',
      unlockedImage: 'unlocked_image_url_14',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId6", "cm6"], "number": 2} }',
    },
    {
      id: 'Semana 15',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 15',
      lockedDescription: 'Termina la semana quince para desbloquear este logro',
      lockedImage: 'locked_image_url_15',
      unlockedDescription: 'Terminaste la semana quince!',
      unlockedImage: 'unlocked_image_url_15',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId7", "cm7"], "number": 2} }',
    },
    {
      id: 'Semana 16',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 16',
      lockedDescription: 'Termina la semana dieciséis para desbloquear este logro',
      lockedImage: 'locked_image_url_16',
      unlockedDescription: 'Terminaste la semana dieciséis!',
      unlockedImage: 'unlocked_image_url_16',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId8", "cm8"], "number": 2} }',
    },
    {
      id: 'Semana 17',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 17',
      lockedDescription: 'Termina la semana diecisiete para desbloquear este logro',
      lockedImage: 'locked_image_url_17',
      unlockedDescription: 'Terminaste la semana diecisiete!',
      unlockedImage: 'unlocked_image_url_17',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId1", "cm1"], "number": 3} }',
    },
    {
      id: 'Semana 18',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 18',
      lockedDescription: 'Termina la semana dieciocho para desbloquear este logro',
      lockedImage: 'locked_image_url_18',
      unlockedDescription: 'Terminaste la semana dieciocho!',
      unlockedImage: 'unlocked_image_url_18',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId2", "cm2"], "number": 3} }',
    },
    {
      id: 'Semana 19',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 19',
      lockedDescription: 'Termina la semana diecinueve para desbloquear este logro',
      lockedImage: 'locked_image_url_19',
      unlockedDescription: 'Terminaste la semana diecinueve!',
      unlockedImage: 'unlocked_image_url_19',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId3", "cm3"], "number": 3} }',
    },
    {
      id: 'Semana 20',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 20',
      lockedDescription: 'Termina la semana veinte para desbloquear este logro',
      lockedImage: 'locked_image_url_20',
      unlockedDescription: 'Terminaste la semana veinte!',
      unlockedImage: 'unlocked_image_url_20',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId4", "cm4"], "number": 3} }',
    },
    {
      id: 'Semana 21',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 21',
      lockedDescription: 'Termina la semana veintiuno para desbloquear este logro',
      lockedImage: 'locked_image_url_21',
      unlockedDescription: 'Terminaste la semana veintiuno!',
      unlockedImage: 'unlocked_image_url_21',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId5", "cm5"], "number": 3} }',
    },
    {
      id: 'Semana 22',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 22',
      lockedDescription: 'Termina la semana veintidós para desbloquear este logro',
      lockedImage: 'locked_image_url_22',
      unlockedDescription: 'Terminaste la semana veintidós!',
      unlockedImage: 'unlocked_image_url_22',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId6", "cm6"], "number": 3} }',
    },
    {
      id: 'Semana 23',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 23',
      lockedDescription: 'Termina la semana veintitrés para desbloquear este logro',
      lockedImage: 'locked_image_url_23',
      unlockedDescription: 'Terminaste la semana veintitrés!',
      unlockedImage: 'unlocked_image_url_23',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId7", "cm7"], "number": 3} }',
    },
    {
      id: 'Semana 24',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Semana 24',
      lockedDescription: 'Termina la semana veinticuatro para desbloquear este logro',
      lockedImage: 'locked_image_url_24',
      unlockedDescription: 'Terminaste la semana veinticuatro!',
      unlockedImage: 'unlocked_image_url_24',
      dataKeyId: 'Semanas',
      dataValue: '{ "options": { "id": ["moduleId8", "cm8"], "number": 3} }',
    },
    {
      id: 'Calidad de vida',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Calidad de vida',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test calidad de vida',
      lockedImage: 'locked_image_url',
      unlockedDescription: 'Felicidades finalizaste el test calidad de vida! Sigue así!',
      unlockedImage: 'unlocked_image_url',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "inventario-calidad-vida", "number": 1 } }',
    },
    {
      id: 'Calidad de vida 2',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Calidad de vida',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test calidad de vida 2',
      lockedImage: 'locked_image_url',
      unlockedDescription: 'Felicidades finalizaste el test calidad de vida! Sigue así!',
      unlockedImage: 'unlocked_image_url',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "inventario-calidad-vida", "number": 2 } }',
    },
    {
      id: 'Calidad de vida 3',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Calidad de vida',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test calidad de vida 3',
      lockedImage: 'locked_image_url',
      unlockedDescription: 'Felicidades finalizaste el test calidad de vida! Sigue así!',
      unlockedImage: 'unlocked_image_url',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "inventario-calidad-vida", "number": 3 } }',
    },
    {
      id: 'Compasion interior',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Compasion interior',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test compasión interior',
      lockedImage: 'locked_image_url_compasion_interior',
      unlockedDescription: 'Felicidades finalizaste el test compasión interior! Sigue así!',
      unlockedImage: 'unlocked_image_url_compasion_interior',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "compasion-interior", "number": 1 } }',
    },
    {
      id: 'Compasion interior 2',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Compasion interior 2',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test compasión interior 2',
      lockedImage: 'locked_image_url_compasion_interior_2',
      unlockedDescription: 'Felicidades finalizaste el test compasión interior 2! Sigue así!',
      unlockedImage: 'unlocked_image_url_compasion_interior_2',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "compasion-interior", "number": 2 } }',
    },
    {
      id: 'Compasion interior 3',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Compasion interior 3',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test compasión interior 3',
      lockedImage: 'locked_image_url_compasion_interior_3',
      unlockedDescription: 'Felicidades finalizaste el test compasión interior 3! Sigue así!',
      unlockedImage: 'unlocked_image_url_compasion_interior_3',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "compasion-interior", "number": 3 } }',
    },
    {
      id: 'Emociones positivas',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Emociones positivas',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test emociones positivas',
      lockedImage: 'locked_image_url_emociones_positivas',
      unlockedDescription: 'Felicidades finalizaste el test emociones positivas! Sigue así!',
      unlockedImage: 'unlocked_image_url_emociones_positivas',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "emociones-positivas", "number": 1 } }',
    },
    {
      id: 'Emociones positivas 2',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Emociones positivas 2',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test emociones positivas 2',
      lockedImage: 'locked_image_url_emociones_positivas_2',
      unlockedDescription: 'Felicidades finalizaste el test emociones positivas 2! Sigue así!',
      unlockedImage: 'unlocked_image_url_emociones_positivas_2',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "emociones-positivas", "number": 2 } }',
    },
    {
      id: 'Emociones positivas 3',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Emociones positivas 3',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test emociones positivas 3',
      lockedImage: 'locked_image_url_emociones_positivas_3',
      unlockedDescription: 'Felicidades finalizaste el test emociones positivas 3! Sigue así!',
      unlockedImage: 'unlocked_image_url_emociones_positivas_3',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "emociones-positivas", "number": 3 } }',
    },
    {
      id: 'Bienestar espiritual',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Bienestar espiritual',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test bienestar espiritual',
      lockedImage: 'locked_image_url_bienestar_espiritual',
      unlockedDescription: 'Felicidades finalizaste el test bienestar espiritual! Sigue así!',
      unlockedImage: 'unlocked_image_url_bienestar_espiritual',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "inventario-de-bienestar-espiritual", "number": 1 } }',
    },
    {
      id: 'Bienestar espiritual 2',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Bienestar espiritual 2',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test bienestar espiritual 2',
      lockedImage: 'locked_image_url_bienestar_espiritual_2',
      unlockedDescription: 'Felicidades finalizaste el test bienestar espiritual 2! Sigue así!',
      unlockedImage: 'unlocked_image_url_bienestar_espiritual_2',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "inventario-de-bienestar-espiritual", "number": 2 } }',
    },
    {
      id: 'Bienestar espiritual 3',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Bienestar espiritual 3',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test bienestar espiritual 3',
      lockedImage: 'locked_image_url_bienestar_espiritual_3',
      unlockedDescription: 'Felicidades finalizaste el test bienestar espiritual 3! Sigue así!',
      unlockedImage: 'unlocked_image_url_bienestar_espiritual_3',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "inventario-de-bienestar-espiritual", "number": 3 } }',
    },
    {
      id: 'Sentido en la vida',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Sentido en la vida',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test sentido en la vida',
      lockedImage: 'locked_image_url_sentido_en_la_vida',
      unlockedDescription: 'Felicidades finalizaste el test sentido en la vida! Sigue así!',
      unlockedImage: 'unlocked_image_url_sentido_en_la_vida',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "sentido-de-vida", "number": 1 } }',
    },
    {
      id: 'Sentido en la vida 2',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Sentido en la vida 2',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test sentido en la vida 2',
      lockedImage: 'locked_image_url_sentido_en_la_vida_2',
      unlockedDescription: 'Felicidades finalizaste el test sentido en la vida 2! Sigue así!',
      unlockedImage: 'unlocked_image_url_sentido_en_la_vida_2',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "sentido-de-vida", "number": 2 } }',
    },
    {
      id: 'Sentido en la vida 3',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Sentido en la vida 3',
      lockedDescription: 'Para conseguir este logro primero debe realizar el test sentido en la vida 3',
      lockedImage: 'locked_image_url_sentido_en_la_vida_3',
      unlockedDescription: 'Felicidades finalizaste el test sentido en la vida 3! Sigue así!',
      unlockedImage: 'unlocked_image_url_sentido_en_la_vida_3',
      dataKeyId: 'Finalidad del test',
      dataValue: '{ "options": { "id": "sentido-de-vida", "number": 3 } }',
    },
    {
      id: 'Mente en calma',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Mente en calma',
      lockedDescription: 'Medita por 105 minutos para poder desbloquear este logro',
      lockedImage: 'locked_image_url_mente_en_calma',
      unlockedDescription: 'Has meditado por 105 minutos!',
      unlockedImage: 'unlocked_image_url_mente_en_calma',
      dataKeyId: 'Minutos',
      dataValue: '105',
    },
    {
      id: 'Mente en calma 210',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Mente en calma 210',
      lockedDescription: 'Medita por 210 minutos para poder desbloquear este logro',
      lockedImage: 'locked_image_url_mente_en_calma_210',
      unlockedDescription: 'Has meditado por 210 minutos!',
      unlockedImage: 'unlocked_image_url_mente_en_calma_210',
      dataKeyId: 'Minutos',
      dataValue: '210',
    },
    {
      id: 'Mente en calma 315',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Mente en calma 315',
      lockedDescription: 'Medita por 315 minutos para poder desbloquear este logro',
      lockedImage: 'locked_image_url_mente_en_calma_315',
      unlockedDescription: 'Has meditado por 315 minutos!',
      unlockedImage: 'unlocked_image_url_mente_en_calma_315',
      dataKeyId: 'Minutos',
      dataValue: '315',
    },
    {
      id: 'Mente en calma 420',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Mente en calma 420',
      lockedDescription: 'Medita por 420 minutos para poder desbloquear este logro',
      lockedImage: 'locked_image_url_mente_en_calma_420',
      unlockedDescription: 'Has meditado por 420 minutos!',
      unlockedImage: 'unlocked_image_url_mente_en_calma_420',
      dataKeyId: 'Minutos',
      dataValue: '420',
    },
    {
      id: 'Mente en calma 525',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Mente en calma 525',
      lockedDescription: 'Medita por 525 minutos para poder desbloquear este logro',
      lockedImage: 'locked_image_url_mente_en_calma_525',
      unlockedDescription: 'Has meditado por 525 minutos!',
      unlockedImage: 'unlocked_image_url_mente_en_calma_525',
      dataKeyId: 'Minutos',
      dataValue: '525',
    },
    {
      id: 'Mente en calma 630',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Mente en calma 630',
      lockedDescription: 'Medita por 630 minutos para poder desbloquear este logro',
      lockedImage: 'locked_image_url_mente_en_calma_630',
      unlockedDescription: 'Has meditado por 630 minutos!',
      unlockedImage: 'unlocked_image_url_mente_en_calma_630',
      dataKeyId: 'Minutos',
      dataValue: '630',
    },
    {
      id: 'Mente en calma 735',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Mente en calma 735',
      lockedDescription: 'Medita por 735 minutos para poder desbloquear este logro',
      lockedImage: 'locked_image_url_mente_en_calma_735',
      unlockedDescription: 'Has meditado por 735 minutos!',
      unlockedImage: 'unlocked_image_url_mente_en_calma_735',
      dataKeyId: 'Minutos',
      dataValue: '735',
    },
    {
      id: 'Mente en calma 840',
      type: ACHIEVEMENT_TYPE.HIDDEN,
      title: 'Mente en calma 840',
      lockedDescription: 'Este logro esta oculto',
      lockedImage: 'locked_image_url_mente_en_calma_840',
      unlockedDescription: 'Has meditado por 840 minutos!',
      unlockedImage: 'unlocked_image_url_mente_en_calma_840',
      dataKeyId: 'Minutos',
      dataValue: '840',
    },
    {
      id: 'Manten la racha! 3',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Manten la racha! 3',
      lockedDescription: 'Consigue una racha de 3 días para conseguir este logro',
      lockedImage: 'locked_image_url_manten_la_racha_3',
      unlockedDescription: 'Felicidades! Lograste una racha de 3 días, sigue así!',
      unlockedImage: 'unlocked_image_url_manten_la_racha_3',
      dataKeyId: 'Racha',
      dataValue: '3',
    },
    {
      id: 'Manten la racha! 7',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Manten la racha! 7',
      lockedDescription: 'Consigue una racha de 7 días para conseguir este logro',
      lockedImage: 'locked_image_url_manten_la_racha_7',
      unlockedDescription: 'Felicidades! Lograste una racha de 7 días, sigue así!',
      unlockedImage: 'unlocked_image_url_manten_la_racha_7',
      dataKeyId: 'Racha',
      dataValue: '7',
    },
    {
      id: 'Manten la racha! 15',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Manten la racha! 15',
      lockedDescription: 'Consigue una racha de 15 días para conseguir este logro',
      lockedImage: 'locked_image_url_manten_la_racha_15',
      unlockedDescription: 'Felicidades! Lograste una racha de 15 días, sigue así!',
      unlockedImage: 'unlocked_image_url_manten_la_racha_15',
      dataKeyId: 'Racha',
      dataValue: '15',
    },
    {
      id: 'Manten la racha! 30',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Manten la racha! 30',
      lockedDescription: 'Consigue una racha de 30 días para conseguir este logro',
      lockedImage: 'locked_image_url_manten_la_racha_30',
      unlockedDescription: 'Felicidades! Lograste una racha de 30 días, sigue así!',
      unlockedImage: 'unlocked_image_url_manten_la_racha_30',
      dataKeyId: 'Racha',
      dataValue: '30',
    },
    {
      id: 'Manten la racha! 45',
      type: ACHIEVEMENT_TYPE.COMMON,
      title: 'Manten la racha! 45',
      lockedDescription: 'Consigue una racha de 45 días para conseguir este logro',
      lockedImage: 'locked_image_url_manten_la_racha_45',
      unlockedDescription: 'Felicidades! Lograste una racha de 45 días, sigue así!',
      unlockedImage: 'unlocked_image_url_manten_la_racha_45',
      dataKeyId: 'Racha',
      dataValue: '45',
    },
    {
      id: 'Manten la racha! 56',
      type: ACHIEVEMENT_TYPE.HIDDEN,
      title: 'Manten la racha! 56',
      lockedDescription: 'Este logro esta oculto',
      lockedImage: 'locked_image_url_manten_la_racha_56',
      unlockedDescription: 'Felicidades! Lograste una racha de 56 días, sigue así!',
      unlockedImage: 'unlocked_image_url_manten_la_racha_56',
      dataKeyId: 'Racha',
      dataValue: '56',
    },
  ];

  await Promise.all(
    achievements.map((achievement) =>
      prisma.achievement.upsert({
        where: { id: achievement.id },
        update: {},
        create: {
          id: achievement.id,
          type: achievement.type,
          title: achievement.title,
          lockedDescription: achievement.lockedDescription,
          lockedImage: achievement.lockedImage,
          unlockedDescription: achievement.unlockedDescription,
          unlockedImage: achievement.unlockedImage,
          dataKeyId: achievement.dataKeyId,
          dataValue: achievement.dataValue,
        },
      }),
    ),
  );

  console.log('Achievements upload completed!');
}

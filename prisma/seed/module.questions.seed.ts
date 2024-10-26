import { PrismaClient } from '@prisma/client';

export async function uploadModuleQuestions() {
  const prisma = new PrismaClient();
  await moduleQuestions(prisma);
  await prisma.$disconnect();
}

async function moduleQuestions(prisma: PrismaClient) {
  await prisma.questionModule.upsert({
    where: { id: 'intro_1' },
    update: {},
    create: {
      id: 'intro_1',
      question: 'Para la medición de seguridad se utilizarán dos preguntas semanales',
      type: 'not_a_question',
      metadata: '',
    },
  });

  await prisma.questionModule.upsert({
    where: { id: 'question_1' },
    update: {},
    create: {
      id: 'question_1',
      question: '¿Qué te aportó el ejercicio semanal?',
      type: 'qualitative',
      metadata: '',
    },
  });

  await prisma.questionModule.upsert({
    where: { id: 'question_2' },
    update: {},
    create: {
      id: 'question_2',
      question: '¿Qué te costó o incomodó del ejercicio semanal?',
      type: 'qualitative',
      metadata: '',
    },
  });

  await prisma.questionModule.upsert({
    where: { id: 'intro_2' },
    update: {},
    create: {
      id: 'intro_2',
      question:
        'Se realizará una registro semanal a través de escalas analógicas visuales y numéricas con respecto a dolor, náuseas y calidad de sueño de acuerdo al siguiente modelo:',
      type: 'not_a_question',
      metadata: '',
    },
  });

  await prisma.questionModule.upsert({
    where: { id: 'question_3' },
    update: {},
    create: {
      id: 'question_3',
      question: '¿Cómo sentiste tus dolores esta semana?',
      type: 'quantitative',
      metadata: '{ options: ["muy mal", "mal", "regular", "bien", "muy bien"] }',
    },
  });

  await prisma.questionModule.upsert({
    where: { id: 'question_4' },
    update: {},
    create: {
      id: 'question_4',
      question: '¿Cómo sentiste tus nauseas esta semana?',
      type: 'quantitative',
      metadata: '{ "options": ["muy intenso", "intenso", "moderado", "leve", "muy leve"] }',
    },
  });

  await prisma.questionModule.upsert({
    where: { id: 'question_5' },
    update: {},
    create: {
      id: 'question_5',
      question: '¿Cómo dormiste esta semana?',
      type: 'quantitative',
      metadata: '{ options: ["muy mal", "mal", "regular", "bien", "muy bien"] }',
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-cm1' },
    update: {},
    create: {
      id: 'i1-cm1',
      moduleId: 'cm1',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-cm1' },
    update: {},
    create: {
      id: 'q1-cm1',
      moduleId: 'cm1',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-cm1' },
    update: {},
    create: {
      id: 'q2-cm1',
      moduleId: 'cm1',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-cm1' },
    update: {},
    create: {
      id: 'i2-cm1',
      moduleId: 'cm1',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-cm1' },
    update: {},
    create: {
      id: 'q3-cm1',
      moduleId: 'cm1',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-cm1' },
    update: {},
    create: {
      id: 'q4-cm1',
      moduleId: 'cm1',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-cm1' },
    update: {},
    create: {
      id: 'q5-cm1',
      moduleId: 'cm1',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  // cm2
  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-cm2' },
    update: {},
    create: {
      id: 'i1-cm2',
      moduleId: 'cm2',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-cm2' },
    update: {},
    create: {
      id: 'q1-cm2',
      moduleId: 'cm2',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-cm2' },
    update: {},
    create: {
      id: 'q2-cm2',
      moduleId: 'cm2',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-cm2' },
    update: {},
    create: {
      id: 'i2-cm2',
      moduleId: 'cm2',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-cm2' },
    update: {},
    create: {
      id: 'q3-cm2',
      moduleId: 'cm2',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-cm2' },
    update: {},
    create: {
      id: 'q4-cm2',
      moduleId: 'cm2',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-cm2' },
    update: {},
    create: {
      id: 'q5-cm2',
      moduleId: 'cm2',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  // Repeat the same for cm3 to cm8

  // cm3
  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-cm3' },
    update: {},
    create: {
      id: 'i1-cm3',
      moduleId: 'cm3',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-cm3' },
    update: {},
    create: {
      id: 'q1-cm3',
      moduleId: 'cm3',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-cm3' },
    update: {},
    create: {
      id: 'q2-cm3',
      moduleId: 'cm3',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-cm3' },
    update: {},
    create: {
      id: 'i2-cm3',
      moduleId: 'cm3',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-cm3' },
    update: {},
    create: {
      id: 'q3-cm3',
      moduleId: 'cm3',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-cm3' },
    update: {},
    create: {
      id: 'q4-cm3',
      moduleId: 'cm3',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-cm3' },
    update: {},
    create: {
      id: 'q5-cm3',
      moduleId: 'cm3',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  // cm4
  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-cm4' },
    update: {},
    create: {
      id: 'i1-cm4',
      moduleId: 'cm4',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-cm4' },
    update: {},
    create: {
      id: 'q1-cm4',
      moduleId: 'cm4',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-cm4' },
    update: {},
    create: {
      id: 'q2-cm4',
      moduleId: 'cm4',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-cm4' },
    update: {},
    create: {
      id: 'i2-cm4',
      moduleId: 'cm4',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-cm4' },
    update: {},
    create: {
      id: 'q3-cm4',
      moduleId: 'cm4',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-cm4' },
    update: {},
    create: {
      id: 'q4-cm4',
      moduleId: 'cm4',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-cm4' },
    update: {},
    create: {
      id: 'q5-cm4',
      moduleId: 'cm4',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  // cm5
  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-cm5' },
    update: {},
    create: {
      id: 'i1-cm5',
      moduleId: 'cm5',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-cm5' },
    update: {},
    create: {
      id: 'q1-cm5',
      moduleId: 'cm5',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-cm5' },
    update: {},
    create: {
      id: 'q2-cm5',
      moduleId: 'cm5',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-cm5' },
    update: {},
    create: {
      id: 'i2-cm5',
      moduleId: 'cm5',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-cm5' },
    update: {},
    create: {
      id: 'q3-cm5',
      moduleId: 'cm5',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-cm5' },
    update: {},
    create: {
      id: 'q4-cm5',
      moduleId: 'cm5',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-cm5' },
    update: {},
    create: {
      id: 'q5-cm5',
      moduleId: 'cm5',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  // Repeat similar code blocks for cm6, cm7, and cm8

  // cm6
  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-cm6' },
    update: {},
    create: {
      id: 'i1-cm6',
      moduleId: 'cm6',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-cm6' },
    update: {},
    create: {
      id: 'q1-cm6',
      moduleId: 'cm6',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-cm6' },
    update: {},
    create: {
      id: 'q2-cm6',
      moduleId: 'cm6',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-cm6' },
    update: {},
    create: {
      id: 'i2-cm6',
      moduleId: 'cm6',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-cm6' },
    update: {},
    create: {
      id: 'q3-cm6',
      moduleId: 'cm6',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-cm6' },
    update: {},
    create: {
      id: 'q4-cm6',
      moduleId: 'cm6',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-cm6' },
    update: {},
    create: {
      id: 'q5-cm6',
      moduleId: 'cm6',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  // cm7
  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-cm7' },
    update: {},
    create: {
      id: 'i1-cm7',
      moduleId: 'cm7',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-cm7' },
    update: {},
    create: {
      id: 'q1-cm7',
      moduleId: 'cm7',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-cm7' },
    update: {},
    create: {
      id: 'q2-cm7',
      moduleId: 'cm7',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-cm7' },
    update: {},
    create: {
      id: 'i2-cm7',
      moduleId: 'cm7',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-cm7' },
    update: {},
    create: {
      id: 'q3-cm7',
      moduleId: 'cm7',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-cm7' },
    update: {},
    create: {
      id: 'q4-cm7',
      moduleId: 'cm7',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-cm7' },
    update: {},
    create: {
      id: 'q5-cm7',
      moduleId: 'cm7',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  // cm8
  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-cm8' },
    update: {},
    create: {
      id: 'i1-cm8',
      moduleId: 'cm8',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-cm8' },
    update: {},
    create: {
      id: 'q1-cm8',
      moduleId: 'cm8',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-cm8' },
    update: {},
    create: {
      id: 'q2-cm8',
      moduleId: 'cm8',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-cm8' },
    update: {},
    create: {
      id: 'i2-cm8',
      moduleId: 'cm8',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-cm8' },
    update: {},
    create: {
      id: 'q3-cm8',
      moduleId: 'cm8',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-cm8' },
    update: {},
    create: {
      id: 'q4-cm8',
      moduleId: 'cm8',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-cm8' },
    update: {},
    create: {
      id: 'q5-cm8',
      moduleId: 'cm8',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  // Semana 1 (moduleId1)
  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-moduleId1' },
    update: {},
    create: {
      id: 'i1-moduleId1',
      moduleId: 'moduleId1',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-moduleId1' },
    update: {},
    create: {
      id: 'q1-moduleId1',
      moduleId: 'moduleId1',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-moduleId1' },
    update: {},
    create: {
      id: 'q2-moduleId1',
      moduleId: 'moduleId1',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-moduleId1' },
    update: {},
    create: {
      id: 'i2-moduleId1',
      moduleId: 'moduleId1',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-moduleId1' },
    update: {},
    create: {
      id: 'q3-moduleId1',
      moduleId: 'moduleId1',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-moduleId1' },
    update: {},
    create: {
      id: 'q4-moduleId1',
      moduleId: 'moduleId1',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-moduleId1' },
    update: {},
    create: {
      id: 'q5-moduleId1',
      moduleId: 'moduleId1',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  // Semana 2 (moduleId2)
  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-moduleId2' },
    update: {},
    create: {
      id: 'i1-moduleId2',
      moduleId: 'moduleId2',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-moduleId2' },
    update: {},
    create: {
      id: 'q1-moduleId2',
      moduleId: 'moduleId2',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-moduleId2' },
    update: {},
    create: {
      id: 'q2-moduleId2',
      moduleId: 'moduleId2',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-moduleId2' },
    update: {},
    create: {
      id: 'i2-moduleId2',
      moduleId: 'moduleId2',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-moduleId2' },
    update: {},
    create: {
      id: 'q3-moduleId2',
      moduleId: 'moduleId2',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-moduleId2' },
    update: {},
    create: {
      id: 'q4-moduleId2',
      moduleId: 'moduleId2',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-moduleId2' },
    update: {},
    create: {
      id: 'q5-moduleId2',
      moduleId: 'moduleId2',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-moduleId3' },
    update: {},
    create: {
      id: 'i1-moduleId3',
      moduleId: 'moduleId3',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-moduleId3' },
    update: {},
    create: {
      id: 'q1-moduleId3',
      moduleId: 'moduleId3',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-moduleId3' },
    update: {},
    create: {
      id: 'q2-moduleId3',
      moduleId: 'moduleId3',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-moduleId3' },
    update: {},
    create: {
      id: 'i2-moduleId3',
      moduleId: 'moduleId3',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-moduleId3' },
    update: {},
    create: {
      id: 'q3-moduleId3',
      moduleId: 'moduleId3',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-moduleId3' },
    update: {},
    create: {
      id: 'q4-moduleId3',
      moduleId: 'moduleId3',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-moduleId3' },
    update: {},
    create: {
      id: 'q5-moduleId3',
      moduleId: 'moduleId3',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  // Semana 4 (moduleId4)
  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-moduleId4' },
    update: {},
    create: {
      id: 'i1-moduleId4',
      moduleId: 'moduleId4',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-moduleId4' },
    update: {},
    create: {
      id: 'q1-moduleId4',
      moduleId: 'moduleId4',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-moduleId4' },
    update: {},
    create: {
      id: 'q2-moduleId4',
      moduleId: 'moduleId4',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-moduleId4' },
    update: {},
    create: {
      id: 'i2-moduleId4',
      moduleId: 'moduleId4',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-moduleId4' },
    update: {},
    create: {
      id: 'q3-moduleId4',
      moduleId: 'moduleId4',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-moduleId4' },
    update: {},
    create: {
      id: 'q4-moduleId4',
      moduleId: 'moduleId4',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-moduleId4' },
    update: {},
    create: {
      id: 'q5-moduleId4',
      moduleId: 'moduleId4',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  // Semana 5 (moduleId5)
  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-moduleId5' },
    update: {},
    create: {
      id: 'i1-moduleId5',
      moduleId: 'moduleId5',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-moduleId5' },
    update: {},
    create: {
      id: 'q1-moduleId5',
      moduleId: 'moduleId5',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-moduleId5' },
    update: {},
    create: {
      id: 'q2-moduleId5',
      moduleId: 'moduleId5',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-moduleId5' },
    update: {},
    create: {
      id: 'i2-moduleId5',
      moduleId: 'moduleId5',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-moduleId5' },
    update: {},
    create: {
      id: 'q3-moduleId5',
      moduleId: 'moduleId5',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-moduleId5' },
    update: {},
    create: {
      id: 'q4-moduleId5',
      moduleId: 'moduleId5',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-moduleId5' },
    update: {},
    create: {
      id: 'q5-moduleId5',
      moduleId: 'moduleId5',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  // Semana 6 (moduleId6)
  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-moduleId6' },
    update: {},
    create: {
      id: 'i1-moduleId6',
      moduleId: 'moduleId6',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-moduleId6' },
    update: {},
    create: {
      id: 'q1-moduleId6',
      moduleId: 'moduleId6',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-moduleId6' },
    update: {},
    create: {
      id: 'q2-moduleId6',
      moduleId: 'moduleId6',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-moduleId6' },
    update: {},
    create: {
      id: 'i2-moduleId6',
      moduleId: 'moduleId6',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-moduleId6' },
    update: {},
    create: {
      id: 'q3-moduleId6',
      moduleId: 'moduleId6',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-moduleId6' },
    update: {},
    create: {
      id: 'q4-moduleId6',
      moduleId: 'moduleId6',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-moduleId6' },
    update: {},
    create: {
      id: 'q5-moduleId6',
      moduleId: 'moduleId6',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  // Semana 7 (moduleId7)
  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-moduleId7' },
    update: {},
    create: {
      id: 'i1-moduleId7',
      moduleId: 'moduleId7',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-moduleId7' },
    update: {},
    create: {
      id: 'q1-moduleId7',
      moduleId: 'moduleId7',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-moduleId7' },
    update: {},
    create: {
      id: 'q2-moduleId7',
      moduleId: 'moduleId7',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-moduleId7' },
    update: {},
    create: {
      id: 'i2-moduleId7',
      moduleId: 'moduleId7',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-moduleId7' },
    update: {},
    create: {
      id: 'q3-moduleId7',
      moduleId: 'moduleId7',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-moduleId7' },
    update: {},
    create: {
      id: 'q4-moduleId7',
      moduleId: 'moduleId7',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-moduleId7' },
    update: {},
    create: {
      id: 'q5-moduleId7',
      moduleId: 'moduleId7',
      questionModuleId: 'question_5',
      order: 7,
    },
  });

  // Semana 8 (moduleId8)
  await prisma.questionModuleModule.upsert({
    where: { id: 'i1-moduleId8' },
    update: {},
    create: {
      id: 'i1-moduleId8',
      moduleId: 'moduleId8',
      questionModuleId: 'intro_1',
      order: 1,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q1-moduleId8' },
    update: {},
    create: {
      id: 'q1-moduleId8',
      moduleId: 'moduleId8',
      questionModuleId: 'question_1',
      order: 2,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q2-moduleId8' },
    update: {},
    create: {
      id: 'q2-moduleId8',
      moduleId: 'moduleId8',
      questionModuleId: 'question_2',
      order: 3,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'i2-moduleId8' },
    update: {},
    create: {
      id: 'i2-moduleId8',
      moduleId: 'moduleId8',
      questionModuleId: 'intro_2',
      order: 4,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q3-moduleId8' },
    update: {},
    create: {
      id: 'q3-moduleId8',
      moduleId: 'moduleId8',
      questionModuleId: 'question_3',
      order: 5,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q4-moduleId8' },
    update: {},
    create: {
      id: 'q4-moduleId8',
      moduleId: 'moduleId8',
      questionModuleId: 'question_4',
      order: 6,
    },
  });

  await prisma.questionModuleModule.upsert({
    where: { id: 'q5-moduleId8' },
    update: {},
    create: {
      id: 'q5-moduleId8',
      moduleId: 'moduleId8',
      questionModuleId: 'question_5',
      order: 7,
    },
  });
}

import { PrismaClient } from '@prisma/client';

export async function uploadUserModule() {
  const prisma = new PrismaClient();
  await userModule(prisma);
  await prisma.$disconnect();
}
async function userModule(prisma) {
  await prisma.userModule.upsert({
    where: { id: 'userModule-1' },
    update: { endDate: new Date(2025, 11, 31) },
    create: {
      id: 'userModule-1',
      userId: 'userId',
      moduleId: 'moduleId1',
      startDate: new Date(2023, 11, 31),
      endDate: new Date(2025, 11, 31),
    },
  });
  await prisma.userModuleMinutesSpent.upsert({
    where: { id: 'userModuleMinutesSpentId1' },
    update: { minutesSpent: 0 },
    create: {
      id: 'userModuleMinutesSpentId1',
      userModuleId: 'userModule-1',
      minutesSpent: 0,
    },
  });

  await prisma.userTreatment.upsert({
    where: { id: 'userTreatmendId' },
    update: { startAnswer: false },
    create: {
      id: 'userTreatmendId',
      userId: 'userId',
      treatmentId: 'treatmentId',
    },
  });
}

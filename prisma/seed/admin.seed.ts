import { PrismaClient } from '@prisma/client';

export async function uploadAdmin() {
  const prisma = new PrismaClient();
  await admin(prisma);
  await prisma.$disconnect();
}

async function admin(prisma: PrismaClient) {
  await prisma.admin.upsert({
    where: { id: 'fake_admin' },
    update: {},
    create: {
      id: 'fake_admin',
      name: 'John Doe',
      email: 'fake_admin@example.com',
      password: 'password',
    },
  });
}

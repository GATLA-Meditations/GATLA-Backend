import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function uploadAdmin() {
  const prisma = new PrismaClient();
  await admin(prisma);
  await prisma.$disconnect();
}

async function admin(prisma: PrismaClient) {
  const hashedPassword = await bcrypt.hash('fake_user', 10);

  await prisma.admin.upsert({
    where: { id: 'fake_admin' },
    update: {
      password: hashedPassword,
    },
    create: {
      id: 'fake_admin',
      name: 'John Doe',
      email: 'fake_admin@example.com',
      password: hashedPassword,
    },
  });
}

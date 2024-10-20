import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Bcrypt hashes are typically 60+ characters long
const encryptedPasswordLength = 20;

async function main() {
  await migrateUserPasswords();
  await migrateAdminPassWords();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function migrateUserPasswords() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    const isHashed = user.password.length > encryptedPasswordLength;
    if (!isHashed) {
      const hashedPassword = await bcrypt.hash(user.password, 10); // Hash plain text password
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }, // Update with hashed password
      });
      console.log(`Updated password for user: ${user.patient_code}`);
    }
  }

  console.log('User migration complete');
}

async function migrateAdminPassWords() {
  const admins = await prisma.admin.findMany();

  // Iterate over each admin
  for (const admin of admins) {
    const isHashed = admin.password.length > encryptedPasswordLength;

    if (!isHashed) {
      // If the password is not hashed, hash the plain text password
      const hashedPassword = await bcrypt.hash(admin.password, 10);

      // Update the admin with the new hashed password
      await prisma.admin.update({
        where: { id: admin.id },
        data: { password: hashedPassword },
      });

      console.log(`Password updated for admin: ${admin.email}`);
    }
  }

  console.log('Admin password migration complete');
}

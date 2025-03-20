import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany();
    console.log(users);
  };

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
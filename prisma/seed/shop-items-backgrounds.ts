import { PrismaClient } from '@prisma/client';

export async function uploadCompasionInterior() {
  const prisma = new PrismaClient();
  await addShopItems(prisma);
  await prisma.$disconnect();

}

async function addShopItems(prisma: PrismaClient) {
  await prisma.shopItem.upsert({
    where: {
      id: 'image-number-1',
    },
    update: {},
    create: {
      id: 'image-number-1',
      content_url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      type: 'BACKGROUND',
      price: 0,
    },
  });
  await prisma.shopItem.upsert({
    where: {
      id: 'image-number-2',
    },
    update: {},
    create: {
      id: 'image-number-2',
      content_url: 'https://cdn.pixabay.com/photo/2023/07/04/09/04/leaves-8105722_1280.jpg',
      type: 'BACKGROUND',
      price: 0,
    },
  });
  await prisma.shopItem.upsert({
    where: {
      id: 'image-number-3',
    },
    update: {},
    create: {
      id: 'image-number-3',
      content_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Qk1A0wAK1mT7EwpSCvyVn9YGc8FPL3Wj6g&s',
      type: 'BACKGROUND',
      price: 1,
    },
  });
  await prisma.shopItem.upsert({
    where: {
      id: 'image-number-4',
    },
    update: {},
    create: {
      id: 'image-number-4',
      content_url:
        'https://media.istockphoto.com/id/615414140/photo/stones-wallpaper.jpg?s=612x612&w=0&k=20&c=0DCLAsyL5TQEVQJbPLYQS5Nt-g8E54nNezgPgWLWXbQ=',
      type: 'BACKGROUND',
      price: 5,
    },
  });
}

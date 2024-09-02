import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import UserItemsDto from './dto/get-items.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getNotificationsCount(id: string) {
    return this.prisma.userNotification.count({
      where: {
        userId: id,
      },
    });
  }

  async getNotifications(id: string, take: number, skip: number) {
    return this.prisma.userNotification.findMany({
      where: {
        userId: id,
      },
      skip,
      take,
      include: {
        notification: {},
      },
    });
  }

  async getTokensAndProgress(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        renatokens: true,
        progress: true,
      },
    });
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id },
      include: {
        treatments: true,
      },
    });
  }

  async subscirbeToTreatment(userId: string, treatmentId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        treatments: {
          connect: {
            id: treatmentId,
          },
        },
      },
    });
  }

  async getUserTests(id: string) {
    return this.prisma.userTreatment.findFirst({
      where: { userId: id },
    });
  }
  async changeUserPassword(id: string, password: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }

  async getUserProfile(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        achievements: {
          include: {
            Achievement: true,
          },
          take: 8,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async updateUserImage(id: string, url: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        image: url,
      },
    });
  }

  async updateUserBackground(id: string, url: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        background: url,
      },
    });
  }

  async getUserItems(userId: string): Promise<UserItemsDto> {
    const query = await this.prisma.userShopItem.findMany({
      where: {
        userId: userId,
      },
      include: {
        ShopItem: {},
      },
    });
    const items = query.map((item) => item.ShopItem);
    return new UserItemsDto(userId, items);
  }

  async getUserRenatokens(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        renatokens: true,
        id: true,
      },
    });
  }

  async updateUserRenatokens(userId: string, price: number) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        renatokens: {
          decrement: price,
        },
      },
    });
  }

  async updateUserProgress(id: string, progress: number) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        progress,
      },
    });
  }

  async getUserProgress(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        progress: true,
      },
    });
  }
}

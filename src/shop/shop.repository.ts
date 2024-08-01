import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import CreateShopItemDto from './dto/create-shop-item.dto';
import { ShopItemType } from '@prisma/client';

@Injectable()
export default class ShopRepository {
  constructor(private prisma: PrismaService) {}

  async getAllItems() {
    return this.prisma.shopItem.findMany();
  }

  async getUserItems(userId: string) {
    return this.prisma.userShopItem.findMany({
      where: {
        userId,
      },
    });
  }

  async getItemById(id: string) {
    return this.prisma.shopItem.findUnique({
      where: {
        id,
      },
    });
  }

  async createShopItem(item: CreateShopItemDto) {
    return this.prisma.shopItem.create({
      data: {
        ...item,
        type: item.type as ShopItemType,
      },
    });
  }
}

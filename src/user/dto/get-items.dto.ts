import { ShopItem } from '@prisma/client';

export default class UserItemsDto {
  constructor(
    public userId: string,
    public items: ShopItem[],
  ) {}
}

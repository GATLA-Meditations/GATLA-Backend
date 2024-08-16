import { ShopItemType } from '@prisma/client';

export default class UserOwnsItemDto {
  constructor(
    public owns: boolean,
    public itemId: string,
    public type: ShopItemType,
    public price: number,
    public content_url: string,
  ) {}
}

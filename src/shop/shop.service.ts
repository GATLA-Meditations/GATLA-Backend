import { ConflictException, Injectable } from '@nestjs/common';
import ShopRepository from './shop.repository';
import UserOwnsItemDto from './dto/user-owns-item.dto';
import AllItemsForUserDto from './dto/all-items-for-user.dto';
import { UserService } from 'src/user/user.service';
import CreateShopItemDto from './dto/create-shop-item.dto';

@Injectable()
export default class ShopService {
  constructor(
    private repository: ShopRepository,
    private userService: UserService,
  ) {}

  async getAllItemsForUser(userId: string): Promise<AllItemsForUserDto> {
    const items = await this.repository.getAllItems();
    const userItems = await this.repository.getUserItems(userId);
    const userOwnsItems = items.map((item) => {
      const userItem = userItems.find((userItem) => userItem.shopItemId === item.id);
      const owns = userItem ? true : false;
      return new UserOwnsItemDto(owns, item.id, item.type, item.price, item.content_url);
    });
    return new AllItemsForUserDto(userId, userOwnsItems);
  }

  async buyItem(userId: string, itemId: string) {
    const userItems = await this.repository.getUserItems(userId);
    const userOwnsItem = userItems.find((userItem) => userItem.shopItemId === itemId);
    if (userOwnsItem) {
      throw new ConflictException('User already owns this item');
    }
    const user = await this.userService.getUserRenatokens(userId);
    const item = await this.repository.getItemById(itemId);
    if (user.renatokens < item.price) {
      throw new ConflictException('Not enough renatokens');
    }
    await this.repository.buyItem(userId, itemId);
    await this.userService.updateRenatokens(userId, item.price);
    return item;
  }

  async createItem(itemDto: CreateShopItemDto) {
    return await this.repository.createShopItem(itemDto);
  }
}

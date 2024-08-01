import UserOwnsItemDto from './user-owns-item.dto';

export default class AllItemsForUserDto {
  constructor(
    public userId: string,
    public items: UserOwnsItemDto[],
  ) {}
}

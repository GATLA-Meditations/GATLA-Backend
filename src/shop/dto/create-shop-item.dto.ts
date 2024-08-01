export default class CreateShopItemDto {
  constructor(
    public type: string,
    public price: number,
    public content_url: string,
  ) {}
}

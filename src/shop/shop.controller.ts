import { Controller, Get, UseGuards, Request, Post, Param, Put, Body } from '@nestjs/common';
import ShopService from './shop.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import CreateShopItemDto from './dto/create-shop-item.dto';

@UseGuards(JwtGuard)
@ApiTags('shop')
@Controller('shop')
export default class ShopController {
  constructor(private service: ShopService) {}

  @Get('all-items-user')
  async getAllItemsForUser(@Request() req) {
    return await this.service.getAllItemsForUser(req.user.id);
  }

  @Put('buy-item/:id')
  async buyItem(@Param('id') id, @Request() req) {
    return await this.service.buyItem(req.user.id, id);
  }

  @Post('create-item')
  async createItem(@Body() itemDto: CreateShopItemDto, @Request() req) {
    return await this.service.createItem(itemDto, req.user.id);
  }
}

import { Controller, Get, UseGuards, Request, Post, Param, Put, Body, Delete } from '@nestjs/common';
import ShopService from './shop.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import CreateShopItemDto from './dto/create-shop-item.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@UseGuards(JwtGuard)
@ApiTags('shop')
@Controller('shop')
export default class ShopController {
  constructor(private service: ShopService) {}

  @Get('all-items-user')
  async getAllItemsForUser(@Request() req) {
    return await this.service.getAllItemsForUser(req.user.userId);
  }

  @Put('buy-item/:id')
  async buyItem(@Param('id') id, @Request() req) {
    return await this.service.buyItem(req.user.userId, id);
  }

  @Post('create-item')
  @UseGuards(AdminGuard)
  async createItem(@Body() itemDto: CreateShopItemDto) {
    return await this.service.createItem(itemDto);
  }

  @Delete('delete-item/:id')
  @UseGuards(AdminGuard)
  async deleteItem(@Param('id') id: string) {
    return await this.service.deleteItem(id);
  }
}

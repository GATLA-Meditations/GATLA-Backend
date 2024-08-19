import { Module } from '@nestjs/common';
import ShopController from './shop.controller';
import ShopService from './shop.service';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import ShopRepository from './shop.repository';

@Module({
  controllers: [ShopController],
  providers: [ShopService, PrismaService, ShopRepository],
  imports: [UserModule],
})
export default class ShopModule {}

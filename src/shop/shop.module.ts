import { Module } from '@nestjs/common';
import ShopController from './shop.controller';
import ShopService from './shop.service';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ShopController],
  providers: [ShopService, PrismaService],
  imports: [UserModule],
})
export default class ShopModule {}

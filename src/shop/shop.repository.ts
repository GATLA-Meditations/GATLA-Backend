import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export default class ShopRepository {
  constructor(private prisma: PrismaService) {}
}

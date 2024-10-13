import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import FriendsRepository from './friends.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [FriendsService, FriendsRepository, PrismaService],
})
export class FriendsModule {}

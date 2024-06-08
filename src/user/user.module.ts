import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma.service';
import { ModuleModule } from '../module/module.module';
import { TreatmentModule } from '../treatment/treatment.module';

@Module({
  imports: [ModuleModule, TreatmentModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
})
export class UserModule {}

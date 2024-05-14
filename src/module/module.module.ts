import { Module } from '@nestjs/common';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { ModuleRepository } from './module.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ModuleController],
  providers: [ModuleService, ModuleRepository, PrismaService],
})
export class ModuleModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ModuleModule } from '../module/module.module';
import { IngameDataController } from './ingamedata.controller';
import { IngameDataService } from './ingamedata.service';
import { IngameDataRepository } from './ingamedata.repository';

@Module({
  imports: [ModuleModule],
  controllers: [IngameDataController],
  providers: [IngameDataService, IngameDataRepository, PrismaService],
})
export class IngameDataModule {}

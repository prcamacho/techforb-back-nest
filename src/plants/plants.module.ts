import { Module } from '@nestjs/common';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';
import { PrismaService } from 'src/users/prisma/prisma.service';

@Module({
  controllers: [PlantsController],
  providers: [PlantsService,PrismaService],
  exports: [PrismaService]
})
export class PlantsModule {}

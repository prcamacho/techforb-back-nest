import { Module } from '@nestjs/common';
import { SeveritysController } from './severities.controller';
import { SeveritysService } from './severities.service';
import { PrismaService } from 'src/users/prisma/prisma.service';

@Module({
  controllers: [SeveritysController],
  providers: [SeveritysService,PrismaService],
})
export class SeveritysModule {}

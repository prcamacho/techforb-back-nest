import { Module } from '@nestjs/common';
import { SeveritysController } from './severities.controller';
import { SeveritysService } from './severities.service';

@Module({
  controllers: [SeveritysController],
  providers: [SeveritysService],
})
export class SeveritysModule {}

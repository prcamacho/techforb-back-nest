import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthController } from './users/auth/auth.controller';
import { PlantsModule } from './plants/plants.module';
import { SeveritysModule } from './severities/severities.module';

@Module({
  imports: [UsersModule, PlantsModule, SeveritysModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}

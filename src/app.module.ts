import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthController } from './users/auth/auth.controller';
import { PlantsModule } from './plants/plants.module';
import { SeveritysModule } from './severities/severities.module';
import { AuthModule } from './users/auth/auth.module';

@Module({
  imports: [UsersModule, PlantsModule, SeveritysModule,AuthModule],
  controllers: [AuthController],
  providers: [AuthController],
})
export class AppModule {}

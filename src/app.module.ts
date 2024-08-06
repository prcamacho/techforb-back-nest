import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PlantsModule } from './plants/plants.module';
import { SeveritysModule } from './severities/severities.module';
import { HomeController } from './app.controller';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, PlantsModule, SeveritysModule, AuthModule],
  controllers: [HomeController],
  providers: [],
})
export class AppModule {}

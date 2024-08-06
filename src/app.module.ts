import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PlantsModule } from './plants/plants.module';
import { SeveritysModule } from './severities/severities.module';
import { HomeController } from './app.controller';


@Module({
  imports: [UsersModule, PlantsModule, SeveritysModule],
  controllers: [HomeController],
  providers: [],
})
export class AppModule {}

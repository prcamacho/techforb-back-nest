import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PlantsModule } from './plants/plants.module';
import { SeveritysModule } from './severities/severities.module';


@Module({
  imports: [UsersModule, PlantsModule, SeveritysModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  NotFoundException,
  Param,
  ConflictException,
} from '@nestjs/common';
import { CreatePlantDto } from './dto/create-plant.dto';
import { PlantsService } from './plants.service';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Get('alerts')
  async getPlantAlerts() {
    return this.plantsService.getPlantAlerts();
  }

  @Delete(':name')
  async deletePlant(@Param('name') name: string) {
    const deleted = await this.plantsService.deletePlant(name);
    if (!deleted) {
      throw new NotFoundException(`Planta "${name}" no encontrada`);
    }
    return { message: `Planta "${name}" y sus alertas eliminadas con éxito` };
  }

  @Post()
  async createPlant(@Body() createPlantDto: CreatePlantDto) {
    try {
      const newPlant = await this.plantsService.createPlant(createPlantDto);
      return newPlant;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('Ocurrió un error al crear la planta');
    }
  }
}

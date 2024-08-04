import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePlantDto } from './dto/create-plant.dto';
import { PrismaService } from 'src/users/prisma/prisma.service';
import { PlantAlert } from './interfaces/alert.interface';

@Injectable()
export class PlantsService {
  constructor(private readonly prisma: PrismaService) {}
  async createPlant(createPlantDto: CreatePlantDto) {
    const { name, country } = createPlantDto;

    const existingPlant = await this.prisma.getPlant(name);

    if (existingPlant) {
      throw new ConflictException(`La planta "${name}" ya existe`);
    }

    const newPlant = await this.prisma.createPlant(name, country);

    return newPlant;
  }
  async getPlantAlerts(): Promise<PlantAlert[]> {
    try {
      const plants = await this.prisma.getPlantsWithAlerts();

      const plantAlerts = plants.map((plant) => {
        const severityCounts = plant.alerts.reduce(
          (counts: Record<string, number>, alert) => {
            if (!counts[alert.alertSeverity.severity]) {
              counts[alert.alertSeverity.severity] = 0;
            }
            counts[alert.alertSeverity.severity]++;
            return counts;
          },
          {} as Record<string, number>,
        );

        return {
          name: plant.name,
          country: plant.country,
          totalAlerts: plant.alerts.length,
          severityCounts,
        };
      });

      return plantAlerts;
    } catch (error) {
      throw new Error('Ocurrió un error al obtener las alertas de las plantas');
    }
  }

  async deletePlant(name: string): Promise<boolean> {
    const plant = await this.prisma.getPlant(name);

    if (!plant) {
      return false;
    }

    await this.prisma.deleteAlert(plant.id);

    await this.prisma.deletePlant(plant.id);

    return true;
  }
}

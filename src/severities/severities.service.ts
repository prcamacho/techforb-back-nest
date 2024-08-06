import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../users/prisma/prisma.service';
import { CreateAlertDto } from './dto/create-alert.dto';

@Injectable()
export class SeveritysService {
  constructor(private readonly prisma: PrismaService) {}

  async getAlertsByType(type: string): Promise<{ [key: string]: number }> {
    const alertType = await this.prisma.getAlertType(type);

    if (!alertType) {
      throw new NotFoundException(`Tipo de alerta "${type}" no encontrado`);
    }

    const alerts = await this.prisma.getAlerts(alertType.id);

    const severityCounts = alerts.reduce(
      (counts: { [key: string]: number }, alert) => {
        if (!counts[alert.alertSeverity.severity]) {
          counts[alert.alertSeverity.severity] = 0;
        }
        counts[alert.alertSeverity.severity]++;
        return counts;
      },
      {},
    );

    return severityCounts;
  }

  async getAlertsBySeverity(severity: string) {
    try {
      const alertSeverity = await this.prisma.getAlertSeverity(severity);
      if (!alertSeverity) {
        throw new Error(`Severidad de alerta "${severity}" no encontrada`);
      }

      const alerts = await this.prisma.getAlertsCountBySeverity(
        alertSeverity.id,
      );
      return alerts;
    } catch (error) {
      throw new Error('Ocurrió un error al recuperar las alertas');
    }
  }

  async createAlerts(createAlertDto: CreateAlertDto): Promise<void> {
    const { name, alertSeverities } = createAlertDto;

    const plant = await this.prisma.getPlant(name);

    if (!plant) {
      throw new Error(`La planta "${name}" no existe`);
    }

    const alertTypes = await this.prisma.getAlertTypes();

    await this.prisma.deleteAlert(plant.id);

    for (const alertSeverity of alertSeverities) {
      const { severity, count } = alertSeverity;

      const alertSeverityRecord = await this.prisma.getAlertSeverity(severity);

      if (!alertSeverityRecord) {
        throw new Error(`AlertSeverity "${severity}" no existe`);
      }

      for (let i = 0; i < count; i++) {
        const randomAlertType =
          alertTypes[Math.floor(Math.random() * alertTypes.length)];

        await this.prisma.createAlert(
          plant.id,
          randomAlertType.id,
          alertSeverityRecord.id,
        );
      }
    }
  }
}

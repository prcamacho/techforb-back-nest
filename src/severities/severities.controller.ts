import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { SeveritysService } from './severities.service';
import { SeverityDto } from './dto/severity.dto';
import { CreateAlertDto } from './dto/create-alert.dto';
import { GetAlertsDto } from './dto/get-alerts.dto';

@Controller()
export class SeveritysController {
  constructor(private readonly severitysService: SeveritysService) {}

  @Get('alerts/:type')
  async getAlertsByType(@Param() getAlertsDto: GetAlertsDto) {
    try {
      const severityCounts = await this.severitysService.getAlertsByType(
        getAlertsDto.type,
      );
      return severityCounts;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Ocurrió un error al obtener las alertas');
    }
  }

  @Get('alerts/severity/:severity')
  async getAlertsBySeverity(@Param() severityDto: SeverityDto) {
    const { severity } = severityDto;
    return this.severitysService.getAlertsBySeverity(severity);
  }

  @Post('createAlerts')
  async createAlerts(@Body() createAlertDto: CreateAlertDto) {
    return this.severitysService.createAlerts(createAlertDto);
  }
}

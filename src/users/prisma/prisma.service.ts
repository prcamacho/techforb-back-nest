import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Conexión a la base de datos establecida con éxito');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  }

  async createUser(userData: {
    email: string;
    password: string;
  }): Promise<User> {
    const { email, password } = userData;
    if (!email || !password) {
      throw new Error('Email y contraseña son obligatorios');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        updatedAt: new Date(),
      },
    });

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async getAlertSeverity(severity: string) {
    return this.prisma.alertSeverity.findUnique({
      where: {
        severity,
      },
    });
  }
  async getAlertsCountBySeverity(id: number) {
    return this.prisma.alert.findMany({
      where: {
        alertSeverityId: id,
      },
    });
  }
  async getUserByEmail(email: string) {
    try {
      return this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new Error('Error fetching user by email');
    }
  }

  async getAlerts(id: number) {
    return this.prisma.alert.findMany({
      where: {
        alertTypeId: id,
      },
      include: {
        alertSeverity: true,
      },
    });
  }

  async getAlertType(type: string) {
    return this.prisma.alertType.findUnique({
      where: {
        tipo: type,
      },
    });
  }

  async getPlant(name: string) {
    return this.prisma.plant.findUnique({
      where: {
        name,
      },
    });
  }

  async deletePlant(id: number) {
    await this.prisma.plant.delete({
      where: {
        id: id,
      },
    });
  }

  async getAlertTypes() {
    return this.prisma.alertType.findMany();
  }

  async deleteAlert(id: number) {
    await this.prisma.alert.deleteMany({
      where: {
        plantId: id,
      },
    });
  }
  async getPlantsWithAlerts() {
    return this.prisma.plant.findMany({
      include: {
        alerts: {
          include: {
            alertSeverity: true,
          },
        },
      },
    });
  }

  async createPlant(name: string, country: string) {
    try {
      return await this.prisma.plant.create({
        data: {
          name,
          country,
        },
      });
    } catch (error) {
      throw new Error('Error creating plant');
    }
  }

  async createAlert(
    plantId: number,
    alertTypeId: number,
    alertSeverityId: number,
  ) {
    try {
      return await this.prisma.alert.create({
        data: {
          plantId,
          alertTypeId,
          alertSeverityId,
        },
      });
    } catch (error) {
      throw new Error('Error creating alert');
    }
  }
}

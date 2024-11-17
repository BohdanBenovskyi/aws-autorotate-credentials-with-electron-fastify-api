import DbClient from '@/dbClient';
import { PrismaClient, Configuration } from '@prisma/client';
import { Mapping } from '@/controllers/types/configurationController.types';

export default class ConfigurationController {
  private dbClient: PrismaClient;

  constructor() {
    this.dbClient = DbClient.getClient();
  }

  async getConfiguration(): Promise<Configuration | null> {
    return this.dbClient.configuration.findFirst();
  }

  async createConfiguration(configuration: { mapping: Mapping[] }) {
    return this.dbClient.configuration.create({ data: configuration });
  }
}

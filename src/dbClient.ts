import { PrismaClient } from '@prisma/client';

export default class DbClient {
  private static client: PrismaClient;

  public static getClient() {
    if (!DbClient.client) {
      DbClient.client = new PrismaClient();
    }

    return DbClient.client;
  }
}

import DbClient from '@/dbClient';
import { PrismaClient } from '@prisma/client';
import { RegisterParams, LoginParams } from './types/userController.types';
import bcrypt from 'bcrypt';

export default class UserController {
  private dbClient: PrismaClient;

  constructor() {
    this.dbClient = DbClient.getClient();
  }

  async register(params: RegisterParams) {
    const { firstName, lastName, username, password, role, phone } = params;

    const result = await this.dbClient.user.create({
      data: {
        firstName,
        lastName,
        username,
        role,
        phone,
        password: await bcrypt.hash(password, 10),
      },
    });

    return { id: result.id, status: 'USER_CREATED' };
  }

  async login(params: LoginParams) {
    const { username, password, reqJWT } = params;

    const user = await this.dbClient.user.findUnique({ where: { username } });

    if (!user) {
      throw Error('User with this username not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw Error('Wrong password');
    }

    const payload = {
      username,
      id: user.id,
      role: user.role,
    };

    const token = reqJWT.sign(payload);

    return token;
  }
}

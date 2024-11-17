import { JWT } from '@fastify/jwt';

export type RegisterParams = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
  phone: string;
};

export type LoginParams = {
  username: string;
  password: string;
  reqJWT: JWT;
};

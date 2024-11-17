import { JWT } from '@fastify/jwt';

declare module 'fastify' {
  type Authenticate = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;

  type Authorize = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;

  interface FastifyRequest {
    jwt: JWT;
  }

  interface FastifyContextConfig {
    allowedRoles?: string[];
  }

  export interface FastifyInstance {
    authenticate: Authenticate;
    authorize: Authorize;
  }
}

type UserPayload = {
  id: string;
  username: string;
  role: string;
};

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: UserPayload;
  }
}

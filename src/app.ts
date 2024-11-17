import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { pingRequest } from '@/routes/ping';
import { configurationRequest } from '@/routes/configuration';
import { config } from 'dotenv';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import fjwt, { FastifyJWT } from '@fastify/jwt';
import fCookie from '@fastify/cookie';
import { userRequest } from './routes/user';

config();

export const build = (opts = {}): FastifyInstance => {
  const app = fastify(opts);

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fjwt, { secret: 'supersecretcode' });
  app.addHook('preHandler', (req, _res, next) => {
    req.jwt = app.jwt;

    return next();
  });

  app.register(fCookie, {
    secret: 'some-secret-key',
    hook: 'preHandler',
  });

  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.cookies.access_token || (request.headers.token as string);

    app.log.info('Received the request', { request });

    if (!token) {
      return reply.status(401).send({ message: 'Authentication required' });
    }

    const decoded = request.jwt.verify<FastifyJWT['user']>(token);
    request.user = decoded;
  });

  app.decorate('authorize', async (request: FastifyRequest, reply: FastifyReply) => {
    const allowedRoles = request.routeOptions.config.allowedRoles;

    if (!allowedRoles && !request.user) {
      reply.status(403).send({ message: 'You are not authorized for this action' });
    }

    const userRole = request.user.role;

    if (!allowedRoles?.includes(userRole)) {
      reply.status(403).send({ message: 'You are not authorized for this action' });
    }
  });

  app.register(pingRequest, { prefix: '/v1' });
  app.register(configurationRequest, { prefix: '/v1' });
  app.register(userRequest, { prefix: '/v1' });

  return app;
};

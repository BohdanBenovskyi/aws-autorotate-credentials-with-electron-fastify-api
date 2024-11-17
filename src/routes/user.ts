import UserController from '@/controllers/userController';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { UserLoginSchema, UserRegisterSchema } from '@/validations/userControllerValidation';

export const userRequest = (fastifyRequest: FastifyInstance, _opts, done) => {
  const userController = new UserController();

  fastifyRequest.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/user/login',
    schema: { body: UserLoginSchema },
    handler: async (request, reply) => {
      reply.log.info('Login route was hit');

      const token = await userController.login({ ...request.body, reqJWT: request.jwt });

      reply.setCookie('access_token', token, {
        path: '/user/login',
        httpOnly: true,
        secure: true,
      });

      return reply.status(200).send({ accessToken: token });
    },
  });

  fastifyRequest.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/user',
    schema: { body: UserRegisterSchema },
    handler: async (request, reply) => {
      reply.log.info('Register route was hit');

      return userController.register(request.body);
    },
  });

  fastifyRequest.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/user',
    preHandler: [fastifyRequest.authenticate],
    handler: async (request, reply) => {
      request.log.info('Register route was hit');

      reply.clearCookie('access_token');

      return reply.status(200).send({ message: 'Logout successful' });
    },
  });

  done();
};

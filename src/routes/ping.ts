import { FastifyInstance } from 'fastify';

export const pingRequest = (fastifyRequest: FastifyInstance, _opts, done) => {
  fastifyRequest.get('/ping', async (_request, reply) => {
    reply.log.info('Send reply with "pong" message');

    return 'pong +2';
  });

  done();
};

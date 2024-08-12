import { FastifyInstance } from 'fastify';

export const pingRequest = (fastifyRequest: FastifyInstance, _opts, done) => {
    fastifyRequest.get('/ping', async (_request, _reply) => {
        return 'pong'
    });

    done();
}

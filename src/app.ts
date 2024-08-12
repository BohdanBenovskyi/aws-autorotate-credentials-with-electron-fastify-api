import fastify, { FastifyInstance } from 'fastify';
import { pingRequest } from '@/routes/ping';
import { config } from 'dotenv';

config();

export const build = (opts = {}): FastifyInstance => {
    const app = fastify(opts);

    app.register(pingRequest, { prefix: '/v1' });

    return app;
}

import { build } from '@/app';

beforeEach(async () => {
  const fastifyApp = build();

  await fastifyApp.ready();

  global.fastify = fastifyApp;
});

afterEach(async () => {
  await global.fastify.close();
});

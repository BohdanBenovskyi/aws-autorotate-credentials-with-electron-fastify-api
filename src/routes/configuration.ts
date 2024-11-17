import ConfigurationController from '@/controllers/configurationController';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { MappingSchema } from '@/validations/configurationControllerValidation';

export const configurationRequest = (fastifyRequest: FastifyInstance, _opts, done) => {
  const configurationController = new ConfigurationController();

  fastifyRequest.get('/configuration', async (_request, reply) => {
    reply.log.info('Get single configuration route was hit');

    return configurationController.getConfiguration();
  });

  fastifyRequest.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/configuration',
    schema: { body: MappingSchema },
    preHandler: [fastifyRequest.authenticate, fastifyRequest.authorize],
    config: { allowedRoles: ['ADMIN'] },
    handler: async (request, response) => {
      response.log.info('Get single configuration route was hit');

      return configurationController.createConfiguration(request.body);
    },
  });

  done();
};

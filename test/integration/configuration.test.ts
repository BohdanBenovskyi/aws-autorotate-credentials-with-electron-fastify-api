import DbClient from '@/dbClient';
import { PrismaClient } from '@prisma/client';

describe('Configuration', () => {
  let dbClient: PrismaClient;

  beforeAll(() => {
    dbClient = DbClient.getClient();
  });

  describe('Get configuration route', () => {
    it('should return congiguration object', async () => {
      const response = await global.fastify.inject({
        method: 'GET',
        url: '/v1/configuration',
      });

      expect(response.statusCode).toEqual(200);

      const body = JSON.parse(response.body);

      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          mapping: expect.arrayContaining([
            expect.objectContaining({
              originKeyName: expect.any(String),
              mappedKeyName: expect.any(String),
              aliases: expect.arrayContaining([expect.any(String)]),
            }),
          ]),
        })
      );
    });
  });

  describe('Create configuration route', () => {
    let user1Id, user2Id;

    beforeEach(async () => {
      const [user1, user2] = await Promise.all([
        global.fastify.inject({
          method: 'POST',
          url: '/v1/user',
          payload: {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johnDoeTestUser',
            password: 'password321',
            role: 'USER',
            phone: '123-456-7890',
          },
        }),
        global.fastify.inject({
          method: 'POST',
          url: '/v1/user',
          payload: {
            firstName: 'Jane',
            lastName: 'Doe',
            username: 'janeDoeTestUser',
            password: 'password123',
            role: 'ADMIN',
            phone: '123-456-7890',
          },
        }),
      ]);

      const parsedUser1 = JSON.parse(user1.body);
      const parsedUser2 = JSON.parse(user2.body);

      user1Id = parsedUser1.id;
      user2Id = parsedUser2.id;
    });

    afterEach(async () => {
      await dbClient.user.deleteMany({ where: { id: { in: [user1Id, user2Id] } } });
    });

    it('should not create configuration when user is not authenticated', async () => {
      const { body: loginResponse } = await global.fastify.inject({
        method: 'POST',
        url: '/v1/user/login',
        payload: {
          username: 'johnDoeTestUser',
          password: 'password321',
        },
      });

      const { accessToken } = JSON.parse(loginResponse);

      const { body: configurationResponse } = await global.fastify.inject({
        method: 'POST',
        url: '/v1/configuration',
        cookies: {
          access_token: accessToken,
        },
        payload: {
          mapping: [
            {
              originKeyName: 'AccessKeyId',
              mappedKeyName: 'Test_AccessKeyId',
              aliases: ['Test_AccessKeyId_1', 'Test_AccessKeyId_2'],
            },
          ],
        },
      });

      const body = JSON.parse(configurationResponse);

      expect(body.message).toEqual('You are not authorized for this action');
    });

    it('should create configuration when user is authenticated', async () => {
      const { body: loginResponse } = await global.fastify.inject({
        method: 'POST',
        url: '/v1/user/login',
        payload: {
          username: 'janeDoeTestUser',
          password: 'password123',
        },
      });

      const { accessToken } = JSON.parse(loginResponse);

      const { body: configurationResponse } = await global.fastify.inject({
        method: 'POST',
        url: '/v1/configuration',
        cookies: {
          access_token: accessToken,
        },
        payload: {
          mapping: [
            {
              originKeyName: 'AccessKeyId',
              mappedKeyName: 'Test_AccessKeyId',
              aliases: ['Test_AccessKeyId_1', 'Test_AccessKeyId_2'],
            },
          ],
        },
      });

      const body = JSON.parse(configurationResponse);

      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          mapping: expect.arrayContaining([
            expect.objectContaining({
              originKeyName: expect.any(String),
              mappedKeyName: expect.any(String),
              aliases: expect.arrayContaining([expect.any(String)]),
            }),
          ]),
        })
      );

      await dbClient.configuration.delete({ where: { id: body.id } });
    });
  });
});

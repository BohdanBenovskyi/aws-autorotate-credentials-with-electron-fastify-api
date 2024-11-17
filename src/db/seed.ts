import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import DbClient from '../dbClient';

const client: PrismaClient = DbClient.getClient();

async function main() {
  await client.configuration.create({
    data: {
      mapping: [
        {
          originKeyName: 'AccessKeyId',
          mappedKeyName: 'AWS_ACCESS_KEY_ID',
          aliases: ['AWS_ACCESS_KEY_ID'],
        },
        {
          originKeyName: 'SecretAccessKey',
          mappedKeyName: 'AWS_SECRET_ACCESS_KEY',
          aliases: ['AWS_SECRET_ACCESS_KEY'],
        },
        {
          originKeyName: 'SessionToken',
          mappedKeyName: 'AWS_SESSION_TOKEN',
          aliases: ['AWS_SESSION_TOKEN'],
        },
        {
          originKeyName: 'Expiration',
          aliases: ['AWS_EXPIRE_AT'],
          mappedKeyName: 'AWS_CREDENTIALS_EXPIRE_AT',
        },
      ],
    },
  });

  console.log('Configuration seeded successfully!');

  await client.user.createMany({
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        password: await bcrypt.hash('password321', 10),
        role: 'ADMIN',
        phone: '123-456-7890',
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        username: 'janedoe',
        password: await bcrypt.hash('password123', 10),
        role: 'USER',
        phone: '987-654-3210',
      },
    ],
  });

  console.log('Users seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });

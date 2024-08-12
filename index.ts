import fastify from 'fastify';

const server = fastify({logger: true});

server.get('/ping', async (_request, _reply) => {
  return 'pong\n'
});

server.listen({ host: '0.0.0.0', port: 12098 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server listening at ${address}`)

  if (process.send) {
    process.send('ready');
  }
});

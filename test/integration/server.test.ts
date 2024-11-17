describe('ping route', () => {
  it('should return correct response from the ping route', async () => {
    const response = await global.fastify.inject({
      method: 'GET',
      url: '/v1/ping',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual('pong +2');
  });
});

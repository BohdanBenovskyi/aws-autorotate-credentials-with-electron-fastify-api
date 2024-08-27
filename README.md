## Local Launch Commands (trough Docker):
- Build
```sh
    docker build . --no-cache -t aws-autorotate-credentials-with-electron-fastify-api
```

- Run
```sh
    docker run -p 12098:12098 aws-autorotate-credentials-with-electron-fastify-api
```

## Local Launch Commands (trough docker compose)
- Build
```sh
    docker compose build fastify
```

- Run
```sh
    docker compose up fastify
```

## Launch.json For Local Docker Debug
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Docker: Attach to Node",
            "remoteRoot": "/app",
            "port": 9229,
            "address": "localhost",
            "localRoot": "${workspaceFolder}",
            "restart": true,
            "sourceMaps": true
        }
    ]
}
```
module.exports = {
    apps: [
        {
            name: 'server',
            script: "./build/server.js",
            instances: 'max',
            exec_mode: 'cluster',
            wait_ready: true,
            listen_timeout: 5000,
        },
    ],
    env: {
        NODE_ENV: 'development',
        DEBUG: 'custom:*'
    },
}
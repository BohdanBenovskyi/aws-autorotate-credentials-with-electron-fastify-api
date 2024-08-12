module.exports = {
    apps: [
        {
            name: 'server',
            script: "./build/index.js",
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
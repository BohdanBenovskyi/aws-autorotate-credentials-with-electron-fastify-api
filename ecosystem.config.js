module.exports = {
    apps: [
        {
            name: 'server',
            script: "./build/src/server.js",
            instances: process.env.NODE_ENV === 'development' ? 1 : 'max',
            exec_mode: process.env.NODE_ENV === 'development' ? 'fork' : 'cluster',
            wait_ready: true,
            listen_timeout: 5000,
            node_args: process.env.NODE_ENV === 'development' ? "--inspect=0.0.0.0:9229 --inspect-brk" : "",
            watch: process.env.NODE_ENV === 'development',
        },
    ],
    env: {
        NODE_ENV: 'development',
        DEBUG: 'custom:*'
    },
    env_production: {
        NODE_ENV: 'production',
        DEBUG: 'custom:*'
    },
}
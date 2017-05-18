module.exports = {
    apps : [
        {
            name: 'chat',
            cwd: './server',
            script: 'server/server/chat.js',
            watch: ['server'],
        },
        {
            name: 'render.bundle',
            cwd: './web',
            script: 'web/render.bundle.js',
            watch: ['web'],
        },
    ],
}

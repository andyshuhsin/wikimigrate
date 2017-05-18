module.exports = {
    apps : [
        {
            name: 'chat',
            script: 'server/server/chat.js',
            watch: ['server'],
        },
        {
            name: 'render.bundle',
            script: 'web/render.bundle.js',
            watch: ['web'],
        },
    ],
}

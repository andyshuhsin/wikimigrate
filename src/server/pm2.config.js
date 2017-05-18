module.exports = {
    apps : [
        {
            name: 'chat',
            script: 'server/server/chat.js',
            watch: ['server'],
        },
        {
            name: 'render',
            script: 'web/render.bundle.js',
            watch: ['web'],
        },
    ],
}

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
            cwd: './ssr',
            script: 'ssr/render.bundle.js',
            watch: ['ssr'],
        },
    ],
}

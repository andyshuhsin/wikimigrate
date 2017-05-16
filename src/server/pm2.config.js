const devConfig = {
  apps : [
    {
      name      : 'chat',
      script    : 'built/server/chat.js',
      watch     : ['built'],
    },
  ],
}

const remoteConfig = {
    apps : [
        {
            name      : 'chat',
            script    : 'server/chat.js',
            watch     : ['.'],
        },
    ],
}

if (process.env["WKM_ENVIRONMENT"] === "dev") {
    module.exports = devConfig
}
else {
    module.exports = remoteConfig
}


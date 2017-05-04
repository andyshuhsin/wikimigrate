module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'chat',
      script    : 'built/server/chat.js',
      watch     : ['built'],
    },
  ],
}

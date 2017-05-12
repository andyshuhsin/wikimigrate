nginx -s stop; nginx -c $(pwd)/tools/nginx.dev.conf
mongod &
cd src/server/

touch built/chat.js
pm2 start pm2.config.js
tsc --watch &
pm2 logs &

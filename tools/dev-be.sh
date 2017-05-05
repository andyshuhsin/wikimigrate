nginx -s stop; nginx -c $(pwd)/tools/nginx.dev.conf
mongod &
cd src/server/

touch built/chat.js
pm2 start ecosystem.config.js
tsc --watch &

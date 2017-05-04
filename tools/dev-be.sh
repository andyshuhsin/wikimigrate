nginx -s stop; nginx -c $(pwd)/tools/nginx.dev.conf
cd src/server/

touch built/chat.js
pm2 start built/chat.js --watch
tsc --watch &

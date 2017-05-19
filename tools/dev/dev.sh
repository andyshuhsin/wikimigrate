find ".built" -type f -delete
mkdir -p .built/web
mkdir -p .built/server
mkdir -p .built/ssr

# Web contents
if [ $1 == "ssr" ]
then
    cd src/client/web
    node_modules/.bin/webpack --config ./webpack.config.js --watch &
    cd ~-

    cd .built/web
    python -m http.server 8080 &
    cd ~-
else
    cd src/client/web
    node_modules/.bin/webpack-dev-server
    cd ~-
fi

# Server-side rendering script (optional)
if [ $1 == "ssr" ]
then
    cd src/client/ssr
    ../node_modules/.bin/webpack --config ./webpack.config.js --watch &
    cd ~-
fi

# Server
nginx -s stop
if [ $1 == "ssr" ]
then
    nginx -c $(pwd)/tools/dev/nginx.ssr.conf
else
    nginx -c $(pwd)/tools/dev/nginx.webpack.conf
fi

# Database
mongod --shutdown
mongod &

# Server script compilation
cd src/server
tsc --watch &
cd ~-

# Backend Scripts
cp src/server/pm2.config.js .built/
rsync -a src/server/node_modules .built/server
cd .built/

echo "Waiting for backend scripts to be built..."
while [ ! -f "./ssr/render.bundle.js" ] || [ ! -f "./server/server/chat.js" ]
do
    printf "."
    sleep 0.3
done

pm2 start pm2.config.js
pm2 logs &
cd ~-

# Kill background processes on exit
trap "trap - SIGTERM && kill -- -$$; pm2 kill" SIGINT SIGTERM EXIT

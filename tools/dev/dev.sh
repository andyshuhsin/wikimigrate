find . -name "src/built/*.js" -delete
mkdir -p src/built/web
mkdir -p src/built/server

# Web contents
if [ $1 == "ssr" ]
then
    cd src/client/web
    node_modules/.bin/webpack --config ./webpack.config.js --watch &
    cd ~-

    cd src/built/web
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
    cd src/server
    node_modules/.bin/webpack --config ./webpack.config.js --watch &
    cd ~-

    cd src/built/web
    touch render.bundle.js
    pm2 stop render.bundle
    pm2 start render.bundle.js --watch
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
mongod &

# Chat Scripts
cp src/server/pm2.config.js src/built/
rsync -a src/server/node_modules src/built/server/node_modules
cd src/built/server
touch chat.js
cd ..
pm2 start pm2.config.js
pm2 logs &
cd ~-

# Server script compilation
cd src/server
tsc --watch &
cd ~-

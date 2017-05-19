root=$(pwd)

if [ $1 == "prod" ]
then
    server="tokyo1"
elif [ $1 == "stage" ]
then
    server="tokyo2"
else
    echo "What's this?${server}"
    exit 1
fi

find ".built" -type f -delete

## Web contents
cd src/client/web
NODE_ENV='production' node_modules/.bin/webpack -p
cd ${root}

if [ $1 == "stage" ]
then
    cp tools/conf/robots.stage.txt .built/web/robots.txt
else
    cp tools/conf/robots.prod.txt .built/web/robots.txt
fi

## SSR code
cd src/client/ssr
../node_modules/.bin/webpack
cd ${root}

## Backend
cd src/server
tsc
cp pm2.config.js ../../.built
cp package.json ../../.built/server
cp yarn.lock ../../.built/server
cd ${root}

rsync -azP .built/* ${WKM_DEPLOY_USER}@${server}:/var/www/wkm/
ssh ${WKM_DEPLOY_USER}@${server} "cd /var/www/wkm/server && yarn install && cd .."
cd ${root}

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

find . -name "src/built/*.js" -delete

## Web contents
cd src/client/web
NODE_ENV='production' node_modules/.bin/webpack -p
if [ $1 == "stage" ]
then
    cp ../../../tools/conf/robots.stage.txt ../../built/web/robots.txt
else
    cp ../../../tools/conf/robots.prod.txt ../../built/web/robots.txt
fi
cd ~-

## SSR code
cd src/server
webpack
cd ~-

## Backend
cd src/server
tsc
cp pm2.config.js ../built
cp package.json ../built/server
cp yarn.lock ../built/server
cd ~-

rsync -azP src/built/* ${WKM_DEPLOY_USER}@${server}:/var/www/wkm/
ssh ${WKM_DEPLOY_USER}@${server} "cd /var/www/wkm/server && yarn install && cd .. && pm2 start pm2.config.js"
cd ~-

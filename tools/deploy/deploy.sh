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

rm -rf src/built

## Web contents
cd src/client/web
NODE_ENV='production' webpack -p
cp ../../../tools/conf/robots.stage.txt src/built/web/robots.txt
cd ~-

## Server side rendering code
cd src/server
NODE_ENV='production' webpack -p
cd ~-


## Backend
cd src/server
rm -rf built
tsc
cp pm2.config.js built/
cp package.json built/
cp yarn.lock built/
cp ../../../tools/conf/robots.prod.txt built/robots.txt
rsync -azP built/* ${WKM_DEPLOY_USER}@${server}:/var/www/wkm/server

rsync -azP src/built/built/* ${WKM_DEPLOY_USER}@${server}:/var/www/wkm/web
ssh ${WKM_DEPLOY_USER}@${server} "cd /var/www/wkm/server && yarn install && pm2 start pm2.config.js"

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

## Web-frontend
cd src/fe
rm -rf built
NODE_ENV='production' webpack -p
rsync -azP built/* ${WKM_DEPLOY_USER}@${server}:/var/www/wkm/web

## Backend
cd -
cd src/server
rm -rf built
tsc
rsync -azP built/* ${WKM_DEPLOY_USER}@${server}:/var/www/wkm/server

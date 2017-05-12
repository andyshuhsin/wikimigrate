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
NODE_ENV='production' webpack -p
rsync -azP built/* ${server}:/var/www/wkm/fe

## Backend
cd -
tsc
rsync -azP built/* ${server}:/var/www/wkm/server

## nginx config upgrade
cd -
scp -rp tools/nginx-$1-conf ${server}:/etc/nginx

root=$(pwd)
BUILD_ROOT='build'

if [ $1 == "prod" ]
then
    currentBranch=$(git rev-parse --abbrev-ref HEAD)
    expectedBranch="master"
    if [ $currentBranch != $expectedBranch ]
    then
        echo "Aborted deployment to production because current branch is not ${expectedBranch}"
        echo "If you're confident, comment out the next line in deploy.sh"
        exit 1
    fi
    server="tokyo1"
elif [ $1 == "stage" ]
then
    server="tokyo2"
else
    echo "What's this?${server}"
    exit 1
fi

find ${BUILD_ROOT} -type f -delete

## Web contents
cd src/client/web
NODE_ENV='production' node_modules/.bin/webpack -p
cd ${root}

if [ $1 == "stage" ]
then
    cp tools/conf/robots.stage.txt ${BUILD_ROOT}/web/robots.txt
else
    cp tools/conf/robots.prod.txt ${BUILD_ROOT}/web/robots.txt
fi

## SSR code
cd src/client/ssr
../node_modules/.bin/webpack
cd ${root}

## Backend
cd src/server
tsc
cp pm2.config.js ../../${BUILD_ROOT}
cp package.json ../../${BUILD_ROOT}/server
cd ${root}

rsync -azP ${BUILD_ROOT}/* ${WKM_DEPLOY_USER}@${server}:/var/www/wkm/
ssh ${WKM_DEPLOY_USER}@${server} "cd /var/www/wkm/server; npm install && pm2 restart all"
cd ${root}

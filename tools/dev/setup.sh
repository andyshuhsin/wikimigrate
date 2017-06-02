set -e

echo
echo "Checking current directory"
dirname=$(basename $(pwd))
if [ $dirname == "wikimigrate" ]
then
    echo "Done"
else
    echo "Please run me from the root directory named wikimigrate"
    exit 1
fi

echo
echo "Installing nvm"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

echo
echo "Loading nvm PATH"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

echo
echo "Installing node"
nvm install 8
nvm use 8

echo "Install necessary packages"
function npmi () {
    cd $1
    npm install
    cd -
}

npmi .
npmi src/server
npmi src/client
npmi src/client/web
npmi src/client/ssr

echo "Done"

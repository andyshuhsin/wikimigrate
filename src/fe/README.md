This directory contains front-end code of the project.

# The Code

The project uses
[React](https://facebook.github.io/react/tutorial/tutorial.html) and
styles are [inlined](https://facebook.github.io/react/docs/dom-elements.html#style). Thus, the tradition FE trio of HTML+CSS+JS are all combined in `.ts`/`.tsx` files.

The "entry point" of the FE code is in `fe/components/VisaPlanner.tsx`.
Look at the `render` method you'll see how the whole UI is constructed.

For bette developer experience, install [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) for your browser.

# Build process

** For macOS only **

The project is setup with build tools. To set up, follow these steps. Feel free to tweak if you know what you're doing.

## 1. Install `nvm`
Run this in terminal:
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```

## 2. Install `Node.js` (the backend JS engine)
```
nvm install 6.10
```

## 3. Install `yarn` (package manager)
```
brew install yarn
```

// It requires `homebrew`. If you don't have it, install it by running
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## 4. Clone the codebase to your machine  
```
git clone git@github.com:andyshuhsin/visaplanner.git
```

## 5. Install necessary packages 
```
cd src/fe
yarn install
```

## 6. Build & Run server

```
cd ..  # to /src dir
npm run start
```


Then visit `http://localhost:8080`. You should see the UI.
Make changes to the code, then `webpack` will automatically recompile the JS output.

## 8. Deploy
```
cd visaplanner
npm run deploy
```

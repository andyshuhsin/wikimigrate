# Source code

## Definitions (src/definitions)
`definitions` includes definitions of the shapes of data.
The definitions are not functional themselves, but they help future developers
to understand and maintain the codebase.

## General Data (src/data)
`data` directory contains records about the jurisdictions and their visa policies, with meta information about things like TOEFL and IELTS.

## Web front-end (src/client/web)

The project uses
[React](https://facebook.github.io/react/tutorial/tutorial.html) and
styles are [inlined](https://facebook.github.io/react/docs/dom-elements.html#style). Thus, the traditional trinity of HTML+CSS+JS are combined in `.ts`/`.tsx` files.

The "entry point" of the FE code is in `fe/components/VisaPlanner.tsx`. 
Look at the `render` method you'll see how the whole UI is constructed.

For bette developer experience, install [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) for your browser.

## Server-side rendering  (src/client/ssr)

## Chatbot (src/server/chat)

# Setup Development Environment


The project needs various build tools. To set up, follow these steps. Feel free to tweak if you know what you're doing.

## 1. Clone the codebase to your machine
```bash
git clone git@github.com:wikimigrate/wikimigrate.git
```

## 2. Run initialization script (only macOS & Linux)
```bash
cd wikimigrate
bash tools/dev/setup.sh
```

# Common operations

## 1-1. Build & Run development server

```
npm run start
```

Then visit `http://localhost:8080`. You should see the UI.

## 1-2. Build & Run development server in server-side rendering mode
```
npm run start:ssr
```

## 2-1. Deploy to staging server
```
npm run stage
```

## 2-2. Deploy to production server
```
npm run deploy:production
```


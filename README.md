## Install dependencies

Before you can run this app, you must install its dependencies:

* `npm install`, or `yarn install` - whatever you're into

## Start

`npm run start-dev` will run the app in development mode (and create the bundle.js file) and `npm start` will run it in production mode (but make sure webpack has made the bundle.js file first by running the command `webpack` or `npm run build-client`)

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

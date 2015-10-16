#Javascript Example Client for Bootlegger

This example shows how to implement the login workflow for the Bootlegger API, and some of the following:
- Accessing shoots and media for the logged in user.
- Connecting as a client to the real-time direction engine.

## Getting Going

> Requirements for the examples:

> Bower, NodeJS + NPM

Run the following to get the example up and running:

`$ bower install`

`$ npm install`

Sign-up for an API key on a bootlegger server (e.g. https://bootlegger.tv)

Enter http://localhost:3000/authcomplete as your redirect URL.

Edit the APIKEY and APISERVER variables in index.js.

`$ node index.js`

Visit http://localhost:3000 in a browser.
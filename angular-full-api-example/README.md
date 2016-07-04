# Angular example and tutorial for connecting to Bootlegger API

This is an example web app created in AngularJS using a simple NodeJS/ExpressJS server. 
The aim of this project is to give you an indication on how the Bootlegger API can be used. 
This project will help you getting a basic web app running using some of the Bootlegger API endpoint and will help you to log in and ensure you have a connection to a Bootlegger Server.
Feel free to use any code in your own project, or build upon the base code in this project. Also refer to the Bootlegger docs at https://bootlegger.tv/api/docs/ for any more information on the platform or any API endpoints. 

## Getting Going
Please ensure you follow the steps below to get the example project up and running.

> Requirements for the examples:

> Bower, NodeJS + NPM
Note: NPM can be installed from nodejs.org and bower from bower.io

Using the terminal, please direct to the project folder directory and enter the following commands:

`npm install`

`bower install`

Sign-up for an API key on a bootlegger server (e.g. https://bootlegger.tv)

Enter http://localhost:3000/authcomplete as your redirect URL.
Note: This is the url Bootlegger will redirect you to once you have signed in via bootleggers API login. If you do not have an account with bootlegger you will be required to create one. 

Click on Get API Key if one is not already generated. Copy this key!

Open the file 'index.js' and 'public/ng/services/api_config_service.js'.

In both files, you will see the following code:

----CODE---
//You need to fill these in! Go to https://bootlegger.tv/api/signup to get your API Key

var APIKEY = "enter-api-key-here";//Enter you bootlegger api key here!
var APIURL = "https://bootlegger.tv"; //Enter bootlegger url here!
----END----

In BOTH files, ensure that you paste the api key (you copied from the Bootlegger client) into the APIKEY variable. If you are not using bootlegger.tv, also specify the API Url which you are using.

Save any changes, and you are all set!

In the terminal type `node index.js` or `node index` to start the server.

At this point, the server should start normally, and terminal should display:
`Example app listening at http://:::3000`

If this is not the case, check that NPM/Node and Bower have been correctly installed, and that the dependencies in node_modules and public/lib are not empty. (If they are, there is a problem with npm or bower install).

Visit http://localhost:3000 in a browser.

You can then follow the instruction in the web browser to get a feel for how the Bootlegger API works.

Navigate to public/ng/controllers directory to see Angular controllers with example http calls to the Bootlegger API.
The controller files are named relative to the API endpoints - eg. commission_controller.js uses api endpoints '/commission/apiendpoint'.
'use strict';


 //You need to fill these in! Go to https://bootlegger.tv/api/signup to get your API Key

 var APIKEY = "enter-api-key-here";//Enter you bootlegger api key here!
 var APIURL = "https://bootlegger.tv"; //Enter bootlegger url here!

/**
 * Service to make API config global
 */
bootleggerApp.service('Api', function () {
    this.apiKey = '?apikey=' + APIKEY;
    this.apiUrl = APIURL;
});

'use strict';

//You need to fill these in! Go to https://dev.bootlegger.tv/api/signup to get your API Key

var APIKEY = "7119e691-efa3-436d-b028-945b719b355a";
var APIURL = "http://localhost:1337";


//var APIKEY = "1aca8be1-76b5-483d-a73f-5bd19c579ea1";
//var APIURL = "https://dev.bootlegger.tv";


//var APIKEY = "7ac72b06-70f3-46d4-9ccf-d6875345c3ea";
//var APIURL = "https://bootlegger.tv";
/**
 * Service to make API config global
 */
bootleggerApp.service('Api', function () {
    this.apiKey = '?apikey=' + APIKEY;
    this.apiUrl = APIURL;
});

'use strict';

//You need to fill these in! Go to https://dev.bootlegger.tv/api/signup to get your API Key
var APIKEY = "1aca8be1-76b5-483d-a73f-5bd19c579ea1";
var APIURL = "https://dev.bootlegger.tv";

/**
 * Service to make API config global
 */
bootleggerApp.service('Api', function () {
    this.apiKey = '?apikey=' + APIKEY;
    this.apiUrl = APIURL;
});
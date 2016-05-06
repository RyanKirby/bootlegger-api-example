'use strict';

/**
 * Service to control console log posts
 */
bootleggerApp.service('ConLog', function () {

    this.url = function(url){
        console.log('Api Request URL: ' + url);
    }

    this.successful = function(resp){
        console.log('API: Request Successful');
        console.log('API response:');
        console.log(resp);
    }

    this.failed = function(err){
        console.log('API: Request failed');
        console.log('< Have you entered the correct API key/URL in index.js & public/ng/service/api_config_service.js? Also make sure you have gone to https://dev.bootlegger.tv/api/signup and filled out the Hosted Server Application section - refer to the README.md file >');
        console.log(err);
    }

    this.log = function(url, resp){
        console.log('------------------------------');
        console.log('Api Request URL: ' + url);
        console.log('API: Request Successful');
        console.log('API response:');
        console.log(resp);
        console.log('------------------------------');
    }

});
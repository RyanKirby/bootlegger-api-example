'use strict';

/** ********************************************************************************************
 * Setup and config for the Angular App
 * ********************************************************************************************/
var bootleggerApp = angular.module('bootleggerApp', [
    "ngSanitize",
    'angularSails.io',
]);

bootleggerApp.config(['$httpProvider', function($httpProvider) {

   //$httpProvider.defaults.withCredentials = true;

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];

}]);

bootleggerApp.factory('socket',['$sailsSocket', 'Api',
    function($sailsSocket, Api){
    return $sailsSocket({baseUrl:Api.apiUrl});
}]);

 //bootleggerApp.config(['$sailsProvider', 'Api', function ($sailsProvider, Api) {
 //    $sailsProvider.url = Api.apiUrl;
 //}]);


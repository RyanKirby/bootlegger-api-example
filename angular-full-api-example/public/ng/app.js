'use strict';

/** ********************************************************************************************
 * Setup and config for the Angular App
 * ********************************************************************************************/
var bootleggerApp = angular.module('bootleggerApp', [
    'ngSanitize',
    'ngRoute',
    'angularSails.io'
]);

bootleggerApp.config(['$httpProvider', function ($httpProvider) {

    //$httpProvider.defaults.withCredentials = true;

  //  $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];

}]);

bootleggerApp.factory('socket', ['$sailsSocket', 'Api',
    function ($sailsSocket, Api) {
        return $sailsSocket({baseUrl: Api.apiUrl});
    }]);

bootleggerApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'public/views/main.html'
        }).
        when('/myshoots', {
            templateUrl: 'public/views/mainsections/shoots.html'
        }).
        when('/newshoot', {
            templateUrl: 'public/views/mainsections/newshoot.html'
        }).
        when('/docs', {
            templateUrl: 'public/views/mainsections/docs.html'
        }).
        when('/media', {
            templateUrl: 'public/views/mainsections/test.html'
        }).
        when('/shoot/:shootId', {
            templateUrl: 'public/views/mainsections/shoot.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

//bootleggerApp.config(['$sailsProvider', 'Api', function ($sailsProvider, Api) {
//    $sailsProvider.url = Api.apiUrl;
//}]);


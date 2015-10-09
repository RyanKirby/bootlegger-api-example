'use strict';

var bootleggerApp = angular.module('bootleggerApp', [
      "ngSanitize",
      'ngSails',
    ]);

  
// bootleggerApp.config(['$sailsProvider', function ($sailsProvider) {
//     $sailsProvider.url = 'http://localhost:1337';
// }]);

bootleggerApp.config(
        ['$locationProvider',
            function ($locationProvider) {
                $locationProvider.html5Mode(true);
            }
        ])

bootleggerApp.controller('client',['$scope','$http','$sails','$interval','$location', function ($scope, $http,$sails,$interval,$location) {
	
  $scope.loggedin = false;
  $scope.sessionid;
  $scope.myshoots = [];
  
  if ($location.search().session)
  {
    $scope.loggedin = true;
    $scope.sessionid = $location.search().session;
  }
  
  $scope.dologin = function()
  {
      window.location = BOOTLEGGER_SERVER + "/api/login?apikey="+API_KEY;    
  }
}]);
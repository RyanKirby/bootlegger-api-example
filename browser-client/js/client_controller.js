'use strict';

/**
 * FILL IN THESE SETTINGS WITH YOUR OWN
 */
var APIKEY = "0bdf30fb-871e-45bd-b1f3-febd5160f6a3";
var APIURL = "http://localhost:1337";

/**
 * DEMO CONTROLLER TO SHOW HOW TO INTERACT WITH THE API
 */

var bootleggerApp = angular.module('bootleggerApp', [
      "ngSanitize",
       'angularSails.io',
    ]);
    
bootleggerApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}]);


bootleggerApp.factory('socket',['$sailsSocket', function($sailsSocket){
  //console.log($sailsSocket);
      return $sailsSocket({baseUrl:APIURL});
  }]);
  
// bootleggerApp.config(['$sailsProvider', function ($sailsProvider) {
//     $sailsProvider.url = APIURL;
// }]);

bootleggerApp.controller('client',['$scope','$http','$interval','socket', function ($scope, $http,$interval,socket) {
	
  
  $scope.APIKEY = APIKEY;
  $scope.loggedin = false;
  $scope.sessionid;
  $scope.myshoots = [];
  
  socket.connect().then(function(sock){
    console.log('connected',sock)
  },function(err){
      console.log('connection error',err)
  },function(not){
      console.log('connection update',not)
  });

  (function () {
    //usSpinnerService.spin('spinner-1');

    // Using .success() and .error()
    // socket.get('/event/admin_events/')
    //   .then(function(resp){
    //      $scope.events = resp.data.events;
    //      $scope.loading_shoots = false;
    //   });

    //   socket.get('/event/admin_users/')
    //     .then(function(resp){
    //        $scope.users = resp.data.users;
    //        $scope.loading_users = false;
    //     });
  })();
  
  
  
  $http.get('/session').success(function(resp){
    if (resp.session)
    {
     $scope.loggedin = true;
     $scope.sessionid = resp.session;
     //get shots:
     $http.get(APIURL + '/api/profile/mine?apikey='+APIKEY).success(function(resp){
       $scope.myshoots = resp;
     });
     //get profile information:
     $http.get(APIURL + '/api/profile/me?apikey='+APIKEY).success(function(resp){
       $scope.me = resp;
     });
    }
  });
  
  $scope.connect = function(id)
  {
    //using socket?
    socket.get('/api/shoot/connect/'+id).then(function(resp){
      $scope.currentshoot = resp;
    });
  }
  
  $scope.view = function(id)
  {
    //using socket?
    $http.get(APIURL + '/api/media/shoot/'+id+'?apikey='+APIKEY).success(function(resp){
       $scope.media = resp;
     });
  }
  
}]);
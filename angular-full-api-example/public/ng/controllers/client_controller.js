'use strict';

/**
 * DEMO CONTROLLER TO SHOW HOW TO INTERACT WITH THE API
 */

bootleggerApp.controller('client', ['$scope', '$http', '$interval', 'socket', 'Api', '$location', 'ConLog', '$window',
    function ($scope, $http, $interval, socket, Api, $location, ConLog, $window) {

        var apiKey = Api.apiKey; //get apiKey from Api Service (see 'public/ng/service/api_config_service.js)
        var apiUrl = Api.apiUrl; //get apiUrl from Api Service

        //Updates variables in scope
        $scope.APIKEY = Api.apiKey;
        $scope.loggedin = false;
        $scope.sessionid;
        $scope.myshoots = [];

        /**
         * Title: Init
         * Details: Function which loads on page render. Gets all data needed for main login page.
         * Endpoints: /api/profile/mine & /api/profile/me
         */
        $scope.init = function () {
            $http.get('/session').success(function (resp) {
                if (resp.session) {
                    $scope.loggedin = true;
                    $scope.sessionid = resp.session;
                    var urlMine = apiUrl + '/api/profile/mine' + apiKey;
                    var urlMe = apiUrl + '/api/profile/me' + apiKey;

                    //get all you shoots
                    $http.get(urlMine).success(function (resp) {
                        ConLog.log(urlMine, resp);
                        $scope.myshoots = resp;
                    });

                    //get profile information
                    $http.get(urlMe).success(function (resp) {
                        ConLog.log(urlMe, resp);
                        $scope.me = resp;
                    });
                }
            });
        };


        $scope.connect = function (id) {
            //using socket?
            socket.get('/api/shoot/connect/' + id).then(function (resp) {
                $scope.currentshoot = resp;
            });
        }

        $scope.view = function (id) {
            //using socket?
            $http.get(apiUrl + '/api/media/shoot/' + id + apiKey).success(function (resp) {
                $scope.media = resp;
            });
        }

        $scope.logOut = function () {
           $http.get(apiUrl + '/api/auth/logout/' + apiKey);
            $window.location.href = '/logout';
        }

    }]);
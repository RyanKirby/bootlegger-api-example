'use strict';

/**
 * DEMO CONTROLLER TO SHOW HOW TO INTERACT WITH THE API
 */

bootleggerApp.controller('client', ['$scope', '$http', '$interval', 'Api', '$location', 'ConLog', '$window',
    function ($scope, $http, $interval, Api, $location, ConLog, $window) {

        var apiKey = Api.apiKey; //get apiKey from Api Service (see 'public/ng/service/api_config_service.js)
        var apiUrl = Api.apiUrl; //get apiUrl from Api Service

        //Updates variables in scope
        $scope.APIKEY = Api.apiKey;
        $scope.loggedin = false;
        $scope.sessionid;
        $scope.myshoots = [];

        /**
         * Title: Mine
         * Details: List the current user's shoots
         * Endpoints: /api/profile/mine
         */
        function mine(){
            var urlMine = apiUrl + '/api/profile/mine' + apiKey;

            //get all you shoots
            $http.get(urlMine).success(function (resp) {
                ConLog.log(urlMine, resp);
                $scope.myshoots = resp;
            });
        }

        /**
         * Title: Me
         * Details: Gets current users info
         * Endpoints: /api/profile/me
         */
        function me(){
            var urlMe = apiUrl + '/api/profile/me' + apiKey;


            //get profile information
            $http.get(urlMe).success(function (resp) {
                ConLog.log(urlMe, resp);
                $scope.me = resp;
            });
        }

        /**
         * Title Get Contributed
         * Details: Function to get all shoots user has contributed to.
         * Endpoints: /api/profile/contributed
         */
        function contributed(){
            var url = apiUrl + '/api/profile/contributed' + apiKey;
            $http.get(url).success(function (resp) {
                ConLog.log(url, resp);
                $scope.contributed = resp;
            });
        }

        /**
         * Title: Log Out
         * Description: Scope function that logs out of app and closes session key on bootlegger API
         * Endpoint: /api/auth/logout
         */
        $scope.logOut = function () {
            $http.get(apiUrl + '/api/auth/logout/' + apiKey); //closes bootlegger session
            $window.location.href = '/logout'; //logs out of web app
        }

        /*
         * Scope function to be called on page render, checks to see if user has logged in.
         */
        $scope.init = function () {
            $http.get('/session').success(function (resp) {
                if (resp.session) {
                    $scope.loggedin = true;
                    $scope.sessionid = resp.session;

                    mine();
                    me();
                }
            });
        };

        /*
         * Scope function to get all shoots user has contributed to.
         */
        $scope.getContributed = function(){
            //get profile information
            if(!$scope.contributed) { //if statement to ensure api is only called once
                contributed();
            }
        }

    }]);

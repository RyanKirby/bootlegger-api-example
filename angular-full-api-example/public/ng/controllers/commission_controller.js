'use strict';

/**
 * DEMO CONTROLLER TO SHOW HOW TO INTERACT WITH THE API
 */

bootleggerApp.controller('CommissionController', ['$scope', '$http', '$interval', 'Api', '$location', 'ConLog', '$window',
    function ($scope, $http, $interval, Api, $location, ConLog, $window) {

        var apiKey = Api.apiKey;
        var apiUrl = Api.apiUrl;

        /**
         * Title: New Shoot
         * Details: Function that takes params and uses it to create a new shoot
         * Endpoint: /api/shoot/create
         */
        function newShoot() {
            var url = apiUrl + '/api/shoot/create' + apiKey;

            var newShoot = {
                eventtype: $scope.selectedTemp,
                name: $scope.name,
                starts: $scope.starts,
                starts_time: $scope.startstime,
                ends: $scope.ends,
                ends_time: $scope.endstime,
                agree: $scope.agree
            };

            $http.post(url, newShoot).success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.shootResp = resp;
                })
                .error(function (err) {
                    ConLog.err(url, err);
                    $scope.shootResp = err;
                });

            /* Example of shoot params:
             eventtype: {EventType object}, //eventtype needs to pass validation (see Bootlegger docs for details)
             name: 'Some title here!', //title must be more than 5 characters long or will fail
             starts: '01-01-2016', //dates must be in format 'dd-mm-yyyy'
             starts_time: '10am',
             ends: '01-02-2016',
             ends_time: '10pm',
             agree: true
             */
        };

        /**
         * Title: Get Seed Template
         * Detail: Function to get list od seed templates
         * Endpoint: /api/commission/seedtemplate
         */
        function getSeedTemplates() {
            var url = apiUrl + '/api/commission/seedtemplates' + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.templates = resp;
                });
        };

        /**
         * Title: Get All Shots
         * Detail: Function to get list of all possible shots
         * Endpoint: /api/commission/shots
         */
        function getAllShots() {
            var url = apiUrl + '/api/commission/shots' + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.shots = resp;
                });
        };

        /**
         * Title: Get Seed Template
         * Details: Takes a seed id and returns the seed object
         * Endpoint: /api/commission/getseedtemplate/:id
         *
         * @param id - {String} seed id
         */
        function getSeedTemp(id) {
            var url = apiUrl + '/api/commission/getseedtemplate/' + id + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.seedTemp = resp;
                });
        }

        /*
         * Scope function for creating a new shoot.
         */
        $scope.comInit = function () {
            getSeedTemplates();
            getAllShots();
        };

        /*
         * Scope function to select a template
         */
        $scope.selectTemp = function (temp) {
            $scope.selectedTemp = temp;
            getSeedTemp(temp.id);
        };

        /*
         * Scope function to remove a shot from a given shoot
         */
        $scope.removeShot = function (i) {
            $scope.selectedTemp.shot_types.splice(i, 1);
        }

        /*
         * Scope function that adds a shot to the currently selected shoot shot_types
         */
        $scope.addShot = function (shot) {
            if ($scope.selectedTemp) {
                $scope.selectedTemp.shot_types.push(shot);
            }
        };

        /*
         * Scope function to create a new shoot
         */
        $scope.createShoot = function () {
            newShoot();
        };


    }]);

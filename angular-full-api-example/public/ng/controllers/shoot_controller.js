'use strict';

/** ********************************************************************************************
 * Controller used to test the API endpoints.
 * This controller uses a variatey of API endpoints, including Media, Shoot and Commission API Endpoints.
 * Visit https://dev.bootlegger.tv/api/docs for all information on API Endpoints.
 * You can use the following code as a starting point.
 * ********************************************************************************************/
bootleggerApp.controller('ShootController', ['$scope', '$routeParams', '$http', 'Api', 'ConLog',
    function ($scope, $routeParams, $http, Api, ConLog) {

        var apiKey = Api.apiKey;
        var apiUrl = Api.apiUrl;

        var id = $routeParams.shootId;
        $scope.shootId = id;

        /* Scope var to declare url and api in html <a></a> links */
        $scope.api = {
            url : apiUrl,
            key : apiKey
        }

        /**
         * Title: Get Media
         * Description: Function to list shoot media
         * Endpoint: /api/media/shoot/:id
         */
        function getMedia() {
            var url = apiUrl + '/api/media/shoot/' + id + apiKey;

            $http.get(url).then(function (resp) {
                ConLog.log(url, resp);
                $scope.allMedia = resp.data;
            });
        }

        /**
         * Title: Connect to Shoot
         * Description: Function to connect to a shoot using the shoot id
         * Endpoint: /api/shoot/connect/:id
         */
        function connect() {
            var url = apiUrl + '/api/shoot/connect/' + id + apiKey;

            $http.get(url).then(function (resp) {
                ConLog.log(url, resp);
                $scope.shoot = resp.data;
            });
        }

        /**
         * Title: Get Shoot Id
         * Description: Function to get shoot from a shoot id
         * Endpoint: /api/media/shoot
         */
        function getShootId() {
            var url = apiUrl + '/api/media/shoot/' + id + apiKey;
            $http.get(url).success(function (resp) {
                ConLog.log(url, resp);
                $scope.shoot = resp;
            });
        }

        /**
         * Title: Update Shots for a Shoot
         * Description: Function to update shoot shots
         * Endpoint: /api/commission/updateshots/:id
         */
        function updateShots() {
            var url = apiUrl + '/api/commission/updateshots/' + id + apiKey;
            var shots = {
                shots: $scope.shoot.shottypes
            };

            $http.post(url, shots).success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.resp = resp;
                })
                .error(function (err) {
                    ConLog.err(url, err);
                    $scope.resp = (err);
                });
        }

        /**
         * Title: Remove Shoot Media
         * Description: Remove a shoots media using media id
         * Endpoint: /api/media/remove/:id
         */
        function removeShootMedia(mId) {
            var url = apiUrl + '/api/media/remove/' + mId + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.fullVideo = resp;
                })
                .error(function (err) {
                    ConLog.err(url, err);
                    $scope.fullVideo = (err);
                })
        }

        /**
         * Title: Get Shoot Template
         * Description: Get the full event type for a shoot
         * Endpoint: /api/commission/gettemplate/:id
         */
        function getTemplate() {
            var url = apiUrl + '/api/commission/gettemplate/' + id + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.template = resp;
                })
                .error(function (err) {
                    ConLog.err(url, err);
                    $scope.temlpateErr = (err);
                })
        };

        /**
         * Title: Update Shoot Template
         * Description: Updates a shoots eventtype
         * Endpoint: /api/commission/update/:id
         */
        function updateTemplate() {
            var url = apiUrl + '/api/commission/update/' + id + apiKey;

            var eventtype = {
                eventtype: $scope.template
            };


            $http.post(url, eventtype)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.updateTempResp = resp;
                })
                .error(function (err) {
                    ConLog.err(url, err);
                    $scope.updateTempResp = (err);
                })

            /* Example eventtype template...*/
            var example = {
                "name": "Some Name...",
                "description": "Some Description...",
                "codename": "somename...",
                "id": "123456789",
                "updatedAt": "2016-04-15T12:11:39.714Z",
                "createdAt": "2016-04-15T12:11:39.714Z",
                "offline": true,
                "public": true,
                "publicview": true,
                "original": true,
                "coverage_classes": {
                    "0": {
                        "name": "coverage class 1",
                        "items": []
                    },
                    "1": {
                        "name": "coverage class 2",
                        "items": []
                    }
                },
                "phases": [{
                    "name": "phase 1",
                    "description": "phase 1 description"
                }],
                "shot_types": [{
                    "id": 0,
                    "name": "shot name",
                    "max_length": 15,
                    "wanted": 7,
                    "image": "image.png",
                    "icon": "icon.png",
                    "description": "shot description"
                }],
                "roles": [{
                    "id": 0,
                    "name": "Location 1",
                    "description": "role 1 description",
                    "shot_ids": [0, 1, 2, 3, 4, 5, 6, 7]
                }],
                "version": 1,
                "post_modules": {
                    "audio_sync": 0,
                    "titles": 0
                },
                "shoot_modules": {
                    "autodirector": 0,
                    "marathondirector": "1"
                },
                "ruleset": [{
                    "direction_engine": "selection",
                    "name": "selection",
                    "pre_time": 0
                }]
            }
        };

        /**
         * Title: List User's Own Media for a Shoot
         * Description: List all the media from a given shoot shot by the current user.
         * Endpoint: /api/media/mymedia/:id
         */
        function ownMedia() {
            var url = apiUrl + '/api/media/mymedia/' + id + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.ownMedia = resp;
                })
        }

        /**
         * Title: Full Video
         * Description: Get full video for specific media using id
         * Endpoint: /api/media/full/:id
         */
        $scope.getVideo = function (mId) {
            //fullVideo(mId);
            $scope.fullVideo = apiUrl + '/api/media/full/' + mId + apiKey;
        }

        /**
         * Title: Media Preview Video
         * Description: Get preview video for specific media using id
         * Endpoint: /api/media/preview/:id
         */
        $scope.getMediaPrev = function (mId) {
            //fullVideo(mId);
            $scope.perviewVideo = apiUrl + '/api/media/preview/' + mId + apiKey;
        }

        /**
         * Title: Get Thumbnail Image
         * Description: Get thumbnail image for specific media using id
         * Endpoint: /api/media/thumbnail/:id
         */
        $scope.getThumb = function (mId) {
            //fullVideo(mId);
            $scope.thumb = apiUrl + '/api/media/thumbnail/' + mId + apiKey;
        }

        /*
         * Init function for Shoot with ID
         */
        $scope.shootInit = function () {
            connect();
            getMedia();
            ownMedia();
        };

        /*
         * Remove shot from shoot
         */
        $scope.removeShot = function (i) {
            if ($scope.shoot.shottypes) {
                $scope.shoot.shottypes.splice(i, 1);
            }
        }

        /*
         * Update shots for a given shoot
         */
        $scope.updateShots = function () {
            updateShots();
        }

        /*
         * Scope function to select media
         */
        $scope.selectMedia = function (media) {
            $scope.selectedMedia = media;
        }

        /*
         * Scope function to select shoot event type
         */
        $scope.selectEventType = function () {
            if (!$scope.template) {
                getTemplate();
            }
        }

        /*
         * Scope function to update a shoots event type
         */
        $scope.updateTemp = function () {
            updateTemplate();
        }

        /*
         * Scope function to remove media from a shoot
         */
        $scope.removeMedia = function (mId) {
            removeShootMedia(mId);
        }

        /*
         * Disconnect from a shoot
         */
        $scope.disconnect = function(){
            console.log('discon')
            disconnect();
        }

    }]);

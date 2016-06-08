'use strict';

/** ********************************************************************************************
 * Controller used to test the Media API endpoints.
 * Visit https://dev.bootlegger.tv/api/docs/#api-Media for all information on Media API Endpoints.
 * You can use the following code as a starting point.
 * ********************************************************************************************/
bootleggerApp.controller('MediaController', ['$scope', '$http', 'Api', 'ConLog',
    function ($scope, $http, Api, ConLog) {

        var apiUrl = Api.apiUrl;
        var apiKey = Api.apiKey;

        $scope.test = function(){
            createMedia();
        }

        /**
         * Title: Create Media
         * Description: Create a new item of media, and return the id to use for uploads and updates
         * Endpoint: /api/media/create
         */
        function createMedia() {
            var url = apiUrl + '/api/media/create' + apiKey;

            //todo - what kind of an object do I need to pass?
            //todo - media file structure is incorrect on docs...
            var media = {
                // (string) ID of Shoot	                // meta-data associated with the clip
                    "static_meta": {
                        "event_id": "573f1d6860eda5ca30bbee2c",
                        "clip_length": "00:00:04.8888784",				// (timestamp)	Length in seconds of recording (specific format)
                        "camera": "rear",								// (front|rear)	Camera used in the recording
                        "zoom": "0",									// (string)	Zoom level at the start of the recording
                        "captured_at": "25/08/2015 15:33:06.87 PM +01", // (date)	Date/Time stamp of when the media was captured (specific format)
                        "meta_phase": "0",								// (string)	Shoto phase in which the clip was taken
                        "filesize": "7769.0",							// (string) Filesize in bytes
                        "local_filename": "635761135868813470.mp4",		// (string) Filename on capture device
                        "role": "5",									// (string)	Index of role that was selected when clip was captured
                        "media_type": "VIDEO",							// (VIDEO|PHOTO|AUDIO) Media type of recording
                        "shot": "0",									// (string) Index of shot selected
                        "coverage_class": 3,								// (opt.) Index of coverage class that applies
                        "shot_meta": "dave"								// (opt.) Content of specific coverage_class information applied to shot
                    },

                    //timed meta-data
                    "timed_meta": {										// (object) Time-stamped entries in the form <key>_<value>
                        "15:33:06.87": "key_value",
                        "15:35:06.87": "zoom_34"
                    }

            }

            $http.post(url, media)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.createMedia = resp;
                })
                .error(function(err){
                    ConLog.err(url, err);
                    $scope.createMedia = err;
                })
        }

        /**
         * Title: Get Thumb Upload
         * Description: Retrieve an S3 PUT url to upload the thumbnail to.
         * Endpoint: /api/media/signuploadthumb
         */
        function getThumbUpload() {
            var url = apiUrl + '/api/media/signuploadthumb' + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.getThumbUpload = resp;
                })
        }

        /**
         * Title: Get Upload Url
         * Description: Retrieve an S3 PUT url to upload the media to.
         * Endpoint: /api/media/signupload
         */
        function getUploadUrl() {
            var url = apiUrl + '/api/media/signupload' + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.getUploadUrl = resp;
                })
        }

        /**
         * Title: Notify on Thumb
         * Description: Notify the API that the thumbnail has uploaded
         * Endpoint: /api/media/uploadthumbcomplete/:id
         */
        function notifyThumb(id) {
            var url = apiUrl + '/api/media/uploadthumbcomplete/' + id + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.notifyThumb = resp;
                })
        }

        /**
         * Title: Notify on Upload
         * Description: Notify the API that the upload has completed (and that transcoding can begin)
         * Endpoint:/api/media/uploadcomplete/:id
         */
        function notifyUpload(id) {
            var url = apiUrl + '/api/media/uploadcomplete/' + id + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.notifyUpload = resp;
                })
        }

        /**
         * Title: Preview video for media
         * Description: Get preview video for media.
         * Endpoint: /api/media/preview/:id
         */
        function previewMedia(id) {
            var url = apiUrl + '/api/media/preview/' + id + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.previewMedia = resp;
                })
        }

        /**
         * Title: Remove Media
         * Description: Indicate media has been removed by the user
         * Endpoint: /api/media/remove/:id
         */
        function removeMedia(id) {
            var url = apiUrl + '/api/media/remove/' + id + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.removeMedia = resp;
                })
        }

        /**
         * Title: Thumbnail for media
         * Description: Get thumbnail for specific media
         * Endpoint: /api/media/thumbnail/:id
         */
        function thumbMedia(id) {
            var url = apiUrl + '/api/media/thumbnail/' + id + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.thumbMedia = resp;
                })
        }

        /**
         * Title: Transcoded video for media
         * Description: Get homogeonized and transcoded video for specific media
         * Endpoint: /api/media/homog/:id
         */
        function transcodedVideo(id) {
            var url = apiUrl + '/api/media/homog/' + id + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.transcodedVideo = resp;
                })
        }

        /**
         * Title: Update Meta-Data
         * Description: Update the meta-data of the give media
         * Endpoint: /api/media/update/:id
         */
        function updateMeta(id) {
            var url = apiUrl + '/api/media/update/' + id + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.updateMeta = resp;
                })
        }

        /*
         * Scope init function
         */
        $scope.init = function () {
           // createMedia();
        }


    }]);

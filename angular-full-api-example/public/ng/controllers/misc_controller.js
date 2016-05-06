'use strict';

/** ********************************************************************************************
 * Controller used to test the MISC API endpoints.
 * Visit https://dev.bootlegger.tv/api/docs/#api-Misc for all information on MISC API Endpoints.
 * You can use the following code as a starting point.
 * ********************************************************************************************/
bootleggerApp.controller('MiscController', ['$scope', '$http', 'Api', 'ConLog',
    function ($scope, $http, Api, ConLog) {

        var apiUrl = Api.apiUrl;
        var apiKey = Api.apiKey;

        /**
         * Function to get current bootlegger status
         * Endpoint: /api/status
         */
        function getApiStatus() {
            var url = apiUrl + '/api/status/' + apiKey;

            $http.get(url)
                .success(function (resp) {
                    ConLog.log(url, resp);
                    $scope.btlStatus = resp;
                })
                .error(function (err) {
                    ConLog.failed(err);
                    $scope.btlStatus = err;
                });
        };

        /**
         * Init scope functions called on page render
         */
        $scope.init = function () {
            getApiStatus();
        }


    }]);
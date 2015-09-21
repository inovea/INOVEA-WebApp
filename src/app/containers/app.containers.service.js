(function () {
    'use strict';

    angular
        .module('app')
        .factory('containersService', containersService);

    containersService.$inject = ['$log', '$http', '$rootScope'];

    function containersService($log, $http, $rootScope) {

        var serverUrl = $rootScope.serverUrl;
        console.log("my url", serverUrl);

        return {
            getContainers: getContainers
        };


        function getContainers(obj) {

            if(obj){
                return $http.get(serverUrl+'/containers', id).success(function(result){
                    return result;
                })
            } else{
                return $http.get(serverUrl+'/containers').success(function(result){
                    return result;
                })
            }
        }
    }
})();

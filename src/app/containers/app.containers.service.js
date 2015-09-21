(function () {
    'use strict';

    angular
        .module('app')
        .factory('containersService', containersService);

    containersService.$inject = ['$log', '$http', '$rootScope', 'URLSERVER'];

    function containersService($log, $http, $rootScope, URLSERVER) {

        return {
            getContainers: getContainers
        };


        function getContainers(obj) {

            if(obj){
                return $http.get(URLSERVER+'/containers', id).success(function(result){
                    return result;
                })
            } else{
                return $http.get(URLSERVER+'/containers').success(function(result){
                    return result;
                })
            }
        }
    }
})();

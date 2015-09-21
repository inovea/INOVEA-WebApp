(function () {
    'use strict';

    angular
        .module('app')
        .factory('mapService', mapService);

    mapService.$inject = ['$log', '$http', '$rootScope'];

    function mapService($log, $http, $rootScope) {


        var serverUrl = $rootScope.serverUrl;
       
        /******************************  Mock datas  ******************************/
        return {
            getContainers: getContainers
        };


        ////////////////


        function getContainers(obj) {

            /* if(obj){
             $http.get(serverUrl+'/containers', obj).success(function(result){
             return result;
             })
             }

             else{*/
             return $http.get(serverUrl+'/containers').success(function(result){
             return result;
             });
             //}
        }
    }
})();

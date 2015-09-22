(function () {
    'use strict';

    angular
        .module('app')
        .factory('containersService', containersService);

    containersService.$inject = ['$log', '$http', '$rootScope', 'URLSERVER'];

    function containersService($log, $http, $rootScope, URLSERVER) {

        return {
            getContainers: getContainers,
            deleteContainer: deleteContainer,
            updateContainer: updateContainer
        };


        function getContainers(id) {
            console.log("ContainerService getContainers ... obj : ");
            console.log(JSON.stringify(id));
            if(id){
                return $http.post(URLSERVER+'/containers', id).success(function(result){
                    console.log(JSON.stringify(result));
                    return result;
                })
            } else{
                return $http.get(URLSERVER+'/containers').success(function(result){
                    return result;
                })
            }
        }

        function updateContainer(obj) {
               return $http.post(URLSERVER+'/updateContainer', obj).success(function(result){
               if(result=='0'){
                return result;
               }else{
                    return 1;
               }
            })
         }
        function deleteContainer(obj) {
                return $http.post(URLSERVER+'/deleteContainer', obj).success(function(result){
                     if(result=='0'){
                        return result;
                     }else{
                         return 1;
                     }
                        })
                }
    }
})();

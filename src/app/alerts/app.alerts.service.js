(function () {
    'use strict';

    angular
    .module('app')
    .factory('alertsService', alertsService);

    alertsService.$inject = ['$log', '$http', '$rootScope',  'URLSERVER', 'containersService'];

    function alertsService($log, $http, $rootScope, URLSERVER, containersService) {

        return {
            getAlerts: getAlerts
        };


        function getAlerts(obj) {
            console.log("[SERVICE] getAlerts called");
            if (obj) {
                return $http.get(URLSERVER + '/alerts', id).success(function (result) {
                    return result;
                })
            } else {
                return $http.get(URLSERVER + '/alerts').success(function (result) {
                    /*for(var i in result){
                        console.log(JSON.stringify(result[i]));
                        containersService.getContainers(result[i].container_id).then(function(containerResult){
                         console.log('result ::', JSON.stringify(containerResult));
                         alert.containerLibelle = containerResult.libelle;
                     });
                    }*/
                    return result;
                })
            }
        }

    }
})();
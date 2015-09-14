(function () {
    'use strict';

    angular
        .module('app')
        .factory('mapService', mapService);

    mapService.$inject = ['$log', '$http', '$rootScope'];

    function mapService($log, $http, $rootScope) {


        var serverUrl = $rootScope.serverUrl;
        var containers = [{
            'idContainer': 1234,
            'name': 'container 1',
            'address': 'Palais Royal Paris',
            'lat': 48.858859,
            'lng': 2.347000,
            'state': 1,
            'lastCollect': '2015-06-30 10:30:00',
            'Errand_idErrand': 1
        }, {
            'idContainer': 1235,
            'name': 'container 2',
            'address': 'Grenelle Paris',
            'lat': 48.858859,
            'lng': 2.347000,
            'state': 1,
            'lastCollect': '2015-06-29 09:30:00',
            'Errand_idErrand': 1
        }, {
            'idContainer': 1236,
            'name': 'container 3',
            'address': 'Le marais Paris',
            'lat': 48.858859,
            'lng': 2.347000,
            'state': 0,
            'lastCollect': '2015-06-28 08:30:00',
            'Errand_idErrand': 1
        }, {
            'idContainer': 1237,
            'name': 'container 4',
            'address': 'Val-de-grace Paris',
            'lat': 48.858859,
            'lng': 2.347000,
            'state': 0,
            'lastCollect': '2015-06-27 07:30:00',
            'Errand_idErrand': 2
        }];
        /******************************  Mock datas  ******************************/
        return {
            getContainers: getContainers
        };


        ////////////////


        function getContainers(obj) {

            /*  if(obj){
             $http.get(serverUrl+'/containers', obj).success(function(result){
             return result;
             })
             }

             else{
             $http.get(serverUrl+'/containers').success(function(result){
             return result;
             })
             }*/
            return containers;
        }


    }
})();

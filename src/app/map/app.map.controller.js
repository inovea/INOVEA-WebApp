(function () {
    'use strict';

    angular
    .module('app')
    .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$log', '$scope', '$http'];

    /* @ngInject */
    function MapCtrl($log, $scope, $http, $location) {


        var map;
            
            /******************************  Mock datas  ******************************/

/*
 Containers' mock datas
 */

 $scope.containers = [{
 'idContainer': 1234,
 'name' : 'container 1',
 'address': 'Palais Royal Paris',
 'lat' : 48.858859,
 'lng' : 2.347000,
 'state': 1,
 'lastCollect' : '2015-06-30 10:30:00',
 'Errand_idErrand' : 1
 }, {
 'idContainer': 1235,
 'name' : 'container 2',
 'address': 'Grenelle Paris',
 'lat' : 48.858859,
 'lng' : 2.347000,
 'state': 1,
 'lastCollect' : '2015-06-29 09:30:00',
 'Errand_idErrand' : 1
 }, {
 'idContainer': 1236,
 'name' : 'container 3',
 'address': 'Le marais Paris',
 'lat' : 48.858859,
 'lng' : 2.347000,
 'state': 0,
 'lastCollect' : '2015-06-28 08:30:00',
 'Errand_idErrand' : 1
 }, {
 'idContainer': 1237,
 'name' : 'container 4',
 'address': 'Val-de-grace Paris',
 'lat' : 48.858859,
 'lng' : 2.347000,
 'state': 0,
 'lastCollect' : '2015-06-27 07:30:00',
 'Errand_idErrand' : 2
 }];


 /******************************  End of Mock datas  ******************************/


function initializeMap() {

    // console.log('initializeMap called');
    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(48.858859, 2.3470599),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);

    /*startSpinner();
    for (container in containers) {
        goPlaceMarker(container, containers[container]);   

    }*/

}
initializeMap();
            
    	 }
})();
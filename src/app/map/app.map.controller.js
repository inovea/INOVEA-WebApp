(function () {
    'use strict';

    angular
    .module('app')
    .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$log', '$scope', '$http', 'mapService'];

    /* @ngInject */
    function MapCtrl($log, $scope, $http, mapService) {


    var $draggable = $('#newErrandPopup').draggabilly();



        //Map object
        var map;
        //To translate String adresse in Google Format adress with position (ex : 61.1648, 4.58058)
        var geocoder = new google.maps.Geocoder();
        // Markers object   
        var markers ={};
           
        function initializeContainers(){
            $scope.containers = mapService.getContainers();
            $log.debug('[MapCtrl] $scope.containers : ' + JSON.stringify($scope.containers)); 
            for(var index in $scope.containers){
                goPlaceMarker(index, $scope.containers[index]);
            }
        }

        function initializeMap() {
            // console.log('initializeMap called');
            var mapOptions = {
                zoom: 10,
                center: new google.maps.LatLng(48.858859, 2.3470599),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);        
        }

        function goPlaceMarker(i, container) {
            setTimeout(function() {
                placeMarker(container);
                /*if(i == containers.length - 1){
                    stopSpinner();
                }*/

            }, i * 500);
        }

        var placeMarker = function (container) {

    // console.log('placeMarker called');


    var image = {
        url: '../img/empty_container_marker.png'
    };

    if (container.state == 1 ) {
        if (container.Errand_idErrand != 1)
            image.url = '../img/busy_full_container_marker.png'
        else
            image.url = '../img/full_container_marker.png'
    }

    else if(container.state == 2)
    {
     if (container.Errand_idErrand != 1)
        image.url = '../img/busy_alert_container_marker.png'
    else
        image.url = '../img/alert_container_marker.png'
}
else if(container.Errand_idErrand != 1)
    image.url = '../img/busy_empty_container_marker.png'


geocoder.geocode({'address': container.address}, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {

        var newMarker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            clickable: true,
            icon: image
        });
        newMarker.info = new google.maps.InfoWindow({
            content: ""
        });

        newMarker.info.content += "Conteneur n&deg;" + container.idContainer + "<br>" + results[0].formatted_address;

        if (container.Errand_idErrand != 1)
            newMarker.info.content += "</br><span style=\" color : blue\">Appartient a la course n&deg;"+container.Errand_idErrand+"</span>";
        else if (container.state == 1)
            newMarker.info.content += "</br><span style=\" color : red\">Plein</span>";
        else if (container.state == 0) 
            newMarker.info.content += "</br><span style=\" color : green\">Vide</span>";
        else if (container.state == 2) 
            newMarker.info.content += "</br><span style=\" color : orange\">Alerte</span>";



        if (container.Errand_idErrand != 1)
            newMarker.info.content += "</br> <button disabled>Indisponible</button><br><br><div style='color:grey; font-size:10px; font-style:italic'>Derniere collecte : " + container.lastCollect + "</div>"
        else if (container.isSelected == false)
            newMarker.info.content += "</br> <button id=\"container" + container.idContainer + "\" onclick=\"addToErrand(" + container.idContainer + ")\">Ajouter a la course</button><br><br><div style='color:grey; font-size:10px; font-style:italic'>Derniere collecte : " + container.lastCollect + "</div>"
        else
            newMarker.info.content += "</br> <button disabled>Ajout&eacute;</button><br><br><div style='color:grey; font-size:10px; font-style:italic'>Derniere collecte : " + container.lastCollect + "</div>"


        google.maps.event.addListener(newMarker, 'click', function () {
            newMarker.info.open(map, newMarker);
        });
        markers[container.idContainer]=(newMarker);

    } else {
        // console.log('Geocode was not successful for the following reason: ' + status);
    }

})
};

        
        initializeMap();
        initializeContainers();
            
    	 }
})();
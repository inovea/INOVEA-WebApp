(function () {
    'use strict';

    angular
    .module('app')
    .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$log', '$scope', '$http', 'mapService'];

    /* @ngInject */
    function MapCtrl($log, $scope, $http, mapService) {


        $("#mapLoader").addClass('active');

        /*
         Variables declaration
         */

         /* -- Map object -- */
         var map;
         /* -- Markers object  -- */
         var markers = {};
         /* -- To translate String adresse in Google Format adress with position (ex : 61.1648, 4.58058) -- */
         var geocoder = new google.maps.Geocoder();


        /*
         Function to get Containers and place them one by one
         */
         function initializeContainers() {
            mapService.getContainers().then(function(result){

                $scope.containers = result.data;

                $log.debug('[MapCtrl] $scope.containers : ' + JSON.stringify($scope.containers));
                for (var index in $scope.containers) {
                    goPlaceMarker(index, $scope.containers[index]);
                }
            });
        }


        /*
         Function to instantiate map Object
         */
         function initializeMap() {
            // console.log('initializeMap called');
            var mapOptions = {
                zoom: 10,
                center: new google.maps.LatLng(48.858859, 2.3470599),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

            initializeContainers();
        }


        /*
         Function to place markers one by one with a timeout (fix Google Map errors caused by multiple webservice calls)
         */
         function goPlaceMarker(i, container) {
            setTimeout(function () {
                placeMarker(container);
                if (i == $scope.containers.length - 1) {
                    $("#mapLoader").removeClass('active');
                }

            }, i * 500);
        }


        /*
         Function to place a marker on the map
         */
         var placeMarker = function (container) {

            var image = {
                url: 'img/empty_container_marker.png'
            };

            if (container.state == 1) {
                if (container.Errand_idErrand != 1)
                    image.url = 'img/busy_full_container_marker.png'
                else
                    image.url = 'img/full_container_marker.png'
            }

            else if (container.state == 2) {
                if (container.Errand_idErrand != 1)
                    image.url = 'img/busy_alert_container_marker.png'
                else
                    image.url = 'img/alert_container_marker.png'
            }
            else if (container.Errand_idErrand != 1)
                image.url = 'img/busy_empty_container_marker.png'


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
                        newMarker.info.content += "</br><span style=\" color : blue\">Appartient a la course n&deg;" + container.Errand_idErrand + "</span>";
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
                    markers[container.idContainer] = (newMarker);

                } else {
                    // console.log('Geocode was not successful for the following reason: ' + status);
                }

            })
};


        /*
         Make popup draggable
         */

         $('#newContainerPopup').draggabilly();
         $('#newErrandPopup').draggabilly();
         $('#actionButtons').draggabilly();


        /*
         Open & Close popup
         */
         $scope.openNewErrandPopup = function () {
            $('#newErrandDiv').show();
        }

        $scope.closeNewErrandPopup = function () {
            $('#newErrandDiv').hide();
        }

        $scope.openNewContainerPopup = function () {
            $('#newContainerDiv').show();
        }

        $scope.closeNewContainerPopup = function () {
            $('#newContainerDiv').hide();
        }


        /* -- From 'Select' element to dropdown -- */
        $('select.dropdown').dropdown();


        /*
            Launch initialization
            */ 
            initializeMap();
            

        }
    })();
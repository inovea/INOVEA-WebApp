(function () {
    'use strict';

    angular
    .module('app')
    .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$log', '$scope', '$http'];

    /* @ngInject */
    function MapCtrl($log, $scope, $http, $location) {
            

            $scope.openMenu = function(){
                $('.ui.sidebar')
                    .sidebar('toggle')
                ;
            }
    	 }
})();
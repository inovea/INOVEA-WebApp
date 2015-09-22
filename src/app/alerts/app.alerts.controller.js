(function () {
    'use strict';

    angular
    .module('app')
    .controller('AlertCtrl', AlertCtrl);

    AlertCtrl.$inject = ['$log', '$scope', '$http', '$rootScope', '$timeout', 'URLSERVER' ,'alertsService'];

    /* @ngInject */
    function AlertCtrl($log, $scope, $http, $rootScope, $timeout, URLSERVER, alertsService) {

    $scope.getAlerts = function(id){
        console.log("[CONTROLLER] getAlerts called");
        $("#alertLoader").addClass('active');
        alertsService.getAlerts().then(function(result){
            $scope.alerts = result;
            $("#alertLoader").removeClass('active');
        });
    }

    $scope.sortType='startDate';

    $scope.getAlerts();

    }
})();
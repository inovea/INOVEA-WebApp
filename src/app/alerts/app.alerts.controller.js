(function () {
    'use strict';

    angular
    .module('app')
    .controller('AlertCtrl', AlertCtrl);

    AlertCtrl.$inject = ['$log', '$scope', '$http', '$rootScope', '$timeout', 'URLSERVER' ,'alertsService'];

    /* @ngInject */
    function AlertCtrl($log, $scope, $http, $rootScope, $timeout, URLSERVER, alertsService) {

        $scope.sortType='startDate';
        $scope.selectedAlert;
        $scope.isEditableInfoView = false;     

        $scope.getAlerts = function(id){
            console.log("[CONTROLLER] getAlerts called");
            $("#alertLoader").addClass('active');
            alertsService.getAlerts().then(function(result){
                $scope.alerts = result;
                $("#alertLoader").removeClass('active');
            });
        }

        $scope.openAlertInfoView = function (selectedAlert) {
            $('#infoAlertModal')
            .modal('setting', 'closable', false)
            .modal('show')
            ;
            $scope.selectedAlert = selectedAlert;
        };
        
        $scope.closeAlertInfoView = function (selectedAlert) {
            $('#infoAlertModal')
            .modal('hide')
            ;
            $scope.isEditableInfoView = false;
        };

        $scope.editInputs = function () {
            $scope.isEditableInfoView = !$scope.isEditableInfoView;
        }


        $scope.getAlerts();

    }
})();
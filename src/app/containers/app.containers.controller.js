(function () {
    'use strict';

    angular
    .module('app')
    .controller('ContainerCtrl', ContainerCtrl);

    ContainerCtrl.$inject = ['$log', '$scope', '$http', '$rootScope', 'URLSERVER', 'containersService'];

    /* @ngInject */
    function ContainerCtrl($log, $scope, $http, $rootScope, URLSERVER, containersService){

       $scope.isEditableInfoView = false;
       $scope.editInputs = function (){
            $scope.isEditableInfoView = !$scope.isEditableInfoView;
       };

       $scope.closeContainerInfoView = function(){
           $('#infoContainerModal')
            .modal('hide'); 
       };

       $scope.openContainerInfoView = function (selectedContainer){
            $('#infoContainerModal')
            .modal('setting','closable',false)
            .modal('show')
            ;
            console.log(JSON.stringify(selectedContainer));
            $scope.selectedContainer = selectedContainer;

       };

       $scope.updateContainer = function(){
            $http.post(URLSERVER+'/updateContainer', $scope.selectedContainer).success(function(result){
                console.log($scope.selectedContainer._id);
                console.log(JSON.stringify($scope.selectedContainer));
                $scope.editInputs();
                $scope.closeContainerInfoView();
            })
       }

       $scope.deleteContainer = function(){
            $http.post(URLSERVER+'/deleteContainer', $scope.selectedContainer).success(function(result){
                $scope.getContainers();
                $scope.closeContainerInfoView;
            })
       }
       $scope.getContainers = function(id){

           containersService.getContainers().then(function(result){
               console.log('result ::', JSON.stringify(result));
               $scope.containers = result;
           });
               
        }

        $scope.idSelectedContainer = null;
        $scope.setSelected = function (idSelectedContainer) {
            console.log(JSON.stringify(idSelectedContainer));
            $scope.idSelectedContainer = idSelectedContainer;
        };

        /*var orderBy = $filter('orderBy');
        $scope.order = function(predicate, reverse) {
            $scope.users = orderBy($scope.users, predicate, reverse);
        };
        $scope.order('name',false);*/

        $scope.containers = $scope.getContainers();
        console.log(JSON.stringify($scope.containers));

    }
})();

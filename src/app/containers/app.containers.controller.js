(function () {
    'use strict';

    angular
    .module('app')
    .controller('ContainerCtrl', ContainerCtrl);

    ContainerCtrl.$inject = ['$log', '$scope', '$http', '$rootScope'];

    /* @ngInject */
    function ContainerCtrl($log, $scope, $http, $rootScope) {
       //var serverUrl = 'http://localhost:8080';
       var serverUrl = $rootScope.serverUrl = "https://pure-tor-1824.herokuapp.com";

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
            $http.post(serverUrl+'/updateContainer', $scope.selectedContainer).success(function(result){
                console.log($scope.selectedContainer._id);
                console.log(JSON.stringify($scope.selectedContainer));
                $scope.editInputs();
                $scope.closeContainerInfoView();
            })
       }

       $scope.deleteContainer = function(){
            $http.post(serverUrl+'/deleteContainer', $scope.selectedContainer).success(function(result){
                $scope.getContainers();
                $scope.closeContainerInfoView;
            })
       }
       $scope.getContainers = function(id){

            if(id){
                $http.get(serverUrl+'/containers', id).success(function(result){
                        return result;
                    })
                } else{
                    $http.get(serverUrl+'/containers').success(function(result){
                    $scope.containers = result;
                })
            }
               
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

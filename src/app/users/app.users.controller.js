(function () {
    'use strict';

    angular
    .module('app')
    .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$log', '$scope', '$http', '$rootScope'];

    /* @ngInject */
    function UserCtrl($log, $scope, $http, $rootScope) {
       //var serverUrl = 'http://localhost:8080';
       var serverUrl = $rootScope.serverUrl = "https://pure-tor-1824.herokuapp.com";

       $scope.selectedUser;
       $scope.isEditableInfoView = false; 

       $scope.editInputs = function () {
        $scope.isEditableInfoView = !$scope.isEditableInfoView;
    };

    $scope.openUserInfoView = function (selectedUser) {
        $('.ui.modal')
        .modal('setting', 'closable', false)
        .modal('show')
        ;
        console.log(JSON.stringify(selectedUser));
        $scope.selectedUser = selectedUser;
    };


    $scope.getUsers = function(id){
        if(id){
            $http.get(serverUrl+'/users', id).success(function(result){
                return result;
            })
        } else{
            $http.get(serverUrl+'/users').success(function(result){
                $scope.users = result;
            })
        }

    }

    $scope.updateUser = function (){
        var data = {
                    id : $scope.selectedUser.id,
                    name : $scope.selectedUser.name,
                    firstname : $scope.selectedUser.firstname,
                    phone : $scope.selectedUser.phone
        }

        $http.post(serverUrl+'/updateUser', $scope.selectedUser).success(function(data, status) {
            console.log(JSON.stringify($scope.selectedUser));
            $scope.editInputs();
        })
    }


    $scope.users = $scope.getUsers();
        // console.log(JSON.stringify($scope.users));

    }
})();

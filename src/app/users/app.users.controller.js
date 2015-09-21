(function () {
    'use strict';

    angular
    .module('app')
    .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$log', '$scope', '$http', '$rootScope', 'usersService'];

    /* @ngInject */
    function UserCtrl($log, $scope, $http, $rootScope, usersService) {
       //var serverUrl = 'http://localhost:8080';
       var serverUrl = $rootScope.serverUrl = "https://pure-tor-1824.herokuapp.com";

       $scope.selectedUser;
       $scope.isEditableInfoView = false; 

       $scope.editInputs = function () {
        $scope.isEditableInfoView = !$scope.isEditableInfoView;
        }

    $scope.openUserInfoView = function (selectedUser) {
        $('#infoUserModal')
        .modal('setting', 'closable', false)
        .modal('show')
        ;
        console.log(JSON.stringify(selectedUser));
        $scope.selectedUser = selectedUser;
    };
    $scope.closeUserInfoView = function (selectedUser) {
        $('#infoUserModal')
        .modal('hide')
        ;
    };


    $scope.openUserAddView = function () {
        $('#addUserModal')
        .modal('setting', 'closable', false)
        .modal('show')
        ;
    };

    $scope.closeUserAddView = function(){
        $('#addUserModal')
        .modal('hide')
        ;
    }


    $scope.getUsers = function(id){
      usersService.getUsers().then(function(result){
            console.log('result', JSON.stringify(result));
            $scope.users = result;
      });

    }

    $scope.addUser = function(){

        console.log('before add : ', $scope.newUser);
        $http.post(serverUrl+'/users', $scope.newUser).success(function(data, status) {
            $scope.getUsers();
            $scope.closeUserAddView();
             console.log("after add :", $scope.newUser);
        })
        
       

    }

     $scope.deleteUser = function(){
                $http.post(serverUrl+"/deleteUser", $scope.selectedUser).success(function(result){
                    $scope.getUsers();
                    $scope.closeUserInfoView();
                })
            }

    $scope.updateUser = function (){

        $http.post(serverUrl+'/updateUser', $scope.selectedUser).success(function(data, status) {
            console.log($scope.selectedUser._id);
            console.log(JSON.stringify($scope.selectedUser));
            $scope.editInputs();
        })
    }

    // $scope.addUser = function (){
    //     $scope.editInputs();
    // }


    $scope.getUsers();
        // console.log(JSON.stringify($scope.users));

    }
})();

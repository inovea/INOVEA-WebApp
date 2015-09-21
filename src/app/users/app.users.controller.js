(function () {
    'use strict';

    angular
    .module('app')
    .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$log', '$scope', '$http', '$rootScope', '$timeout', 'URLSERVER' ,'usersService'];

    /* @ngInject */
    function UserCtrl($log, $scope, $http, $rootScope, $timeout, URLSERVER, usersService) {

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
            console.log('Controller GetUsers : ', JSON.stringify(result));
            $scope.users = result;
        });

    }


    $scope.addUser = function (){

        console.log('[addUser called] : ',$scope.newUser);
        usersService.addUser($scope.newUser).then(function(result){
            console.log('Controller AddUsers : ', JSON.stringify(result));
            if(result == 1){
                 console.log("Un problème est survenu, le traitement n'a pas été executé");
                // alert("Un problème est survenu, le traitement n'a pas été executé");       
            } else {
                
             //   $scope.getUsers(); 
                $timeout(function() {
                    $scope.getUsers();
                    $scope.closeUserAddView();
                    $scope.newUser = null;
                    console.log("USER AJOUTER !!!!");
                }, 200);


            }
        });
    }


    $scope.deleteUser = function(){
        usersService.deleteUser($scope.selectedUser).then(function(result){
            if(result){
                $scope.getUsers();
                $scope.closeUserInfoView();
            } else {
                alert("Un problème est survenu, le traitement n'a pas été executé");
            }
        })        
    }

    $scope.updateUser = function (){

        $http.post(URLSERVER+'/updateUser', $scope.selectedUser).success(function(data, status) {
            console.log($scope.selectedUser._id);
            console.log(JSON.stringify($scope.selectedUser));
            $scope.editInputs();
        })
    }


    $scope.getUsers();
        // console.log(JSON.stringify($scope.users));

    }
})();

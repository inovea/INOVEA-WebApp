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
        $scope.selectedUser = selectedUser;
    };
    $scope.closeUserInfoView = function (selectedUser) {

        $('#infoUserModal')
        .modal('hide')
        ;
        $scope.isEditableInfoView = false;
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
        $scope.newUser = {};
    }

    $scope.getUsers = function(id){
        $("#userLoader").addClass('active');
        usersService.getUsers().then(function(result){
            $scope.users = result;
            $("#userLoader").removeClass('active');
        });
    }

    $scope.addUser = function (){
        $scope.closeUserAddView();
        $("#userLoader").addClass('active');

        usersService.addUser($scope.newUser).then(function(result){
            if(result == 1){
                $scope.openUserAddView();
                 alert("Un problème est survenu : le compte n'a pas été créé.");
            } else {
                $timeout(function() {
                    $scope.getUsers();
                    $scope.closeUserAddView();
                    $scope.newUser = null;
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

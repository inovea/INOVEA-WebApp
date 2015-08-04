(function () {
    'use strict';

    angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$log', '$scope', '$http'];

    /* @ngInject */
    function MainCtrl($log, $scope, $http) {
        var serverUrl = 'http://localhost:8080';
      // var serverUrl = "https://pure-tor-1824.herokuapp.com";



        $scope.users = "Aucun utilisateur";
        $scope.newName ="";
        $scope.newFirstname="";
        $scope.idSelectedUser="";

        function activate() {
            $log.debug('MainCtrl activated');
        $scope.getUsers();
            
        }

            $scope.deleteUser = function(userId){
                var data = {
                    id : userId
                };
                $http.post(serverUrl+"/deleteUser", data).success(function(result){
                    $scope.getUsers();
                })
            }
            $scope.getUsers = function(obj){

                if(obj){
                    $http.get(serverUrl+'/users', obj).success(function(result){
                        return result;
                    })
                }

                else{
                     $http.get(serverUrl+'/users').success(function(result){
                    $scope.users = result;
                })
                }
               
            }

            $scope.addUser = function(){
               var data ={
                        name: $scope.newName,
                        firstname : $scope.newFirstname
                    };
                
                $http.post(serverUrl+'/users', data).success(function(data, status) {
                    $scope.newFirstname = "";
                    $scope.newName="";
                    $scope.getUsers();
                })
            }

            $scope.updateUser = function (){

                var data = {
                    id : $scope.idSelectedUser,
                    name : $scope.newName,
                    firstname : $scope.newFirstname
                }

                $http.post(serverUrl+'/updateUser', data).success(function(data, status) {
                    $scope.newFirstname = "";
                    $scope.newName="";
                    $scope.idSelectedUser="";

                    $scope.getUsers();
                })
            }



            $scope.setUpdateUser = function (userId, userName, userFirstname){
                    $scope.idSelectedUser = userId;
                    $scope.newName = userName;
                    $scope.newFirstname = userFirstname; 
            }


            activate();
    }
})();

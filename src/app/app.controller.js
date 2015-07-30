(function () {
    'use strict';

    angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$log', '$scope', '$http'];

    /* @ngInject */
    function MainCtrl($log, $scope, $http) {
        var serverUrl = 'http://localhost:8080/users';
        //var serverUrl = "https://pure-tor-1824.herokuapp.com/users"



        $scope.users = "Aucun utilisateur";
        $scope.newName ="";
        $scope.newFirstname="";

        function activate() {
            $log.debug('MainCtrl activated');
           /* $http.get('https://pure-tor-1824.herokuapp.com/getUser').success(function(result){
              $scope.user = result;
            })
*/
        $scope.getUsers();
            
        }

            $scope.deleteUser = function(userId){
                var data = {
                    'id' : userId
                }
                $http.delete(serverUrl, data);
            }
            $scope.getUsers = function(){
                $http.get(serverUrl).success(function(result){
                    $scope.users = result;
                })
            }

            $scope.addUser = function(){
               var data ={
                        name: $scope.newName,
                        firstname : $scope.newFirstname
                    };
                
                $http.post(serverUrl, data).success(function(data, status) {
                    $scope.newFirstname = "";
                    $scope.newName="";
                    $scope.getUsers();
                })
            }


            activate();
    }
})();

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

        $scope.idSelectedUser = null;
        $scope.setSelected = function (idSelectedUser) {
            console.log(JSON.stringify(idSelectedUser));
            $scope.idSelectedUser = idSelectedUser;
        };

        /*var orderBy = $filter('orderBy');
        $scope.order = function(predicate, reverse) {
            $scope.users = orderBy($scope.users, predicate, reverse);
        };
        $scope.order('name',false);*/

        $scope.users = $scope.getUsers();
        console.log(JSON.stringify($scope.users));

    }
})();

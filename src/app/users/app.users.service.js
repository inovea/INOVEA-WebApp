(function () {
    'use strict';

    angular
    .module('app')
    .factory('usersService', usersService);

    usersService.$inject = ['$log', '$http', '$rootScope',  'URLSERVER'];

    function usersService($log, $http, $rootScope, URLSERVER) {

        return {
            getUsers: getUsers,
            addUser: addUser,
            deleteUser: deleteUser
        };


        function getUsers(obj) {

            if (obj) {
                return $http.get(URLSERVER + '/users', id).success(function (result) {
                    return result;
                })
            } else {
                return $http.get(URLSERVER + '/users').success(function (result) {
                    return result;
                })
            }
        }

        function addUser(user){


            console.log('[addUser SERVICE called] : ',user);

            return $http.post(URLSERVER+'/users', user).success(function(result) {
                console.log('service result :', result);
                if(result == '0'){
                    return result;
                } else{
                    return 1;
                }
            })
        }

        function deleteUser(selectedUser){

            return $http.post(URLSERVER+"/deleteUser", selectedUser).success(function(result){
                return result;
            })
        }

        // $scope.updateUser = function (){
        //     $http.post(URLSERVER+'/updateUser', $scope.selectedUser).success(function(data, status) {
        //         console.log($scope.selectedUser._id);
        //         console.log(JSON.stringify($scope.selectedUser));
        //         $scope.editInputs();
        //     })
        // }




    }
})();

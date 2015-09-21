(function () {
    'use strict';

    angular
        .module('app')
        .factory('usersService', usersService);

    usersService.$inject = ['$log', '$http', '$rootScope', 'URLSERVER'];

    function usersService($log, $http, $rootScope, URLSERVER) {

        return {
            getUsers: getUsers
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
    }
})();

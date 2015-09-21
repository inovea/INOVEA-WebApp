(function () {
    'use strict';

    angular
        .module('app')
        .factory('usersService', usersService);

    usersService.$inject = ['$log', '$http', '$rootScope'];

    function usersService($log, $http, $rootScope) {


        var serverUrl = $rootScope.serverUrl;
        console.log("my url", serverUrl);

        return {
            getUsers: getUsers
        };


        function getUsers(obj) {

            if (obj) {
                return $http.get(serverUrl + '/users', id).success(function (result) {
                    return result;
                })
            } else {
                return $http.get(serverUrl + '/users').success(function (result) {
                    return result;
                })
            }
        }
    }
})();

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
    }
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$log', '$scope'];

    /* @ngInject */
    function MainCtrl($log, $scope) {

        activate();

        ////////////////

        function activate() {
            $log.debug('MainCtrl activated');
        }
    }
})();

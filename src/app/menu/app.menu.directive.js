(function () {
    'use strict';

    angular
    .module('app')
    .directive('inoveaMenu', InoveaMenu);


    /* @ngInject */
    function InoveaMenu() {
            
            return {
                templateUrl: 'app/menu/app.menu.view.html'
            };
    	 }
})();


(function () {
    'use strict';

    angular
    .module('app')
    .directive('inoveaMenu', InoveaMenu);

    InoveaMenu.$inject = ['$location'];

    /* @ngInject */
    function InoveaMenu($location) {
            
            return {
                templateUrl: 'app/menu/app.menu.view.html',
                scope : {},
                link : function(scope, element, attrs){

                    scope.openMenu = function(){
                        $('.ui.sidebar').sidebar('toggle')
                    };

                    scope.goToView = function(path){
                        $location.path(path);
                    };

                    scope.title = attrs.title;
                }
            };
    	 }
})();


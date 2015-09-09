(function () {
    'use strict';

    angular
    .module('app')
    .directive('inoveaMenu', InoveaMenu);


    /* @ngInject */
    function InoveaMenu() {
            
            return {
                templateUrl: 'app/menu/app.menu.view.html',
                scope : {},
                link : function(scope, element, attrs){

                    scope.openMenu = function(){
                        $('.ui.sidebar').sidebar('toggle')
                    };

                    scope.title = attrs.title;
                }
            };
    	 }
})();


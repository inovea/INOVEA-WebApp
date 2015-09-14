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
             scope.title = attrs.title;

             scope.openMenu = function(){
                $('.ui.sidebar').sidebar('toggle')
            };

        }
    };
}
})();


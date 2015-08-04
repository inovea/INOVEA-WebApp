(function () {
    'use strict';

    angular
        .module('app', [
        	'ngRoute'
        ])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/connexion', {
                    templateUrl: 'app/connexion/app.connexion.view.html',
                    controller : 'ConnexionCtrl'
                })
                .when('/usersView', {
                    templateUrl: 'app/users/app.users.view.html',
                    controller : 'MainCtrl'
                })

                .otherwise({
                    redirectTo: '/connexion'
                });
        }
        ]);
})();

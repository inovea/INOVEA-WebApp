(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute'
        ])
        .constant("URLSERVER", "https://pure-tor-1824.herokuapp.com")
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/connexion', {
                    templateUrl: 'app/connexion/app.connexion.view.html',
                    controller : 'ConnexionCtrl'
                })
                .when('/map', {
                    templateUrl: 'app/map/app.map.view.html',
                    controller : 'MapCtrl'
                })
                .when('/usersView', {
                    templateUrl: 'app/users/app.users.view.html',
                    controller : 'UserCtrl'
                })
                .when('/containersView', {
                    templateUrl: 'app/containers/app.containers.view.html',
                    controller : 'ContainerCtrl'
                })

                .otherwise({
                    redirectTo: '/connexion'
                });
        }
        ]);
})();

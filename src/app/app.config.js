(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($logProvider) {
            $logProvider.debugEnabled(false);
        });
})();

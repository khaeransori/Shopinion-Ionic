(function() {
    'use strict';

    var core = angular.module('app.core');

    var config = {
        appErrorPrefix: '[Shopinion Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Shopinion',
        baseUrl: 'http://localhost:8000/',
        version: '0.0.1'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$logProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', 'routehelperConfigProvider', 'exceptionHandlerProvider', 'resourcehelperConfigProvider'];
    function configure ($logProvider, $locationProvider, $stateProvider, $urlRouterProvider, routehelperConfigProvider, exceptionHandlerProvider, resourcehelperConfigProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // turn html 5 mode off/on (if turned on it's remove # from the url)
        if ($locationProvider.html5Mode) {
            $locationProvider.html5Mode(false);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$stateProvider = $stateProvider;
        routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
        routehelperConfigProvider.config.docTitle = 'Shopinion';
        var resolveAlways = {
            
            ready: ['api', function (api) {
               return api.ready();
            }]
        };
        routehelperConfigProvider.config.resolveAlways = resolveAlways;

        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);

        // Configure the common resource settings
        resourcehelperConfigProvider.configure(config.baseUrl);
    }
})();

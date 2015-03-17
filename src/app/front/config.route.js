(function() {
    'use strict';

    angular
        .module('app.front')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                state: 'app',
                config: {
                    url: "/app",
                    abstract: true,
                    templateUrl: 'app/_global/menu.tpl.html',
                }
            },
            {
                state: 'app.front',
                config: {
                    url: '/front',
                    views: {
                        'content': {
                            templateUrl: 'app/front/playlists.tpl.html',
                        }
                    },
                    title: 'Dashboard'
                }
            }
        ];
    }
})();

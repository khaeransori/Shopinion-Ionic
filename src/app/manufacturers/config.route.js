(function() {
    'use strict';

    angular
        .module('app.manufacturers')
        .run(appRun);

    /* @ngInject */
    function appRun(api, routehelper) {
        api.add(getResources());
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                state: 'app.manufacturers',
                config: {
                    url: '/manufacturers',
                    abstract: true,
                    views: {
                        'content': {
                            template: '<ion-nav-view></ion-nav-view>'
                        }
                    }
                }
            },
            {
                state: 'app.manufacturers.list',
                config: {
                    url: '/list',
                    templateUrl: 'app/manufacturers/_partials/list.tpl.html',
                    controller: 'ManufacturersController as vm'
                }
            },
            {
                state: 'app.manufacturers.detail',
                config: {
                    url: '/:id',
                    templateUrl: 'app/products/_partials/list.tpl.html',
                    controller: 'ManufacturerProductsController as vm'
                }
            }
        ];
    }

    function getResources() {
        return [
            {
                resource: 'manufacturers',
                url: 'mobile/manufacturers',
                unnatural: false
            }
        ];
    }
})();

(function() {
    'use strict';

    angular
        .module('app.categories')
        .run(appRun);

    /* @ngInject */
    function appRun(api, routehelper) {
        api.add(getResources());
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                state: 'app.categories',
                config: {
                    url: '/categories',
                    abstract: true,
                    views: {
                        'content': {
                            template: '<ion-nav-view></ion-nav-view>'
                        }
                    }
                }
            },
            {
                state: 'app.categories.list',
                config: {
                    url: '/:id',
                    templateUrl: 'app/products/_partials/list.tpl.html',
                    controller: 'CategoryProductsController as vm'
                }
            }
        ];
    }

    function getResources() {
        return [
            {
                resource: 'categories',
                url: 'api/mobile/categories',
                unnatural: false
            }
        ];
    }
})();

(function() {
    'use strict';

    angular
        .module('app.products')
        .run(appRun);

    /* @ngInject */
    function appRun(api, routehelper) {
        api.add(getResources());
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                state: 'app.products',
                config: {
                    url: '/products',
                    abstract: true,
                    views: {
                        'content': {
                            template: '<ion-nav-view></ion-nav-view>'
                        }
                    }
                }
            },
            {
                state: 'app.products.new',
                config: {
                    url: '/new',
                    templateUrl: 'app/products/_partials/list.tpl.html',
                    controller: 'NewProductsController as vm'
                }
            },
            {
                state: 'app.products.sale',
                config: {
                    url: '/sale',
                    templateUrl: 'app/products/_partials/list.tpl.html',
                    controller: 'SaleProductsController as vm'
                }
            },
            {
                state: 'app.products.detail',
                config: {
                    url: '/:id',
                    templateUrl: 'app/products/_partials/detail.tpl.html',
                    controller: 'DetailProductController as vm'
                }
            },
            {
                state: 'app.products.spec',
                config: {
                    url: '/:id/spec',
                    templateUrl: 'app/products/_partials/spec.tpl.html',
                    controller: 'DetailProductController as vm'
                }
            }
        ];
    }

    function getResources() {
        return [
            {
                resource: 'products',
                url: 'api/mobile/products',
                unnatural: false
            }
        ];
    }
})();

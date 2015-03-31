(function() {
    'use strict';

    angular
        .module('app.account')
        .run(appRun);

    /* @ngInject */
    function appRun(api, routehelper) {
        api.add(getResources());
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                state: 'app.account',
                config: {
                    url: '/account',
                    abstract: true,
                    views: {
                        'content': {
                            template: '<ion-nav-view></ion-nav-view>'
                        }
                    }
                }
            },
            {
                state: 'app.account.login',
                config: {
                    url: '/login',
                    templateUrl: 'app/account/_partials/login.tpl.html',
                    controller: 'AccountController as vm'
                }
            },
            {
                state: 'app.account.register',
                config: {
                    url: '/register',
                    templateUrl: 'app/account/_partials/register.tpl.html',
                    controller: 'AccountController as vm'
                }
            },
            {
                state: 'app.account.forgot',
                config: {
                    url: '/forgot',
                    templateUrl: 'app/account/_partials/forgot.tpl.html',
                    controller: 'AccountController as vm'
                }
            },
            {
                state: 'app.account.menu',
                config: {
                    authenticated: true,
                    url: '/menu',
                    templateUrl: 'app/account/_partials/account.tpl.html',
                    controller: 'AccountController as vm'
                }
            }
        ];
    }

    function getResources() {
        return [
            {
                resource: 'login',
                url: 'api/mobile/accounts/login'
            },
            {
                resource: 'forgotPassword',
                url: 'api/mobile/accounts/forgot_password'
            },
            {
                resource: 'register',
                url: 'api/mobile/accounts/register'
            }
        ];
    }
})();

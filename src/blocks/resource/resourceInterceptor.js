(function () {
	'use strict';

	angular
		.module('blocks.resource')
        .config(config)
		.factory('resourceInterceptor', resourceInterceptor)
		.run(appRun);

	/* @ngInject */
	function appRun ($rootScope, $ionicLoading) {
		$rootScope.$on('loading:show', function() {
			$ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
		});

		$rootScope.$on('loading:hide', function() {
			$ionicLoading.hide();
		});
	}

	/* @ngInject */
	function config ($httpProvider) {
        $httpProvider.interceptors.push('resourceInterceptor');
	}

	/* @ngInject */
	function resourceInterceptor ($localStorage, $rootScope, $q) {
        var numLoadings = 0;
        var service = {
            request: request,
            response: response,
            responseError: responseError
        };

        return service;

        /////////
        function request (config) {
            numLoadings++;

            if ($localStorage.token !== undefined) {
                config.headers['Authorization'] = "Bearer " + $localStorage.token;
            }
            // Show loader
            $rootScope.$broadcast('loading:show');
            return config || $q.when(config);
        }

        function response (responses) {
            if ((--numLoadings) === 0) {
                // Hide loader
                $rootScope.$broadcast('loading:hide');
            }

            return responses || $q.when(responses);
        }

        function responseError (responses) {
            if (!(--numLoadings)) {
                // Hide loader
                $rootScope.$broadcast('loading:hide');

                if (responses.status === 401) {
                    $rootScope.$broadcast('unauthorized');
                }
            }

            return $q.reject(responses);
        }
    }
})();
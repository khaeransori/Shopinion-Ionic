(function () {
	'use strict';

	angular
		.module('blocks.resource')
		.factory('api', api)
		.provider('data', data);


	/* @ngInject */
	function api ($resource, $q, exception, logger, resourcehelper) {
		var baseUrl = resourcehelper.getConfiguration();
		var isPrimed = false;
        var primePromise;

		var apiConfig = {
			defaultConfig: {
				id: '@id'
			},
			extraMethods: {
				'update': {
					method: 'PUT'
				},
				'query' : {
					isArray: false
				}
			},
			add: add,
			ready: ready
		};

		return apiConfig;

		////////////
		function add (config) {
			var params, url;

			// if the add() function is called with a
			// String, create the default configuration.
			if (angular.isString(config)) {
				var configObj = {
					resource: config,
					url: '/' + config
				};

				config = configObj;

				// if we supply a method configuration, use that instead of the default extra.
				var methods = config.methods || apiConfig.extraMethods;

				apiConfig[config.resource] = $resource(url, params, methods);
			}

            config.forEach(function (config) {
				// If the url follows the expected pattern, we can set cool defaults
				if (!config.unnatural) {
					var orig = angular.copy(apiConfig.defaultConfig);
					params = angular.extend(orig, config.params);
					url = baseUrl + config.url + '/:id';

				// Otherwise we have to declare the entire configuration.
				} else {
					params = config.params;
					url = config.url;
				}

				// if we supply a method configuration, use that instead of the default extra.
				var methods = config.methods || apiConfig.extraMethods;

				apiConfig[config.resource] = $resource(url, params, methods);
            });
		}

		function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }

		function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }
	}

	function data () {
		/* jshint validthis:true */
		this.list = function (resource, query) {
			return [
				'data',
				function (data) {
					return data.list(resource,query);
				}
			];
		};

		this.get = function (resource, query) {
			return [
				'data',
				function (data) {
					return data.get(resource, query);
				}
			];
		};

		this.$get = ['api', function (api) {
			var data = {
				create: create,
				get: get,
				list: list,
				post: post,
				remove: remove,
				update: update
			};

			return data;

			////////////
			function create (resource, model) {
				return api[resource].save(model).$promise;
			}

			function get (resource, query) {
				return api[resource].get(query).$promise;
			}

			function list (resource, query) {
				return api[resource].query(query).$promise;
			}

			function post (resource, model) {
				return api[resource].save(model).$promise;
			}
			
			function remove (resource, model) {
				return api[resource].remove(model).$promise;
			}

			function update (resource, model) {
				return api[resource].update(model).$promise;
			}
		}];
	}
})();
(function() {
    'use strict';

    angular
        .module('blocks.resource')
        .provider('resourcehelperConfig', resourcehelperConfig)
        .factory('resourcehelper', resourcehelper);


    // Must configure via the resourcehelperConfig
    function resourcehelperConfig() {
        /* jshint validthis:true */
        this.config = {};

        this.configure = function (config) {
            this.config = config;
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    resourcehelper.$inject = ['$rootScope', 'resourcehelperConfig'];
    function resourcehelper($rootScope, resourcehelperConfig) {

        var service = {
			// resourceConfigure: resourceConfigure,
            getConfiguration: getConfiguration
        };

        // resourceConfigure();
        return service;
        ///////////////

   //      function resourceConfigure () {
			// $rootScope.APIbaseUrl = getConfiguration();
   //      }

        function getConfiguration() {
			return resourcehelperConfig.config;
        }
    }
})();

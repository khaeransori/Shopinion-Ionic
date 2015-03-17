(function () {
    'use strict';

    angular
        .module('app.manufacturers')
        .controller('ManufacturersController', ManufacturersController);

    /* @ngInject */
    function ManufacturersController (api, data, logger) {
        /* jshint validthis:true */
        var vm = this;
        vm.manufacturers = [];

        activate();

        ///////////
        function activate () {
            var promises = [getManufacturers()];
            return api.ready(promises).then(function (){
                logger.info('Activated Products View');
            });
        }

        function getManufacturers () {
            return data.list('manufacturers', {})
                  .then(function (response) {
                    vm.manufacturers = response.data;
                    return vm.manufacturers;
                })
                  .catch(function (e) {
                    logger.error(e);
                });
        }
    }
})();
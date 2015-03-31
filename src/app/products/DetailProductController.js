(function () {
    'use strict';

    angular
        .module('app.products')
        .controller('DetailProductController', DetailProductController);

    /* @ngInject */
    function DetailProductController ($stateParams, api, data, logger) {
        /* jshint validthis:true */
        var vm = this;
        vm.product = {};
        vm.title = undefined;

        activate();

        ///////////
        function activate () {
            var promises = [getProduct()];
            return api.ready(promises).then(function (){
                vm.title = vm.product.name;

                if (vm.product.manufacturer_id !== null) {
                    vm.title = vm.product.manufacturer.name;
                };
                logger.info('Activated Products View');
            });
        }

        function getProduct () {
            return data.get('products', {id: $stateParams.id})
                  .then(function (response) {
                    vm.product = response.data;
                    return vm.product;
                })
                  .catch(function (e) {
                    logger.error(e);
                });
        }
    }
})();
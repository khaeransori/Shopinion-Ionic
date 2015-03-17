(function () {
    'use strict';

    angular
        .module('app.manufacturers')
        .controller('ManufacturerProductsController', ManufacturerProductsController);

    /* @ngInject */
    function ManufacturerProductsController ($scope, $stateParams, api, data, logger) {
        /* jshint validthis:true */
        var vm = this;

        vm.current_page         = 0;
        vm.last_page            = undefined;
        vm.loadMoreProducts     = loadMoreProducts;
        vm.manufacturer         = {};
        vm.noMoreItemsAvailable = false;
        vm.products             = [];

        activate();

        ///////////
        function activate () {
            var promises = [getManufacturer()];
            return api.ready(promises).then(function (){
                logger.info('Activated Products View');
            });
        }

        function getManufacturer () {
            return data.get('manufacturers', {id: $stateParams.id})
                  .then(function (response) {
                    vm.manufacturer = response.data;
                    return vm.manufacturer;
                })
                  .catch(function (e) {
                    logger.error(e);
                });
        }

        function loadMoreProducts () {
            if (vm.current_page == vm.last_page || vm.products.length == 30) {
                vm.noMoreItemsAvailable = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return vm.noMoreItemsAvailable;
            }

            var query = {
                page: vm.current_page+1,
                manufacturer: $stateParams.id
            };

            return data.list('products', query)
                  .then(function (response) {
                    vm.last_page = response.data.last_page;
                    vm.current_page = response.data.current_page;
                    vm.products.push.apply(vm.products, response.data.data);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
                  .catch(function (e) {
                    logger.error(e);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        }
    }
})();
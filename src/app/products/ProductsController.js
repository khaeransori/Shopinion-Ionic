(function () {
    'use strict';

    angular
        .module('app.products')
        .controller('ProductsController', ProductsController);

    /* @ngInject */
    function ProductsController ($scope, api, data, logger) {
        /* jshint validthis:true */
        var vm = this;

        vm.current_page         = 0;
        vm.noMoreItemsAvailable = false;
        vm.last_page            = undefined;
        vm.loadMoreProducts     = loadMoreProducts;
        vm.products             = [];

        activate();

        ///////////
        function activate () {
            var promises = [];
            return api.ready(promises).then(function (){
                logger.info('Activated Products View');
            });
        }

        function loadMoreProducts () {
            if (vm.current_page == vm.last_page) {
                vm.noMoreItemsAvailable = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return vm.noMoreItemsAvailable;
            }

            var query = {
                page: vm.current_page+1
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
(function () {
    'use strict';

    angular
        .module('app.categories')
        .controller('CategoryProductsController', CategoryProductsController);

    /* @ngInject */
    function CategoryProductsController ($ionicNavBarDelegate, $rootScope, $scope, $stateParams, api, data, logger) {
        /* jshint validthis:true */
        var vm = this;

        vm.current_page         = 0;
        vm.last_page            = undefined;
        vm.loadMoreProducts     = loadMoreProducts;
        vm.noMoreItemsAvailable = false;
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
            if (vm.current_page == vm.last_page || vm.products.length == 30) {
                vm.noMoreItemsAvailable = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return vm.noMoreItemsAvailable;
            }

            var query = {
                page: vm.current_page+1,
                category: $stateParams.id
            };

            return data.list('products', query)
                  .then(function (response) {
                    $ionicNavBarDelegate.title($rootScope._selectedCategory.name);

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
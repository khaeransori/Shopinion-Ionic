(function () {
    'use strict';

    angular
        .module('app')
        .controller('SidemenuController', SidemenuController);

    /* @ngInject */
    function SidemenuController ($ionicHistory, $ionicSideMenuDelegate, $rootScope, $state, api, data, logger) {
        /* jshint validthis:true */
        var vm = this;
        vm.backSelectedCategory = backSelectedCategory;
        vm.selectCategory       = selectCategory;

        $rootScope._selectedCategory = {};
        $rootScope._selectedCategory.children = [];

        activate();

        ///////////
        function activate () {
            var promises = [];

            if ($rootScope._rootCategories === undefined) {
                promises = [getCategories()];
            }

            return api.ready(promises).then(function (){
                logger.info('Activated Products View');
            });
        }

        function backSelectedCategory () {
            if ($rootScope._selectedCategory.depth == 1) {
                $rootScope._selectedCategory = {};
                $rootScope._selectedCategory.children = [];
                $rootScope._isCategorySelected = false;
            } else {
                selectCategory($rootScope._selectedCategory.parent_id);
            }
        }

        function getCategories () {
            return data.list('categories', {})
                  .then(function (response) {
                    $rootScope._isCategorySelected = false;
                    $rootScope._rootCategories = response.data.children;
                    return $rootScope._categories;
                })
                  .catch(function (e) {
                    logger.error(e);
                });
        }

        function selectCategory (id) {
            return data.get('categories', {id: id})
                  .then(function (response) {
                    $rootScope._isCategorySelected = true;

                    if (response.data.depth == 1 && response.data.children.length == 0) {
                        $rootScope._isCategorySelected = false;
                    }

                    if (response.data.children.length > 0) {
                        $rootScope._selectedCategory = response.data;
                    } else {

                        $rootScope._selectedCategory.name = response.data.name;
                        $ionicHistory.nextViewOptions({
                          disableBack: true,
                          historyRoot: true
                        });
                        $ionicSideMenuDelegate.toggleLeft(false);
                        $state.go('app.categories.list', {id: id});

                    }

                })
                  .catch(function (e) {
                    logger.error(e);
                });
        }
    }
})();
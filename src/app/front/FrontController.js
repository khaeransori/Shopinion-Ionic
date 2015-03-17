(function () {
    'use strict';

    angular
        .module('app.front')
        .controller('FrontController', FrontController);

    /* @ngInject */
    function FrontController (api, logger) {
        /* jshint validthis:true */
        var vm = this;
		vm.playlists = [
			{ title: 'Reggae', id: 1 },
			{ title: 'Chill', id: 2 },
			{ title: 'Dubstep', id: 3 },
			{ title: 'Indie', id: 4 },
			{ title: 'Rap', id: 5 },
			{ title: 'Cowbell', id: 6 }
		];

        activate();

        ///////////
        function activate () {
            var promises = [];
            return api.ready(promises).then(function (){
                logger.info('Activated Products View');
            });
        }
    }
})();
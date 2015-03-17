(function() {
	'use strict';

	/**
	* app.core Module
	*
	* Description
	*/
	angular.module('app.core', [
		'ionic', 'ionic.ion.autoListDivider',
		/*
         * Angular modules
         */
        'ngAnimate', 'ngSanitize', 'ngResource', 'ui.router', 'templates',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router', 'blocks.resource'
        /*
         * 3rd Party modules
         */
    ]);
})();

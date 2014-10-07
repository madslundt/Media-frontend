angular.module('mediaApp', ['ngRoute', 'ngResource'])
	
	.run(function($rootScope) {
		'use strict';

	})
	.config(function($routeProvider) {
		'use strict';
		$routeProvider
		.when('/', {
			templateUrl: 'views/media.html',
			controller: 'mediaCtrl',
		})
		.otherwise({
			redirectTo: '/'
		});
	});
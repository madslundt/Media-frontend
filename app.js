angular.module('mediaApp', ['ngRoute', 'ngResource'])
	
	.run(function($rootScope) {
		'use strict';

	})

	.filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        };
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
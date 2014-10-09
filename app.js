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

		.when('/nzbdrone', {
			templateUrl: 'views/nzbdrone.html',
			controller: 'nzbdroneCtrl',
		})
		.when('/couchpotato', {
			templateUrl: 'views/couchpotato.html',
			controller: 'couchpotatoCtrl',
		})
		.when('/sabnzbd', {
			templateUrl: 'views/sabnzbd.html',
			controller: 'sabnzbdCtrl',
		})
		.otherwise({
			redirectTo: '/'
		});
	});
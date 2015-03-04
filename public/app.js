angular.module('mediaApp', ['ngRoute', 'ngResource', 'btford.socket-io'])
	
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

	.config(function($routeProvider, $locationProvider) {
		'use strict';
		$routeProvider
		.when('/', {
			templateUrl: 'views/media.html',
			controller: 'mediaCtrl'
		})

		.when('/sonarr', {
			templateUrl: 'views/sonarr.html',
			controller: 'sonarrCtrl'
		})
		.when('/couchpotato', {
			templateUrl: 'views/couchpotato.html',
			controller: 'couchpotatoCtrl'
		})
		.when('/nzbget', {
			templateUrl: 'views/nzbget.html',
			controller: 'nzbgetCtrl'
		})
        .when('/find/:id', {
            template: '',
            controller: function (socket, $routeParams, $location) {
                var id = $routeParams.id;
                socket.emit('GET:movie', id);

                socket.on('GET:movie', function (data) {
                    var path = '/';
                    if (data.Type == 'movie') {
                        path = '/movie/' + id;
                    } else if (data.Type == 'series') {
                        path = '/tv/' + id;
                    }
                    $location.path(path);
                });
            }
        })
		.when('/movie/:id', {
			templateUrl: 'views/movie.html',
			controller: 'movieCtrl'
		})
		.when('/tv/:id', {
			templateUrl: 'views/tv.html',
			controller: 'tvCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
		// $locationProvider.html5Mode(true);
	});
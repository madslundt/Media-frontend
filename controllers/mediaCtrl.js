angular.module('mediaApp')
	.controller('mediaCtrl', function($scope, couchpotato_api, sabnzbd_api) {
		'use strict';
		$scope.medias = {
			'couchpotato': {
				'title': 'Couchpotato',
				'background': 'img/couchpotato.png',
				'template': 'views/templates/couchpotato.html',
			},
			'sabnzbd': {
				'title': 'sabNZBD',
				'background': 'img/sabnzbd.png',
				'template': 'views/templates/sabnzbd.html'
			},
			'xbmc': {
				'title': 'XBMC',
				'background': 'img/xbmc.png',
				'template': 'views/templates/xbmc.html'
			},
			'nzbdrone': {
				'title': 'NzbDrone',
				'background': 'img/nzbdrone.png',
				'template': 'views/templates/nzbdrone.html',
			}
		};

		couchpotato_api.movie_list().then(function(response) {
			$scope.medias.couchpotato.data = response.data;
			$scope.medias.couchpotato.status = 'on';
		},
		function() {
			$scope.medias.couchpotato.status = 'off';
		});

		sabnzbd_api.status().then(function(response) {
			$scope.medias.sabnzbd.data = response.data;
			$scope.medias.sabnzbd.status = 'on';
		},
		function() {
			$scope.medias.sabnzbd.status = 'off';
		});
	});
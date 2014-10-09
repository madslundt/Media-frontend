angular.module('mediaApp')
	.controller('mediaCtrl', function($scope, couchpotato_api, sabnzbd_api, nzbdrone_api) {
		'use strict';
		$scope.medias = {
			'couchpotato': {
				'title': 'Couchpotato',
				'background': 'img/couchpotato.png',
				'template': 'views/templates/couchpotato.html',
				'data': {}
			},
			'sabnzbd': {
				'title': 'sabNZBD',
				'background': 'img/sabnzbd.png',
				'template': 'views/templates/sabnzbd.html',
				'data': {}
			},
			/*'xbmc': {
				'title': 'XBMC',
				'background': 'img/xbmc.png',
				'template': 'views/templates/xbmc.html',
				'data': {}
			},*/
			'nzbdrone': {
				'title': 'NzbDrone',
				'background': 'img/nzbdrone.png',
				'template': 'views/templates/nzbdrone.html',
				'data': {}
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
			$scope.medias.sabnzbd.data.status = response.data;
			$scope.medias.sabnzbd.status = 'on';
		},
		function() {
			$scope.medias.sabnzbd.status = 'off';
		});

		sabnzbd_api.history().then(function(response) {
			$scope.medias.sabnzbd.data.history = response.data;
			$scope.medias.sabnzbd.status = 'on';
		},
		function() {
			$scope.medias.sabnzbd.status = 'off';
		});

		nzbdrone_api.history().then(function(response) {
			$scope.medias.nzbdrone.data.history = response.data.records;
			$scope.medias.nzbdrone.status = 'on';
		},
		function() {
			$scope.medias.nzbdrone.status = 'off';
		});
		nzbdrone_api.calendar().then(function(response) {
			$scope.medias.nzbdrone.data.upcoming = response.data;
			$scope.medias.nzbdrone.status = 'on';
		},
		function() {
			$scope.medias.nzbdrone.status = 'off';
		});
	});
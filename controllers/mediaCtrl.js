angular.module('mediaApp')
	.controller('mediaCtrl', function($scope, couchpotato_api) {
		'use strict';
		$scope.medias = {
			'nzbdrone': {
				'title': 'NzbDrone',
				'background': 'img/couchpotato.png'
			},
			'cochpotato': {
				'title': 'Couchpotato',
				'background': 'img/couchpotato.png'
			},
			'sabnzbd': {
				'title': 'sabNZBD',
				'background': 'img/sabnzbd.png',
				'status': 'on'
			},
			'xbmc': {
				'title': 'XBMC',
				'background': 'img/xbmc.png',
				'status': 'off'
			}
		};

		couchpotato_api.updater_info().then(function(data) {
			console.log(data);
		});
	});
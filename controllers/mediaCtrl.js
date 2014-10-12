angular.module('mediaApp')
	.controller('mediaCtrl', function($scope, $interval, couchpotato_api, sabnzbd_api, nzbdrone_api, CONFIG) {
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

		/*==========  COUHCPOTATO  ==========*/
		couchpotato_api.movie_list().then(function(response) {
			console.log(response);
			$scope.medias.couchpotato.data = response.data;
			$scope.medias.couchpotato.status = 'on';
		},
		function() {
			$scope.medias.couchpotato.status = 'off';
		});


		/*==========  SABNZBD  ==========*/		
		var sabnzbd_timer_delay = CONFIG.sabnzbd.refresh_idle * 1000;
		var sabnzbd_timer;
		function update_sabnzbd() {
			sabnzbd_api.status().then(function(response) {
				console.log("status");
				if (response.data.queue.slots.length > 0 && sabnzbd_timer_delay != CONFIG.sabnzbd.refresh) {
					if (angular.isDefined(sabnzbd_timer)) {
						cancel(sabnzbd_timer);
					}
					sabnzbd_timer_delay = CONFIG.sabnzbd.refresh * 1000;
					sabnzbd_timer = $interval(update_sabnzbd, sabnzbd_timer_delay);
				} else if (sabnzbd_timer_delay != CONFIG.sabnzbd.refresh_idle) {
					if (angular.isDefined(sabnzbd_timer)) {
						cancel(sabnzbd_timer);
					}
					sabnzbd_timer_delay = CONFIG.sabnzbd.refresh_idle * 1000;
					sabnzbd_timer = $interval(update_sabnzbd, sabnzbd_timer_delay);
				}
				$scope.medias.sabnzbd.data.status = response.data.queue;
				$scope.medias.sabnzbd.status = 'on';
			},
			function() {
				$scope.medias.sabnzbd.status = 'off';
			});
			sabnzbd_api.history().then(function(response) {
				$scope.medias.sabnzbd.data.history = response.data.history;
				$scope.medias.sabnzbd.status = 'on';
			},
			function() {
				$scope.medias.sabnzbd.status = 'off';
			});
		}
		update_sabnzbd();


		/*==========  NZBDRONE  ==========*/		
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
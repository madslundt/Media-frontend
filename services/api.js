angular.module('mediaApp')

	.factory('couchpotato_api', function($http, CONFIG) {
		'use strict';

		var call = CONFIG.couchpotato.url + 'api/' + CONFIG.couchpotato.api_key + '/';
		var debug_call = 'tests/couchpotato/';

		return {
			updater_info: function() {
				if (CONFIG.debug_mode) {
					return $http.get(debug_call + 'updater.info.json');
				} else {
					return $http({
						url: call + 'updater.info',
						method: 'JSONP',
						params: {
							callback: 'JSON_CALLBACK'
						},
						responseType: 'JSON'
					});
				}
			},
			movie_list: function() {
				$.ajax({
				    url: call + 'movie.list',
				    dataType: 'JSONP',
				    type: 'JSON',
				    success: function(data) {
				    	console.log(data);
				    }
				});
				if (CONFIG.debug_mode) {
					return $http.get(debug_call + 'movie.list.json');
				} else {
					return $http({
						url: call + 'media.list',
						method: 'JSONP',
						params: {							
							status: 'active',
							release_status: 'snatched,available',
							callback: 'JSON_CALLBACK'
						},
						responseType: 'JSON'
					});
				}
			}
		}
	})

	.factory('xbmc_api', function($http, CONFIG) {
		'use strict';

		var call = CONFIG.xbmc.url + 'api/' + CONFIG.xbmc.api_key + '/';	

		return {
			updater_info: function() {
				return $http.get(call + 'updater_info');
			}
		}
	})

	.factory('sabnzbd_api', function($http, CONFIG) {
		'use strict';

		var call = CONFIG.sabnzbd.url + 'api?output=json&apikey=' + CONFIG.sabnzbd.api_key + '&mode=';	
		var debug_call = 'tests/sabnzbd/';

		return {
			status: function() {
				if (CONFIG.debug_mode) {
					return $http.get(debug_call + 'queue.json');
				} else {
					return $http({
						url: call + 'queue',
						method: 'JSONP',
						params: {
							callback: 'JSON_CALLBACK'
						},
						responseType: 'JSON'
					});
				}
			},
			history: function() {
				if (CONFIG.debug_mode) {
					return $http.get(debug_call + 'history.json');
				} else {
					return $http({
						url: call + 'history',
						method: 'JSONP',
						params: {
							callback: 'JSON_CALLBACK'
						},
						responseType: 'JSON'
					});
				}
			}
		}
	})

	.factory('nzbdrone_api', function($http, CONFIG) {
		'use strict';

		var call = CONFIG.nzbdrone.url + 'api/'
		var debug_call = 'tests/nzbdrone/';

		return {
			calendar: function() {
				return $http({
					method: 'JSONP', 
					url: (CONFIG.debug_mode ? debug_call + 'Calendar.json' : call + 'calendar'),
					params: {
						callback: "JSONP_CALLBACK"
					},
					responseType: 'JSON',
					headers: {
						Authorization: CONFIG.nzbdrone.api_key
					}
				});
			},
			history: function() {
				return $http({
					method: 'JSONP', 
					url: (CONFIG.debug_mode ? debug_call + 'History.json' : 'history'),
					params: {
						callback: "JSONP_CALLBACK"
					},
					responseType: 'JSON',
					headers: {
						Authorization: CONFIG.nzbdrone.api_key
					}
				});
			}
		}
	});
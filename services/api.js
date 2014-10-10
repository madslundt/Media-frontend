angular.module('mediaApp')

	.factory('couchpotato_api', function($http, CONFIG) {
		'use strict';

		var call = CONFIG.couchpotato.url + 'api/' + CONFIG.couchpotato.api_key + '/';
		var debug_call = 'tests/couchpotato/';

		return {
			updater_info: function() {
				return $http.get(call + 'updater.info');
			},
			movie_list: function() {
				return CONFIG.debug_mode ? $http.get(debug_call + 'movie.list.json') : $http.get(call + 'movie.list');
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
				return CONFIG.debug_mode ? $http.get(debug_call + 'queue.json') : $http.get(call + 'queue');
			},
			history: function() {
				return CONFIG.debug_mode ? $http.get(debug_call + 'history.json') : $http.get(call + 'history');
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
					method: 'GET', 
					url: (CONFIG.debug_mode ? debug_call + 'Calendar.json' : call + 'calendar'),
					header: {
						'Authorization': CONFIG.nzbdrone.api_key
					}
				});
			},
			history: function() {
				return $http({
					method: 'GET', 
					url: (CONFIG.debug_mode ? debug_call + 'History.json' : 'history'),
					header: {
						'Authorization': CONFIG.nzbdrone.api_key
					}
				});
			}
		}
	});
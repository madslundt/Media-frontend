angular.module('mediaApp')

	.factory('couchpotato_api', function($http, CONFIG) {
		'use strict';

		var call = CONFIG.couchpotato.url + 'api/' + CONFIG.couchpotato.api_key + '/';

		return {
			updater_info: function() {
				return $http.get(call + 'updater.info');
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

		var call = CONFIG.sabnzbd.url + 'api/' + CONFIG.sabnzbd.api_key + '/';	

		return {
			updater_info: function() {
				return $http.get(call + 'updater_info');
			}
		}
	})

	.factory('nzbdrone_api', function($http, CONFIG) {
		'use strict';

		var call = CONFIG.nzbdrone.url + 'api/' + CONFIG.nzbdrone.api_key + '/';	

		return {
			updater_info: function() {
				return $http.get(call + 'updater_info');
			}
		}
	});
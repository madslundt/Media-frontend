angular.module('mediaApp').constant('CONFIG', {
	couchpotato: {
		url: 'http://url',
		api_key: 'key',
		refresh: 60 
	},
	sabnzbd: {
		url: 'http://url',
		api_key: 'key',
		refresh: 10,
		refresh_idle: 60
	},
	xbmc: {
		url: 'http://url',
		api_key: 'key',
		refresh: 60
	},
	nzbdrone: {
		url: 'http://url',
		api_key: 'key',
		refresh: 60
	}
});

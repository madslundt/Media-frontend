angular.module('mediaApp').constant('CONFIG', {
	couchpotato: {
		url: 'http://192.168.0.17:5050/',
		api_key: '25e7d46a034b4de1b101424f453fe0b7'
	},
	sabnzbd: {
		url: 'http://192.168.0.17:8085/',
		api_key: '20f265494f3c799df778049e6310a6d2',
		refresh: 10,
		refresh_idle: 60
	},
	xbmc: {
		url: 'http://192.168.0.17:8888/',
		api_key: 'key',
		refresh: 60
	},
	nzbdrone: {
		url: 'http://192.168.0.17:8989/',
		api_key: 'd1d30ae9fa11400c8b02fc17f41f42da'
	},
	debug_mode: false
});

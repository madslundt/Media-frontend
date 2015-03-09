var mediaApp = angular.module('mediaSetupApp', ['ngResource', 'btford.socket-io', 'ngAnimate']);
mediaApp.run(function($rootScope, socket) {
	'use strict';
	$rootScope.$on('$locationChangeStart', function (event) {
		socket.on('setConfigAvailable', function (res) {
			if (!res.editable) {
                location.port = res.port;
				location.href = '/';
			}
		});
	});
});
mediaApp.controller('setupCtrl', function($scope, $timeout, socket) {
	'use strict';
	$scope.templates = [
		'views/setup1.html',
		'views/setup2.html',
		'views/setup3.html'
	];
	var mediaTemplates = [
		'views/couchpotato.html',
		'views/sonarr.html',
		'views/nzbget.html'
	];
	$scope.setupIndex = 0;
	$scope.mediaFinished = false;
	var startTime;
	var mediaTemplateIndex = 0;

	$scope.mediaTemplate = mediaTemplates[mediaTemplateIndex];

	$scope.media = {
        port: 8080,
		couchpotato: { active: true },
		sonarr: { active: true },
		nzbget: { active: true }
	};

    $scope.overlayLoad = false;

	$scope.nextStep = function ($event) {
        if ($scope.setupIndex === 0) {
            if (!$scope.media.port || $scope.media.port.length < 2) {
                $scope.media.port = 8080;
            }
        }
		if ($scope.setupIndex === 1) {
			var curMedia = $scope.media[Object.keys($scope.media)[mediaTemplateIndex]];
			if (curMedia.active && (!curMedia.url || !(curMedia.apikey || (curMedia.username && curMedia.password)))) {
				return;
			}
		}


		if ($scope.setupIndex === 1 && mediaTemplateIndex < mediaTemplates.length - 1) {
			$scope.mediaTemplate = mediaTemplates[++mediaTemplateIndex];
			if (mediaTemplateIndex === mediaTemplates.length - 1) {
				$scope.mediaFinished = true;
			}
			return;
		}
		if ($scope.setupIndex === 0) {
			startTime = new Date();
		} else {
			var finishTime = Math.ceil(Math.abs(new Date().getTime() - startTime.getTime()))
			if (finishTime <= 59000) { // Less than 1 minute
				var sec = Math.ceil(finishTime / 1000);
				$scope.finishTime = 'Less than ' + (sec == 1 ? 'a second' : sec + ' seconds');
			} else {
				var min = Math.ceil(finishTime / 1000 / 60);
				$scope.finishTime = 'Less than ' + (min == 1 ? 'a minute' : min + ' minutes');
			}
		}
		$scope.setupIndex++;
	}

	$scope.finishSetup = function () {
        $scope.overlayLoad = true;
		socket.emit('setConfig', $scope.media);
		$timeout(function () {
			socket.on('setConfigAvailable', function (res) {
				if (!res.editable) {
					location.href = 'http://127.0.0.1:' + res.port;
				}
			});
		}, 1000);
	}
});
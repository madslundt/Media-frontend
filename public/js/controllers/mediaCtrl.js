angular.module('mediaApp')
    .controller('mediaCtrl', function($scope, socket) {
        'use strict';
        $scope.medias = {
            'couchpotato': {
                'title': 'Couchpotato',
                'background': 'img/couchpotato.png',
                'template': 'views/templates/couchpotato.html',
                'data': {},
                'online': false
            },
            /*'xbmc': {
                'title': 'XBMC',
                'background': 'img/xbmc.png',
                'template': 'views/templates/xbmc.html',
                'data': {},
                'online': false
            },*/
            'sonarr': {
                'title': 'Sonarr',
                'background': 'img/nzbdrone.png',
                'template': 'views/templates/sonarr.html',
                'data': {},
                'online': false
            },
            'nzbget': {
                'title': 'NzbGet',
                'background': 'img/sabnzbd.png',
                'template': 'views/templates/nzbget.html',
                'data': {},
                'online': false
            }
        };

        /*==========  COUCHPOTATO  ==========*/
        socket.on('GET:couchpotato.available.movies', function (data) {
            if (data) {
                $scope.medias.couchpotato.online = true;
                $scope.medias.couchpotato.data.available = data;
            } else {
                console.error("Couchpotato offline");
                $scope.medias.couchpotato.online = false;
            }
        }, function(err) {
            console.error("Couchpotato offline");
            $scope.medias.couchpotato.online = false;
        });

        socket.on('GET:couchpotato.active.movies', function (data) {
            if (data) {
                $scope.medias.couchpotato.online = true;
                $scope.medias.couchpotato.data.active = data;
            } else {
                console.error("Couchpotato offline");
                $scope.medias.couchpotato.online = false;
            }
        });

        socket.on('GET:version', function (data) {
            // console.log(data);
        });

        /*==========  NZBGET  ==========*/
        var nzbget_timer_delay = /*CONFIG.nzbget.refresh_idle*/ 2000;
        var nzbget_timer;
        
        socket.on('GET:nzbget.listgroups', function (data) {
            console.log('hehe');
            if (data) {
                $scope.medias.nzbget.data.results = data.result;
                $scope.medias.nzbget.status = true;
            } else {
                $scope.medias.nzbget.online = false;
            }
        });
        socket.on('GET:nzbget.status', function (data) {
            if (data) {
                $scope.medias.nzbget.data.status = data.result;
            } else {
                $scope.medias.nzbget.online = false;
            }
        });
        socket.on('GET:nzbget.history', function (data) {
            if (data) {
                // console.log(data);
                $scope.medias.nzbget.data.history = data.result;
                $scope.medias.nzbget.online = true;
            } else {
                console.error('NzbGet offline');
                $scope.medias.nzbget.online = false;
            }
        });

        socket.on('GET:sonarr.history', function (data) {
            $scope.medias.sonarr.data.history = data.records;
        });

        function human_time_from(date, to) {
            to = to ? to : false;
            date = new Date(date);
            // The number of milliseconds in one day
            var ONE_DAY = 1000 * 60 * 60 * 24;
            var ONE_HOUR = 1000 * 60 * 60;

            // Convert both dates to milliseconds
            var date_ms = date.getTime();
            var today   = new Date().getTime();

            var difference_ms = date_ms - today;

            if (to) {
                difference_ms = Math.abs(difference_ms);
            }

            if (!to && difference_ms <= 0) {
                return false;
            }

            var days = Math.round(difference_ms/ONE_DAY);
            if (days < 1) {
               var hours = Math.round(difference_ms/ONE_HOUR);
               return 'In ' + hours + (hours > 1 ? ' hours' : ' hour');
            } else {
                if (days === 1 && to) {
                    return 'Yesterday';
                } else if (days === 1) {
                    return 'Tomorrow';
                }
                return (!to ? 'In ' : '') + days + (days > 1 ? ' days' : ' day') + (to ? ' ago' : '');
            }

        }

        $scope.human_time_from = human_time_from;

        socket.on('GET:sonarr.calendar', function (data) {
            if (data) {
                $scope.medias.sonarr.data.upcoming = data;
                $scope.medias.sonarr.online = true;
            } else {
                console.error("Sonarr calendar offline");
                $scope.medias.sonarr.online = false;
            }
        });
    });
angular.module('mediaApp')
    .controller('mediaCtrl', function($scope, $interval, socket) {
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
        socket.on('GET:movies', function (data) {
            if (data) {
                $scope.medias.couchpotato.online = true;
                $scope.medias.couchpotato.data = data;
            } else {
                console.error("Couchpotato offline");
                $scope.medias.couchpotato.online = false;
            }
        });

        socket.on('GET:version', function (data) {
            // console.log(data);
        });

        /*==========  NZBGET  ==========*/
        var nzbget_timer_delay = /*CONFIG.nzbget.refresh_idle*/ 2 * 1000;
        var nzbget_timer;
        
        function update_nzbget() {
            socket.on('GET:nzbget.listfiles', function (data) {
                // console.log(data);
                if (data) {
                    if (data.queue && data.queue.slots && data.queue.slots.length > 0 && nzbget_timer_delay != CONFIG.nzbget.refresh) {
                        if (angular.isDefined(nzbget_timer)) {
                            $interval.cancel(nzbget_timer);
                            nzbget_timer_delay = CONFIG.nzbget.refresh * 1000;
                            nzbget_timer = $interval(update_nzbget, nzbget_timer_delay);
                        }
                    } else if (nzbget_timer_delay != 10000/*CONFIG.nzbget.refresh_idle*/) {
                        if (angular.isDefined(nzbget_timer)) {
                            $interval.cancel(nzbget_timer);
                            nzbget_timer_delay = CONFIG.nzbget.refresh_idle * 1000;
                            nzbget_timer = $interval(update_nzbget, nzbget_timer_delay);
                        }
                    }
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
        }
        update_nzbget();

        socket.on('GET:sonarr.calendar', function (data) {
            // console.log(data);
        });
        socket.on('GET:sonarr.history', function (data) {
            // console.log(data);
        });

        // /*==========  SONARR  ==========*/
        // sonarr_api.history().success(function (data) {
        //     $scope.medias.sonarr.data.history = data.records;
        //     $scope.medias.sonarr.status = true;
        // }).error(function () {
        //     console.error("sonarr history offline");
        //     $scope.medias.sonarr.status = false;
        // });

        function human_time_from(date) {
            date = new Date(date);
            // The number of milliseconds in one day
            var ONE_DAY = 1000 * 60 * 60 * 24;
            var ONE_HOUR = 1000 * 60 * 60;

            // Convert both dates to milliseconds
            var date_ms = date.getTime();
            var today   = new Date().getTime();

            var difference_ms = date_ms - today;

            if (difference_ms <= 0) {
                return false;
            }

            var days = Math.round(difference_ms/ONE_DAY);
            if (days < 1) {
               var hours = Math.round(difference_ms/ONE_HOUR);
               return hours + (hours > 1 ? ' hours' : ' hour');
            } else {
                return days + (days > 1 ? ' days' : ' day');
            }

        }

        $scope.human_time_from = human_time_from;

        socket.on('GET:sonarr.calendar', function (data) {
            if (data) {
                console.log(human_time_from(data[0].airDateUtc));
                $scope.medias.sonarr.data.upcoming = data;
                $scope.medias.sonarr.online = true;
            } else {
                console.error("Sonarr calendar offline");
                $scope.medias.sonarr.online = false;
            }
        });
    });
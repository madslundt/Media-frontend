mediaApp.controller('movieCtrl', function($scope, $routeParams, socket) {
	'use strict';
    var movie_id = $routeParams.id;

    $scope.movie = {};

    socket.emit('GET:movie', movie_id);

    socket.on('GET:movie', function (data) {
        console.log(data);
        $scope.movie = data;
    });
});
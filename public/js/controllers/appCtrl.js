mediaApp.controller('appCtrl', function($scope, socket) {
    'use strict';

    $scope.updateNow = function () {
        socket.emit('check.update', true);
    }
});
// module.exports = function(){
//     var express = require('express');
//     var app = express();

//     var CONFIG = require('../config.json');
//     // var CouchPotato = require('node-sonarr');

//     // var config = CONFIG.sonarr;

//     // var sn = new Sonarr({
//     //     url: config.url,
//     //     apikey: config.apikey,
//     //     debug: true
//     // });

//     // app.get('/', function(req, res) {
//     //     sn.available().done(function(data) {
//     //         res.send(data);
//     //     });
//     // });

//     return app;
// }();

module.exports = function (socket) {
    var sonarr = require('../node_modules/node-sonarr');
    var config      = require('../config').sonarr;
    var sn = new sonarr({
        url: config.url,
        apikey: '1b8429d81f274d74ba20d70211429701'
    });

    sn.status().then(function(data, err) {
        if (data) {
            socket.emit('GET:sonarr.status', data);
        }
    });

    sn.series().then(function(data) {
        if (data) {
            socket.emit('GET:sonarr.series', data);
        }
    });

    sn.history().then(function(data, err) {
        if (data) {
            socket.emit('GET:sonarr.history', data);
        }
    });

    sn.calendar().then(function(data, err) {
        if (data) {
            socket.emit('GET:sonarr.calendar', data);
        }
    });

    socket.on('disconnect', function() {
        delete sonarr;
        delete config;
        delete sn;
    });
};
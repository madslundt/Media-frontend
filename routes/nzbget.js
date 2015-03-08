// module.exports = function(){
//     var express = require('express');
//     var app = express();

//     var CONFIG = require('../config.json');
//     // var CouchPotato = require('node-nzbget');

//     // var config = CONFIG.nzbget;

//     // var ng = new NzbGet({
//     //     url: config.url,
//     //     apikey: config.apikey,
//     //     debug: true
//     // });

//     // app.get('/', function(req, res) {
//     //     ng.available().done(function(data) {
//     //         res.send(data);
//     //     });
//     // });

//     return app;
// }();

module.exports = function (socket) {
    var nzbget = require('../node_modules/node-nzbget');
    var config      = require('../config').nzbget;
    var ng = new nzbget({
        url: config.url,
        username: config.username,
        password: config.password
    });

    var refresh_timer = config.refresh.idle;

    ng.history().then(function(data, err) {
        socket.emit('GET:nzbget.history', data);
    });

    function listgroups() {
        ng.listgroups().then(function(data, err) {
            if (data.result.length > 1 && refresh_timer != config.refresh.on) {
                clearInterval(listgroups_timer);
                refresh_timer = config.refresh.on;
                listgroups_timer = setInterval(listgroups, refresh_timer);
            } else if (refresh_timer != config.refresh.idle) {
                clearInterval(listgroups_timer);
                refresh_timer = config.refresh.idle;
                listgroups_timer = setInterval(listgroups, refresh_timer);
            }
            socket.emit('GET:nzbget.listgroups', data);
        });
    }
    listgroups();
    listgroups_timer = setInterval(listgroups, refresh_timer);


    ng.status().then(function(data, err) {
        socket.emit('GET:nzbget.status', data);
    });

    socket.on('disconnect', function() {
        clearInterval(listgroups_timer);
        delete ng;
        delete nzbget;
        delete config;
        delete refresh_timer
    });
};
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
    var nzbget = require('../node-nzbget');
    var config      = require('../config').couchpotato;
    var ng = new nzbget({
        url: config.url,
        username: config.username,
        password: config.password
    });

    ng.history().then(function(data, err) {
        socket.emit('GET:nzbget.history', data);
    });

    ng.listgroups().then(function(data, err) {
        socket.emit('GET:nzbget.listfiles', data);
    });

    ng.status().then(function(data, err) {
        socket.emit('GET:nzbget.status', data);
    });
};
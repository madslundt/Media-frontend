// module.exports = function(config){
//     var express = require('express');
//     var app = express();

//     var CouchPotato = require('node-couchpotato');

//     var cp = new CouchPotato({
//         url: config.url,
//         apikey: config.apikey,
//         debug: true
//     });

//     app.get('/', function(req, res) {
//         cp.version().done(function(data) {
//             res.send(data);
//         });
//     });

//     app.get('/movies/:id', function(req, res) {
//         cp.get(req.params.id).done(function(data) {
//             res.send(data);
//         });
//     });

//     app.get('/movies', function(req, res) {
//         cp.movie.list(config.list).done(function(data) {
//             res.send(data);
//         });
//     });

//     return app;
// }();

module.exports = function (socket) {
    var couchpotato = require('../node_modules/node-couchpotato');
    var config      = require('../config').couchpotato;
    var cp = new couchpotato({
        url: config.url,
        apikey: config.apikey,
        debug: true
    });

    cp.movie.list({"status": "done", "release_status": "available"}).then(function(data, err) {
        socket.emit('GET:couchpotato.available.movies', data);
    });
    cp.movie.list({"status": "active"}).then(function(data, err) {
        socket.emit('GET:couchpotato.active.movies', data);
    });

    socket.on('GET:couchpotato.search', function (query) {
        console.log("searching for: " + query);
        cp.search(query).then(function (data, err) {
            socket.emit('GET:couchpotato.search', data);
        });
    });
};
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
    var couchpotato = require('../node-couchpotato');
    var config      = require('../config').couchpotato;
    var cp = new couchpotato({
        url: config.url,
        apikey: config.apikey,
        debug: true
    });

    cp.movie.list(config.list).then(function(data, err) {
        socket.emit('GET:movies', data);
    });
};
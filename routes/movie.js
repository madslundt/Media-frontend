module.exports = function (socket) {
    var search = require('../node_modules/omdb');
    var movie = require('node-movie').getByID;
    socket.on('GET:movie', function (id) {
        movie(id, function (err, data) {
            socket.emit('GET:movie', data);
        });
    });

    socket.on('GET:search', function (search) {
        search.search(search, function (err, data) {
            socket.emit('GET:search', data);
        });
    });

    socket.on('disconnect', function() {
        delete search;
        delete movie;
    });
};
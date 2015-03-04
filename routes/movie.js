module.exports = function (socket) {
    var movie = require('../node_modules/node-movie').getByID;
    socket.on('GET:movie', function (id) {
        movie(id, function (err, data) {
            socket.emit('GET:movie', data);
        });
    });
};
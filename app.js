var express = require('express'),
	http = require('http'),
	fs = require('fs'),
	url = require('url'),
	routes = require('./routes'),
	app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

var CONFIG = require('./config.json');

app.set('port', process.env.PORT || CONFIG.port);
app.set('views', __dirname + '/views');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(app.router);

if (app.get('env') === 'development') {
	app.use(express.errorHandler());
}

// app.use('/', express.static(__dirname  + '/public/app'));

app.get('/', routes.index);

app.get('*', routes.index); // Redirect rest to /

// app.use('/nzbget', require('./controllers/nzbget'))(CONFIG.nzbget);
// app.use('/sonarr', require('./sonarr'));
// app.use('/couchpotato', require('./controllers/couchpotato'))(CONFIG.couchpotato);
// app.use('/kodi', require('./kodi'));

// io.sockets.on('connection', require('./routes/nzbget'));
// io.sockets.on('connection', require('./routes/couchpotato'));
// io.sockets.on('connection', require('./routes/sonarr'));
// io.sockets.on('connection', require('./routes/kodi'));

server.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
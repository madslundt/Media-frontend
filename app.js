var express        = require('express'),
    http           = require('http'),
    fs             = require('fs'),
    url            = require('url'),
    routes         = require('./routes'),
    cookieParser   = require('cookie-parser'),
    bodyParser     = require('body-parser'),
    cookieSession  = require('cookie-session'),
    open           = require('open'),
    path           = require('path');

function startServer(haveConfig) {
    var app = express();
    var server = http.createServer(app);
    var io = require('socket.io').listen(server);
    var CONFIG;
    if (haveConfig)
        CONFIG = require('./config.json');

    fs.watchFile('config.json', function (curr, prev) {
        CONFIG = require('./config.json');
        haveConfig = true;
        io.close();
        //server.close();
        startServer(true);
    });

    io.sockets.on('connection', function (socket) {
        if (haveConfig)
            socket.emit('setConfigAvailable', {editable: false, port: CONFIG.port || 8080});
        else
            socket.emit('setConfigAvailable', {editable: true, port: 8080});

    });

    app.set('views', __dirname + '/views');
    app.use(cookieParser());
    app.use(bodyParser());
    app.use(cookieSession({secret: 'app_1'}));
    // app.use(express.bodyParser());
    // app.use(express.methodOverride());
    //app.use(express.static(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));

    if (!haveConfig) {
        app.set('port', 8080);
        open('http://127.0.0.1:' + app.get('port') + '/setup');
        app.get('/setup', routes.index);
        io.sockets.on('connection', function (socket) {
            var config_sample  = require('./config.sample');

            socket.on('setConfig', function (data) {
                var newConfig = mergeJSON(config_sample, data);
                fs.writeFile('./config.json', JSON.stringify(newConfig, null, 4), function (err) {
                    
                });
            });
            
        });
    }

    // app.use('/', express.static(__dirname  + '/public/app'));

    if (haveConfig) {
        app.set('port', CONFIG.port || 8080);

        app.get('/', routes.index);

        app.get('*', routes.index); // Redirect rest to /

        // app.use('/nzbget', require('./controllers/nzbget'))(CONFIG.nzbget);
        // app.use('/sonarr', require('./sonarr'));
        // app.use('/couchpotato', require('./controllers/couchpotato'))(CONFIG.couchpotato);
        // app.use('/kodi', require('./kodi'));
        if (CONFIG.nzbget.active)
            io.sockets.on('connection', require('./routes/nzbget'));
        if (CONFIG.couchpotato.active)
            io.sockets.on('connection', require('./routes/couchpotato'));
        if (CONFIG.sonarr.active)
            io.sockets.on('connection', require('./routes/sonarr'));
        // io.sockets.on('connection', require('./routes/kodi'));

        io.sockets.on('connection', require('./routes/movie'));
    }

    server.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
}

fs.exists('./config.json', function(exists) {
    startServer(exists);
});



/**
 * Merge two objects (obj2 > obj1)
 * @param  {[type]} obj1 [description]
 * @param  {[type]} obj2 [description]
 * @return {[type]}      [description]
 */
function mergeJSON(obj1,obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
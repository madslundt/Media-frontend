var express        = require('express'),
    http           = require('http'),
    fs             = require('fs'),
    url            = require('url'),
    routes         = require('./routes'),
    open           = require('open'),
    path           = require('path');

function startServer(haveConfig) {
    var app = express();
    var server = http.createServer(app);
    var io = require('socket.io').listen(server);
    var CONFIG;
    if (haveConfig)
        CONFIG = require('./config.json');

    fs.watchFile('./config.json', function (curr, prev) {
        if (curr.size <= 0) {
            return;
        }
        console.log(curr);
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

    app.use(express.static(path.join(__dirname, 'public')));

    if (!haveConfig) {
        app.set('port', 8080);
        open('http://127.0.0.1:' + app.get('port') + '/setup');
        app.get('/setup', routes.index);
        io.sockets.on('connection', function (socket) {
            var config_sample  = require('./config.sample.json');
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
function mergeJSON(target, src) {
    var array = Array.isArray(src);
    var dst = array && [] || {};

    if (array) {
        target = target || [];
        dst = dst.concat(target);
        src.forEach(function(e, i) {
            if (typeof dst[i] === 'undefined') {
                dst[i] = e;
            } else if (typeof e === 'object') {
                dst[i] = mergeJSON(target[i], e);
            } else {
                if (target.indexOf(e) === -1) {
                    dst.push(e);
                }
            }
        });
    } else {
        if (target && typeof target === 'object') {
            Object.keys(target).forEach(function (key) {
                dst[key] = target[key];
            })
        }
        Object.keys(src).forEach(function (key) {
            if (typeof src[key] !== 'object' || !src[key]) {
                dst[key] = src[key];
            }
            else {
                if (!target[key]) {
                    dst[key] = src[key];
                } else {
                    dst[key] = mergeJSON(target[key], src[key]);
                }
            }
        });
    }

    return dst;
}
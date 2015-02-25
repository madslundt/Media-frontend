var request = require('request');
var qs      = require('querystring');
var q       = require('q');

var CouchPotatoMovie = require('./couchpotato-movie');

var CouchPotato = function(config) {
    this.apikey = config.apikey;
    this.url = config.url;
    this.key = null;

    this.debug = config.debug === true;

    this.movie = new CouchPotatoMovie(this);
};

CouchPotato.prototype.cmd = function(command, args) {
    var url = this.url + "/api/" + this.apikey + "/" + command + "/";

    if (typeof args == "function") {
        callback = args;
    } else {
        url += "?" + qs.stringify(args);
    }
    var defer = q.defer();

    request({
        "uri": url,
        "json": true
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
        } else if (response.statusCode == 404) {
            console.log("ERROR: Invalid API key");
            return false;
        } else {
            console.log("ERROR ", response.statusCode);
            return false;
        }

        defer.resolve(body);
    });

    return defer.promise;
};

CouchPotato.prototype.available = function() {
    return this.cmd('app.available').then(function(r) {
        return r.success;
    });
};

CouchPotato.prototype.restart = function() {
    return this.cmd('app.restart').then(function(r) {
        return r;
    });
};

CouchPotato.prototype.shutdown = function() {
    return this.cmd('app.shutdown').then(function(r) {
        return r;
    });
};

CouchPotato.prototype.version = function() {
    return this.cmd('app.version').then(function(r) {
        return r.version;
    });
};

module.exports = CouchPotato;
var request = require('request');
var qs      = require('querystring');
var q       = require('q');

var Sonarr = function(config) {
    this.apikey = config.apikey;

    this.url = config.url;
    if (this.url[this.url.length - 1] != '/') {
        this.url += '/';
    }

    this.debug = config.debug === true;
};

Sonarr.prototype.cmd = function(command, args) {
    var url = this.url + 'api/' + command;

    if (url.substring(0, 4) != "http") {
        url = 'http://' + url;
    }

    var defer = q.defer();

    function callback(error, response, body) {
        if (!response || response.statusCode != 200) {
            defer.reject(new Error("Status code did not return 200"));
        } else if (error) {
            defer.reject(error);
        }
        else if (response.statusCode == 200 && !error && body) {
            try {
                body = JSON.parse(body);
            } catch(err) {
                // No need to do anything - object is already json
            }
            defer.resolve(body);
        } else {
            defer.reject(new Error("Body did not contain data"));
        }
    }

    request({
        uri: url,
        headers: { 'X-API-KEY': this.apikey },
        'json': true
    }, callback);
    
    return defer.promise;
};

Sonarr.prototype.status = function() {
    return this.cmd('system/status').then(function(r) {
        return r.success;
    });
};

Sonarr.prototype.series = function() {
    return this.cmd('series').then(function(r) {
        return r;
    });
};

Sonarr.prototype.history = function() {
    return this.cmd('history').then(function(r) {
        return r;
    });
};

Sonarr.prototype.calendar = function() {
    return this.cmd('calendar').then(function(r) {
        return r;
    });
};

module.exports = Sonarr;
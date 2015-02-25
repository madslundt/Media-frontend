var request = require('request');
var qs      = require('querystring');
var q       = require('q');

var NzbGet = function(config) {
    this.username = config.username;
    this.password = config.password;

    this.url = config.url;
    if (this.url[this.url.length - 1] != '/') {
        this.url += '/';
    }

    this.debug = config.debug === true;
};

NzbGet.prototype.cmd = function(command, args) {
    var url = this.username + ':' + this.password + '@' + this.url + 'jsonrpc/' + command;

    if (url.substring(0, 4) != "http") {
        url = 'http://' + url;
    }

    var defer = q.defer();

    function callback(error, response, body) {
        if (!response || response.statusCode != 200) {
            defer.reject(new Error("Did not return 200"));
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
        'uri': url,
        'json': true
    }, callback);

    return defer.promise;
};

NzbGet.prototype.version = function() {
    return this.cmd('version').then(function(r) {
        return r.success;
    });
};

NzbGet.prototype.history = function() {
    return this.cmd('history').then(function(r) {
        return r;
    });
};

NzbGet.prototype.status = function() {
    return this.cmd('status').then(function(r) {
        return r;
    });
};

NzbGet.prototype.listgroups = function() {
    return this.cmd('listgroups').then(function(r) {
        return r;
    });
};

NzbGet.prototype.listfiles = function() {
    return this.cmd('listfiles').then(function(r) {
        return r;
    });
};

module.exports = NzbGet;
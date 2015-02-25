(function() {
    var CouchPotatoMovie = function(delegate) {
        this.delegate = delegate;
    };

    CouchPotatoMovie.prototype.add = function(args) {
        return this.delegate.cmd('movie.add', args).then(function(r) {
            return r;
        });
    };

    CouchPotatoMovie.prototype.delete = function(args) {
        return this.delegate.cmd('movie.delete', args).then(function(r) {
            return r;
        });
    };

    CouchPotatoMovie.prototype.edit = function(args) {
        return this.delegate.cmd('movie.edit', args).then(function(r) {
            return r;
        });
    };

    CouchPotatoMovie.prototype.get = function(id) {
        return this.delegate.cmd('movie.get', {id: id}).then(function(r) {
            return r;
        });
    };

    CouchPotatoMovie.prototype.list = function(args) {
        return this.delegate.cmd('movie.list', args).then(function(r) {
            return r;
        });
    };

    CouchPotatoMovie.prototype.refresh = function(id) {
        return this.delegate.cmd('movie.refresh', {id: id}).then(function(r) {
            return r;
        });
    };

    CouchPotatoMovie.prototype.search = function(search) {
        return this.delegate.cmd('movie.search', {q: search}).then(function(r) {
            return r.movies;
        });
    };

    CouchPotatoMovie.prototype.full_search = function() {
        return this.delegate.cmd('movie.searcher.full_search').then(function(r) {
            
        });
    };

    CouchPotatoMovie.prototype.progress = function() {
        return this.delegate.cmd('movie.searcher.progress').then(function(r) {
            return r.movie;
        });
    };

    module.exports = CouchPotatoMovie;
})();
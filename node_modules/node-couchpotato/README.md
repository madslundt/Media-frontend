node-couchpotato
================
Node interface for [CouchPotato](http://www.couchpota.to/).

**Not properly tested yet**

Work In Progress.

Usage example
================
```javascript
var CouchPotato = require('node-couchpotato');

var cp = new CouchPotato({
	url: '<host:port>', 
	apikey: '<APIKEY>', 
	debug: true
	});

cp.movie.progress().then(function(r) {
	console.log(r);
});
```

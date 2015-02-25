node-couchpotato
================
Node interface for [CouchPotato](http://www.couchpota.to/).

**Not properly tested yet**

Work In Progress.

Usage example
================
```javascript
var nzbget = require('node-nzbget');

var ng = new nzbget({
	url: '<host:port>', 
	username: '<username>',
    password: '<password>',
	});

ng.version().then(function(res) {
	// data in res
});

ng.history().then(function(res) {
    // data in res
});

ng.listgroups().then(function(res) {
    // data in res
});

ng.listfiles().then(function(res) {
    // data in res
});
```

For now there only exists these functions.
For more information about the API calls, [click here](https://github.com/Sonarr/Sonarr/wiki/API)

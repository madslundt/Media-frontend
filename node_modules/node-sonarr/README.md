node-sonarr
================
Node interface for [Sonarr](https://github.com/Sonarr/Sonarr).

**Not properly tested yet**

Work In Progress.

Usage example
================
```javascript
var sonarr = require('node-sonarr');

var sn = new CouchPotato({
	url: '<host:port>', 
	apikey: '<APIKEY>', 
	debug: true
	});

sn.status().then(function(res) {
	// Data in res
});

sn.series().then(function(res) {
    // Data in res
});

sn.history().then(function(res) {
    // Data in res
});

sn.calendar().then(function(res) {
    // Data in res
});
```

For now there only exists these functions.
For more information about the API calls, [click here](https://github.com/Sonarr/Sonarr/wiki/API)
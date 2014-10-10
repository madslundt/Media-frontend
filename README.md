Media-frontend
==============

Web application for a quick overview for sabNZBD, NzbDrone, CouchPotato

![](http://i.imgur.com/P3sbRFu.png)

This only offers a client side overview for sabNZBD, NzbDrone, CouchPotato. 
For security I recommend setting up a password with .htaccess and .htpasswd, or adding a backend that can handle so the api-keys aren't shown public.

Edit config.js
=============
angular.module('mediaApp').constant('CONFIG', {<br />
	couchpotato: {<br />
		url: 'http://localhost:5050/',<br />
		api_key: 'key',<br />
		refresh: 60 <br />
	},<br />
	sabnzbd: {<br />
		url: 'http://localhost:8085/',<br />
		api_key: 'key',<br />
		refresh: 10,<br />
		refresh_idle: 60<br />
	},<br />
	xbmc: {<br />
		url: 'http://url',<br />
		api_key: 'key',<br />
		refresh: 60<br />
	},<br />
	nzbdrone: {<br />
		url: 'http://localhost:8989/',<br />
		api_key: 'key',<br />
		refresh: 60<br />
	},<br />
	debug_mode: false<br />
});


How to add .htaccess and .htpasswd
==================================

 1. Create a file called .htpasswd and generate a username and password (http://www.htaccesstools.com/htpasswd-generator/)
 2. Create a file called .htaccess with the content:

   AuthType Basic<br />
   AuthName "Media Frontend authentication"<br />
   AuthUserFile <PATH TO .htpasswd><br />
   Require valid-user<br />

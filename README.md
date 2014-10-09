Media-frontend
==============

Web application for a quick overview for XBMC, sabNZBD, NzbDrone, CouchPotato

This only offers a client side overview for sabNZBD, NzbDrone, CouchPotato. 
For security I recommend setting up a password with .htaccess and .htpasswd, or adding a backend that can handle so the api-keys aren't shown public.

How to add .htaccess and .htpasswd
==================================

Create a file called .htpasswd and generate a username and password (http://www.htaccesstools.com/htpasswd-generator/)

Create a file called .htaccess with the content:
AuthType Basic
AuthName "Media Frontend authentication"
AuthUserFile <PATH TO .htpasswd>
Require valid-user

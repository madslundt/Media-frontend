Media-frontend
==============

Web application for a quick overview for NzbGet, NzbDrone, CouchPotato

![](http://i.imgur.com/P3sbRFu.png)

This only offers a client side overview for NzbGet, NzbDrone, CouchPotato. 
For security I recommend setting up a password with .htaccess and .htpasswd, or adding a backend that can handle so the api-keys aren't shown public.

How to add .htaccess and .htpasswd
==================================

 1. Create a file called .htpasswd and generate a username and password (http://www.htaccesstools.com/htpasswd-generator/)
 2. Create a file called .htaccess with the content:

   AuthType Basic<br />
   AuthName "Media Frontend authentication"<br />
   AuthUserFile <PATH TO .htpasswd><br />
   Require valid-user<br />

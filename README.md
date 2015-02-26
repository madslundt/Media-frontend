Media-frontend
==============

Web application for a quick overview for NzbGet, Sonarr, CouchPotato

![](http://i.imgur.com/P3sbRFu.png)
Old picture. New one incoming.

Setup
=====
For now you need to do a bit work to get it working. When the application gets more popular and more complete, I will take a look on how to get the setup more easy.
*  First you need to download this repository (git clone is preffered since you later can use git update).
*  Open terminal or commando promt and change directory to the folder where you cloned/downloaded this repository into.
*  Run the command `npm install`.
*  In the mean while you can open `config.sample.json`, in your favorite text editor, and edit url, api keys, username, password etc. to the one that connects to your server.
*  Save the file named `config.json`. Make sure not to overwrite the current `config.sample.json` (this will give some trouble for later when updating).
* When the `npm install` has completed, you're ready to startup the application by running the command `node app.js` in the same folder as npm install.

Right now there is not an automatic updater implemented in the application. For now you will have to update it manually by either downloading the application from Github again and overwriting or if you used `git clone` you can simply use `git update`. Remember to stop the application from running when updating by pressing `CTRL + C`. After the update is done you can start the application again `node app.js

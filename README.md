The development has stopped for this application.
Please use my (chrome extension)[https://github.com/madslundt/RadarrSonarrPlex] instead.

Media-frontend
==============

Web application for a quick overview for NzbGet, Sonarr, CouchPotato

Early version
![](http://i.imgur.com/P3sbRFu.png)

Newer version
![](http://i.imgur.com/e0ypuoG.png)

Setup
![](http://i.imgur.com/yFhWFv7.png)

Setup
=====
For now you need to do a bit work to get it working. When the application gets more popular and more complete, I will take a look on how to get the setup more easy.
*  First you need to download this repository (git clone is preffered since you later can use git update).
*  Open terminal or commando promt and change directory to the folder where you cloned/downloaded this repository into.
*  Run the command `npm install`.
* When the `npm install` has completed, you're ready to startup the application by running the command `node app.js` in the same folder as npm install. This will guide you through the setup.

Right now there is not an automatic updater implemented in the application. For now you will have to update it manually by downloading the application from Github again and overwriting. However, if you used `git clone` you can simply use `git update`. Remember to restart the application when updating.

You can of course also use io.js instead of Node.js.

[Current backlog](https://trello.com/b/jdk2EpAf/media-frontend)

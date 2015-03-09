module.exports = function (socket) {
    var autoupdater = require('../node_modules/auto-updater')({
        pathToJson: '',
        async: true,
        silent: false,
        autoupdate: true,
        check_git: false
    });

    autoupdater.on('check-up-to-date', function(v) {
      console.log("You have the latest version: " + v);
    });
    autoupdater.on('check-out-dated', function(v_old , v) {
      console.log("Your version is outdated. "+v_old+ " of "+v);
      autoupdater.forceDownloadUpdate(); // If autoupdate: false, you'll have to do this manually.
      // Maybe ask if the'd like to download the update.
    });
    autoupdater.on('update-downloaded', function() {
      console.log("Update downloaded and ready for install");
      autoupdater.forceExtract(); // If autoupdate: false, you'll have to do this manually.
    });
    autoupdater.on('update-not-installed', function() {
      console.log("The Update was already in your folder! It's read for install");
      autoupdater.forceExtract(); // If autoupdate: false, you'll have to do this manually.
    });
    autoupdater.on('extracted', function() {
      console.log("Update extracted successfully!");
      console.log("RESTART THE APP!");
    });
    autoupdater.on('download-start', function(name) {
      console.log("Starting downloading: " + name);
    });
    autoupdater.on('download-update', function(name,perc) {
      process.stdout.write("Downloading " + perc + "% \033[0G");
    });
    autoupdater.on('download-end', function(name) {
      console.log("Downloaded " + name);
    });
    autoupdater.on('download-error', function(err) {
      console.log("Error when downloading: " + err);
    });
    autoupdater.on('end', function() {
      console.log("The app is ready to function");
    });

    socket.on('check.update', function (data) {
        console.log("check");
        autoupdater.forceCheck();
    });
};
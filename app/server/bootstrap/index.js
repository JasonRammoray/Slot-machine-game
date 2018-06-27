/**
 * Bootstraps the application:
 * a) bind routes
 * b) launches the server
 * c) sets a folder with static resources
 * @param {Object} app the application instance
 * @param {String} config.static an absolute path to server static files from
 * @param {Number} config.port a port the application should listen to
 */
function bootstrapApp(app, config) {
    const express = require('express');
    const bindRoutes = require('../routes');
    bindRoutes(app);
    app.use(express.static(config.static));
    app.listen(
        config.port,
        () => `The server is up and running at http://localhost:${config.port}`
    );
}

module.exports = bootstrapApp;

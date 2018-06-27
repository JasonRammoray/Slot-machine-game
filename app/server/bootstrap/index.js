/**
 * Bootstraps the application
 * @return {Function} launch function
 */
function bootstrapApp() {
    const express = require('express');
    const app = express();
    const bindRoutes = require('../routes');
    bindRoutes(app);

    /**
     * Launches the application
     * @param {Object} config a configuration object
     * @param {String} config.static an absolute path to server static files from
     * @param {Number} config.port a port the application should listen to
     * @param {Function=} config.onLaunch callback to be executed, when
     * server is up and running
     * @return {Object} application server instance
     */
    return config => {
        app.use(express.static(config.static));
        const defaultOnLaunch = () => {
            console.log(`Server is listening at http://localhost:${config.port}`);
        };
        return app.listen(
            config.port,
            config.onLaunch || defaultOnLaunch
        );
    };
}

module.exports = bootstrapApp;

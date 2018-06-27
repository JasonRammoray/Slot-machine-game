const apiRouter = require('./api');

/**
 * Binds all routes to the application
 * @param {Object} app the application instance
 */
function bindRoutes(app) {
    app.use('/api', apiRouter);
}

module.exports = bindRoutes;

const path = require('path');
const bootstrapApp = require('./bootstrap');
const launchApp = bootstrapApp();
launchApp({
    static: path.join(__dirname, '..', 'client'),
    port: +process.argv[2] || 3000
});

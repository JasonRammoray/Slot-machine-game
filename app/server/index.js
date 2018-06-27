const express = require('express');
const app = express();
const path = require('path');
const bootstrapApp = require('./bootstrap');
bootstrapApp(app, {
    static: path.join(__dirname, '..', 'client'),
    port: +process.argv[2] || 3000
});

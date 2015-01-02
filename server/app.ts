/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/server-reference.ts" />
'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import express = require('express');
import mongoose = require('mongoose');
import configurations = require('./config/environment/index');
var config: configurations.IConfigurarions = <configurations.IConfigurarions>configurations.configurations;

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if (config.seedDB) {
    require('./config/seed');
}

// Setup server
var app = express();
import server = require('http');
server.createServer(app);

require('./config/express')(app);
require('./routes')(app);

// Start server
app.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
// Expose app
exports = module.exports = app;

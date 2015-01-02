/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/server-reference.ts" />
/**
 * Express configuration
 */

'use strict';
import express = require('express');
import morgan = require('morgan');
import compression = require('compression');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import errorHandler = require('errorhandler');
import path = require('path');
import configurations = require('./environment/index');

var methodOverride:any = require('method-override');
var favicon:any = require('serve-favicon');
var config:configurations.IConfigurarions = <configurations.IConfigurarions>configurations.configurations;

module.exports = function (app) {
    var env = app.get('env');

    app.set('views', config.root + '/server/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());

    if ('production' === env) {
        app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
        app.use(express.static(path.join(config.root, 'public')));
        app.set('appPath', config.root + '/public');
        app.use(morgan('dev'));
    }

    if ('development' === env || 'test' === env) {
        app.use(require('connect-livereload')());
        app.use(express.static(path.join(config.root, '.tmp')));
        app.use(express.static(path.join(config.root, 'client')));
        app.set('appPath', 'client');
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};

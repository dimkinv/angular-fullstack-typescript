'use strict';

import path = require('path');
import _ = require('lodash');

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Should we populate the DB with sample data?
    seedDB: false,

    // List of user roles
    userRoles: ['guest', 'user', 'admin'],

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    }

};

// Export the config object based on the NODE_ENV
// ==============================================
export var configurations = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});

export interface IConfigurarions {
    env: string;
    root: string;
    port:number;
    seedDB: boolean;
    userRoles: Array<string>;
    mongo:{
        options: {
            db:{
                safe:boolean;
            }
        };
        uri: string;
    };
    ip:string;
}

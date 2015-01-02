'use strict';
var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

var all = {
    env: process.env.NODE_ENV,
    root: path.normalize(__dirname + '/../../..'),
    port: process.env.PORT || 9000,
    seedDB: false,
    userRoles: ['guest', 'user', 'admin'],
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    }
};

exports.configurations = _.merge(all, require('./' + process.env.NODE_ENV + '.js') || {});
//# sourceMappingURL=index.js.map

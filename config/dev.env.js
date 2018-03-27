'use strict';
const env = require('node-env-file');
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

env('/.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
});

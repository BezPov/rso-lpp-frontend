'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
	// NODE_ENV: '"development"',
	VERSION: '"1.0.4"',
	NAME: '"LPP App"',
	BASE_API_URL: '"http://35.225.182.234/api/"'
});

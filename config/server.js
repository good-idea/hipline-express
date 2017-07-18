const env = require('./environment');

module.exports = {
	environment: process.env.env || 'development',
	port: process.env.port || env.port || 3000,
};

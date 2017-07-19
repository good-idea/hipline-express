const environment = require('./environment');

module.exports = {
	host: environment.CMS_HOST || 'localhost',
	port: environment.CMS_PORT || 80,
};

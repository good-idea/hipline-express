const environment = require('./environment');

module.exports = {
	secret: environment.DB_PASS,
	user: environment.DB_USER,
	dbName: environment.DB_DBNAME,
	host: environment.DB_HOST || 'localhost',
	port: environment.DB_PORT || 27017,
}

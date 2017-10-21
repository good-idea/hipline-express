const server = require('./server')
const environment = require('./environment')
const cms = require('./cms')

module.exports = {
	server,
	cms,
	jwtSecret: environment.JWT_SECRET,
	environment: environment.ENV || process.env.ENV,
}

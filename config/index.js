const server = require('./server')
const environment = require('./environment')
const database = require('./database')
const cms = require('./cms')

module.exports = {
	server,
	database,
	cms,
	environment: process.env.NODE_ENV || environment.ENV,
}

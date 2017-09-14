const env = require('./environment')

module.exports = {
	port: process.env.port || env.port || 3000,
}

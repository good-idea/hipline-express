const environment = require('./environment')

const host = environment.CMS_HOST || 'localhost'
const port = environment.CMS_PORT || 80

module.exports = {
	apiRoot: `http://${host}:${port}/api`,
}

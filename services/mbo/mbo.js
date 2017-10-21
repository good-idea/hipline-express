const classRequests = require('./class')
const clientRequests = require('./client')
const customRequests = require('./custom')
const saleRequests = require('./sale')
const siteRequests = require('./site')
const staffRequests = require('./staff')

module.exports = {
	...classRequests,
	...clientRequests,
	...customRequests,
	...saleRequests,
	...siteRequests,
	...staffRequests,
}

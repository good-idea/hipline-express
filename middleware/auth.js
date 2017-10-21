const jwt = require('jsonwebtoken')

const config = require('../config')


/**
 * Helper Functions
 */



/**
 * Middleware
 */


const withUser = (req, res, next) => {
	console.log(req.headers)
	const token = req.body.token || req.query.token || req.headers['x-access-token']
	if (!token) {
		req.user = false
		next()
	}
	if (token) {
		jwt.verify(token, config.jwtSecret, (err, decoded) => {
			// decode the user info from the token, and attach it to the request
			req.user = (err) ? false : decoded.user
		})
	}
	next()
}

const requireLogin = (req, res, next) => {

}

const requireFreshAuth = (req, res, next) => {

}

module.exports = {
	withUser,
	requireLogin,
	requireFreshAuth,
}

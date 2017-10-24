const jwt = require('jsonwebtoken')

const config = require('../config')

const { jwtSecret, adminSecret } = config;
/**
 * Helper Functions
 */


/**
 * Middleware
 */


const withUser = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token']
	if (!token) {
		req.user = false
		next()
	}
	if (token) {
		jwt.verify(token, jwtSecret, (err, decoded) => {
			// decode the user info from the token, and attach it to the request
			req.user = (err) ? false : decoded.user
		})
	}
	next()
}

const requireLogin = (req, res, next) => {
	if (req.get('host') !== 'localhost:8080') return next()
	if (!req.user) return next({ response: { status: 403, message: 'No valid token present' } })
	return next()
}

const requireFreshAuth = (req, res, next) => {

}

const requireAdmin = (req, res, next) => {
	if (req.get('host') !== 'localhost:8080') {
		const suppliedSecret = req.body.suppliedSecret || req.query.suppliedSecret || req.headers['x-admin-secret']
		if (suppliedSecret !== adminSecret) return next({ status: 403, message: 'Invalid admin key' })
	}
	req.user = {
		UniqueID: req.body.userId || req.query.userId
	}
	return next()
}

module.exports = {
	withUser,
	requireLogin,
	requireFreshAuth,
	requireAdmin,
}

const helmet = require('helmet')
const hpp = require('hpp')
// Modified from:
// https://github.com/ctrlplusb/react-universally/blob/master/server/middleware/security.js

const environment = require('../config').environment

console.log(environment)

const defaultsByEnv = {
	production: ["'self'", '*.myhipline.com'],
	staging: ["'self'", '*.standard-quality.biz', '*.myhipline.com'],
	development: ["'self'", '127.0.0.1:8088', 'localhost', '*.standard-quality.biz', '*.myhipline.com'],
}
const defaults = defaultsByEnv[environment]

const cspConfig = {
	directives: {
		childSrc: ["'self'"],
		// Note: Setting this to stricter than * breaks the service worker. :(
		// I can't figure out how to get around this, so if you know of a safer
		// implementation that is kinder to service workers please let me know.
		connectSrc: ['*'], // ["'self'", 'ws:'],
		defaultSrc: [...defaults],
		imgSrc: [
			...defaults,
			'data:',
		],
		fontSrc: ["'self'", 'data:'],
		objectSrc: ["'self'"],
		manifestSrc: ["'self'"],
		// scriptSrc: [
		// 	// Allow scripts hosted from our application.
		// 	"'self'",
		// 	"'unsafe-inline'",
		// ],
		reportUri: '/report-csp-violation'
	},
}

const securityMiddleware = [
	hpp(),
	helmet(),
	helmet.contentSecurityPolicy(cspConfig),
]

module.exports = securityMiddleware

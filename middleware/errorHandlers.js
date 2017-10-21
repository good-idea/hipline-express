const R = require('ramda')

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const errorHandlersMiddleware = [
	/**
	* 404 errors middleware.
	*
	* NOTE: the react application middleware hands 404 paths, but it is good to
	* have this backup for paths not handled by the react middleware. For
	* example you may bind a /api path to express.
	*/
	function notFoundMiddlware(req, res, next) {
		console.log('here')
		res.status(404).send('Sorry, that resource was not found.')
	},

	/**
	* 500 errors middleware.
	*
	* NOTE: You must provide specify all 4 parameters on this callback function
	* even if they aren't used, otherwise it won't be used.
	*/
	function unexpectedErrorMiddleware(err, req, res, next) {
		if (err) {
			// console.log(err)
			console.log(err)
		}
		res.status(R.path(['response', 'status'], err) || R.prop('status', err) || 500)
			.send({ message: R.path(['response', 'message'], err) || R.prop('message', err) || 'Sorry, an unexpected error occurred.' })
	},
]

module.exports = errorHandlersMiddleware

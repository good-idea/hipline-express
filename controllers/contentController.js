const axios = require('axios')
const { cms } = require('../config')

// const sync = require('./sync')

const initial = (req, res) => {
	console.log(`${cms.apiRoot}/initial?uri=${req.query.uri}`)
	axios
		.get(`${cms.apiRoot}/initial?uri=${req.query.uri}`)
		.then(response => res.json(response.data))
		.catch(err => {
			console.log(err)
		})
}

// const syncToCMS = (req, res, next) => {
// 	sync()
// 		.then(response => {
// 			return res.json(response)
// 		})
// 		.catch(err => next(err))
// }

module.exports = { initial }

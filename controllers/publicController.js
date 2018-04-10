// const redis = require('redis')
const axios = require('axios')
// const { promisify } = require('util')
// const { slugify } = require('../utils/text')
const git = require('git-rev-sync')
const { cms } = require('../config')

// const client = redis.createClient()

// const getCache = promisify(client.get).bind(client)
// const setCache = promisify(client.set).bind(client)

module.exports.site = function getPage(req, res, next) {
	const uri = req.url
	axios
		.get(`${cms.apiRoot}/initial?uri=${uri}`)
		.then(response => {
			return res.render('index', { meta: response.data.meta || {}, rev: git.short() })
		})
		.catch(next)
}

const redis = require('redis')
const axios = require('axios')
const { promisify } = require('util')
const { slugify } = require('../utils/text')

const { cms } = require('../config')

const client = redis.createClient()

const getCache = promisify(client.get).bind(client)
const setCache = promisify(client.set).bind(client)

module.exports.site = function getPage(req, res, next) {
	const uri = req.url
	const slug = slugify(uri)
	getCache(slug)
		.then(cached => {
			if (cached) {
				console.log(cached)
				const meta = JSON.parse(cached)
				return res.render('index', { meta })
			}
			axios
				.get(`${cms.apiRoot}/initial?uri=${uri}`)
				.then(response => {
					setCache(
						slug,
						JSON.stringify(response.data.meta),
						'EX',
						60 * 15,
					).then(() => res.render('index', { meta: response.data.meta }))
				})
				.catch(next)
		})
		.catch(next)
}

// const redis = require('redis')
const axios = require('axios')
// const { promisify } = require('util')
// const { slugify } = require('../utils/text')
const git = require('git-rev-sync')
const sanitizeHtml = require('sanitize-html')
const { cms } = require('../config')

// const client = redis.createClient()

// const getCache = promisify(client.get).bind(client)
// const setCache = promisify(client.set).bind(client)

// const lenses = [
//   R.lens(R.path(''))
//
// ]

module.exports.site = function getPage(req, res, next) {
  const uri = req.url
  axios
    .get(`${cms.apiRoot}/initial?uri=${uri}`)
    .then((response) => {
      const site = Object.assign(response.data.site, {
        headsnippets: sanitizeHtml(response.data.site.headsnippets || ''),
        bodysnippets: sanitizeHtml(response.data.site.bodysnippets || ''),
      })
      return res.render('index', { site, meta: response.data.meta || {}, rev: git.short() })
    })
    .catch(next)
}

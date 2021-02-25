// const redis = require('redis')
const axios = require('axios')
const git = require('git-rev-sync')
const { cms } = require('../config')

module.exports.site = function getPage(req, res, next) {
  const uri = req.url
  axios
    .get(`${cms.apiRoot}/initial?uri=${uri}`)
    .then((response) => {
      return res.render('index', { site: response.data.site, meta: response.data.meta || {}, rev: git.short() })
    })
    .catch(next)
}

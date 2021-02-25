const axios = require('axios')
const { cms } = require('../config')

const initial = (req, res) => {
  axios
    .get(`${cms.apiRoot}/initial?uri=${req.query.uri}`)
    .then((response) => res.json(response.data))
    .catch((err) => {
      console.log(err)
    })
}

module.exports = { initial }

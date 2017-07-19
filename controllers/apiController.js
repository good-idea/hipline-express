const axios = require('axios');
const { cms } = require('../config');

const apiRoot = `http://${cms.host}:${cms.port}/api`;

module.exports.all = (req, res, next) => {
	axios.get(`${apiRoot}/all`)
		.then(response => res.json(response.data))
		.catch(err => console.log(err.message));
};

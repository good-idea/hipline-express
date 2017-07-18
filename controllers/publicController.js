const { cms } = require('../config');

module.exports.site = function getPage(req, res, next) {
	return res.json(req);
};

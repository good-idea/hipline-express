const apiRoutes = require('express').Router();

const apiController = require('./controllers/apiController');

apiRoutes.get('all', apiController.all)

module.exports = apiRoutes;

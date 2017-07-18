const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const responseTime = require('response-time');
const compression = require('compression');
const mongoose = require('mongoose');
const logger = require('morgan');

const config = require('./config');
const apiRoutes = require('./apiRoutes');

/**
 * Database connection
 */

const mongoURI = `mongodb://${config.database.user}:${config.database.secret}@${config.database.host}:${config.database.port}/${config.database.dbName}`;
mongoose.createConnection(mongoURI);


/**
 * Initialization
 */

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(responseTime());
app.use(compression());

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public'), { maxage: '14d' }));
if (config.environment === 'development') app.use(logger('dev'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});


/**
 * Controllers
 */

const publicController = require('./controllers/publicController');

/**
 * Routes
 */

// app.use('/api', apiRoutes);

app.get('/', publicController.site);

/**
 * Serve
 */

app.listen(config.server.port, () => {
	console.log(`API [${config.environment}] Running on ${config.server.port}`);
});

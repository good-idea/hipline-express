const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const responseTime = require('response-time')
const compression = require('compression')
// const mongoose = require('mongoose')
const logger = require('morgan')

const config = require('./config')
const securityMiddleware = require('./middleware/security')
const errorHandlersMiddleware = require('./middleware/errorHandlers')

/**
 * Database connection
 */

// const mongoURI = `mongodb://${config.database.user}:${config.database.secret}@${config.database.host}:${config.database.port}/${config.database.dbName}`
// mongoose.createConnection(mongoURI)
//


/**
 * Initialization
 */

const app = express()

if (config.environment === 'development') app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(responseTime())
app.use(compression())

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public'), { maxage: '14d' }))

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials')
	res.header('Access-Control-Allow-Credentials', 'true')
	next()
})

/**
 * Middleware
 */

if (config.environment !== 'development') app.use(securityMiddleware)

/**
 * Controllers
 */

const publicController = require('./controllers/publicController')
const contentController = require('./controllers/contentController')
const mboController = require('./controllers/mboController')

/**
 * Routes
 */

app.get('/api/content/initial', contentController.initial)
app.get('/api/content/sync', contentController.syncToCMS)
// app.get('/api/content/sync/classes', contentController.syncClassDescriptions)

app.get('/api/mbo/login', mboController.loginUser)
app.get('/api/mbo/registrationFields', mboController.getRegistrationFields)
// app.get('/api/mbo/user', mboController.getUser)
app.get('/api/mbo/staff', mboController.getStaff)
app.get('/api/mbo/classes', mboController.getClasses)
app.get('/api/mbo/read/:method', mboController.readMBO)
// app.get('/api/*', (req, res) => (res.status(404).send()))

// if (config.environment === 'development') {
// 	const hotMiddleware = require('./middleware/hotReload')
// 	app.use(hotMiddleware)
// }

app.get('*', publicController.site)

app.use(errorHandlersMiddleware)

/**
 * Serve
 */

app.listen(config.server.port, () => {
	console.log(`API [${config.environment}] Running on ${config.server.port}`)
})

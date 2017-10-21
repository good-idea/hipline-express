const express = require('express')

const publicController = require('./controllers/publicController')
const contentController = require('./controllers/contentController')
const mboController = require('./controllers/mboController')

const auth = require('./middleware/auth')

const router = express.Router()


/**
 * Public Routes
 */

router.get('/api/content/initial', contentController.initial)
router.get('/api/content/sync', contentController.syncToCMS)
// router.get('/api/content/sync/classes', contentController.syncClassDescriptions)

router.get('/api/mbo/registrationFields', mboController.getRegistrationFields)
router.get('/api/mbo/staff', mboController.getStaff)
router.get('/api/mbo/classes', mboController.getClasses)
router.get('/api/mbo/read/:method', mboController.readMBO)

router.post('/api/mbo/login', mboController.loginUser)
router.post('/api/mbo/register', mboController.registerUser)
router.post('/api/mbo/forgot', mboController.forgotPassword)


router.get('/api/mbo/checktoken', mboController.checkToken)

/**
 * User Routes
 */

const userRoutes = express.Router()

userRoutes.use(auth.withUser, auth.requireLogin)
userRoutes.get('/', mboController.getCurrentUserData)
userRoutes.get('/account', mboController.getUserAccountData)

router.use('/api/mbo/user', userRoutes)

/**
 * Admin Routes
 */

const adminRoutes = express.Router()
adminRoutes.use(auth.requireAdmin)

adminRoutes.get('/user', mboController.getUserByID)
adminRoutes.get('/user/account', mboController.getUserAccountData)

router.use('/api/admin', adminRoutes)

router.get('/api/*', (req, res) => (res.status(404).send()))
router.get('*', publicController.site)

module.exports = router

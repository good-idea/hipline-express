const mboClient = require('../services/mbo/mbo')
const moment = require('moment-timezone')
const R = require('ramda')
const jwt = require('jsonwebtoken')

const config = require('../config')

const { prepareFieldLabel } = require('../utils/text')

/**
 * Get Staff
 */

const getStaff = (req, res, next) => {
	mboClient.getActiveStaff().then(response => res.json(response))
		.catch(err => next(err))
}

/**
 * Get User Registration Fields
 */

const getFieldConfig = (fieldName) => {
	switch (fieldName) {
	case 'Username':
		return {
			required: true,
			name: fieldName,
			label: 'Email Address',
			type: 'email',
		}
	case 'Password':
		return {
			required: true,
			name: fieldName,
			label: 'Password',
			type: 'password',
		}
	case 'Password2':
		return {
			required: true,
			name: fieldName,
			label: 'Confirm Password',
			type: 'password',
		}
	case 'AddressLine1':
		return {
			required: true,
			name: fieldName,
			label: 'Address',
			type: 'text',
		}
	case 'PostalCode':
		return {
			required: true,
			name: fieldName,
			label: prepareFieldLabel(fieldName),
			pattern: '[0-9]*',
			type: 'text',
		}
	case 'State':
		return {
			required: true,
			name: fieldName,
			label: prepareFieldLabel(fieldName),
			type: 'text',
		}
	case 'ReferredBy':
		return {
			required: true,
			name: fieldName,
			label: prepareFieldLabel(fieldName),
			type: 'select',
		}
	case 'MobilePhone':
		return {
			required: true,
			name: fieldName,
			label: 'Phone Number',
			type: 'tel',
		}
	case 'EmailOptIn':
		return {
			required: true,
			name: fieldName,
			label: 'Sign me up for email updates',
			help: 'Sign up for email updates',
			type: 'checkbox',
		}
	case 'LiabilityRelease':
		return {
			// required: true,
			name: fieldName,
			label: 'I agree with the terms above',
			type: 'checkbox',
		}
	case 'ReferredByOtherText':
		return {
			name: fieldName,
			type: 'text',
		}
	default:
		return {
			label: prepareFieldLabel(fieldName),
			required: true,
			name: fieldName,
			type: 'text',
		}
	}
}

const getRegistrationFields = (req, res, next) => {
	Promise.all([mboClient.getRequiredFields(), mboClient.getReferralTypes()])
		.then(([sourceRequiredFields, referralTypes]) => {
			const referralOptions = R.pipe(
				R.uniq,
				R.map(i => ({ value: i, label: i })),
			)(referralTypes.string)
			const requiredFields = R.pipe(
				R.concat(['FirstName', 'LastName', 'Username', 'Password', 'Password2', 'EmailOptIn', 'LiabilityRelease', 'ReferredByOtherText']),
				R.map(getFieldConfig),
				R.map((i) => {
					if (i.name === 'ReferredBy') {
						return R.assoc('options', referralOptions, i)
					}
					return i
				}),
			)(sourceRequiredFields.string)
			return res.json(requiredFields)
		})
		.catch(err => next(err))
}

// Extract only the useful information from the user

const getUserInfo = R.pickAll([
	'Username',
	'IsCompany',
	'Liability',
	'UniqueID',
	'ID',
	'FirstName',
	'LastName',
	'Email',
	'AddressLine1',
	'City',
	'State',
	'PostalCode',
	'Country',
	'MobilePhone',
	'BirthDate',
])

/**
 * Register User
 */

const registerUser = (req, res, next) => {
	mboClient.registerUser(req.body).then((response) => {
		const user = getUserInfo(response.Client)
		return res.json({
			user,
		})
	}).catch(err => next(err))
}

const forgotPassword = (req, res, next) => {
	mboClient.forgotPassword(req.body).then(() => res.json({ success: true }))
		.catch(err => next(err))
}


/**
 * Login User
 */

const loginUser = (req, res, next) => {
	mboClient.loginUser(req.body).then((response) => {
		if (response.Status === 'InvalidParameters') {
			next({ status: 403, message: response.Message })
			return
		}
		const user = getUserInfo(response.Client)
		// Create a JWT Token with minimal user data
		const token = jwt.sign(
			{
				user: R.pickAll(['Username', 'UniqueID', 'FirstName', 'LastName'])(user),
			},
			config.jwtSecret,
			{
				expiresIn: '7d',
			},
		)

		return res.json({
			success: true,
			token,
			user,
		})
	}).catch(err => next(err))
}

const checkToken = (req, res, next) => res.json({
	user: req.user,
})

const getCurrentUserData = (req, res, next) => {
	mboClient.getUserByID({ UniqueID: req.user.UniqueID }).then((userData) => {
		return res.json({ user: getUserInfo(userData) })
	}).catch(err => next(err))
}

const getUserByID = (req, res, next) => {
	mboClient.getUserByID({ UniqueID: req.query.userid }).then((userData) => {
		return res.json({ user: getUserInfo(userData) })
	}).catch(err => next(err))
}

const getUserAccountData = (req, res, next) => {
	const { UniqueID } = req.user
	const requests = [
		mboClient.getUserByID({ UniqueID }),
		mboClient.getAccountSchedule({ UniqueID }),
		mboClient.getAccountPurchases({ UniqueID }),
		mboClient.getAccountServices({ UniqueID }),
		mboClient.getAccountBalances({ UniqueID }),
		mboClient.getAccountMemberships({ UniqueID }),
		mboClient.getAccountContracts({ UniqueID }),
	]
	Promise.all(requests)
		.then(R.zipObj(['user', 'schedule', 'purchases', 'services', 'balances', 'memberships', 'contracts']))
		.then(response => R.mapObjIndexed(
			// All of the array responses need to be flattened
			((a, key) => ((a && key !== 'user') ? R.flatten(a) : a)),
			response,
		))
		.then((responses) => {
			const user = R.mergeAll([
				req.user,
				R.prop('user', responses),
				R.dissoc('user', responses),
			])
			res.json({ user })
		})
		.catch(err => next(err))
}

/**
 * Get Classes
 */
const getClasses = (req, res, next) => {
	const week = req.query.week || 0
	const length = req.query.length || 1
	mboClient.getClasses(week, length).then((classes) => {
		if (req.query.raw === 'true') return res.json(classes)
		const classResponse = []
		for (const classSource of classes) {
			const startTime = moment.tz(classSource.StartDateTime, 'America/Los_Angeles')
			const endTime = moment.tz(classSource.EndDateTime, 'America/Los_Angeles')
			const newClass = {
				id: classSource.ClassScheduleID,
				siteID: classSource.Location.SiteID,
				mboid: classSource.ClassDescription.ID,
				location: classSource.Location.Name,
				programid: classSource.ClassDescription.Program.ID,
				title: classSource.ClassDescription.Name,
				teacher: classSource.Staff.FirstName,
				isCanceled: classSource.IsCanceled,
				isWaitListAvailable: classSource.IsWaitListAvailable,
				isAvailable: classSource.isAvailable,
				isSubstitute: classSource.Substitute,
				capacity: classSource.MaxCapacity,
				booked: classSource.TotalBooked,
				waitlist: classSource.totalBookedWaitlist,
				startTime,
				endTime,
			}
			classResponse.push(newClass)
		}
		const schedule = R.sort(R.ascend(R.prop('startTime')))(classResponse)
		return res.json(schedule)
	}).catch(err => next(err))
}

const readMBO = (req, res, next) => {
	const { method } = req.params
	const args = req.query
	if (mboClient[method]) {
		mboClient[method](args).then(response => res.json(response)).catch(err => next(err))
	} else {
		res.status(400)
		return res.json({
			message: `${method} is not a valid method`,
		})
	}
}

module.exports = {
	getStaff,
	getClasses,
	readMBO,
	loginUser,
	getCurrentUserData,
	registerUser,
	getRegistrationFields,
	checkToken,
	forgotPassword,
	getUserAccountData,
	getUserByID,
}

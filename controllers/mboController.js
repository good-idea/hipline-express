const mboClient = require('./mboClient')
const moment = require('moment-timezone')
const R = require('ramda')

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
	case 'UserName':
		return {
			required: true,
			name: fieldName,
			label: 'Email/Login',
			type: 'email',
		}
	case 'Email':
		return {
			required: true,
			name: fieldName,
			label: 'Email/Login',
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
			label: 'Get Email Updates',
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
				R.concat(['FirstName', 'LastName', 'Email', 'Password', 'Password2', 'EmailOptIn', 'LiabilityRelease', 'ReferredByOtherText']),
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

/**
 * Login User
 */

const loginUser = (req, res, next) => {
	mboClient.loginUser(req.body).then((user) => {
		return res.json(user)
	}).catch(err => next(err))
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
				location: classSource.Location.Name,
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
		const schedule = R.sort(
			R.ascend(R.prop('startTime')),
		)(classResponse)
		return res.json(schedule)
	}).catch(err => next(err))
}

const readMBO = (req, res, next) => {
	const method = req.params.method
	if (mboClient[method]) {
		mboClient[method]().then(response => res.json(response)).catch(err => next(err))
	} else {
		res.status(400)
		return res.json({
			message: `${method} is not a valid method`,
		})
	}
}

module.exports = { getStaff, getClasses, readMBO, loginUser, getRegistrationFields }

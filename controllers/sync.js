const axios = require('axios')
const Qs = require('qs')
const R = require('ramda')
const { cms } = require('../config')
const mboClient = require('../services/mbo/mbo')
const { forceArrayOfOne, HTMLToMarkdown } = require('../utils/data')

const apiRoot = `http://${cms.host}:${cms.port}/api`
/**
 * Sync methods should get raw MBO data,
 * parse it, and POST it to the CMS
 */

const syncStaffInfo = () => (
	new Promise((resolve, reject) => {
		mboClient.getActiveStaff().then((staffData) => {
			const staff = staffData.map((i) => {
				if (i.Bio) i.Bio = HTMLToMarkdown(i.Bio)
				return i
			})
			axios({
				method: 'post',
				url: `${apiRoot}/sync/staff`,
				data: Qs.stringify({ staff }),
			}).then((staffResponse) => {
				resolve(staffResponse.data)
			}).catch(err => { console.log('error'); return reject(err) })
		})
	})
)

const saySingularOfInterval = (input) => {
	switch (input) {
	case 'Yearly':
		return 'Year'
	case 'Monthly':
		return 'Month'
	case 'Weekly':
		return 'Week'
	case 'Daily':
		return 'Day'
	default:
		return input
	}
}

const sayMultipleOfInterval = (input) => {
	switch (input) {
	case 'Yearly':
		return 'Years'
	case 'Monthly':
		return 'Months'
	case 'Weekly':
		return 'Weeks'
	case 'Daily':
		return 'Days'
	default:
		return input
	}
}

// Contracts and Services come with different forms of data.
const normalizePassData = (sourceData) => {
	const Price = (sourceData.RecurringPaymentAmountTotal) ?
		`${sourceData.RecurringPaymentAmountTotal}/${saySingularOfInterval(R.path(['AutopaySchedule', 'FrequencyTimeUnit'], sourceData))}` :
		sourceData.Price
	const pass = {
		Price,
		Duration: R.prop('AutopaySchedule', sourceData) ? `${R.prop('NumberOfAutopays', sourceData)} ${sayMultipleOfInterval(R.path(['AutopaySchedule', 'FrequencyTimeUnit'], sourceData))}` : '',
		ContractIds: R.prop('ContractItems', sourceData) ? R.pipe(R.prop('ContractItems'), forceArrayOfOne, R.pluck(['ID']), R.join(','))(sourceData) : '',
		MembershipId: sourceData.AssignsMembershipId || '',
		AgreementTerms: (sourceData.AgreementTerms) ? HTMLToMarkdown(sourceData.AgreementTerms) : '',
	}
	return {
		...sourceData,
		...pass,
	}
}

const syncClassPasses = () => (
	new Promise((resolve, reject) => {
		const servicesRequest = mboClient.getServices()
		const contractsRequest = mboClient.getContracts()

		Promise.all([servicesRequest, contractsRequest]).then(([services, contracts]) => {
			const passes = [
				...R.map(normalizePassData, services),
				...R.map(normalizePassData, contracts),
			]
			axios({
				method: 'post',
				url: `${apiRoot}/sync/passes`,
				data: Qs.stringify({ passes }),
			}).then((classResponse) => {
				resolve(classResponse.data)
			}).catch(err => reject(err))
		}).catch(mboErr => reject(mboErr))
	})
)

const syncClassDescriptions = () => (
	new Promise((resolve, reject) => {
		mboClient.getClassDescriptionsByProgram(0, 4).then((classTypes) => {
			for (const classProgram of classTypes) {
				for (const classSource of classProgram.classes) {
					if (R.path(['Description'], classSource) !== undefined) {
						classSource.Description = HTMLToMarkdown(classSource.Description)
					}
				}
			}
			axios({
				method: 'post',
				url: `${apiRoot}/sync/classes`,
				data: Qs.stringify({ classTypes }),
			}).then((classResponse) => {
				resolve(classResponse.data)
			}).catch(err => reject(err))
		}).catch(err => { console.log(err); return reject(err) })
	})
)

const sync = () => (
	new Promise((resolve, reject) => {
		Promise.all([
			syncStaffInfo(),
			syncClassDescriptions(),
			syncClassPasses(),
		]).then(([
			staff,
			classes,
			passes,
		]) => {
			resolve({
				staff,
				classes,
				passes,
			})
		}).catch(err => reject(err))
	})
)

module.exports = sync

const axios = require('axios')
const Qs = require('qs')
const R = require('ramda')
const { cms } = require('../config')
const mboClient = require('./mboClient')
const { HTMLToMarkdown } = require('../utils/data')

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
				console.log("Response")
				resolve(staffResponse.data)
			}).catch(err => { console.log('error'); return reject(err) })
		})
	})
)

const syncClassPasses = () => (
	new Promise((resolve, reject) => {
		mboClient.getPasses().then((passes) => {
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

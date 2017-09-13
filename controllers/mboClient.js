const soap = require('strong-soap').soap

const { getPropertyByString } = require('../utils/data')

/**
 * Initial config
 */

const config = {
	apiRoot: 'https://api.mindbodyonline.com/0_5/',
}

const endpoints = {
	ClassService: `${config.apiRoot}/ClassService.asmx`,
	StaffService: `${config.apiRoot}/StaffService.asmx`,
	SaleService: `${config.apiRoot}/SaleService.asmx`,
}

const SourceCredentials = {
	SourceName: process.env.MBO_SOURCENAME,
	Password: process.env.MBO_SECRET,
	SiteIDs: {
		int: ['4561'],
	},
}

const UserCredentials = {
	Username: `_${process.env.MBO_SOURCENAME}`,
	Password: process.env.MBO_SECRET,
	SiteIDs: {
		int: ['4561'],
	},
}

const defaultParams = { SourceCredentials, UserCredentials }


/**
 * Methods.
 * All methods should return the raw response,
 * The controller will handle caching & parsing the data.
 */

/**
 * Main request method
 * @param  {string} endpoint         MBO SOAP Endpoint
 * @param  {object} additionalParams Additional parameters for Request object
 * @param  {string} methodString     Dot-separated string of path to request method
 * @param  {[type]} resultString     Dot-separated string of path to result method
 * @param  {[type]} cacheSuffix      [description]
 * @return {[type]}                  [description]
 */

const makeMBORequest = ({
	endpoint,
	additionalParams,
	methodString,
	resultString,
}) => (
	new Promise((resolve, reject) => {
		soap.createClient(`${endpoint}?wsdl`, {}, (soapErr, client) => {
			if (soapErr) {
				reject(soapErr)
				return
			}
			client.setEndpoint(endpoint)
			const params = {
				Request: Object.assign(defaultParams, additionalParams),
			}
			const requestMethod = getPropertyByString(client, methodString)
			if (!requestMethod || typeof requestMethod !== 'function') {
				reject(`${methodString} is not a valid request method`)
				return
			}
			requestMethod(params, (soapErrs, response) => {
				if (soapErrs) reject(soapErrs)
				const result = getPropertyByString(response, resultString)
				resolve(result)
			})
		})
	})
)

/**
 * Basic requests
 */

const getClassDescriptions = function getClassDescriptions() {
	return makeMBORequest({
		endpoint: endpoints.ClassService,
		methodString: 'Class_x0020_Service.Class_x0020_ServiceSoap.GetClassDescriptions',
		resultString: 'GetClassDescriptionsResult.ClassDescriptions.ClassDescription',
	})
}

const getPasses = function getPackages() {
	return makeMBORequest({
		endpoint: endpoints.SaleService,
		methodString: 'Sale_x0020_Service.Sale_x0020_ServiceSoap.GetServices',
		resultString: 'GetServicesResult.Services.Service',
	})
}

const getStaff = function getStaff() {
	return makeMBORequest({
		endpoint: endpoints.StaffService,
		methodString: 'Staff_x0020_Service.Staff_x0020_ServiceSoap.GetStaff',
		resultString: 'GetStaffResult.StaffMembers.Staff',
	})
}

const getClasses = function getClasses(week = 0, length = 1) {
	const today = new Date()
	const StartDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 * week))
	const EndDateTime = new Date(StartDateTime.getFullYear(), StartDateTime.getMonth(), StartDateTime.getDate() + (7 * length))
	return makeMBORequest({
		endpoint: endpoints.ClassService,
		methodString: 'Class_x0020_Service.Class_x0020_ServiceSoap.GetClasses',
		resultString: 'GetClassesResult.Classes.Class',
		additionalParams: {
			Fields: 'Classes.Resource',
			StartDateTime: StartDateTime.toISOString(),
			EndDateTime: EndDateTime.toISOString(),
		},
	})
}

/**
 * Additional methods
 */

/**
 * Return array of Staff objects of staff members who have classes in the next 4 weeks.
 */

const getActiveStaff = function getActiveStaff() {
	return new Promise((resolve, reject) => {
		const allStaff = getStaff()
		const upcomingClasses = getClasses(0, 4)
		Promise.all([allStaff, upcomingClasses]).then(([staff, classes]) => {
			const activeStaffIDs = classes.reduce((prev, next) => {
				if (!prev.includes(next.Staff.ID)) prev.push(next.Staff.ID)
				return prev
			}, [])
			const activeStaff = staff.reduce((prev, next) => {
				if (activeStaffIDs.includes(next.ID)) prev.push(next)
				return prev
			}, [])
			resolve(activeStaff)
		}).catch(err => reject(err))
	})
}

module.exports = { getClasses, getPasses, getActiveStaff, getClassDescriptions }

const soap = require('strong-soap').soap
const R = require('ramda')
const axios = require('axios')

const { getPropertyByString } = require('../utils/data')
const { slugify } = require('../utils/text')

/**
 * Initial config
 */

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


const config = {
	apiRoot: 'https://api.mindbodyonline.com/0_5/',
}

const endpoints = {
	ClassService: `${config.apiRoot}/ClassService.asmx`,
	StaffService: `${config.apiRoot}/StaffService.asmx`,
	SaleService: `${config.apiRoot}/SaleService.asmx`,
	ClientService: `${config.apiRoot}/ClientService.asmx`,
}

/**
 * General Helper methods
 */

const getProgramNameByID = (id) => {
	switch (id) {
	case 29:
		return 'playcare'
	case 22:
		return 'classes'
	case 23:
		return 'workshops'
	case 36:
		return 'popups'
	case 37:
		return 'cowork'
	case 38:
		return 'coworkPrivate'
	default:
		return 'none'
	}
}

const groupClassesByProgram = R.groupBy(danceClass => (
	getProgramNameByID(R.path(['ClassDescription', 'Program', 'ID'], danceClass))
))

const getStaffFromClasses = (classes) => {
	const staff = []
	classes.map((danceClass) => {
		const staffMember = R.prop('Staff')(danceClass)
		const existingStaff = staff.find(s => s.ID === staffMember.ID)

		if (existingStaff) {
			existingStaff.roles.push(getProgramNameByID(R.path(['ClassDescription', 'Program', 'ID'], danceClass)))
			existingStaff.classTypes.push(
				slugify(R.path(['ClassDescription', 'SessionType', 'Name'], danceClass))
			)
			existingStaff.roles = R.uniq(existingStaff.roles)
			existingStaff.classTypes = R.uniq(existingStaff.classTypes)
		} else {
			const newStaffMember = Object.assign({}, staffMember)
			newStaffMember.roles = [getProgramNameByID(R.path(['ClassDescription', 'Program', 'ID'], danceClass))]
			newStaffMember.classTypes = [
				slugify(R.path(['ClassDescription', 'SessionType', 'Name'], danceClass))
			]
			newStaffMember.roles = R.uniq(newStaffMember.roles)
			newStaffMember.classTypes = R.uniq(newStaffMember.classTypes)
			staff.push(newStaffMember)
		}
	})
	return R.filter(s => s.Name !== 'Co-Work', staff)
}


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
			const defaultParams = { SourceCredentials }
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
			UserCredentials,
		},
	})
}

const getClassDescriptionsByProgram = (week, length) => (
	new Promise((resolve, reject) => {
		getClasses(week, length).then((classes) => {
			// resolve(classes)
			const programs = R.uniq(R.map(c => (
				R.path(['ClassDescription', 'Program'])(c)
			))(classes))

			const sortedClasses = R.pipe(
				R.groupBy(R.path(['ClassDescription', 'Program', 'ID'])),
				(groupedClasses => (
					Object.keys(groupedClasses).map((sourceID) => {
						const id = parseInt(sourceID, 10)
						const title = programs.find(p => p.ID === id).Name
						return {
							title,
							mboID: id,
							slug: slugify(title),
							classes: R.pipe(
								R.pluck('ClassDescription'),
								R.uniq,
							)(groupedClasses[sourceID]),
						}
					}))),
			)(classes)
			resolve(sortedClasses)
		}).catch(err => reject(err))
	})
)

/**
 * User/Auth Requests
 */

const loginUser = ({ Username, Password }) => makeMBORequest({
	endpoint: endpoints.ClientService,
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.ValidateLogin',
	resultString: 'ValidateLoginResult',
	additionalParams: { Username, Password },
})

const getRequiredFields = () => makeMBORequest({
	endpoint: endpoints.ClientService,
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.GetRequiredClientFields',
	resultString: 'GetRequiredClientFieldsResult.RequiredClientFields',
})

const getReferralTypes = () => makeMBORequest({
	endpoint: endpoints.ClientService,
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.GetClientReferralTypes',
	resultString: 'GetClientReferralTypesResult.ReferralTypes',
})

const registerUser = (clientInfo) => {
	return makeMBORequest({
		endpoint: endpoints.ClientService,
		methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.AddOrUpdateClients',
		resultString: 'AddOrUpdateClientsResult.Clients',
		additionalParams: {
			XMLDetail: 'Full',
			Clients: [
				{
					Client: clientInfo,
				},
			],
		},
	})
}

const forgotPassword = ({ Username, FirstName, LastName }) => {
	return makeMBORequest({
		endpoint: endpoints.ClientService,
		methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.SendUserNewPassword',
		resultString: 'SendUserNewPasswordResult',
		additionalParams: {
			UserFirstName: FirstName,
			UserLastName: LastName,
			UserEmail: Username,
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
			// get a list of Choreographers and JPR staff based on the upcoming schedule

			const activeStaff = getStaffFromClasses(classes)
			resolve(activeStaff)
		}).catch(err => reject(err))
	})
}

module.exports = {
	getClasses,
	getClassDescriptionsByProgram,
	getPasses,
	getActiveStaff,
	getClassDescriptions,
	loginUser,
	registerUser,
	getRequiredFields,
	getReferralTypes,
	forgotPassword,
}

const soap = require('strong-soap').soap
const R = require('ramda')

const { getPropertyByString } = require('../../utils/data')

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
	apiRoot: 'https://api.mindbodyonline.com/0_5_1/',
}

const endpoints = {
	Class: `${config.apiRoot}/ClassService.asmx`,
	Client: `${config.apiRoot}/ClientService.asmx`,
	Sale: `${config.apiRoot}/SaleService.asmx`,
	Site: `${config.apiRoot}/SiteService.asmx`,
	Staff: `${config.apiRoot}/StaffService.asmx`,
}

/**
 * Main Request function
 */

const makeMBORequest = ({
	service,
	methodString,
	resultString,
	additionalParams,
	withUserCredentials = false,
	forceArray = false,
}) => (
	new Promise((resolve, reject) => {
		soap.createClient(`${endpoints[service]}?wsdl`, {}, (soapErr, client) => {
			if (soapErr) {
				reject(soapErr)
				return
			}
			client.setEndpoint(endpoint)
			const defaultParams = { SourceCredentials }

			const params = R.pipe(
				R.mergeDeepRight(additionalParams),
				R.when(withUserCredentials, R.assoc('UserCredentials', UserCredentials)),
			)(defaultParams)

			const requestMethod = getPropertyByString(client, methodString)
			if (!requestMethod || typeof requestMethod !== 'function') {
				reject(new Error(`${methodString} is not a valid request method`))
				return
			}
			// console.log(client.describe())
			requestMethod(params, (soapErrs, response) => {
				// console.log(client.lastRequest)
				if (soapErrs) reject(soapErrs)
				// console.log(params)
				const result = getPropertyByString(response, resultString)

				// TODO: Force into array of one if configured. (Services, classes, sales..)
				resolve(result)
			})
		})
	})
)


module.exports.default = makeMBORequest

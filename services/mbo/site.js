const makeMBORequest = require('./makeMBORequest')
/**
 * Site Requests
 */

const getLocations = function getLocations() {
	return makeMBORequest({
		service: 'Site',
		methodString: 'Site_x0020_Service.Site_x0020_ServiceSoap.GetLocations',
		resultString: 'GetLocationsResult',
	})
}

const getPrograms = function getPrograms() {
	return makeMBORequest({
		service: 'Site',
		methodString: 'Site_x0020_Service.Site_x0020_ServiceSoap.GetPrograms',
		resultString: 'GetProgramsResult',
	})
}

module.exports = {
	getLocations,
	getPrograms,
}

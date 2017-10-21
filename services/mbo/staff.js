const makeMBORequest = require('./makeMBORequest')

/**
 * Staff Requests
 */

const getStaff = function getStaff() {
	return makeMBORequest({
		service: 'Staff',
		methodString: 'Staff_x0020_Service.Staff_x0020_ServiceSoap.GetStaff',
		resultString: 'GetStaffResult.StaffMembers.Staff',
	})
}

module.exports = {
	getStaff,
}

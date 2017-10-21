const makeMBORequest = require('./makeMBORequest')

/**
 * Class requests
 */

const getClassDescriptions = function getClassDescriptions() {
	return makeMBORequest({
		service: 'Class',
		methodString: 'Class_x0020_Service.Class_x0020_ServiceSoap.GetClassDescriptions',
		resultString: 'GetClassDescriptionsResult.ClassDescriptions.ClassDescription',
	})
}


const getStaff = function getStaff() {
	return makeMBORequest({
		service: 'Staff',
		methodString: 'Staff_x0020_Service.Staff_x0020_ServiceSoap.GetStaff',
		resultString: 'GetStaffResult.StaffMembers.Staff',
	})
}

const getClasses = function getClasses(week = 0, length = 1) {
	const today = new Date()
	const StartDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 * week))
	const EndDateTime = new Date(StartDateTime.getFullYear(), StartDateTime.getMonth(), StartDateTime.getDate() + (7 * length))
	return makeMBORequest({
		service: 'Class',
		methodString: 'Class_x0020_Service.Class_x0020_ServiceSoap.GetClasses',
		resultString: 'GetClassesResult.Classes.Class',
		additionalParams: {
			Fields: 'Classes.Resource',
			StartDateTime: StartDateTime.toISOString(),
			EndDateTime: EndDateTime.toISOString(),
		},
		withUserCredentials: true,
	})
}

module.exports = {
	getClassDescriptions,
	getStaff,
	getClasses,
}

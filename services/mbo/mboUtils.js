const R = require('ramda')
const { slugify } = require('../../utils/text')

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
			existingStaff.classTypes.push(slugify(R.path(['ClassDescription', 'SessionType', 'Name'], danceClass)))
			existingStaff.roles = R.uniq(existingStaff.roles)
			existingStaff.classTypes = R.uniq(existingStaff.classTypes)
		} else {
			const newStaffMember = Object.assign({}, staffMember)
			newStaffMember.roles = [getProgramNameByID(R.path(['ClassDescription', 'Program', 'ID'], danceClass))]
			newStaffMember.classTypes = [
				slugify(R.path(['ClassDescription', 'SessionType', 'Name'], danceClass)),
			]
			newStaffMember.roles = R.uniq(newStaffMember.roles)
			newStaffMember.classTypes = R.uniq(newStaffMember.classTypes)
			staff.push(newStaffMember)
		}
	})
	return R.filter(s => s.Name !== 'Co-Work', staff)
}

module.exports = {
	getProgramNameByID,
	groupClassesByProgram,
	getStaffFromClasses,
}

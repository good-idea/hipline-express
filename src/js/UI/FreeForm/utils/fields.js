import R from 'ramda'

export const checkForRequiredFields = (fieldNames, fields) => {
	const passes = R.reduce((passing, fieldToCheck) => {
		if (passing === false) return passing
		if (!fields[fieldToCheck]) {
			console.warn(`Required field '${fieldToCheck}' does not exist in the form.`)
			return false
		}
		if (fields[fieldToCheck].required) {
			if (fields[fieldToCheck].value === undefined) return false
			if (fields[fieldToCheck].value.length === 0) return false
		}
		return true
	}, true,
	)(fieldNames)
	return passes
}

export const checkForValidFields = (fieldNames, fields) => {
	// debugger
	const passes = R.reduce((passing, fieldToCheck) => {
		if (!fields[fieldToCheck]) {
			console.warn(`Required field '${fieldToCheck}' does not exist in the form.`)
			return false
		}
		if (passing === false) return passing
		return fields[fieldToCheck].valid
	}, true,
	)(fieldNames)
	return passes
}

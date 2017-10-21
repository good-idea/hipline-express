const R = require('ramda')
const { slugify } = require('../../utils/text')

const { getClasses } = require('./class')
const { getStaff } = require('./staff')
const { getStaffFromClasses } = require('./mboUtils')


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
	getClassDescriptionsByProgram,
}

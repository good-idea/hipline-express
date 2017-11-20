import R from 'ramda'

/**
 * Helpers
 */

export const filterWithKeys = (pred, obj) => R.pipe(
	R.toPairs,
	R.filter(R.apply(pred)),
	R.fromPairs,
)(obj)


const curriedFilterWithKeys = R.curry(filterWithKeys)

/**
 * Pipe Functions
 */

// Organize the raw data coming in from MBO
//
export const sortMBOFields = (content) => {
	const registrationFields = R.pipe(
		R.map(f => R.assoc('id', f.name, f)),
		R.reduce((acc, f) => R.assoc(f.name, f, acc), {}),
	)(R.prop('sourceRegistrationFields', content))
	console.log(content)
	return {
		...R.dissoc('sourceRegistrationFields', content),
		registrationFields,
	}
}


// Organize Kirby CMS Pass content
//
export const organizePassesIntoSections = (content) => {
	const sourcePasses = R.prop('sourcePasses', content)
	const sectionTitles = ['newclient', 'bundles', 'jpr', 'workshop', 'cowork', 'loveclub']
	const types = sectionTitles.map((s) => {
		const section = {}
		section.slug = s
		// The 'passes' object has hard-coded property titles, like 'jprtitle', 'jprdescription'
		section.title = sourcePasses[`${s}title`]
		section.description = sourcePasses[`${s}description`]

		// Then, there is an array of associated passes, linked to by the slug.
		// Search through the actual pass items (the children) and pluck them out.
		const associatedPasses = sourcePasses[`${s}passes`]
		if (!associatedPasses) return section
		if (associatedPasses.constructor === Array) {
			section.passes = associatedPasses.reduce((acc, current) => {
				const pass = sourcePasses.children.find(originalPass => originalPass.slug === current.slug)
				if (pass) acc.push(R.assoc('title', current.title, pass))
				return acc
			}, [])
		} else {
			section.passes = []
		}
		return section
	})

	const reg = new RegExp(sectionTitles.join('|'), 'i')
	const newPasses = R.pipe(
		R.assoc('types', types),
		curriedFilterWithKeys(key => !key.match(reg)),
	)(sourcePasses)

	return {
		...R.dissoc('sourcePasses', content),
		passes: newPasses,
	}
}

export const hoistChoreographers = content => ({
	...content,
	choreographers: R.path(['choreographers', 'children'], content),
})


export const attachChoreographersToSchedule = (content) => {
	const schedule = R.map(c => (
		R.assoc('choreographer', R.find(R.propEq('firstname', c.teacher), content.choreographers), c)
	), R.prop('schedule', content))
	return {
		...content,
		schedule,
	}
}


// Attach choreographer data to each class type if they have a class of that type in the schedule
//
export const attachChoreographersToClassTypes = (content) => {
	const types = R.map(type => (
		R.assoc('children', R.map(cl => R.assoc('choreographers', R.pipe(
			R.filter(R.propEq('mboid', cl.mboid)),
			R.pluck('choreographer'),
			R.uniq,
			R.filter(a => a !== undefined)
		)(content.schedule), cl), R.prop('children', type)), type)
	), R.path(['classtypes', 'children'], content))
	return {
		...content,
		classtypes: R.assoc('children', types, R.prop('classtypes', content)),
	}
}

export const attachClassTypesToChoreographers = (content) => {
	const choreographers = R.map(choreographer => (
		R.assoc('classtypes', R.pipe(
			// Go through the schedule and get the MBO ID of all classes that they teach
			R.filter(R.propEq('choreographer', choreographer)),
			R.pluck('mboid'),
			R.uniq,
			// Flatten all of the classtypes into an array and find the type with the matching ID
			R.map(id => R.pipe(
				R.pluck('children'),
				R.flatten,
				R.find(R.propEq('mboid', id)),
			)(R.path(['classtypes', 'children'], content))),
		)(content.schedule), choreographer)
	))(R.prop('choreographers', content))

	return {
		...content,
		choreographers,
	}
}

export const groupClassTypes = (content) => {
	console.log(content)
	const newclasstypes = R.assoc(
		'children',
		R.map(
			category => R.assoc(
				'children',
				R.reduce(
					(all, classtype) => {
						// While we're all the way in here, might as well mark the class as upcoming
						classtype.isUpcoming = (content.schedule.find(sc => sc.mboid === classtype.mboid) !== undefined)
						classtype.parsed = true
						// If the class is included in a group, don't include it in the new array
						const classIsGroupedElsewhere = category.children.find((c) => {
							if (!c.groupedclasses) return false
							if (c.groupedclasses.length === 0) return false
							if (c.groupedclasses.find(gc => gc.class === classtype.slug)) return true
							return false
						}) !== undefined
						if (classIsGroupedElsewhere) return [...all]

						// If the classtype is a group and other classes have not yet been attached,
						// attach them now and return it to the new array
						if (classtype.isgroup === true && classtype.groupedclasses) {
							return [
								...all,
								R.pipe(
									R.assoc(
										'grouped',
										R.map(
											l => R.prop('children', category).find(c => c.slug === l.class),
											classtype.groupedclasses,
										),
									),
									R.dissoc('groupedclasses'),
								)(classtype),
							]
						}

						// Or, just return it as is
						return [...all, classtype]
					},
					[],
					R.prop('children', category),
				),
				category,
			),
			R.path(['classtypes', 'children'], content),
		),
		R.prop('classtypes', content),
	)
	return {
		...content,
		classtypes: newclasstypes,
	}
}


export const parseContent = R.pipe(
	R.when(R.prop('sourcePasses'), organizePassesIntoSections),
	R.when(R.prop('sourceRegistrationFields'), sortMBOFields),
	R.when(R.path(['choreographers', 'children']), hoistChoreographers),
	R.when(R.both(R.prop('schedule'), R.prop('choreographers')), attachChoreographersToSchedule),
	R.when(R.both(R.prop('schedule'), R.prop('choreographers')), attachChoreographersToClassTypes),
	R.when(R.both(R.prop('schedule'), R.prop('choreographers')), attachClassTypesToChoreographers),
	R.when(R.both(R.prop('schedule'), R.prop('classtypes')), groupClassTypes),
)

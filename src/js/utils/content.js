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
	)(R.prop('registrationFields', content))
	return {
		...content,
		registrationFields,
	}
}


// Organize Kirby CMS Pass content
//
export const organizePassesIntoSections = (content) => {
	const sourcePasses = R.prop('passes', content)
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
				if (pass) acc.push({ title: current.title, pass })
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
		...content,
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

export const parseContent = R.pipe(
	R.when(R.prop('passes'), organizePassesIntoSections),
	R.when(R.prop('registrationFields'), sortMBOFields),
	R.when(R.path(['choreographers', 'children']), hoistChoreographers),
	R.when(R.both(R.prop('schedule'), R.prop('choreographers')), attachChoreographersToSchedule),
	R.when(R.both(R.prop('schedule'), R.prop('choreographers')), attachChoreographersToClassTypes),
	R.when(R.both(R.prop('schedule'), R.prop('choreographers')), attachClassTypesToChoreographers),
)

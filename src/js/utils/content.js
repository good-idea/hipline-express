import R from 'ramda'

/**
 * Helpers
 */

export const filterWithKeys = (pred, obj) =>
	R.pipe(
		R.toPairs,
		R.filter(R.apply(pred)),
		R.fromPairs,
	)(obj)

const curriedFilterWithKeys = R.curry(filterWithKeys)

const shuffle = array => {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1
		// And swap it with the current element.
		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}

	return array
}

const shuffleChoreographers = content => {
	const choreographers = {
		...content.choreographers,
		choreographers: shuffle(content.choreographers.children),
	}
	return {
		...content,
		choreographers,
	}
}

// Organize Kirby CMS Pass content
//
export const organizePassesIntoSections = content => {
	const sourcePasses = R.prop('sourcePasses', content)
	const sectionTitles = ['newclient', 'bundles', 'coworkbundles', 'jpr', 'workshop', 'loveclub']
	const types = sectionTitles.map(s => {
		const section = {}
		section.slug = s
		// The 'passes' object has hard-coded property titles, like 'jprtitle', 'jprdescription'
		section.title = sourcePasses[`${s}title`]
		section.description = sourcePasses[`${s}description`]
		section.passes = Array.isArray(sourcePasses[`${s}passes`]) ? sourcePasses[`${s}passes`] : []

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

// Attach choreographer data to each class type if they have a class of that type in the schedule
//
export const attachChoreographersToClassTypes = content => {
	// dig down into the actual classes:
	const classtypes = R.map(type => {
		if (!type.children) return type
		if (type.children) {
			type.children = R.map(classCard => {
				if (classCard.choreographers) {
					classCard.choreographers = R.pipe(
						R.map(chor => content.choreographers.choreographers.find(c => c.slug === chor.slug)),
						R.filter(c => c !== undefined),
					)(classCard.choreographers)
				}
				return classCard
			})(type.children)
		}
		return type
	})(content.classes.children)
	// const types = R.map(type => (
	// 	R.assoc('children', R.map(cl => R.assoc('choreographers', R.pipe(
	// 		R.filter(R.propEq('mboid', cl.mboid)),
	// 		R.pluck('choreographer'),
	// 		R.uniq,
	// 		R.filter(a => a !== undefined)
	// 	)(content.schedule), cl), R.prop('children', type)), type)
	// ), R.path(['classtypes', 'children'], content))
	return {
		...content,
		classtypes,
		// classtypes: R.assoc('children', types, R.prop('classtypes', content)),
	}
}

export const attachClassTypesToChoreographers = content => {
	const choreographers = R.map(choreographer =>
		R.assoc(
			'classtypes',
			R.pipe(
				// Go through the schedule and get the MBO ID of all classes that they teach
				R.filter(R.propEq('choreographer', choreographer)),
				R.pluck('mboid'),
				R.uniq,
				// Flatten all of the classtypes into an array and find the type with the matching ID
				R.map(id =>
					R.pipe(
						R.pluck('children'),
						R.flatten,
						R.find(R.propEq('mboid', id)),
					)(R.path(['classtypes', 'children'], content)),
				),
				R.filter(R.propEq('isVisible', true)),
			)(content.schedule),
			choreographer,
		),
	)(R.prop('choreographers', content))

	return {
		...content,
		choreographers,
	}
}

export const groupClassTypes = content => {
	const newclasstypes = R.assoc(
		'children',
		R.map(
			category =>
				R.assoc(
					'children',
					R.reduce(
						(all, classtype) => {
							// While we're all the way in here, might as well mark the class as upcoming
							classtype.isUpcoming = content.schedule.find(sc => sc.mboid === classtype.mboid) !== undefined
							classtype.parsed = true
							// If the class is included in a group, don't include it in the new array
							const classIsGroupedElsewhere =
								category.children.find(c => {
									if (!c.groupedclasses) return false
									if (c.groupedclasses.length === 0) return false
									if (c.groupedclasses.find(gc => gc.class === classtype.slug)) {
										return true
									}
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
											R.map(l => R.prop('children', category).find(c => c.slug === l.class), classtype.groupedclasses),
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

const separateFooterPages = content => {
	const { footerPages, infoPages } = R.groupBy(p => (p.is_footer ? 'footerPages' : 'infoPages'), content.infoPages)
	return {
		...content,
		footerPages: footerPages || [],
		infoPages: infoPages || [],
	}
}

export const parseContent = R.pipe(
	R.when(R.prop('choreographers'), shuffleChoreographers),
	R.when(R.prop('sourcePasses'), organizePassesIntoSections),
	R.when(R.prop('infoPages'), separateFooterPages),
	// R.when(R.path(['choreographers', 'children']), hoistChoreographers),
	R.when(R.prop('choreographers'), attachChoreographersToClassTypes),
	// R.when(R.prop('choreographers'), attachClassTypesToChoreographers),
	// R.when(R.both(R.prop('schedule'), R.prop('classtypes')), groupClassTypes),
)

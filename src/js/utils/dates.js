import dateFns from 'date-fns'
import R from 'ramda'

/**
 * Date
 */

// export const isToday = dateFns.isToday
//
export const isToday = dateFns.isToday
export const isFuture = dateFns.isFuture

export const getDateString = date => dateFns.format(date, 'YYYY-MM-DD')

export const getPrintDate = date => dateFns.format(date, 'dddd, MMMM Do')

export const groupByDay = R.pipe(
	R.groupWith((a, b) => (getDateString(a.startTime) === getDateString(b.startTime))),
	R.map(items => ({
		id: getDateString(items[0].startTime),
		printDate: getPrintDate(items[0].startTime),
		items,
	})),
)

// TODO: What is the registration cutoff time?

export const isFuturePlusFifteen = date => dateFns.isFuture(dateFns.addMinutes(date, 15))

export const format = dateFns.format

export const duration = (a, b) => {
	const length = dateFns.differenceInHours(b, a)
	const suffix = (length === 1) ? 'hour' : 'hours'
	return (`${length} ${suffix}`)
}
/**
 * Time
 */

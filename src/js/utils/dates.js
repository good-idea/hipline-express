import dateFns from 'date-fns'
import R from 'ramda'

/**
 * Date
 */

// export const isToday = dateFns.isToday
//
export const isToday = dateFns.isToday

export const groupByDay = R.groupBy(session => `${dateFns.format(session.startTime, 'YYYY-MM-DD')}`)

export const format = dateFns.format

export const duration = (a, b) => {
	const length = dateFns.differenceInHours(b, a)
	const suffix = (length === 1) ? 'hour' : 'hours'
	return (`${length} ${suffix}`)
}
/**
 * Time
 */

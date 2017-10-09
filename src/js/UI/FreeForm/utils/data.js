import { when } from 'ramda'

export const singleToArray = when(
	(a => a.constructor !== Array),
	(a => [a]),
)

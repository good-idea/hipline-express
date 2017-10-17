import { when } from 'ramda'

export const forceSingleToArray = when(
	(a => a.constructor !== Array),
	(a => [a]),
)

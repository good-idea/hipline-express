import { filter } from 'ramda'

export const filterFalsyChildren = filter(c => Boolean(c))

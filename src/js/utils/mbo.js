import R from 'ramda'

export const serializeForSoap = R.reduce((acc, current) => R.assoc(current.name, current.value, acc), {})

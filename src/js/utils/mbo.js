import R from 'ramda'

export const serializeForSoap = R.reduce((acc, current) => R.assoc(current.name, current.value, acc), {})

export const sortMBOFields = R.pipe(
	R.map(f => R.assoc('id', f.name, f)),
	R.reduce((acc, f) => R.assoc(f.name, f, acc), {}),
)

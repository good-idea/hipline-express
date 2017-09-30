const R = require('ramda')

const prepareFieldLabel = R.pipe(
	R.split(/(?=[A-Z])/),
	// capitalize,
	R.join(' '),
)

module.exports = {
	prepareFieldLabel,
}

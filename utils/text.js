const R = require('ramda')

const slugify = text => text.toString().toLowerCase().replace(/\s+/g, '-')

const prepareFieldLabel = R.pipe(
	R.split(/(?=[A-Z])/),
	// capitalize,
	R.join(' '),
)

module.exports = {
	slugify,
	prepareFieldLabel,
}

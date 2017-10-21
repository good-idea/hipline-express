const toMarkdown = require('to-markdown')
const R = require('ramda')


const forceArrayOfOne = R.when((a => a.constructor !== 'Array'), a => [a])

const HTMLToMarkdown = string => (
	toMarkdown(string.replace(/<(\/?)div>/g, '<$1p>'))
		.replace(/([\d])\\./g, '$1.')
)

const getPropertyByString = function getPropertyByString(object, path) {
	if (!object) return object
	const parts = (Array.isArray(path)) ? path : path.split('.')
	const nextPath = parts.shift()
	const current = object[nextPath]
	if (!parts.length) return current
	return getPropertyByString(current, parts)
}

module.exports = {
	HTMLToMarkdown,
	getPropertyByString,
	forceArrayOfOne,
}

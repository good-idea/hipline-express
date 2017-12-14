import parser from 'html-react-parser'
import { markdown } from 'markdown'
import R from 'ramda'

/**
 * Modify the Markdown string. Use these before converting
 */

export const fixKirbyTextAnchors = text => text.replace(/(\(link:\s?(\S*))\stext:\s?([\S ]*)\)/g, '[$3]($2)')

export const fixKirbyTextEmailLinks = R.pipe(
	R.replace(/(\(email:\s?(\S*))\stext:\s?([\S ]*)\)/g, '[$3](mailto:$2)'),
	R.replace(/(\(email:\s?(\S*))\)/g, '[$2](mailto:$2)'),
)

/**
 * Convert Markdown to HTML
 */

export const markdownToHTML = markdown.toHTML

/**
 * Edit HTML String
 */

export const removeWrappingTags = (text) => {
	const first = text.match(/^<([\w]+)>/)
	const last = text.match(/<\/([\w]+)>$/)
	if (first === last && first) {
		if (first.match(/\p|h\d|(ul)/)) return text.replace(/(^<[\w]+>)(.*)(<\/[\w]+>$)/g, '$2')
	}
	return text
}

export const wrapWith = tag => text => `<${tag}>${text}</${tag}>`

export const stripTags = allowed => (text) => {
	allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
	const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
	const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi
	return text.replace(commentsAndPhpTags, '').replace(tags, (b, a) => (
		allowed.indexOf(`<${a.toLowerCase()}>`) > -1 ? b : ''
	))
}

export const externalLinks = text => text.replace(/(<a\W?)(href="https?:\/\/)/, '$1 target="_blank" $2')

export const trimText = length => text => text.substr(0, length)

/**
 * Convert HTML to JSX
 */

export const HTMLtoJSX = text => parser(text)

/**
 * Intro Text
 * @type {[type]}
 */

const wrapAndPrepare = tag => R.pipe(
	fixKirbyTextAnchors,
	fixKirbyTextEmailLinks,
	markdownToHTML,
	externalLinks,
	removeWrappingTags,
	wrapWith(tag),
	HTMLtoJSX,
)

// const trace = (input) => { console.log(input); return input }

const prepareIntroText = R.pipe(
	R.replace(/[\s?]inspire[\s?]/, '![inspire](/images/inspire.png)'),
	R.replace(/[\s?]empower[\s?]/, '![empower](/images/empower.png)'),
	markdownToHTML,
	stripTags('<em><strong><br><img><ul><li>'),
	removeWrappingTags,
	wrapWith('h2'),
	HTMLtoJSX,
)


/**
 * Common pipes
 */

const markdownToJSX = R.pipe(
	fixKirbyTextAnchors,
	fixKirbyTextEmailLinks,
	markdownToHTML,
	externalLinks,
	HTMLtoJSX,
)

const makeParagraph = R.pipe(
	fixKirbyTextAnchors,
	markdownToHTML,
	externalLinks,
	stripTags('<a><br><p>'),
	HTMLtoJSX,
)

module.exports = {
	fixKirbyTextAnchors,
	markdownToHTML,
	HTMLtoJSX,
	removeWrappingTags,
	externalLinks,
	markdownToJSX,
	makeParagraph,
	prepareIntroText,
	wrapAndPrepare,
}

import parser from 'html-react-parser'
import { markdown } from 'markdown'
import R from 'ramda'

/**
 * Modify the Markdown string. Use these before converting
 */

export const fixKirbyTextFileLinks = R.pipe(
  R.replace(/(\(file:\s?(\S*))\stext:\s?([\S ]*)\)/g, '[$3](href:$2)'),
  R.replace(/(\(file:\s?(\S*))\)/g, '[$2](href:$2)'),
)

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

export const removeWrappingTags = text => {
  const first = text.match(/^<([\w]+)>/)
  const last = text.match(/<\/([\w]+)>$/)
  if (first === last && first) {
    if (first.match(/\p|h\d|(ul)/)) return text.replace(/(^<[\w]+>)(.*)(<\/[\w]+>$)/g, '$2')
  }
  return text
}

export const wrapWith = tag => text => `<${tag}>${text}</${tag}>`

export const stripTags = allowed => text => {
  allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
  const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi
  return text.replace(commentsAndPhpTags, '').replace(tags, (b, a) => (allowed.indexOf(`<${a.toLowerCase()}>`) > -1 ? b : ''))
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

export const wrapAndPrepare = tag =>
  R.pipe(
    fixKirbyTextAnchors,
    fixKirbyTextEmailLinks,
    markdownToHTML,
    externalLinks,
    removeWrappingTags,
    wrapWith(tag),
    HTMLtoJSX,
  )

// const trace = (input) => { console.log(input); return input }

export const prepareIntroText = R.pipe(
  // R.replace(/[\s?]inspire[\s?]/, '![inspire](/images/inspire.png)'),
  // R.replace(/[\s?]empower[\s?]/, '![empower](/images/empower.png)'),
  markdownToHTML,
  stripTags('<em><strong><br><img><ul><li>'),
  removeWrappingTags,
  wrapWith('h2'),
  HTMLtoJSX,
)

export const prepareSubtitleText = R.pipe(
  markdownToHTML,
  stripTags('<em><strong><br><img><ul><li>'),
  removeWrappingTags,
  wrapWith('h3'),
  HTMLtoJSX,
)

/**
 * Common pipes
 */

export const fixKirbyText = R.pipe(
  fixKirbyTextFileLinks,
  fixKirbyTextAnchors,
  fixKirbyTextEmailLinks,
)

export const markdownToJSX = R.pipe(
  fixKirbyText,
  markdownToHTML,
  externalLinks,
  HTMLtoJSX,
)

export const makeParagraph = R.pipe(
  fixKirbyText,
  markdownToHTML,
  externalLinks,
  stripTags('<a><br><p><li><ul><ol><h1><h2><h3><h4><em><strong>'),
  HTMLtoJSX,
)

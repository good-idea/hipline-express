import tweenFunctions from 'tween-functions'

export const fillArray = (value, length) => {
  const arr = []
  while (arr.length < length) arr.push(value)
  return arr
}

/**
 * Cheap shallow equalitly checker
 */

export const isEqual = (obj1, obj2) => {
  // return (JSON.stringify(obj1) === JSON.stringify(obj2))
  const obj1keys = Object.keys(obj1)

  for (const key of obj1keys) {
    if (!obj2.hasOwnProperty(key)) return false
    if (obj1[key] != obj2[key]) {
      return false
    }
  }
  return true
}

/**
 * Return the offset relative to the document
 */

export const getOffset = (element, container = {}) => {
  // crossbrowser version
  const box = element.getBoundingClientRect()

  const { body } = document
  const docEl = document.documentElement

  const scrollTop = container.scrollTop || window.pageYOffset || docEl.scrollTop || body.scrollTop
  const scrollLeft = container.scrollLeft || window.pageXOffset || docEl.scrollLeft || body.scrollLeft
  const clientTop = body.getBoundingClientRect().top || 0
  const clientLeft = body.getBoundingClientRect().left || 0

  const top = box.top + (scrollTop - clientTop)
  const left = box.left + (scrollLeft - clientLeft)

  return { top: Math.round(top), left: Math.round(left) }
}

/*
 TODO:
  - Validate destination as int or dom element
 */

export const scrollTo = (destination, overrides) => {
  if (destination === undefined) {
    console.warn('scollTo called with no destination')
    return
  }
  const defaults = {
    container: document.body,
    duration: 600,
    easing: 'easeOutQuad',
  }
  const config = { ...defaults, ...overrides }
  if (typeof tweenFunctions[config.easing] !== 'function') {
    console.warn(`${config.easing} is not a valid easing function.`)
    config.easing = defaults.easing
  }

  const startY = config.container.scrollTop
  const containerTop = getOffset(config.container).top
  const targetTop = getOffset(destination, config.container).top
  const destY = targetTop

  const startTime = Date.now()

  if (config.duration === 0) {
    config.container.scrollTop = destY
    if (config.callback) config.callback()
    return
  }

  if (startY === destY) {
    if (config.callback) config.callback()
    return
  }
  function tween() {
    const elapsed = Math.min(Date.now() - startTime, config.duration)
    const newTop = tweenFunctions[config.easing](elapsed, startY, destY, config.duration)
    config.container.scrollTop = newTop
    if (elapsed < config.duration) {
      requestAnimationFrame(tween)
    } else if (config.callback) {
      config.callback()
    }
  }

  requestAnimationFrame(tween)
}

/**
 * Combines any number of array or string arguments into a single, space-separated className string
 * @param  {string|array} input		'class1', ['class2', 'class1--modifier'], 'class3'
 * @return {string}       				'class1 class2 class1--modifier class3'
 */
export const cn = (...input) => {
  const allNames = []
  for (const piece of input) {
    if (piece) {
      if (typeof piece === 'string') {
        allNames.push(...piece.split(' '))
      } else if (piece.constructor === Array) {
        allNames.push(...piece)
      } else {
        console.warn(`Input must be string or array, ${typeof piece} given.`)
      }
    }
  }
  return allNames.join(' ')
}

export const findOne = (haystack, needles) => needles.some(needle => haystack.indexOf(needle) >= 0)

export const slugify = text =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')

function makeChildrenArray(childNodes) {
  const arr = []
  for (let i = 0; i < childNodes.length; i += 1) {
    arr.push(childNodes[i])
  }
  return arr
}

function matchesSelector(element, selector) {
  for (let i = 0; i < element.classList.length; i += 1) {
    if (element.classList[i] === selector) return true
  }
  return false
}

function findFirstChildWithClass(element, handleClass, levels = 5) {
  if (matchesSelector(element, handleClass)) return element
  if (levels > 0 && element.children) {
    for (let i = 0; i < element.children.length; i += 1) {
      const newLevel = levels - 1
      const search = findFirstChildWithClass(element.children[i], handleClass, newLevel)
      if (search) return search
    }
  }
  return false
}

module.exports = {
  makeChildrenArray,
  matchesSelector,
  findFirstChildWithClass,
}

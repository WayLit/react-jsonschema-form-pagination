export function fetchField({ property, argument }) {
  if (property === 'instance') {
    return argument
  } else {
    const fullField = property.startsWith('instance')
      ? property.substring(9)
      : property.substring(1)
    const nextArrSep = fullField.indexOf('[')
    const nextFieldSep = fullField.indexOf('.')
    const nextSeparator =
      nextArrSep !== -1 && nextFieldSep !== -1
        ? Math.min(nextArrSep, nextFieldSep)
        : Math.max(nextArrSep, nextFieldSep)
    if (nextSeparator === -1) {
      return fullField
    } else {
      return fullField.substring(0, nextSeparator)
    }
  }
}

const errorHandler = (navTree, transformErrors) => errors => {
  const errorsWithNav = errors.map(error => {
    const field = fetchField(error)
    const activeNav = navTree.findActiveNav(field)
    if (activeNav && activeNav.length > 0) {
      return Object.assign({ activeNav }, error)
    } else {
      return error
    }
  })

  if (transformErrors) {
    return transformErrors(errorsWithNav)
  } else {
    return errorsWithNav
  }
}

export default errorHandler

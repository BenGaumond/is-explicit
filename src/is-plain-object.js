import is from './is'

/******************************************************************************/
// Data
/******************************************************************************/

const { toString } = Object.prototype

/******************************************************************************/
// Main
/******************************************************************************/

const isPlainObject = value => {

  if (typeof value !== 'object' || value === null)
    return false

  if (is(Object.getPrototypeOf, Function)) {
    const proto = Object.getPrototypeOf(value)
    return proto === Object.prototype || proto === null
  }

  return toString.call(value) === '[object Object]'
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default isPlainObject

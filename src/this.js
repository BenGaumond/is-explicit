import is from './is'
import isPlainObject from './is-plain-object'
import isArrayOf from './is-array-of'
import isObjectOf from './is-object-of'

function isThis (...args) {
  return is(this, ...args)
}

function isThisPlainObject (...args) {
  return isPlainObject(this, ...args)
}

function isThisArrayOf (...args) {
  return isArrayOf(this, ...args)
}

function isThisObjectOf (...args) {
  return isObjectOf(this, ...args)
}

isThis.plainObject = isThisPlainObject
isThis.arrayOf = isThisArrayOf
isThis.objectOf = isThisObjectOf

export default isThis

export { isThisPlainObject, isThisArrayOf, isThisObjectOf }

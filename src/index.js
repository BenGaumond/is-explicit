import is from './is'
import isPlainObject from './is-plain-object'
import isArrayOf from './is-array-of'
import isObjectOf from './is-object-of'

is.plainObject = isPlainObject
is.arrayOf = isArrayOf
is.objectOf = isObjectOf

export default is

export { isPlainObject, isArrayOf, isObjectOf }

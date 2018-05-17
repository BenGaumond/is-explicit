import is from './is'
import isPlainObject, { isArrayOfPlainObject } from './is-plain-object'
import isArrayOf from './is-array-of'
import isObjectOf from './is-object-of'
import isInstanceable from './is-instanceable'
import isDefined from './is-defined'
import isSubclassOf from './is-subclass-of'

/******************************************************************************/
// Data
/******************************************************************************/

const PRIMITIVES = [ Boolean, Number, String ]

/******************************************************************************/
// Extends
/******************************************************************************/

is.defined = isDefined
is.arrayOf = isArrayOf
is.objectOf = isObjectOf
is.plainObject = isPlainObject
is.instanceable = isInstanceable
is.subclassOf = isSubclassOf

is.string = String::is
is.number = Number::is
is.bool = Boolean::is
is.object = Object::is
is.func = Function::is
is.symbol = Symbol::is
is.primitive = PRIMITIVES::is

is.arrayOf.string = String::isArrayOf
is.arrayOf.number = Number::isArrayOf
is.arrayOf.bool = Boolean::isArrayOf
is.arrayOf.object = Object::isArrayOf
is.arrayOf.func = Function::isArrayOf
is.arrayOf.symbol = Symbol::isArrayOf
is.arrayOf.primitive = PRIMITIVES::isArrayOf
is.arrayOf.plainObject = isArrayOfPlainObject

is.objectOf.string = String::isObjectOf
is.objectOf.number = Number::isObjectOf
is.objectOf.bool = Boolean::isObjectOf
is.objectOf.object = Object::isObjectOf
is.objectOf.func = Function::isObjectOf
is.objectOf.symbol = Symbol::isObjectOf
is.objectOf.primitive = PRIMITIVES::isObjectOf

/******************************************************************************/
// Exports
/******************************************************************************/

export default is

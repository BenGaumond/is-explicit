import is from './is'
import isPlainObject from './is-plain-object'
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

is.arrayOf = isArrayOf
is.objectOf = isObjectOf
is.subclassOf = isSubclassOf

is.string = value => typeof value === 'string'
is.number = value => typeof value === 'number' && !Number.isNaN(value)
is.bool = value => typeof value === 'boolean'
is.object = value => value !== null && typeof value === 'object'
is.func = value => typeof value === 'function'
is.function = is.func
is.symbol = value => typeof value === 'symbol'
is.array = Array.isArray
is.date = value => value instanceof Date
is.promise = value => value instanceof Promise
is.primitive = PRIMITIVES::is
is.nan = Number.isNaN
is.NaN = Number.isNaN
is.plainObject = isPlainObject
is.instanceable = isInstanceable
is.defined = isDefined
is.truthy = value => !!value
is.falsy = value => !value

/******************************************************************************/
// Temp
/******************************************************************************/

const isArrayAndPassesTest = (array, test) =>
  is.array(array) &&
  array.length > 0 &&
  array.every(test)

const isObjectAndPassesTest = (obj, test) => {
  if (!is.object(obj))
    return false

  let atLeastOneKey = false
  for (const key in obj)
    if (!test(obj[key]))
      return false
    else
      atLeastOneKey = true

  return atLeastOneKey
}

const name = (object, name) => Object.defineProperty(object, 'name', { value: name })

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

// Add arrayOf and objectOf to each shotcut test
for (const shortcut of [
  'string',
  'number',
  'bool',
  'object',
  'func',
  'function',
  'symbol',
  'array',
  'date',
  'promise',
  'primitive',
  'nan',
  'NaN',
  'plainObject',
  'instanceable',
  'defined',
  'truthy',
  'falsy'
]) {
  const isShortcut = is[shortcut]

  // add shortcuts
  is.arrayOf[shortcut] = value => isArrayAndPassesTest(value, isShortcut)
  is.objectOf[shortcut] = value => isObjectAndPassesTest(value, isShortcut)

  // add names
  name(is.arrayOf[shortcut], `isArrayOf${capitalize(shortcut)}`)
  name(is.objectOf[shortcut], `isObjectOf${capitalize(shortcut)}`)
  if (isShortcut && (!isShortcut.name || isShortcut.name.includes('bound')))
    name(isShortcut, `is${capitalize(shortcut)}`)
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default is

import isInstanceable from './is-instanceable'

// This is a pain in the ass, but without it the babel transpile breaks Symbol
// checking, because Symbol !== require('babel-runtime/core-js/symbol')

/******************************************************************************/
// Helper
/******************************************************************************/

const TESTS = {
  string:    type => type === String,
  boolean:   type => type === Boolean,
  number:   (type, value) => type === Number && !Number.isNaN(value),
  symbol:    type => type === Symbol,
  function: (type, value) => type === Function,

  object:   (type, value) => type === Object
    ? value !== null
    : type === Array
      ? Array.isArray(value)
      : value instanceof type,

  undefined: type => false
}

function typeIsValid (type, isArray = Array.isArray(type)) {
  return isArray
    ? type.length > 0 && type.every(isInstanceable)
    : isInstanceable(type)
}

/******************************************************************************/
// Main
/******************************************************************************/

function is (value, type) {

  type = this || type

  const typesAsArray = Array.isArray(type)

  // Validate type arguments
  if (!typeIsValid(type, typesAsArray))
    throw new Error(`${typesAsArray ? 'types' : 'type'} ` +
    `${typesAsArray ? 'are' : 'is'} expected to be ` +
    `${typesAsArray ? 'an array of' : 'a'} prototypal ` +
    `${typesAsArray ? 'functions' : 'function'}`)

  // Test types
  const test = TESTS[typeof value]
  if (!typesAsArray)
    return test(type, value)

  for (const t of type)
    if (test(t, value))
      return true

  return false

}

/******************************************************************************/
// Exports
/******************************************************************************/

export default is

export { typeIsValid }

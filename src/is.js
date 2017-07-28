
// This is a pain in the ass, but without it the babel transpile breaks Symbol
// checking, because Symbol !== require('babel-runtime/core-js/symbol')

/* eslint-disable no-undef, indent */
const $Symbol =
    typeof window === 'object' ? window.Symbol
  : typeof global === 'object' ? global.Symbol
  : Symbol

/* eslint-enable */

export default function is (value, ...types) {

  // Validate value argument
  if (arguments.length === 0)
    throw new Error('is expects at least one value and optionally a variable number of type arguments')

  // Validate type arguments
  for (let i = 0; i < types.length; i++) {
    const type = types[i]
    if (typeof type !== 'function')
      throw new Error('types, if supplied, are expected to be of type \'function\'')
  }

  // Type not supplied
  if (types.length === 0)
    return value !== undefined && value !== null && !Number.isNaN(value)

  // Test types
  const valueType = typeof value
  for (let i = 0; i < types.length; i++) {
    const type = types[i]

    if (valueType === 'string' && type === String)
      return true

    else if (valueType === 'boolean' && type === Boolean)
      return true

    else if (valueType === 'number' && type === Number && !Number.isNaN(value))
      return true

    else if (valueType === 'symbol' && type === $Symbol)
      return true

    else if (valueType === 'function' && type === Function)
      return true

    else if (value instanceof type)
      return true
  }

  // All failed
  return false
}

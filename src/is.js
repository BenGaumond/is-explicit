
//This is a pain in the ass, but without it the babel transpile breaks Symbol
//checking, because Symbol !== require('babel-runtime/core-js/symbol')

const $Symbol =
    typeof window === 'object' ? window.Symbol //eslint-disable-line no-undef
  : typeof global === 'object' ? global.Symbol
  : Symbol

export default function is(value, ...types)
{
  //Validate value argument
  if (arguments.length === 0)
    throw new Error('is expects at least one value and optionally a variable number of type arguments')

  //Validate type arguments
  for (let i = 0; i < types.length; i++) {
    const type = types[i]
    if (typeof type !== 'function')
      throw new Error('types, if supplied, are expected to be of type \'function\'')
  }

  //Type not supplied
  if (types.length === 0)
    return value !== undefined && value !== null && !Number.isNaN(value)

  //Test types
  const value_type = typeof value
  for (let i = 0; i < types.length; i++) {
    const type = types[i]

    if (value_type === 'string' && type === String)
      return true

    else if (value_type === 'boolean' && type === Boolean)
      return true

    else if (value_type === 'number' && type === Number && !Number.isNaN(value))
      return true

    else if (value_type === 'symbol' && type === $Symbol)
      return true

    else if (value_type === 'function' && type === Function)
      return true

    else if (value instanceof type)
      return true
  }

  //All failed
  return false
}

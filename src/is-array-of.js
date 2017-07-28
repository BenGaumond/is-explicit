import is from './is'

export default function isArrayOf (array, ...types) {

  if (types.length === 0)
    throw new Error('is.arrayOf requires at least one type.')

  if (!is(array, Array) || array.length === 0)
    return false

  for (const value of array)
    if (!is(value, ...types))
      return false

  return true

}

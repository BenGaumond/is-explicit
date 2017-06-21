import is from './is'

export default function isArrayOf(array, ...types) {

  if (!is(array, Array))
    return false

  for (const value of array)
    if (!is(value, ...types))
      return false

  return true

}

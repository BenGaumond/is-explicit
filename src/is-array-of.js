import is, { typeIsValid } from './is'

/******************************************************************************/
// Main
/******************************************************************************/

function isArrayOf (array, type) {

  if (this != null && this !== is)
    type = this

  if (!typeIsValid(type))
    throw new Error('is.arrayOf requires at least one type.')

  if (!is(array, Array) || array.length === 0)
    return false

  for (const value of array)
    if (!is(value, type))
      return false

  return true

}

/******************************************************************************/
// Exports
/******************************************************************************/

export default isArrayOf

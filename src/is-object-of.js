import is, { typeIsValid } from './is'

/******************************************************************************/
// Main
/******************************************************************************/

function isObjectOf (object, type) {

  if (this != null && this !== is)
    type = this

  if (!typeIsValid(type))
    throw new Error('is.objectOf requires at least one type.')

  if (!is(object, Object))
    return false

  let atLeastOneKey = false

  for (const key in object)
    if (!is(object[key], type))
      return false
    else
      atLeastOneKey = true

  return atLeastOneKey

}

/******************************************************************************/
// Exports
/******************************************************************************/

export default isObjectOf

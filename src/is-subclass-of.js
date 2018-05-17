import is, { typeIsValid } from './is'
import isInstanceable from './is-instanceable'

/******************************************************************************/
// Prototype Test
/******************************************************************************/

function isConstructorOrInstanceOf (prototype, type) {

  return prototype.constructor === type || prototype instanceof type
}
/******************************************************************************/
// Main
/******************************************************************************/

function isSubclassOf (value, type) {
  if (this != null && this !== is)
    type = this

  const arrayOfTypes = Array.isArray(type)

  if (!typeIsValid(type, arrayOfTypes))
    throw new Error('is.subclassOf requires at least one type.')

  if (!isInstanceable(value))
    return false

  const { prototype } = value

  if (!arrayOfTypes)
    return isConstructorOrInstanceOf(prototype, type)

  for (const t of type)
    if (isConstructorOrInstanceOf(prototype, t))
      return true

  return false
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default isSubclassOf

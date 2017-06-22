import is from './is'

export default function isObjectOf(object, ...types) {

  if (types.length === 0)
    throw new Error('is.objectOf requires at least one type.')

  if (is(object, Array))
    return false

  let atLeastOneKey = false

  for (const key in object)
    if (!is(object[key], ...types))
      return false
    else
      atLeastOneKey = true

  return atLeastOneKey

}

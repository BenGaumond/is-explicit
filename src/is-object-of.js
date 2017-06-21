import is from './is'

export default function isObjectOf(object, ...types) {

  if (is(object, Array))
    return false

  for (const key in object)
    if (!is(object[key], ...types))
      return false

  return true

}

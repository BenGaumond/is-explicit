import is from './is'

export default function isPlainObject (object) {

  if (typeof object !== 'object' || object === null)
    return false

  if (is(Object.getPrototypeOf, Function)) {
    const proto = Object.getPrototypeOf(object)
    return proto === Object.prototype || proto === null
  }

  return Object.prototype.toString.call(object) === '[object Object]'
}

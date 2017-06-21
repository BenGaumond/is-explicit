import is from './is'

export default function isPlainObject(object) {

  return is(object, Object) && object.constructor === Object

}

import { expect } from 'chai'
import is from './index'

import isDefined from './is-defined'
import isArrayOf from './is-array-of'
import isObjectOf from './is-object-of'
import isInstanceable from './is-instanceable'
import isSubclassOf from './is-subclass-of'
import isPlainObject, { isArrayOfPlainObject } from './is-plain-object'
// eslint-disable-next-line no-unused-vars
/* global describe it before after beforeEach afterEach */

class Foo {

}

const VALUES = [
  'string',
  100,
  NaN,
  true,
  undefined,
  null,
  function () {},
  Symbol('symbol'),
  [],
  {},
  Array,
  Foo,
  new Foo()
]

const ARRAY_VALUES = [
  ...VALUES,
  ...VALUES.map(v => [ v ])
]

function testEachValue ({ title, test, result, msg }) {
  it(title, () => {
    for (const value of ARRAY_VALUES)
      expect(test(value)).to.be.equal(result(value))
  })
}

describe('is() shortcuts give same output as counterparts', () => {

  const TYPES = {
    string: String,
    number: Number,
    bool: Boolean,
    func: Function,
    object: Object,
    symbol: Symbol,
    primitive: [ String, Boolean, Number ]
  }

  for (const key in TYPES)
    testEachValue({
      title: `is.${key}`,
      test: value => is[key](value),
      result: value => is(value, TYPES[key])
    })

  testEachValue({
    title: `is.defined`,
    test: value => is.defined(value),
    result: value => isDefined(value)
  })

  for (const key in TYPES)
    testEachValue({
      title: `is.arrayOf(value, ${TYPES[key]})`,
      test: value => is.arrayOf(value, TYPES[key]),
      result: value => isArrayOf(value, TYPES[key])
    })

  for (const key in TYPES)
    testEachValue({
      title: `is.arrayOf.${key}`,
      test: value => is.arrayOf[key](value),
      result: value => TYPES[key]::is.arrayOf(value)
    })

  testEachValue({
    title: 'is.arrayOf.plainObject',
    test: value => is.arrayOf.plainObject(value),
    result: value => isArrayOfPlainObject(value)
  })

  for (const key in TYPES)
    testEachValue({
      title: `is.objectOf(value, ${TYPES[key]})`,
      test: value => is.objectOf(value, TYPES[key]),
      result: value => isObjectOf(value, TYPES[key])
    })

  testEachValue({
    title: `is.plainObject`,
    test: value => is.plainObject(value),
    result: value => isPlainObject(value)
  })

  for (const key in TYPES)
    testEachValue({
      title: `is.objectOf.${key}`,
      test: value => is.objectOf[key](value),
      result: value => TYPES[key]::is.objectOf(value)
    })

  testEachValue({
    title: `is.instanceable`,
    test: value => is.instanceable(value),
    result: value => isInstanceable(value)
  })

  for (const key in TYPES)
    testEachValue({
      title: `is.subclassOf(value, ${TYPES[key]})`,
      test: value => is.subclassOf(value, TYPES[key]),
      result: value => isSubclassOf(value, TYPES[key])
    })

})

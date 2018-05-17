import isPlainObject from './is-plain-object'
import { expect } from 'chai'

/* globals describe it */

describe('is.plainObject()', () => {

  describe('determine if a value is a plain object', () => {

    it('is.plainObject([\'str\'])                 == false',
      () => expect(isPlainObject(['str'])).to.equal(false)
    )

    it('is.plainObject(new Date())              == false',
      () => expect(isPlainObject(new Date())).to.equal(false)
    )

    it('is.plainObject({})                      == true',
      () => expect(isPlainObject({})).to.equal(true)
    )

    it('is.plainObject(new Object())            == true',
      () => expect(isPlainObject(Object({}))).to.equal(true)
    )

    it('is.plainObject(new function FooBar(){}) == false',
      () => expect(isPlainObject(new function FooBar () {}())).to.equal(false)
    )

    it('is.plainObject(Object.create(null))     == true',
      () => expect(isPlainObject(Object.create(null))).to.equal(true)
    )

  })
})

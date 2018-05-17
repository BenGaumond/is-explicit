import { expect } from 'chai'
import isSubclassOf from './is-subclass-of'

// eslint-disable-next-line no-unused-vars
/* global describe it before after beforeEach afterEach */

class Foo {}

class SubFoo extends Foo {}

describe('isSubclassOf', () => {

  it('returns true if input is subclass of type', () => {

    expect(isSubclassOf(SubFoo, Foo))
      .to.be.equal(true)
  })

  it('returns true if input is type', () => {
    expect(isSubclassOf(Foo, Foo))
      .to.be.equal(true)
  })

  it('returns false otherwise', () => {
    for (const bad of [ Object, 'foo', {}, new Foo(), Symbol('') ])
      expect(isSubclassOf(bad, Foo))
        .to.be.equal(false)
  })

  it('requires at least one type', () => {
    expect(() => isSubclassOf(Foo))
      .to.throw('requires at least one type')
  })

})

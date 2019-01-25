import { expect } from 'chai'
import isObjectOf from './is-object-of'

// eslint-disable-next-line no-unused-vars
/* global describe it before after beforeEach afterEach */

describe('isObjectOf()', () => {

  it('requires at least one type', () => {
    expect(() => isObjectOf({})).to.throw('is.objectOf requires at least one type.')
  })

  describe('determine if value is object of types', () => {

    it('is.objectOf([0,\'string\'], String)               == false',
      () => expect(isObjectOf([0, 'string'], String)).to.equal(false)
    )

    it('is.objectOf({}, String)                         == false',
      () => expect(isObjectOf({}, String)).to.equal(false)
    )

    it('is.objectOf({foo: \'1\', bar: \'2\'}, String)       == true',
      () => expect(isObjectOf({ foo: '1', bar: '2' }, String)).to.equal(true)
    )

    it('is.objectOf({foo: \'1\', bar: 2}, [String, Number]) == true',
      () => expect(isObjectOf({ foo: '1', bar: 2 }, [String, Number])).to.equal(true)
    )

  })

})

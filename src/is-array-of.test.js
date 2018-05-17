import { expect } from 'chai'
import isArrayOf from './is-array-of'

// eslint-disable-next-line no-unused-vars
/* global describe it before after beforeEach afterEach */

describe('isArrayOf()', () => {

  it('requires at least one type', () => {
    expect(() => isArrayOf([]))
      .to.throw('is.arrayOf requires at least one type.')
  })

  describe('determine if value is array of types', () => {

    it('isArrayOf([], String) == false',
      () => expect(isArrayOf([], String))
        .to.equal(false)
    )

    it('isArrayOf([\'str\'], String) == true',
      () => expect(isArrayOf(['str'], String))
        .to.equal(true)
    )

    it('isArrayOf([0,false,new Date(), \'str\'], String) == false',
      () => expect(isArrayOf([0, false, new Date(), 'str'], String))
        .to.equal(false)
    )

    it('isArrayOf([0,\'str\',10,\'cake\'], [String, Number]) == true',
      () => expect(isArrayOf([0, 'str', 10, 'cake'], [String, Number]))
        .to.equal(true)
    )
  })

})

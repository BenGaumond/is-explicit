import { expect } from 'chai'
import { inspect } from 'util'
import isInstanceable from './is-instanceable'

// eslint-disable-next-line no-unused-vars
/* global describe it before after beforeEach afterEach */

describe('isInstanceable()', () => {

  describe('returns true if input is function that can be instanced', () => {

    const anon = function () {}
    const instanceable = [
      class Foo {},
      function Bar () {},
      anon,
      Array,
      Number,
      String,
      Object,
      RegExp,
      Date,
      Function
    ]

    for (const i of instanceable)
      it(`${inspect(i)} should be true`, () => {
        expect(isInstanceable(i)).to.be.equal(true)
      })

  })

  describe('returns false otherwise', () => {

    const arrow = () => {}
    const bad = [
      {},
      'bar',
      null,
      undefined,
      Object.create,
      arrow,
      Math,
      Array.from,
      0,
      NaN,
      Number.isNaN,
      isNaN,
      isFinite
    ]

    for (const b of bad)
      it(`${inspect(b)} should be false`, () => {
        expect(isInstanceable(b)).to.be.equal(false)
      })

  })

})

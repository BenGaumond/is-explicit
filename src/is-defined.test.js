import { expect } from 'chai'
import isDefined from './is-defined'

// eslint-disable-next-line no-unused-vars
/* global describe it before after beforeEach afterEach */

describe('is.defined', () => {

  it('is.defined(undefined) == false', () => expect(isDefined(undefined)).to.equal(false))
  it('is.defined(null)      == false', () => expect(isDefined(null)).to.equal(false))
  it('is.defined(NaN)       == false', () => expect(isDefined(NaN)).to.equal(false))
  it('is.defined(10)        == true', () => expect(isDefined(10)).to.equal(true))
  it('is.defined(false)     == true', () => expect(isDefined(false)).to.equal(true))

})

import { expect } from 'chai'
import is from '../../is-explicit'

/* globals describe it */

describe('is()', ()=> {

  describe('arguments', () => {

    const ib = (...args) => is.bind(null, ...args)

    it('must be called with at least one argument', ()=> {
      expect(ib()).to.throw('is expects at least one value and optionally a variable number of type arguments')
    })

    it('requires type arguments, if supplied, to be Functions', ()=> {
      [Array, Function, Object, String, Boolean, Number, function(){}].forEach( func => {
        expect(ib(null, func)).to.not.throw(Error)
      });

      [new Array(), {foo:'bar'}, 'oh hai', true, -5].forEach( value => {
        expect(ib(null, value)).to.throw(Error)
      })
    })

  })

  describe('determine if first argument has value', () => {

    it('is(undefined) == false', () => expect(is(undefined)).to.equal(false))
    it('is(null)      == false', () => expect(is(null)).to.equal(false))
    it('is(NaN)       == false', () => expect(is(NaN)).to.equal(false))
    it('is(10)        == true', () => expect(is(10)).to.equal(true))
    it('is(false)     == true', () => expect(is(false)).to.equal(true))

  })

  describe('determine if first argument is a specific type', () => {

    it('is([], Object)                 == true', () => expect(is([], Object)).to.equal(true))
    it('is([], Array)                  == true', () => expect(is([], Array)).to.equal(true))
    it('is(true, Boolean)              == true', () => expect(is(true, Boolean)).to.equal(true))
    it('is(10, Number)                 == true', () => expect(is(10, Number)).to.equal(true))
    it('is("str", String)              == true', () => expect(is('str', String)).to.equal(true))
    it('is("str", Object)              == false',() => expect(is('str', Object)).to.equal(false))
    it('is(new String("str"), String)  == true', () => expect(is(new String('str'), String)).to.equal(true))
    it('is(new String("str"), Object)  == true', () => expect(is(new String('str'), Object)).to.equal(true))
    it('is(/expr/, RegExp)             == true', () => expect(is(/expr/, RegExp)).to.equal(true))
    it('is(/expr/, Object)             == true', () => expect(is(/expr/, Object)).to.equal(true))
    it('is(function(){}, Object)       == true', () => expect(is(function(){}, Object)).to.equal(true))
    it('is(function(){}, Function)     == true', () => expect(is(function(){}, Function)).to.equal(true))
    it('is(new function(){}, Object)   == true', () => expect(is(new function(){}, Object)).to.equal(true))
    it('is(new function(){}, Function) == false',() => expect(is(new function(){}, Function)).to.equal(false))
    it('is(Array, Object)              == true', () => expect(is(Array, Object)).to.equal(true))
    it('is(Array, Function)            == true', () => expect(is(Array, Function)).to.equal(true))
    it('is(Array, Array)               == false',() => expect(is(Array, Array)).to.equal(false))

  })

  describe('determine if first argument is a custom type', () => {

    function Foo(){}
    function Bar(){}

    it('is(new Foo(), Foo) == true', () => expect(is(new Foo(), Foo)).to.equal(true))
    it('is(new Bar(), Foo) == false',() => expect(is(new Bar(), Foo)).to.equal(false))

  })

  describe('determine if first argument is one of multiple types', () => {

    it('is("str", Number, Boolean, String) == true', ()=> expect(is('str', Number, Boolean, String)).to.equal(true))
    it('is({}, Number, Boolean, String)    == false', ()=> expect(is({}, Number, Boolean, String)).to.equal(false))

  })

})

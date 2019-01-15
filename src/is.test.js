import { expect } from 'chai'
import is from './is'

/* globals describe it */

/* eslint-disable comma-spacing, no-new-wrappers, space-before-function-paren, space-before-blocks, new-parens, no-new-object */

describe('is()', () => {

  describe('arguments', () => {

    const isNull = (...args) => is(null, ...args)

    it('requires type arguments to be Functions', () => {
      [Array, Function, Object, String, Boolean, Number, function () {}].forEach(func => {
        expect(() => isNull(func)).to.not.throw(Error)
      });

      [{foo: 'bar'}, 'oh hai', true, -5].forEach(value => {
        expect(() => isNull(value)).to.throw('type is expected to be a prototypal function')
      })
    })

  })

  describe('determine if first argument is a specific type', () => {

    it('is([], Object)                 == true', () => expect(is([], Object)).to.equal(true))
    it('is([], Array)                  == true', () => expect(is([], Array)).to.equal(true))
    it('is(true, Boolean)              == true', () => expect(is(true, Boolean)).to.equal(true))
    it('is(10, Number)                 == true', () => expect(is(10, Number)).to.equal(true))
    it('is(NaN, Number)                == true', () => expect(is(NaN, Number)).to.equal(false))
    it('is("str", String)              == true', () => expect(is('str', String)).to.equal(true))
    it('is("str", Object)              == false',() => expect(is('str', Object)).to.equal(false))
    it('is(new String("str"), String)  == true', () => expect(is(new String('str'), String)).to.equal(true))
    it('is(new String("str"), Object)  == true', () => expect(is(new String('str'), Object)).to.equal(true))
    it('is(/expr/, RegExp)             == true', () => expect(is(/expr/, RegExp)).to.equal(true))
    it('is(/expr/, Object)             == true', () => expect(is(/expr/, Object)).to.equal(true))
    it('is(function(){}, Object)       == false', () => expect(is(function(){}, Object)).to.equal(false))
    it('is(function(){}, Function)     == true', () => expect(is(function(){}, Function)).to.equal(true))
    it('is(new function(){}, Object)   == true', () => expect(is(new function(){}, Object)).to.equal(true))
    it('is(new function(){}, Function) == false',() => expect(is(new function(){}, Function)).to.equal(false))
    it('is(Array, Object)              == false', () => expect(is(Array, Object)).to.equal(false))
    it('is(Array, Function)            == true', () => expect(is(Array, Function)).to.equal(true))
    it('is(Array, Array)               == false',() => expect(is(Array, Array)).to.equal(false))
    it('is(new Date(), Date)           == true', () => expect(is(new Date(), Date)).to.equal(true))
    it('is(new Date(), Object)         == true', () => expect(is(new Date(), Object)).to.equal(true))
    it('is(Symbol(), Symbol)           == true', () => expect(is(Symbol('1'), Symbol)).to.equal(true))
    it('is(Symbol.iterator, Symbol)    == true', () => expect(is(Symbol.iterator, Symbol)).to.equal(true))
    it('is(Symbol(), Object)           == false',() => expect(is(Symbol('2'), Object)).to.equal(false))
    it('is(undefined, Object)          == false',() => expect(is(undefined, Object)).to.equal(false))
    it('is(null, Object)               == false',() => expect(is(null, Object)).to.equal(false))
    it('is(Object.create(null), Object)== true',() => expect(is(Object.create(null), Object)).to.equal(true))

  })

  describe('determine if first argument is a custom type', () => {

    function Foo(){}
    function Bar(){}

    it('is(new Foo(), Foo) == true', () => expect(is(new Foo(), Foo)).to.equal(true))
    it('is(new Bar(), Foo) == false',() => expect(is(new Bar(), Foo)).to.equal(false))

  })

  describe('determine if first argument is one of multiple types', () => {

    it('is("str", [Number, Boolean, String]) == true', () => expect(is('str', [Number, Boolean, String])).to.equal(true))
    it('is({}, [Number, Boolean, String])    == false', () => expect(is({}, [Number, Boolean, String])).to.equal(false))

  })

})

import { expect } from 'chai'
import is from '../lib'

/* globals describe it */

/* eslint-disable comma-spacing, no-new-wrappers, space-before-function-paren, space-before-blocks, new-parens, no-new-object */

describe('is()', () => {

  describe('arguments', () => {

    const isNull = (...args) => is(null, ...args)

    it('must be called with at least one argument', () => {
      expect(is).to.throw('is expects at least one value and optionally a variable number of type arguments')
    })

    it('requires type arguments, if supplied, to be Functions', () => {
      [Array, Function, Object, String, Boolean, Number, function () {}].forEach(func => {
        expect(() => isNull(func)).to.not.throw(Error)
      });

      [[], {foo: 'bar'}, 'oh hai', true, -5].forEach(value => {
        expect(() => isNull(value)).to.throw(Error)
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
    it('is(new Date(), Date)           == true', () => expect(is(new Date(), Date)).to.equal(true))
    it('is(new Date(), Object)         == true', () => expect(is(new Date(), Object)).to.equal(true))
    it('is(Symbol(), Symbol)           == true', () => expect(is(Symbol('1'), Symbol)).to.equal(true))
    it('is(Symbol.iterator, Symbol)    == true', () => expect(is(Symbol.iterator, Symbol)).to.equal(true))
    it('is(Symbol(), Object)           == false',() => expect(is(Symbol('2'), Object)).to.equal(false))

  })

  describe('determine if first argument is a custom type', () => {

    function Foo(){}
    function Bar(){}

    it('is(new Foo(), Foo) == true', () => expect(is(new Foo(), Foo)).to.equal(true))
    it('is(new Bar(), Foo) == false',() => expect(is(new Bar(), Foo)).to.equal(false))

  })

  describe('determine if first argument is one of multiple types', () => {

    it('is("str", Number, Boolean, String) == true', () => expect(is('str', Number, Boolean, String)).to.equal(true))
    it('is({}, Number, Boolean, String)    == false', () => expect(is({}, Number, Boolean, String)).to.equal(false))

  })

})

describe('is.arrayOf()', () => {

  it('requires at least one type', () => {
    expect(() => is.arrayOf([])).to.throw('is.arrayOf requires at least one type.')
  })

  describe('determine if value is array of types', () => {

    it('is.arrayOf([], String) == false',
      () => expect(is.arrayOf([], String)).to.equal(false)
    )

    it('is.arrayOf([\'str\'], String) == true',
      () => expect(is.arrayOf(['str'], String)).to.equal(true)
    )

    it('is.arrayOf([0,false,new Date(), \'str\'], String) == false',
      () => expect(is.arrayOf([0,false,new Date(), 'str'], String)).to.equal(false)
    )

    it('is.arrayOf([0,\'str\',10,\'cake\'], String, Number) == true',
      () => expect(is.arrayOf([0,'str',10,'cake'], String, Number)).to.equal(true)
    )

  })

})

describe('is.objectOf()', () => {

  it('requires at least one type', () => {
    expect(() => is.objectOf({})).to.throw('is.objectOf requires at least one type.')
  })

  describe('determine if value is object of types', () => {

    it('is.objectOf([0,\'string\'], String)               == false',
      () => expect(is.objectOf([0,'string'], String)).to.equal(false)
    )

    it('is.objectOf({}, String)                         == false',
      () => expect(is.objectOf({}, String)).to.equal(false)
    )

    it('is.objectOf({foo: \'1\', bar: \'2\'}, String)       == true',
      () => expect(is.objectOf({foo: '1', bar: '2'}, String)).to.equal(true)
    )

    it('is.objectOf({foo: \'1\', bar: 2}, String, Number) == true',
      () => expect(is.objectOf({foo: '1', bar: 2}, String, Number)).to.equal(true)
    )

  })

})

describe('is.plainObject()', () => {

  describe('determine if a value is a plain object', () => {

    it('is.plainObject([\'str\'])                 == false',
      () => expect(is.plainObject(['str'])).to.equal(false)
    )

    it('is.plainObject(new Date())              == false',
      () => expect(is.plainObject(new Date())).to.equal(false)
    )

    it('is.plainObject({})                      == true',
      () => expect(is.plainObject({})).to.equal(true)
    )

    it('is.plainObject(new Object())            == true',
      () => expect(is.plainObject(new Object())).to.equal(true)
    )

    it('is.plainObject(new function FooBar(){}) == false',
      () => expect(is.plainObject(new function FooBar(){})).to.equal(false)
    )

    it('is.plainObject(Object.create(null))     == true',
      () => expect(is.plainObject(Object.create(null))).to.equal(true)
    )

  })

})

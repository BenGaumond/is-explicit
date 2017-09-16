import { expect } from 'chai'
import is from '../lib/this'

/* globals describe it */

/* eslint-disable comma-spacing, no-new-wrappers, space-before-function-paren, space-before-blocks, new-parens, no-new-object */

describe('isThis()', () => {

  describe('arguments', () => {

    it('requires type arguments, if supplied, to be Functions', () => {
      [Array, Function, Object, String, Boolean, Number, function () {}].forEach(func => {
        expect(() => null::is(func)).to.not.throw(Error)
      });

      [[], {foo: 'bar'}, 'oh hai', true, -5].forEach(value => {
        expect(() => null::is(value)).to.throw(Error)
      })
    })

  })

  describe('determine if first argument has value', () => {

    it('undefined::is() == false', () => expect(undefined::is()).to.equal(false))
    it('null::is()      == false', () => expect(null::is()).to.equal(false))
    it('NaN::is()       == false', () => expect(NaN::is()).to.equal(false))
    it('10::is()        == true', () => expect(10::is()).to.equal(true))
    it('false::is()     == true', () => expect(false::is()).to.equal(true))

  })

})

describe('determine if first argument is a specific type', () => {

  it('[]::is(Object)                 == true', () => expect([]::is(Object)).to.equal(true))
  it('[]::is(Array)                  == true', () => expect([]::is(Array)).to.equal(true))
  it('true::is(Boolean)              == true', () => expect(true::is(Boolean)).to.equal(true))
  it('10::is(Number)                 == true', () => expect(10::is(Number)).to.equal(true))
  it('"str"::is(String)              == true', () => expect('str'::is(String)).to.equal(true))

})

describe('determine if first argument is a custom type', () => {

  function Foo(){}
  function Bar(){}

  it('(new Foo())::is(Foo) == true', () => expect((new Foo())::is(Foo)).to.equal(true))
  it('(new Bar())::is(Foo) == false',() => expect((new Bar())::is(Foo)).to.equal(false))

})

describe('determine if first argument is one of multiple types', () => {

  it('"str"::is(Number, Boolean, String) == true', () => expect('str'::is(Number, Boolean, String)).to.equal(true))
  it('{}::is(Number, Boolean, String)    == false', () => expect({}::is(Number, Boolean, String)).to.equal(false))

})

describe('isThis.arrayOf()', () => {

  it('requires at least one type', () => {
    expect(() => []::is.arrayOf()).to.throw('is.arrayOf requires at least one type.')
  })

  describe('determine if value is array of types', () => {

    it('[]::is.arrayOf(String) == false',
      () => expect([]::is.arrayOf(String)).to.equal(false)
    )

    it('[\'str\']::is.arrayOf(String) == true',
      () => expect(['str']::is.arrayOf(String)).to.equal(true)
    )

    it('[0,false,new Date(), \'str\']::is.arrayOf(String) == false',
      () => expect([0,false,new Date(), 'str']::is.arrayOf(String)).to.equal(false)
    )

    it('[0,\'str\',10,\'cake\']::is.arrayOf(String, Number) == true',
      () => expect([0,'str',10,'cake']::is.arrayOf(String, Number)).to.equal(true)
    )

  })
})

describe('isThis.objectOf()', () => {

  it('requires at least one type', () => {
    expect(() => ({})::is.objectOf()).to.throw('is.objectOf requires at least one type.')
  })

  describe('determine if value is object of types', () => {

    it('[0,\'string\']::is.objectOf(String)               == false',
      () => expect([0,'string']::is.objectOf(String)).to.equal(false)
    )

    it('{}::is.objectOf(String)                         == false',
      () => expect({}::is.objectOf(String)).to.equal(false)
    )

    it('{foo: \'1\', bar: \'2\'}::is.objectOf(String)       == true',
      () => expect({foo: '1', bar: '2'}::is.objectOf(String)).to.equal(true)
    )

    it('{foo: \'1\', bar: 2}::is.objectOf(String, Number) == true',
      () => expect({foo: '1', bar: 2}::is.objectOf(String, Number)).to.equal(true)
    )

  })

})

describe('isThis.plainObject()', () => {

  describe('determine if a value is a plain object', () => {

    it('[\'str\']::is.plainObject()                 == false',
      () => expect(['str']::is.plainObject()).to.equal(false)
    )

    it('(new Date())::is.plainObject()              == false',
      () => expect((new Date())::is.plainObject()).to.equal(false)
    )

    it('{}::is.plainObject()                      == true',
      () => expect({}::is.plainObject()).to.equal(true)
    )

    it('(new Object())::is.plainObject()            == true',
      () => expect((new Object())::is.plainObject()).to.equal(true)
    )

    it('(new function FooBar(){})::is.plainObject() == false',
      () => expect((new function FooBar(){})::is.plainObject()).to.equal(false)
    )

    it('Object.create(null)::is.plainObject()     == true',
      () => expect(Object.create(null)::is.plainObject()).to.equal(true)
    )

  })
})

# is-explicit

# Why ?
- You want to do explicit type checks.
- You don't want to have to differentiate between ```typeof``` and ```instanceof```
- You keep a cool head and bring justice to chaos.

# 2.0

Breaking changes from the 1.x release, but the resulting
changes make ```is-explicit``` faster and more composable.

# Usage

``npm install is-explicit``
```js
import is from 'is-explicit'
```

## Does a variable have a value?
```js
is.defined(undefined)         //false
is.defined(null)              //false
is.defined(NaN)               //false
is.defined(10)                //true
```

## Is a variable a specific type?
```js
is([], Object)         //true
is([], Array)          //true

is(true, Boolean)      //true
is(false, Boolean)     //true
is(10, Number)         //true

is('str', String)      //true
is('str', Object)      //false

is(new String('str'), String)   //true
is(new String('str'), Object)   //true

is(/expr/, RegExp)             //true
is(/expr/, Object)             //true

is(function(){}, Object)       //true
is(function(){}, Function)     //true

is(new function(){}, Object)   //true
is(new function(){}, Function) //False

is(Array, Object)      //true
is(Array, Function)    //true
is(Array, Array)       //false

is(Symbol(), Symbol)        //true
is(Symbol.iterator, Symbol) //true
is(Symbol(), Object)        //false
```

## Is a variable a custom type?
```js
function Foo() {}
is (new Foo(), Foo) // true

const foo = function(){}
const bar = function(){}

is(new foo(), foo) // true
is(new bar(), foo) // false
```

## Is a variable one of multiple types?

```js
is('str', [Number, Boolean, String]) // true
```

## Types are expected to be functions:
```js
is('str', 'otherstring') //throws Error
```

## Is a value an Array of a specific type?
```js
is.arrayOf(['str'], String)                       // == true
is.arrayOf([0, false, new Date(), 'str'], String) // == false
is.arrayOf([0,'str',10,'cake'], [String, Number]) // == true,

```

## Is a value an Object of a specific type?
```js
is.objectOf([ 0, 'str' ], String)                     // == false
is.objectOf({ }, String)                              // == false
is.objectOf({ foo: '1', bar: '2' }, String)           // == true
is.objectOf({ foo: '1', bar: 2 }, [ String, Number ]) // == true

```

## Is a value a plain Object?
```js
is.plainObject(['str'])             // == false
is.plainObject(new Date())          // == false
is.plainObject({})                  // == true
is.plainObject(new Object())        // == true

function FooBar() { }

is.plainObject(new FooBar)           // == false
```

## Binding

Binding is now binds it to a type:

```js
class Foo { }

const isFoo = Foo::is

isFoo(new Foo()) // true
```

Bind to multiple types:

```js
const isBoolOrFunc = [ Boolean, Function ]::is

isBoolOrFunc(false) // true

```

Better composition:
```js
const mixed = [ 0, 'string', 1, true, 2, Symbol('bad') ]

const numbers = mixed.filter(Number::is)
```

## Shortcuts

```js
import is from 'is-explicit'

const value = 'whatever'

is.string(value)    // == String::is(value)
is.number(value)    // == Number::is(value)
is.bool(value)      // == Boolean::is(value)
is.func(value)      // == Function::is(value)
is.symbol(value)    // == Symbol::is(value)
is.primitive(value) // == [ Boolean, Number, String ]::is(value)

is.arrayOf.string(value)    // == String::is.arrayOf
is.arrayOf.number (value)   // == Number::is.arrayOf
is.arrayOf.bool(value)      // == Boolean::is.arrayOf
is.arrayOf.symbol(value)    // == Symbol::is.arrayOf
is.arrayOf.func(value)      // == Function::is.arrayOf
is.arrayOf.primitive(value) // == [ Boolean, Number, String ]::is.arrayOf

is.objectOf.string(value)    // == String::is.objectOf
is.objectOf.number (value)   // == Number::is.objectOf
is.objectOf.bool(value)      // == Boolean::is.objectOf
is.objectOf.symbol(value)    // == Symbol::is.objectOf
is.objectOf.func(value)      // == Function::is.objectOf
is.objectOf.primitive(value) // == [ Boolean, Number, String ]::isArrayOf


```

## Additional Helpers

```js
import is from 'is-explicit'

is.defined() // returns true if input is not null, undefined or NaN

is.arrayOf.plainObject() // returns true if input is an array of plain objects

is.instanceable() // returns true if input is a function with a prototype (ie: arrow functions will return false)

is.subclassOf() // returns true if input is a class that extends the provided type

```

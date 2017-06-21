# is-explicit

# Why ?
- You want to do explicit type checks.
- You don't want to have to differentiate between ```typeof``` and ```instanceof```
- You keep a cool head and bring justice to chaos.

# Usage

``npm install is-explicit``
```js
import is from 'is-explicit'
```

## Does a variable have a value?
```js
is(undefined)         //false
is(null)              //false
is(NaN)               //false
is(10)                //true
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
is('str', Number, Boolean, String) // true
```

## If types are supplied, they must be Functions:
```js
is('str', 'otherstring') //throws Error
```

## Is a value an Array of a specific type?
```js
is.arrayOf(['str'], String)                     // == true
is.arrayOf([0,false,new Date(), 'str'], String) // == false
is.arrayOf([0,'str',10,'cake'], String, Number) // == true,

```

## Is a value an Object of a specific type?
```js
is.objectOf([0, 'str'], String)                 // == false
is.objectOf({}, String)                         // == false
is.objectOf({foo: '1', bar: '2'}, String)       // == true
is.objectOf({foo: '1', bar: 2}, String, Number) // == true

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

#is-explicit

##Why
A convenience single-method module used for doing explicit type checks.

Instead of using 'typeof' for literals and 'instance of' for objects, use 'is-explicit' for both.

##Usage

    var is = require('is-explicit');

Does a variable have a value?

    is(undefined);         //false
    is(null);              //false
    is(NaN);               //false
    is(10);                //true

Is a variable a specific type?

    is([], Object);         //true
    is([], Array);          //true

    is(true, Boolean);      //true
    is(false, Boolean);     //true
    is(10, Number);         //true

    is("str", String);      //true
    is("str", Object);      //false

    is(new String("str"), String);   //true
    is(new String("str"), Object);   //true

    is(/expr/, RegExp);      //true
    is(/expr/, Object);      //true

    is(function(){}, Object);        //true
    is(function(){}, Function);      //true

    is(new function(){}, Object);        //true
    is(new function(){}, Function);      //False

    is(Array, Object);      //true
    is(Array, Function);    //true
    is(Array, Array);       //false

    is(Symbol(), Symbol);        //true
    is(Symbol.iterator, Symbol); //true
    is(Symbol(), Object);        //false

Is a variable a custom type?

    function Foo() {}
    is (new Foo(), Foo); // true

    var foo = function(){}
    var bar = function(){}

    is(new foo(), foo); // true
    is(new bar(), foo); // false

Is a variable one of multiple types?

    is("str", Number, Boolean, String); // true

If types are supplied, they must be Functions:

    is("str", "otherstring"); //throws Error

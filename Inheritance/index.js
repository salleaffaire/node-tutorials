'use strict'


// Conceptually we want Bar inherits from Foo 
// ------------------
// Foo
//  ^
//  |
// Bar
// ------------------

// Function constructor of Foo
function Foo(who) {
  this.me = who;
}

// Here we show that the prototype object exists
console.log('Foo protoyype', Foo.prototype)
// and is of the type 'Object'
console.log('Type of Foo prototype', typeof Foo.prototype)

// Here we show that the Foo prototype constructor property exists and it points to the Foo
// function constructor 
console.log('Foo prototype.constructor', Foo.prototype.constructor)

// Note: Just by declaring a constructor function 'Foo', JS created
// 1- a prototype object and assigned Foo.prototype to it
// 2- assigned Foo.prototype.constructor to Foo itself

// The prototype object is seperate than the object Foo
// Here we add a property identify to the Foo prototype
Foo.prototype.identify = function () {
  return "I am " + this.me;
}

// Function constructor of Bar
function Bar(who) {
  // Since we want Bar inherits from Foo and that JS doesn't have a way
  // to automatically call constructors' chains, we explicitly call the
  // function constructor Foo on 'this' passing who.
  // Note that we explicitly bind 'this', JS has no mechanims to do 
  // this for us 
  Foo.call(this, who)
}

// Here we show that the Bar prototype constructor property exists and it points to the Bar
// function constructor, as expected
console.log('Bar prototype.constructor', Bar.prototype.constructor)

// To implement delegation we want to link the Bar and Foo prototype with the [[Prototype]] link.
// We then assign Bar.prototype to a newly created object using Object.create() that has a
// [[Prototype]] link with Foo.prototype.
Bar.prototype = Object.create(Foo.prototype)

// Note that the 'default' prototype object is now not rererenced and will be garbage collected
// Here we show that the prototype object exists and it points to the Foo
// function constructor - through the delegation chain. There is no .constructor property in
// Bar.prototype but it exists in Foo.prototype.  
console.log('Bar prototype.constructor', Bar.prototype.constructor)

// the only time a .constructor property is added to an object is 
// when that object is the default .prototype attached to a declared function,
// as is the case of Foo(). When objects are created via new Fn() or 
// Object.create(..) calls, those objects don't get a .constructor 
// added to them.
// So we explicitely set the Bar.prototype.constructor to Bar 
Bar.prototype.constructor = Bar

// Add a speak property to the newly created Bar.prototype object
Bar.prototype.speak = function () {
  console.log("Hello, " + this.identify() + ".")
}

// Instansiating 1 Bar objects
var b1 = new Bar("b1")
var b2 = new Bar("b2")

b1.speak() // alerts: "Hello, I am b1."
b2.speak() // alerts: "Hello, I am b2."

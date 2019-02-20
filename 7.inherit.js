// 原型链
function SuperType() {
  this.property = true;
};

SuperType.prototype.getSuperValue = function () {
  return this.property;
};

function SubType() {
  this.subProperty = false;
};

// 继承了 SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSbuValue = function () {
  return this.subProperty;
};

var instance = new SubType();
console.log(instance.getSuperValue()); // true

/*************************************************************
  SuperType        ---------- SuperType Prototype 
    ||             |   |             ||
    prototype ------   |  constructor: SuperType
                       |  getSuperValue: (function)
                       ----------------------------
                                                   |
  SubType          ---------- SubType Prototype    |
    ||             |                 ||            |
    [[Prototype]] --      [[Prototype]] ------------
                   |      property: true,
                   |      getSubValue: (function)
  instance         |
    ||             |
  [[Prototype]] ----
  subproperty: false
*****************************************************************/

// 原型继承的问题
// 1.引用类型的属性会被所有实例共享
// 2.创建子类型的实例时,不能向超类的构造函数传递参数
function SuperType() {
  this.colors = ['red', 'blue'];
};

function SubType() { };

SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push('black');

var instance2 = new SubType();
console.log(instance1.colors); // ["red", "blue", "black"]
console.log(instance2.colors); // ["red", "blue", "black"]

// 借用构造函数
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
};

function SubType(name) {
  SuperType.call(this, name);
  this.age = 29;
};

SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push('black');

var instance2 = new SubType();
console.log(instance1.colors); // ["red", "blue", "black"]
console.log(instance2.colors); // ["red", "blue"]

// 组合继承
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
};

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
};

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  console.log(this.age);
};

var instance1 = new SubType('Jinkai', 30);
instance1.colors.push('balck');
console.log(instance1.colors); // ["red", "blue", "balck"] 
instance1.sayName(); // Jinkai
instance1.sayAge(); // 30

// 原型式继承 <===> Object.create()
function object(o) {
  function F() { };
  F.prototype = o;
  return new F();
};

Object.create({ name: 'cjk' });

// 寄生式继承
function createAnother(original) {
  var clone = Object(origin);
  clone.sayHi = function () {
    console.log('hi');
  };
  return clone;
};

var person = { name: 'cjk' };
var anotherPerson = createAnother(person);
anotherPerson.sayHi();

// 寄生组合继承
function inheritPrototype(subType, superType) {
  // function F() { };
  // F.prototype = superType.property;
  // prototype = new F();
  var prototype = object(superType.property);
  prototype.constructor = subType;
  subType.prototype = prototype;
};
// 组合模式调用了两次 SuperType()
// # 1.在 SubType 的构造函数中: SuperType.call(this)
// # 2.在设置 SubType 的 prototype 时: SubType.prototype = new SuperType()
// * 寄生组合模式避免的第一次调用
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
};

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
};

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
  console.log(this.age);
};

var instance = new SubType('jinkai', 30);
instance.sayAge();
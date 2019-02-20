// 数据属性
var person = { name: 'Jinkai' };
var person = {};
Object.defineProperty(person, 'name', {
  configurabl: true,
  enumerable: true,
  writable: true,
  value: 'Jinkai'
});

// 访问器属性
var book = {
  _year: 2004,
  edition: 1
};

Object.defineProperty(book, 'year', {
  get: function () {
    return this._year;
  },
  set: function (newValue) {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2014
    }
  }
});

// 定义多个属性
var book = {};
Object.defineProperties(book, {
  _year: {
    writable: true,
    value: 2004
  },
  edition: {
    writable: true,
    value: 1
  },
  year: {
    // enumerable: false,
    // configurable: false,
    // 只指定 getter 意味着属性不能写
    get: function () {
      return this._year;
    },
    set: function (newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2014
      }
    }
  }
});

// {value: 2004, writable: true, enumerable: false, configurable: false}
Object.getOwnPropertyDescriptor(book, '_year');

// 创建对象

// 工厂模式
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(this.name);
  };
  return o;
};

var person1 = createPerson('Jinkai', 29, 'Software Engineer');

// 构造函数模式
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
};

// 1.创建一个新对象
// 2.将构造函数的作用域付给新对象(因此this就指向了这个新对象)
// 3.执行构造函数中的代码(为这个新对象添加属性)
// 4.返回新对象
var person = new Person('Jinkai', 29, 'Software Engineer');
console.log(person1.constructor); // Person
console.log(person1 instanceof Person); // true
console.log(person1 instanceof Object); // true

// 作为普通函数调用
Person('Jinkai', 29, 'Software Engineer'); // 添加到 window 对象
window.sayName() // Jinkai

// 在另一个新对象的作用域中调用
var o = new Object();
Person.call(o, 'Jinkai', 29, 'Software Engineer'); // 添加到 o 对象
o.sayName() // Jinkai

// 原型模式
function Person() { };
Person.prototype.name = "Jinkai";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
  console.log(this.name);
};

var person1 = new Person();
Person.prototype.isPrototypeOf(person1); // true
Person.prototype.isPrototypeOf(Person); // false
Object.getPrototypeOf(person1) // Person.prototype
/*************************************************************
  Person           ---------- Person Prototype 
    ||             |               ||
    prototype ------     constructor: Person
                   |     name       : "Jinkai"
                   |     age        : 29
                   |     job        : "Software Engineer"
  person1          | 
    ||             |
    [[Prototype]] --
*****************************************************************/

person1.name = 'Jack';
console.log(person1.hasOwnProperty('name')); // true;
console.log(person1.hasOwnProperty('age')); // false

function hasPrototypeProperty(object, name) {
  return !object.hasOwnProperty(name) && (name in object);
};

hasPrototypeProperty(person1, 'name'); // false
hasPrototypeProperty(person1, 'age'); // true

Object.keys(person1); // ["name"]
Object.keys(Person.prototype) // 可枚举的属性: ["name", "age", "job", "sayName"]
Object.getOwnPropertyNames(Person.prototype); // 所有属性: ["constructor", "name", "age", "job", "sayName"]

function Person() { };
var friend = new Person();
Person.prototype = {
  constructor: Person, // [Enumerable] 为 true
  name: 'Jinkai',
  age: 29,
  job: 'Software Engineer',
  sayName: function () {
    console.log(this.name);
  }
};
Object.defineProperty(Person.prototype, 'constructor', {
  enumerable: false,
  value: Person
});
friend.sayName(); // friend.sayName is not a function

String.prototype.startWith = function (text) {
  return this.indexOf(text) == 0;
};
var msg = "Hello World!";
console.log(msg.startWith('Hello'));

// 原型对象的问题
function Person() { };
Person.prototype = {
  constructor: Person,
  friends: ['Jack', 'Tom']
};

var person1 = new Person();
var person2 = new Person();
person1.friends.push('Van');
console.log(person1.friends); // ["Jack", "Tom", "val"]
console.log(person2.friends); // ["Jack", "Tom", "val"]

// 组合构建模式与原型模式
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ['Jack', 'Tom'];
};

Person.prototype.sayName = function () {
  console.log(this.name);
};

var person1 = new Person('Jinkai', 29, 'Software Engineer');
var person2 = new Person('Tom', 21, 'Software Engineer');
person1.friends.push('Van');
console.log(person1.friends); // ["Jack", "Tom", "val"]
console.log(person2.friends); // ["Jack", "Tom"]

// 动态原型模式
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ['Jack', 'Tom'];
  if (typeof this.sayName != 'function') {
    Person.prototype.sayName = function () {
      console.log(this.name);
    };
  }
};

// 寄生构造函数模式
function Person(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(this.name);
  };
  // 重写构造函数的返回值
  return o;
};
var person = new Person('Jinkai', 29, 'Software Engineer');

// 利用寄生构造函数创建特殊数组
function SpecialArray() {
  var values = new Array();
  values.push.apply(values, arguments);
  values.toPipedString = function () {
    return this.join('|');
  };
  return values;
};

var colors = new SpecialArray('red', 'blue', 'yellow');
colors.toPipedString();

// 稳妥构造函数模式
function Person(name, age, job) {
  var o = new Object();
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(name);
  };
  return o;
};
var person = Person('Jinkai', 29, 'Software Engineer');
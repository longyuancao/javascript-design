function functionName(arg0, arg1, arg2) { };
console.log(functionName.name); // functionName

var functionName = function (arg0, arg1, arg2) { };

// 不要这样做
// 由于函数声明提升的缘故,返回的总是第二个函数
if (condition) {
  function sayHi() {
    console.log('Hi!');
  };
}
else {
  function sayHi() {
    console.log('Yo!');
  };
}

// 可以这样做
var sayHi;
if (condition) {
  sayHi = function () {
    console.log('Hi!');
  };
}
else {
  sayHi = function () {
    console.log('Yo!');
  };
}

// 递归
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
};

var anotherFactorial = factorial;
factorial = null;
alert(anotherFactorial(4)); // 报错

// 更正
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    // 严格模式下有问题
    return num * arguments.callee(num - 1);
  }
};

// 升级: 使用命名函数
var factorial = (function f(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * f(num - 1);
  }
});

f(4) // f is not a function
  (function f(num) {
    if (num <= 1) {
      return 1;
    } else {
      return num * f(num - 1);
    }
  });
f(4) // f is not a function

f(4) // 24
function f(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * f(num - 1);
  }
};

// 闭包: 指有权访问另一个函数作用域中的变量的函数

function compare(value1, value2) {
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
};

var result = compare(5, 10);

/****************************************************************************
      <---------------------------------------------------------------- 
      |                                                                | 
compare的执行环境    --> 作用域链        --------------> 全局变量对象       |
      ||           |      ||          |                   ||           |
    作用域链 --------      [0] ---------                 compare ------->
                          [1] -------                   result: undefined
                                    |
                                    -----------------> compare()的活动对象
                                                              ||
                                                      arguments: [5, 10]
                                                      value1: 5
                                                      value2: 10

*****************************************************************************/

// 后台每个执行环境都有一个表示变量的对象--变量对象(活动对象)

function createComparisonFunction(propertyName) {
  return function (object1, object2) {
    // 访问外部函数中的变量 propertyName
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  };
};

var compareNames = createComparisonFunction('name');
var result = compareNames({ name: 'Jinkai' }, { name: 'Tom' });
compareNames = null; // 解除对匿名函数的引用,以便释放内存

// 闭包与变量
function createFunctions() {
  var results = new Array();
  for (var i = 0; i < 10; i++) {
    // 每个函数的返回结果都是10
    results[i] = function () {
      return i;
    };
  }
  return results;
};

// 修正版本
function createFunctions() {
  var results = new Array();
  for (var i = 0; i < 10; i++) {
    results[i] = function (i) {
      return function () {
        console.log(i)
      };
    }(i);
  }
  return results;
};

// 关于 this 对象
var name = "The window";
var object = {
  name: "My Object",
  getNameFunc: function () {
    return function () {
      console.log(this.name);
    }
  }
};
object.getNameFunc()(); // The Window (在非严格模式下)

var name = "The window";
var object = {
  name: "My Object",
  getNameFunc: function () {
    var that = this;
    return function () {
      console.log(that.name);
    }
  }
};
object.getNameFunc()(); // My Object

var name = "The window";
var object = {
  name: "My Object",
  getName: function () {
    console.log(this.name);
  }
};
object.getName(); // My Object
(object.getName)(); // My Object
(object.getName = object.getName)(); // // The Window (在非严格模式下)

// 内存泄露
// 循环引用
function assignHandler() {
  var element = document.getElementById('someElement');
  element.onclick = function () {
    // 由于循环引用会导致内存泄露
    console.log(element.id);
  };
};

// 修正版本
function assignHandler() {
  var element = document.getElementById('someElement');
  var id = element.id;
  element.onclick = function () {
    console.log(id);
  };
  // 闭包会引用包含函数的整个活动对象,而其中包含element.
  // 即使闭包中不直接引用element, 包含函数的活动对象中也仍然会保存一个element的引用
  element = null;
};

// 模仿块级作用域: (function () { })();
function outputNumbers(count) {
  for (var i = 0; i < count; i++) {
    console.log(i);
  }
  console.log(i);
};
outputNumbers(3); // 0 1 2 3

function outputNumbers(count) {
  for (var i = 0; i < count; i++) {
    console.log(i);
  }
  // 没有任何影响, 因为 JavaScript 对后续的生命视而不见
  // 不过他会执行后续声明的初始化 var i = 1;
  var i;
  console.log(i);
};
outputNumbers(3); // 0 1 2 3

// 函数生命后面不能跟圆括号
// function someFn(){}();

// 函数表达式后面是可以跟圆括号的
(function () { })();

function outputNumbers(count) {
  (function () {
    for (var i = 0; i < count; i++) {
      console.log(i);
    }
  })();
  console.log(i);
};

// 私有变量
function MyObject() {
  // 私有变量
  var privateVariable = 10;
  // 私有函数
  var privateFunction = function () {
    return false;
  };
  // 特权方法
  this.publicMethod = function () {
    privateVariable++;
    return privateFunction();
  };
};

// 静态私有变量 静态: 被实例共享的
(function () {
  // 私有变量
  var privateVariable = 10;
  // 私有函数
  var privateFunction = function () {
    return false;
  };
  MyObject = function () { };
  // 特权方法
  MyObject.prototype.publicMethod = function () {
    privateVariable++;
    return privateFunction();
  };
});

// ** 使用闭包和私有变量的弊端: 多查找作用域链中的一个层次,就会在一定成都上影响查找速度

// 模块模式
var singleton = function () {
  var privateVariable = 10;
  function privateFunction() {
    return false;
  };
  return {
    publicProperty: true,
    publicMethod: function () {
      privateVariable++;
      return privateFunction();
    }
  };
}();

// 增强的模块模式
// 模块模式
var singleton = function () {
  var privateVariable = 10;
  function privateFunction() {
    return false;
  };

  // ** 返回指定类型的实例
  var objcet = CustomType();
  objcet.publicProperty = true;
  object.publicMethod = function () {
    privateVariable++;
    return privateFunction();
  };
  return object;
}();
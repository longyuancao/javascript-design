// 函数声明
function sum(num1, num2) {
  return num1 + num2;
};

// 函数表达式
var sum = function (num1, num2) {
  return num1 + num2;
};

// Function 构造函数
var sum = new Function("num1", "num2", "return num1 + num2");

// 函数声明提升
sum(1, 2) // 3
function sum(num1, num2) {
  return num1 + num2;
};

sum(1, 2) // error
var sum = function (num1, num2) {
  return num1 + num2;
};

// this
window.color = 'red';
var o = { color: 'blue' };

function sayColor() {
  console.log(this.color);
};

sayColor(); // red

o.sayColor = sayColor;
o.sayColor() // blue

// arguments.callee
// 拥有此 arguments 的函数, 严格模式下报错
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    // return num * factorial(num -1);
    return num * arguments.callee(num - 1);
  }
};

var trueFactorial = factorial;
factorial = function () {
  return 0;
};

trueFactorial(5); // 120
factorial(5) // 0

// caller: 调用当前函数的函数引用
function outer() {
  inner();
};

function inner() {
  // argments.callee.caller
  console.log(inner.caller);
};

outer(); // outer

// length: 实名参数的个数
function sum(num1, num2) {
  return num1 + num2;
};

sum.length // 2

// call, apply
function sum(num1, num2) {
  return num1 + num2;
};

sum.call(this, 1, 2);
sum.apply(this, [1, 2]);

window.color = 'red';
var o = { color: 'blue' };

function sayColor() {
  console.log(this.color);
};

sayColor(); // red
sayColor.call(window) // red
sayColor.call(o) // blue

// bind
var bindSayColor = sayColor.bind(o);
bindSayColor(); // red

function bind(fn, context) {
  return function () {
    fn.apply(context, arguments);
  };
};
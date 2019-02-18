// String
var s1 = "some text";
// 背后的故事
// (1) 创建 String 类型的一个实例 
// (2) 在实例上调用制定方法
// (3) 销毁这个实例
// var s11 = new String('some text');
// s2 = s11.substring(2);
// s11 = null
var s2 = s1.substring(2);

var a = new String('some text');
a.color = "red";
console.log(a.color); // red;

s2.color = "red";
console.log(a.color); // undefined;

var str = "hello world";
str.charAt(1); // e
str.charCodeAt(1) // 101
var result = str.concat("!!") // result: hello world!!
// slice,
// substr: 第二个参数代表个数
// substring:第二个参数代表位置
// indexOf
// lastIndexOf
// trim
// toLowwerCase
// toUpperCase
// String.fromCharCode

// Number
var value = "25";
var number = Number(value) // 转型函数
typeof number // number

var number = new Number(value); // 构造函数
typeof number // object

var num = 10;
num.toString(); // 10
num.toString(2) // 1010
num.toString(8) // 12

num.toFixed(2) // 10.10

// Boolean
var falseObj = new Boolean(false);
falseObj && true // true

var falseValue = false;
falseValue && true // false
// 创建 Array 实例

// 1.Array 构造函数
var colors = new Array();
var colors = new Array(20);
var colors = new Array("red", "blue", "green");

// 2.数组字面量
var colors = [];
var colors = ["red", "blue", "green"];

// 读取和设置数组
var colors = ["red", "blue", "green"]; // colors.length: 3
console.log(colors[0]); // 显示第一项
colors[2] = 'black'; // 修改第三项 colors: ["red", "blue", "black"]
colors[3] = 'brown'; // 新增第四项 colors: ["red", "blue", "black", "brown"]
colors.length = 3 // colors: ["red", "blue", "black"]
colors.length = 4; // colors: ["red", "blue", "black", undefined]
colors.length = 3;
colors[colors.length] = "yellow"; // colors: ["red", "blue", "black", "yellow"]
colors[8] = "pink"; // ["red", "blue", "black", "yellow", undefined, undefined, undefined, undefined, "pink"]

// 检测数组
Array.isArray(value);

// 转换方法
var colors = ["red", "blue", "green"];
console.log(colors.toString()); // red,blue,green
console.log(colors.valueOf()); // [red, blue, green]

var p1 = {
  toString: function () {
    return '1';
  },
  toLocaleString: function () {
    return 'l1';
  }
};

var p2 = {
  toString: function () {
    return '2';
  },
  toLocaleString: function () {
    return 'l2';
  }
};

var people = [p1, p2];
console.log(people.toString()); // 1,2
console.log(people.toLocaleString()); // l1,l2

// 栈方法
var colors = new Array('red');
var count = colors.push('green'); // colors: ['red', 'green'], count: 2
var item = colors.pop(); // colors: ['red'], item: 'green'

// 队列方法
// push : shift | unshift : pop
var colors = new Array('red');
var count = colors.unshift('black'); // colors: ["black", "red"], count: 2
var item = colors.shift(); // colors: ["red"], item: 'black'

// 排序
var values = [1, 2, 3, 4, 5];
values.reverse(); // [5, 4, 3, 2, 1]

values = [0, 1, 5, 10, 15];
values.sort(); // [0, 1, 10, 15, 5]

// 正序
// 适用于数值类型
// function compare(value1, value2){
//   return value1 - value2;
// }
function compare(value1, value2) {
  if (value1 < value2) {
    return -1;
  }
  else if (value1 > value2) {
    return 1;
  }
  else {
    return 0;
  }
};

values = [0, 9, 5, 2, 15];
values.sort(compare); // [0, 2, 5, 9, 15]

// 倒序
// 适用于数值类型
// function compare(value1, value2){
//   return value2 - value1; 
// }

function compare(value1, value2) {
  if (value2 < value1) {
    return -1;
  }
  else if (value2 > value1) {
    return 1;
  }
  else {
    return 0;
  }
};

values = [0, 9, 5, 2, 15];
values.sort(compare); // [15, 9, 5, 2, 0]

// 操作方法

// concat 
var colors = ['red', 'green', 'blue'];
var colors2 = colors.concat('yellow', ['black', 'brown']);
// colors: ['red', 'green', 'blue'];
// colors2: ["red", "green", "blue", "yellow", "black", "brown"]

// slice: 
var colors = ["red", "green", "blue", "yellow", "black", "brown"];
var colors2 = colors.slice(1) // 从位置 1 开始复制  ["green", "blue", "yellow", "black", "brown"]
var colors3 = colors.slice(1, 4) // 位置 1 开始, 位置 3 结束 ["green", "blue", "yellow", "black"]
var colors4 = colors.slice(-2, -1) = colors.slice(colors.length - 2, colors.length - 1);

// splice
var colors = ['red', 'green', 'blue'];
var removed = colors.splice(0, 1); // 删除第一项 colors: ['green', 'blue'], removed: ["red"]

// removed: [], colors: ['green', 'yellow', 'orange', 'blue']
removed = colors.splice(1, 0, 'yellow', 'orange'); // 从位置 1 开始插入两项

// removed: ["yellow"], colors: ["green", "red", "purple", "orange", "blue"]
removed = colors.splice(1, 1, 'red', 'purple');

// 位置方法
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.indexOf(4); // 3
numbers.lastIndexOf(4); // 5
numbers.indexOf(4, 4); // 5
numbers.lastIndexOf(4, 4); // 3

// 迭代方法

// every
// filter
// forEach
// map
// some
// reduce

// array.reduce(function(pre, cur, index, array), initialValue)
var numbers = [1, 2, 3, 4];
numbers.reduce(function (total, num) {
  return total + num;
}); // 10

numbers.reduce(function (total, num) {
  return total + num;
}, 5); // 15
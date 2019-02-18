// 1.标记清除: 进入执行环境(function),标记为"进入环境",离开时标记为"离开环境"

// 2.引用计数

// 循环引用
function problem() {
  var objectA = new Object(); // objectA引用计数: 1
  var objectB = new Object(); // objectB引用计数: 1
  objectA.someOtherObject = objectB; // objectB引用计数: 2
  objectB.someOtherObject = objectA; // objectA引用计数: 2
};

var element = document.getElementById('some_element');
var myObject = new Object();
myObject.element = element;
element.someObject = element;

// 手工解除引用
function createPerson(name) {
  var localPerson = new Object();
  localPerson.name = name;
  return localPerson;
};

var globalPerson = createPerson();
// 手工解除 globalPerson 的引用
globalPerson = null;


// Undefined | Null | Number | Boolean | String
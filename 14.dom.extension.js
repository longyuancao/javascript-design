// 选择符 API

// 1.querySelector()
var body = document.querySelector('body');
var myDiv = body.querySelector('#myDiv');

// 2.querySelectorAll
// ** 遍历不会无限循环
var divs = document.querySelectorAll('div.item');

// 3.matchesSelector
if (document.body.matchesSelector) {
  // true
}

// 元素遍历

var i, len, child = element.firstChild;
while (child) {
  // 规避文本节点
  if (child.nodeType == 1) {
    processChild(child);
    child = child.nextSibling;
  }
}

// Element Traversal 版本
var i, len, child = element.firstElementChild;
while (child) {
  if (child.nodeType == 1) {
    processChild(child);
    child = child.nextElementSibling;
  }
}

// HTML5

// 1.getElementsByClassName() 方法
// 跟 document.getElementsByTagName 一样, 会有无限循环的问题

// 获取所有类中包含 username 和 current 的元素
var allCurrentUsernames = document.getElementsByClassName('username current');

// 获取 ID 为 myDiv 的元素中带有类名为 selected 的所有元素
var selected = document.getElementById('myDiv').getElementsByClassName('selected');

// 2.classList 属性
// <div class="bd user disabled"></div>

// 删除 user 类
var classNames = div.className.split(/\s+/);
var pos = -1, i, len;
for (i = 0, len = classNames.length; i < len; i++) {
  if (classNames[i] == 'user') {
    pos = i;
    break;
  }
}
classNames.splice(pos, 1);
div.className = classNames.join(' ');

// classList 版本
div.classList.remove('user');
div.classList.add('ok');
div.classList.toggle('selected');
div.classList.contains('bd');

// 3.焦点管理

// 获取获得了焦点的元素
document.activeElement;

var button = document.getElementById('myButton');
button.focus();
document.activeElement; // button
document.hasFocus(); // true;

// 4.HTMLDocument 的变化

if (document.readyState == "complete") {
  // another state: loading
  // 执行操作
}

if (document.compatMode == "CSS1Compat") {
  // 标准模式
}
else {
  // document.compatMode: "BackCompat"
  // 兼容模式(混杂模式)
}

document.head;
document.charset = "UTF-8";

// 5.自定义属性
// <div id="myDiv" data-appId="12345" data-myname="cjk"></div>
var div = document.getElementById('myDiv');
var appId = div.dataset.appId;
var myName = div.dataset.myname;

div.innerHTML = "<p>Hi</p>";
div.outerHTML = "<p>Hi</p>";

// 会对内容进行编码
div.innerText = "Hello World!";
divs.outerText = "Hello World!";
div.textContent = "Hello World!" // Firefox

// 作为前一个同辈元素插入
div.insertAdjacentHTML("beforebegin", "<p>Hi</p>");
// 作为第一个元素插入 (子元素)
div.insertAdjacentHTML("afterbegin", "<p>Hi</p>");
// 作为最后一个元素插入  (子元素)
div.insertAdjacentHTML("beforeend", "<p>Hi</p>");
// 作为后一个元素插入
div.insertAdjacentHTML("afterend", "<p>Hi</p>");

// 注意性能
for (var i = 0, len = values.length; i < len; i++) {
  ul.innerHTML += "<li>" + values[i] + "</li>" // 要避免这种频繁操作
}

// 优化版本
var itemsHtml = "";
for (var i = 0, len = values.length; i < len; i++) {
  itemsHtml += "<li>" + values[i] + "</li>" // 要避免这种频繁操作
}
ul.innerHTML = itemsHtml;

// 6.scrollIntoView() 方法
div.scrollIntoView(); // 是元素出现在视口中

// children 属性
// 与 childNodes 属性类似,不过不包含 textNode 元素

// contains() 方法 
document.documentElement.contains(document.body) // true


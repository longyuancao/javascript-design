// Node 类型
Node.ELEMENT_NODE // 1
Node.ATTRIBUTE_NODE // 2
Node.TEXT_NODE // 3
Node.DOCUMENT_NODE // 9
Node.COMMENT_NODE // 8
Node.DOCUMENT_TYPE_NODE // 11

// nodeType, nodeName, nodeValue

// 节点关系
var firstChild = someNode.childNodes[0];
var secondChild = someNode.childNodes.item(1);
var count = someNode.childNodes.length;
var parent = someNode.parentNode;
var preNode = someNode.previousSibling;
var nextNode = someNode.nextSibling;
var first = someNode.firstChild;
var last = someNode.lastChild;
var hasChildNodes = someNode.hasChildNodes();
someNode.ownerDocument; // document


// 在 IE8 以及之前版本无效, COM 实现会报错
var arrayNodes = Array.prototype.slice.call(someNode.childNodes);

// 操作节点
someNode.appendChild(child);
someNode.insertBefore(child, null); // child 成为最后一个节点, 等价于 appendChild
someNode.insertBefore(child, someNode.firstChild); // child 成为第一个节点
someNode.replaceChild(child, someNode.first); // 替换第一个节点
someNode.removeChild(someNode.firstChild);
someNode.cloneNode(); // 复制节点本身
someNode.cloneNode(true); // 复制节点以及下面的所有子节点
someNode.normalize(); // 删除空文本节点,合并相邻文本节点

// Document 类型 (nodeType: 9)

// 1.文档的子节点

// 取得对 <html> 的引用
var html = document.documentElement;
var html = document.childNodes[0];

// 取得对 <body> 的引用
var body = document.body;

// 取得对 <!DOCTYPE> 的引用
var doctype = document.doctype;

// 2.文档信息

// 文档标题
var title = document.title;
document.title = 'New Title';

// 文档完整的 URL
var url = document.URL;

// 获取域名
var domain = document.domain;

// 获取来源页面的 URL
var referrer = document.referrer;

// 假设当前页面 URL 为 p2p.wrox.com
document.domain = 'wrox.com'; // 成功
document.domain = 'abc.com'; // 失败

// 3.查找元素
var div = document.getElementById('myDiv');

// HTMLCollection 与 NodeList 类似
var images = document.getElementsByTagName('img');
// <img name = "myImage" />
var image = images.namedItem('myImage');
var image = images['myImage'];

var allElements = document.getElementsByTagName('*');

// <input type="radio" name="color" id="red" />
// <input type="radio" name="color" id="blue" />
// <input type="radio" name="color" id="yellow" />
var radios = document.getElementsByName('color');

// 4.特殊集合
document.anchors // 获取所有带 name 属性的 <a> 标签
document.forms // 获取所有 <form> 元素
document.images // 获取所有 <img> 元素
document.links // 获取所有带 href 属性的 <a> 标签

// Element 类型 (nodeType: 1)

// <div id="myDiv"></div>
var div = document.getElementById('myDiv');
div.tagName; // DIV
div.nodeName; // DIV
div.tagName.toLowerCase() === 'div' // true 

// 1.HTML 元素 (HTMLElement)
// <div id="myDiv" class="bd" title="Body text" lang="en" dir="ltr"></div>
var div = document.getElementById('myDiv');
console.log(div.id); // myDiv
console.log(div.className); // bd
console.log(div.title); // Body text
console.log(div.lang); // en
console.log(div.dir); // ltr
// 赋值
div.id = "newId";
div.className = "ft";
div.title = "Other text";
div.lang = "fr";
div.dir = "rtl";

// 2.取得特性
// 特性名不区分大小写, ID 和 id 是同一特性, 自定义特性应该加 data- 前缀
// <div id="myDiv" my_attr="Hello"></div>
var div = document.getElementById('myDiv');
div.getAttribute('id'); // myDiv
div.getAttribute('my_attr') // Hello
div.my_attr // undefined (IE除外)
// **注意: 开发时尽量使用对象的属性,只有取得自定义属性时,才使用 getAttribute() 方法

// 3.设置特性
// 特姓名会自动转换成小写, 如 ID 会变成 id
div.setAttribute('id', 'someOtherId');
div.setAttribute('user', 'Jinkai');
// 移除特性
div.removeAttribute('user');
div.removeAttribute('class');

// 4.attributes 属性
// 获取属性
var id = div.attributes.getNamedItem("id").nodeValue;
var id = div.attributes["id"].nodeValue;
// 设置属性
div.attributes["id"] = "someOtherId";
// 删除属性
div.attributes.removeNamedItem("id");

// 遍历元素特性(包括自定义属性)
function outputAttributes(element) {
  var pairs = new Array(),
    attrName,
    attrValue,
    i, len;
  for (i = 0, len = element.attributes.length; i < len; i++) {
    attrName = element.attributes[i].nodeName;
    attrValue = element.attributes[i].nodeValue;
    // 针对 IE7 Bug
    if (element.attributes[i].specified) {
      pairs.push(attrName + "='" + attrValue + "'");
    }
  }
  return pairs.join(" ");
};

// 5.创建元素
var div = document.createElement('div');
div.id = "myDiv";
document.body.append(div);
// 避免 IE7 中的问题, 其他浏览器会报错
var div = document.createElement('<div id="myDiv"></div>');

// Text 类型 (nodeType: 3)

// <div></div> 没有内容,也就没有文本节点
// <div> </div> 有空格,因而有一个文本节点
// <div>Hello World!</div> 有内容,因而有一个文本节点
var textNode = div.firstChild.nodeValue = "Some other message";
console.log(textNode.data); // Some other message
// 转义: Some &lt;strong>&gt;other&lt;/strong&gt; message
var textNode = div.firstChild.nodeValue = "Some <strong>other</strong> message";

// appendData(text)
// deleteData(index, counbt)
// insertData(index, text)
// replaceData(index, count, text)
// substringData(index, count)

// 1.创建文本节点
var element = document.createElement('div');
var textNode = document.createTextNode('Hello');
var textNode2 = document.createTextNode(' World!');
element.append(textNode);
element.append(textNode2);

// 2.规范化文本节点
element.normalize(); // 合并 TextNode

// 3.分割文本节点
var element = document.createElement('div');
var textNode = document.createTextNode('Hello World');
element.append(textNode);
// 从位置 5 处分割
var newNode = element.firstChild.splitText(5);
console.log(newNode.nodeValue); // Hello
console.log(element.firstChild.nodeValue); // World
console.log(element.childNodes.length); // 2

// 5.Comment 类型 (nodeType: 8)
// <div id="myDiv"><!-- A comment --></div>
var div = document.getElementById('myDiv');
var comment = div.firstChild;
console.log(comment.data); // A comment
// 创建注释
document.createComment('A comment');

// DocumentFragment (nodeType: 11)

// <ul id="myList"></ul>
var fragment = document.createDocumentFragment();
var ul = document.getElementById('myList');
var li = null;
for (var i = 0; i < 3; i++) {
  li = document.createElement('li');
  li.appendChild(document.createTextNode("Item " + (i + 1)));
  fragment.appendChild(li);
}
// 文档片段中所有节点被删除,并转移到 ul 元素中
ul.appendChild(fragment);

// Atrribute 类型 (nodeType 2)

// 创建属性
var attr = document.createAttribute('align');
attr.value = "left";
element.setAttributeNode(attr);

// DOM 操作技术

// 1.动态脚本
// <script type="text/javascript" src="client.js"></script>
function loadScript(url) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.scr = url;
  document.body.append(script);
};

// 行内代码
function loadScriptString(code) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  try {
    script.appendChild(document.createTextNode(code));
  } catch (e) {
    // IE 版本
    script.text = code;
  }
  document.body.appendChild(script);
};

// 2.动态样式
// <link rel="stylesheet" type="text/css" href="style.css">
function loadStyles(url) {
  var link = document.createElement('link');
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
};

// 嵌入式 CSS
function loadStyleString(css) {
  var style = document.createElement('link');
  style.type = "text/css";
  try {
    style.appendChild(document.createTextNode(css));
  } catch (e) {
    // IE 版本
    style.text = css;
  }
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
}

// 使用 NodeList

// 无限循环的代码
var divs = document.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++) {
  var div = document.createElement('div');
  // 每次添加, divs.length 都会加 1
  document.body.appendChild(div);
}

// 更正的版本
var divs = document.getElementsByTagName('div');
for (var i = 0, len = divs.length; i < len; i++) {
  var div = document.createElement('div');
  // 每次添加, divs.length 都会加 1
  document.body.appendChild(div);
}
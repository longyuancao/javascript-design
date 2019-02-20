// Node 类型
Node.ELEMENT_NODE // 1
Node.ATTRIBUTE_NODE // 2
Node.TEXT_NODE // 3
Node.DOCUMENT_NODE // 9

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

// Document 类型

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

// Element 类型

// <div id="myDiv"></div>
var div = document.getElementById('myDiv');
div.tagName; // DIV
div.nodeName; // DIV
div.tagName.toLowerCase() === 'div' // true 

// 1.HTML 元素
// 能力检测: 检测浏览器有什么能力
function getElement(id) {
  if (document.getElementById) {
    return document.getElementById(id);
  }
  // IE5.0之前版本不支持 document.getElementById
  else if (document.all) {
    return document.all[id];
  }
  else {
    throw new Error('No way to retrieve element!');
  }
};

// 更可靠的能力检测
// 错误的用法
function isSortable(obj) {
  return !!obj.sort;
};

// 更正版本
function isSortable(obj) {
  return typeof obj.sort == 'function';
};

// 在 IE8 以及之前版本中不行, COM 实现, typeof document.createElement === 'object'
function hasCreateElement() {
  return typeof document.createElement == 'function';
};

var xhr = new ActiveXObject('Microsoft.XMLHttp');
if (xhr.open) { // 这里会发生错误, 

}

// 在 IE 浏览器里
typeof xhr.open == 'unknown';

// 解决方案
function isHostMethod(object, property) {
  var t = typeof object[property];
  return t == 'function' || (!!(t == 'object' && object[property])) || t == 'unknown';
};

// 怪癖检测: 检测浏览器有什么缺陷

// 用户代理检测
// 12.client.info.js
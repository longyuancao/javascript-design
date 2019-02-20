// window 对象
// 全局作用域
var age = 29;
function sayAge() {
  console.log(this.age);
};
console.log(window.age); // 29
sayAge(); // 29
window.sayAge(); // 29

var age = 29; // [Configurable: false]
window.color = "red";
// 在 IE < 9 时抛出错误,在其他浏览器中都返回false
delete window.age;
// 在 IE < 9 时抛出错误,true
delete window.color;
console.log(window.age); // 29
console.log(window.color); // undefined

var newValue = oldValue; // 报错
var newValue = window.oldValue // 没问题

// 窗口关系及框架
/**
<html>
  <head>
    <title>Frameset Example</title>
  </head>
  <frameset rows="160,*">
    <frame src="frame.html" name="topFrame">
    <frameset cols="50%,50%">
      <frame src="anotherframe.html" name="leftFrame">
      <frame src="yetanother.html" name="rightFrame">
    </frameset>
  </frameset>
</html> 
 */

// 引用上方的框架(frame)
window.frames[0];
window.frames['topFrame'];
// 最佳方式
// top: 指向最外层的框架
top.frames[0];
top.frames['topFrame'];

// location 对象

// 查询字符串参数
function getQueryStringArgs() {
  var qs = (location.search.length > 0 ? location.search.substring(1) : '');
  var args = {};
  var items = qs.length ? qs.split('&') : [];
  var item = null;
  var name = null;
  var value = null;
  var len = items.length;
  for (i = 0; i < len; i++) {
    item = items[i].split('=');
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    if (name.length) {
      args[name] = value;
    }
  }
  return args;
};

// 位置操作
location.assign('http://www.baidu.com');
window.location = 'http://www.baidu.com';
location.href = 'http://www.baidu.com';

// 初始URL: http://www.wrox.com/wileycda/

// http://www.wrox.com/wileycda/#section1
location.hash = '#section1'

// http://www.wrox.com/wileycda/?q=javascript
location.search = '?q=javascript';

// http://www.yahoo.com/wileycda/
location.hostname = 'www.yahoo.com';

// http://www.yahoo.com/mydir/
location.pathname = 'mydir';

// http://www.yahoo.com:8080/wileycda/
location.port = '8080';

// 跳转后不能回到前一个页面
location.replace('http://www.baidu.com');

location.reload(); // 重新加载,有可能从缓存中加载
location.reload(true); // 重新加载,从服务器端加载

// navigator 对象

// 检测插件
// IE中不可用
function hasPlugin(name) {
  name = name.toLowercase();
  for (var i = 0; i < navigator.plugins.length; i++) {
    if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
      return true;
    }
  }
  return false;
};

//检查IE中插件
function hasIEPlugin(name) {
  try {
    new ActiveXObject(name);
    return true;
  } catch (e) {
    return false;
  }
};

// 检查所有浏览器中的 Flash
function hasFlash() {
  var result = hasPlugin('Flash');
  if (!result) {
    result = hasIEPlugin('ShockwaveFlash.ShockwaveFlash');
  }
  return result;
};

// history 对象

// 后退一页
history.go(-1);
history.back();

// 前进一页
history.go(1);
history.forward();

// 前进两页
history.go(2);

history.go('baidu.com');

if(history.length == 0){
  // 用户打开窗口后的第一个页面
}
// 获取浏览器左上角相对于屏幕的位置
var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
// Chrome,Firefox,Safari 中为 0, IE, Opera 为 工具栏像素高度
var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;

// 将屏幕移动到窗口左上角
window.moveTo(0, 0);
// 将窗口向下移动 100 像素
window.moveBy(0, 100);

// 窗口大小(页面视口大小)
var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;
if (typeof pageWidth != "number") {
  if (document.compatMode == "CSS1Compat") {
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientHeight;
  }
  else {
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
  }
}

window.resizeTo(100, 100);
window.resizeByo(0, 100);
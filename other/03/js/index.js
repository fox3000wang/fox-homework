login.onclick = loginHandler;

function loginHandler() {
  console.log('[loginHandler] ');

  mask.className = 'mask-popup';
  loginPage.className = 'login-popup';
  center(loginPage);
  addMoveAble(loginTitle, loginPage);
}

// 水平垂直居中采用js的方式，因为要计算x和y
function center(box) {
  const HTML = document.documentElement,
    winW = HTML.clientWidth,
    winH = HTML.clientHeight,
    boxW = box.offsetWidth,
    boxH = box.offsetHeight;
  box.style.left = (winW - boxW) / 2 + 'px';
  box.style.top = (winH - boxH) / 2 + 'px';
}

// title 触发移动的区域, box被移动的元素
function addMoveAble(title, box) {
  let mouseX, mouseY;
  title.addEventListener('mousedown', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    console.log(`x=${mouseX} y=${mouseY}`);
    box.parentElement.addEventListener('mousemove', MouseMoveHandler);
  });

  function MouseMoveHandler(e) {
    offsetX = e.clientX - mouseX;
    offsetY = e.clientY - mouseY;
    box.style.left = parseInt(box.style.left) + offsetX + 'px';
    box.style.top = parseInt(box.style.top) + offsetY + 'px';
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  box.parentElement.addEventListener('mouseup', e => {
    console.log('mouseup');
    box.parentElement.removeEventListener('mousemove', MouseMoveHandler);
  });
}

// 拖拽相关 https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API
/*
function dragstartHandler(ev) {
  console.log(`[dragstart_handler]`);
  //ev.dataTransfer.setData('text/plain', ev.target.id);
  console.log(ev.target.id);
}

function dragoverHandler(ev) {
  console.log(`[dragstart_handler]`);
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'move';
  console.log(ev.target.id);
}

function dropHandler(ev) {
  ev.preventDefault();
  console.log(ev.target.id);
}

window.addEventListener('DOMContentLoaded', () => {
  loginPage.addEventListener('dragstart', dragstartHandler);
  loginPage.addEventListener('ondragover', dragoverHandler);
  loginPage.addEventListener('ondrop', dropHandler);
});
*/

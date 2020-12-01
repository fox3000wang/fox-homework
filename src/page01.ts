
/**
 * 百度登录框拖拽效果
 * @param root 
 */
export default function page01(root:HTMLElement):void{

  const html = `
    <div id="mask" class="mask-close"></div>
    <div id="bg">
        <div id="top">
            <div id="top-left">
                <div>新闻</div>
                <div>视频</div>
                <div>地图</div>
                <div>贴吧</div>
                <div>好123</div>
                <div>学术</div>
                <div>更多</div>
            </div>
            <div id="top-right">
                <div id="login">登录</div>
            </div>
        </div>
        <div id="center">
            <div id="logo"></div>
            <div id="search"></div>
        </div>
        <div id="bottom"></div>
    </div>
    <div id="loginPage" class="login-close">
        <div id="loginTitle" class="login-title">拖动我可以挪动</div>
        
    </div>
  `;
  root.innerHTML = html;

  const login:HTMLElement = document.getElementById('login');
  const mask:HTMLElement = document.getElementById('mask');
  const loginPage:HTMLElement = document.getElementById('loginPage');
  const loginTitle:HTMLElement = document.getElementById('loginTitle');
  
  login.onclick = loginHandler;

  function loginHandler() {
    console.log('[loginHandler] ');

    mask.className = 'mask-popup'; // 通过ccs来实现弹出遮罩窗的效果
    loginPage.className = 'login-popup';
    center(loginPage);
    addMoveAble(loginTitle, loginPage);
  }

  // 水平垂直居中采用js的方式，因为要计算x和y
  function center(box:HTMLElement) {
    const HTML = document.documentElement,
      winW = HTML.clientWidth,
      winH = HTML.clientHeight,
      boxW = box.offsetWidth,
      boxH = box.offsetHeight;
    box.style.left = (winW - boxW) / 2 + 'px';
    box.style.top = (winH - boxH) / 2 + 'px';
  }

  // title 触发移动的区域, box被移动的元素
  function addMoveAble(title:HTMLElement, box:HTMLElement) {
    let mouseX:number, mouseY:number;
    
    title.addEventListener('mousedown', (e:MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      console.log(`x=${mouseX} y=${mouseY}`);
      box.parentElement.addEventListener('mousemove', MouseMoveHandler);
    });

    const MouseMoveHandler = (e:MouseEvent) => {
      let offsetX = e.clientX - mouseX;
      let offsetY = e.clientY - mouseY;
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
}
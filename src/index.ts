// <- vscode 这里提示警告, 不知道为什么

import page01 from './pages/page01';
import page02 from './pages/page02';
import page03 from './pages/page03';
import page05 from './pages/page05';
import page06 from './pages/page06';
import page08 from './pages/page08';
import page10 from './pages/page10';

require('./css/reset.css');
require('./css/main.css');
require('./css/page01.css');
require('./css/page02.css');
require('./css/page03.css');
require('./css/page04.css');
require('./css/page05.css');
require('./css/page06.css');
require('./css/page07.css');
require('./css/page08.css');
require('./css/page09.css');
require('./css/page10.css');
require('./css/page11.css');

/**
 * 整个项目的入口，这里只负责切换页面，不负责任何业务逻辑
 */
const root = document.getElementById('root');
const btn = document.getElementById('btn');

const funs:Array<Function> = [null,page01,page02,page03,null,page05,page06,null,page08,null,page10];

for(let i = 1; i < 11; i++){
  const div = document.createElement('div');
  btn.appendChild(div);

  div.innerHTML = `page${i}`;
  div.addEventListener('click', ()=>funs[i](root));
}

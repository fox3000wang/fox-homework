// <- vscode 这里提示警告, 不知道为什么

import page01 from './page01';
import page03 from './page03';
import page05 from './page05';
import page06 from './page06';
import page08 from './page08';

require('./css/reset.css');
require('./css/main.css');
require('./css/page01.css');
require('./css/page06.css');
require('./css/page05.css');
require('./css/page08.css');

/**
 * 整个项目的入口，这里只负责切换页面，不负责任何业务逻辑
 */
const root = document.getElementById('root');
const btn = document.getElementById('btn');

const funs:Array<Function> = [null,page01,null,page03,null,page05,page06,null,page08];

for(let i = 1; i < 11; i++){
  const div = document.createElement('div');
  btn.appendChild(div);

  div.innerHTML = `page${i}`;
  div.addEventListener('click', ()=>funs[i](root));
}

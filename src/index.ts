//
import page01 from './page01';
import page03 from './page03';
import page08 from './page08';

require('./css/reset.css');
require('./css/main.css');
require('./css/page01.css');

/**
 * 整个项目的入口，这里只负责切换页面，不负责任何业务逻辑
 */
const root = document.getElementById('root');

const page01div:HTMLElement = document.getElementById('page01');

const page03div:HTMLElement = document.getElementById('page03');

const page08div:HTMLElement = document.getElementById('page08');

page01div.addEventListener('click',()=>{
  page01(root);
})
page03div.addEventListener('click',()=>{
  page03(root);
})
page08div.addEventListener('click',()=>{
  page08(root);
})



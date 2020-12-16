import { Waterfall } from '../components';
import { queryData } from '../common/queryData';
import { LazyImageLoader } from '../components';


/**
 * 瀑布流效果
 * @param root 瀑布流的根节点
 * @param page 瀑布流的数量
 */
export default function page03(root:HTMLElement, page:number = 3):void{

  if(!root){
    throw Error('root must not be null');
  }

  page = !page ? 3 : page; // 防止被传个0

  const div = `<div class="column"></div>`;
  const column = Array.apply(null,Array(page)).map(()=>div).join('+');
  const html = `
  <div class="container clearfix">${column}</div><div class="loadMore"></div>
  `
  root.innerHTML = html;

  const container = document.querySelector('.container');
  const columns:Array<HTMLElement> = container.querySelectorAll('.column');
  const loadMore:HTMLElement = document.querySelector('.loadMore');

  
  new Waterfall({columns,loadMore,queryData}, LazyImageLoader ).init();

}

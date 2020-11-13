import LazyImage from './LazyImage';
import Waterfall from './Waterfall';

/**
 * 瀑布流效果
 * @param root 瀑布流的根节点
 * @param page 瀑布流的数量
 */
export default function page03(root:any, page:number){

  page = !page ? 3 : page; 

  const div = `<div class="column"></div>`;
  const column = Array.apply(null,Array(page)).map(()=>div).join('+');
  const html = `
  <div class="container clearfix">${column}</div><div class="loadMore"></div>
  `
  root.innerHTML = html;

  const container = document.querySelector('.container');
  const columns = container.querySelectorAll('.column');
  const loadMore = document.querySelector('.loadMore');

  new Waterfall({columns,loadMore}, LazyImage).init();

}
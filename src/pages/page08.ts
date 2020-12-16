import { Magnifier } from '../components';

/**
 * 百度放大镜效果
 * @param root 
 */
export default function page08(root:HTMLElement){

  if(!root){
    throw Error('root must not be null');
  }

  const smallPic = 'http://img10.360buyimg.com/n1/s450x450_jfs/t1/132022/23/12216/60913/5f86195bEacd08599/c5dc348d3f943324.jpg';
  const bigPic = 'http://img10.360buyimg.com//n0/jfs/t1/132022/23/12216/60913/5f86195bEacd08599/c5dc348d3f943324.jpg';

  const html = `
  <section class="magnifier clearfix">
    <div class="abbre">
      <img src="${smallPic}">
      <div class="mark"></div>
    </div>
    <div class="origin">
      <img class="originImg" src="${bigPic}">
    </div>
    </section>
  <script src="jquery.min.js"></script>
  `
  ;
  root.innerHTML = html;

  const abbre:HTMLElement = document.getElementsByClassName('abbre')[0] as HTMLElement;
  const mark:HTMLElement = document.getElementsByClassName('mark')[0] as HTMLElement;;
  const originDiv:HTMLElement = document.getElementsByClassName('origin')[0] as HTMLElement;;
  const originImg:HTMLElement = document.getElementsByClassName('originImg')[0] as HTMLElement;

  const magnifier:Magnifier = new Magnifier();
  magnifier.registered(abbre, mark, originDiv, originImg);
}
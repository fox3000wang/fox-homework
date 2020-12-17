import { Carousel3D } from '../components/Carousel3D';

/**
 * 3D轮播图
 * @param root 
 */
export default function page10(root:HTMLElement):void{

  if(!root){
    throw Error('root must not be null');
  }

  root.innerHTML = `
  <div id="top">
   <div class="small"> 
    <ul> 
     <li class="" style="opacity: 0.4;"><img src="./01.jpg" /></li> 
     <li class="" style="opacity: 0.4;"><img src="./02.jpg" /></li> 
     <li class="" style="opacity: 0.4;"><img src="./03.jpg" /></li> 
     <li class="" style="opacity: 0.4;"><img src="./04.jpg" /></li> 
     <li style="opacity: 1;" class="hove"><img src="./05.jpg" /></li> 
     <li class="" style="opacity: 0.4;"><img src="./06.jpg" /></li> 
     <li class="" style="opacity: 0.4;"><img src="./07.jpg" /></li> 
     <li class="" style="opacity: 0.4;"><img src="./08.jpg" /></li> 
     <li class="" style="opacity: 0.4;"><img src="./09.jpg" /></li> 
    </ul> 
   </div> 
  </div> 
  <div id="box"> 
   <div class="bg"></div> 
   <div id="list"> 
    <ul> 
     <li style="width: 110px; height: 140px; top: 172px; left: 708px; z-index: 2;" class=""> <img src="./01(1).jpg" /> 
      <div style="opacity: 0.75;"></div> <p class="b_tit" style="bottom: -120px;"> <span class="opacity"></span> <span class="tit"> <span>蒙其&middot;D&middot;路飞<em>&nbsp;&nbsp;&nbsp;&nbsp;草帽海贼团【船长】</em></span> <em>恶魔果实：橡胶果实<br />悬赏：3千万（可可亚西村事件）→1亿（阿拉巴斯坦事件）→3亿（司法岛事件)→4亿（顶上战争后）</em> </span> </p> </li> 
     <li style="width: 140px; height: 180px; top: 132px; left: 770px; z-index: 4;" class=""> <img src="./02(1).jpg" /> 
      <div style="opacity: 0.75;"></div> <p class="b_tit" style="bottom: -120px;"> <span class="opacity"></span> <span class="tit"> <span>罗罗诺亚&middot;索隆<em>&nbsp;&nbsp;&nbsp;&nbsp;草帽海贼团【剑士】</em></span> <em>悬赏：6千万（阿拉巴斯坦事件）→1亿2000万（司法岛事件）</em> </span> </p> </li> 
     <li style="width: 204px; height: 260px; top: 92px; left: 844px; z-index: 6;" class=""> <img src="./03(1).jpg" /> 
      <div style="opacity: 0.75;"></div> <p class="b_tit" style="bottom: -120px;"> <span class="opacity"></span> <span class="tit"> <span>娜美<em>&nbsp;&nbsp;&nbsp;&nbsp;草帽海贼团【航海士】</em></span> <span>悬赏：1600万（司法岛事件）</span> </span> </p> </li> 
     <li style="width: 260px; height: 332px; top: 56px; left: 640px; z-index: 8;" class=""> <img src="./04(1).jpg" /> 
      <div style="opacity: 0.75;"></div> <p class="b_tit"> <span class="opacity"></span> <span class="tit"> <span>乌索普<em>&nbsp;&nbsp;&nbsp;&nbsp;草帽海贼团【狙击手】</em></span> <em>悬赏：3000万（司法岛事件）</em> </span> </p> </li> 
     <li style="width: 344px; height: 440px; top: 0px; left: 352px; z-index: 10;" class="hove"> <img src="./05(1).jpg" /> 
      <div style="opacity: 0;"></div> <p class="b_tit" style="bottom: -120px; "> <span class="opacity"></span> <span class="tit"> <span>香吉士<em>&nbsp;&nbsp;&nbsp;&nbsp;草帽海贼团【厨师】</em></span> <em>悬赏：7700万（司法岛事件）</em> </span> </p> </li> 
     <li style="width: 260px; height: 332px; top: 56px; left: 148px; z-index: 8;" class=""> <img src="./06(1).jpg" /> 
      <div style="opacity: 0.75;"></div> <p class="b_tit"> <span class="opacity"></span> <span class="tit"> <span>托尼托尼&middot;乔巴<em>&nbsp;&nbsp;&nbsp;&nbsp;草帽海贼团【船医】</em></span> <em>恶魔果实：动物系人人果实<br />悬赏：50贝利（司法岛事件）</em> </span> </p> </li> 
     <li style="width: 204px; height: 260px; top: 92px; left: 0px; z-index: 6;" class=""> <img src="./07(1).jpg" /> 
      <div style="opacity: 0.75;"></div> <p class="b_tit"> <span class="opacity"></span> <span class="tit"> <span>弗兰奇<em>&nbsp;&nbsp;&nbsp;&nbsp;草帽海贼团【船匠】</em></span> <em>悬赏：4400万贝利（司法岛事件）</em> </span> </p> </li> 
     <li style="width: 140px; height: 180px; top: 132px; left: 148px; z-index: 4;" class=""> <img src="./08(1).jpg" /> 
      <div style="opacity: 0.75;"></div> <p class="b_tit"> <span class="opacity"></span> <span class="tit"> <span>布鲁克<em>&nbsp;&nbsp;&nbsp;&nbsp;草帽海贼团【音乐家】</em></span> <em>恶魔果实：超人系黄泉果实<br />悬赏：3300万贝利</em> </span> </p> </li> 
     <li style="width: 110px; height: 140px; top: 172px; left: 232px; z-index: 2;" class=""> <img src="./09(1).jpg" /> 
      <div style="opacity: 0.75;"></div> <p class="b_tit"> <span class="opacity"></span> <span class="tit"> <span>妮可&middot;罗宾<em>&nbsp;&nbsp;&nbsp;&nbsp;草帽海贼团【考古学家】</em></span> <em>恶魔果实：超人系花花果实<br />悬赏：7900万贝利（奥哈拉事件）→8000万贝利（司法岛事件）</em> </span> </p> </li> 
    </ul> 
    <a href="javascript:;" class="prev"></a> 
    <a href="javascript:;" class="next"></a> 
   </div> 
  </div>
  `;

  new Carousel3D();

}
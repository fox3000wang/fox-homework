


class Head extends Object{

  public static readonly ON_CHANGE:string = 'ON_CHANGE';
  private lis:HTMLCollection;
  private current:number = 0;

  public getCurrent():number{
    return this.current;
  }
  public setCurrent(current:number):void{
    if(this.current !== current){
      this.current = current;
      this.tab();
    }
  }
  
  constructor(element:HTMLElement){
    super();
    this.lis = element.getElementsByTagName('li');
    this.init();
  }

  // 初始化,一般只执行一次
  init = () => {
    for (let i:number = 0; i < this.lis.length; i++) {
      const li:any = this.lis[i];
      li.index = i;
      li.addEventListener('mouseover', (e:MouseEvent) => {
        startMove(e.currentTarget, { opacity: 100 });
      });
      li.addEventListener('mouseout', (e:any) => {
        if (e.currentTarget.className !== 'hove'){
          startMove(e.currentTarget, { opacity: 40 });
        }
      });
      li.addEventListener('click', (e:any) => {
        this.current = e.currentTarget.index;
        this.tab();
        this.onChange();
      });
    }
    this.tab();
  }

  // 小图标点击
  tab = () => {
    for (let i:number = 0; i < this.lis.length; i++) {
      const li:any = this.lis[i];
      li.className = '';
      startMove(li, { opacity: 40 });
    }
    this.lis[this.current].className = 'hove';
    startMove(this.lis[this.current], { opacity: 100 });
  }

  onChange = () => {
    const event:CustomEvent = new CustomEvent(Head.ON_CHANGE);
    dispatchEvent(event);
  }

}

class Body extends Object{
  
  private readonly position:Array<object> = [
    { width: 344, height: 440, top: 0, left: 352, zIndex: 10 },
    { width: 260, height: 332, top: 56, left: 148, zIndex: 8 },
    { width: 204, height: 260, top: 92, left: 0, zIndex: 6 },
    { width: 140, height: 180, top: 132, left: 148, zIndex: 4 },
    { width: 110, height: 140, top: 172, left: 232, zIndex: 2 },
    { width: 110, height: 140, top: 172, left: 708, zIndex: 2 },
    { width: 140, height: 180, top: 132, left: 770, zIndex: 4 },
    { width: 204, height: 260, top: 92, left: 844, zIndex: 6 },
    { width: 260, height: 332, top: 56, left: 640, zIndex: 8 },
  ];
  private target:Array<object> = [];
  private lis:HTMLCollection;
  private current:number = 0;

  constructor(element:HTMLElement){
    super();
    this.lis = element.getElementsByTagName('li');
    this.init();
  }

  init = () => {
    for (let i = 0; i < this.lis.length; i++) {
      const li:any = this.lis[i];
      const pos:any = this.position[i];
      this.target[i] = pos;
      li.index = i;
      li.style.width = `${pos.width}px`;
      li.style.height = `${pos.height}px`;
      li.style.top = `${pos.top}px`;
      li.style.left = `${pos.left}px`;
      li.style.zIndex = pos.zIndex;
      
      myAddEvent(li, 'mouseover', (e:MouseEvent) => {
        let element:HTMLElement = e.currentTarget as HTMLElement;
        if(element.localName === 'li'){
          element = element.getElementsByTagName('div')[0];
          startMove(element, { opacity: 0 });
        }
      });

      myAddEvent(li, 'mouseout', (e:MouseEvent) => {
        const li:any = e.currentTarget;
        let div:HTMLElement;
        if(li.localName === 'li'){
          div = li.getElementsByTagName('div')[0];
        }
        if(this.current === li.index){
          startMove(div, { opacity: 0 });
        } else {
          startMove(div, { opacity: 75 });
        }
      });

      myAddEvent(li, 'click', (e:MouseEvent) => {
        const li:any = e.currentTarget;
        this.current = li.index;
  
        this.reset();
        this.sort();
        this.move();
      });
      
      this.one();
    }
  }

  reset = () => {
    this.position.forEach((e,i)=> this.target[i] = e);
  }

  sort = () => {
    for (let i:number = 0; i < this.current; i++) {
      this.target.unshift(this.target.pop());
    }
  }

  move = () => {
    for (let i:number = 0; i < this.lis.length; i++) {
      const li:any = this.lis[i];
      const div = li.getElementsByTagName('div')[0];
      startMove(div, { opacity: 75 });
      startMove(li, this.target[i], this.one);
    }
    this.lis[this.current].className = 'hove';
  }

  // 动画播放完毕以后, 把当前的一张遮罩去掉
  one = () => {
    for (let i:number = 0; i < this.lis.length; i++) {
      const li:any = this.lis[i];
      if (li.index === this.current) {
        let oDiv = li.getElementsByTagName('div')[0];
        startMove(oDiv, { opacity: 0 });
      }
    }
  }

}

/**
 * 3D轮播图组件
 * 
 * 核心原理：
 *    其实就是一张图片, 长(w),宽(h),x,y,遮罩不透明度(o), 都是数值。
 *    1.图片有一个原始的固定位置，然后有运动后的目标位置。
 *      比如: w 20->40 h 30->60 x 0->20 y 0->20 o 40->100
 *    2.根据动画的播放时间,算下来,每30毫秒的运动速度 speed
 *    3.然后开一个定时器,每间隔30毫秒,把图片的当前属性和目标属性比较
 *      如果不相等,则把当前的图片属性的数值加上speed
 *      如果全部都相等了，则动画播放完毕，关闭定时器。
 *    4.然后画面上9张图片一起播放动画，就可以达到这个效果
 *    5.设计得比较好的一点就是通过数值来驱动画面的变化。
 */
export class Carousel3D{
  
  private head:Head;
  private body:Body;

  constructor(){

    let oTop = document.getElementById('top');
    this.head = new Head(oTop);

    let oBut = document.getElementById('list');
    this.body = new Body(oBut);

    //this.head.
    
    // 自动翻页
    // let timer:any = null;
    // //let oSmall = this.getClass(oTop, 'small')[0];
    // let oSmall = oTop.getElementsByClassName('small')[0];
    // const autoLoop = () => {
    //   oSmall.onmouseover = oBut.onmouseover = e => {
    //     clearInterval(timer);
    //   };
    //   oSmall.onmouseout = oBut.onmouseout = e => {
    //     clearInterval(timer);
    //     timer = setInterval(setInter, 5000);
    //   };
    //   timer = setInterval(setInter, 5000);
  
    //   function setInter() {
    //     iNow++;
    //     if (iNow > aLi.length - 1) {
    //       iNow = 0;
    //     }
    //     tab();
    //   }
    // }
    // autoLoop();
  }
  
}


function myAddEvent(obj, sEvent, fn){
  if (obj.attachEvent) {
    obj.attachEvent('on' + sEvent, function () {
      fn.call(obj);
    });
  } else {
    obj.addEventListener(sEvent, fn, false);
  }
}


function getStyle(obj, attr){
  return obj.currentStyle
    ? obj.currentStyle[attr]
    : getComputedStyle(obj, false)[attr];
}

function startMove(obj:any, json:any, fnEnd?:any){
  if (obj.timer){
    clearInterval(obj.timer);
  } 

  obj.timer = setInterval(() => {
    doMove(obj, json, fnEnd);
  }, 30);
}

/**
   * 整个动画播放的核心
   * @param obj
   * @param json 
   * @param fnEnd 
   */
  function doMove(obj, json, fnEnd){
    let iCur = 0;
    let attr = '';
    let bStop = true;
  
    for (attr in json) {
      attr === 'opacity'
        ? (iCur = parseInt(100 * parseFloat(getStyle(obj, 'opacity'))))
        : (iCur = parseInt(getStyle(obj, attr)));
  
      if (isNaN(iCur)) iCur = 0;
  
      let iSpeed;
      if (navigator.userAgent.indexOf('MSIE 8.0') > 0) {
        iSpeed = (json[attr] - iCur) / 3;
      } else {
        iSpeed = (json[attr] - iCur) / 5;
      }
      
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
  
      // if(obj.index == 0){
      //   console.log(`${obj.localName} ${obj.index} ${attr} ${json[attr]} ${iCur} ${iSpeed}`);
      // }
      // (parseInt(json[attr] !== iCur))
      // 天坑! 这里会碰到设置高度的时候就差一个像素
      // 导致动画永远无法结束
      if (Math.abs(parseInt(json[attr]) - iCur) > 1){
        bStop = false;
      }
  
      if (attr === 'opacity') {
        obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
        obj.style.opacity = (iCur + iSpeed) / 100;
      } else {
        attr === 'zIndex'
          ? (obj.style[attr] = iCur + iSpeed)
          : (obj.style[attr] = iCur + iSpeed + 'px');
      }
    }
    
    if (bStop) {
      clearInterval(obj.timer);
      obj.timer = null;
      fnEnd && fnEnd();
    }
  }
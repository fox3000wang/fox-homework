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

  private position:object = [
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

  constructor(){

    let oTop = document.getElementById('top');
    let oBut = document.getElementById('list');
    
    let oTli = oTop.getElementsByTagName('li');
    let aLi = oBut.getElementsByTagName('li');
    
    let i = 0;
    let iNow = 0;

    
    let aSort:any = [];

    // 初始化小图标部分
    for (i = 0; i < oTli.length; i++) {
      oTli[i].index = i;

      this.myAddEvent(oTli[i], 'mouseover', (e:MouseEvent) => {
        this.startMove(e.currentTarget, { opacity: 100 });
      });
      this.myAddEvent(oTli[i], 'mouseout', (e:MouseEvent) => {
        if (e.currentTarget.className !== 'hove'){
          this.startMove(e.currentTarget, { opacity: 40 });
        } 
      });
      this.myAddEvent(oTli[i], 'click', (e:MouseEvent) => {
        iNow = e.currentTarget.index;
        tab();
      });
    }

    // 初始化大图
    for (i = 0; i < aLi.length; i++) {
      aLi[i].index = i;
      aLi[i].style.width = this.position[i].width + 'px';
      aLi[i].style.height = this.position[i].height + 'px';
      aLi[i].style.top = this.position[i].top + 'px';
      aLi[i].style.left = this.position[i].left + 'px';
      aLi[i].style.zIndex = this.position[i].zIndex;
      aSort[i] = this.position[i];

      this.myAddEvent(aLi[i], 'mouseover', (e:MouseEvent) => {
        let element:HTMLElement = e.currentTarget as HTMLElement;
        if(element.localName === 'li'){
          element = element.getElementsByTagName('div')[0];
          this.startMove(element, { opacity: 0 });
        }
      });

      this.myAddEvent(aLi[i], 'mouseout', (e:MouseEvent) => {
        const li:HTMLElement = e.currentTarget as HTMLElement;
        let div:HTMLElement;
        if(li.localName === 'li'){
          div = li.getElementsByTagName('div')[0];
        }
        // if (li.style.width === '344px') {
        if(iNow === li.index){
          this.startMove(div, { opacity: 0 });
        } else {
          this.startMove(div, { opacity: 75 });
        }
      });

      this.myAddEvent(aLi[i], 'click', (e:MouseEvent) => {
        let iSort = e.currentTarget.index;
        iNow = e.currentTarget.index;
        sort();
        for (i = 0; i < iSort; i++) {
          aSort.unshift(aSort.pop());
        }
        sMove();
      });
    }

    // 小图标点击
    const tab = () => {
      for (i = 0; i < oTli.length; i++) {
        (oTli[i].className = ''), this.startMove(oTli[i], { opacity: 40 });
      }
      oTli[iNow].className = 'hove';
      this.startMove(oTli[iNow], { opacity: 100 });
      let iSort = iNow;
      sort();
      for (i = 0; i < iSort; i++) {
        aSort.unshift(aSort.pop());
      }
      sMove();
    }

    const sort = () => {
      for (i = 0; i < aLi.length; i++) {
        aSort[i] = this.position[i];
      }
    }

    const sMove = () => {
      for (i = 0; i < aLi.length; i++) {
        let oDiv = aLi[i].getElementsByTagName('div')[0];
        this.startMove(oDiv, { opacity: 75 });
        
        this.startMove(aLi[i], aSort[i], one);
        aLi[i].className = '';
      }
      aLi[iNow].className = 'hove';
    }

    const one = () => {  
      for (i = 0; i < aLi.length; i++) {
        // 这里也会由于精度达不到,所以也要取舍
        //if (aLi[i].style.width === '344px') {
        if (parseFloat(aLi[i].style.width) >= 340) {
          let oDiv = aLi[i].getElementsByTagName('div')[0];
          this.startMove(oDiv, { opacity: 0 });
        }
      }
    }

    one();

    // 自动翻页
    let timer:any = null;
    let oSmall = this.getClass(oTop, 'small')[0];
    const autoLoop = () => {
      oSmall.onmouseover = oBut.onmouseover = e => {
        clearInterval(timer);
      };
      oSmall.onmouseout = oBut.onmouseout = e => {
        clearInterval(timer);
        timer = setInterval(setInter, 5000);
      };
      timer = setInterval(setInter, 5000);
  
      function setInter() {
        iNow++;
        if (iNow > aLi.length - 1) {
          iNow = 0;
        }
        tab();
      }
    }
    autoLoop();
  }

  getClass = (oParent, sClass) => {
    let aElem = document.getElementsByTagName('*');
    let aClass = [];
    let i = 0;
    for (i = 0; i < aElem.length; i++) {
      if (aElem[i].className === sClass) {
        aClass.push(aElem[i]);
      }
    }
    return aClass;
  }
  
  myAddEvent = (obj, sEvent, fn) => {
    if (obj.attachEvent) {
      obj.attachEvent('on' + sEvent, function () {
        fn.call(obj);
      });
    } else {
      obj.addEventListener(sEvent, fn, false);
    }
  }
  
  startMove = (obj:any, json:any, fnEnd?:any) => {
    if (obj.timer){
      clearInterval(obj.timer);
    } 
  
    obj.timer = setInterval(() => {
      this.doMove(obj, json, fnEnd);
    }, 30);
  }
  
  getStyle = (obj, attr) => {
    return obj.currentStyle
      ? obj.currentStyle[attr]
      : getComputedStyle(obj, false)[attr];
  }
  
  /**
   * 整个动画播放的核心
   * @param obj
   * @param json 
   * @param fnEnd 
   */
  doMove = (obj, json, fnEnd) => {
    let iCur = 0;
    let attr = '';
    let bStop = true;
  
    for (attr in json) {
      attr === 'opacity'
        ? (iCur = parseInt(100 * parseFloat(this.getStyle(obj, 'opacity'))))
        : (iCur = parseInt(this.getStyle(obj, attr)));
  
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

}

/**
 * 3D轮播图组件
 */
export class Carousel3D{

  private aPosition:object = [
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
    let aA = oBut.getElementsByTagName('a');
    let aP = this.getClass(oBut, 'b_tit');
    let oSmall = this.getClass(oTop, 'small')[0];

    let i = 0;
    let iNow = 0;

    let timer:any = null;
    let aSort:any = [];

    for (i = 0; i < oTli.length; i++) {
      oTli[i].index = i;

      this.myAddEvent(oTli[i], 'mouseover', (e:MouseEvent) => {
        this.startMove(e.target, { opacity: 100 });
      });
      this.myAddEvent(oTli[i], 'mouseout', (e:MouseEvent) => {
        if (e.target.className !== 'hove'){
          this.startMove(e.target, { opacity: 40 });
        } 
      });
      this.myAddEvent(oTli[i], 'click', (e:MouseEvent) => {
        iNow = e.target.index;
        tab();
      });
    }

    for (i = 0; i < aLi.length; i++) {
      aLi[i].index = i;
      aLi[i].style.width = this.aPosition[i].width + 'px';
      aLi[i].style.height = this.aPosition[i].height + 'px';
      aLi[i].style.top = this.aPosition[i].top + 'px';
      aLi[i].style.left = this.aPosition[i].left + 'px';
      aLi[i].style.zIndex = this.aPosition[i].zIndex;
      aSort[i] = this.aPosition[i];

      this.myAddEvent(aLi[i], 'mouseover', (e:MouseEvent) => {
        this.startMove(e.target, { opacity: 0 });
        if (e.target.style.width == '344px') {
          this.startMove(aP[e.target.index], { bottom: 0 });
        }
      });

      this.myAddEvent(aLi[i], 'mouseout', (e:MouseEvent) => {
        if (e.target.style.width == '344px') {
          this.startMove(aP[e.target.index], { bottom: -120 });
        } else {
          this.startMove(e.target, { opacity: 75 });
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

    this.myAddEvent(aA[0], 'click', (e:MouseEvent) => {
      aSort.unshift(aSort.pop());
      sMove();
      setInter();
    });

    this.myAddEvent(aA[1], 'click', (e:MouseEvent) => {
      aSort.push(aSort.shift());
      sMove();
      iNow--;
      if (iNow < 0) {
        iNow = aLi.length - 1;
      }
      tab();
    });

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
        aSort[i] = this.aPosition[i];
      }
    }

    const sMove = () => {
      for (i = 0; i < aLi.length; i++) {
        let oDiv = aLi[i].getElementsByTagName('div')[0];
        this.startMove(oDiv, { opacity: 75 });
        this.startMove(aLi[i], aSort[i], function () {
          one();
        });
        aLi[i].className = '';
      }
      
      aLi[iNow].className = 'hove';
    }

    const one = () => {  
      for (i = 0; i < aLi.length; i++) {
        if (aLi[i].style.width == '344px') {
          let oDiv = aLi[i].getElementsByTagName('div')[0];
          this.startMove(oDiv, { opacity: 0 });
        }
      }
    }

    one();
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
  
  doMove = (obj, json, fnEnd) => {
    let iCur = 0;
    let attr = '';
    let bStop = true;
  
    for (attr in json) {
      attr == 'opacity'
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
  
      if (parseInt(json[attr]) != iCur) bStop = false;
  
      if (attr == 'opacity') {
        obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
        obj.style.opacity = (iCur + iSpeed) / 100;
      } else {
        attr == 'zIndex'
          ? (obj.style[attr] = iCur + iSpeed)
          : (obj.style[attr] = iCur + iSpeed + 'px');
      }
    }
  
    if (bStop) {
      clearInterval(obj.timer);
      obj.timer = null;
      if (fnEnd) fnEnd();
    }
  }

}

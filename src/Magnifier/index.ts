
/**
 * 放大镜效果
 */
export default class Magnifier {

  private abbre:HTMLElement;
  private mark:HTMLElement;
  private originDiv:HTMLElement;
  private originImg:HTMLElement;

  public registered(abbre:HTMLElement, mark:HTMLElement, originDiv:HTMLElement, originImg:HTMLElement):void{
    if(!abbre || !mark || !originDiv || !originImg){
      throw Error(`Element is can't be null`);
    }

    this.abbre = abbre;
    this.mark = mark;
    this.originDiv = originDiv;
    this.originImg = originImg;

    // 注册在鼠标事件上的函数用箭头函数，
    // 可以让this指向实例本身，这样就可以实例里面的属性。
    this.abbre.addEventListener('mousemove', this.computed);
    this.abbre.addEventListener('mouseenter', this.computed);
    this.abbre.addEventListener('mouseenter', this.showOriginImg); 
    this.abbre.addEventListener('mouseleave', this.hideOriginImg);
  }

  public unregistered(){
    this.abbre = null;
    this.mark = null;
    this.originDiv = null;
    this.originImg = null;

    this.abbre.removeEventListener('mousemove', this.computed);
    this.abbre.removeEventListener('mouseenter', this.computed);
    this.abbre.removeEventListener('mouseenter', this.showOriginImg); 
    this.abbre.removeEventListener('mouseleave', this.hideOriginImg);
  }

  hideOriginImg = () => {
    this.mark.style.display = 'none';
    this.originDiv.style.display =  'none';
  }

  showOriginImg = () => {
    this.mark.style.display = 'block';
    this.originDiv.style.display = 'block';
  }

  computed = (ev:MouseEvent) => {
    let abbreW = this.abbre.clientWidth,
    abbreH = this.abbre.clientHeight,
    markW = this.mark.clientWidth,
    markH = this.mark.clientHeight,
    originW = this.originDiv.clientWidth,
    originH = this.originDiv.clientHeight;

    let originImgW = originW / (markW / abbreW);
    let originImgH = originH / (markH / abbreH);
    this.originImg.style.width = `${originImgW}px`;
    this.originImg.style.height = `${originImgH}px`;

    // 计算MARK的位置以及根据MARK的移动计算出大图的移动距离
    let markT = ev.pageY - this.abbre.offsetTop - markH / 2;
    let markL = ev.pageX - this.abbre.offsetLeft - markW / 2;
    
    // 边界判断
    let minL = 0, minT = 0;
    let maxL = abbreW - markW;
    let maxT = abbreH - markH;
    markL = markL < minL ? minL : (markL > maxL ? maxL : markL);
    markT = markT < minT ? minT : (markT > maxT ? maxT : markT);

    let originImgL = -markL / abbreW * originImgW;
    let originImgT = -markT / abbreH * originImgH;

    this.mark.style.left = `${markL}px`;
    this.mark.style.top = `${markT}px`;
    this.originImg.style.left= `${originImgL}px`;
    this.originImg.style.top= `${originImgT}px`;
  }

}
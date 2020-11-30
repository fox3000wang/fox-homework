

export default function page08(root){

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

  window.onload = function (){

    const abbre = document.getElementsByClassName('abbre')[0];
    const mark = document.getElementsByClassName('mark')[0];
    const originDiv = document.getElementsByClassName('origin')[0];
    const originImg = document.getElementsByClassName('originImg')[0];
			
    function computed(ev) {
      let abbreW = abbre.clientWidth,
      abbreH = abbre.clientHeight,
      markW = mark.clientWidth,
      markH = mark.clientHeight,
      originW = originDiv.clientWidth,
      originH = originDiv.clientHeight;

      let originImgW = originW / (markW / abbreW);
      let originImgH = originH / (markH / abbreH);
      originImg.style.width = `${originImgW}px`;
      originImg.style.height = `${originImgH}px`;

      // 计算MARK的位置以及根据MARK的移动计算出大图的移动距离
      let markT = ev.pageY - abbre.offsetTop - markH / 2;
      let markL = ev.pageX - abbre.offsetLeft - markW / 2;
      
      // 边界判断
      let minL = 0, minT = 0,
        maxL = abbreW - markW,
        maxT = abbreH - markH;
      markL = markL < minL ? minL : (markL > maxL ? maxL : markL);
      markT = markT < minT ? minT : (markT > maxT ? maxT : markT);
      
      console.log(`${markL} ${abbreW} ${originImgW}`);

      let originImgL = -markL / abbreW * originImgW;
      let originImgT = -markT / abbreH * originImgH;

      mark.style.left = `${markL}px`;
      mark.style.top = `${markT}px`;
      originImg.style.left= `${originImgL}px`;
      originImg.style.top= `${originImgT}px`;
    }

    
    abbre.addEventListener('mousemove', computed);
    abbre.addEventListener('mouseenter',  ev => {
        mark.style.display = 'block';
        originDiv.style.display = 'block';
        computed(ev);
    });
    abbre.addEventListener('mouseleave', ev => {
        mark.style.display = 'none';
        originDiv.style.display =  'none';
    });
  }

}
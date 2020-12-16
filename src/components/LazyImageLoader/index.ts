/**
 * 图片懒加载器
 * context: 需要懒加载的DOM
 * attr: 存图片url的属性
 * threshold: 1
 *   IntersectionObserver.thresholds
 *   一个包含阈值的列表, 按升序排列, 列表中的每个阈值都是监听对象的交叉区域与边界区域的比率。
 *   当监听对象的任何阈值被越过时，都会生成一个通知(Notification)。
 *   如果构造器未传入值, 则默认值为0。
 * speed: 展现过渡动画的时间
 * callback: Function.prototype,
 */ 
export class LazyImageLoader {

  private config:any;
  private imageBoxList:Array<any>;
  private ob:any;

  /**
   * 初始化参数,合并传入参数和默认参数
   * @param options 
   */
  constructor(options:object) {
    
    options = options || {};
    let defaults = {
      context: document, // 
      attr: 'lazy-image', // 自定义的存图片url的地址
      threshold: 1, // 距离
      speed: 300, // 展现过渡动画的时间
      callback: Function.prototype,
    };
    this.init(Object.assign(defaults, options));
  }

  init(config:any) {
    // 把信息挂在到实例上：在其它方法中，基于实例即可获取这些信息
    this.config = config;
    this.imageBoxList = [];

    // 创建监听器
    const oboptions = {
      threshold: [config.threshold],
    };

    // IntersectionObserver 是懒加载的核心api,
    // https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
    // 开始监听所有加载图片的box对象
    this.ob = new IntersectionObserver(changes => {
      changes.forEach(item => {
        let { isIntersecting, target } = item;
        // isIntersecting: 返回一个布尔值
        // 如果目标元素与交叉区域观察者对象(intersection observer) 的根相交，则返回 true 
        if (isIntersecting) {
          // 也就是图片元素进入显示区域了, 就开始加载了。
          this.singleHandle(target);
          this.ob.unobserve(target);
        }
      });
    }, oboptions);

    this.observeAll(false);
  }

  
  /*
  单张图片的延迟加载, 逐行注释。

  1.先把图片的url放在lazy-image属性上,由于src是空所以不会加载。
  只在外面的div设置好宽和高,防止加载成功以后防止重绘。
  <div class="lazyImageBox" style="height: ${item.height}px;">
    <img src="" alt="" lazy-image="${item.pic}">
  </div>

  2.通过代码把lazy-image属性的值付给src,这个时候才开始加载。
  <div class="lazyImageBox" style="height: ${item.height}px;">
    <img src="${item.pic}" alt="">
  </div>

  3.图片加载结束以后,画面展现的时候,配置一些过度的动画,让展现更加优雅。
  */
  singleHandle(imgBox:HTMLElement) {
    
    let config = this.config;
    let imgObj = imgBox.querySelector('img');
    let trueImage = imgObj.getAttribute(config.attr);
    
    imgObj.src = trueImage; // 开始加载
    imgObj.removeAttribute(config.attr); // 移除不要的属性
    
    // 图片加载完毕
    imgObj.onload = () => {
      imgObj.style.transition = `opacity ${config.speed}ms`; // 设置展现过渡动画
      imgObj.style.opacity = "1"; // 透明度
      // 回调函数->插件的生命周期函数「回调函数 & 发布订阅」
      config.callback.call(this, imgObj);
    };
  }

  // 监听需要的DOM元素
  observeAll(refresh:boolean) {
    let config = this.config;
    let allImages = config.context.querySelectorAll(`img[${config.attr}]`);
    
    [].forEach.call(allImages, (item:HTMLElement) => {
      let imageBox = item.parentNode;
      if (refresh && this.imageBoxList.includes(imageBox)) return;
      this.imageBoxList.push(imageBox);
      this.ob.observe(imageBox);
    });
  }

  // 刷新：获取新增的需要延迟加载的图片，做延迟加载
  refresh() {
    this.observeAll(true);
  }
  
}
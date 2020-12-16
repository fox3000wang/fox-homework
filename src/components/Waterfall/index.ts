
export interface IWaterfall {
  columns : Array<HTMLElement>;
  queryData : Function;
  loadMore : HTMLElement;
}

/**
 * 瀑布流
 */
export class Waterfall {
  
  private columns:Array<any>;
  private loadMore:HTMLElement;
  private queryData:Function;
  private loader:any;
  private observe:any;

  constructor(options:IWaterfall, loader:any){
    this.columns = Array.from(options.columns);
    this.queryData = options.queryData;
    this.loadMore = options.loadMore;
    this.loader = loader;
  }
  
  // 页面中的数据绑定 TODO: 构建ui的逻辑也要剥离到外面
  // 但是ui的展现里面也涉及逻辑, 暂时没有好办法分离
  bindHTML = data => {
    
    data = data.map(item => {
      let AW = 230,
        BW = item.width,
        BH = item.height,
        AH = AW / (BW / BH);
      item.width = AW;
      item.height = AH;
      return item;
    });

    const length = this.columns.length;
    for (let i = 0; i < data.length; i += length) {
      let group = data.slice(i, i + length);
      
      group.sort((a, b) => a.height - b.height);
      this.columns.sort((a, b) => b.offsetHeight - a.offsetHeight);
      
      group.forEach((item, index) => {
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<a href="${item.link}">
                    <div class="lazyImageBox" style="height: ${item.height}px;">
                        <img src="" alt="" lazy-image="${item.pic}">
                    </div>
                    <p>${item.title}</p>
                </a>`;
        this.columns[index].appendChild(card);
      });
    }
  };

  /* 
    加载更多数据
    这里还是还是利用IntersectionObserver,监听loadMore这个元素
    如果滚动条滚到底部,这个元素露头了, 就调用queryData()再去服务器上拉新的数据,
    然后把新的dom的元素自己加载在loadMore的上面
  */
  loadMoreFunc = () => {
    // 创建监听器
    let oboptions = {
      threshold: [0],
    };
    // https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
    let ob = new IntersectionObserver(async changes => {
      let item = changes[0];
      if (item.isIntersecting) {
        let data = await this.queryData();
        this.bindHTML(data);
        this.observe.refresh(); // 新数据到位后, dom也改变了, 懒加载器需要刷新一下
      }
    }, oboptions);
    ob.observe(this.loadMore);
  };

  async init() {    
    let data = await this.queryData();
    this.bindHTML(data);
    if(this.loader){
      this.observe = new this.loader({
        threshold: 0.5,
      });
    }
    this.loadMoreFunc();
  }

}

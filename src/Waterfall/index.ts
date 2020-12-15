
class Waterfall {
  
  private columns:Array<any>;
  private loadMore;
  private loader;
  private observe;

  constructor(options:any, loader:any){
    this.columns = Array.from(options.columns);
    this.loadMore = options.loadMore;
    this.loader = loader ? loader : null;
  }
  
  // TODO:抽离到业务层
  // 基于AJAX从服务器端获取数据 
  queryData = () => {
    return new Promise(resolve => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', './data.json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
          let data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      };
      xhr.send(null);
    });
  };
  
  // 页面中的数据绑定
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
        // card.innerHTML = `<a href="${item.link}">
        //             <div class="lazyImageBox" style="height: ${item.height}px;">
        //                 <img src="" alt="" lazy-image="${item.pic}">
        //             </div>
        //             <p>${item.title}</p>
        //         </a>`;
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

  // 加载更多数据
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
        this.observe.refresh();
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

export default Waterfall;
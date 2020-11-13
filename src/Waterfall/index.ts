import LazyImage from '../LazyImage';

class Waterfall {
  //获取需要操作的DOM元素
  private columns;
  private loadMore;
  private observe = null;

  constructor(options:any){
    this.columns = Array.from(options.columns);
    this.loadMore = options.loadMore;
  }
  
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
    for (let i = 0; i < data.length; i += 3) {
      let group = data.slice(i, i + 3);
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

  // 加载更多数据
  loadMoreFunc = () => {
    // 创建监听器
    let oboptions = {
      threshold: [0],
    };
    let ob = new IntersectionObserver(async changes => {
      let item = changes[0];
      if (item.isIntersecting) {
        // 加载更多数据
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
    this.observe = new LazyImage({
      threshold: 0.5,
    });
    this.loadMoreFunc();
  }

}

export default Waterfall;
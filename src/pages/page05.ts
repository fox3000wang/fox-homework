
const baseHeight:number = 0;
const targetHeight:number = 200;
let h:number = baseHeight;

let id:NodeJS.Timeout;
let isDown:boolean = false;
let isUp:boolean = false;
let speed:number = 50;

// 产品列表面板缓冲池
const details:Array<HTMLElement> = [];

/**
 * 小米商城的 头部导航和产品分类导航
 * 实现的方式还是有点土
 * 主要还是用计时器来控制box的高
 * @param root 
 */
export default function page05(root:HTMLElement){
  
  if(!root){
    throw Error('root must not be null');
  }

  let html = `<div class="navigation" id="main">`;
  Object.keys(data).forEach(key => {
    const {name} = data[key];
    html += `<div class="item" id="${key}">${name}</div>`
  });
  html += `</div><div class="bg5"></div>`
  root.innerHTML = html;

  Object.keys(data).forEach(key => {
    const item = document.getElementById(key);
    item.addEventListener('mouseover', mouseoverHandler);
    item.addEventListener('mouseleave', mouseleaveHandler);
  });

}

/**
 * 如果已经创建了面板就直接返回
 * 如果没有在这个时候创建DOM,并加载图片
 * @param id
 */
function getDetailById(id:string):void{
  if(!details[id]){
    let html:string = `<div class="detail" id="${id}_detail">`;

    const {items} = data[id];
    items.forEach(element => {
      html += `
      <div class="pic">
        <img src="${element.pic}">
        <div class="picTxt">${element.name}</div>
      </div>`;
    });
    html += `</div>`;
    const e = document.createElement('div');
    e.innerHTML = html;
    // 让列表面板在按钮的子元素下
    // 这样就方便处理鼠标脱离了面板区域，也可以出发mouseleaveHandler
    document.getElementById(id).append(e);

    details[id] = document.getElementById(`${id}_detail`);
  }
  return details[id];
}

function mouseoverHandler(e:MouseEvent):void{
  if (isDown) return;
  if (isUp) return;
  isDown = true;

  let target:HTMLElement = e.target as HTMLElement;
  const detail = getDetailById(target.id);

  id = setInterval(() => {
    if (h < targetHeight) {
      detail.style.height = `${(h += speed)}px`;
    } else {
      stopDown(e);
    }
  }, 50);
}

function mouseleaveHandler(e:MouseEvent) {
  if (isUp) return;
  if (isDown) return;
  isUp = true;

  let target:HTMLElement = e.target as HTMLElement;
  const detail = getDetailById(target.id);

  id = setInterval(() => {
    if (h > baseHeight) {
      detail.style.height = `${(h -= speed)}px`;
    } else {
      stopUp(e);
    }
  }, 50);
}

function stopDown(e:MouseEvent) {
  isDown = false;
  clearInterval(id);
}

function stopUp(e:MouseEvent) {
  isUp = false;
  clearInterval(id);
}



const data = {
  xioami: {
    name: '小米手机',
    items:[
      {
        name:"小米10至尊版",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b11742a0be47f9d97bb6a13ea580018d.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name:"小米10",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a4a76ee684e51f0ee531ef3dc7f0aeaf.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name:"小米10青春版",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/3bf20f1df3f2e22c5b29ff07634f3c59.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name:"小米MIX Alpha",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5d19da60f9f62eb2aa5dcdbd7df19f0f.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name:"小米MIX Alpha",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5d19da60f9f62eb2aa5dcdbd7df19f0f.png?thumb=1&w=160&h=110&f=webp&q=90"
      }
    ]
  },
  hongmi: {
    name: '红米手机',
    items:[
      {
        name:"红米note9",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/584add2c9cfdb9eefe7b642bf191773a.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name:"红米note8",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/584add2c9cfdb9eefe7b642bf191773a.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name:"红米note7",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/584add2c9cfdb9eefe7b642bf191773a.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name:"红米note6",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/584add2c9cfdb9eefe7b642bf191773a.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name:"红米note5",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/584add2c9cfdb9eefe7b642bf191773a.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name:"红米note4",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/584add2c9cfdb9eefe7b642bf191773a.png?thumb=1&w=160&h=110&f=webp&q=90"
      }
    ]
  },
  tv: {
    name: '电视',
    items:[
      {
        name: "小米电视",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/174a2f9256a44b98f9e08bbe30528329.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name: "小米电视",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/174a2f9256a44b98f9e08bbe30528329.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name: "小米电视",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/174a2f9256a44b98f9e08bbe30528329.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name: "小米电视",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/174a2f9256a44b98f9e08bbe30528329.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name: "小米电视",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/174a2f9256a44b98f9e08bbe30528329.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name: "小米电视",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/174a2f9256a44b98f9e08bbe30528329.png?thumb=1&w=160&h=110&f=webp&q=90"
      }

    ]
  },
  notebook: {
    name: '笔记本',
    items: [
      {
        name:"小米游戏本",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bfdd3b985b4a9da58a1f5a861c5895f.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name:"小米游戏本",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bfdd3b985b4a9da58a1f5a861c5895f.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name:"小米游戏本",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bfdd3b985b4a9da58a1f5a861c5895f.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name:"小米游戏本",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bfdd3b985b4a9da58a1f5a861c5895f.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name:"小米游戏本",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bfdd3b985b4a9da58a1f5a861c5895f.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
      {
        name:"小米游戏本",
        pic:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bfdd3b985b4a9da58a1f5a861c5895f.png?thumb=1&w=160&h=110&f=webp&q=90"
      },
    ]
  },
};

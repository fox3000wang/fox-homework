

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
      }
    ]
  },
  hongmi: {
    name: '红米手机',
  },
  tv: {
    name: '电视',
  },
  notebook: {
    name: '笔记本',
  },
};

const baseHeight:number = 0;
const targetHeight:number = 200;
let h:number = 0;

let id:NodeJS.Timeout;
let isDown:boolean = false;
let isUp:boolean = false;
let speed:number = 100;

const details:Array<HTMLElement> = [];

export default function page05(root:HTMLElement){
  
  if(!root){
    throw Error('root must not be null');
  }

  let html = `<div class="navigation">`;
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

function getDetailById(id:string):void{
    if(!details[id]){
      let html:string = `
        <div class="detail" id="${id}_detail">
      `;
      const {items} = data[id];
      items.forEach(element => {
        html += `<div class="pic"><img src="${element.pic}"></div>`;
      });
      html += `</div>`;
      const e = document.createElement('div');
      e.innerHTML = html;
      document.getElementById(id).append(e);

      details[id] = document.getElementById(`${id}_detail`);
    }
    return details[id];
}

function mouseoverHandler(e:MouseEvent) {
  if (isUp) stopUp(e);
  if (isDown) return;
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
  if (isDown) stopDown(e);
  if (isUp) return;
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
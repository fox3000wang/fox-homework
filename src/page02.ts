
/**
 * bilibili导航
 * @param root 
 */
export default function page02(root:HTMLElement):void{

  if(!root){
    throw Error('root must not be null');
  }

  let html:string = `<div class="nav" id="nav">`;
  Object.keys(data).forEach(
    key => (html += `<div class="item" id="${key}">${data[key].name}</div>`)
  );
  html += `</div>`;

  Object.keys(data).forEach(key => {
    html += `<div class="content" id="${key}_content">`;
    const { pics } = data[key];
    pics.forEach((url, i) => {
      if (i === 0 || i === 4) {
        html += `<div class="block">`;
      }
      html += `<img class="pic" src="${url}"></img>`;
      if (i === 3) {
        html += `</div>`;
      }
    });
    html += `</div>`;
    html += `</div>`;
  });
  root.innerHTML = html;

  const nav = document.getElementById('nav');
  nav.addEventListener('mousedown', function (e) {
    const element = document.getElementById(`${e.target.id}_content`);
    element ? element.scrollIntoView({ behavior: 'smooth' }) : null;
  });

}

const pics = [
  'https://yanxuan-item.nosdn.127.net/cf7915f53969301c05c13317a499291d.jpg',
  'https://yanxuan-item.nosdn.127.net/cf7915f53969301c05c13317a499291d.jpg',
  'https://yanxuan-item.nosdn.127.net/cf7915f53969301c05c13317a499291d.jpg',
  'https://yanxuan-item.nosdn.127.net/cf7915f53969301c05c13317a499291d.jpg',
  'https://yanxuan-item.nosdn.127.net/cf7915f53969301c05c13317a499291d.jpg',
  'https://yanxuan-item.nosdn.127.net/cf7915f53969301c05c13317a499291d.jpg',
  'https://yanxuan-item.nosdn.127.net/cf7915f53969301c05c13317a499291d.jpg',
  'https://yanxuan-item.nosdn.127.net/cf7915f53969301c05c13317a499291d.jpg',
];

const data = {
  sport: {
    name: '体育',
    pics: [...pics],
  },
  art: {
    name: '艺术',
    pics: [...pics],
  },
  dance: {
    name: '舞蹈',
    pics: [...pics],
  },
  boxing: {
    name: '拳击',
    pics: [...pics],
  },
  other: {
    name: '其他',
    pics: [...pics],
  },
};
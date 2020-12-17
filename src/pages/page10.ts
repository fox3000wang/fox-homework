import { Carousel3D } from '../components/Carousel3D';


const data = [
  {
    small:'http://nos.netease.com/mail-online/84f42b50128ecc388cb54dce12efde9d/mail180x180.jpg',
    big:'https://yanxuan-item.nosdn.127.net/cf7915f53969301c05c13317a499291d.jpg',
  },
  {
    small:'http://nos.netease.com/mail-online/84f42b50128ecc388cb54dce12efde9d/mail180x180.jpg',
    big:"https://yanxuan-item.nosdn.127.net/821c7f7fe6f3b4260c9de1ecbaf0b92f.png",
  },
  {
    small:'http://nos.netease.com/mail-online/84f42b50128ecc388cb54dce12efde9d/mail180x180.jpg',
    big: "https://yanxuan-item.nosdn.127.net/84bf6c4e94bbfb48e456f44966932d68.jpg"
  },
  {
    small:'http://nos.netease.com/mail-online/84f42b50128ecc388cb54dce12efde9d/mail180x180.jpg',
    big: "https://yanxuan-item.nosdn.127.net/bc62d699f6cfbbb7e66dbaf77bd23e53.jpg",
  },
  {
    small:'http://nos.netease.com/mail-online/84f42b50128ecc388cb54dce12efde9d/mail180x180.jpg',
    big: "https://yanxuan-item.nosdn.127.net/c5a919a0ce30554ded3f5ae8978202d1.jpg",
  },
  {
    small:'http://nos.netease.com/mail-online/84f42b50128ecc388cb54dce12efde9d/mail180x180.jpg',
    big: "https://yanxuan-item.nosdn.127.net/b592ccd960b27a9dac0c186f2f7d3382.jpg",
  },
  {
    small:'http://nos.netease.com/mail-online/84f42b50128ecc388cb54dce12efde9d/mail180x180.jpg',
    big: "https://yanxuan-item.nosdn.127.net/b9402d9bcc55047eb5d33bc9c274f06a.png",
  },
  {
    small:'http://nos.netease.com/mail-online/84f42b50128ecc388cb54dce12efde9d/mail180x180.jpg',
    big: "https://yanxuan-item.nosdn.127.net/50eecf6afe7e8596c7ebf2a25474bed9.jpg",
  },
  {
    small:'http://nos.netease.com/mail-online/84f42b50128ecc388cb54dce12efde9d/mail180x180.jpg',
    big: "https://yanxuan-item.nosdn.127.net/afc1f0ac88dbeb5108faa7813aae3ad4.jpg",
  },
];



/**
 * 3D轮播图
 * @param root 
 */
export default function page10(root:HTMLElement):void{

  if(!root){
    throw Error('root must not be null');
  }

  let html = `<div id="top"><div class="small"><ul>`;
  data.forEach(e => {
    html += `<li><img src="${e.small}" /></li>`;
  });  
  html +=`</ul></div></div>`;

  html += `<div id="box"><div class="bg"></div><div id="list"><ul>`;
  data.forEach(e => {
    html += `
    <li>
      <img src="${e.big}" /> 
      <div></div>
    </li> 
    `;
  });
  html += `</ul></div></div>`;

  root.innerHTML = html;

  new Carousel3D();

}
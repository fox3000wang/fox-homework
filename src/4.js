let root = document.getElementById('root');

let box = document.getElementById('box');

let html = ``;
for (let i = 0; i < 6; i++) {
  html += `<div class="item${(i % 3) + 1} short" name="item" ></div>`;
}
box.innerHTML = html;

let pic = document.getElementsByName('item');
for (let i = 0; i < 6; i++) {
  pic[i].addEventListener('click', clickHandler);
}

function clickHandler(e) {
  console.log(e.target.clientWidth);
  e.target.className = e.target.className.replace('short', 'long');
}

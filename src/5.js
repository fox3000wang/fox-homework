//
const xiaomi = document.getElementById('xiaomi');
const detail = document.getElementById('detail');

let id = 0;
let isDown = false;
let isUp = false;
let speed = 100;

const baseHeight = 0;
const targetHeight = 200;
let h = 0;

function init() {
  detail.style.height = `${h}px`;
}

init();

xiaomi.addEventListener('mouseover', mouseoverHandler);
xiaomi.addEventListener('mouseleave', mouseleaveHandler);

function mouseoverHandler() {
  if (isUp) stopUp();
  if (isDown) return;
  isDown = true;

  id = setInterval(() => {
    if (h < targetHeight) {
      detail.style.height = `${(h += speed)}px`;
    } else {
      stopDown;
    }
  }, 50);
}

function mouseleaveHandler() {
  if (isDown) stopDown();
  if (isUp) return;
  isUp = true;

  id = setInterval(() => {
    if (h > baseHeight) {
      detail.style.height = `${(h -= speed)}px`;
    } else {
      stopUp();
    }
  }, 50);
}

function stopDown() {
  isDown = false;
  clearInterval(id);
}

function stopUp() {
  isUp = false;
  clearInterval(id);
}

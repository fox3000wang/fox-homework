function debounce(func:Function, wait:number, immediate:boolean) {

  if (typeof func !== 'function') {
    throw new TypeError('func must be an function!');
  }
  if (typeof wait === 'undefined') {
    wait = 500;
  }
  if (typeof wait === 'boolean') {
    immediate = wait;
    wait = 500;
  }
  
  let timer:number;
  return function proxy(...params) {
    
    let self = this;
    let now = immediate && !timer;

    clearTimeout(timer); // 每次进到函数都把计数器清零，直到手抖结束
    timer = setTimeout(function () {
      timer = null;
      !immediate ? func.call(self, ...params) : null;
    }, wait);

    // 第一次触发就立即执行
    now ? func.call(self, ...params) : null;
  };
}

export default debounce;
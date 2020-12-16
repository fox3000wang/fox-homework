
/**
 * 截流
 * @param func
 * @param wait 
 */
export function throttle(func:Function, wait?:number) {
  if (typeof func !== 'function') {
    throw new TypeError('func must be an function!');
  }
  wait = !wait ? 300 : wait; //如果传0进来，等于不截流

  let timer:NodeJS.Timeout;
  let previous:Date;

  return function proxy(...params) {
    const self:any = this;
    const now:Date = new Date();
    const remaining = wait - (now - previous);

    if (remaining <= 0) {
      clearTimeout(timer);
      timer = null;
      previous = now;
      func.call(self, ...params);
    } else if (!timer) {
      timer = setTimeout(function () {
        clearTimeout(timer);
        timer = null;
        previous = new Date();
        func.call(self, ...params);
      }, remaining);
    }
  };
}
